# Story 5.8: Scroll Parallax Effects

Status: done

## Story

**As a** visitor,
**I want** subtle parallax effects on scroll,
**So that** the portfolio feels dynamic and premium.

## Acceptance Criteria

1. **AC1**: Subtle parallax movement on images/decorative elements during scroll
2. **AC2**: Parallax uses GSAP ScrollTrigger
3. **AC3**: Effect calibrated for both trackpad and mouse wheel
4. **AC4**: Parallax intensity is subtle (max 50px offset)
5. **AC5**: GSAP checks `prefers-reduced-motion` before initializing
6. **AC6**: Parallax is disabled on mobile for performance
7. **AC7**: Build passes with no errors

## Tasks / Subtasks

- [ ] **Task 1: Install GSAP** (AC: 2)
  - [ ] Run `npm install gsap`
  - [ ] Verify peer dependencies and build still passes
  - [ ] GSAP is free for non-commercial use; this portfolio qualifies

- [ ] **Task 2: Create useParallax Hook** (AC: 1-6)
  - [ ] Create `src/hooks/useParallax.ts` as `'use client'`
  - [ ] Import `gsap` and `ScrollTrigger` from `gsap/ScrollTrigger`
  - [ ] Register plugin: `gsap.registerPlugin(ScrollTrigger)` (call once, idempotent)
  - [ ] Hook signature: `useParallax(ref: RefObject<HTMLElement | null>, options?: ParallaxOptions)`
  - [ ] Options interface:
    ```typescript
    interface ParallaxOptions {
      speed?: number    // Parallax speed factor (default: 0.3)
      direction?: 'y' | 'x'  // Direction (default: 'y')
      maxOffset?: number // Max offset in px (default: 50)
    }
    ```
  - [ ] Implementation:
    - Check `useReducedMotion()` — if true, return early (no GSAP setup)
    - Check mobile: `window.matchMedia('(max-width: 768px)').matches` — if true, return early
    - Use `useEffect` with GSAP `gsap.to()` + `ScrollTrigger`:
      ```typescript
      gsap.to(ref.current, {
        y: maxOffset * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,  // Smooth scrub for trackpad + mouse
        },
      })
      ```
    - `scrub: true` handles both trackpad and mouse wheel smoothly (AC3)
    - Cleanup: `ScrollTrigger.getAll().forEach(t => t.kill())` in useEffect return
  - [ ] Export from `src/hooks/index.ts`

- [ ] **Task 3: Apply Parallax to Case Study Images** (AC: 1, 4)
  - [ ] Identify target elements in case study pages:
    - Hero/header images in `CaseStudyHeader.tsx` — primary parallax target
    - Section images within MDX content — secondary targets
  - [ ] Add `ref` + `useParallax(ref)` to case study header image container
  - [ ] Set subtle speed: `speed: 0.2`, `maxOffset: 30` for header images
  - [ ] The image container should have `overflow: hidden` to prevent parallax from showing beyond bounds
  - [ ] Wrap parallax target in a div with `will-change: transform` for GPU acceleration

- [ ] **Task 4: Apply Parallax to Project Cards Page** (AC: 1, 4)
  - [ ] In the projects grid page, apply parallax to decorative background elements (if any)
  - [ ] If no decorative elements exist, apply subtle parallax to the page header/title area
  - [ ] Speed: `0.15`, maxOffset: `20` — very subtle for text elements
  - [ ] **SCOPE CHECK**: Only add parallax if there are clear visual targets. Don't force it on elements where it doesn't feel natural.

- [ ] **Task 5: Mobile & Reduced Motion Guards** (AC: 5, 6)
  - [ ] `useReducedMotion()` check in hook — no GSAP initialization when true
  - [ ] Mobile check via `window.matchMedia('(max-width: 768px)')` — no parallax on mobile
  - [ ] Both checks happen in `useEffect` before any GSAP calls
  - [ ] Add `prefers-reduced-motion` media query guard in GSAP:
    ```typescript
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    ```
  - [ ] SSR safety: all `window` checks inside `useEffect`

- [ ] **Task 6: Build Verification** (AC: 7)
  - [ ] Run `npm run build` — no errors
  - [ ] Test: Scroll case study page → subtle parallax on header image
  - [ ] Test: Trackpad scroll → smooth parallax movement
  - [ ] Test: Mouse wheel scroll → smooth parallax movement
  - [ ] Test: Parallax offset never exceeds 50px
  - [ ] Test: Mobile viewport → no parallax
  - [ ] Test: Reduced motion → no parallax
  - [ ] Test: No jank or performance issues (60fps target)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/hooks/useParallax.ts                # GSAP ScrollTrigger parallax hook
