'use client'

import dynamic from 'next/dynamic'

export const LazyCommandPaletteProvider = dynamic(
  () =>
    import('./CommandPaletteProvider').then((mod) => mod.CommandPaletteProvider),
  { ssr: false }
)
