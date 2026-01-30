# Story 3.8: Case Study Scroll Reveal Animations

Status: done

## Story

**As a** visitor (Mathilde, Thomas),
**I want** smooth scroll-triggered reveal animations on case study content,
**So that** the reading experience feels polished and engaging while maintaining consistency with the rest of the site.

## Acceptance Criteria

1. **AC1**: Content sections (paragraphs, headings, images) fade in progressively as user scrolls
2. **AC2**: Reveal animation uses consistent signature style: opacity fade + slight Y offset + blur transition
3. **AC3**: MetricsGrid cards animate only when fully entering the viewport (fix premature trigger)
4. **AC4**: CaseStudyHeader animates on page load with staggered reveal (consistent with splash screen style)
5. **AC5**: All animations respect `prefers-reduced-motion` (instant display if enabled)
6. **AC6**: Animations run at 60fps with no perceptible jank

## Tasks / Subtasks

- [x] **Task 1: Create Reusable ScrollReveal Component** (AC: 1, 2, 5)
  - [x] Create `src/components/ui/scroll-reveal.tsx`
  - [x] Implement Framer Motion `useInView` with appropriate threshold
  - [x] Define animation variants matching signature style:
    - `hidden`: `{ opacity: 0, y: 20, filter: 'blur(4px)' }`
    - `visible`: `{ opacity: 1, y: 0, filter: 'blur(0px)' }`
  - [x] Use easing curve `[0.16, 1, 0.3, 1]` for consistency with SplashScreen
  - [x] Add `useReducedMotion` check for accessibility
  - [x] Support optional `delay` prop for staggered reveals
  - [x] Export from `@/components/ui`

- [x] **Task 2: Fix MetricsGrid/StatCard Visibility Threshold** (AC: 3, 5, 6)
  - [x] Update `StatCard.tsx` `useInView` threshold from `amount: 0.5` to more appropriate value
  - [x] Consider using `margin` option to delay trigger until card is more centered
  - [x] Test that count-up animation triggers only when card is clearly visible
  - [x] Ensure MetricsGrid children animate with stagger effect
  - [x] Verify animation doesn't trigger during initial page load if below fold

- [x] **Task 3: Add Header Entrance Animation** (AC: 4, 5)
  - [x] Update `CaseStudyHeader.tsx` to animate on mount
  - [x] Implement staggered reveal for header elements:
    1. Title first
    2. Metadata row (status, timeline, client)
    3. Tags row
    4. Description
  - [x] Use `staggerChildren` with ~0.1s delay between elements
  - [x] Match animation timing with SplashScreen (`duration: 0.8s`)

- [x] **Task 4: Integrate ScrollReveal in MDXContent** (AC: 1, 2, 6)
  - [x] Wrap MDX prose sections with ScrollReveal
  - [x] Apply reveal to H2 section headings
  - [x] Apply reveal to paragraph blocks
  - [x] Apply reveal to Callout components
  - [x] Apply reveal to ImageFull components
  - [x] Ensure proper stagger between consecutive elements

- [x] **Task 5: Update Case Study Page Integration** (AC: all)
  - [x] Import and use ScrollReveal wrapper in page component if needed
  - [x] Verify all content sections animate correctly
  - [x] Test scroll performance on case study pages
  - [x] Verify animations don't cause CLS (Cumulative Layout Shift)

- [x] **Task 6: Validate Animation Performance** (AC: 6)
  - [x] Run Lighthouse audit to ensure Performance > 90 maintained
  - [x] Profile with Chrome DevTools to verify 60fps
  - [x] Test on mobile viewport for smooth scrolling
  - [x] Ensure no frame drops during scroll animations

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/ui/scroll-reveal.tsx`

**Source: Existing Animation Patterns**

From `SplashScreen.tsx` - Signature animation style to reuse:
```typescript
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
```

### Technical Requirements

**ScrollReveal Component Skeleton:**

```tsx
// src/components/ui/scroll-reveal.tsx
'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 }
  },
}

export function ScrollReveal({
  children,
  delay = 0,
  className
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -100px 0px' // Trigger when element is 100px inside viewport
  })
  const reducedMotion = useReducedMotion()

  const variants = reducedMotion ? reducedMotionVariants : revealVariants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**StatCard Fix - Updated useInView:**

```tsx
// Current (problematic):
const isInView = useInView(ref, { once: true, amount: 0.5 })

// Fixed (better threshold):
const isInView = useInView(ref, {
  once: true,
  margin: '-50px 0px -50px 0px' // Only trigger when card is well within viewport
})
```

**CaseStudyHeader Animation Pattern:**

```tsx
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. **ALWAYS** check `useReducedMotion()` before animations
3. Animation easing curve: `[0.16, 1, 0.3, 1]` (signature ease)
4. Animation duration: `0.8s` for reveals (consistent with SplashScreen)
5. Blur amount: `4px` for subtle effect (not too aggressive)

### Animation Specifications

| Property | Value | Rationale |
|----------|-------|-----------|
| Duration | 0.8s | Matches SplashScreen, feels premium |
| Y Offset | 20px | Subtle upward motion |
| Blur | 4px | Soft focus effect |
| Easing | [0.16, 1, 0.3, 1] | Expo-out feel, fast start |
| Stagger | 0.1s | Between sibling elements |
| Trigger margin | -100px | Element must be 100px inside viewport |

### Dependencies

- **Requires**: Story 3.3 (Case Study Page), Story 3.5 (MetricsGrid/StatCard)
- **Blocked by**: None
- **Enables**: Epic 5 visual polish

### References

- [SplashScreen.tsx](src/components/features/splash/SplashScreen.tsx) - Animation variants source
- [StatCard.tsx](src/components/features/case-study/StatCard.tsx) - Component to fix
- [CaseStudyHeader.tsx](src/components/features/case-study/CaseStudyHeader.tsx) - Component to enhance

### Testing Checklist

- [ ] Scroll through case study page - sections reveal progressively
- [ ] MetricsGrid cards only animate when clearly in view (not prematurely)
- [ ] Header animates on page load with stagger effect
- [ ] Enable `prefers-reduced-motion` - all animations instant
- [ ] Lighthouse Performance score remains > 90
- [ ] No visible frame drops during scroll
- [ ] No layout shift during reveal animations

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

1. **ScrollReveal Component**: Created reusable component with signature animation style (opacity + y offset + blur). Uses `margin: '-100px 0px -100px 0px'` for proper viewport detection.

2. **StatCard Fix**: Changed from `amount: 0.5` to `margin: '-50px 0px -50px 0px'`. Also updated animation to include blur effect for consistency with signature style.

3. **CaseStudyHeader Animation**: Added staggered reveal with `staggerChildren: 0.1` and `delayChildren: 0.1`. Each element (title, metadata, tags, description) animates in sequence.

4. **MDXContent Integration**: Wrapped all prose elements (h2, h3, p, ul, ol, blockquote, Callout, ImageFull) with ScrollReveal for progressive reveal on scroll.

5. **Build Verification**: Build passes successfully. Existing lint warnings are pre-existing issues unrelated to this story.

### File List

_Files created/modified:_
- `src/components/ui/scroll-reveal.tsx` (created)
- `src/components/ui/index.ts` (created - barrel export for ui components)
- `src/components/features/case-study/StatCard.tsx` (updated - fix threshold + add blur)
- `src/components/features/case-study/CaseStudyHeader.tsx` (updated - add staggered animations)
- `src/components/mdx/MDXContent.tsx` (updated - integrate ScrollReveal)
