# Story 2.2: Navigation Panel (Left Column)

Status: done

## Story

**As a** visitor,
**I want** a persistent navigation panel on the left,
**So that** I can quickly jump to any section of the portfolio.

## Acceptance Criteria

1. **AC1**: Portfolio logo/name is displayed at the top of the navigation panel
2. **AC2**: Navigation links include: Home, Projects, About, Contact
3. **AC3**: Active page is visually highlighted (different text color, background, or indicator)
4. **AC4**: Links use Next.js Link component for client-side navigation
5. **AC5**: On case study pages, section anchors are listed below main nav (Context, Research, Process, Solution, Results)
6. **AC6**: Navigation is keyboard accessible (Tab navigation works through all links)
7. **AC7**: Component uses design tokens from globals.css for all styling

## Tasks / Subtasks

- [x] **Task 1: Create NavPanel Component Structure** (AC: 1, 7)
  - [x] Create `src/components/features/navigation/NavPanel.tsx`
  - [x] Create `src/components/features/navigation/index.ts` barrel export
  - [x] Define TypeScript interface `NavPanelProps` with optional `sectionAnchors` prop
  - [x] Display logo/name at top with proper typography (font-bold, text-lg)

- [x] **Task 2: Implement Main Navigation Links** (AC: 2, 4)
  - [x] Create navItems array with label, href pairs
  - [x] Map over navItems to render Next.js Link components
  - [x] Add hover states (text-foreground on hover, transition)
  - [x] Style as vertical list with proper spacing (space-y-2)

- [x] **Task 3: Implement Active Page Highlighting** (AC: 3)
  - [x] Use `usePathname()` from next/navigation to detect current route
  - [x] Apply active styles: `text-foreground font-medium` vs `text-muted-foreground`
  - [x] Add optional visual indicator (left border, background highlight)

- [x] **Task 4: Add Section Anchors for Case Studies** (AC: 5)
  - [x] Accept `sectionAnchors?: { label: string; id: string }[]` prop
  - [x] Render section anchors below main nav when provided
  - [x] Style as indented or smaller text to differentiate from main nav
  - [x] Use smooth scroll anchor links (`#context`, `#research`, etc.)

- [x] **Task 5: Ensure Keyboard Accessibility** (AC: 6)
  - [x] All links are focusable (native Link behavior)
  - [x] Focus states are visible (ring-2 ring-ring or outline)
  - [x] Tab order follows visual order (top to bottom)
  - [x] Add `aria-current="page"` to active link

- [x] **Task 6: Integrate with TriPanelLayout** (AC: all)
  - [x] Import NavPanel in page.tsx
  - [x] Pass NavPanel to TriPanelLayout's `nav` prop
  - [x] Verify rendering in fixed left panel
  - [x] Test at desktop breakpoints (1024px, 1440px)

