import { HeroLanding } from '@/components/features/hero'
import { NavPanel } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { notFound } from 'next/navigation'

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

  return (
    <TriPanelLayout nav={<NavPanel />}>
      <HeroLanding />
    </TriPanelLayout>
  )
}
