'use client'

import { motion, type Variants } from 'framer-motion'
import { ProjectTag } from '@/components/features/projects'
import { useLanguage } from '@/contexts'
import { useReducedMotion } from '@/hooks'
import { cn } from '@/lib/utils'
import type { ProjectMeta } from '@/content/meta'

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

interface CaseStudyHeaderProps {
  project: ProjectMeta
}

const statusColors = {
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  'in-progress': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  concept: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

const statusLabels = {
  fr: {
    completed: 'Livré',
    'in-progress': 'En cours',
    concept: 'Concept',
  },
  en: {
    completed: 'Shipped',
    'in-progress': 'In Progress',
    concept: 'Concept',
  },
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const { locale } = useLanguage()
  const reducedMotion = useReducedMotion()

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="my-8 space-y-4 mx-auto max-w-187.5"
    >
      {/* Title */}
      <motion.h1
        variants={itemVars}
        className="text-4xl font-bold text-foreground"
      >
        {project.title}
      </motion.h1>

      {/* Metadata Row */}
      <motion.div
        variants={itemVars}
        className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
      >
        {/* Status Badge */}
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
            statusColors[project.status]
          )}
        >
          {statusLabels[locale][project.status]}
        </span>

        {/* Timeline */}
        {project.timeline && (
          <>
            <span>•</span>
            <span>{project.timeline}</span>
          </>
        )}

        {/* Client */}
        {project.client && (
          <>
            <span>•</span>
            <span>{project.client}</span>
          </>
        )}

        {/* Role */}
        {project.role && (
          <>
            <span>•</span>
            <span>{project.role}</span>
          </>
        )}
      </motion.div>

      {/* Tags Row */}
      <motion.div variants={itemVars} className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <ProjectTag key={tag} tag={tag} />
        ))}
      </motion.div>

      {/* Description */}
      <motion.p variants={itemVars} className="text-lg text-muted-foreground">
        {project.description}
      </motion.p>
    </motion.header>
  )
}
