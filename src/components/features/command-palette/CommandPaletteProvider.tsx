'use client'

import { useEffect, useRef } from 'react'
import { useCommandPalette } from '@/hooks'
import { CommandPalette } from './CommandPalette'

export function CommandPaletteProvider() {
  const { open, setOpen } = useCommandPalette()
  const hasOpened = useRef(false)

  useEffect(() => {
    if (open && !hasOpened.current) {
      hasOpened.current = true
      window.dispatchEvent(new CustomEvent('shortcuts-hint-dismiss'))
    }
  }, [open])

  return <CommandPalette open={open} onOpenChange={setOpen} />
}
