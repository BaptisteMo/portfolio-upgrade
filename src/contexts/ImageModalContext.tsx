'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ImageData {
  src: string
  alt: string
  layoutId: string
}

interface ImageModalContextValue {
  selectedImage: ImageData | null
  openImage: (image: ImageData) => void
  closeImage: () => void
}

const ImageModalContext = createContext<ImageModalContextValue | null>(null)

export function ImageModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

  const openImage = useCallback((image: ImageData) => {
    setSelectedImage(image)
  }, [])

  const closeImage = useCallback(() => {
    setSelectedImage(null)
  }, [])

  return (
    <ImageModalContext.Provider value={{ selectedImage, openImage, closeImage }}>
      {children}
    </ImageModalContext.Provider>
  )
}

export function useImageModal() {
  const context = useContext(ImageModalContext)
  if (!context) {
    throw new Error('useImageModal must be used within ImageModalProvider')
  }
  return context
}
