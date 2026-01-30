import { getAllProjects } from '@/lib/mdx'
import { NavPanel, ProjectGrid } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

const pageContent = {
  fr: {
    title: 'Projets',
    description: 'Une sélection de projets qui illustrent mon approche du design produit.',
    emptyLabel: 'Aucun projet à afficher.',
  },
  en: {
    title: 'Projects',
    description: 'A selection of projects that illustrate my approach to product design.',
    emptyLabel: 'No projects to display.',
  },
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  const projects = await getAllProjects(locale as Locale)
  const content = pageContent[locale as Locale]

  return (
    <TriPanelLayout
      nav={<NavPanel />}
    >
      <div className="space-y-6 py-4">
        <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
        <p className="text-muted-foreground">
          {content.description}
        </p>
        <ProjectGrid projects={projects} emptyLabel={content.emptyLabel} />
      </div>
    </TriPanelLayout>
  )
}
