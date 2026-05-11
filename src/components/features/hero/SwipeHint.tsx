'use client'

import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Hand } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

const INTERVAL_MS = 7000

export function SwipeHint() {
  const reducedMotion = useReducedMotion()
  const controls = useAnimationControls()

  useEffect(() => {
    if (reducedMotion) return

    let cancelled = false

    const run = async () => {
      if (cancelled) return
      await controls.start({
        opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        rotate: [0, 25, 25, 0, 25, 25, 0, 25, 25, 0],
        x: [0, 30, 30, 0, 30, 30, 0, 30, 30, 0],
        transition: {
          duration: 2.3,
          ease: 'easeInOut',
          times: [0, 0.087, 0.217, 0.304, 0.391, 0.522, 0.609, 0.696, 0.826, 1],
        },
      })
    }

    run()
    const id = window.setInterval(run, INTERVAL_MS)

    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [controls, reducedMotion])

  if (reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, rotate: 0, x: 0 }}
      animate={controls}
      style={{ transformOrigin: '20% 80%' }}
      className="pointer-events-none absolute bottom-10 right-20 z-50 text-muted-foreground"
    >
      <Hand className="h-6 w-6" />
    </motion.div>
  )
}
