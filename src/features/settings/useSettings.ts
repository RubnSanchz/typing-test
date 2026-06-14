import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '@/utils/storage'
import { syncProfilePrefs } from '@/features/sync/profileSync'
import { CLOUD_SYNCED_EVENT } from '@/features/sync/events'
import type { LanguageCode, UserPreferences } from '@/types/domain'

const STORAGE_KEY = 'tt-prefs'
export const DURATION_OPTIONS = [15, 30, 60] as const
export const LANGUAGE_OPTIONS = ['es', 'en', 'fr'] as const

export function prefsStorageKey(profileId: string): string {
  return `${STORAGE_KEY}-${profileId}`
}

function keyForProfile(profileId: string): string {
  return prefsStorageKey(profileId)
}

// First-run language: use the device language if supported, else English.
// Once the user picks a language it is stored and this is no longer consulted.
function detectDeviceLanguage(): LanguageCode {
  const candidates =
    typeof navigator === 'undefined' ? [] : [navigator.language, ...(navigator.languages ?? [])]
  for (const candidate of candidates) {
    const base = candidate?.toLowerCase().split('-')[0]
    if (base && (LANGUAGE_OPTIONS as readonly string[]).includes(base)) {
      return base as LanguageCode
    }
  }
  return 'en'
}

function defaultPreferences(): UserPreferences {
  return { duration: 60, ignorePunctuation: true, language: detectDeviceLanguage() }
}

function load(profileId: string): UserPreferences {
  try {
    const raw = readStorage(keyForProfile(profileId))
    if (!raw) return defaultPreferences()
    const parsed = JSON.parse(raw) as Partial<UserPreferences>
    const duration = DURATION_OPTIONS.includes(parsed.duration as (typeof DURATION_OPTIONS)[number])
      ? (parsed.duration as number)
      : 60
    const ignorePunctuation = parsed.ignorePunctuation ?? true
    const language = LANGUAGE_OPTIONS.includes(parsed.language as LanguageCode)
      ? (parsed.language as LanguageCode)
      : detectDeviceLanguage()
    return { duration, ignorePunctuation, language }
  } catch {
    return defaultPreferences()
  }
}

export function useSettings(profileId: string) {
  const [prefs, setPrefs] = useState<UserPreferences>(() => load(profileId))

  useEffect(() => {
    setPrefs(load(profileId))
  }, [profileId])

  // Reload from storage after a cloud pull merges this account's preferences.
  useEffect(() => {
    const reload = () => setPrefs(load(profileId))
    window.addEventListener(CLOUD_SYNCED_EVENT, reload)
    return () => window.removeEventListener(CLOUD_SYNCED_EVENT, reload)
  }, [profileId])

  const updatePrefs = (updater: (current: UserPreferences) => UserPreferences) => {
    setPrefs((current) => {
      const next = updater(current)
      writeStorage(keyForProfile(profileId), JSON.stringify(next))
      void syncProfilePrefs(profileId, next)
      return next
    })
  }

  const setPreferences = (next: UserPreferences) => {
    updatePrefs(() => next)
  }

  const setDuration = (d: number) => {
    updatePrefs((current) => ({ ...current, duration: d }))
  }

  const setIgnorePunctuation = (value: boolean) => {
    updatePrefs((current) => ({ ...current, ignorePunctuation: value }))
  }

  const setLanguage = (language: LanguageCode) => {
    updatePrefs((current) => ({ ...current, language }))
  }

  return {
    prefs,
    setDuration,
    setIgnorePunctuation,
    setLanguage,
    setPreferences,
    durationOptions: DURATION_OPTIONS,
  } as const
}
