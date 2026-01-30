import type { Locale } from '@/content/meta'

const LOCALE_KEY = 'preferred-locale'

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(LOCALE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  return null
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCALE_KEY, locale)
}
