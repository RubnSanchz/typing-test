import type { TypingMetrics, BestResult } from '@/types/domain'
import type { UiCopy } from '@/data/uiCopy'
import { StatsPanel } from '@/components/StatsPanel/StatsPanel'
import './ResultsModal.css'

interface Props {
  metrics: TypingMetrics
  best: BestResult | null
  onRestart: () => void
  copy: UiCopy
}

export function ResultsModal({ metrics, best, onRestart, copy }: Props) {
  const isNewBest = !best || metrics.wpmNet > best.wpmNet

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={copy.resultsModal.dialogAria}>
      <div className="modal">
        <h2 className="modal__title">
          {isNewBest ? copy.resultsModal.titleNewBest : copy.resultsModal.titleResults}
        </h2>

        <StatsPanel metrics={metrics} copy={copy.statsPanel} />

        {best && !isNewBest && (
          <p className="modal__best">
            {copy.resultsModal.bestPrefix} <strong>{best.wpmNet} {copy.resultsModal.speedUnit}</strong> · {best.accuracy}%
          </p>
        )}

        <button className="modal__restart-btn" onClick={onRestart} autoFocus>
          {copy.resultsModal.retry}
        </button>

        <p className="modal__hint">{copy.resultsModal.shortcutHintPrefix} <kbd>Tab</kbd> + <kbd>Enter</kbd></p>
      </div>
    </div>
  )
}
