'use client'

import { useLanguage } from '@/contexts'
import { cn } from '@/lib/utils'
import type { AvailabilityStatus } from '@/content/meta'

interface AvailabilityBadgeProps {
  status: AvailabilityStatus
}

const statusConfig = {
  available: {
    color: 'bg-green-500',
    fr: 'Disponible',
    en: 'Available',
  },
  'in-talks': {
    color: 'bg-yellow-500',
    fr: 'En discussion',
    en: 'In Talks',
  },
  unavailable: {
    color: 'bg-red-500',
    fr: 'Non disponible',
    en: 'Unavailable',
  },
}

export function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const { locale } = useLanguage()
  const config = statusConfig[status]

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      <span className={cn('h-2 w-2 rounded-full', config.color)} />
      <span className="text-sm font-medium">{config[locale]}</span>
    </div>
  )
}
