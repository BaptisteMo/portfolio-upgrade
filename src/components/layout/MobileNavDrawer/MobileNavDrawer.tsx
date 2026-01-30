'use client'

import { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'

interface MobileNavDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MobileNavDrawer({ open, onOpenChange, children }: MobileNavDrawerProps) {
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/50"
              />
            </Dialog.Overlay>

            <Dialog.Content forceMount asChild>
              <motion.div
                initial={reducedMotion ? undefined : { x: '-100%' }}
                animate={reducedMotion ? undefined : { x: 0 }}
                exit={reducedMotion ? undefined : { x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 left-0 z-40 flex h-full w-70 max-w-[80vw] flex-col border-r border-border bg-background shadow-xl"
              >
                {/* Header with close button */}
                <div className="flex h-14 items-center justify-between border-b border-border px-4">
                  <span className="text-sm font-medium text-foreground">Menu</span>
                  <Dialog.Close asChild>
                    <button
                      aria-label={locale === 'fr' ? 'Fermer le menu' : 'Close menu'}
                      className="flex min-h-[--touch-target] min-w-[--touch-target] items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Nav content — close drawer on link click via event delegation */}
                <div
                  className="flex-1 overflow-y-auto"
                  onClick={(e) => {
                    const target = (e.target as HTMLElement).closest('a')
                    if (target) onOpenChange(false)
                  }}
                >
                  {children}
                </div>

                <Dialog.Title className="sr-only">
                  {locale === 'fr' ? 'Menu de navigation' : 'Navigation menu'}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  {locale === 'fr' ? 'Navigation principale du site' : 'Main site navigation'}
                </Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
