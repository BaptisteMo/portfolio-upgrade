# Story 3.2: i18n Routing & Language Context

Status: done

## Story

**As a** visitor,
**I want** to access the portfolio in French or English via URL,
**So that** I can read content in my preferred language.

## Acceptance Criteria

1. **AC1**: Content loads from the corresponding locale folder when visiting /fr/ or /en/ prefixed URLs
2. **AC2**: Default locale is French (/fr/ is the root, / redirects to /fr/)
3. **AC3**: Language preference persists via localStorage
4. **AC4**: A LanguageContext provides current locale to all components
5. **AC5**: URLs follow pattern: /[locale]/projects/[slug]
6. **AC6**: Static generation works for both locales (generateStaticParams)

## Tasks / Subtasks

- [x] **Task 1: Configure Next.js i18n Routing** (AC: 1, 2, 5)
  - [x] Update `next.config.js` with i18n configuration (if needed for App Router)
  - [x] Create `src/app/[locale]/` directory structure
  - [x] Move existing pages under `[locale]` dynamic segment
  - [x] Configure default locale as 'fr'

- [x] **Task 2: Create Language Context** (AC: 4)
  - [x] Create `src/contexts/LanguageContext.tsx`
  - [x] Define `Locale` type ('fr' | 'en')
  - [x] Create `LanguageProvider` component
  - [x] Export `useLanguage()` hook for consuming locale
  - [x] Provide current locale from URL params

- [x] **Task 3: Implement Locale Persistence** (AC: 3)
  - [x] Create `src/lib/locale-storage.ts` utility
  - [x] Save locale preference to localStorage on change
  - [x] Read locale preference on initial load
  - [x] Handle SSR gracefully (no localStorage on server)

- [x] **Task 4: Create Root Layout with Locale** (AC: 1, 4)
  - [x] Create `src/app/[locale]/layout.tsx`
  - [x] Wrap children with LanguageProvider
  - [x] Set `lang` attribute on html tag dynamically
  - [x] Pass locale to PageTransition and other components

- [x] **Task 5: Implement generateStaticParams** (AC: 6)
  - [x] Add `generateStaticParams()` to `[locale]/layout.tsx`
  - [x] Return both locales: [{ locale: 'fr' }, { locale: 'en' }]
  - [x] Verify static generation for both locales in build

- [x] **Task 6: Create Root Redirect** (AC: 2)
  - [x] Create `src/app/page.tsx` that redirects to /fr/
  - [x] Use `redirect()` from next/navigation
  - [x] Handle middleware alternative if needed

- [x] **Task 7: Update Existing Pages for Locale** (AC: 1, 5)
  - [x] Move `src/app/page.tsx` content to `src/app/[locale]/page.tsx`
  - [x] Move `src/app/projects/page.tsx` to `src/app/[locale]/projects/page.tsx`
  - [x] Update all internal links to include locale prefix
  - [x] Update NavPanel links to be locale-aware

- [x] **Task 8: Integrate with MDX Utilities** (AC: 1)
  - [x] Update page components to pass locale to `getAllProjects(locale)`
  - [x] Update page components to pass locale to `getProjectBySlug(slug, locale)`
  - [x] Verify content loads from correct locale folder

- [x] **Task 9: Validate Build & Routes** (AC: all)
  - [x] Run `npm run build` to verify static generation
  - [x] Test /fr/ routes load French content
  - [x] Test /en/ routes load English content
  - [x] Test localStorage persistence across page reloads

## Dev Notes

### Architecture Compliance

**Component Location:** `src/contexts/` and `src/app/[locale]/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/
├── app/
│   ├── page.tsx                 # Root redirect to /fr/
│   └── [locale]/
│       ├── layout.tsx           # Locale-aware layout
│       ├── page.tsx             # Home page (moved)
│       └── projects/
│           ├── page.tsx         # Projects list
│           └── [slug]/
│               └── page.tsx     # Case study (Story 3.3)
├── contexts/
│   ├── LanguageContext.tsx
│   └── index.ts
├── lib/
│   ├── locale-storage.ts        # localStorage utilities
│   └── mdx.ts                   # Already supports locale param
```

### Technical Requirements

**Next.js App Router i18n Pattern:**

