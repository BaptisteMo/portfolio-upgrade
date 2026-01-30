# Story 4.3: Contextual Content Variants

Status: done

## Story

**As a** visitor (Thomas),
**I want** different contextual information based on the section I'm reading,
**So that** I get the most relevant insights for each part of the case study.

## Acceptance Criteria

1. **AC1**: Context/Problem section → Panel shows: Business constraints, Timeline, Team composition
2. **AC2**: Research section → Panel shows: Methodology used, Key findings, User quotes
3. **AC3**: Process section → Panel shows: Alternatives considered, Decision rationale, Wireframe thumbnails
4. **AC4**: Solution section → Panel shows: Technical stack, Design decisions, Before/After comparisons
5. **AC5**: Results section → Panel shows: Detailed metrics, Learnings, Next steps
6. **AC6**: All contextual data comes from MDX frontmatter `contextSections` field
7. **AC7**: New item types render correctly: `quote`, `link` (in addition to existing `text`, `list`, `metric`)
8. **AC8**: Existing panel rendering and scroll sync (Stories 4.1/4.2) continue to work unchanged

## Tasks / Subtasks

- [x] **Task 1: Extend ContextItem Type System** (AC: 7)
  - [x] Add `'quote'` and `'link'` to `ContextItem.type` union in `src/content/meta.ts`
  - [x] `quote` type: renders `value` as a styled quote with `label` as attribution
  - [x] `link` type: renders `value` as a URL link with `label` as link text

- [x] **Task 2: Add New Renderers in ContextPanelItem** (AC: 7, 8)
  - [x] Add `quote` renderer: italic text with left border accent, attribution below
  - [x] Add `link` renderer: text link with external icon, opens in new tab
  - [x] Ensure existing `text`, `list`, `metric` renderers remain unchanged
  - [x] All new renderers accept `variants` prop for Framer Motion animation

- [x] **Task 3: Enrich Frontmatter Data — FR Projects** (AC: 1-6)
  - [x] Update `src/content/fr/projects/khora.mdx` contextSections with richer variant data
  - [x] Update `src/content/fr/projects/nexus-crm.mdx` contextSections with richer variant data
  - [x] Update `src/content/fr/projects/la-wooferie.mdx` contextSections with richer variant data
  - [x] Each section must have 3-5 items covering the AC requirements for that section type
  - [x] Use appropriate `type` for each item (text, list, metric, quote, link)

- [x] **Task 4: Enrich Frontmatter Data — EN Projects** (AC: 1-6)
  - [x] Update `src/content/en/projects/khora.mdx` contextSections
  - [x] Update `src/content/en/projects/nexus-crm.mdx` contextSections
  - [x] Update `src/content/en/projects/la-wooferie.mdx` contextSections
  - [x] Mirror FR structure with translated content

