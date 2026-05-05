import { getAllAiArticles } from '@/lib/mdx'
import { NavPanel, AiJourneyTimeline } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { ConcentricCircles } from '@/components/ui'
import { aiJourneyLevels } from '@/content/ai-journey-levels'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

const pageContent = {
  fr: {
    title: 'AI Journey',
    description:
      "Mon parcours d'apprentissage de l'IA, classé par niveau de profondeur. Du premier prompt aux agents custom.",
    empty: 'Bientôt.',
  },
  en: {
    title: 'AI Journey',
    description:
      'My AI learning journey, sorted by depth. From the first prompt to custom agents.',
    empty: 'Coming soon.',
  },
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function AiJourneyPage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  const typedLocale = locale as Locale
  const articles = await getAllAiArticles(typedLocale)
  const levels = aiJourneyLevels[typedLocale]
  const content = pageContent[typedLocale]

  return (
    <>
      <ConcentricCircles position="top-right" className="fixed z-0" />
      <TriPanelLayout nav={<NavPanel />}>
        <div className="space-y-8 py-4">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{content.description}</p>
          </header>
          <AiJourneyTimeline levels={levels} articles={articles} emptyLabel={content.empty} />
        </div>
      </TriPanelLayout>
    </>
  )
}
