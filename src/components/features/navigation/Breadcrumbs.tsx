'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { locale } = useLanguage()

  if (items.length === 0) return null

  return (
    <nav aria-label={locale === 'fr' ? "Fil d'Ariane" : 'Breadcrumb'} className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href ?? item.label} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-2 text-muted-foreground"
                  aria-hidden="true"
                >
                  /
                </span>
              )}

              {isLast || !item.href ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-muted-foreground transition-colors',
                    'hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
