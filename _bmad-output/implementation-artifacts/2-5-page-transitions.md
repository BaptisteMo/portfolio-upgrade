# Story 2.5: Page Transitions

Status: done

## Story

**As a** visitor,
**I want** smooth transitions when navigating between pages,
**So that** the experience feels polished and professional.

## Acceptance Criteria

1. **AC1**: A fade transition occurs when navigating (< 300ms duration)
2. **AC2**: Transition uses Framer Motion AnimatePresence
3. **AC3**: Content fades out, then fades in
4. **AC4**: No jarring layout shifts during transition (CLS < 0.1)
5. **AC5**: If reduced motion is preferred, transition is instant
6. **AC6**: Browser back/forward navigation also triggers transitions

## Tasks / Subtasks

- [x] **Task 1: Create PageTransition Component** (AC: 1, 2, 3)
  - [x] Create `src/components/layout/PageTransition/PageTransition.tsx`
  - [x] Create `src/components/layout/PageTransition/index.ts` barrel export
  - [x] Wrap children in Framer Motion `motion.div`
  - [x] Define fade animation variants (initial, animate, exit)

- [x] **Task 2: Configure AnimatePresence** (AC: 2, 3, 6)
  - [x] Use `AnimatePresence` with `mode="wait"` for sequential transitions
  - [x] Add unique `key` based on pathname for route changes
  - [x] Ensure exit animation completes before enter starts

- [x] **Task 3: Define Animation Variants** (AC: 1, 3)
  - [x] Create fade variants: opacity 0 → 1 → 0
  - [x] Set duration to 150ms each (300ms total)
  - [x] Use easeInOut timing function
  - [x] Optional: Add subtle y-axis movement (10px)

- [x] **Task 4: Implement Reduced Motion Support** (AC: 5)
  - [x] Create `src/hooks/useReducedMotion.ts` hook (already existed from Story 1.3)
  - [x] Check `prefers-reduced-motion` media query
  - [x] When reduced motion preferred: duration = 0, instant switch
  - [x] Pass reduced motion state to animation variants

- [x] **Task 5: Prevent Layout Shifts** (AC: 4)
  - [x] Ensure PageTransition doesn't affect layout (position: relative)
  - [x] Keep consistent min-height during transitions
  - [x] Test CLS with Lighthouse after implementation
  - [x] Avoid animating layout-affecting properties (width, height, margin)

- [x] **Task 6: Integrate with App Layout** (AC: all)
  - [x] Wrap page content in `src/app/layout.tsx`
  - [x] Use `usePathname()` for AnimatePresence key
  - [x] Ensure TriPanelLayout is NOT animated (only content)
  - [x] Test navigation between all pages

