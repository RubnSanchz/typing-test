import type { TypingMetrics, BestResult } from '@/types/domain'
import { StatsPanel } from '@/components/StatsPanel/StatsPanel'
import './ResultsModal.css'

interface Props {
  metrics: TypingMetrics
  best: BestResult | null
  onRestart: () => void
}

export function ResultsModal({ metrics, best, onRestart }: Props) {
  const isNewBest = !best || metrics.wpmNet > best.wpmNet

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Resultados">
      <div className="modal">
        <h2 className="modal__title">
          {isNewBest ? '¡Nuevo récord!' : 'Resultados'}
        </h2>

        <StatsPanel metrics={metrics} />

        {best && !isNewBest && (
          <p className="modal__best">
            Tu mejor: <strong>{best.wpmNet} WPM</strong> · {best.accuracy}%
          </p>
        )}

        <button className="modal__restart-btn" onClick={onRestart} autoFocus>
          Volver a intentar
        </button>

        <p className="modal__hint">o pulsa <kbd>Tab</kbd> + <kbd>Enter</kbd></p>
      </div>
    </div>
  )
}
