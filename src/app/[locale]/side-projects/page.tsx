import { NavPanel } from '@/components/features'
import { SideProjectsPlaceholder } from '@/components/features/side-projects'
import { TriPanelLayout } from '@/components/layout'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function SideProjectsPage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  return (
    <TriPanelLayout nav={<NavPanel />}>
      <SideProjectsPlaceholder />
    </TriPanelLayout>
  )
}
