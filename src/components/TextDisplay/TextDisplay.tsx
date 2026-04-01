import { memo } from 'react'
import clsx from 'clsx'
import type { WordState } from '@/types/domain'
import './TextDisplay.css'

interface Props {
  words: WordState[]
  currentWordIndex: number
  ariaLabel: string
}

export const TextDisplay = memo(function TextDisplay({ words, currentWordIndex, ariaLabel }: Props) {
  return (
    <div className="text-display" aria-label={ariaLabel} aria-live="off">
      {words.map((word, wi) => (
        <span
          key={wi}
          className={clsx('text-display__word', {
            'text-display__word--active': wi === currentWordIndex,
            'text-display__word--completed': word.status === 'completed',
            'text-display__word--error': word.status === 'error',
          })}
        >
          {word.chars.map((c, ci) => (
            <span
              key={ci}
              className={clsx('text-display__char', {
                'text-display__char--correct': c.status === 'correct',
                'text-display__char--incorrect': c.status === 'incorrect',
                'text-display__char--current': c.status === 'current',
                'text-display__char--pending': c.status === 'pending',
              })}
            >
              {c.char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="text-display__space"> </span>}
        </span>
      ))}
    </div>
  )
})
