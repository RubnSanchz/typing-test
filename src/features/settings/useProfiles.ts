import { useEffect, useMemo, useState } from 'react'
import type { UserProfile } from '@/types/domain'

const STORAGE_KEY = 'tt-profiles'
const ACTIVE_KEY = 'tt-active-profile'

const DEFAULT_PROFILES: UserProfile[] = [
  { id: 'default', name: 'Perfil por defecto' },
]

const LEGACY_DEFAULT_IDS = new Set(['person-default', 'keyboard-laptop'])

function sanitizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function loadProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILES
    const parsed = JSON.parse(raw) as Array<UserProfile & { kind?: unknown }>
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PROFILES

    const validProfiles = parsed
      .filter((item) => item?.id && item?.name)
      .map((item) => ({ id: item.id, name: item.name }))

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
  const stored = localStorage.getItem(ACTIVE_KEY)
  if (stored && profiles.some((p) => p.id === stored)) return stored
  return profiles[0]?.id ?? DEFAULT_PROFILES[0].id
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => loadProfiles())
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    const initial = loadProfiles()
    return loadActiveProfileId(initial)
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    if (profiles.some((profile) => profile.id === activeProfileId)) {
      localStorage.setItem(ACTIVE_KEY, activeProfileId)
    }
  }, [activeProfileId, profiles])

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0] ?? DEFAULT_PROFILES[0],
    [activeProfileId, profiles],
  )

  const createProfile = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return

    const idBase = sanitizeName(trimmed) || 'perfil'
    let id = idBase
    let suffix = 1
    while (profiles.some((p) => p.id === id)) {
      suffix += 1
      id = `${idBase}-${suffix}`
    }

    const profile: UserProfile = {
      id,
      name: trimmed,
    }

    setProfiles((prev) => [...prev, profile])
    setActiveProfileId(id)
  }

  const renameProfile = (profileId: string, name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setProfiles((prev) => prev.map((profile) => (profile.id === profileId ? { ...profile, name: trimmed } : profile)))
  }

  const deleteProfile = (profileId: string) => {
    setProfiles((prev) => {
      const next = prev.filter((profile) => profile.id !== profileId)
      if (next.length === 0) {
        const fallback = DEFAULT_PROFILES[0]
        setActiveProfileId(fallback.id)
        return [fallback]
      }

      if (activeProfileId === profileId) {
        setActiveProfileId(next[0].id)
      }

      return next
    })
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
