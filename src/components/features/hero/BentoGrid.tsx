'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'
import type { ExperienceItem, AvailabilityStatus } from '@/content/meta'
import { BentoCard } from './BentoCard'
import { IdentityCard } from './IdentityCard'
import { BioCard } from './BioCard'
import { Timeline } from '@/components/features/about'
import { ExperienceCard } from './ExperienceCard'
import { ProjectsCard } from './ProjectsCard'
import { ContactCard } from './ContactCard'

interface BentoGridProps {
  experience: ExperienceItem[]
  skills: string[]
  availability: AvailabilityStatus
}

export function BentoGrid({ experience, skills, availability }: BentoGridProps) {
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reducedMotion ? 0 : 0.09 },
        },
      }}
      className="grid w-full max-w-[80%] mx-auto gap-4 grid-cols-1 md:grid-cols-3 md:min-h-[80vh] md:grid-rows-[auto_auto_1fr_auto]"
    >
      {/* Row 1: Title (2/3) + stacked Identity & CV (1/3, 50/50) */}
      <BentoCard index={0} variant="bio" className="md:col-span-2">
        <BioCard />
      </BentoCard>

      <div className="flex flex-col gap-4">
        <BentoCard index={1} variant="identity" className="flex-1">
          <IdentityCard availability={availability} />
        </BentoCard>

        <BentoCard index={2} variant="experience" className="flex-1">
          <ExperienceCard experience={experience} />
        </BentoCard>
      </div>

      {/* Row 3-4: Projects (1/3, row-span-2) + Quote (2/3) + 2 previews (1/3 each) */}
      <BentoCard index={3} variant="projects" className="md:row-span-2">
        <ProjectsCard />
      </BentoCard>

      <BentoCard index={4} variant="contact" className="md:col-span-2 md:self-start">
        <ContactCard />
      </BentoCard>

      <BentoCard index={5} variant="projects" className="md:min-h-[180px]">
        <Link href={`/${locale}/projects/atlas`} className="absolute -inset-5 md:-inset-6 rounded-2xl overflow-hidden block">
          <Image
            src="/images/projects/atlas/dcm-mockups.png"
            alt="Atlas"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      </BentoCard>

      <BentoCard index={6} variant="projects" className="md:min-h-[180px]">
        <Link href={`/${locale}/projects/design-system`} className="absolute -inset-5 md:-inset-6 rounded-2xl overflow-hidden block">
          <Image
            src="/images/projects/design-system/banner.png"
            alt="Design System"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
      </BentoCard>

      {/* Row 5: Experience carousel (2/3) + Side projects link (1/3) */}
      <BentoCard index={7} variant="experience" className="md:col-span-2">
        <Timeline items={experience} />
      </BentoCard>

      <BentoCard index={8} variant="projects">
        <Link
          href={`/${locale}/side-projects`}
          className="flex flex-col justify-between h-full min-h-[180px] group"
        >
          <Rocket
            className="h-10 w-10 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {locale === 'fr' ? 'Mes sides projects' : 'My side projects'}
          </p>
        </Link>
      </BentoCard>
    </motion.div>
  )
}
