'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts'
import { Download } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from '@/components/shared'
import { ShortcutsBar } from '@/components/features/shortcuts-bar'
import { Button } from '@/components/ui/button'

const navItems = {
  fr: [
    { label: 'Accueil', href: '' },
    { label: 'Projets', href: '/projects' },
    { label: 'Exploration IA', href: '/ai-journey' },
    { label: 'Contact', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '' },
    { label: 'Projects', href: '/projects' },
    { label: 'AI Journey', href: '/ai-journey' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function NavPanel() {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const items = navItems[locale]

  // Helper to build locale-aware href
  const getHref = (path: string) => `/${locale}${path}`

  // Check if a nav item is active
  const isActiveItem = (href: string) => {
    const fullHref = getHref(href)
    if (href === '') {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(fullHref)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      {/* Logo/Name (AC1) */}
      <Link
        href={getHref('')}

        aria-label={locale === 'fr' ? "Retour à l'accueil" : 'Back to home'}
        className={cn(
          // desktop sidebar only — in the mobile drawer the brand is redundant
          // (MobileHeader bar + drawer "Menu" header already carry identity)
          'mb-8 hidden text-lg font-bold text-foreground lg:block',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm'
        )}
      >
        Baptiste Morillon
      </Link>

      {/* Main Navigation (AC2, AC4) */}
      <nav aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = isActiveItem(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={getHref(item.href)}
          
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-all duration-150 ease-out',
                    'hover:bg-muted hover:text-foreground hover:translate-x-1',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    'motion-reduce:hover:translate-x-0',
                    isActive
                      ? 'bg-muted text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-4 pt-6 border-t border-border">
        <Button asChild size="lg" className="w-full">
          <a href={`/cv-baptiste-morillon-${locale}.pdf`} download>
            <Download />
            {locale === 'fr' ? 'Télécharger mon CV' : 'Download my CV'}
          </a>
        </Button>
        <ShortcutsBar />
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
