# Story 1.2: Hero Landing Component

Status: done

## Story

**As a** visitor (Denis),
**I want** to see a hero section with impactful typography and visible keywords,
**So that** I can immediately understand Baptiste's positioning (< 3s).

## Acceptance Criteria

1. **AC1**: Hero section displays full-viewport (100vh) on initial load
2. **AC2**: Headline displays "Product Designer" with monumental typography (72-96px desktop)
3. **AC3**: Keywords "B2B SaaS • Design Systems • 6 ans d'expérience" are visible within 3 seconds
4. **AC4**: Primary CTA button "Voir les projets" is visible and clickable
5. **AC5**: Secondary CTA "Me contacter" is available
6. **AC6**: Component uses design tokens from globals.css (colors, typography, spacing)
7. **AC7**: Layout is responsive (scales appropriately on tablet/mobile)

## Tasks / Subtasks

- [x] **Task 1: Create Hero Component Structure** (AC: 1, 6)
  - [x] Create `src/components/features/hero/HeroLanding.tsx`
  - [x] Create `src/components/features/hero/index.ts` barrel export
  - [x] Set up 100vh container with CSS Grid/Flexbox
  - [x] Use design tokens for all styling (no hardcoded values)

- [x] **Task 2: Implement Typography Hierarchy** (AC: 2, 3)
  - [x] Add headline with monumental typography (clamp 48-96px)
  - [x] Add tagline with keywords prominently displayed
  - [x] Use Satoshi font for headline, proper font-weight
  - [x] Ensure keywords visible without scrolling

- [x] **Task 3: Add CTA Buttons** (AC: 4, 5)
  - [x] Add primary CTA "Voir les projets" using shadcn Button
  - [x] Add secondary CTA "Me contacter" with variant="outline"
  - [x] Link primary CTA to projects section
  - [x] Link secondary CTA to contact section/page
  - [x] Ensure proper touch targets (44x44px minimum)

- [x] **Task 4: Make Responsive** (AC: 7)
  - [x] Mobile (< 768px): Stack vertically, smaller typography
  - [x] Tablet (768-1024px): Intermediate sizing
  - [x] Desktop (> 1024px): Full monumental layout
  - [x] Test at 375px, 768px, 1440px breakpoints

- [x] **Task 5: Add to Homepage** (AC: all)
  - [x] Import HeroLanding in `src/app/page.tsx`
  - [x] Verify full-page display
  - [x] Test in dev and build

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/hero/HeroLanding.tsx`

**Source: [architecture.md](../_bmad-output/planning-artifacts/architecture.md)**

```
src/components/
├── features/
│   └── hero/
│       ├── HeroLanding.tsx
│       └── index.ts
```

### Technical Requirements

**Typography Specifications (from UX Design Spec):**
```css
/* Hero Headline */
.hero-headline {
  font-family: var(--font-sans);     /* Satoshi */
  font-size: clamp(48px, 8vw, 96px); /* 48px mobile → 96px desktop */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Tagline Keywords */
.hero-tagline {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2vw, 24px);
  font-weight: 500;
  color: var(--muted-foreground);
}
```

**Layout Specifications:**
- Container: 100vh, centered content
- Max-width: 1200px with padding
- Spacing: Use --spacing-8 to --spacing-16 between elements
- Alignment: Center on mobile, left-aligned on desktop (optional)

**Content (French - default locale):**
```
Headline: "Product Designer"
Tagline: "B2B SaaS • Design Systems • 6 ans d'expérience"
Primary CTA: "Voir les projets"
Secondary CTA: "Me contacter"
```

### Component Skeleton

```tsx
// src/components/features/hero/HeroLanding.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroLanding() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container max-w-5xl px-4">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          Product Designer
        </h1>

        {/* Tagline with keywords */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          B2B SaaS • Design Systems • 6 ans d'expérience
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="#projects">Voir les projets</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Use shadcn/ui Button component (already installed)
3. All colors via CSS variables (var(--background), etc.)
4. No hardcoded pixel values - use Tailwind classes or CSS vars
5. Component must be accessible (semantic HTML, proper headings)

### Dependencies

- **Requires**: Story 1.1 complete (project setup, design tokens, fonts)
- **Blocked by**: None after 1.1
- **Enables**: Story 1.3 (typography animations)

### References

- [UX Design Spec](../_bmad-output/planning-artifacts/ux-design-specification.md) - Section "Desired Emotional Response" for Denis
- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - Component structure
- [PRD](../_bmad-output/planning-artifacts/prd.md) - FR-CP-01, FR-VX-01

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created HeroLanding component with min-h-screen (100vh) centered layout using Flexbox
- Implemented monumental typography with clamp(4.5rem,8vw,6rem) for responsive scaling
- Used Tailwind responsive classes (text-5xl md:text-7xl lg:text-[clamp]) for breakpoints
- Keywords displayed immediately visible (no scroll required)
- CTAs use shadcn Button with proper min-h/min-w for 44px touch targets
- All styling uses design tokens (bg-background, text-foreground, text-muted-foreground)
- Note: Using Inter as Satoshi fallback (per Story 1.1 font configuration)
- Build passes successfully

### File List

_Files created/modified:_
- `src/components/features/hero/HeroLanding.tsx` (created)
- `src/components/features/hero/index.ts` (created)
- `src/components/features/index.ts` (created - code review)
- `src/app/page.tsx` (modified)
- `src/app/globals.css` (modified - code review: added tokens)

## Senior Developer Review (AI)

**Reviewer:** Claude Opus 4.5
**Date:** 2026-01-22
**Outcome:** ✅ APPROVED (after fixes)

### Issues Found & Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| HIGH | Container max-width 1024px vs spec 1200px | Changed to `max-w-7xl` (1280px) |
| HIGH | Letter-spacing -0.025em vs spec -0.03em | Added `--tracking-hero: -0.03em` token |
| HIGH | Line-height 1.1 vs spec 1.25 | Added `--leading-title: 1.25` token |
| MEDIUM | Missing aria-label on section | Added `aria-label` for accessibility |
| MEDIUM | Hardcoded touch targets | Added `--touch-target: 2.75rem` token |
| MEDIUM | No features/ barrel export | Created `src/components/features/index.ts` |

### Issues Deferred (LOW)

- L1: No TypeScript props interface (acceptable for component without props)
- L2: Hardcoded French strings (i18n planned for Epic 3)

### Verification

- Build passes successfully
- All ACs validated against implementation
- Design tokens now match UX spec
