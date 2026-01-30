import { getProjectBySlug, getAllProjects, getAllProjectSlugs, getAllLocales } from '@/lib/mdx'
import { MDXContent } from '@/components/mdx'
import { CaseStudyHeader, CaseStudyShell, MetricsGrid } from '@/components/features/case-study'
import { RelatedProjects } from '@/components/features/projects'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  const locales = getAllLocales()

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params

  // Validate locale
  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  try {
    const [{ meta, content }, allProjects] = await Promise.all([
      getProjectBySlug(slug, locale as Locale),
      getAllProjects(locale as Locale),
    ])

    const relatedProjects = allProjects.filter((p) => p.slug !== slug)

    // Derive section anchors from frontmatter contextSections
    const sectionAnchors = (meta.contextSections ?? []).map((s) => ({
      label: s.label,
      id: s.sectionId,
    }))

    return (
      <CaseStudyShell
        sectionAnchors={sectionAnchors}
        sections={meta.contextSections ?? []}
      >
        <CaseStudyHeader project={meta} />
        <MDXContent content={content} />
        <MetricsGrid metrics={meta.metrics} />
        <RelatedProjects projects={relatedProjects} />
      </CaseStudyShell>
    )
  } catch {
    notFound()
  }
}
