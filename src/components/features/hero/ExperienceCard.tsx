'use client'

import Image from 'next/image'
import { Download } from 'lucide-react'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts'

export function ExperienceCard() {
  const { locale } = useLanguage()

  const cvPath =
    locale === 'fr'
      ? '/cv-baptiste-morillon-fr.pdf'
      : '/cv-baptiste-morillon-en.pdf'

  const downloadLabel =
    locale === 'fr' ? 'Télécharger mon CV' : 'Download my CV'

  const downloadFileName =
    locale === 'fr'
      ? 'cv-baptiste-morillon-fr.pdf'
      : 'cv-baptiste-morillon-en.pdf'

  return (
    <div className="absolute -inset-5 md:-inset-6 overflow-hidden rounded-2xl min-h-30">
      <Image
        src="/images/cv-preview.jpg"
        alt=""
        fill
        className="object-cover object-top"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="400px"
      />

      <div className="absolute inset-2 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm dark:bg-black/20">
        <Button asChild>
          <a href={cvPath} download={downloadFileName}>
            <Download />
            {downloadLabel}
          </a>
        </Button>
      </div>
    </div>
  )
}