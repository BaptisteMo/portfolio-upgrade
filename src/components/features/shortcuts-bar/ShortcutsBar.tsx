'use client'

import { useLanguage } from '@/contexts'

function isMac(): boolean {
  if (typeof navigator === 'undefined') return true
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
}

export function ShortcutsBar() {
  const { locale } = useLanguage()

  function openPalette() {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    )
  }

  const modKey = isMac() ? '⌘' : 'Ctrl'
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
