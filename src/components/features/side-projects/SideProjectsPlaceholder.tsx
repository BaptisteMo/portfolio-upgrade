'use client'

import { Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Constellation } from './Constellation'

const content = {
  fr: {
    title: 'Side projects',
    line1: 'Cette section est en cours de construction.',
    line2: 'De nouveaux projets arrivent bientôt.',
    cta: 'Retour aux projets',
  },
  en: {
    title: 'Side projects',
    line1: 'This section is under construction.',
    line2: 'New projects coming soon.',
    cta: 'Back to projects',
  },
} as const

export function SideProjectsPlaceholder() {
  const { locale } = useLanguage()
  const t = content[locale]

  return (
    <div className="relative flex min-h-[calc(100vh-1.5rem)] lg:min-h-screen items-center justify-center overflow-hidden">
      {/* Constellation background */}
      <div className="absolute inset-0">
        <Constellation className="h-full w-full" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 text-center px-4"
      >
        <div className="flex items-center justify-center rounded-full border border-(--glass-border) bg-(--glass-bg) backdrop-blur-sm p-4">
          <Rocket className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground max-w-sm">
            {t.line1}
            <br />
            {t.line2}
          </p>
        </div>

        <Button variant="outline" asChild>
          <Link href={`/${locale}/projects`}>
            {t.cta}
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
