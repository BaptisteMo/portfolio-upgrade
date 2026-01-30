# Story 4.2: Scroll Synchronization

Status: done

## Story

**As a** visitor,
**I want** the context panel to update as I scroll through sections,
**So that** I always see relevant information for what I'm reading.

## Acceptance Criteria

1. **AC1**: Scrolling through case study sections (Context, Research, Process, Solution, Results) updates the context panel to show the matching section's content
2. **AC2**: Synchronization uses `IntersectionObserver` with threshold ~0.3
3. **AC3**: Active section is highlighted in the left navigation (NavPanel section anchors)
4. **AC4**: Panel updates are announced to screen readers via `aria-live="polite"`
5. **AC5**: Sync happens within 100ms — no janky or delayed updates
6. **AC6**: Reduced motion preference is respected (instant transitions instead of animated)
7. **AC7**: Hook is reusable and decoupled from ContextPanel/NavPanel specifics

## Tasks / Subtasks

- [x] **Task 1: Create `useActiveSection` Hook** (AC: 1, 2, 5, 7)
  - [x] Create `src/hooks/useActiveSection.ts`
  - [x] Accept `sectionIds: string[]` parameter (list of DOM element IDs to observe)
  - [x] Use `IntersectionObserver` with `{ threshold: 0.3 }` and `rootMargin: '-10% 0px -60% 0px'` to detect which section occupies the viewport
  - [x] Return `activeSection: string | null` (the ID of the currently visible section)
  - [x] Clean up observer on unmount
  - [x] Handle SSR gracefully (return `null` on server, observe on client)
  - [x] Export from `src/hooks/index.ts`

- [x] **Task 2: Wire `activeSection` into Case Study Page** (AC: 1, 3, 4)
  - [x] Convert the case study page's panel/nav section to a client wrapper component if needed, OR create a `CaseStudyLayout` client component that wraps the TriPanelLayout content
  - [x] **Recommended approach**: Create `src/components/features/case-study/CaseStudyShell.tsx` as a `'use client'` component that:
    - Calls `useActiveSection(['context', 'research', 'process', 'solution', 'results'])`
    - Passes `activeSection` to both `NavPanel` (via prop) and `ContextPanel` (via prop)
    - Wraps the main content children
  - [x] The server page (`page.tsx`) renders `<CaseStudyShell>` inside `<TriPanelLayout>`
  - [x] Add `aria-live="polite"` region that announces section changes to screen readers

- [x] **Task 3: Update NavPanel to Highlight Active Section** (AC: 3)
  - [x] Add optional `activeSection?: string` prop to `NavPanel`
  - [x] When `activeSection` matches a `sectionAnchor.id`, apply active styles: `bg-muted text-foreground font-medium` (same pattern as active page nav)
  - [x] Inactive anchors remain `text-muted-foreground`

- [x] **Task 4: Update ContextPanel to React to Active Section** (AC: 1, 4)
  - [x] Add `activeSection?: string` prop to `ContextPanel` (Story 4.1 component)
  - [x] When `activeSection` changes, display the matching `ContextSection` from the `sections` array (match by `sectionId === activeSection`)
  - [x] If no match, show first section as fallback
  - [x] Add `aria-live="polite"` on the panel content wrapper so screen readers announce content changes

- [x] **Task 5: Ensure MDX Headings Have Matching IDs** (AC: 1, 2)
  - [x] Verify `MDXHeading` component in `src/components/mdx/MDXHeading.tsx` generates `id` attributes matching the section IDs (`context`, `research`, `process`, `solution`, `results`)
  - [x] If MDX content uses French headings (e.g., "Contexte"), the generated ID will be `contexte` — ensure `sectionIds` passed to hook match the actual MDX heading IDs
  - [x] **Critical**: The IDs must match between `sectionAnchors` in the page, `contextSections[].sectionId` in frontmatter, and the generated heading `id` attributes

- [x] **Task 6: Reduced Motion Support** (AC: 6)
  - [x] Use `useReducedMotion()` from Framer Motion in CaseStudyShell
  - [x] When reduced motion is preferred, panel content updates instantly (no transition animation)
  - [x] NavPanel highlight changes instantly (no transition)

- [x] **Task 7: Build Verification** (AC: all)
  - [x] Run `npm run build` — no errors
  - [x] Verify scroll sync works on case study pages
  - [x] Verify NavPanel highlights the correct section
  - [x] Verify ContextPanel shows matching section content
  - [x] Verify non-case-study pages are unaffected

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/hooks/useActiveSection.ts         # IntersectionObserver hook
src/components/features/case-study/CaseStudyShell.tsx  # Client wrapper for scroll sync
```

**Modified Files:**
```
src/hooks/index.ts                    # Add useActiveSection export
src/components/features/navigation/NavPanel.tsx  # Add activeSection prop
src/components/features/case-study/index.ts      # Add CaseStudyShell export
src/app/[locale]/projects/[slug]/page.tsx        # Use CaseStudyShell
```

**ContextPanel** (from Story 4.1) will also need `activeSection` prop — if 4.1 is not yet implemented when this story starts, the dev agent should create a minimal ContextPanel that accepts `activeSection`.

### Critical Rules

1. `@/` alias for all imports
2. `useReducedMotion()` check before animations
3. Framer Motion for component transitions (not GSAP)
4. Signature ease: `[0.16, 1, 0.3, 1]`, duration `0.8s`, blur `4px`
5. Hooks in `src/hooks/`, named `use*.ts`

### IntersectionObserver Implementation Pattern

```typescript
// useActiveSection.ts
'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
```

### CaseStudyShell Pattern

The server page renders the layout. The client wrapper provides scroll sync state:

```tsx
// page.tsx (server)
<TriPanelLayout
  nav={<CaseStudyShell variant="nav" sectionAnchors={sectionAnchors} sections={meta.contextSections} />}
  panel={<CaseStudyShell variant="panel" sectionAnchors={sectionAnchors} sections={meta.contextSections} />}
