'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { TiltCard } from './TiltCard'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.09,
      ease: EASE,
    },
  }),
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
}

interface GradientConfig {
  position: string
}

const GRADIENTS: Record<string, GradientConfig> = {
  identity: { position: 'at 20% 80%' },
  bio: { position: 'at 80% 20%' },
  experience: { position: 'at 50% 50%' },
  skills: { position: 'at 50% 50%' },
  projects: { position: 'at 50% 50%' },
  contact: { position: 'at 50% 50%' },
}

interface BentoCardProps {
  index: number
  variant: string
  className?: string
  children: React.ReactNode
}

export function BentoCard({ index, variant, className, children }: BentoCardProps) {
  const reducedMotion = useReducedMotion()
  const gradient = GRADIENTS[variant] ?? GRADIENTS.identity

  return (
    <TiltCard className={cn("rounded-2xl", className)}>
      <motion.div
        custom={index}
        variants={reducedMotion ? reducedVariants : cardVariants}
        className={cn(
          'relative rounded-2xl p-5 md:p-6 overflow-hidden h-full',
          'border border-glass-border',
          'backdrop-blur-sm',
          'transition-[border-color] duration-200 ease-out',
          'hover:border-glass-border-hover',
        )}
        style={{
          backgroundColor: 'var(--glass-bg)',
        }}
      >
        {/* Gradient radial overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200 ease-out opacity-100 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle ${gradient.position}, rgba(255,255,255,0.04), transparent 70%)`,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </TiltCard>
  )
}
