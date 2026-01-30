'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PanelRightOpen, X } from 'lucide-react'
import { useLanguage } from '@/contexts'
import { useMediaQuery } from '@/hooks'
import { useReducedMotion } from '@/hooks'

interface MobileFABProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileFAB({ isOpen, onToggle }: MobileFABProps) {
  const { locale } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const reducedMotion = useReducedMotion()

  const label = isOpen
    ? locale === 'fr' ? 'Fermer le panneau' : 'Close panel'
    : locale === 'fr' ? 'Ouvrir le panneau contextuel' : 'Open context panel'

  const Icon = isOpen ? X : PanelRightOpen

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.button
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          aria-label={label}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Icon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
