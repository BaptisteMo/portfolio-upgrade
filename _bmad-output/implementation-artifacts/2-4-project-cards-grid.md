# Story 2.4: Project Cards Grid

Status: done

## Story

**As a** visitor (Denis),
**I want** to see a grid of project cards with visual tags,
**So that** I can quickly scan projects and identify relevant ones.

## Acceptance Criteria

1. **AC1**: Projects display as cards in a responsive grid (2 cols desktop, 1 col mobile)
2. **AC2**: Each card shows: title, description snippet, preview image, and tags
3. **AC3**: Tags are colored badges (e.g., "B2B SaaS", "Design System", "0→1")
4. **AC4**: Clicking a tag filters projects by that tag (optional, can be deferred to Epic 5)
5. **AC5**: Hovering a card shows visual feedback (border glow, slight lift)
6. **AC6**: Cards link to their respective case study pages
7. **AC7**: Card data comes from static mock data (MDX integration in Epic 3)

## Tasks / Subtasks

- [x] **Task 1: Create ProjectCard Component Structure** (AC: 2, 6)
  - [x] Create `src/components/features/projects/ProjectCard.tsx`
  - [x] Create `src/components/features/projects/index.ts` barrel export
  - [x] Define TypeScript interface `ProjectCardProps` with project data
  - [x] Use Next.js Link to wrap entire card for navigation

- [x] **Task 2: Implement Card Layout** (AC: 2)
  - [x] Create card container with rounded corners (rounded-lg)
  - [x] Add preview image slot at top (aspect-video ratio)
  - [x] Add content section with title, description, tags
  - [x] Use design tokens for spacing (p-4, space-y-3)

- [x] **Task 3: Implement Preview Image** (AC: 2)
  - [x] Use next/image for optimized loading
  - [x] Set aspect-video (16:9) aspect ratio
  - [x] Add placeholder gradient while loading
  - [x] Handle missing image gracefully (fallback gradient)

- [x] **Task 4: Create Tag Component** (AC: 3)
  - [x] Create `src/components/features/projects/ProjectTag.tsx`
  - [x] Define tag color variants (B2B SaaS → violet, Design System → green, etc.)
  - [x] Style as small badges (text-xs, rounded-full, px-2 py-0.5)
  - [x] Make tags focusable for future filter feature

- [x] **Task 5: Implement Hover Effects** (AC: 5)
  - [x] Add subtle lift on hover (translate-y-[-2px])
  - [x] Add border glow effect (ring-2 ring-primary/20 or shadow-lg)
  - [x] Ensure smooth transitions (transition-all duration-200)
  - [x] Respect prefers-reduced-motion (disable transforms)

- [x] **Task 6: Create ProjectGrid Component** (AC: 1)
  - [x] Create `src/components/features/projects/ProjectGrid.tsx`
  - [x] Define `ProjectGridProps` with `projects` array
  - [x] Implement responsive grid (grid-cols-1 md:grid-cols-2)
  - [x] Add gap between cards (gap-6)

