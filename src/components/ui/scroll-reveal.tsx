'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

const STAGGER_PER_100PX = 0.06

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px 0px -50px 0px',
  })
  const reducedMotion = useReducedMotion()
  const [computedDelay, setComputedDelay] = useState(delay)

  // On first render, compute a stagger delay based on Y position
  // so all initially-visible elements cascade like a wave
  useEffect(() => {
    if (ref.current && delay === 0) {
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        setComputedDelay(Math.max(0, rect.top * STAGGER_PER_100PX / 100))
      }
    }
  }, [delay])

  const variants = reducedMotion ? reducedMotionVariants : revealVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay: computedDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
