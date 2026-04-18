import { useEffect, useState } from 'react'
import type { LanguageCode, UserPreferences } from '@/types/domain'

const STORAGE_KEY = 'tt-prefs'
export const DURATION_OPTIONS = [15, 30, 60] as const
export const LANGUAGE_OPTIONS = ['es', 'en', 'fr'] as const

function keyForProfile(profileId: string): string {
  return `${STORAGE_KEY}-${profileId}`
}

function load(profileId: string): UserPreferences {
  try {
    const raw = localStorage.getItem(keyForProfile(profileId))
    if (!raw) return { duration: 60, ignorePunctuation: true, language: 'es' }
    const parsed = JSON.parse(raw) as Partial<UserPreferences>
    const duration = DURATION_OPTIONS.includes(parsed.duration as (typeof DURATION_OPTIONS)[number])
      ? (parsed.duration as number)
      : 60
    const ignorePunctuation = parsed.ignorePunctuation ?? true
    const language = LANGUAGE_OPTIONS.includes(parsed.language as LanguageCode)
      ? (parsed.language as LanguageCode)
      : 'es'
    return { duration, ignorePunctuation, language }
  } catch {
    return { duration: 60, ignorePunctuation: true, language: 'es' }
  }
}

export function useSettings(profileId: string) {
  const [prefs, setPrefs] = useState<UserPreferences>(() => load(profileId))

  useEffect(() => {
    setPrefs(load(profileId))
  }, [profileId])

  const updatePrefs = (updater: (current: UserPreferences) => UserPreferences) => {
    setPrefs((current) => {
      const next = updater(current)

      try {
        localStorage.setItem(keyForProfile(profileId), JSON.stringify(next))
      } catch {
        // Ignore storage failures and keep the in-memory preferences working.
      }

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
    languageOptions: LANGUAGE_OPTIONS,
  } as const
}
