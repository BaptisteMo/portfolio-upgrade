'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts'

const STORAGE_KEY = 'shortcuts-hint-dismissed'

function isMac(): boolean {
  if (typeof navigator === 'undefined') return true
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
}

export function ShortcutsBar() {
  const { locale } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Read localStorage on mount (client only)
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  // Listen for palette-opened custom event
  useEffect(() => {
    function handlePaletteOpened() {
      localStorage.setItem(STORAGE_KEY, 'true')
      setVisible(false)
    }

    window.addEventListener('shortcuts-hint-dismiss', handlePaletteOpened)
    return () =>
      window.removeEventListener('shortcuts-hint-dismiss', handlePaletteOpened)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  const modKey = isMac() ? '⌘' : 'Ctrl'
  const label = locale === 'fr' ? 'Rechercher' : 'Search'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 right-4 z-40 hidden items-center gap-2 rounded-lg border border-border bg-popover/80 px-3 py-2 shadow-sm backdrop-blur-sm md:flex"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {modKey}K
            </kbd>
            {label}
          </span>
          <button
            onClick={dismiss}
            className="ml-1 rounded p-0.5 text-muted-foreground/60 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
