'use client'

import { useId } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useImageModal } from '@/contexts'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'

interface ImageFullProps {
  src: string
  alt: string
  caption?: string
}

export function ImageFull({ src, alt, caption }: ImageFullProps) {
  const uniqueId = useId()
  const layoutId = `image-${uniqueId}`
  const { openImage } = useImageModal()

  const handleClick = () => {
    openImage({ src, alt, layoutId })
  }

  return (
    <figure className="my-8">
      <motion.div
        layoutId={layoutId}
        onClick={handleClick}
        className="cursor-zoom-in overflow-hidden rounded-lg"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="w-full h-auto"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </motion.div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2 px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