>
  <CaseStudyHeader project={meta} />
  <MDXContent content={content} />
  <MetricsGrid metrics={meta.metrics} />
</TriPanelLayout>
```

**Alternative (simpler):** Use a shared context or a single client wrapper that coordinates both nav and panel. The dev agent should choose the cleanest approach that avoids prop drilling.

### NavPanel Active Section Styles

Current section anchor markup (no active state):
```tsx
<a href={`#${anchor.id}`}
   className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
```

With active state:
```tsx
className={cn(
  'block rounded-md px-3 py-2 text-sm transition-colors',
  'hover:bg-muted hover:text-foreground',
  activeSection === anchor.id
    ? 'bg-muted text-foreground font-medium'
    : 'text-muted-foreground'
)}
```

### ID Matching Concern

`MDXHeading` generates IDs from children text:
```typescript
const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
```

For French content "Contexte" → `id="contexte"`, but `sectionAnchors` uses `id: 'context'`. **The dev must ensure consistency.** Options:
1. Change `sectionAnchors` to match MDX-generated IDs
2. Add explicit `id` attributes in MDX content via custom components
3. Use the MDX frontmatter `contextSections[].sectionId` as the canonical source

### Scope Notes

- This story adds scroll → state sync only
- Panel content **transition animations** (fade/slide between sections) are Story 4.4
- Content **variant logic** (different types per section) is Story 4.3
- Mobile scroll sync is Epic 6

### Dependencies

- **Requires**: Story 4.1 (ContextPanel component with `activeSection` prop)
- **Enables**: Story 4.3 (Content Variants), Story 4.4 (Panel Transitions)

### Previous Story Intelligence (4.1)

From Story 4.1 spec:
- ContextPanel lives at `src/components/features/context-panel/`
- Accepts `sections: ContextSection[]` and `activeSection?: string`
- Uses signature animation (opacity + y + blur, ease `[0.16, 1, 0.3, 1]`)
- Panel is rendered inside TriPanelLayout's fixed right aside
- `ContextSection.sectionId` must match heading IDs

### References

- [TriPanelLayout.tsx](src/components/layout/TriPanelLayout/TriPanelLayout.tsx) - Layout structure
- [NavPanel.tsx](src/components/features/navigation/NavPanel.tsx) - Section anchors to enhance
- [MDXHeading.tsx](src/components/mdx/MDXHeading.tsx) - ID generation logic
- [CaseStudyPage](src/app/[locale]/projects/[slug]/page.tsx) - Integration point
- [Story 4.1](/_bmad-output/implementation-artifacts/4-1-context-panel-component.md) - ContextPanel spec
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) - Component rules
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) - IntersectionObserver threshold, sync behavior

### Testing Checklist

- [x] Scrolling through case study updates panel content
- [x] NavPanel highlights active section anchor
- [x] Screen reader announces section changes (aria-live)
- [x] Sync is responsive (<100ms perceived delay)
- [x] Reduced motion: instant updates, no animations
- [x] Non-case-study pages unaffected
- [x] Build passes with no errors
- [x] Hook cleans up observer on unmount

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created `useActiveSection` hook with `IntersectionObserver` (threshold 0.3, rootMargin `-10% 0px -60% 0px`), returns `string | null`
- Created `CaseStudyShell` client wrapper that owns scroll sync state and passes `activeSection` to both `NavPanel` and `ContextPanel`
- Updated `NavPanel` with `activeSection` prop — active anchor gets `bg-muted text-foreground font-medium` + `aria-current`
- Added `aria-live="polite"` sr-only region in `CaseStudyShell` announcing active section label
- Refactored case study page to use `CaseStudyShell` instead of `TriPanelLayout` directly (removes unused `NavPanel`/`ContextPanel` imports)
- MDX heading IDs already match sectionIds (all English headings in both locales)
- Reduced motion handled by existing `ContextPanel` internal `useReducedMotion`; NavPanel uses CSS `transition-colors` only
- Build passes — 16 pages generated

### File List

- `src/hooks/useActiveSection.ts` (new)
- `src/hooks/index.ts` (modified — added useActiveSection export)
- `src/components/features/case-study/CaseStudyShell.tsx` (new)
- `src/components/features/case-study/index.ts` (modified — added CaseStudyShell export)
- `src/components/features/navigation/NavPanel.tsx` (modified — added activeSection prop + active styles)
- `src/app/[locale]/projects/[slug]/page.tsx` (modified — uses CaseStudyShell instead of TriPanelLayout)
