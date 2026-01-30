# Story 4.1: Context Panel Component

Status: done

## Story

**As a** visitor,
**I want** a right-side panel showing contextual information,
**So that** I can see enriched details while reading the main content.

## Acceptance Criteria

1. **AC1**: A context panel (20% width, matching TriPanelLayout right aside) appears on the right of case study pages
2. **AC2**: Panel is position:fixed and doesn't scroll with content (already handled by TriPanelLayout `panel` slot)
3. **AC3**: Panel has a clear header showing current section name
4. **AC4**: Panel content area displays relevant contextual information for the current section
5. **AC5**: Panel uses `ContextPanel` component from `features/context-panel/`
6. **AC6**: Panel is accessible with `role="complementary"` (already on TriPanelLayout aside)
7. **AC7**: Panel renders correctly on desktop (≥1024px), hidden on mobile (TriPanelLayout handles this)

## Tasks / Subtasks

- [x] **Task 1: Define Context Panel Data Types** (AC: 3, 4)
  - [x] Add `ContextSection` type to `src/content/meta.ts` defining section context data structure:
    ```typescript
    export interface ContextSection {
      sectionId: string
      label: string // e.g. "Contexte", "Research", "Solution"
      items: ContextItem[]
    }
    export interface ContextItem {
      label: string
      value: string
      type?: 'text' | 'list' | 'metric' // default 'text'
    }
    ```
  - [x] Add `contextSections?: ContextSection[]` field to `ProjectMeta` interface
  - [x] Update MDX frontmatter in all project files to include `contextSections` data

- [x] **Task 2: Create ContextPanel Component** (AC: 1, 3, 4, 5, 6)
  - [x] Create `src/components/features/context-panel/ContextPanel.tsx`
  - [x] Create `src/components/features/context-panel/index.ts` barrel export
  - [x]Component accepts props: `sections: ContextSection[]`, `activeSection?: string`
  - [x]Display header with current section name (fallback to first section or generic title)
  - [x]Display section items based on their type
  - [x]Use signature animation style for item reveals (opacity + y + blur, ease `[0.16, 1, 0.3, 1]`)
  - [x]Add `useReducedMotion` check
  - [x]Style with Tailwind using existing design tokens (`text-foreground`, `text-muted-foreground`, `border-border`, etc.)

- [x] **Task 3: Create ContextPanelItem Sub-component** (AC: 4)
  - [x] Create `src/components/features/context-panel/ContextPanelItem.tsx`
  - [x]Render `text` type as label/value pair
  - [x]Render `list` type as comma-separated or bulleted list (value is comma-delimited string)
  - [x]Render `metric` type as emphasized value with label below

- [x] **Task 4: Integrate ContextPanel in Case Study Page** (AC: 1, 2, 5, 7)
  - [x]Update `src/app/[locale]/projects/[slug]/page.tsx`
  - [x]Import `ContextPanel` from `@/components/features/context-panel`
  - [x]Pass `meta.contextSections` to `ContextPanel`
  - [x]Replace placeholder `panel` content with `<ContextPanel sections={meta.contextSections ?? []} />`
  - [x]Ensure non-case-study pages (home, projects list, about) keep their current panel content

- [x] **Task 5: Add Context Data to MDX Frontmatter** (AC: 4)
  - [x]Update `src/content/fr/projects/*.mdx` frontmatter with `contextSections` arrays
  - [x]Update `src/content/en/projects/*.mdx` frontmatter with `contextSections` arrays
  - [x]Each project should have at least 3 sections (Context, Solution, Results) with 2-4 items each
  - [x]Ensure `sectionId` matches the MDX heading anchors (e.g., `context`, `research`, `solution`, `results`)

- [x] **Task 6: Update Feature Barrel Exports** (AC: 5)
  - [x]Add `ContextPanel` export to `src/components/features/index.ts`

- [x] **Task 7: Build Verification** (AC: all)
  - [x]Run `npm run build` and verify no errors
  - [x]Verify panel renders on case study pages
  - [x]Verify non-case-study pages are unaffected

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/context-panel/`

Structure:
```
src/components/features/context-panel/
├── ContextPanel.tsx        # Main panel component
├── ContextPanelItem.tsx    # Individual item renderer
└── index.ts                # Barrel export
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. **ALWAYS** check `useReducedMotion()` before animations
3. Animation easing curve: `[0.16, 1, 0.3, 1]` (signature ease)
4. Animation duration: `0.8s` for reveals
5. Blur amount: `4px` for subtle effect
6. Use Framer Motion for component transitions (not GSAP)

