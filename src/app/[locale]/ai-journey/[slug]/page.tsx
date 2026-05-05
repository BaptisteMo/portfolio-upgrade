import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  getAiArticleBySlug,
  getAllAiArticleSlugs,
  getAllAiArticles,
  getAllLocales,
} from '@/lib/mdx'
import { aiJourneyLevels } from '@/content/ai-journey-levels'
import { MDXContent } from '@/components/mdx'
import { NavPanel, RelatedAiArticles } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllAiArticleSlugs()
  const locales = getAllLocales()

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

const pageContent = {
  fr: { back: 'Retour à AI Journey' },
  en: { back: 'Back to AI Journey' },
}

export default async function AiArticlePage({ params }: PageProps) {
  const { locale, slug } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  const typedLocale = locale as Locale

  try {
    const [{ meta, content }, allArticles] = await Promise.all([
      getAiArticleBySlug(slug, typedLocale),
      getAllAiArticles(typedLocale),
    ])
    const levelConfig = aiJourneyLevels[typedLocale].find((l) => l.level === meta.level)
    const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 4)
    const t = pageContent[typedLocale]

    return (
      <TriPanelLayout nav={<NavPanel />}>
        <article className="py-4">
          <Link
            href={`/${typedLocale}/ai-journey`}
            className="mx-auto max-w-170 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>

          <header className="my-8 space-y-4 mx-auto max-w-170">
            {levelConfig && (
              <p className="text-sm font-medium text-primary">{levelConfig.title}</p>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{meta.title}</h1>
            <p className="text-lg text-muted-foreground">{meta.description}</p>
          </header>

          {meta.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted mx-auto max-w-170 mb-8">
              <Image
                src={meta.image}
                alt={meta.title}
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                priority
                className="object-cover"
              />
            </div>
          )}

          <MDXContent content={content} />

          <RelatedAiArticles articles={relatedArticles} />
        </article>
      </TriPanelLayout>
    )
  } catch {
    notFound()
  }
}
