'use client'

import { motion } from 'framer-motion'
import { AiArticleCard } from './AiArticleCard'
import type { AiArticleMeta, AiJourneyLevel } from '@/content/meta'

interface LevelSectionProps {
  level: AiJourneyLevel
  articles: AiArticleMeta[]
  isLast: boolean
  emptyLabel: string
}

export function LevelSection({ level, articles, isLast, emptyLabel }: LevelSectionProps) {
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
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <header className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{level.title}</h2>
          <p className="text-muted-foreground max-w-2xl">{level.description}</p>
        </header>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <AiArticleCard
                key={article.slug}
                article={article}
                priority={level.level === 0 && index < 2}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">{emptyLabel}</p>
        )}
      </motion.div>
    </section>
  )
}
