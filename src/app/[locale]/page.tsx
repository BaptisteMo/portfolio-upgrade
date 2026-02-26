import { getAboutContent } from '@/lib/mdx'
import { HeroLanding } from '@/components/features/hero'
import { NavPanel } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  try {
    const { meta } = await getAboutContent(locale as Locale)

    return (
      <TriPanelLayout nav={<NavPanel />}>
        <HeroLanding
          experience={meta.experience}
          skills={meta.skills}
          availability={meta.availability}
        />
      </TriPanelLayout>
    )
  } catch {
    notFound()
  }
}
