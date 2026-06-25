'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { TiltCard } from './TiltCard'
import { HoverAnimationSlot } from './HoverAnimationSlot'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE },
  }),
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

interface HomeCardProps {
  index: number
  href: string
  title: string
  description: string
  /** Lottie slot id for the hover animation. */
  animation: string
  className?: string
}

export function HomeCard({
  index,
  href,
  title,
  description,
  animation,
  className,
}: HomeCardProps) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // On touch / no-hover devices (mobile, tablet) there is no hover, so drive the
  // animation from viewport visibility instead: play when the card scrolls into
  // view, reverse when it leaves.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (canHover) return
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setHovered(entry.isIntersecting),
      { threshold: 0.55, rootMargin: '-8% 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <TiltCard className={cn('rounded-2xl', className)}>
      <motion.div
        ref={cardRef}
        custom={index}
        variants={reducedMotion ? reducedVariants : cardVariants}
        className="h-full rounded-2xl"
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            'group relative flex h-full min-h-55 flex-col overflow-hidden rounded-2xl lg:min-h-0',
            'border border-glass-border bg-card p-5 md:p-6',
            'transition-[border-color] duration-200 ease-out hover:border-glass-border-hover',
          )}
        >
          {/* animation region — in flow above the text so they never overlap */}
          <div className="relative -mx-5 -mt-5 mb-3 min-h-28 flex-1 md:-mx-6 md:-mt-6">
            <HoverAnimationSlot name={animation} hovered={hovered} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-foreground md:text-[23px]">{title}</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </Link>
      </motion.div>
    </TiltCard>
  )
}
