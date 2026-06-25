'use client'

import { useLanguage } from '@/contexts'
import { BentoGrid } from './BentoGrid'

export function HeroLanding() {
  const { locale } = useLanguage()

  return (
    <section
      className="relative w-full overflow-x-clip pb-8 lg:pb-0"
      aria-label={locale === 'fr' ? 'Accueil' : 'Home'}
    >
      <BentoGrid />
    </section>
  )
}
