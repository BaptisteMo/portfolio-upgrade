# Story 3.4: Case Study Header Component

Status: done

## Story

**As a** visitor,
**I want** a clear header showing project metadata,
**So that** I immediately understand the project scope.

## Acceptance Criteria

1. **AC1**: Header displays project title prominently
2. **AC2**: Status badge shows (Shipped/In Progress/Concept)
3. **AC3**: Tags are displayed as colored badges
4. **AC4**: Timeline is displayed (e.g., "4 months • 2024")
5. **AC5**: Client/company name is shown if applicable
6. **AC6**: All data comes from MDX frontmatter
7. **AC7**: Header adapts to current locale (translated labels)

## Tasks / Subtasks

- [x] **Task 1: Create CaseStudyHeader Component** (AC: 1, 6)
  - [x] Create `src/components/features/case-study/CaseStudyHeader.tsx`
  - [x] Create `src/components/features/case-study/index.ts` barrel export
  - [x] Define `CaseStudyHeaderProps` with ProjectMeta type
  - [x] Layout: title, metadata row, tags row

- [x] **Task 2: Implement Status Badge** (AC: 2)
  - [x] Create status badge with color variants
  - [x] Shipped → green, In Progress → yellow, Concept → gray
  - [x] Use design tokens for colors
  - [x] Translate status labels based on locale

- [x] **Task 3: Integrate ProjectTag Component** (AC: 3)
  - [x] Reuse `ProjectTag` from Story 2.4
  - [x] Display all project tags in a row
  - [x] Consistent styling with project cards

- [x] **Task 4: Display Timeline & Client** (AC: 4, 5)
  - [x] Format timeline from frontmatter
  - [x] Display client name if present
  - [x] Use muted-foreground for secondary info
  - [x] Separator between metadata items (•)

- [x] **Task 5: Add Locale Support** (AC: 7)
  - [x] Create translations for status labels
  - [x] "Shipped" → "Livré" / "Shipped"
  - [x] "In Progress" → "En cours" / "In Progress"
  - [x] Use `useLanguage()` hook for current locale

- [x] **Task 6: Update Feature Exports** (AC: all)
  - [x] Update `src/components/features/index.ts`
  - [x] Export CaseStudyHeader

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/case-study/`

```
src/components/features/
├── case-study/
│   ├── CaseStudyHeader.tsx
│   └── index.ts
├── projects/           # Story 2.4
├── navigation/         # Story 2.2, 2.3
└── index.ts
```

### Technical Requirements

**CaseStudyHeader Component:**

```tsx
// src/components/features/case-study/CaseStudyHeader.tsx
'use client'

import { ProjectTag } from '@/components/features/projects'
import { useLanguage } from '@/contexts'
import { cn } from '@/lib/utils'
import type { ProjectMeta } from '@/content/meta'

interface CaseStudyHeaderProps {
  project: ProjectMeta
}

const statusColors = {
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  'in-progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  concept: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
}

const statusLabels = {
  fr: {
    completed: 'Livré',
    'in-progress': 'En cours',
    concept: 'Concept',
  },
  en: {
    completed: 'Shipped',
    'in-progress': 'In Progress',
    concept: 'Concept',
  },
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  const { locale } = useLanguage()

  return (
    <header className="mb-8 space-y-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-foreground">
        {project.title}
      </h1>

      {/* Metadata Row */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {/* Status Badge */}
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
            statusColors[project.status]
          )}
        >
          {statusLabels[locale][project.status]}
        </span>

        {/* Timeline */}
        {project.timeline && (
          <>
            <span>•</span>
            <span>{project.timeline}</span>
          </>
        )}

        {/* Client */}
        {project.client && (
          <>
            <span>•</span>
            <span>{project.client}</span>
          </>
        )}
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <ProjectTag key={tag} tag={tag} />
        ))}
      </div>

      {/* Description */}
      <p className="text-lg text-muted-foreground">
        {project.description}
      </p>
    </header>
  )
}
```

### Dependencies

- **Requires**: Story 2.4 (ProjectTag), Story 3.2 (useLanguage)
- **Used by**: Story 3.3 (Case Study Page)

### Translations

| Key | FR | EN |
|-----|----|----|
| completed | Livré | Shipped |
| in-progress | En cours | In Progress |
| concept | Concept | Concept |

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/components/features/case-study/CaseStudyHeader.tsx`
- `src/components/features/case-study/index.ts`
- `src/components/features/index.ts` (updated)