- [x] **Task 7: Update Barrel Exports** (AC: all)
  - [x] Update `src/components/features/index.ts` to export navigation
  - [x] Verify import works via `@/components/features/navigation`

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/navigation/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/components/features/
├── navigation/
│   ├── NavPanel.tsx
│   └── index.ts
```

### Technical Requirements

**Navigation Links:**

```typescript
const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projects' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
```

**Component Interface:**

```tsx
interface NavPanelProps {
  sectionAnchors?: { label: string; id: string }[]
}
```

**Component Skeleton:**

```tsx
// src/components/features/navigation/NavPanel.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavPanelProps {
  sectionAnchors?: { label: string; id: string }[]
}

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projects' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function NavPanel({ sectionAnchors }: NavPanelProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col p-6">
      {/* Logo/Name */}
      <Link href="/" className="mb-8 text-lg font-bold text-foreground">
        Baptiste Morillon
      </Link>

      {/* Main Navigation */}
      <nav aria-label="Navigation principale">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-colors',
                    'hover:bg-muted hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive
                      ? 'bg-muted text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Section Anchors (for case study pages) */}
      {sectionAnchors && sectionAnchors.length > 0 && (
        <nav aria-label="Sections" className="mt-8 border-t border-border pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sur cette page
          </p>
          <ul className="space-y-1">
            {sectionAnchors.map((anchor) => (
              <li key={anchor.id}>
                <a
                  href={`#${anchor.id}`}
                  className={cn(
                    'block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors',
                    'hover:bg-muted hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Feature components go in `components/features/[name]/`
3. All colors via CSS variables (text-foreground, text-muted-foreground, bg-muted)
4. Use `cn()` utility for conditional classnames
5. Use `'use client'` directive for hooks (usePathname)
6. Add `aria-current="page"` for active navigation links
7. Focus states must be visible (ring-2 ring-ring)

### Previous Story Intelligence (Story 2.1)

**From Story 2.1 (TriPanelLayout):**
- Nav panel slot accepts `ReactNode` - pass `<NavPanel />` component
- Nav container has `role="navigation"` already
- Fixed panel width: 20% with max-width 288px
- Internal padding should be p-6 (24px)

**Integration example:**
```tsx
<TriPanelLayout
  nav={<NavPanel />}
  panel={<ContextPanel />}
>
  {children}
</TriPanelLayout>
```

### Previous Stories Intelligence (Epic 1)

**From Story 1.2-1.5:**
- Barrel export pattern: create index.ts with named export
- Use cn() from @/lib/utils for classname merging
- French labels for UI (Accueil, Projets, À propos, Contact)
- Touch targets: min 44px (handled via py-2 padding on links)

### Git Intelligence (Recent Commits)

```
26d7ceb feat: Story 1.6 - Performance Baseline Validation complete
a8dd48a docs: Story 1.5 code review fixes and completion
```

**Patterns to follow:**
- Commit format: `feat: Story 2.2 - Navigation Panel Component`
- Create barrel exports for all component folders
- Use shadcn patterns (cn utility, design tokens)

### Dependencies

- **Requires**: Story 2.1 complete (TriPanelLayout provides nav slot)
- **Blocked by**: Story 2.1
- **Enables**: Story 2.3 (Breadcrumbs), Story 2.4 (Project Cards)

### References

- [UX Design Spec](_bmad-output/planning-artifacts/ux-design-specification.md) - Navigation patterns
- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Component structure
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-NAV-05 (Breadcrumbs in same nav area)
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 2.2 acceptance criteria

### Implementation Notes

**Active State Detection:**
- Use exact match for root: `pathname === '/'`
- Use startsWith for nested routes: `pathname.startsWith('/projects')`
- Consider: Projects page vs specific project page highlighting

**Section Anchors Usage:**
```tsx
// In case study page
const caseStudySections = [
  { label: 'Contexte', id: 'context' },
  { label: 'Recherche', id: 'research' },
  { label: 'Processus', id: 'process' },
  { label: 'Solution', id: 'solution' },
  { label: 'Résultats', id: 'results' },
]

<NavPanel sectionAnchors={caseStudySections} />
```

**Accessibility Checklist:**
- [x] All links are in a `<nav>` with `aria-label`
- [x] Active link has `aria-current="page"`
- [x] Focus states visible (ring-2 ring-ring)
- [x] Tab order follows visual order
- [x] No skip in heading hierarchy (no headings in nav, use semantic list)

## Senior Developer Review (AI)

**Review Date:** 2026-01-24
**Reviewer:** Claude Opus 4.5
**Outcome:** Approved (after fixes)

### Action Items

- [N/A] **[HIGH]** H1: Missing smooth scroll - INVALID (already in globals.css line 258)
- [x] **[MEDIUM]** M1: Touch target size - Section anchors py-1.5 changed to py-2 for 44px min
- [x] **[MEDIUM]** M2: Missing aria-label on logo link - Added `aria-label="Retour à l'accueil"`
- [x] **[MEDIUM]** M3: No overflow handling - Added `overflow-y-auto` to container
- [ ] **[LOW]** L1: Section header "Sur cette page" uses `<p>` instead of heading
- [ ] **[LOW]** L2: Redundant navigation role wrapping (aside + nav)
- [ ] **[LOW]** L3: SplashScreen import inconsistency (previous story)

### Fixes Applied

1. Added `aria-label="Retour à l'accueil"` to logo link for screen reader clarity
2. Changed section anchors padding from `py-1.5` to `py-2` for WCAG 2.5.5 touch targets
3. Added `overflow-y-auto` to container for handling long section lists

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created NavPanel component following story skeleton exactly
- Implemented logo/name link at top with proper typography
- Navigation links: Accueil, Projets, À propos, Contact (French labels)
- Active state detection using usePathname() with startsWith for nested routes
- Active link styled with bg-muted, text-foreground, font-medium
- Section anchors support for case study pages with "Sur cette page" header
- Full keyboard accessibility: focus-visible states, aria-current="page", semantic HTML
- All links use Next.js Link component for client-side navigation
- Integrated with TriPanelLayout in page.tsx
- Build passes successfully
- All 7 ACs satisfied

**Code Review Fixes (2026-01-24):**
- Added aria-label to logo link for accessibility
- Increased section anchor padding for touch targets (44px min)
- Added overflow-y-auto for scroll on long lists

### File List

_Files created/modified:_
- `src/components/features/navigation/NavPanel.tsx` (created)
- `src/components/features/navigation/index.ts` (created)
- `src/components/features/index.ts` (updated - added NavPanel export)
- `src/app/page.tsx` (modified - integrated NavPanel with TriPanelLayout)
