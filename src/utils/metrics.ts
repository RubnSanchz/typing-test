import type { KeystrokeStats, TypingMetrics } from '@/types/domain'

/**
 * Gross WPM = (total chars typed / 5) / elapsed minutes
 * Net WPM   = gross WPM - (errors / elapsed minutes)
 * The standard word unit is 5 characters.
 */
export function calcMetrics(stats: KeystrokeStats, elapsedSeconds: number): TypingMetrics {
  const elapsedMinutes = elapsedSeconds / 60

  if (elapsedMinutes <= 0) {
    return { wpmGross: 0, wpmNet: 0, accuracy: 100, errors: 0, elapsedSeconds: 0 }
  }

  const wpmGross = Math.round(stats.totalTyped / 5 / elapsedMinutes)
  const wpmNet = Math.max(0, Math.round(wpmGross - stats.errors / elapsedMinutes))
  const accuracy =
    stats.totalTyped === 0
      ? 100
      : Math.round((stats.correct / stats.totalTyped) * 100 * 10) / 10

  return {
    wpmGross,
    wpmNet,
    accuracy,
    errors: stats.errors,
    elapsedSeconds,
  }
}
