'use client'

import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface ConcentricCirclesProps {
  /** Position of the circles center */
  position?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  /** Whether to animate on mount */
  animate?: boolean
  /** Additional className for the container */
  className?: string
}

const CIRCLES = [
  { size: 1800, delay: 0 },
  { size: 1500, delay: 0.06 },
  { size: 1200, delay: 0.12 },
  { size: 900, delay: 0.18 },
  { size: 600, delay: 0.24 },
  { size: 300, delay: 0.30 },
]

const circleVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      type: 'spring',
      stiffness: 180,
      damping: 18,
      mass: 1,
    },
  }),
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

const positionClasses: Record<string, string> = {
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
}

export function ConcentricCircles({
  position = 'center',
  animate = true,
  className = '',
}: ConcentricCirclesProps) {
  const reducedMotion = useReducedMotion()
  const circleVars = reducedMotion ? reducedMotionVariants : circleVariants

  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${className}`}
      style={{ inset: 0 }}
    >
      <div className={`absolute ${positionClasses[position]}`}>
        {CIRCLES.map((circle, index) => (
          <motion.div
            key={index}
            custom={circle.delay}
            initial={animate ? 'hidden' : 'visible'}
            animate="visible"
            variants={circleVars}
            className="absolute rounded-full bg-muted/20 shadow-[inset_0_2px_6px_rgba(255,255,255,0.08),inset_0_-2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:bg-muted/30 dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.03),inset_0_-2px_8px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.15)]"
            style={{
              width: circle.size,
              height: circle.size,
              // Center the circle on the position point
              marginLeft: -circle.size / 2,
              marginTop: -circle.size / 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