With App Router, i18n is handled via dynamic route segments `[locale]` rather than next.config.js i18n config (which is for Pages Router).

**LanguageContext Implementation:**

```typescript
// src/contexts/LanguageContext.tsx
'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from '@/content/meta'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

interface LanguageProviderProps {
  locale: Locale
  children: ReactNode
}

export function LanguageProvider({ locale, children }: LanguageProviderProps) {
  const setLocale = (newLocale: Locale) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale)
    }
    // Navigate to new locale URL
    window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/(fr|en)/, '')}`
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
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
```

**Locale Layout:**

```typescript
// src/app/[locale]/layout.tsx
import { LanguageProvider } from '@/contexts'
import type { Locale } from '@/content/meta'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  return (
    <LanguageProvider locale={locale}>
      {children}
    </LanguageProvider>
  )
}
```

**Root Redirect:**

```typescript
// src/app/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/fr')
}
```

**localStorage Utility:**

```typescript
// src/lib/locale-storage.ts
import type { Locale } from '@/content/meta'

const LOCALE_KEY = 'preferred-locale'

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(LOCALE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  return null
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LOCALE_KEY, locale)
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Use `'use client'` directive for context providers
3. Dark mode is DEFAULT (already handled)
4. French is the default locale
5. TypeScript strict mode - define proper types for locale

### Previous Story Intelligence (Story 3.1)

**From Story 3.1 (MDX Architecture):**
- `Locale` type defined in `src/content/meta.ts`
- MDX utilities accept `locale` parameter
- Content structure: `src/content/fr/` and `src/content/en/`
- This story enables consuming that content via URLs

**Integration Point:**
- Story 3.1 provides: `getAllProjects(locale)`, `getProjectBySlug(slug, locale)`
- This story provides: locale from URL → passed to those functions

### UX Design Spec Context

**From UX Spec - i18n Support:**
> Français par défaut, Anglais optionnel
> Switch via toggle header ET Command Palette (/fr, /en)
> Persister le choix (localStorage)

**From PRD - FR-I18N-01:**
> Le système DOIT supporter 2 langues (Français par défaut, Anglais)
> Adapter les URLs (/fr/... ou /en/...)

### Dependencies

- **Requires**: Story 3.1 complete (MDX utilities with locale support)
- **Blocked by**: Story 3.1 (uses Locale type and MDX functions)
- **Enables**: Story 3.3 (Case Study pages with localized content)

### References

- [Architecture](_bmad-output/planning-artifacts/architecture.md) - i18n routing pattern
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-I18N-01
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 3.2 acceptance criteria
- [Project Context](_bmad-output/project-context.md) - Import rules

### Implementation Notes

**App Router vs Pages Router:**
- Pages Router: use `next.config.js` i18n config
- App Router: use `[locale]` dynamic segment (this project)
- No `next.config.js` i18n needed for App Router

**URL Structure:**
```
/           → redirects to /fr/
/fr/        → French home
/en/        → English home
/fr/projects → French projects list
/en/projects → English projects list
/fr/projects/la-wooferie → French case study
/en/projects/la-wooferie → English case study
```

**Static Generation:**
- `generateStaticParams()` in [locale]/layout.tsx ensures both locales are pre-rendered
- Each page under [locale]/ inherits the locale param
- Build output should show both /fr/* and /en/* routes

**localStorage Behavior:**
- On first visit: use URL locale (default /fr/)
- On return visit: check localStorage, redirect if different from URL
- Middleware could handle this, but keep simple for MVP

**Testing Checklist:**
- [ ] / redirects to /fr/
- [ ] /fr/ shows French content
- [ ] /en/ shows English content
- [ ] localStorage saves preference
- [ ] Refreshing page maintains locale
- [ ] Build generates both locale routes
- [ ] NavPanel links include locale prefix

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/contexts/LanguageContext.tsx` (created)
- `src/contexts/index.ts` (created)
- `src/lib/locale-storage.ts` (created)
- `src/app/page.tsx` (updated - root redirect)
- `src/app/[locale]/layout.tsx` (created)
- `src/app/[locale]/page.tsx` (moved from app/page.tsx)
- `src/app/[locale]/projects/page.tsx` (moved)
- `src/components/features/navigation/NavPanel.tsx` (updated - locale-aware links)