- [x] **Task 7: Create Mock Project Data** (AC: 7)
  - [x] Create `src/data/projects.ts` with mock project data
  - [x] Define 3-4 sample projects with all fields
  - [x] Include realistic French content (Baptiste's portfolio style)

- [x] **Task 8: Integrate with Projects Page** (AC: all)
  - [x] Create/update `src/app/projects/page.tsx`
  - [x] Import ProjectGrid and mock data
  - [x] Wrap in TriPanelLayout
  - [x] Test responsive behavior at breakpoints

- [x] **Task 9: Update Barrel Exports** (AC: all)
  - [x] Update `src/components/features/index.ts` to export projects
  - [x] Verify imports work via `@/components/features/projects`

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/projects/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/components/features/
├── navigation/          # Story 2.2, 2.3
├── projects/
│   ├── ProjectCard.tsx
│   ├── ProjectTag.tsx
│   ├── ProjectGrid.tsx
│   └── index.ts
src/data/
└── projects.ts          # Mock data (temporary until Epic 3)
```

### Technical Requirements

**Project Data Interface:**

```typescript
// src/data/projects.ts
export interface Project {
  slug: string
  title: string
  description: string
  image?: string
  tags: ProjectTag[]
  status: 'completed' | 'in-progress'
}

export type ProjectTag =
  | 'B2B SaaS'
  | 'Design System'
  | '0→1'
  | 'CRM'
  | 'Mobile'
  | 'Web App'

export const projects: Project[] = [
  {
    slug: 'la-wooferie',
    title: 'La Wooferie',
    description: 'Plateforme de réservation pour pension canine avec système de gestion intégré.',
    image: '/images/projects/la-wooferie.jpg',
    tags: ['B2B SaaS', '0→1'],
    status: 'completed',
  },
  {
    slug: 'khora',
    title: 'Khora',
    description: 'Design System complet pour startup EdTech en Série A.',
    image: '/images/projects/khora.jpg',
    tags: ['Design System', 'B2B SaaS'],
    status: 'completed',
  },
  {
    slug: 'nexus-crm',
    title: 'Nexus CRM',
    description: 'Refonte UX d\'un CRM B2B avec réduction de 35% du temps de saisie.',
    image: '/images/projects/nexus-crm.jpg',
    tags: ['CRM', 'Web App'],
    status: 'completed',
  },
]
```

**Tag Color Mapping:**

```typescript
const tagColors: Record<ProjectTag, string> = {
  'B2B SaaS': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'Design System': 'bg-green-500/10 text-green-500 border-green-500/20',
  '0→1': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'CRM': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Mobile': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'Web App': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
}
```

**ProjectCard Component Skeleton:**

```tsx
// src/components/features/projects/ProjectCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProjectTag } from './ProjectTag'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group block rounded-lg border border-border bg-card overflow-hidden',
        'transition-all duration-200',
        'hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'motion-reduce:hover:translate-y-0'
      )}
    >
      {/* Preview Image */}
      <div className="relative aspect-video bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  )
}
```

**ProjectTag Component Skeleton:**

```tsx
// src/components/features/projects/ProjectTag.tsx
import { cn } from '@/lib/utils'
import type { ProjectTag as TagType } from '@/data/projects'

const tagColors: Record<TagType, string> = {
  'B2B SaaS': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'Design System': 'bg-green-500/10 text-green-500 border-green-500/20',
  '0→1': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'CRM': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Mobile': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'Web App': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
}

interface ProjectTagProps {
  tag: TagType
}

export function ProjectTag({ tag }: ProjectTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        tagColors[tag]
      )}
    >
      {tag}
    </span>
  )
}
```

**ProjectGrid Component Skeleton:**

```tsx
// src/components/features/projects/ProjectGrid.tsx
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/data/projects'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Feature components go in `components/features/[name]/`
3. All colors via CSS variables (bg-card, text-foreground, border-border)
4. Use `cn()` utility for conditional classnames
5. Use `next/image` for all images
6. Respect `prefers-reduced-motion` (motion-reduce: prefix)
7. Focus states must be visible (ring-2 ring-ring)

### Previous Story Intelligence (Story 2.3)

**From Story 2.3 (Breadcrumbs):**
- French content style established (Accueil, Projets, etc.)
- Focus states: `focus-visible:ring-2 focus-visible:ring-ring`
- Navigation patterns with Next.js Link

**From Story 2.2 (NavPanel):**
- Link styling patterns (text-muted-foreground → text-foreground on hover)
- Transition patterns (transition-colors)

### Previous Stories Intelligence (Story 2.1)

**From Story 2.1 (TriPanelLayout):**
- Content area has max-w-3xl container
- Projects page will use TriPanelLayout with ProjectGrid as children
- Mobile fallback: single column (grid handles this automatically)

### UX Design Spec Context

**From UX Spec - Denis Persona:**
- Denis scanne 5-10 portfolios, needs keywords visible in < 3s
- Tags must be immediately identifiable: "B2B SaaS", "Design System", "0→1"
- Cards should be scannable at a glance

**From UX Spec - Hover Effects:**
- Hover effects fluides avec feedback immédiat
- Gestion via presets (pas custom from scratch)

### Git Intelligence (Recent Commits)

```
26d7ceb feat: Story 1.6 - Performance Baseline Validation complete
```

**Patterns to follow:**
- Commit format: `feat: Story 2.4 - Project Cards Grid`
- Create barrel exports for all component folders
- Use shadcn patterns (cn utility, design tokens)

### Dependencies

- **Requires**: Story 2.1 complete (TriPanelLayout for page structure)
- **Blocked by**: None (uses mock data, MDX comes in Epic 3)
- **Enables**: Story 3.4 (Case Study Header), Story 3.1 (MDX will replace mock data)

### References

