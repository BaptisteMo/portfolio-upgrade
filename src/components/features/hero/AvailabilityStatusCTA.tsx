'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '@/contexts'
import { useReducedMotion } from '@/hooks'
import { availabilityConfig } from '@/config/availability'
import { cn } from '@/lib/utils'
import type { AvailabilityStatus } from '@/content/meta'

const statusConfig: Record<
  AvailabilityStatus,
  { color: string; fr: string; en: string }
> = {
  available: {
    color: 'bg-green-500',
    fr: 'Disponible pour mission',
    en: 'Available for work',
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

const itemVars: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const reducedItemVars: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
}

export function AvailabilityStatusCTA() {
  const { locale } = useLanguage()
  const reducedMotion = useReducedMotion()
  const { status } = availabilityConfig
  const config = statusConfig[status]

  return (
    <motion.div variants={reducedMotion ? reducedItemVars : itemVars} className="mt-8 mb-2">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-card"
      >
        <span
          className={cn(
            'h-2.5 w-2.5 rounded-full',
            config.color,
            status === 'available' && !reducedMotion && 'animate-pulse'
          )}
        />
        <span className="text-sm font-medium text-foreground">
          {config[locale]}
        </span>
      </Link>
    </motion.div>
  )
}
