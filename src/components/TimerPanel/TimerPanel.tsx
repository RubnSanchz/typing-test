import clsx from 'clsx'
import type { DURATION_OPTIONS } from '@/features/settings/useSettings'
import './TimerPanel.css'

interface Props {
  timeLeft: number
  duration: number
  durationOptions: typeof DURATION_OPTIONS
  onChangeDuration: (d: number) => void
  ignorePunctuation: boolean
  onToggleIgnorePunctuation: (value: boolean) => void
  status: 'idle' | 'running' | 'finished'
}

export function TimerPanel({
  timeLeft,
  duration,
  durationOptions,
  onChangeDuration,
  ignorePunctuation,
  onToggleIgnorePunctuation,
  status,
}: Props) {
  const pct = timeLeft / duration
  const timerClass = clsx('timer__value', {
    'timer__value--warning': pct <= 0.33 && pct > 0.15,
    'timer__value--danger': pct <= 0.15,
  })

  return (
    <div className="timer">
      <span className={timerClass}>{Math.ceil(timeLeft)}</span>

      {status === 'idle' && (
        <>
          <div className="timer__options" role="group" aria-label="Duración del test">
            {durationOptions.map((d) => (
              <button
                key={d}
                className={clsx('timer__option', { 'timer__option--active': d === duration })}
                onClick={() => onChangeDuration(d)}
              >
                {d}s
              </button>
            ))}
          </div>

          <div className="timer__options" role="group" aria-label="Signos de puntuación">
            <button
              className={clsx('timer__option', { 'timer__option--active': ignorePunctuation })}
              onClick={() => onToggleIgnorePunctuation(true)}
            >
              Sin signos
            </button>
            <button
              className={clsx('timer__option', { 'timer__option--active': !ignorePunctuation })}
              onClick={() => onToggleIgnorePunctuation(false)}
            >
              Con signos
            </button>
          </div>
        </>
      )}
    </div>
  )
}
