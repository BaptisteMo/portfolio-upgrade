'use client'

import Image from 'next/image'
import { Download } from 'lucide-react'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts'
import type { ExperienceItem } from '@/content/meta'

const CV_PATH = '/cv-baptiste-morillon.pdf'

interface ExperienceCardProps {
  experience: ExperienceItem[]
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { locale } = useLanguage()

  return (
    <div className="absolute -inset-5 md:-inset-6 overflow-hidden rounded-2xl">
      {/* CV preview background image */}
      <Image
        src="/images/cv-preview.jpg"
        alt=""
        fill
        className="object-cover object-top"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes="400px"
      />

      {/* Frosted glass overlay — 8px margin from card edges */}
      <div className="absolute inset-2 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm dark:bg-black/20">
        <Button asChild>
          <a href={CV_PATH} download>
            <Download />
            {locale === 'fr' ? 'Télécharger mon CV' : 'Download my CV'}
          </a>
        </Button>
      </div>
    </div>
  )
}
