# Story 1.3: Hero Typography Animations

Status: ready-for-dev

## Story

**As a** visitor,
**I want** the hero text to animate spectacularly on page load,
**So that** I experience the craft and technical skill immediately.

## Acceptance Criteria

1. **AC1**: Typography animates with cascade/stagger effect (letters or words fade-in sequentially)
2. **AC2**: Animation uses Framer Motion with custom timing curves (ease-out ~1.2s total)
3. **AC3**: Keywords appear progressively but are fully visible within 3 seconds
4. **AC4**: Animation runs at 60fps with no frame drops
5. **AC5**: If `prefers-reduced-motion` is enabled, animation is simplified to instant fade (no cascade)
6. **AC6**: Animation only plays on initial page load (not on re-renders)

## Tasks / Subtasks

- [ ] **Task 1: Install Framer Motion** (AC: 2)
  - [ ] Run `npm install framer-motion`
  - [ ] Verify installation in package.json

- [ ] **Task 2: Create Animation Variants** (AC: 1, 2, 3)
  - [ ] Create stagger container variant for parent
  - [ ] Create child variants for individual elements
  - [ ] Define timing: staggerChildren ~0.1s, each element ~0.5s duration
  - [ ] Use ease-out curve for premium feel

- [ ] **Task 3: Implement Reduced Motion Hook** (AC: 5)
  - [ ] Create `src/hooks/useReducedMotion.ts`
  - [ ] Hook returns boolean for `prefers-reduced-motion: reduce`
  - [ ] Export from hooks index

- [ ] **Task 4: Update HeroLanding Component** (AC: 1, 3, 4, 6)
  - [ ] Wrap container with motion.div and stagger variant
  - [ ] Wrap headline, tagline, CTAs with motion elements
  - [ ] Apply conditional animation based on reduced motion
  - [ ] Use `initial`, `animate` props (not whileInView for hero)

- [ ] **Task 5: Performance Validation** (AC: 4)
  - [ ] Test animation in Chrome DevTools Performance tab
  - [ ] Verify frame time < 16ms during animation
  - [ ] Ensure no layout shifts (CLS = 0)

## Dev Notes

### Architecture Compliance

**Animation Stack Rule (from architecture.md):**
- **Framer Motion**: React component transitions, AnimatePresence, hover states
- **GSAP**: Scroll-triggered animations only (NOT for this story)

This story uses Framer Motion because it's a React component entrance animation.

### Technical Requirements

**Animation Specifications (from UX Design Spec):**
```
- Total animation duration: ~1.2s
- Timing curve: ease-out (cubic-bezier(0.16, 1, 0.3, 1))
- Stagger delay between elements: 0.1-0.15s
- Keywords must be readable within 3s
```

**Framer Motion Variants:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ease-out custom
    },
  },
}
```

**Reduced Motion Fallback:**
```tsx
const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
}
```

### Hook Implementation

```tsx
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion() {
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

### Updated HeroLanding Example

```tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroLanding() {
  const reducedMotion = useReducedMotion()

  const variants = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      className="min-h-screen flex items-center"
    >
      <div className="container">
        <motion.h1 variants={itemVars}>Product Designer</motion.h1>
        <motion.p variants={itemVars}>B2B SaaS • Design Systems...</motion.p>
        <motion.div variants={itemVars}>
          {/* CTAs */}
        </motion.div>
      </div>
    </motion.section>
  )
}
```

### Critical Rules (from project-context.md)

1. **'use client'** directive required for Framer Motion components
2. **ALWAYS** check reduced motion preference before complex animations
3. Framer Motion for React transitions (this story), GSAP for scroll only
4. No animation should block content visibility > 3s

### Dependencies

- **Requires**: Story 1.2 complete (HeroLanding component exists)
- **Blocked by**: Story 1.2
- **Enables**: Story 1.5 (splash screen uses similar patterns)

### References

- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - Animation Stack decision
- [UX Design Spec](../_bmad-output/planning-artifacts/ux-design-specification.md) - Animation timing, ease-out 1.2s
- [Project Context](../_bmad-output/project-context.md) - Reduced motion rule

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/hooks/useReducedMotion.ts`
- `src/hooks/index.ts` (barrel export)
- `src/components/features/hero/HeroLanding.tsx` (updated)
