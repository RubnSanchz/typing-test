import { useState } from 'react'
import type { UserPreferences } from '@/types/domain'

const STORAGE_KEY = 'tt-prefs'
export const DURATION_OPTIONS = [15, 30, 60] as const

function load(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { duration: 60, ignorePunctuation: true }
    const parsed = JSON.parse(raw) as Partial<UserPreferences>
    const duration = DURATION_OPTIONS.includes(parsed.duration as (typeof DURATION_OPTIONS)[number])
      ? (parsed.duration as number)
      : 60
    const ignorePunctuation = parsed.ignorePunctuation ?? true
    return { duration, ignorePunctuation }
  } catch {
    return { duration: 60, ignorePunctuation: true }
  }
}

export function useSettings() {
  const [prefs, setPrefs] = useState<UserPreferences>(load)

  const persist = (next: UserPreferences) => {
    setPrefs(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const setDuration = (d: number) => {
    const next = { ...prefs, duration: d }
    persist(next)
  }

  const setIgnorePunctuation = (value: boolean) => {
    const next = { ...prefs, ignorePunctuation: value }
    persist(next)
  }

  return { prefs, setDuration, setIgnorePunctuation, durationOptions: DURATION_OPTIONS } as const
}
