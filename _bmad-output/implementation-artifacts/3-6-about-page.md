# Story 3.6: About Page

Status: done

## Story

**As a** visitor,
**I want** to read an About page with Baptiste's positioning,
**So that** I understand his background and expertise.

## Acceptance Criteria

1. **AC1**: Page displays Baptiste's bio and positioning statement ("Founder Designer")
2. **AC2**: A professional photo is displayed
3. **AC3**: An experience timeline shows key career milestones (vertical frise)
4. **AC4**: Skills/expertise areas are listed
5. **AC5**: Current availability status is visible
6. **AC6**: Content loads from about.mdx in current locale
7. **AC7**: Page uses tri-panel layout with contextual info in right panel

## Tasks / Subtasks

- [x] **Task 1: Create About Page Route** (AC: 6, 7)
  - [x] Create `src/app/[locale]/about/page.tsx`
  - [x] Use `getAboutContent(locale)` from lib/mdx.ts
  - [x] Wrap in TriPanelLayout
  - [x] Add generateStaticParams for locales

- [x] **Task 2: Create AboutHeader Component** (AC: 1, 2)
  - [x] Create `src/components/features/about/AboutHeader.tsx`
  - [x] Display photo with next/image
  - [x] Display name and positioning statement
  - [x] Responsive layout (photo left, text right on desktop)

- [x] **Task 3: Create Timeline Component** (AC: 3)
  - [x] Create `src/components/features/about/Timeline.tsx`
  - [x] Vertical frise chronologique design
  - [x] Each item: year, title, company
  - [x] Visual connector line between items
  - [x] Most recent at top

- [x] **Task 4: Create SkillsList Component** (AC: 4)
  - [x] Create `src/components/features/about/SkillsList.tsx`
  - [x] Display skills as tags or list
  - [x] Group by category if needed
  - [x] Use design tokens for styling

- [x] **Task 5: Create AvailabilityBadge Component** (AC: 5)
  - [x] Create `src/components/features/about/AvailabilityBadge.tsx`
  - [x] Display status with color indicator
  - [x] 🟢 Disponible, 🟡 En discussion, 🔴 Non disponible
  - [x] Translate labels based on locale

- [x] **Task 6: Write About MDX Content** (AC: 6)
  - [x] Write `src/content/fr/about.mdx` with full content
  - [x] Write `src/content/en/about.mdx` with translation
  - [x] Include bio, timeline, skills in frontmatter

- [x] **Task 7: Update Exports** (AC: all)
  - [x] Create `src/components/features/about/index.ts`
  - [x] Update `src/components/features/index.ts`

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/about/`

```
src/
├── app/[locale]/about/
│   └── page.tsx
├── components/features/about/
│   ├── AboutHeader.tsx
│   ├── Timeline.tsx
│   ├── SkillsList.tsx
│   ├── AvailabilityBadge.tsx
│   └── index.ts
├── content/
│   ├── fr/about.mdx
│   └── en/about.mdx
```

### Technical Requirements

**AboutMeta Interface (from meta.ts):**

```typescript
interface AboutMeta {
  title: string
  subtitle: string           // "Founder Designer"
  bio: string
  photo: string              // "/images/baptiste.jpg"
  availability: 'available' | 'in-talks' | 'unavailable'
  skills: string[]
  experience: {
    year: string
    title: string
    company: string
  }[]
}
```

**Timeline Component (Vertical Frise):**

```tsx
// src/components/features/about/Timeline.tsx
interface TimelineItem {
  year: string
  title: string
  company: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-10">
            {/* Dot */}
            <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />

            {/* Content */}
            <div className="text-sm text-muted-foreground">{item.year}</div>
            <div className="font-semibold text-foreground">{item.title}</div>
            <div className="text-muted-foreground">{item.company}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**AvailabilityBadge Component:**

```tsx
// src/components/features/about/AvailabilityBadge.tsx
'use client'

import { useLanguage } from '@/contexts'
import { cn } from '@/lib/utils'

type AvailabilityStatus = 'available' | 'in-talks' | 'unavailable'

interface AvailabilityBadgeProps {
  status: AvailabilityStatus
}

const statusConfig = {
  available: {
    color: 'bg-green-500',
    fr: 'Disponible',
    en: 'Available',
  },
  'in-talks': {
    color: 'bg-yellow-500',
    fr: 'En discussion',
    en: 'In Talks',
  },
  unavailable: {
    color: 'bg-red-500',
    fr: 'Non disponible',
    en: 'Unavailable',
  },
}

export function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const { locale } = useLanguage()
  const config = statusConfig[status]

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      <span className={cn('h-2 w-2 rounded-full', config.color)} />
      <span className="text-sm font-medium">{config[locale]}</span>
    </div>
  )
}
```

**About Page:**

```tsx
// src/app/[locale]/about/page.tsx
import { getAboutContent } from '@/lib/mdx'
import { TriPanelLayout } from '@/components/layout'
import { NavPanel } from '@/components/features'
import {
  AboutHeader,
  Timeline,
  SkillsList,
  AvailabilityBadge,
} from '@/components/features/about'
import { MDXContent } from '@/components/mdx'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const { meta, content } = await getAboutContent(locale)

  return (
    <TriPanelLayout
      nav={<NavPanel />}
      panel={
        <div className="p-6 space-y-6">
          <AvailabilityBadge status={meta.availability} />
          <SkillsList skills={meta.skills} />
        </div>
      }
    >
      <AboutHeader
        name="Baptiste Morillon"
        subtitle={meta.subtitle}
        photo={meta.photo}
      />
      <MDXContent content={content} />
      <Timeline items={meta.experience} />
    </TriPanelLayout>
  )
}
```

### Sample about.mdx Frontmatter

```yaml
---
title: "À propos"
subtitle: "Founder Designer"
bio: "Product Designer avec 6 ans d'expérience..."
photo: "/images/baptiste.jpg"
availability: "available"
skills:
  - "Product Design"
  - "Design Systems"
  - "UX Research"
  - "Figma"
  - "React/Next.js"
experience:
  - year: "2024"
    title: "Lead Product Designer"
    company: "Startup B2B SaaS"
  - year: "2022"
    title: "Senior UX Designer"
    company: "Agence Design"
  - year: "2019"
    title: "UX/UI Designer"
    company: "Startup EdTech"
---

## Mon parcours

Je suis Baptiste, Product Designer passionné...
```

### Dependencies

- **Requires**: Story 3.1 (MDX), Story 3.2 (i18n routing)
- **Uses**: TriPanelLayout, NavPanel, MDXContent

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/app/[locale]/about/page.tsx`
- `src/components/features/about/AboutHeader.tsx`
- `src/components/features/about/Timeline.tsx`
- `src/components/features/about/SkillsList.tsx`
- `src/components/features/about/AvailabilityBadge.tsx`
- `src/components/features/about/index.ts`
- `src/components/features/index.ts` (updated)
- `src/content/fr/about.mdx`
- `src/content/en/about.mdx`
