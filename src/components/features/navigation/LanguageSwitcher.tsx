'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts'
import { setStoredLocale } from '@/lib/locale-storage'
import { cn } from '@/lib/utils'
import type { Locale } from '@/content/meta'

const locales: Locale[] = ['fr', 'en']

export function LanguageSwitcher() {
  const { locale: currentLocale } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // Save preference
    setStoredLocale(newLocale)

    // Replace locale in pathname
    // /fr/projects/slug → /en/projects/slug
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <div className="flex items-center rounded-lg border border-border bg-card p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            locale === currentLocale
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
          aria-pressed={locale === currentLocale}
          aria-label={locale === 'fr' ? 'Français' : 'English'}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
