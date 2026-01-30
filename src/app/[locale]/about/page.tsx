import { getAboutContent } from '@/lib/mdx'
import { TriPanelLayout } from '@/components/layout'
import { NavPanel } from '@/components/features'
import {
  AboutHeader,
  Timeline,
  SkillsList,
  AvailabilityBadge,
} from '@/components/features/about'
import { MDXContent } from '@/components/mdx'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params

  // Validate locale
  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  try {
    const { meta, content } = await getAboutContent(locale as Locale)

    return (
      <TriPanelLayout
        nav={<NavPanel />}
        panel={
          <div className="p-6 space-y-6">
            <AvailabilityBadge status={meta.availability} />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {locale === 'fr' ? 'Compétences' : 'Skills'}
              </h3>
              <SkillsList skills={meta.skills} />
            </div>
          </div>
        }
      >
        <AboutHeader
          name="Baptiste Morillon"
          subtitle={meta.subtitle}
          photo={meta.photo}
        />
        <MDXContent content={content} />
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 max-w-187.5 mx-auto">
            {locale === 'fr' ? 'Parcours' : 'Experience'}
          </h2>
          <Timeline items={meta.experience} />
        </section>
      </TriPanelLayout>
    )
  } catch {
    notFound()
  }
}
