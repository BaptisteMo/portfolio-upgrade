import { StatCard } from './StatCard'
import type { Metric } from '@/content/meta'

interface MetricsGridProps {
  metrics: Metric[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-8 max-w-187.5 mx-auto">
      {metrics.map((metric, index) => (
        <StatCard key={index} metric={metric} staggerIndex={index} />
      ))}
    </div>
  )
}
