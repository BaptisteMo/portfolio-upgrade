# Story 1.5: Splash Screen & Dashboard Transition

Status: done

## Story

**As a** visitor (Denis),
**I want** an animated splash screen that transitions to the main dashboard,
**So that** I experience a "wow" effect while seeing keywords quickly.

## Acceptance Criteria

1. **AC1**: Keywords are visible on the splash screen within 3 seconds
2. **AC2**: A visual indicator shows how to proceed (button, scroll hint, or arrow)
3. **AC3**: Clicking/scrolling/pressing any key triggers transition to dashboard
4. **AC4**: Transition animation runs at 60fps (fade + slide, ~500ms duration)
5. **AC5**: After transition, the tri-panel dashboard layout placeholder is visible
6. **AC6**: If reduced motion is preferred, transition is instant fade (< 100ms)
7. **AC7**: Splash screen only shows on first visit to homepage (session-based)

## Tasks / Subtasks

- [x] **Task 1: Create Splash Screen Component** (AC: 1, 2)
  - [x] Create `src/components/features/splash/SplashScreen.tsx`
  - [x] Create `src/components/features/splash/index.ts`
  - [x] Display keywords prominently (reuse HeroLanding content and the style de "Product designer" du HeroLanding)
  - [x] Add visual indicator (arrow down or "Entrer" button)

- [x] **Task 2: Implement Transition Triggers** (AC: 3)
  - [x] ~~Add click event listener on splash~~ → Changed to explicit button navigation per user request
  - [x] ~~Add scroll event listener~~ → Removed in favor of 3-step button flow
  - [x] ~~Add keydown event listener~~ → Removed in favor of 3-step button flow
  - [x] Step state machine (0 → 1 → 2) controls progression via button clicks

- [x] **Task 3: Create Transition Animation** (AC: 4, 6)
  - [x] Use Framer Motion AnimatePresence for exit animation
  - [x] Splash fades out + slides up
  - [x] Dashboard fades in from below
  - [x] Total duration ~500ms with ease-out
  - [x] Reduced motion: instant switch (opacity only, < 100ms)

- [x] **Task 4: Create Dashboard Placeholder** (AC: 5)
  - [x] Create basic dashboard layout container
  - [x] Show tri-panel structure (Nav | Content | Panel) as placeholders
  - [x] Will be fully implemented in Epic 2

- [x] **Task 5: Session-Based Display Logic** (AC: 7)
  - [x] Check sessionStorage for "splash_seen" flag
  - [x] If seen, skip splash and show dashboard directly
  - [x] Set flag after splash completes

- [x] **Task 6: Update Homepage** (AC: all)
  - [x] Create state for splash visibility
  - [x] Conditionally render Splash or Dashboard
  - [x] Handle transition between states

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/splash/`

**Animation Rule:** Use Framer Motion for this (React component transition with AnimatePresence)

### Technical Requirements

**Splash Screen Structure:**
```tsx
// src/components/features/splash/SplashScreen.tsx
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ChevronDown } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()

  // Handle all triggers
  useEffect(() => {
    const handleTrigger = () => onComplete()

    window.addEventListener('click', handleTrigger)
    window.addEventListener('scroll', handleTrigger)
    window.addEventListener('keydown', handleTrigger)

    return () => {
      window.removeEventListener('click', handleTrigger)
      window.removeEventListener('scroll', handleTrigger)
      window.removeEventListener('keydown', handleTrigger)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: reducedMotion ? 0 : -50,
        transition: { duration: reducedMotion ? 0.1 : 0.5 }
      }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      {/* Content similar to HeroLanding */}
      <div className="text-center">
        <h1 className="text-6xl font-bold">Product Designer</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          B2B SaaS • Design Systems • 6 ans d'expérience
        </p>

        {/* Visual indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="mx-auto h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cliquez pour entrer</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
```

**Homepage with Splash Logic:**
```tsx
// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SplashScreen } from '@/components/features/splash'
import { HeroLanding } from '@/components/features/hero'

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if splash was already seen this session
    if (sessionStorage.getItem('splash_seen')) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash_seen', 'true')
    setShowSplash(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>

      {!showSplash && <HeroLanding />}
    </>
  )
}
```

**Dashboard Placeholder (for AC5):**
```tsx
// Simple placeholder for now - full implementation in Epic 2
<div className="min-h-screen grid grid-cols-[250px_1fr_350px]">
  <nav className="bg-muted/30 p-4">Nav (Epic 2)</nav>
  <main className="p-8"><HeroLanding /></main>
  <aside className="bg-muted/30 p-4">Panel (Epic 4)</aside>
</div>
```

### Critical Rules (from project-context.md)

1. **ALWAYS** check reduced motion for animations
2. Use Framer Motion AnimatePresence for exit animations
3. Session-based logic prevents splash spam on refresh
4. Keywords MUST be visible < 3s (critical for Denis journey)

### UX Specifications (from UX Design Spec)

- **Timing**: ease-out ~500ms for premium feel
- **Triggers**: Click, scroll, or any key press
- **Indicator**: Animated arrow or "Entrer" text
- **Keywords visible**: Must be in first view, no scroll required

### Dependencies

- **Requires**: Story 1.2 (HeroLanding), Story 1.3 (animations), Story 1.4 (theme)
- **Blocked by**: Stories 1.2, 1.3, 1.4
- **Enables**: Story 1.6 (performance validation)

### References

- [UX Design Spec](../_bmad-output/planning-artifacts/ux-design-specification.md) - Splash screen pattern, Linear/Dia inspiration
- [PRD](../_bmad-output/planning-artifacts/prd.md) - FR-CP-01, FR-CP-01-BIS
- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - Animation coordination

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created SplashScreen component with letter-by-letter cascade animation (same style as HeroLanding)
- Animation includes blur effect (8px → 0px) with custom ease-out curve
- Implemented 3-step flow per user request:
  - Step 0: "Product Designer" + subtitle + "Suivant" button
  - Step 1: "Créer des expériences qui comptent" + "Entrer sur le site" button
  - Step 2: Tri-panel dashboard
- SplashScreen refactored to accept props: headline, subtitle (optional), buttonText, onComplete
- Step state machine (0, 1, 2) controls progression via explicit button clicks
- AnimatePresence with mode="wait" for smooth exit/enter transitions
- Splash exits with fade + slide up (-50px), dashboard enters with fade + slide up
- Reduced motion: instant transitions (<100ms), no y movement
- Session-based: sessionStorage "splash_seen" flag skips to step 2 on return visits
- Mounted check prevents hydration mismatch
- Dashboard placeholder shows tri-panel grid (Nav | Content | Panel)
- Build passes successfully

### File List

_Files created/modified:_
- `src/components/features/splash/SplashScreen.tsx` (created)
- `src/components/features/splash/index.ts` (created)
- `src/app/page.tsx` (updated with splash logic and dashboard placeholder)

---

## Senior Developer Review

**Review Date:** 2026-01-23
**Reviewer:** Claude Opus 4.5 (Adversarial Code Review)

### Issues Found: 2

#### 🟡 MEDIUM (2)

| ID | Issue | Resolution |
|----|-------|------------|
| M1 | **Completion Notes outdated** - Referenced ChevronDown and click/scroll/keydown triggers from original implementation | ✅ FIXED - Updated to reflect 3-step button flow |
| M2 | **Task 2 outdated** - Story tasks referenced event listeners that were replaced with button navigation | ✅ FIXED - Updated Task 2 to show design change |

### Review Outcome

**Status:** PASSED ✅
All issues addressed. Story approved for completion.
