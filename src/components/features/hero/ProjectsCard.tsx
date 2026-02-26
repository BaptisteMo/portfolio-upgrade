'use client'

import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import { useLanguage } from '@/contexts'
import Link from 'next/link'

export function ProjectsCard() {
  const { locale } = useLanguage()

  return (
    <Link
      href={`/${locale}/projects`}
      className="absolute -inset-5 md:-inset-6 rounded-2xl overflow-hidden block group"
    >
      <Image
        src="/images/my-project.png"
        alt=""
        fill
        className="object-cover  transition-transform duration-300 group-hover:scale-105"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="(max-width: 768px) 100vw, 33vw"
      />



      <p className="absolute bottom-5 left-5 md:bottom-6 md:left-6 z-10 text-lg font-bold text-foreground">
        {locale === 'fr' ? 'Mes projets' : 'My projects'}
      </p>
    </Link>
  )
}
