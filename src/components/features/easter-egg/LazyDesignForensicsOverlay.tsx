'use client'

import dynamic from 'next/dynamic'

export const LazyDesignForensicsOverlay = dynamic(
  () => import('./DesignForensicsOverlay').then((mod) => mod.DesignForensicsOverlay),
  { ssr: false }
)
