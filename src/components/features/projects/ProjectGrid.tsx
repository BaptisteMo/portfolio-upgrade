'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { ProjectCard } from './ProjectCard'
import type { ProjectMeta } from '@/content/meta'

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

interface ProjectGridProps {
  projects: ProjectMeta[]
  emptyLabel?: string
}

export function ProjectGrid({ projects, emptyLabel }: ProjectGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const reducedMotion = useReducedMotion()

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {emptyLabel ?? 'No projects to display.'}
      </div>
    )
  }

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : cardVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVars}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <motion.div key={project.slug} variants={itemVars}>
          <ProjectCard project={project} priority={index < 2} />
        </motion.div>
      ))}
    </motion.div>
  )
}
