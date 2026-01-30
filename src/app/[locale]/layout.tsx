import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/contexts'
import { SkipLink } from '@/components/layout'
import { LazyCommandPaletteProvider } from '@/components/features/command-palette'
import { LazyDesignForensicsOverlay } from '@/components/features/easter-egg'
import type { Locale } from '@/content/meta'

const locales: Locale[] = ['fr', 'en']

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <LanguageProvider locale={locale}>
      <SkipLink locale={locale} />
      {children}
      <LazyCommandPaletteProvider />
      <LazyDesignForensicsOverlay />
    </LanguageProvider>
  )
}
