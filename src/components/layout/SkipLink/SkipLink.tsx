import type { Locale } from '@/content/meta'

interface SkipLinkProps {
  locale: Locale
}

export function SkipLink({ locale }: SkipLinkProps) {
  const label = locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </a>
  )
}
