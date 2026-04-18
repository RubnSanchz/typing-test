import { useState } from 'react'
import clsx from 'clsx'
import type { HistoryPanelCopy } from '@/data/uiCopy'
import type { HistoryMode, HistoryModeEntry, HistoryStats } from '@/types/domain'
import './HistoryPanel.css'

interface Props {
  stats: HistoryStats
  breakdown: HistoryModeEntry[]
  currentMode: HistoryMode
  onClear: () => void
  onApplyMode: (mode: HistoryMode) => void
  profileName: string
  copy: HistoryPanelCopy
}

export function HistoryPanel({ stats, breakdown, currentMode, onClear, onApplyMode, profileName, copy }: Props) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="history" aria-label={copy.sectionAria}>
      <div className="history__header">
        <div>
          <h3>{copy.title} · {profileName}</h3>
          <p className="history__mode-summary">
            {copy.modeLabel}: {copy.languageOptions[currentMode.language]} · {currentMode.duration}s ·{' '}
            {currentMode.ignorePunctuation ? copy.punctuationOffShort : copy.punctuationOnShort}
          </p>
        </div>

        <div className="history__header-actions">
          <button className="history__clear" onClick={() => setShowDetails(true)}>
            {copy.details}
          </button>
          {stats.totalTests > 0 && (
            <button className="history__clear" onClick={onClear}>
              {copy.clear}
            </button>
          )}
        </div>
      </div>

      {stats.totalTests === 0 ? (
        <p className="history__empty">{copy.empty}</p>
      ) : (
        <div className="history__grid">
          <div className="history__item">
            <span className="history__value">{stats.totalTests}</span>
            <span className="history__label">{copy.testsLabel}</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.best?.wpmNet ?? 0}</span>
            <span className="history__label">{copy.bestWpmLabel}</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.maxAccuracy}%</span>
            <span className="history__label">{copy.bestAccuracyLabel}</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.averageWpm}</span>
            <span className="history__label">{copy.averageWpmLabel}</span>
          </div>
        </div>
      )}

      {showDetails ? (
        <div className="history__modal-overlay" onClick={() => setShowDetails(false)} role="presentation">
          <div
            className="history__modal"
            role="dialog"
            aria-modal="true"
            aria-label={copy.detailsTitle}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history__modal-header">
              <div>
                <h3 className="history__modal-title">{copy.detailsTitle}</h3>
                <p className="history__modal-hint">{copy.detailsHint}</p>
              </div>
              <button className="history__clear" onClick={() => setShowDetails(false)}>
                {copy.close}
              </button>
            </div>

            <div className="history__table-wrap">
              <table className="history__table">
                <thead>
                  <tr>
                    <th>{copy.languageHeader}</th>
                    <th colSpan={2}>15s</th>
                    <th colSpan={2}>30s</th>
                    <th colSpan={2}>60s</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>{copy.punctuationOffShort}</th>
                    <th>{copy.punctuationOnShort}</th>
                    <th>{copy.punctuationOffShort}</th>
                    <th>{copy.punctuationOnShort}</th>
                    <th>{copy.punctuationOffShort}</th>
                    <th>{copy.punctuationOnShort}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(copy.languageOptions).map(([language, label]) => (
                    <tr key={language}>
                      <th>{label}</th>
                      {breakdown
                        .filter((entry) => entry.language === language)
                        .map((entry) => {
                          const isActive =
                            entry.language === currentMode.language &&
                            entry.duration === currentMode.duration &&
                            entry.ignorePunctuation === currentMode.ignorePunctuation

                          return (
                            <td key={`${entry.language}-${entry.duration}-${entry.ignorePunctuation ? 'plain' : 'punct'}`}>
                              <button
                                className={clsx('history__mode-cell', { 'history__mode-cell--active': isActive })}
                                onClick={() => {
                                  onApplyMode(entry)
                                  setShowDetails(false)
                                }}
                              >
                                <span className="history__mode-value">
                                  {entry.stats.totalTests > 0 ? entry.stats.averageWpm : '—'}
                                </span>
                                <span className="history__mode-meta">
                                  {entry.stats.totalTests > 0 ? `${entry.stats.totalTests} ${copy.testsLabel}` : copy.noData}
                                </span>
                              </button>
                            </td>
                          )
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
