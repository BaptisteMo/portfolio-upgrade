'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts'
import { useParallax } from '@/hooks'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import type { AiArticleMeta } from '@/content/meta'

interface AiArticleCardProps {
  article: AiArticleMeta
  priority?: boolean
}

export function AiArticleCard({ article, priority = false }: AiArticleCardProps) {
  const { locale } = useLanguage()
  const imageRef = useRef<HTMLDivElement>(null)
  useParallax(imageRef, { speed: 0.15, maxOffset: 20 })

  const cardClass = cn(
    'group block rounded-lg border border-border bg-card overflow-hidden shadow-secondary-glow',
    'hover:shadow-secondary-hover hover:ring-primary/20 hover:-translate-y-0.5',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:hover:ring-0',
    'active:translate-y-px active:shadow-secondary-down'
  )

  const inner = (
    <>
      <div className="relative aspect-video bg-muted overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover transition-transform duration-150 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-muted to-muted-foreground/10" />
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
      </div>
    </>
  )

  const isExternal = !!article.href
  const href = article.href ?? `/${locale}/ai-journey/${article.slug}`

  return (
    <Link
      href={href}
      className={cardClass}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {inner}
    </Link>
  )
}
