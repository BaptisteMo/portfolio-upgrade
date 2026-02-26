'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'

interface TiltCardProps {
  className?: string
  children: React.ReactNode
}

export function TiltCard({ className, children }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glareRef.current || reducedMotion) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, var(--glare-color), transparent 60%)`
      glareRef.current.style.opacity = '1'
    },
    [reducedMotion]
  )

  const handleMouseLeave = useCallback(() => {
    if (!glareRef.current || reducedMotion) return
    glareRef.current.style.opacity = '0'
  }, [reducedMotion])

  return (
    <div
      ref={cardRef}
      className={cn('relative', className)}
      style={{
        '--glare-color': 'rgba(0, 0, 0, 0.06)',
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {!reducedMotion && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 dark:[--glare-color:rgba(255,255,255,0.08)]"
          style={{
            transition: 'opacity 0.3s ease-out',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
