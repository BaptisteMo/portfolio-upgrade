'use client'

import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const idsRef = useRef(sectionIds)
  idsRef.current = sectionIds

  // Stable dep key: avoids re-creating observer when array identity changes
  const idsKey = sectionIds.join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -80% 0px' }
    )

    for (const id of idsRef.current) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  return activeSection
}
