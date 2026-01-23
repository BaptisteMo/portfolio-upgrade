'use client'

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Hook to detect user's reduced motion preference
 * Uses Framer Motion's native hook which handles SSR hydration correctly
 * Returns true if user prefers reduced motion (accessibility)
 */
export function useReducedMotion(): boolean {
  // Framer Motion's hook returns true/false/null
  // null means "not yet determined" (SSR), we treat as false to show animation
  // This prevents hydration mismatch as Framer handles it internally
  const shouldReduceMotion = useFramerReducedMotion()
  return shouldReduceMotion ?? false
}
