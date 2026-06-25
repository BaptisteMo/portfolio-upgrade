'use client'

import { cn } from '@/lib/utils'
import { SvgHoverAnimation } from './SvgHoverAnimation'
import { ContactGreeting } from './ContactGreeting'

interface HoverAnimationSlotProps {
  /** Identifier for the card's hover animation. */
  name: string
  /** Card hover state (drives the SVG timeline). */
  hovered: boolean
  className?: string
}

/**
 * Animation assets per card. `rest` = frozen frame when idle, `full` = "settled"
 * frame held while hovered (both in seconds; hover plays rest→full, leave plays
 * full→rest in reverse).
 */
const SVG_ANIMATIONS: Record<
  string,
  { src: string; rest: number; full: number; className?: string }
> = {
  projects: { src: '/images/anim/MyProject.svg', rest: 0.22, full: 1.6 },
  'ai-explorations': { src: '/images/anim/AiExplorations.svg', rest: 0.12, full: 1.45 },
  // draw-on logo: blank at rest, traces + fills on hover. currentColor → navy in
  // light, white in dark.
  // idle = ghost outline (all contours drawn, 0 fill ≈ 1.78s); hover floods the fill in.
  atlas: {
    src: '/images/anim/Klepierre.svg',
    rest: 1.78,
    full: 3,
    className: 'text-[#1B214D] dark:text-white',
  },
  // idle = empty prompt field (caret blinks); hover types "Help me build..." then
  // the mini-UI draws itself in line + fills.
  studio: { src: '/images/anim/Studio.svg', rest: 0.02, full: 2.95 },
}

/** Per-card hover animation: cycling greeting for "contact", else a SMIL-SVG. */
export function HoverAnimationSlot({ name, hovered, className }: HoverAnimationSlotProps) {
  // "Me contacter": cycling greeting text (slot-text roll) instead of an SVG.
  if (name === 'contact') {
    return <ContactGreeting hovered={hovered} className={className} />
  }

  const svg = SVG_ANIMATIONS[name]
  if (!svg) return null

  return (
    <SvgHoverAnimation
      src={svg.src}
      rest={svg.rest}
      full={svg.full}
      hovered={hovered}
      className={cn(className, svg.className)}
    />
  )
}
