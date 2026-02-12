'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts'

export function ShortcutsBar() {
  const { locale } = useLanguage()
  const [modKey, setModKey] = useState('⌘')

  useEffect(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
    setModKey(isMac ? '⌘' : 'Ctrl')
  }, [])

  function openPalette() {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    )
  }

  const label = locale === 'fr' ? 'Rechercher' : 'Search'

  return (
    <button
      onClick={openPalette}
      className="flex w-full items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <kbd className="rounded bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
        {modKey}K
      </kbd>
      {label}
    </button>
  )
}
