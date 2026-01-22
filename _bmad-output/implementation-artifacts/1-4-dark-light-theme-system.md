# Story 1.4: Dark/Light Theme System

Status: ready-for-dev

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

- [ ] **Task 1: Verify next-themes Installation** (AC: 2)
  - [ ] Confirm next-themes installed from Story 1.1
  - [ ] If not: `npm install next-themes`

- [ ] **Task 2: Create ThemeProvider Component** (AC: 2, 5)
  - [ ] Create `src/components/shared/ThemeProvider.tsx`
  - [ ] Wrap next-themes ThemeProvider with proper config
  - [ ] Add `suppressHydrationWarning` to prevent hydration mismatch

- [ ] **Task 3: Configure Root Layout** (AC: 1, 2, 6)
  - [ ] Import ThemeProvider in `src/app/layout.tsx`
  - [ ] Set `defaultTheme="dark"`
  - [ ] Set `enableSystem={true}` for system preference support
  - [ ] Add `attribute="class"` for Tailwind dark mode

- [ ] **Task 4: Verify CSS Variables** (AC: 3)
  - [ ] Confirm light mode variables in globals.css
  - [ ] Confirm dark mode variables in globals.css (inside .dark or :root)
  - [ ] Test all semantic colors switch correctly

- [ ] **Task 5: Create ThemeToggle Component** (AC: 4)
  - [ ] Create `src/components/shared/ThemeToggle.tsx`
  - [ ] Use `useTheme` hook from next-themes
  - [ ] Add sun/moon icon toggle button
  - [ ] Ensure accessible (aria-label)

- [ ] **Task 6: Test Theme Persistence** (AC: 4, 5)
  - [ ] Change theme manually
  - [ ] Refresh page - theme should persist
  - [ ] Clear localStorage - should default to dark
  - [ ] Set system to light - should follow system if no manual choice

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

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/components/shared/ThemeProvider.tsx`
- `src/components/shared/ThemeToggle.tsx`
- `src/app/layout.tsx` (updated)
- `src/app/globals.css` (verify light/dark vars)