- [x] **Task 5: Build Verification** (AC: all)
  - [x] Run `npm run build` — no errors
  - [x] Verify panel renders all item types correctly
  - [x] Verify scroll sync still works (no regression from Story 4.2)
  - [x] Verify non-case-study pages unaffected

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/context-panel/`

**Modified Files:**
```
src/content/meta.ts                          # Extend ContextItem type union
src/components/features/context-panel/ContextPanelItem.tsx  # Add quote + link renderers
src/content/fr/projects/khora.mdx            # Enrich contextSections
src/content/fr/projects/nexus-crm.mdx        # Enrich contextSections
src/content/fr/projects/la-wooferie.mdx      # Enrich contextSections
src/content/en/projects/khora.mdx            # Enrich contextSections
src/content/en/projects/nexus-crm.mdx        # Enrich contextSections
src/content/en/projects/la-wooferie.mdx      # Enrich contextSections
```

### Critical Rules

1. `@/` alias for all imports
2. Framer Motion for animations — signature ease `[0.16, 1, 0.3, 1]`
3. `useReducedMotion()` already handled by parent `ContextPanel`
4. Tailwind design tokens only: `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`
5. No `'use client'` on `ContextPanelItem` — it receives `variants` from parent client component

### New Renderer Specifications

**Quote renderer:**
```tsx
if (type === 'quote') {
  return (
    <motion.div variants={variants} className="space-y-1">
      <p className="border-l-2 border-border pl-3 text-sm italic text-foreground">
        {item.value}
      </p>
      <p className="text-xs text-muted-foreground">— {item.label}</p>
    </motion.div>
  )
}
```

**Link renderer:**
```tsx
if (type === 'link') {
  return (
    <motion.div variants={variants}>
      <a
        href={item.value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
      >
        {item.label} ↗
      </a>
    </motion.div>
  )
}
```

### Content Variant Guidelines per Section

Each project's `contextSections` should follow this pattern:

| Section | Required Items | Recommended Types |
|---------|---------------|-------------------|
| Context | Business constraints, Timeline, Team | text, list |
| Research | Methodology, Key findings, User quote | list, text, quote |
| Process | Approach, Alternatives, Tools | text, list |
| Solution | Tech stack, Components/Deliverables, Design decisions | list, metric, text |
| Results | Key metric, Impact, Learnings, Next steps | metric, text, quote |

### Previous Story Intelligence (4.1, 4.2)

**From Story 4.1:**
- `ContextPanel` at `src/components/features/context-panel/ContextPanel.tsx` — `'use client'`, uses `AnimatePresence`, `useReducedMotion`
- `ContextPanelItem` at `src/components/features/context-panel/ContextPanelItem.tsx` — NO `'use client'`, receives `variants` prop
- Types in `src/content/meta.ts`: `ContextItem { label, value, type?: 'text' | 'list' | 'metric' }`, `ContextSection { sectionId, label, items }`
- Barrel export: only `ContextPanel` exported from `context-panel/index.ts`
- Code review fix: `containerVariants.hidden` must be `opacity: 0` for `AnimatePresence` exit

**From Story 4.2:**
- `CaseStudyShell` at `src/components/features/case-study/CaseStudyShell.tsx` owns scroll sync state
- `useActiveSection` hook returns `string | null`, converted to `undefined` for `ContextPanel`
- `NavPanel` accepts `activeSection?: string | null`
- `aria-live="polite"` region in `CaseStudyShell` announces section changes
- MDX heading IDs are English in both locales (context, research, process, solution, results)

### Scope Notes

- This story enriches **data and rendering** only
- No changes to scroll sync logic (Story 4.2)
- No changes to panel transition animations (Story 4.4)
- Mobile adaptation is Epic 6

### Dependencies

- **Requires**: Story 4.1 (ContextPanel + ContextPanelItem), Story 4.2 (scroll sync wiring)
- **Enables**: Story 4.4 (Panel Transitions — animating between richer content variants)

### References

- [ContextPanelItem.tsx](src/components/features/context-panel/ContextPanelItem.tsx) — Renderers to extend
- [ContextPanel.tsx](src/components/features/context-panel/ContextPanel.tsx) — Parent component
- [meta.ts](src/content/meta.ts) — Type definitions to extend
- [CaseStudyShell.tsx](src/components/features/case-study/CaseStudyShell.tsx) — Integration wrapper
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Component rules
- [Epics](/_bmad-output/planning-artifacts/epics.md#epic-4) — Story requirements

### Testing Checklist

- [x] Panel renders `text` items correctly (no regression)
- [x] Panel renders `list` items correctly (no regression)
- [x] Panel renders `metric` items correctly (no regression)
- [x] Panel renders `quote` items with italic + border-left + attribution
- [x] Panel renders `link` items as clickable links with ↗ indicator
- [x] Each project has 3-5 items per section in both FR and EN
- [x] Scroll sync still works (section change updates panel content)
- [x] Build passes with no errors
- [x] Reduced motion: animations instant

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Extended `ContextItem.type` union with `'quote'` and `'link'` in `meta.ts`
- Added `quote` renderer (italic + border-left accent + attribution) and `link` renderer (underline + ↗ + target blank) in `ContextPanelItem.tsx`
- Enriched all 6 MDX files (3 FR + 3 EN) with 3-5 items per section including business constraints, timelines, team composition, user quotes, alternatives considered, tech stacks, learnings, next steps
- All projects now use `quote` type for stakeholder/user testimonials in research and results sections
- Existing text/list/metric renderers unchanged — no regression
- Build passes — 16 pages generated

### File List

- `src/content/meta.ts` (modified — added quote + link to ContextItem type)
- `src/components/features/context-panel/ContextPanelItem.tsx` (modified — added quote + link renderers)
- `src/content/fr/projects/khora.mdx` (modified — enriched contextSections)
- `src/content/fr/projects/nexus-crm.mdx` (modified — enriched contextSections)
- `src/content/fr/projects/la-wooferie.mdx` (modified — enriched contextSections)
- `src/content/en/projects/khora.mdx` (modified — enriched contextSections)
- `src/content/en/projects/nexus-crm.mdx` (modified — enriched contextSections)
- `src/content/en/projects/la-wooferie.mdx` (modified — enriched contextSections)
