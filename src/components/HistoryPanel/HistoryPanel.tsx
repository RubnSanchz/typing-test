import type { HistoryStats } from '@/types/domain'
import './HistoryPanel.css'

interface Props {
  stats: HistoryStats
  onClear: () => void
}

export function HistoryPanel({ stats, onClear }: Props) {
  return (
    <section className="history" aria-label="Historial local">
      <div className="history__header">
        <h3>Historial local</h3>
        {stats.totalTests > 0 && (
          <button className="history__clear" onClick={onClear}>
            Borrar
          </button>
        )}
      </div>

      {stats.totalTests === 0 ? (
        <p className="history__empty">Aún no hay tests guardados.</p>
      ) : (
        <div className="history__grid">
          <div className="history__item">
            <span className="history__value">{stats.totalTests}</span>
            <span className="history__label">Tests</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.best?.wpmNet ?? 0}</span>
            <span className="history__label">WPM máx</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.maxAccuracy}%</span>
            <span className="history__label">Precisión máx</span>
          </div>
          <div className="history__item">
            <span className="history__value">{stats.averageWpm}</span>
            <span className="history__label">WPM medio</span>
          </div>
        </div>
      )}
    </section>
  )
}
