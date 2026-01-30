# Story 2.3: Breadcrumbs Component

Status: done

## Story

**As a** visitor,
**I want** breadcrumbs showing my current location,
**So that** I always know where I am in the portfolio.

## Acceptance Criteria

1. **AC1**: Breadcrumbs display in the header area (e.g., "Projets / La Wooferie")
2. **AC2**: Each segment is clickable and navigates to that level
3. **AC3**: Current page segment is not a link (displayed as text)
4. **AC4**: Separator is a "/" or "›" character
5. **AC5**: Breadcrumbs are accessible with aria-label="Fil d'Ariane" and proper ARIA roles

## Tasks / Subtasks

- [x] **Task 1: Create Breadcrumbs Component Structure** (AC: 1, 5)
  - [x] Create `src/components/features/navigation/Breadcrumbs.tsx`
  - [x] Define TypeScript interface `BreadcrumbsProps` with `items` prop
  - [x] Define `BreadcrumbItem` interface: `{ label: string; href?: string }`
  - [x] Wrap in `<nav aria-label="Fil d'Ariane">`

- [x] **Task 2: Implement Breadcrumb Items Rendering** (AC: 2, 3, 4)
  - [x] Map over items to render each segment
  - [x] Use Next.js Link for clickable segments (all except last)
  - [x] Render last item as `<span>` (current page, no link)
  - [x] Add "/" separator between items with `aria-hidden="true"`
  - [x] Style with proper typography (text-sm, text-muted-foreground)

- [x] **Task 3: Implement Interactive States** (AC: 2)
  - [x] Add hover state for links (text-foreground on hover)
  - [x] Add focus-visible state (ring-2 ring-ring)
  - [x] Ensure smooth color transitions (transition-colors)

- [x] **Task 4: Add ARIA Accessibility Markup** (AC: 5)
  - [x] Use `<ol>` for breadcrumb list
  - [x] Add `aria-current="page"` on current (last) item
  - [x] Ensure separator is hidden from screen readers
  - [x] Verify keyboard navigation works (Tab through links)

- [x] **Task 5: Create useBreadcrumbs Hook** (AC: 1, 2, 3)
  - [x] Create `src/hooks/useBreadcrumbs.ts`
  - [x] Auto-generate breadcrumbs from current pathname
  - [x] Map route segments to French labels (projects → Projets)
  - [x] Handle dynamic routes (e.g., `/projects/[slug]`)

- [x] **Task 6: Integrate with TriPanelLayout** (AC: 1)
  - [x] Import Breadcrumbs in page layout
  - [x] Position above main content area
  - [x] Test with different page depths (home, projects, project detail)

