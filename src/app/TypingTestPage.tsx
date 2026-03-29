import { useEffect } from 'react'
import { useTypingSession } from '@/features/typing-engine/useTypingSession'
import { useSettings } from '@/features/settings/useSettings'
import { useHistory } from '@/features/stats/useHistory'
import { TextDisplay } from '@/components/TextDisplay/TextDisplay'
import { TypingInput } from '@/components/TypingInput/TypingInput'
import { TimerPanel } from '@/components/TimerPanel/TimerPanel'
import { StatsPanel } from '@/components/StatsPanel/StatsPanel'
import { HistoryPanel } from '@/components/HistoryPanel/HistoryPanel'
import { ResultsModal } from '@/components/ResultsModal/ResultsModal'
import './TypingTestPage.css'

export function TypingTestPage() {
  const { prefs, setDuration, setIgnorePunctuation, durationOptions } = useSettings()
  const { session, metrics, timeLeft, handleInput, reset } = useTypingSession({
    duration: prefs.duration,
    ignorePunctuation: prefs.ignorePunctuation,
  })
  const { stats, best, saveResult, clearHistory } = useHistory()

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

  const handleChangeDuration = (d: number) => {
    setDuration(d)
    reset({ duration: d, ignorePunctuation: prefs.ignorePunctuation })
  }

  const handleToggleIgnorePunctuation = (value: boolean) => {
    setIgnorePunctuation(value)
    reset({ duration: prefs.duration, ignorePunctuation: value })
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
            reset({ duration: prefs.duration, ignorePunctuation: prefs.ignorePunctuation })
          }
        >
          Reiniciar ahora
        </button>
      </div>

      <HistoryPanel stats={stats} onClear={clearHistory} />

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
            reset({ duration: prefs.duration, ignorePunctuation: prefs.ignorePunctuation })
          }
        />
      )}
    </section>
  )
}
