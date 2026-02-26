'use client'

import Link from 'next/link'
import { ConcentricCircles } from '@/components/ui/ConcentricCircles'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts'

export function BioCard() {
  const { locale } = useLanguage()

  return (
    <div className="relative flex h-full flex-col justify-between min-h-[240px]">
      {/* Concentric circles behind content */}
      <div className="absolute -inset-5 md:-inset-6 overflow-hidden rounded-2xl">
        <ConcentricCircles position="top-right" intensity="medium" />
      </div>

      <div className="relative z-10">
        <p className="text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground/80 font-light">
          Product
        </p>
        <p className="text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground font-bold">
          Designer
        </p>
      </div>

      <div className="relative z-10 flex justify-end mt-6">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/contact`}>
            {locale === 'fr' ? 'Me contacter' : 'Contact me'}
          </Link>
        </Button>
      </div>
    </div>
  )
}
