'use client'

import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ParallaxOptions {
  speed?: number
  direction?: 'y' | 'x'
  maxOffset?: number
}

/**
 * GSAP ScrollTrigger parallax hook.
 * Applies a subtle scroll-linked transform to the referenced element.
 * Disabled on mobile (<768px) and when prefers-reduced-motion is set.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const reducedMotion = useReducedMotion()
  const { speed = 0.3, direction = 'y', maxOffset = 50 } = options

  useEffect(() => {
    if (reducedMotion) return
    if (!ref.current) return
    if (typeof window === 'undefined') return

    // Mobile guard
    if (window.matchMedia('(max-width: 768px)').matches) return

    // Double-check reduced motion via native API (SSR safety)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let tween: gsap.core.Tween | undefined

    async function init() {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.default

      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !ref.current) return

      const offset = maxOffset * speed
      const animProps: Record<string, unknown> = {
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
      animProps[direction] = offset

      tween = gsap.to(ref.current, animProps)
    }

    init()

    return () => {
      cancelled = true
      if (tween) {
        const trigger = tween.scrollTrigger
        trigger?.kill()
        tween.kill()
      }
    }
  }, [reducedMotion, speed, direction, maxOffset])
}
