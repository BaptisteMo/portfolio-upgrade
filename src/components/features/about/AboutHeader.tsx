import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'

interface AboutHeaderProps {
  name: string
  subtitle: string
  photo: string
}

export function AboutHeader({ name, subtitle, photo }: AboutHeaderProps) {
  return (
    <header className="mt-3 mb-8 max-w-187.5 mx-auto flex flex-col md:flex-row md:items-center gap-6">
      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover rounded-full border-4 border-border"
          sizes="(max-width: 768px) 128px, 160px"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-foreground">{name}</h1>
        <p className="text-xl text-muted-foreground mt-2">{subtitle}</p>
      </div>
    </header>
  )
}
