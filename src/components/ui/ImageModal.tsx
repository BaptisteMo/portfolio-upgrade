'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useImageModal } from '@/contexts'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'

export function ImageModal() {
  const { selectedImage, closeImage } = useImageModal()

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeImage()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedImage, closeImage])

  return (
    <AnimatePresence>
      {selectedImage && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeImage}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
            className="fixed top-4 right-4 z-[102] p-2 rounded-full bg-background/80 border border-border text-foreground hover:bg-muted transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Image container */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={closeImage}
          >
            <motion.div
              layoutId={selectedImage.layoutId}
              className="relative w-full max-w-[90vw] max-h-[90vh] aspect-video"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                priority
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
