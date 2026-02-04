'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useKonamiCode } from '@/hooks'

export function DesignForensicsOverlay() {
  const { isActive, toggle } = useKonamiCode()
  const trackedRef = useRef(false)

  // Track discovery once per session
  useEffect(() => {
    if (isActive && !trackedRef.current) {
      track('easter_egg_discovered', { type: 'konami_code' })
      trackedRef.current = true
    }
  }, [isActive])

  // Escape to dismiss
  useEffect(() => {
    if (!isActive) return

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') toggle()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isActive, toggle])

  return (
    <AnimatePresence>
      {isActive && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 pointer-events-none"
      aria-hidden="true"
    >
      {/* Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/90 px-4 py-1.5 text-xs font-mono font-medium text-background tracking-wider uppercase">
        Design Forensics Mode
      </div>

      {/* Column grid overlay */}
      <div className="absolute inset-0 flex gap-0 px-4 md:px-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-x border-dashed border-blue-500/15 first:border-l-0 last:border-r-0 max-md:nth-[n+5]:hidden"
          />
        ))}
      </div>

      {/* Horizontal baseline grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 7px, rgba(59, 130, 246, 0.06) 7px, rgba(59, 130, 246, 0.06) 8px)',
        }}
      />

      {/* Component outlines via global CSS class */}
      <style>{`
        .design-forensics-active main > div > * {
          outline: 1px dashed rgba(239, 68, 68, 0.25) !important;
        }
        .design-forensics-active main > div > * > * {
          outline: 1px dashed rgba(34, 197, 94, 0.2) !important;
        }
      `}</style>
      <BodyClassToggle />
    </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Adds/removes a CSS class on <body> to enable component outlines */
function BodyClassToggle() {
  useEffect(() => {
    document.body.classList.add('design-forensics-active')
    return () => document.body.classList.remove('design-forensics-active')
  }, [])
  return null
}
