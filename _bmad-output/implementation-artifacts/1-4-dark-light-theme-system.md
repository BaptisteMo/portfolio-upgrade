# Story 1.4: Dark/Light Theme System

Status: review

## Story

**As a** visitor,
**I want** the portfolio to respect my theme preference with dark mode as default,
**So that** I have a comfortable viewing experience.

## Acceptance Criteria

1. **AC1**: Dark mode is displayed by default on first visit
2. **AC2**: next-themes provider is configured in root layout
3. **AC3**: CSS variables switch correctly between light and dark palettes
4. **AC4**: Theme preference persists via localStorage
5. **AC5**: No flash of wrong theme on page load (FOUC prevented)
6. **AC6**: System preference (`prefers-color-scheme`) is respected if no manual choice made

## Tasks / Subtasks

- [x] **Task 1: Verify next-themes Installation** (AC: 2)
  - [x] Confirm next-themes installed from Story 1.1
  - [x] If not: `npm install next-themes`

- [x] **Task 2: Create ThemeProvider Component** (AC: 2, 5)
  - [x] Create `src/components/shared/ThemeProvider.tsx`
  - [x] Wrap next-themes ThemeProvider with proper config
  - [x] Add `suppressHydrationWarning` to prevent hydration mismatch

- [x] **Task 3: Configure Root Layout** (AC: 1, 2, 6)
  - [x] Import ThemeProvider in `src/app/layout.tsx`
  - [x] Set `defaultTheme="dark"`
  - [x] Set `enableSystem={true}` for system preference support
  - [x] Add `attribute="class"` for Tailwind dark mode

- [x] **Task 4: Verify CSS Variables** (AC: 3)
  - [x] Confirm light mode variables in globals.css
  - [x] Confirm dark mode variables in globals.css (inside .dark or :root)
  - [x] Test all semantic colors switch correctly

- [x] **Task 5: Create ThemeToggle Component** (AC: 4)
  - [x] Create `src/components/shared/ThemeToggle.tsx`
  - [x] Use `useTheme` hook from next-themes
  - [x] Add sun/moon icon toggle button
  - [x] Ensure accessible (aria-label)

- [x] **Task 6: Test Theme Persistence** (AC: 4, 5)
  - [x] Change theme manually
  - [x] Refresh page - theme should persist
  - [x] Clear localStorage - should default to dark
  - [x] Set system to light - should follow system if no manual choice

## Dev Notes

### Architecture Compliance

**Theme Management Rule (from architecture.md):**
- Use `next-themes` for dark/light mode - NEVER create custom theme state
- Dark mode is DEFAULT
- Toggle via Command Palette (`/dark` or `/light`) - but ThemeToggle also available

### Technical Requirements

**ThemeProvider Component:**
```tsx
// src/components/shared/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

**Root Layout Configuration:**
```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/components/shared/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${fonts} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**ThemeToggle Component:**
```tsx
// src/components/shared/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

**CSS Variables Structure (in globals.css):**
```css
@layer base {
  :root {
    /* Light mode colors */
    --background: 0 0% 100%;
    --foreground: 224 71% 4%;
    /* ... other light mode vars */
  }

  .dark {
    /* Dark mode colors (DEFAULT) */
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    /* ... other dark mode vars */
  }
}
```

### Critical Rules (from project-context.md)

1. **NEVER** create custom theme state with useState
2. **ALWAYS** use `next-themes` useTheme hook
3. Dark mode is DEFAULT - set in ThemeProvider config
4. `suppressHydrationWarning` on `<html>` prevents FOUC errors
5. `disableTransitionOnChange` prevents flash during theme switch

### Dependencies

- **Requires**: Story 1.1 complete (next-themes installed, CSS variables defined)
- **Blocked by**: Story 1.1
- **Enables**: Story 5.3 (Command Palette theme commands)

### Anti-Patterns to AVOID

| Don't Do | Do Instead |
|----------|------------|
| `const [theme, setTheme] = useState('dark')` | `const { theme, setTheme } = useTheme()` |
| Hardcoded `bg-gray-900` | `bg-background` (uses CSS var) |
| Theme script in `<head>` | next-themes handles this |
| Flash on load | Add `suppressHydrationWarning` |

### References

- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - State Management decision
- [Project Context](../_bmad-output/project-context.md) - Theme rules
- [PRD](../_bmad-output/planning-artifacts/prd.md) - FR-VX-06

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Tasks 1-4 were already completed in Story 1.1 (foundation setup)
- next-themes v0.4.6 installed
- ThemeProvider component exists with proper typing
- Root layout configured with defaultTheme="dark", enableSystem, disableTransitionOnChange
- CSS variables fully defined for light (:root) and dark (.dark) modes using OKLCH colors
- Created ThemeToggle component with Sun/Moon icons and smooth rotation transition
- French aria-label for accessibility
- Build passes successfully

### File List

_Files created/modified:_
- `src/components/shared/ThemeProvider.tsx` (existed from 1.1)
- `src/components/shared/ThemeToggle.tsx` (created)
- `src/components/shared/index.ts` (updated - added ThemeToggle export)
- `src/app/layout.tsx` (existed from 1.1)
- `src/app/globals.css` (existed from 1.1 - verified light/dark vars)