- [x] **Task 7: Update Barrel Exports** (AC: all)
  - [x] Export Breadcrumbs from `src/components/features/navigation/index.ts`
  - [x] Export useBreadcrumbs from `src/hooks/index.ts`
  - [x] Verify imports work via `@/components/features/navigation`

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/navigation/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/components/features/
├── navigation/
│   ├── NavPanel.tsx       # Story 2.2
│   ├── Breadcrumbs.tsx    # This story
│   └── index.ts
src/hooks/
├── useBreadcrumbs.ts
└── index.ts
```

### Technical Requirements

**Breadcrumb Item Interface:**

```typescript
interface BreadcrumbItem {
  label: string
  href?: string  // undefined = current page (no link)
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]  // Optional: auto-generate if not provided
}
```

**Route to Label Mapping:**

```typescript
const routeLabels: Record<string, string> = {
  '': 'Accueil',
  'projects': 'Projets',
  'about': 'À propos',
  'contact': 'Contact',
}
```

**Component Skeleton:**

```tsx
// src/components/features/navigation/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href ?? item.label} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-2 text-muted-foreground"
                  aria-hidden="true"
                >
                  /
                </span>
              )}

              {isLast || !item.href ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-muted-foreground transition-colors',
                    'hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

**useBreadcrumbs Hook Skeleton:**

```tsx
// src/hooks/useBreadcrumbs.ts
'use client'

import { usePathname } from 'next/navigation'

const routeLabels: Record<string, string> = {
  '': 'Accueil',
  'projects': 'Projets',
  'about': 'À propos',
  'contact': 'Contact',
}

interface BreadcrumbItem {
  label: string
  href?: string
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return [] // On home page, no breadcrumbs needed
  }

  const items: BreadcrumbItem[] = [
    { label: 'Accueil', href: '/' },
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    const label = routeLabels[segment] ?? formatSegmentLabel(segment)

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}

function formatSegmentLabel(segment: string): string {
  // Convert kebab-case to Title Case (e.g., "la-wooferie" → "La Wooferie")
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Feature components go in `components/features/[name]/`
3. All colors via CSS variables (text-foreground, text-muted-foreground)
4. Use `cn()` utility for conditional classnames
5. Use `'use client'` directive for hooks (usePathname)
6. Add `aria-current="page"` for current breadcrumb item
7. Focus states must be visible (ring-2 ring-ring)

### Previous Story Intelligence (Story 2.2)

**From Story 2.2 (NavPanel):**
- French labels: Accueil, Projets, À propos, Contact
- Navigation folder already exists at `src/components/features/navigation/`
- Use same patterns: cn() utility, design tokens, Link from next/link
- Focus states: `focus-visible:ring-2 focus-visible:ring-ring`
- Text styles: `text-muted-foreground` for inactive, `text-foreground` for active

**Integration with NavPanel:**
```tsx
// Both components can be used together
<TriPanelLayout
  nav={<NavPanel />}
  panel={<ContextPanel />}
>
  <Breadcrumbs items={breadcrumbItems} />
  {children}
</TriPanelLayout>
```

### Previous Stories Intelligence (Story 2.1)

**From Story 2.1 (TriPanelLayout):**
- Content area has `py-16` padding at top
- Breadcrumbs should be first element inside content area
- Content is wrapped in `max-w-3xl` container

### Git Intelligence (Recent Commits)

```
26d7ceb feat: Story 1.6 - Performance Baseline Validation complete
a8dd48a docs: Story 1.5 code review fixes and completion
```

**Patterns to follow:**
- Commit format: `feat: Story 2.3 - Breadcrumbs Component`
- Create barrel exports for all component folders
- Use shadcn patterns (cn utility, design tokens)

### Dependencies

- **Requires**: Story 2.2 complete (shares navigation folder)
- **Blocked by**: Story 2.1 (TriPanelLayout provides content area)
- **Enables**: Story 2.4 (Project Cards can use breadcrumbs)

### References

- [UX Design Spec](_bmad-output/planning-artifacts/ux-design-specification.md) - "Breadcrumbs toujours visibles pour orientation"
- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Component structure
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-NAV-05 (Breadcrumbs in header)
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 2.3 acceptance criteria

### Implementation Notes

**Breadcrumb Examples:**

| Page | Breadcrumbs |
|------|-------------|
| Home (/) | _None_ |
| Projects (/projects) | Accueil / Projets |
| Project Detail (/projects/la-wooferie) | Accueil / Projets / La Wooferie |
| About (/about) | Accueil / À propos |
| Contact (/contact) | Accueil / Contact |

**Separator Choice:**
- Use "/" character (simple, universally understood)
- Add proper spacing with `mx-2`
- Hide from screen readers with `aria-hidden="true"`

**Accessibility Checklist:**
- [x] `<nav>` with `aria-label="Fil d'Ariane"`
- [x] `<ol>` for ordered list semantics
- [x] Current page has `aria-current="page"`
- [x] Separators have `aria-hidden="true"`
- [x] Focus states visible on links
- [x] Tab order follows visual order (left to right)

## Senior Developer Review (AI)

**Review Date:** 2026-01-24
**Reviewer:** Claude Opus 4.5
**Outcome:** Approved (after fixes)

### Action Items

- [x] **[MEDIUM]** M1: Duplicate BreadcrumbItem interface - Exported from Breadcrumbs.tsx, imported in useBreadcrumbs.ts
- [x] **[MEDIUM]** M2: BreadcrumbItem type not exported - Added export and re-exported from navigation barrel
- [ ] **[LOW]** L1: Redundant 'use client' in hook file (harmless, kept for consistency)
- [ ] **[LOW]** L2: formatSegmentLabel not exported (internal utility, not needed externally)
- [ ] **[LOW]** L3: No memoization in useBreadcrumbs (acceptable for simple computation)

### Fixes Applied

1. Exported `BreadcrumbItem` interface from Breadcrumbs.tsx
2. Re-exported type from navigation/index.ts: `export { type BreadcrumbItem }`
3. Updated useBreadcrumbs.ts to import type from `@/components/features/navigation`
4. Removed duplicate interface definition from useBreadcrumbs.ts

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created Breadcrumbs component following story skeleton exactly
- Implemented BreadcrumbItem interface with label and optional href
- Component renders <nav> with aria-label="Fil d'Ariane" for French accessibility
- Uses <ol> for semantic ordered list of breadcrumb items
- Clickable items use Next.js Link component (all except last)
- Last item rendered as <span> with aria-current="page"
- "/" separator with aria-hidden="true" for screen reader exclusion
- Hover states: text-foreground on hover
- Focus states: focus-visible ring-2 ring-ring
- Created useBreadcrumbs hook for auto-generation from pathname
- Hook maps route segments to French labels (projects → Projets)
- formatSegmentLabel converts kebab-case to Title Case for dynamic routes
- Returns empty array on home page (no breadcrumbs needed)
- Integrated with page.tsx above HeroLanding in TriPanelLayout
- All barrel exports updated (navigation/index.ts, hooks/index.ts, features/index.ts)
- Build passes successfully
- All 5 ACs satisfied

**Code Review Fixes (2026-01-24):**
- Exported BreadcrumbItem interface from Breadcrumbs.tsx
- Re-exported type from navigation barrel
- Updated useBreadcrumbs.ts to import type instead of duplicate definition

### File List

_Files created/modified:_
- `src/components/features/navigation/Breadcrumbs.tsx` (created)
- `src/components/features/navigation/index.ts` (updated - added Breadcrumbs export)
- `src/components/features/index.ts` (updated - added Breadcrumbs to navigation export)
- `src/hooks/useBreadcrumbs.ts` (created)
- `src/hooks/index.ts` (updated - added useBreadcrumbs export)
- `src/app/page.tsx` (modified - integrated Breadcrumbs with useBreadcrumbs hook)