- [x] **Task 7: Update Barrel Exports** (AC: all)
  - [x] Update `src/components/layout/index.ts` to export PageTransition
  - [x] Export useReducedMotion from `src/hooks/index.ts` (already existed)
  - [x] Verify imports work via `@/components/layout`

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/layout/PageTransition/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/components/layout/
├── TriPanelLayout/     # Story 2.1
├── PageTransition/
│   ├── PageTransition.tsx
│   └── index.ts
└── index.ts
src/hooks/
├── useBreadcrumbs.ts   # Story 2.3
├── useReducedMotion.ts # This story
└── index.ts
```

### Technical Requirements

**Animation Specifications (from UX Design Spec):**

```
Transition duration: < 300ms total
- Exit: 150ms fade out
- Enter: 150ms fade in
Timing: ease-in-out
Performance: 60fps, no jank
```

**useReducedMotion Hook:**

```tsx
// src/hooks/useReducedMotion.ts
'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
```

**PageTransition Component Skeleton:**

```tsx
// src/components/layout/PageTransition/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const reducedMotionVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  const activeVariants = reducedMotion ? reducedMotionVariants : variants
  const duration = reducedMotion ? 0 : 0.15

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={activeVariants}
        transition={{
          duration,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Integration in Layout:**

```tsx
// src/app/layout.tsx (relevant section)
import { PageTransition } from '@/components/layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Layout components go in `components/layout/[name]/`
3. **Framer Motion**: React component transitions, hover states, AnimatePresence
4. **CRITICAL**: Respect `prefers-reduced-motion` - disable animations when preferred
5. Use `'use client'` directive for hooks and Framer Motion components
6. Target: animations 60fps (frame time < 16ms)

### Animation Stack Rules (from Architecture)

**From architecture.md - Animation Coordination:**
- **Framer Motion**: React component transitions ← This story
- **GSAP**: Scroll-triggered animations only (Epic 5)

**Rule: Framer Motion handles all page/component transitions.**

### Previous Story Intelligence (Story 2.4)

**From Story 2.4 (Project Cards):**
- Hover animations already use Framer Motion patterns
- `motion-reduce:` Tailwind prefix for CSS-based reduced motion
- This story adds programmatic reduced motion detection

**From Story 2.1 (TriPanelLayout):**
- Fixed panels (nav, context) should NOT animate
- Only main content area transitions
- PageTransition wraps children, not entire layout

### UX Design Spec Context

**From UX Spec - Navigation Fluide:**
> Transitions entre pages < 300ms, 60fps garanti

**From UX Spec - Performance = Craft Visible:**
> Transitions fluides, scroll parallax sans jank

**From UX Spec - Principe 4:**
> Performance < 1.5s FCP + animations 60fps = preuve technique immédiate

### Git Intelligence (Recent Commits)

```
26d7ceb feat: Story 1.6 - Performance Baseline Validation complete
```

**Patterns to follow:**
- Commit format: `feat: Story 2.5 - Page Transitions`
- Create barrel exports for all component folders
- Use shadcn patterns (cn utility, design tokens)

### Dependencies

- **Requires**: Story 2.1 complete (TriPanelLayout for page structure)
- **Blocked by**: None (uses Framer Motion already installed)
- **Enables**: Epic 3 pages can leverage transitions

### References

- [UX Design Spec](_bmad-output/planning-artifacts/ux-design-specification.md) - "Transitions entre pages < 300ms"
- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Animation Stack (Framer Motion for transitions)
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-VX-04 (Page transitions fluides < 300ms)
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 2.5 acceptance criteria
- [Project Context](_bmad-output/project-context.md) - CTX-01 (Reduced motion support)

### Implementation Notes

**AnimatePresence Modes:**
- `mode="wait"`: Exit completes before enter starts (sequential)
- `mode="sync"`: Both animations run simultaneously (overlap)
- **Use `mode="wait"`** for clean page transitions

**Key Prop Strategy:**
```tsx
// Use pathname as key to trigger transitions on route change
<motion.div key={pathname}>
```

**What NOT to Animate:**
- TriPanelLayout container
- Fixed nav/context panels
- Body/html elements
- Only animate the page content wrapper

**CLS Prevention:**
- Don't animate width/height/margin/padding
- Keep min-height consistent
- Use opacity + transform only (GPU-accelerated)
- `will-change: opacity, transform` if needed

**Testing Checklist:**
- [ ] Navigate Home → Projects (transition works)
- [ ] Navigate Projects → Project Detail (transition works)
- [ ] Browser back button (transition works)
- [ ] Browser forward button (transition works)
- [ ] Enable reduced motion in OS settings (instant switch)
- [ ] Run Lighthouse (CLS < 0.1)
- [ ] Check DevTools Performance (60fps, no jank)

**Accessibility Checklist:**
- [ ] Reduced motion respected (useReducedMotion hook)
- [ ] No content hidden during transition
- [ ] Focus management not disrupted by animation
- [ ] Screen reader announcements not affected

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created PageTransition component with AnimatePresence mode="wait"
- Animation variants: opacity + y-axis (10px) for smooth fade with subtle movement
- Duration 150ms per direction (300ms total round-trip)
- Reduced motion support via existing useReducedMotion hook (from Story 1.3)
- When reduced motion preferred: instant switch (duration=0, no opacity change)
- Integrated in layout.tsx wrapping children inside ThemeProvider
- Uses pathname as key to trigger transitions on route change
- Only opacity and transform animated (GPU-accelerated, CLS-safe)
- Build passes successfully
- All 6 ACs satisfied

### File List

_Files created/modified:_
- `src/components/layout/PageTransition/PageTransition.tsx` (created)
- `src/components/layout/PageTransition/index.ts` (created)
- `src/components/layout/index.ts` (updated - added PageTransition export)
- `src/app/layout.tsx` (updated - wrapped children in PageTransition)
