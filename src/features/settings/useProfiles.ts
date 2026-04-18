import { useEffect, useMemo, useState } from 'react'
import type { UserProfile } from '@/types/domain'

const STORAGE_KEY = 'tt-profiles'
const ACTIVE_KEY = 'tt-active-profile'

const DEFAULT_PROFILES: UserProfile[] = [{ id: 'default', name: 'Perfil por defecto' }]

const LEGACY_DEFAULT_IDS = new Set(['person-default', 'keyboard-laptop'])

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage write failures so the in-memory profile flow keeps working.
  }
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
      return [{ id: 'default', name: 'Perfil por defecto' }, ...userProfiles]
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
    return true
  }

  const renameProfile = (profileId: string, name: string) => {
    const trimmed = name.trim().slice(0, 32)
    if (!trimmed || nameExists(trimmed, profileId)) return false

    setProfiles((prev) =>
      prev.map((profile) => (profile.id === profileId ? { ...profile, name: trimmed } : profile)),
    )

    return true
  }

  const deleteProfile = (profileId: string) => {
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
