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
import type { UiCopy } from '@/data/uiCopy'
import type { LanguageCode, UserPreferences } from '@/types/domain'
import './TypingTestPage.css'

interface Props {
  profileId: string
  profileName: string
  prefs: UserPreferences
  setDuration: (duration: number) => void
  setIgnorePunctuation: (value: boolean) => void
  setPreferences: (prefs: UserPreferences) => void
  durationOptions: typeof DURATION_OPTIONS
  ui: UiCopy
}

export function TypingTestPage({
  profileId,
  profileName,
  prefs,
  setDuration,
  setIgnorePunctuation,
  setPreferences,
  durationOptions,
  ui,
}: Props) {
  const { session, metrics, timeLeft, handleInput, reset } = useTypingSession({
    duration: prefs.duration,
    ignorePunctuation: prefs.ignorePunctuation,
    language: prefs.language,
  })
  const { stats, best, breakdown, saveResult, clearHistory } = useHistory(profileId, {
    language: prefs.language,
    duration: prefs.duration,
    ignorePunctuation: prefs.ignorePunctuation,
  })
  const lastLanguageRef = useRef<LanguageCode>(prefs.language)
  const lastProfileRef = useRef<string>(profileId)

  // Save record when session finishes
  useEffect(() => {
    if (session.status === 'finished') {
      saveResult(metrics, {
        language: prefs.language,
        duration: prefs.duration,
        ignorePunctuation: prefs.ignorePunctuation,
      })
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

  const handleApplyMode = ({ language, duration, ignorePunctuation }: UserPreferences) => {
    setPreferences({ language, duration, ignorePunctuation })
    reset({ duration, ignorePunctuation, language })
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
          copy={ui.timerPanel}
        />
        {session.status === 'running' && (
          <StatsPanel metrics={metrics} live copy={ui.statsPanel} />
        )}
      </div>

      <TextDisplay
        words={session.words}
        currentWordIndex={session.currentWordIndex}
        ariaLabel={ui.typingPage.textDisplayAria}
      />

      <TypingInput
        value={session.currentInput}
        onChange={handleInput}
        disabled={session.status === 'finished'}
        copy={ui.typingInput}
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
          {ui.typingPage.restartNow}
        </button>
      </div>

      <HistoryPanel
        stats={stats}
        breakdown={breakdown}
        currentMode={{
          language: prefs.language,
          duration: prefs.duration,
          ignorePunctuation: prefs.ignorePunctuation,
        }}
        onClear={clearHistory}
        onApplyMode={handleApplyMode}
        profileName={profileName}
        copy={ui.historyPanel}
      />

      <div className="test-page__hint">
        {session.status === 'idle' && ui.typingPage.startHint}
        {session.status === 'running' && ' '}
        {session.status === 'finished' && ' '}
      </div>

      {session.status === 'finished' && (
        <ResultsModal
          metrics={metrics}
          best={best}
          copy={ui}
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
