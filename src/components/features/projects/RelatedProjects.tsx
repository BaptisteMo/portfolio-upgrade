'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'
import { ProjectCard } from './ProjectCard'
import type { ProjectMeta } from '@/content/meta'

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
}

interface RelatedProjectsProps {
  projects: ProjectMeta[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -200px 0px' })
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  if (projects.length === 0) return null

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : cardVariants

  return (
    <section ref={ref} className="mt-16 border-t border-border pt-12 pb-8 mx-auto max-w-170 ">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={reducedMotion ? { duration: 0.1 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 text-lg font-semibold text-foreground"
      >
        {locale === 'fr' ? 'Autres projets' : 'Other projects'}
      </motion.h2>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVars}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVars}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
