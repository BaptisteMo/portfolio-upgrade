'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const RESET_DELAY = 2000

export function useKonamiCode() {
  const [isActive, setIsActive] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      clearTimeout(timeoutRef.current)

      if (e.key === KONAMI_SEQUENCE[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          setIsActive((prev) => !prev)
          indexRef.current = 0
        } else {
          timeoutRef.current = setTimeout(() => {
            indexRef.current = 0
          }, RESET_DELAY)
        }
      } else {
        indexRef.current = 0
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const toggle = useCallback(() => setIsActive((prev) => !prev), [])

  return { isActive, toggle }
}
