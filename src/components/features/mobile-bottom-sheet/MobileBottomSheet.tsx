'use client'

import { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'

interface MobileBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MobileBottomSheet({ open, onOpenChange, children }: MobileBottomSheetProps) {
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>

            {/* Sheet */}
            <Dialog.Content forceMount asChild>
              <motion.div
                initial={reducedMotion ? undefined : { y: '100%' }}
                animate={reducedMotion ? undefined : { y: 0 }}
                exit={reducedMotion ? undefined : { y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.3 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) {
                    onOpenChange(false)
                  }
                }}
                className="fixed bottom-0 left-0 right-0 z-40 flex h-[70vh] flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl"
              >
                {/* Drag handle */}
                <div className="flex justify-center py-3">
                  <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-[env(safe-area-inset-bottom)]">
                  {children}
                </div>

                {/* Accessibility */}
                <Dialog.Title className="sr-only">
                  {locale === 'fr' ? 'Panneau contextuel' : 'Context panel'}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  {locale === 'fr' ? 'Informations contextuelles liées à la section en cours' : 'Contextual information related to the current section'}
                </Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
