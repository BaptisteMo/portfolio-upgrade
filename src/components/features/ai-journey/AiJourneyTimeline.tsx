'use client'

import { LevelSection } from './LevelSection'
import type { AiArticleMeta, AiJourneyLevel } from '@/content/meta'

interface AiJourneyTimelineProps {
  levels: AiJourneyLevel[]
  articles: AiArticleMeta[]
  emptyLabel: string
}

export function AiJourneyTimeline({ levels, articles, emptyLabel }: AiJourneyTimelineProps) {
  return (
    <div className="space-y-12">
      {levels.map((level, index) => (
        <LevelSection
          key={level.level}
          level={level}
          articles={articles.filter((a) => a.level === level.level)}
          isLast={index === levels.length - 1}
          emptyLabel={emptyLabel}
        />
      ))}
    </div>
  )
}
