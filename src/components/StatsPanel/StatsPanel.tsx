import type { TypingMetrics } from '@/types/domain'
import './StatsPanel.css'

interface Props {
  metrics: TypingMetrics
  live?: boolean
}

export function StatsPanel({ metrics, live = false }: Props) {
  return (
    <div className="stats" aria-label={live ? 'Estadísticas en vivo' : 'Resultados'}>
      <Stat label="WPM" value={metrics.wpmNet} />
      <Stat label="Bruto" value={metrics.wpmGross} small />
      <Stat label="Precisión" value={`${metrics.accuracy}%`} />
      <Stat label="Errores" value={metrics.errors} />
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
