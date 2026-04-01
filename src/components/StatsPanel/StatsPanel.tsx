import type { TypingMetrics } from '@/types/domain'
import type { StatsPanelCopy } from '@/data/uiCopy'
import './StatsPanel.css'

interface Props {
  metrics: TypingMetrics
  live?: boolean
  copy: StatsPanelCopy
}

export function StatsPanel({ metrics, live = false, copy }: Props) {
  return (
    <div className="stats" aria-label={live ? copy.ariaLive : copy.ariaResults}>
      <Stat label={copy.wpmNetLabel} value={metrics.wpmNet} />
      <Stat label={copy.wpmGrossLabel} value={metrics.wpmGross} small />
      <Stat label={copy.accuracyLabel} value={`${metrics.accuracy}%`} />
      <Stat label={copy.errorsLabel} value={metrics.errors} />
    </div>
  )
}

function Stat({ label, value, small }: { label: string; value: string | number; small?: boolean }) {
  return (
    <div className={`stats__item${small ? ' stats__item--small' : ''}`}>
      <span className="stats__value">{value}</span>
      <span className="stats__label">{label}</span>
    </div>
  )
}
