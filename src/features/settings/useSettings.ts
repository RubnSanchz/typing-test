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

  const persist = (next: UserPreferences) => {
    setPrefs(next)
    localStorage.setItem(keyForProfile(profileId), JSON.stringify(next))
  }

  const setDuration = (d: number) => {
    const next = { ...prefs, duration: d }
    persist(next)
  }

  const setIgnorePunctuation = (value: boolean) => {
    const next = { ...prefs, ignorePunctuation: value }
    persist(next)
  }

  const setLanguage = (language: LanguageCode) => {
    const next = { ...prefs, language }
    persist(next)
  }

  return {
    prefs,
    setDuration,
    setIgnorePunctuation,
    setLanguage,
    durationOptions: DURATION_OPTIONS,
    languageOptions: LANGUAGE_OPTIONS,
  } as const
}
