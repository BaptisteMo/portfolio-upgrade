'use client'

import { useLanguage } from '@/contexts'

const quotes = {
  fr: '« Le design, c\'est résoudre des problèmes avec empathie et créativité. »',
  en: '\u201CDesign is solving problems with empathy and creativity.\u201D',
} as const

export function ContactCard() {
  const { locale } = useLanguage()

  return (
    <div className="relative h-full">

      <p className="relative z-10 text-base md:text-lg text-foreground italic">
        {quotes[locale]}
      </p>
    </div>
  )
}
