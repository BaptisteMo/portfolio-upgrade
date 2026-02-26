'use client'

import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import type { AvailabilityStatus } from '@/content/meta'
import { useLanguage } from '@/contexts'

interface IdentityCardProps {
  availability: AvailabilityStatus
}

export function IdentityCard({ availability }: IdentityCardProps) {
  const { locale } = useLanguage()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Image
          src="/images/baptiste.jpg"
          alt="Baptiste Morillon"
          width={60}
          height={60}
          className="rounded-full border border-(--glass-border) object-cover shrink-0"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          priority
        />
        <h2 className="text-lg font-bold text-foreground">Baptiste Morillon</h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {locale === 'fr'
          ? 'Product Designer passionné par la création d\'expériences utilisateur intuitives et impactantes.'
          : 'Product Designer passionate about creating intuitive and impactful user experiences.'}
      </p>
    </div>
  )
}
