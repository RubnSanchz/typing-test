import { useEffect, useMemo, useRef, useState } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'
import { syncProfileMetadata, deleteProfileFromCloud } from '@/features/sync/profileSync'
import { pullCloudProfiles } from '@/features/sync/cloudPull'
import { CLOUD_SYNCED_EVENT } from '@/features/sync/events'
import { onUidChanged } from '@/lib/firebase'
import type { UserProfile } from '@/types/domain'

const STORAGE_KEY = 'tt-profiles'
const ACTIVE_KEY = 'tt-active-profile'

export const DEFAULT_PROFILE_ID = 'default'
export const DEFAULT_PROFILE_NAME = 'Perfil por defecto'

const DEFAULT_PROFILES: UserProfile[] = [{ id: DEFAULT_PROFILE_ID, name: DEFAULT_PROFILE_NAME }]

const LEGACY_DEFAULT_IDS = new Set(['person-default', 'keyboard-laptop'])

/**
 * Display name for a profile: the seed default profile (never renamed) shows a
 * translated label; every other profile — including a renamed default — keeps
 * its stored name. The stored value is never mutated, only the rendered label.
 */
export function profileDisplayName(profile: UserProfile, translatedDefault: string): string {
  return profile.id === DEFAULT_PROFILE_ID && profile.name === DEFAULT_PROFILE_NAME
    ? translatedDefault
    : profile.name
}

function sanitizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function loadProfiles(): UserProfile[] {
  try {
    const raw = readStorage(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILES

    const parsed = JSON.parse(raw) as Array<UserProfile & { kind?: unknown }>
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PROFILES

    const validProfiles = parsed
      .filter((item) => item?.id && item?.name)
      .map((item) => ({ id: item.id, name: item.name.trim() }))
      .filter((item) => item.name.length > 0)

    if (validProfiles.length === 0) return DEFAULT_PROFILES

    const legacyDefaults = validProfiles.filter((profile) => LEGACY_DEFAULT_IDS.has(profile.id))
    const userProfiles = validProfiles.filter((profile) => !LEGACY_DEFAULT_IDS.has(profile.id))

    if (legacyDefaults.length > 0) {
      return [{ id: DEFAULT_PROFILE_ID, name: DEFAULT_PROFILE_NAME }, ...userProfiles]
    }

    return validProfiles
  } catch {
    return DEFAULT_PROFILES
  }
}

function loadActiveProfileId(profiles: UserProfile[]): string {
  const stored = readStorage(ACTIVE_KEY)
  if (stored && profiles.some((profile) => profile.id === stored)) return stored
  return profiles[0]?.id ?? DEFAULT_PROFILES[0].id
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => loadProfiles())
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const initial = loadProfiles()
    return loadActiveProfileId(initial)
  })

  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    if (profiles.some((profile) => profile.id === activeProfileId)) {
      writeStorage(ACTIVE_KEY, activeProfileId)
    }
  }, [activeProfileId, profiles])

  // Whenever the signed-in user changes (initial anonymous sign-in, or a later
  // Google/email login), push every local profile's metadata so the current
  // account's cloud document holds all profiles — not just ones changed after.
  const profilesRef = useRef(profiles)
  useEffect(() => {
    profilesRef.current = profiles
  }, [profiles])
  useEffect(() => {
    return onUidChanged((uid) => {
      if (!uid) return
      // Download any tests done elsewhere with this account first (merging cloud
      // stats into local storage and adding missing profiles), then upload local
      // metadata. Pull before upload so the server read isn't masked by the
      // upload's pending local write.
      void pullCloudProfiles(uid)
        .then((cloud) => {
          if (cloud === null) return
          if (cloud.length > 0) {
            setProfiles((prev) => {
              const byId = new Map(prev.map((p) => [p.id, p]))
              for (const c of cloud) if (!byId.has(c.id)) byId.set(c.id, c)
              return [...byId.values()]
            })
          }
          // Notify cached hooks (useSettings) to reload merged data.
          window.dispatchEvent(new Event(CLOUD_SYNCED_EVENT))
        })
        .finally(() => {
          profilesRef.current.forEach((profile) => void syncProfileMetadata(profile))
        })
    })
  }, [])

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0] ?? DEFAULT_PROFILES[0],
    [activeProfileId, profiles],
  )

  const nameExists = (name: string, excludedProfileId?: string) => {
    const normalized = name.trim().toLocaleLowerCase()
    return profiles.some(
      (profile) => profile.id !== excludedProfileId && profile.name.trim().toLocaleLowerCase() === normalized,
    )
  }

  const createProfile = (name: string) => {
    const trimmed = name.trim().slice(0, 32)
    if (!trimmed || nameExists(trimmed)) return false

    const idBase = sanitizeName(trimmed) || 'perfil'
    let id = idBase
    let suffix = 1

    while (profiles.some((profile) => profile.id === id)) {
      suffix += 1
      id = `${idBase}-${suffix}`
    }

    const profile: UserProfile = { id, name: trimmed }

    setProfiles((prev) => [...prev, profile])
    setActiveProfileId(id)
    void syncProfileMetadata(profile, { isNew: true })
    return true
  }

  const renameProfile = (profileId: string, name: string) => {
    const trimmed = name.trim().slice(0, 32)
    if (!trimmed || nameExists(trimmed, profileId)) return false

    setProfiles((prev) =>
      prev.map((profile) => (profile.id === profileId ? { ...profile, name: trimmed } : profile)),
    )
    void syncProfileMetadata({ id: profileId, name: trimmed })

    return true
  }

  const deleteProfile = (profileId: string) => {
    void deleteProfileFromCloud(profileId)
    const nextProfiles = profiles.filter((profile) => profile.id !== profileId)

    if (nextProfiles.length === 0) {
      const fallback = DEFAULT_PROFILES[0]
      setProfiles([fallback])
      setActiveProfileId(fallback.id)
      return
    }

    setProfiles(nextProfiles)

    if (activeProfileId === profileId) {
      setActiveProfileId(nextProfiles[0].id)
    }
  }

  const selectProfile = (profileId: string) => {
    if (!profiles.some((profile) => profile.id === profileId)) return
    setActiveProfileId(profileId)
  }

  return {
    profiles,
    activeProfile,
    selectProfile,
    createProfile,
    renameProfile,
    deleteProfile,
  } as const
}
