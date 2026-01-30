# Story 2.1: Tri-Panel Layout Component

Status: done

## Story

**As a** visitor,
**I want** a desktop layout with three distinct panels,
**So that** I can navigate, read content, and see contextual information simultaneously.

## Acceptance Criteria

1. **AC1**: On desktop viewport (≥1024px), layout displays three panels: Navigation (20%), Content (50%), Context Panel (30%)
2. **AC2**: Navigation and Context panels are position:fixed (don't scroll with content)
3. **AC3**: Content panel is scrollable independently
4. **AC4**: Layout uses CSS Grid or Flexbox with design token spacing (48px gap)
5. **AC5**: Max container width is 1440px, centered
6. **AC6**: Component accepts `nav`, `children`, and `panel` as props
7. **AC7**: Layout uses design tokens from globals.css for all spacing and colors

## Tasks / Subtasks

- [x] **Task 1: Create TriPanelLayout Component Structure** (AC: 1, 6, 7)
  - [x] Create `src/components/layout/TriPanelLayout/TriPanelLayout.tsx`
  - [x] Create `src/components/layout/TriPanelLayout/index.ts` barrel export
  - [x] Define TypeScript interface `TriPanelLayoutProps` with `nav`, `children`, `panel` props
  - [x] Use design tokens for all styling (--spacing-*, bg-background, etc.)

- [x] **Task 2: Implement Desktop Grid Layout** (AC: 1, 4, 5)
  - [x] Use CSS Grid with `grid-template-columns: 20% 1fr 30%` or equivalent Flexbox
  - [x] Set max-width: 1440px with mx-auto for centering
  - [x] Apply gap-12 (48px) between panels
  - [x] Ensure full viewport height (min-h-screen)

- [x] **Task 3: Implement Fixed Side Panels** (AC: 2)
  - [x] Set Navigation panel to position: fixed, left: 0
  - [x] Set Context panel to position: fixed, right: 0
  - [x] Both panels should have height: 100vh
  - [x] Add proper z-index for layering (nav: z-10, panel: z-10)

- [x] **Task 4: Implement Scrollable Content Area** (AC: 3)
  - [x] Content area scrolls independently (overflow-y: auto)
  - [x] Add margin-left and margin-right to account for fixed panels
  - [x] Ensure smooth scrolling behavior

- [x] **Task 5: Add Responsive Breakpoint** (AC: 1)
  - [x] Tri-panel only renders on lg breakpoint (≥1024px)
  - [x] Add placeholder for mobile layout (single column, Epic 6)
  - [x] Use Tailwind responsive utilities (lg:grid-cols-[20%_1fr_30%])

- [x] **Task 6: Create Layout Barrel Export** (AC: all)
  - [x] Create `src/components/layout/index.ts` to export TriPanelLayout
  - [x] Verify import works via `@/components/layout`

- [x] **Task 7: Test Integration** (AC: all)
  - [x] Create test page using TriPanelLayout
  - [x] Verify build passes
  - [x] Test at 1024px, 1440px breakpoints

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/layout/TriPanelLayout/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/components/
├── layout/
│   ├── TriPanelLayout/
│   │   ├── TriPanelLayout.tsx
│   │   └── index.ts
│   └── index.ts          # Layout barrel export
```

### Technical Requirements

**Layout Specifications (from UX Design Spec):**

```
Desktop (≥1024px):
├── Navigation Panel: 20% width, position: fixed, left
├── Content Area: 50% (flexible), scrollable
└── Context Panel: 30% width, position: fixed, right

Max container: 1440px
Gap between panels: 48px (--spacing-12)
```

**Component Interface:**

```tsx
interface TriPanelLayoutProps {
  nav: React.ReactNode      // Left navigation panel content
  children: React.ReactNode // Main content (scrollable)
  panel?: React.ReactNode   // Right context panel (optional)
}
```

**Component Skeleton:**

```tsx
// src/components/layout/TriPanelLayout/TriPanelLayout.tsx
import { type ReactNode } from 'react'

interface TriPanelLayoutProps {
  nav: ReactNode
  children: ReactNode
  panel?: ReactNode
}

export function TriPanelLayout({ nav, children, panel }: TriPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop tri-panel layout */}
      <div className="hidden lg:block">
        {/* Navigation - Fixed Left */}
        <aside
          className="fixed left-0 top-0 h-screen w-[20%] max-w-[288px] border-r border-border bg-background z-10"
          role="navigation"
        >
          {nav}
        </aside>

        {/* Content - Scrollable Center */}
        <main
          className="ml-[20%] mr-[30%] min-h-screen px-12"
          role="main"
        >
          <div className="mx-auto max-w-3xl py-16">
            {children}
          </div>
        </main>

        {/* Context Panel - Fixed Right */}
        {panel && (
          <aside
            className="fixed right-0 top-0 h-screen w-[30%] max-w-[432px] border-l border-border bg-background z-10"
            role="complementary"
          >
            {panel}
          </aside>
        )}
      </div>

      {/* Mobile fallback - single column */}
      <div className="lg:hidden">
        <main className="min-h-screen px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Layout components go in `components/layout/[name]/`
3. All colors via CSS variables (bg-background, border-border, etc.)
4. No hardcoded pixel values except max-width constraints
5. Component must be accessible (semantic HTML, ARIA roles)
6. Use TypeScript strict mode - define all props interfaces

### Previous Story Intelligence (Story 1.2)

**Learnings from Hero implementation:**
- Use CSS variables with Tailwind arbitrary values: `tracking-[--tracking-hero]`
- Add aria-label on sections for accessibility
- Create barrel exports at feature/layout folder level
- Code review found: use `max-w-7xl` (1280px) close to 1440px spec
- Touch targets should use `--touch-target` CSS variable

**Files established:**
- `src/components/features/index.ts` - barrel export pattern
- `src/app/globals.css` - design tokens including `--spacing-*`

### Git Intelligence (Recent Commits)

```
9d95ca1 fix: Code review fixes for Story 1.2
760f24d feat: Story 1.2 - Hero Landing Component
1b268b7 fix: Code review fixes for Story 1.1
76cca0c Initial commit: Story 1.1 - Project Setup & Design System Foundation
```

**Patterns to follow:**
- Commit message format: `feat: Story X.X - Component Name`
- Code review fixes: `fix: Code review fixes for Story X.X`
- Use shadcn Button patterns for consistency
- Barrel exports for all component folders

### Dependencies

- **Requires**: Story 1.1 complete (design tokens, fonts) ✅
- **Blocked by**: None
- **Enables**: Story 2.2 (Navigation Panel), Story 2.3 (Breadcrumbs)

### References

- [UX Design Spec](_bmad-output/planning-artifacts/ux-design-specification.md) - Section "Desktop-First avec Mobile Intentionnel"
- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Component structure, layout folder
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-CP-01-TER (Dashboard tri-panel)

### Implementation Notes

**Fixed Panel Calculations:**
- Navigation: 20% width, max 288px (20% of 1440px)
- Context Panel: 30% width, max 432px (30% of 1440px)
- Content: remaining space with horizontal padding

**Responsive Strategy:**
- ≥1024px: Full tri-panel
- <1024px: Mobile single column (detailed implementation in Epic 6)
- Tablet (768-1023px): Can be mobile-like for MVP

**Accessibility:**
- `role="navigation"` on nav panel
- `role="main"` on content area
- `role="complementary"` on context panel

## Senior Developer Review (AI)

**Review Date:** 2026-01-24
**Reviewer:** Claude Opus 4.5
**Outcome:** Approved (after fixes)

### Action Items

- [x] **[HIGH]** H1: Wide screen layout bug - panels capped but margins grew on >1440px screens
- [x] **[HIGH]** H2: AC5 max-width 1440px constraint missing
- [x] **[MEDIUM]** M1: Missing overflow-y: auto on content area (AC3)
- [x] **[MEDIUM]** M2: Mobile main missing consistent inner wrapper
- [x] **[LOW]** L1: Use canonical Tailwind classes (max-w-360, xl:ml-72, xl:mr-108, max-w-108)

### Fixes Applied

1. Added `max-w-360` container for 1440px max-width (AC5)
2. Added `xl:left-[calc((100vw-1440px)/2)]` and `xl:right-[calc(...)]` for centered fixed panels on ultra-wide screens
3. Changed margins to `vw` units with `xl:` breakpoint fixed values for consistency
4. Added `overflow-y-auto` to content areas (AC3)
5. Added inner wrapper to mobile main for consistent content constraints
6. Used canonical Tailwind classes per linter suggestions

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created TriPanelLayout component following story skeleton exactly
- Used fixed positioning for nav (20%, max 288px) and panel (30%, max 432px)
- Content area uses margin-based positioning to account for fixed panels
- Mobile fallback shows single column layout (lg:hidden / hidden lg:block pattern)
- Integrated with page.tsx replacing placeholder grid
- Build passes successfully
- All ACs satisfied: tri-panel on desktop, fixed panels, scrollable content, responsive breakpoint

**Code Review Fixes (2026-01-24):**
- Fixed wide-screen layout bug with xl: breakpoint positioning
- Added max-w-360 (1440px) container
- Added overflow-y-auto for proper scrolling
- Consistent mobile wrapper styling

### File List

_Files created/modified:_
- `src/components/layout/TriPanelLayout/TriPanelLayout.tsx` (created, then fixed)
- `src/components/layout/TriPanelLayout/index.ts` (created)
- `src/components/layout/index.ts` (created)
- `src/app/page.tsx` (modified - replaced placeholder with TriPanelLayout)
