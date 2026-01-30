'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useReducedMotion } from '@/hooks'
import type { Metric } from '@/content/meta'

interface StatCardProps {
  metric: Metric
  staggerIndex?: number
}

function parseValue(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([+-]?)(\d+)(.*)$/)
  if (!match) return { number: 0, prefix: '', suffix: value }

  return {
    prefix: match[1] || '',
    number: parseInt(match[2], 10),
    suffix: match[3] || '',
  }
}

/**
 * Debounced IntersectionObserver: the element must stay visible for 200ms
 * before triggering. This prevents false positives caused by layout shifts
 * (e.g. MDXContent async load pushing MetricsGrid out of viewport).
 */
function useDebouncedInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    let timerId: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(() => {
            setIsInView(true)
            observer.disconnect()
          }, 200)
        } else {
          if (timerId) {
            clearTimeout(timerId)
            timerId = undefined
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      if (timerId) clearTimeout(timerId)
    }
  }, [ref])

  return isInView
}

export function StatCard({ metric, staggerIndex = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useDebouncedInView(ref)
  const reducedMotion = useReducedMotion()

  const { prefix, number, suffix } = parseValue(metric.value)
  const animatedNumber = useCountUp(number, isInView)

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border border-border bg-card p-6"
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 20,
        filter: reducedMotion ? 'blur(0px)' : 'blur(4px)',
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : {}
      }
      transition={{
        duration: reducedMotion ? 0.1 : 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: reducedMotion ? 0 : staggerIndex * 0.1,
      }}
    >
      <div className="text-4xl font-bold text-foreground">
        {prefix}
        <motion.span>{animatedNumber}</motion.span>
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-foreground">
        {metric.label}
      </div>
      {metric.description && (
        <div className="mt-1 text-sm text-muted-foreground">
          {metric.description}
        </div>
      )}
    </motion.div>
  )
}
