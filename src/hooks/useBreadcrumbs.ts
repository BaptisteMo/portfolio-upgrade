'use client'

import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts'
import type { BreadcrumbItem } from '@/components/features/navigation'

const routeLabels: Record<string, Record<string, string>> = {
  fr: {
    '': 'Accueil',
    'projects': 'Projets',
    'about': 'À propos',
    'contact': 'Contact',
  },
  en: {
    '': 'Home',
    'projects': 'Projects',
    'about': 'About',
    'contact': 'Contact',
  },
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const labels = routeLabels[locale]

  // Split path and filter out empty segments and locale
  const segments = pathname.split('/').filter(Boolean)

  // Remove locale from segments (first segment)
  const pathSegments = segments.slice(1)

  if (pathSegments.length === 0) {
    return [] // On home page, no breadcrumbs needed
  }

  const items: BreadcrumbItem[] = [
    { label: labels[''], href: `/${locale}` },
  ]

  let currentPath = `/${locale}`
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = labels[segment] ?? formatSegmentLabel(segment)

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}

function formatSegmentLabel(segment: string): string {
  // Convert kebab-case to Title Case (e.g., "la-wooferie" → "La Wooferie")
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
