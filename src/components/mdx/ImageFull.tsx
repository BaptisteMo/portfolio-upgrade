import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'

interface ImageFullProps {
  src: string
  alt: string
  caption?: string
}

export function ImageFull({ src, alt, caption }: ImageFullProps) {
  return (
    <figure className="my-8 -mx-4 md:-mx-8">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 80vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2 px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
