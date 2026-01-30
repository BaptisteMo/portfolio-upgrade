# Story 3.3: Case Study Page Structure

Status: done

## Story

**As a** visitor (Mathilde),
**I want** case studies with a clear narrative structure,
**So that** I can follow the design process from context to results.

## Acceptance Criteria

1. **AC1**: Sections display in order: Context, Research, Process, Solution, Results
2. **AC2**: Each section has a clear heading (H2) with anchor id
3. **AC3**: Section headings are anchored for navigation (id="context", etc.)
4. **AC4**: MDX content renders with custom components (Callout, ImageFull)
5. **AC5**: Section transitions are smooth when scrolling
6. **AC6**: Content is loaded from the current locale's MDX file

## Tasks / Subtasks

- [x] **Task 1: Create Dynamic Route for Case Studies** (AC: 6)
  - [x] Create `src/app/[locale]/projects/[slug]/page.tsx`
  - [x] Use `getProjectBySlug(slug, locale)` from lib/mdx.ts
  - [x] Implement `generateStaticParams()` for all project slugs × locales
  - [x] Handle 404 for non-existent slugs

- [x] **Task 2: Create MDX Custom Components** (AC: 4)
  - [x] Create `src/components/mdx/Callout.tsx` (info, warning, tip variants)
  - [x] Create `src/components/mdx/ImageFull.tsx` (full-width image with caption)
  - [x] Create `src/components/mdx/index.ts` barrel export
  - [x] Style with Tailwind, consistent with design system

- [x] **Task 3: Configure MDX Rendering** (AC: 4, 6)
  - [x] Install/configure `next-mdx-remote` for rendering
  - [x] Create `src/components/mdx/MDXContent.tsx` wrapper
  - [x] Pass custom components to MDXRemote
  - [x] Handle code blocks with syntax highlighting (optional)

- [x] **Task 4: Implement Section Structure** (AC: 1, 2, 3)
  - [x] Parse MDX content for H2 headings
  - [x] Auto-generate anchor ids (id="context", id="research", etc.)
  - [x] Ensure sections render in correct order from MDX
  - [x] Add scroll-margin-top for fixed header offset

- [x] **Task 5: Create Case Study Layout** (AC: 1, 5)
  - [x] Wrap content in TriPanelLayout
  - [x] Pass project metadata to context panel (placeholder for Epic 4)
  - [x] Update NavPanel to show section anchors on case study pages
  - [x] Add smooth scroll behavior

- [x] **Task 6: Create Sample Case Study Content** (AC: all)
  - [x] Write full MDX content for `la-wooferie.mdx` (FR)
  - [x] Write full MDX content for `la-wooferie.mdx` (EN)
  - [x] Include all 5 sections with realistic content
  - [x] Use custom components (Callout, ImageFull)

- [x] **Task 7: Update Barrel Exports** (AC: all)
  - [x] Export MDX components from `@/components/mdx`
  - [x] Verify imports work correctly

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/mdx/` and `src/app/[locale]/projects/[slug]/`

```
src/
├── app/[locale]/projects/[slug]/
│   └── page.tsx              # Case study page
├── components/mdx/
│   ├── Callout.tsx           # Info/warning/tip callouts
│   ├── ImageFull.tsx         # Full-width images
│   ├── MDXContent.tsx        # MDX renderer wrapper
│   └── index.ts
```

### Technical Requirements

**Callout Component:**

```tsx
// src/components/mdx/Callout.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  title?: string
  children: ReactNode
}

const variants = {
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
  warning: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
  tip: 'bg-green-500/10 border-green-500/20 text-green-500',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={cn('rounded-lg border p-4 my-6', variants[type])}>
      {title && <p className="font-semibold mb-2">{title}</p>}
      <div className="text-foreground/80">{children}</div>
    </div>
  )
}
```

**ImageFull Component:**

```tsx
// src/components/mdx/ImageFull.tsx
import Image from 'next/image'

interface ImageFullProps {
  src: string
  alt: string
  caption?: string
}

export function ImageFull({ src, alt, caption }: ImageFullProps) {
  return (
    <figure className="my-8 -mx-4 md:-mx-8">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
```

**Case Study Page:**

```tsx
// src/app/[locale]/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/mdx'
import { MDXContent } from '@/components/mdx'
import { CaseStudyHeader } from '@/components/features/case-study'
import { TriPanelLayout } from '@/components/layout'
import { NavPanel } from '@/components/features'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  const locales: Locale[] = ['fr', 'en']

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params

  try {
    const { meta, content } = await getProjectBySlug(slug, locale)

    return (
      <TriPanelLayout
        nav={<NavPanel />}
        panel={<div>Context Panel (Epic 4)</div>}
      >
        <CaseStudyHeader project={meta} />
        <MDXContent content={content} />
      </TriPanelLayout>
    )
  } catch {
    notFound()
  }
}
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. Use `next/image` for all images
3. Respect design tokens (colors, spacing)
4. MDX files use kebab-case

### Dependencies

- **Requires**: Story 3.1 (MDX utilities), Story 3.2 (i18n routing)
- **Enables**: Story 3.4 (CaseStudyHeader), Story 3.5 (Animated Counters)

### Section Anchors

```
#context   → Context section
#research  → Research section
#process   → Process section
#solution  → Solution section
#results   → Results section
```

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/app/[locale]/projects/[slug]/page.tsx`
- `src/components/mdx/Callout.tsx`
- `src/components/mdx/ImageFull.tsx`
- `src/components/mdx/MDXContent.tsx`
- `src/components/mdx/index.ts`
- `src/content/fr/projects/la-wooferie.mdx` (updated with full content)
- `src/content/en/projects/la-wooferie.mdx` (updated with full content)
