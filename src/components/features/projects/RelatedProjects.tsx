'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, type Variants, type PanInfo } from 'framer-motion'
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50
      if (info.offset.x < -swipeThreshold && currentIndex < projects.length - 1) {
        setCurrentIndex((i) => i + 1)
      } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
        setCurrentIndex((i) => i - 1)
      }
    },
    [currentIndex, projects.length]
  )

  if (projects.length === 0) return null

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : cardVariants

  return (
    <section ref={ref} className="mt-16 border-t border-border pt-12 pb-8 mx-auto max-w-187.5 ">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={reducedMotion ? { duration: 0.1 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 text-lg font-semibold text-foreground"
      >
        {locale === 'fr' ? 'Autres projets' : 'Other projects'}
      </motion.h2>

      {/* Desktop: grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVars}
        className="hidden sm:grid grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVars}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: horizontal slider */}
      <div className="sm:hidden overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: `${-currentIndex * 100}%` }}
          transition={
            reducedMotion
              ? { duration: 0.1 }
              : { type: 'spring', stiffness: 300, damping: 25 }
          }
          className="flex cursor-grab active:cursor-grabbing"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={
                reducedMotion
                  ? { duration: 0.1 }
                  : { delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
              className="w-full shrink-0 px-1"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Dots indicator */}
        {projects.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Voir ${project.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
