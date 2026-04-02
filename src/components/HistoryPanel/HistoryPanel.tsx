import type { HistoryStats } from '@/types/domain'
import type { HistoryPanelCopy } from '@/data/uiCopy'
import './HistoryPanel.css'

interface Props {
  stats: HistoryStats
  onClear: () => void
  profileName: string
  copy: HistoryPanelCopy
}

export function HistoryPanel({ stats, onClear, profileName, copy }: Props) {
  return (
    <section className="history" aria-label={copy.sectionAria}>
      <div className="history__header">
        <h3>{copy.title} · {profileName}</h3>
        {stats.totalTests > 0 && (
          <button className="history__clear" onClick={onClear}>
            {copy.clear}
          </button>
        )}
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
    </section>
  )
}