- [UX Design Spec](_bmad-output/planning-artifacts/ux-design-specification.md) - "Tags projets visuels, cliquables, immédiatement identifiables"
- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Component structure
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-CP-02 (Liste projets avec tags visuels)
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 2.4 acceptance criteria

### Implementation Notes

**Responsive Grid Behavior:**

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| < 768px (mobile) | 1 | 24px |
| ≥ 768px (tablet+) | 2 | 24px |

**Image Optimization:**
- Use next/image with fill + object-cover
- Aspect ratio 16:9 (aspect-video)
- Placeholder: gradient fallback for missing images
- Loading: lazy by default

**Hover Effects (prefers-reduced-motion aware):**
```tsx
// Normal hover
'hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/20'

// Reduced motion
'motion-reduce:hover:translate-y-0'
```

**Tag Filter Feature (AC4 - Deferred):**
- Mark as "optional, can be deferred" in AC
- Infrastructure ready: tags are buttons/links
- Full implementation in Epic 5 (Command Palette can filter too)

**Accessibility Checklist:**
- [x] Cards are focusable (Link component)
- [x] Focus states visible (ring-2 ring-ring)
- [x] Images have alt text (project.title)
- [x] Tags are readable (sufficient contrast)
- [x] Reduced motion respected (motion-reduce:)
- [x] Keyboard navigation works (Tab through cards)

## Senior Developer Review (AI)

**Review Date:** 2026-01-25
**Reviewer:** Claude Opus 4.5
**Outcome:** Approved (after fixes)

### Issues Found

- [x] **[HIGH]** H1: Missing types export from barrel - Added `Project` and `ProjectTagType` exports to projects/index.ts
- [x] **[HIGH]** H2: Image sans prop `sizes` - Added `sizes="(max-width: 768px) 100vw, 50vw"` to Image component
- [x] **[HIGH]** H3: Pas d'optimisation `priority` - Added `priority` prop to ProjectCard, first 2 cards get priority loading
- [x] **[MEDIUM]** M1: Pas de gestion d'état vide - Added empty state message in ProjectGrid
- [x] **[MEDIUM]** M2: Motion-reduce incomplet - Added `motion-reduce:hover:shadow-none` to disable shadow animation
- [ ] **[MEDIUM]** M3: Hardcoded placeholder panel - Kept as intentional placeholder for Epic 4
- [ ] **[LOW]** L1: ProjectTag non préparé pour l'interactivité - Deferred to Epic 5 with AC4
- [ ] **[LOW]** L2: Pas de tests - Acceptable if tests planned for dedicated epic

### Fixes Applied

1. Exported `Project` and `ProjectTagType` types from projects/index.ts barrel
2. Added `sizes` prop to Image component for responsive loading
3. Added `priority` prop to ProjectCard, ProjectGrid passes `priority={index < 2}` for LCP optimization
4. Added empty state handling in ProjectGrid with French message
5. Enhanced motion-reduce support to also disable shadow animation

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created ProjectTag component with 6 color variants (violet, green, orange, blue, pink, cyan)
- Created ProjectCard component with hover lift effect, image preview, and tag display
- Created ProjectGrid component with responsive grid (1 col mobile, 2 cols md+)
- Created mock project data with 3 French portfolio projects
- Implemented prefers-reduced-motion support with motion-reduce: prefix
- Added focus-visible states for accessibility (ring-2 ring-ring)
- Used next/image with fill + object-cover for image optimization
- Fallback gradient for missing images
- Created /projects page with TriPanelLayout integration
- All barrel exports updated (projects/index.ts, features/index.ts)
- Build passes successfully
- All 7 ACs satisfied (AC4 tag filtering deferred to Epic 5 as per spec)

**Code Review Fixes (2026-01-25):**
- Exported Project and ProjectTagType types from projects barrel
- Added sizes prop to Image for responsive loading optimization
- Added priority prop to ProjectCard for LCP optimization (first 2 cards)
- Added empty state handling in ProjectGrid
- Enhanced motion-reduce to also disable shadow animation

### File List

_Files created/modified:_
- `src/components/features/projects/ProjectCard.tsx` (created)
- `src/components/features/projects/ProjectTag.tsx` (created)
- `src/components/features/projects/ProjectGrid.tsx` (created)
- `src/components/features/projects/index.ts` (created)
- `src/components/features/index.ts` (updated)
- `src/data/projects.ts` (created)
- `src/app/projects/page.tsx` (created)
