'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useLanguage } from '@/contexts'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { locale } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm">
      <button
        onClick={onMenuClick}
        aria-label={locale === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
        className="flex min-h-[--touch-target] min-w-[--touch-target] items-center justify-center rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link
        href={`/${locale}`}
        className="rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Baptiste Morillon
      </Link>

      {/* Spacer for centering */}
      <div className="min-w-[--touch-target]" />
    </header>
  )
}
