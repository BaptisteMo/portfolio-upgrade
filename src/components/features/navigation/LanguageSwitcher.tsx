'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts'
import { setStoredLocale } from '@/lib/locale-storage'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { Locale } from '@/content/meta'

const locales: Locale[] = ['fr', 'en']

export function LanguageSwitcher() {
  const { locale: currentLocale } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    setStoredLocale(newLocale)

    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    // Smooth crossfade via View Transitions API (graceful fallback)
    if (document.startViewTransition) {
      document.startViewTransition(() => router.push(newPath))
    } else {
      router.push(newPath)
    }
  }

  return (
    <div className="relative flex items-center rounded-lg border border-border bg-card p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            'relative z-10 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            locale === currentLocale
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-pressed={locale === currentLocale}
          aria-label={locale === 'fr' ? 'Français' : 'English'}
        >
          {locale === currentLocale && (
            <motion.span
              layoutId="locale-indicator"
              className="absolute inset-0 rounded-md bg-primary"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{locale.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
