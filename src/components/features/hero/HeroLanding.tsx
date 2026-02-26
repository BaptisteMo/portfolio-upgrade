'use client'

import { useLanguage } from '@/contexts'
import type { ExperienceItem, AvailabilityStatus } from '@/content/meta'
import { BentoGrid } from './BentoGrid'

interface HeroLandingProps {
  experience: ExperienceItem[]
  skills: string[]
  availability: AvailabilityStatus
}

export function HeroLanding({ experience, skills, availability }: HeroLandingProps) {
  const { locale } = useLanguage()

  return (
    <section
      className="relative flex min-h-[calc(100vh-1.5rem)] lg:min-h-screen items-center justify-center overflow-hidden px-4 py-8"
      aria-label={locale === 'fr' ? 'Accueil' : 'Home'}
    >
      <BentoGrid
        experience={experience}
        skills={skills}
        availability={availability}
      />
    </section>
  )
}
