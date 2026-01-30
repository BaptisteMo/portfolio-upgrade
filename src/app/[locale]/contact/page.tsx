import { TriPanelLayout } from '@/components/layout'
import { NavPanel, Breadcrumbs } from '@/components/features'
import { MadLibsContactForm } from '@/components/features/contact'
import { Toaster } from '@/components/ui/sonner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Contact — Baptiste Morillon' : 'Contact — Baptiste Morillon',
    description:
      locale === 'fr'
        ? 'Contactez Baptiste Morillon pour discuter de votre projet.'
        : 'Get in touch with Baptiste Morillon to discuss your project.',
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  const breadcrumbItems = [
    { label: locale === 'fr' ? 'Accueil' : 'Home', href: `/${locale}` },
    { label: 'Contact' },
  ]

  return (
    <TriPanelLayout nav={<NavPanel />}>

      <h1 className="sr-only">{locale === 'fr' ? 'Contact' : 'Contact'}</h1>
      <div className="max-w-3xl py-8 md:h-screen flex items-center">
        <MadLibsContactForm />
      </div>

      <Toaster richColors position="bottom-right" />
    </TriPanelLayout>
  )
}
