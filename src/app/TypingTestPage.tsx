import { useEffect, useRef } from 'react'
import { useTypingSession } from '@/features/typing-engine/useTypingSession'
import type { DURATION_OPTIONS } from '@/features/settings/useSettings'
import { useHistory } from '@/features/stats/useHistory'
import { TextDisplay } from '@/components/TextDisplay/TextDisplay'
import { TypingInput } from '@/components/TypingInput/TypingInput'
import { TimerPanel } from '@/components/TimerPanel/TimerPanel'
import { StatsPanel } from '@/components/StatsPanel/StatsPanel'
import { HistoryPanel } from '@/components/HistoryPanel/HistoryPanel'
import { ResultsModal } from '@/components/ResultsModal/ResultsModal'
import type { LanguageCode, UserPreferences } from '@/types/domain'
import './TypingTestPage.css'

interface Props {
  profileId: string
  profileName: string
  prefs: UserPreferences
  setDuration: (duration: number) => void
  setIgnorePunctuation: (value: boolean) => void
  durationOptions: typeof DURATION_OPTIONS
}

export function TypingTestPage({
  profileId,
  profileName,
  prefs,
  setDuration,
  setIgnorePunctuation,
  durationOptions,
}: Props) {
  const { session, metrics, timeLeft, handleInput, reset } = useTypingSession({
    duration: prefs.duration,
    ignorePunctuation: prefs.ignorePunctuation,
    language: prefs.language,
  })
  const { stats, best, saveResult, clearHistory } = useHistory(profileId)
  const lastLanguageRef = useRef<LanguageCode>(prefs.language)
  const lastProfileRef = useRef<string>(profileId)

  // Save record when session finishes
  useEffect(() => {
    if (session.status === 'finished') {
      saveResult(metrics, prefs.duration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status])

  // Tab + Enter shortcut to restart
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLButtonElement) return
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Reload passage when language changes from the header selector.
  useEffect(() => {
    if (lastLanguageRef.current === prefs.language) return
    lastLanguageRef.current = prefs.language
    reset({
      duration: prefs.duration,
      ignorePunctuation: prefs.ignorePunctuation,
      language: prefs.language,
    })
  }, [prefs.duration, prefs.ignorePunctuation, prefs.language, reset])

  useEffect(() => {
    if (lastProfileRef.current === profileId) return
    lastProfileRef.current = profileId
    lastLanguageRef.current = prefs.language
    reset({
      duration: prefs.duration,
      ignorePunctuation: prefs.ignorePunctuation,
      language: prefs.language,
    })
  }, [profileId, prefs.duration, prefs.ignorePunctuation, prefs.language, reset])

  const handleChangeDuration = (d: number) => {
    setDuration(d)
    reset({ duration: d, ignorePunctuation: prefs.ignorePunctuation, language: prefs.language })
  }

  const handleToggleIgnorePunctuation = (value: boolean) => {
    setIgnorePunctuation(value)
    reset({ duration: prefs.duration, ignorePunctuation: value, language: prefs.language })
  }

  return (
    <section className="test-page">
      <div className="test-page__top-bar">
        <TimerPanel
          timeLeft={timeLeft}
          duration={prefs.duration}
          durationOptions={durationOptions}
          onChangeDuration={handleChangeDuration}
          ignorePunctuation={prefs.ignorePunctuation}
          onToggleIgnorePunctuation={handleToggleIgnorePunctuation}
          status={session.status}
        />
        {session.status === 'running' && (
          <StatsPanel metrics={metrics} live />
        )}
      </div>

      <TextDisplay words={session.words} currentWordIndex={session.currentWordIndex} />

      <TypingInput
        value={session.currentInput}
        onChange={handleInput}
        disabled={session.status === 'finished'}
      />

      <div className="test-page__actions">
        <button
          className="test-page__restart-btn"
          onClick={() =>
            reset({
              duration: prefs.duration,
              ignorePunctuation: prefs.ignorePunctuation,
              language: prefs.language,
            })
          }
        >
          Reiniciar ahora
        </button>
      </div>

      <HistoryPanel stats={stats} onClear={clearHistory} profileName={profileName} />

      <div className="test-page__hint">
        {session.status === 'idle' && 'Empieza a escribir para iniciar el test'}
        {session.status === 'running' && ' '}
        {session.status === 'finished' && ' '}
      </div>

      {session.status === 'finished' && (
        <ResultsModal
          metrics={metrics}
          best={best}
          onRestart={() =>
            reset({
              duration: prefs.duration,
              ignorePunctuation: prefs.ignorePunctuation,
              language: prefs.language,
            })
          }
        />
      )}
    </section>
  )
}
