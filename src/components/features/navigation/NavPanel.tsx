'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from '@/components/shared'

const navItems = {
  fr: [
    { label: 'Accueil', href: '' },
    { label: 'Projets', href: '/projects' },
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
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
          'mb-8 text-lg font-bold text-foreground',
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

      {/* Language Switcher */}
      <div className="mt-auto pt-6 border-t border-border ">
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
