import { useState, useCallback, useEffect } from 'react'
import type { BestResult, HistoryStats, TypingMetrics } from '@/types/domain'

const STORAGE_KEY = 'tt-history'
const LEGACY_BEST_KEY = 'tt-best'

function keyForProfile(profileId: string): string {
  return `${STORAGE_KEY}-${profileId}`
}

function loadHistory(profileId: string): HistoryStats {
  const fallback: HistoryStats = {
    totalTests: 0,
    averageWpm: 0,
    averageAccuracy: 0,
    maxAccuracy: 0,
    best: null,
  }

  try {
    const raw = localStorage.getItem(keyForProfile(profileId))
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<HistoryStats>
      return {
        totalTests: parsed.totalTests ?? 0,
        averageWpm: parsed.averageWpm ?? 0,
        averageAccuracy: parsed.averageAccuracy ?? 0,
        maxAccuracy: parsed.maxAccuracy ?? 0,
        best: parsed.best ?? null,
      }
    }

    const legacyRaw = localStorage.getItem(LEGACY_BEST_KEY)
    if (legacyRaw) {
      const legacyBest = JSON.parse(legacyRaw) as BestResult
      return {
        totalTests: 0,
        averageWpm: 0,
        averageAccuracy: 0,
        maxAccuracy: legacyBest.accuracy,
        best: legacyBest,
      }
    }

    return fallback
  } catch {
    return fallback
  }
}

export function useHistory(profileId: string) {
  const [stats, setStats] = useState<HistoryStats>(() => loadHistory(profileId))

  useEffect(() => {
    setStats(loadHistory(profileId))
  }, [profileId])

  const saveResult = useCallback((metrics: TypingMetrics, duration: number) => {
    const current = loadHistory(profileId)
    const nextTotal = current.totalTests + 1

    const nextAverageWpm =
      Math.round(((current.averageWpm * current.totalTests + metrics.wpmNet) / nextTotal) * 10) / 10
    const nextAverageAccuracy =
      Math.round(
        ((current.averageAccuracy * current.totalTests + metrics.accuracy) / nextTotal) * 10,
      ) / 10

    const candidateBest: BestResult = {
      wpmNet: metrics.wpmNet,
      accuracy: metrics.accuracy,
      duration,
      date: new Date().toISOString(),
    }

    const nextBest = !current.best || metrics.wpmNet > current.best.wpmNet
      ? candidateBest
      : current.best

    const next: HistoryStats = {
      totalTests: nextTotal,
      averageWpm: nextAverageWpm,
      averageAccuracy: nextAverageAccuracy,
      maxAccuracy: Math.max(current.maxAccuracy, metrics.accuracy),
      best: nextBest,
    }

    localStorage.setItem(keyForProfile(profileId), JSON.stringify(next))
    setStats(next)
  }, [profileId])

  const clearHistory = useCallback(() => {
    const empty: HistoryStats = {
      totalTests: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      maxAccuracy: 0,
      best: null,
    }
    localStorage.setItem(keyForProfile(profileId), JSON.stringify(empty))
    setStats(empty)
  }, [profileId])

  return {
    stats,
    best: stats.best,
    saveResult,
    clearHistory,
  } as const
}
