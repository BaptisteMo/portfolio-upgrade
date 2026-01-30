'use client'

import { useMemo } from 'react'
import Fuse from 'fuse.js'
import type { IFuseOptions, FuseResult } from 'fuse.js'
import type { LucideIcon } from 'lucide-react'

export interface SearchableItem {
  id: string
  label: string
  group: 'navigation' | 'projects' | 'preferences'
  keywords: string[]
  icon: LucideIcon
  onSelect: () => void
}

const fuseOptions: IFuseOptions<SearchableItem> = {
  keys: ['label', 'keywords', 'id'],
  threshold: 0.4,
  includeMatches: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
}

export function useFuzzySearch(
  items: SearchableItem[],
  query: string
): { results: FuseResult<SearchableItem>[] } {
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items])

  const results = useMemo(() => {
    if (query.length < 2) return []
    return fuse.search(query)
  }, [fuse, query])

  return { results }
}