### Existing Patterns to Follow

**TriPanelLayout Panel Slot:**
The `panel` prop in `TriPanelLayout` renders inside:
```tsx
<aside className="fixed right-0 top-0 h-screen w-[20%] min-w-62.5 border-l border-border bg-background z-10">
  {panel}
</aside>
```
- Panel is already `position:fixed`, `w-[20%]`, `min-w-62.5`, `border-l`, `z-10`
- Component just needs to handle internal layout (padding, scroll, content)

**CaseStudyHeader Animation Pattern (reference):**
```tsx
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}
```

**Existing Section Anchors (case study page):**
```typescript
const sectionAnchors = [
  { label: 'Contexte', id: 'context' },
  { label: 'Research', id: 'research' },
  { label: 'Processus', id: 'process' },
  { label: 'Solution', id: 'solution' },
  { label: 'Résultats', id: 'results' },
]
```
Use these `id` values as `sectionId` in `ContextSection`.

**MDX Frontmatter Parsing:**
Content is loaded via `getProjectBySlug()` in `src/lib/mdx.ts`. The `meta` object is typed as `ProjectMeta`. Adding `contextSections` as optional field is backward-compatible.

### Scope Notes

- This story covers the **static** context panel component only
- **Scroll synchronization** (updating `activeSection` based on scroll) is Story 4.2
- **Content variants per section type** are Story 4.3
- **Panel transition animations** between sections are Story 4.4
- For this story, the panel can show the first section by default or all sections stacked
- Mobile behavior (slide-over) is Epic 6, not this story

### Dependencies

- **Requires**: Epic 3 complete (case study pages, MDX content, TriPanelLayout)
- **Enables**: Story 4.2 (Scroll Sync), Story 4.3 (Variants), Story 4.4 (Transitions)

### References

- [TriPanelLayout.tsx](src/components/layout/TriPanelLayout/TriPanelLayout.tsx) - Panel slot structure
- [CaseStudyPage](src/app/[locale]/projects/[slug]/page.tsx) - Integration point
- [meta.ts](src/content/meta.ts) - Type definitions to extend
- [CaseStudyHeader.tsx](src/components/features/case-study/CaseStudyHeader.tsx) - Animation pattern reference
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) - Component structure rules
- [Epics](/_bmad-output/planning-artifacts/epics.md#epic-4) - Story requirements

### Testing Checklist

- [x]Panel renders on desktop case study pages with contextual content
- [x]Panel shows section header with current section name
- [x]Panel items render correctly for text, list, and metric types
- [x]Non-case-study pages (home, projects list, about) are unaffected
- [x]Build passes with no errors
- [x]Panel is accessible (role="complementary" from TriPanelLayout)
- [x]Reduced motion: animations instant if enabled

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Added `ContextItem`, `ContextSection` interfaces and `contextSections?` field to `ProjectMeta` in `meta.ts`
- Created `ContextPanel` component with Framer Motion stagger animation (signature ease), `useReducedMotion` check, `AnimatePresence` for section transitions, `activeSection` prop support
- Created `ContextPanelItem` sub-component rendering 3 types: text (label/value), list (comma-split), metric (large value)
- Replaced placeholder panel in case study page with `<ContextPanel>`
- Added `contextSections` frontmatter data to all 6 MDX project files (3 FR + 3 EN), 5 sections each (context, research, process, solution, results)
- Added barrel export in `features/index.ts`
- Build passes — all 16 pages generated successfully

### File List

- `src/content/meta.ts` (modified — added ContextItem, ContextSection, contextSections field)
- `src/components/features/context-panel/ContextPanel.tsx` (new)
- `src/components/features/context-panel/ContextPanelItem.tsx` (new)
- `src/components/features/context-panel/index.ts` (new)
- `src/app/[locale]/projects/[slug]/page.tsx` (modified — import + use ContextPanel)
- `src/components/features/index.ts` (modified — added ContextPanel export)
- `src/content/fr/projects/khora.mdx` (modified — contextSections)
- `src/content/en/projects/khora.mdx` (modified — contextSections)
- `src/content/fr/projects/nexus-crm.mdx` (modified — contextSections)
- `src/content/en/projects/nexus-crm.mdx` (modified — contextSections)
- `src/content/fr/projects/la-wooferie.mdx` (modified — contextSections)
- `src/content/en/projects/la-wooferie.mdx` (modified — contextSections)
