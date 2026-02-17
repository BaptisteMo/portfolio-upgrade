'use client'

import { useState, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion'
import type { ExperienceItem } from '@/content/meta'

interface TimelineProps {
  items: ExperienceItem[]
}

const SWIPE_THRESHOLD = 60
const DRAG_THRESHOLD = 10

function SwipeCard({
  item,
  index,
  total,
  active,
  onSwipe,
}: {
  item: ExperienceItem
  index: number
  total: number
  active: number
  onSwipe: () => void
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [0, DRAG_THRESHOLD, 200], [0, 0, 12])
  const opacity = useTransform(x, [0, DRAG_THRESHOLD, 100, 200], [1, 1, 1, 0.5])

  const offset = index - active

  // Only render the top 3 cards
  if (offset < 0 || offset > 2) return null

  const isTop = offset === 0

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe()
    }
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex: total - offset,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
      }}
      animate={{
        scale: 1 - offset * 0.05,
        y: offset * 12,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.7 }}
      dragMomentum={false}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ cursor: 'grabbing' }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 shadow-secondary-glow cursor-grab active:cursor-grabbing select-none">
        {/* Large year watermark */}
        <span
          className="absolute -top-6 -right-2 text-[8rem] md:text-[10rem] font-bold leading-none text-muted-foreground/[0.06] pointer-events-none"
          aria-hidden="true"
        >
          {item.year}
        </span>

        {/* Content */}
        <div className="relative">
          <span className="inline-block text-xs font-medium text-primary tracking-wide uppercase mb-2">
            {item.year}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-foreground">
            {item.title}
          </h3>
          <p className="text-muted-foreground mt-1">{item.company}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline({ items }: TimelineProps) {
  const [active, setActive] = useState(0)

  const handleSwipe = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length)
  }, [items.length])

  return (
    <div className="relative max-w-187.5 mx-auto">
      {/* Card stack */}
      <div className="relative h-40 md:h-36">
        {items.map((item, index) => (
          <SwipeCard
            key={index}
            item={item}
            index={index}
            total={items.length}
            active={active}
            onSwipe={handleSwipe}
          />
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active
                ? 'w-6 bg-primary'
                : 'w-2 bg-muted-foreground/30'
            }`}
            aria-label={`Expérience ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
