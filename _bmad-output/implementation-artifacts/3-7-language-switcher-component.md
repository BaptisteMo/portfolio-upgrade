# Story 3.7: Language Switcher Component

Status: done

## Story

**As a** visitor,
**I want** to switch between French and English,
**So that** I can read the portfolio in my preferred language.

## Acceptance Criteria

1. **AC1**: A language toggle is visible in the header (FR/EN)
2. **AC2**: Clicking switches to the other locale
3. **AC3**: URL updates to reflect the new locale (e.g., /fr/projects → /en/projects)
4. **AC4**: Language preference is saved to localStorage
5. **AC5**: Current language is visually indicated
6. **AC6**: Switching preserves the current page (same slug, different locale)

## Tasks / Subtasks

- [x] **Task 1: Create LanguageSwitcher Component** (AC: 1, 5)
  - [x] Create `src/components/features/navigation/LanguageSwitcher.tsx`
  - [x] Display FR | EN toggle buttons
  - [x] Highlight current locale
  - [x] Use design tokens for styling

- [x] **Task 2: Implement Locale Switching Logic** (AC: 2, 3, 6)
  - [x] Use `useLanguage()` from LanguageContext
  - [x] Use `usePathname()` to get current path
  - [x] Replace locale segment in URL
  - [x] Navigate with `router.push()`

- [x] **Task 3: Add localStorage Persistence** (AC: 4)
  - [x] Save to localStorage on switch
  - [x] Use `setStoredLocale()` from lib/locale-storage.ts
  - [x] Preference is already read by context (Story 3.2)

- [x] **Task 4: Integrate with NavPanel** (AC: 1)
  - [x] Add LanguageSwitcher to NavPanel component
  - [x] Position at bottom of nav or in header
  - [x] Ensure keyboard accessibility

- [x] **Task 5: Add to Mobile Navigation** (AC: 1)
  - [x] Ensure switcher is accessible on mobile
  - [x] Include in mobile menu (Epic 6 will refine)
  - [x] Touch-friendly tap targets (44px)

- [x] **Task 6: Update Exports** (AC: all)
  - [x] Export LanguageSwitcher from navigation/
  - [x] Update features/index.ts

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/navigation/`

```
src/components/features/navigation/
├── NavPanel.tsx           # Story 2.2
├── Breadcrumbs.tsx        # Story 2.3
├── LanguageSwitcher.tsx   # This story
└── index.ts
```

### Technical Requirements

**LanguageSwitcher Component:**

```tsx
// src/components/features/navigation/LanguageSwitcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts'
import { setStoredLocale } from '@/lib/locale-storage'
import { cn } from '@/lib/utils'
import type { Locale } from '@/content/meta'

const locales: Locale[] = ['fr', 'en']

export function LanguageSwitcher() {
  const { locale: currentLocale } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // Save preference
    setStoredLocale(newLocale)

    // Replace locale in pathname
    // /fr/projects/slug → /en/projects/slug
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <div className="flex items-center rounded-lg border border-border bg-card p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            locale === currentLocale
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
          aria-pressed={locale === currentLocale}
          aria-label={locale === 'fr' ? 'Français' : 'English'}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
```

**Integration in NavPanel:**

```tsx
// In NavPanel.tsx, add at the bottom:
import { LanguageSwitcher } from './LanguageSwitcher'

// Inside NavPanel component, before closing </nav>:
<div className="mt-auto pt-6 border-t border-border">
  <LanguageSwitcher />
</div>
```

### URL Switching Logic

| Current URL | Target Locale | New URL |
|-------------|---------------|---------|
| /fr/ | en | /en/ |
| /fr/projects | en | /en/projects |
| /fr/projects/la-wooferie | en | /en/projects/la-wooferie |
| /fr/about | en | /en/about |

### Accessibility

- `aria-pressed` for current state
- `aria-label` for full language name
- Focus ring visible
- Keyboard navigable (Tab + Enter)

### Dependencies

- **Requires**: Story 3.2 (LanguageContext, locale-storage)
- **Integrates with**: NavPanel (Story 2.2)

### Styling Specs

| State | Background | Text |
|-------|------------|------|
| Active | primary | primary-foreground |
| Inactive | transparent | muted-foreground |
| Hover (inactive) | muted | foreground |

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/components/features/navigation/LanguageSwitcher.tsx`
- `src/components/features/navigation/index.ts` (updated)
- `src/components/features/navigation/NavPanel.tsx` (updated - add switcher)
