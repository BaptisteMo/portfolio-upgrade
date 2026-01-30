'use client'

import dynamic from 'next/dynamic'

export const LazyShortcutsBar = dynamic(
  () => import('./ShortcutsBar').then((mod) => mod.ShortcutsBar),
  { ssr: false }
)
