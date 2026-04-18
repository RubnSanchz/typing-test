import { useCallback, useState } from 'react'
import { DURATION_OPTIONS, LANGUAGE_OPTIONS } from '@/features/settings/useSettings'
import type { BestResult, HistoryMode, HistoryModeEntry, HistoryStats, TypingMetrics } from '@/types/domain'

const STORAGE_KEY = 'tt-history'
const LEGACY_BEST_KEY = 'tt-best'

interface StoredHistory {
  version: 2
  modes: Record<string, HistoryStats>
}

function keyForProfile(profileId: string): string {
  return `${STORAGE_KEY}-${profileId}`
}

function emptyStats(): HistoryStats {
  return {
    totalTests: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    maxAccuracy: 0,
    best: null,
  }
}

function modeKey(mode: HistoryMode): string {
  return [mode.language, mode.duration, mode.ignorePunctuation ? 'plain' : 'punct'].join('::')
}

function loadStore(profileId: string, currentMode: HistoryMode): StoredHistory {
  try {
    const raw = localStorage.getItem(keyForProfile(profileId))
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredHistory & HistoryStats>

      if (parsed && typeof parsed === 'object' && 'modes' in parsed && parsed.modes) {
        return {
          version: 2,
          modes: parsed.modes,
        }
      }

      if (typeof parsed.totalTests === 'number') {
        return {
          version: 2,
          modes: {
            [modeKey(currentMode)]: {
              totalTests: parsed.totalTests ?? 0,
              averageWpm: parsed.averageWpm ?? 0,
              averageAccuracy: parsed.averageAccuracy ?? 0,
              maxAccuracy: parsed.maxAccuracy ?? 0,
              best: parsed.best ?? null,
            },
          },
        }
      }
    }

    const legacyRaw = localStorage.getItem(LEGACY_BEST_KEY)
    if (legacyRaw) {
      const legacyBest = JSON.parse(legacyRaw) as BestResult
      return {
        version: 2,
        modes: {
          [modeKey(currentMode)]: {
            totalTests: 0,
            averageWpm: 0,
            averageAccuracy: 0,
            maxAccuracy: legacyBest.accuracy,
            best: legacyBest,
          },
        },
      }
    }
  } catch {
    // Ignore malformed history and recover with an empty state.
  }

  return {
    version: 2,
    modes: {},
  }
}

function writeStore(profileId: string, store: StoredHistory) {
  localStorage.setItem(keyForProfile(profileId), JSON.stringify(store))
}

export function useHistory(profileId: string, currentMode: HistoryMode) {
  const [, setRevision] = useState(0)
  const currentKey = modeKey(currentMode)

  const store = loadStore(profileId, currentMode)
  const stats = store.modes[currentKey] ?? emptyStats()

  const saveResult = useCallback((metrics: TypingMetrics, mode: HistoryMode) => {
    const currentStore = loadStore(profileId, mode)
    const key = modeKey(mode)
    const current = currentStore.modes[key] ?? emptyStats()
    const nextTotal = current.totalTests + 1

    const nextAverageWpm =
      Math.round(((current.averageWpm * current.totalTests + metrics.wpmNet) / nextTotal) * 10) / 10
    const nextAverageAccuracy =
      Math.round(((current.averageAccuracy * current.totalTests + metrics.accuracy) / nextTotal) * 10) / 10

    const candidateBest: BestResult = {
      wpmNet: metrics.wpmNet,
      accuracy: metrics.accuracy,
      duration: mode.duration,
      date: new Date().toISOString(),
    }

    const nextBest = !current.best || metrics.wpmNet > current.best.wpmNet ? candidateBest : current.best

    const next: HistoryStats = {
      totalTests: nextTotal,
      averageWpm: nextAverageWpm,
      averageAccuracy: nextAverageAccuracy,
      maxAccuracy: Math.max(current.maxAccuracy, metrics.accuracy),
      best: nextBest,
    }

    const nextStore: StoredHistory = {
      ...currentStore,
      modes: {
        ...currentStore.modes,
        [key]: next,
      },
    }

    writeStore(profileId, nextStore)
    setRevision((value) => value + 1)
  }, [profileId])

  const clearHistory = useCallback(() => {
    const nextStore: StoredHistory = {
      ...store,
      modes: {
        ...store.modes,
        [currentKey]: emptyStats(),
      },
    }

    writeStore(profileId, nextStore)
    setRevision((value) => value + 1)
  }, [currentKey, profileId, store])

  const breakdown: HistoryModeEntry[] = LANGUAGE_OPTIONS.flatMap((language) =>
    DURATION_OPTIONS.flatMap((duration) =>
      [true, false].map((ignorePunctuation) => ({
        language,
        duration,
        ignorePunctuation,
        stats: store.modes[modeKey({ language, duration, ignorePunctuation })] ?? emptyStats(),
      })),
    ),
  )

  return {
    stats,
    best: stats.best,
    breakdown,
    saveResult,
    clearHistory,
  } as const
}
