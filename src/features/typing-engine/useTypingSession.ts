import { useReducer, useEffect, useCallback, useMemo, useRef } from 'react'
import { typingReducer, createInitialSession } from './typingReducer'
import { calcMetrics } from '@/utils/metrics'
import { normalizeTextForTyping } from '@/utils/normalizeTextForTyping'
import type { LanguageCode, TypingMetrics } from '@/types/domain'

interface SessionOptions {
  duration: number
  ignorePunctuation: boolean
  language: LanguageCode
}

export function useTypingSession(options: SessionOptions) {
  const { duration, ignorePunctuation, language } = options
  const [session, dispatch] = useReducer(typingReducer, options, createInitialSession)

  // Elapsed seconds tracked via requestAnimationFrame for smooth timer
  const rafRef = useRef<number | null>(null)
  const elapsedRef = useRef<number>(0)

  // Force re-render each second for timer display
  const [tick, setTick] = useReducer((n: number) => n + 1, 0)

  // Start/stop RAF loop
  useEffect(() => {
    if (session.status !== 'running') {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    const loop = () => {
      if (!session.startTime) return
      const elapsed = (performance.now() - session.startTime) / 1000
      elapsedRef.current = elapsed

      if (elapsed >= duration) {
        dispatch({ type: 'FINISH' })
        return
      }

      setTick()
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [session.status, session.startTime, duration])

  // Compute elapsed for finished sessions
  const elapsedSeconds = useMemo(() => {
    if (session.status === 'finished' && session.startTime && session.endTime) {
      return Math.min((session.endTime - session.startTime) / 1000, duration)
    }
    if (session.status === 'running') return elapsedRef.current
    return 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status, session.startTime, session.endTime, duration, tick])

  const timeLeft = Math.max(0, duration - elapsedSeconds)

  const metrics: TypingMetrics = useMemo(
    () => calcMetrics(session.keystrokeStats, elapsedSeconds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session.keystrokeStats, elapsedSeconds, tick],
  )

  const handleInput = useCallback(
    (value: string) => {
      if (session.status === 'finished') return
      const normalizedValue = ignorePunctuation ? normalizeTextForTyping(value) : value

      // Space = submit word
      if (value.endsWith(' ')) {
        const trimmed = normalizedValue.trimEnd()
        if (trimmed.length > 0) {
          dispatch({ type: 'INPUT_CHANGE', payload: trimmed })
          dispatch({ type: 'WORD_SUBMIT' })
        }
        return
      }
      dispatch({ type: 'INPUT_CHANGE', payload: normalizedValue })
    },
    [ignorePunctuation, session.status],
  )

  const reset = useCallback(
    (nextOptions?: Partial<SessionOptions>) => {
      elapsedRef.current = 0
      dispatch({
        type: 'RESET',
        payload: {
          duration: nextOptions?.duration ?? duration,
          ignorePunctuation: nextOptions?.ignorePunctuation ?? ignorePunctuation,
          language: nextOptions?.language ?? language,
        },
      })
    },
    [duration, ignorePunctuation, language],
  )

  return { session, metrics, timeLeft, handleInput, reset } as const
}
