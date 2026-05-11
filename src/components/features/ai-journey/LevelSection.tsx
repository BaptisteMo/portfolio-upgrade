'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { AiArticleCard } from './AiArticleCard'
import type { AiArticleMeta, AiJourneyLevel } from '@/content/meta'

interface LevelSectionProps {
  level: AiJourneyLevel
  articles: AiArticleMeta[]
  isLast: boolean
  emptyLabel: string
}

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

export function LevelSection({ level, articles, isLast, emptyLabel }: LevelSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const reducedMotion = useReducedMotion()

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : cardVariants

  return (
    <section className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background"
      />

      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-6 bottom-[-3rem] -translate-x-1/2 border-l-2 border-dashed border-primary/50"
        />
      )}

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVars}
        className="space-y-4"
      >
        <motion.header variants={itemVars} className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{level.title}</h2>
          <p className="text-muted-foreground max-w-2xl">{level.description}</p>
        </motion.header>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((article, index) => (
              <motion.div key={article.slug} variants={itemVars}>
                <AiArticleCard
                  article={article}
                  priority={level.level === 1 && index < 2}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p variants={itemVars} className="text-sm text-muted-foreground italic">
            {emptyLabel}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
