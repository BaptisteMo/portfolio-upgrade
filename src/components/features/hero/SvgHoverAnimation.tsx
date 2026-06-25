'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

interface SvgHoverAnimationProps {
  /** Public path to a SMIL-animated SVG (e.g. /images/anim/MyProject.svg). */
  src: string
  /** Drives play (true) / reverse (false). */
  hovered: boolean
  /** Resting timeline position in seconds (frozen state when not hovered). */
  rest?: number
  /** Target timeline position in seconds when hovered (the "settled" state). */
  full?: number
  className?: string
}

const FWD_SPEED = 1 // forward playback rate
const REV_SPEED = 1.5 // reverse is a touch snappier

/**
 * Inlines a SMIL-animated SVG and scrubs its timeline by hand:
 * - at rest: parked on `rest`
 * - on hover: plays forward to `full` and holds there
 * - on leave: plays in reverse back to `rest` (never freezes mid-state)
 *
 * The SVG's own SMIL clock stays paused; we step `setCurrentTime` via rAF so we
 * can go both directions (SMIL has no native reverse).
 */
export function SvgHoverAnimation({
  src,
  hovered,
  rest = 0.12,
  full = 1.45,
  className,
}: SvgHoverAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const curRef = useRef(rest)
  const rafRef = useRef(0)
  const reducedMotion = useReducedMotion()

  // Load + inline the SVG once, then park it on the rest frame.
  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => r.text())
      .then((markup) => {
        if (cancelled || !containerRef.current) return
        containerRef.current.innerHTML = markup
        const svg = containerRef.current.querySelector('svg')
        if (!(svg instanceof SVGSVGElement)) return
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')
        svg.setCurrentTime(rest)
        svg.pauseAnimations()
        svgRef.current = svg
        curRef.current = rest
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [src, rest])

  // Scrub forward on hover, reverse on leave.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (reducedMotion) {
      svg.setCurrentTime(rest)
      svg.pauseAnimations()
      curRef.current = rest
      return
    }

    const target = hovered ? full : rest
    const dir = hovered ? 1 : -1
    const speed = hovered ? FWD_SPEED : REV_SPEED
    cancelAnimationFrame(rafRef.current)

    let last = 0
    const step = (ts: number) => {
      if (!last) last = ts
      const dt = (ts - last) / 1000
      last = ts
      let c = curRef.current + dir * speed * dt
      if ((dir > 0 && c >= target) || (dir < 0 && c <= target)) c = target
      curRef.current = c
      svg.setCurrentTime(c)
      svg.pauseAnimations()
      if (c !== target) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovered, reducedMotion, rest, full])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center',
        // radial halo: animation crisp in the centre, edges melt into the card bg
        '[-webkit-mask-image:radial-gradient(ellipse_62%_64%_at_50%_50%,#000_20%,transparent_88%)]',
        'mask-[radial-gradient(ellipse_62%_64%_at_50%_50%,#000_20%,transparent_88%)]',
        className,
      )}
    />
  )
}
