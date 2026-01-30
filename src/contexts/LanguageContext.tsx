'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from '@/content/meta'

interface LanguageContextValue {
  locale: Locale
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

interface LanguageProviderProps {
  locale: Locale
  children: ReactNode
}

export function LanguageProvider({ locale, children }: LanguageProviderProps) {
  return (
    <LanguageContext.Provider value={{ locale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