```

**Modified Files:**
```
src/hooks/index.ts                       # Add useParallax export
src/components/features/case-study/CaseStudyHeader.tsx  # Apply parallax to header image
package.json                             # Add gsap dependency
```

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` on useParallax.ts
3. **GSAP for scroll animations** — architecture mandates GSAP + ScrollTrigger for scroll effects
4. **CRITICAL**: ALL GSAP animations MUST check `prefers-reduced-motion` before execution:
   ```typescript
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
   ```
5. `useReducedMotion()` from `@/hooks` — double-check with both React hook and native matchMedia
6. Hook naming: `useParallax.ts` in `src/hooks/`
7. Mobile guard: Disable parallax on `max-width: 768px`
8. `scrub: true` for smooth trackpad/mouse scroll (not `scrub: 0.5` — true is smoothest)
9. Cleanup all ScrollTrigger instances on unmount

### GSAP ScrollTrigger Reference

```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scrub parallax (element moves with scroll)
gsap.to(element, {
  y: 50,           // Max offset
  ease: 'none',    // Linear for parallax
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',    // When top of element hits bottom of viewport
    end: 'bottom top',      // When bottom of element hits top of viewport
    scrub: true,            // Smooth scrub (links animation to scroll position)
  },
})
```

**Key props:**
- `scrub: true` — smooth animation tied to scroll position (best for parallax)
- `scrub: 0.5` — 0.5s lag behind scroll (slightly smoother but laggy feel)
- `ease: 'none'` — linear progression for natural parallax feel
- `start/end` — defines the scroll range for the animation

### Previous Story Intelligence

**From Story 3-8 (Scroll Animations):**
- Project uses `useInView` from Framer Motion for scroll reveals — NOT GSAP
- ScrollReveal component: `once: true`, `margin: '-100px 0px -100px 0px'`
- This is the **first GSAP usage** in the project
- Signature ease `[0.16, 1, 0.3, 1]` used for Framer Motion reveals — parallax uses `ease: 'none'`

**From Code Review learnings:**
- `motion-reduce:transition-none` pattern for CSS
- `useReducedMotion()` returns boolean (SSR-safe via framer-motion)
- Cleanup effects properly to prevent memory leaks

### Performance Considerations

- `will-change: transform` on parallax elements for GPU compositing
- `scrub: true` uses `requestAnimationFrame` internally — 60fps guaranteed
- Max 2-3 parallax elements per page to avoid overdraw
- Overflow hidden on parent to prevent layout shifts
- Mobile disabled entirely for battery/performance

### Scope Notes

- This is the **first GSAP installation** in the project — keep it minimal
- Only apply parallax to clear visual targets (images, hero areas) — don't parallax text content
- `ScrollTrigger` is the only GSAP plugin needed
- No complex GSAP timelines — just scrub parallax
- No scroll-triggered reveals (already handled by Framer Motion in Story 3-8)

### Dependencies

- **Requires**: None (independent story)
- **Enables**: GSAP foundation for any future scroll-based animations

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — GSAP for scroll animations, prefers-reduced-motion
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Scroll parallax specs, 60fps requirement
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-58-scroll-parallax-effects)
- [Story 3-8](/_bmad-output/implementation-artifacts/3-8-case-study-scroll-animations.md) — Existing scroll animation patterns
- [Project Context](/_bmad-output/project-context.md) — GSAP reduced-motion rule

### Testing Checklist

- [ ] GSAP installed, build passes
- [ ] Case study header image has subtle parallax on scroll
- [ ] Parallax movement never exceeds 50px
- [ ] Trackpad scroll: smooth parallax
- [ ] Mouse wheel scroll: smooth parallax
- [ ] Mobile viewport: no parallax active
- [ ] Reduced motion: no parallax active
- [ ] No jank or stutter during scroll (60fps)
- [ ] ScrollTrigger cleanup on unmount (no memory leaks)
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- GSAP installed (`npm install gsap`) — first GSAP usage in project
- Created `useParallax` hook: async GSAP/ScrollTrigger import, `scrub: true`, configurable speed/direction/maxOffset
- Guards: `useReducedMotion()` + native `prefers-reduced-motion` matchMedia + mobile `max-width: 768px` — all in useEffect
- Applied parallax to ProjectCard image container: `speed: 0.15`, `maxOffset: 20` (very subtle)
- Wrapped image in div with `overflow-hidden` parent
- Task 3 (CaseStudyHeader parallax): N/A — component has no images, only text. Story scope notes say "don't force parallax on elements where it doesn't feel natural"
- AC1 partial: Only ProjectCard images have parallax — no other decorative elements identified as natural targets. Scope check applied per story guidelines.
- CR fix: Cleanup now kills only the specific tween/trigger (not all ScrollTrigger instances)
- CR fix: Added `cancelled` flag to prevent race condition on async init + unmount
- Build passes — 16 pages generated, no errors

### File List

- `src/hooks/useParallax.ts` (new — GSAP ScrollTrigger parallax hook)
- `src/hooks/index.ts` (modified — added useParallax export)
- `src/components/features/projects/ProjectCard.tsx` (modified — parallax on image container)
