'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const duration = 0.2

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
}

const reducedMotionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  const activeVariants = reducedMotion ? reducedMotionVariants : variants
  const d = reducedMotion ? 0 : duration

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={activeVariants}
          transition={{ duration: d, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
