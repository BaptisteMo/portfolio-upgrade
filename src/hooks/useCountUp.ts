'use client'

import { useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseCountUpOptions {
  duration?: number
  delay?: number
}

export function useCountUp(
  endValue: number,
  isInView: boolean,
  options: UseCountUpOptions = {}
) {
  const { duration = 1, delay = 0 } = options
  const reducedMotion = useReducedMotion()
  const [hasAnimated, setHasAnimated] = useState(false)

  const motionValue = useMotionValue(reducedMotion ? endValue : 0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView && !hasAnimated) {
      if (reducedMotion) {
        motionValue.set(endValue)
      } else {
        const timeout = setTimeout(() => {
          animate(motionValue, endValue, {
            duration,
            ease: 'easeOut',
          })
        }, delay * 1000)

        return () => clearTimeout(timeout)
      }
      setHasAnimated(true)
    }
  }, [isInView, endValue, reducedMotion, delay, motionValue, duration, hasAnimated])

  return rounded
}
