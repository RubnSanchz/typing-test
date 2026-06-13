import { Fragment, useEffect, useState } from 'react'
import type { DonateCopy } from '@/data/uiCopy'
import './DonateButton.css'

interface Props {
  copy: DonateCopy
}

const DONATE_LINKS = [
  { label: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/rubnsanchz', modifier: 'bmc' },
  { label: 'Ko-fi', url: 'https://ko-fi.com/rubnsanchz', modifier: 'kofi' },
] as const

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DonateButton({ copy }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        className="donate-btn"
        onClick={() => setOpen(true)}
        aria-label={copy.openAria}
        title={copy.openAria}
      >
        <HeartIcon />
      </button>

      {open && (
        <div className="donate-modal-overlay" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="donate-modal"
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="donate-modal__header">
              <h3 className="donate-modal__title">
                <span className="donate-modal__heart" aria-hidden="true">
                  <HeartIcon />
                </span>
                {copy.title}
              </h3>
              <button
                type="button"
                className="donate-modal__close"
                onClick={() => setOpen(false)}
                aria-label={copy.close}
              >
                ×
              </button>
            </div>

            <p className="donate-modal__message">{copy.message}</p>

            <div className="donate-modal__links">
              {DONATE_LINKS.map((link, index) => (
                <Fragment key={link.url}>
                  {index > 0 && (
                    <div className="donate-divider">
                      <span>{copy.orSeparator}</span>
                    </div>
                  )}
                  <a
                    className={`donate-link donate-link--${link.modifier}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
