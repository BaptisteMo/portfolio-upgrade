# Story 5.4: Fuzzy Search

Status: done

## Story

**As a** visitor,
**I want** fuzzy search across all content in the command palette,
**So that** I can find what I need even with typos.

## Acceptance Criteria

1. **AC1**: Typing partial words or misspellings shows fuzzy matches (e.g., "khra" matches "Khora")
2. **AC2**: Search covers: page names, project titles, project tags, theme/language commands
3. **AC3**: Results are ranked by relevance
4. **AC4**: Matching characters are highlighted in results
5. **AC5**: Empty state shows "No results found" / "Aucun résultat." message (already exists)
6. **AC6**: Search is performant (< 50ms for filtering)
7. **AC7**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Install & Configure Fuzzy Search Library** (AC: 1, 3, 6)
  - [x] Install `fuse.js` — v7.1.0 installed
  - [x] Verify `fuse.js` is listed in `package.json` dependencies
  - [x] Verify build passes after install

- [x] **Task 2: Create Fuzzy Search Hook** (AC: 1, 2, 3, 6)
  - [x] Create `src/hooks/useFuzzySearch.ts`
  - [x] Define `SearchableItem` interface
  - [x] Create `useFuzzySearch(items, query)` hook with Fuse.js
  - [x] Configure Fuse.js options (threshold 0.4, includeMatches, ignoreLocation, minMatchCharLength 2)
  - [x] Return `FuseResult[]` when query >= 2 chars, empty array otherwise
  - [x] Export from `src/hooks/index.ts`

- [x] **Task 3: Add Match Highlighting Component** (AC: 4)
  - [x] Create `src/components/features/command-palette/HighlightMatch.tsx`
  - [x] Component accepts `text` and `matches` (FuseResultMatch[])
  - [x] Renders matched chars in `<mark className="bg-transparent text-primary font-semibold">`
  - [x] Falls back to plain text when no matches
  - [x] Export from command-palette barrel (index.ts)

- [x] **Task 4: Integrate into CommandPalette** (AC: 1, 2, 3, 4, 5)
  - [x] Import `useFuzzySearch` and `HighlightMatch`
  - [x] Build unified `searchableItems` array with `useMemo`
  - [x] Add `useState` for query tracking
  - [x] Wire `Command.Input` `onValueChange` to `setQuery`
  - [x] Fuzzy results (flat list) when query >= 2, grouped view otherwise
  - [x] `shouldFilter={!isSearching}` to disable cmdk filtering during fuzzy
  - [x] `HighlightMatch` for search result labels
  - [x] Reset query on dialog close
  - [x] Empty state via `Command.Empty`

- [x] **Task 5: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors (16 pages)
  - [ ] Test: Fuzzy matching (manual)
  - [ ] Test: Highlighting (manual)
  - [ ] Test: Default grouped view (manual)

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/components/features/command-palette/CommandPalette.tsx  # Integrate fuzzy search
```

**New Files:**
```
src/hooks/useFuzzySearch.ts                                  # Fuzzy search hook
src/components/features/command-palette/HighlightMatch.tsx    # Match highlighting
src/components/features/command-palette/index.ts              # Barrel export (if not exists)
```

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` directive on all new client components
3. DO NOT modify `components/ui/` (project-context anti-pattern)
4. PascalCase for components, camelCase for hooks
5. Use `fuse.js` — NOT a custom fuzzy algorithm
6. Tailwind design tokens for highlight styling (`text-primary`)
7. Keep cmdk's built-in filtering as fallback for short queries (< 2 chars)

### Previous Story Intelligence

**From Story 5-3 (Theme & Language Commands):**
- `themeCommands` array: `{ id, label: { fr, en }, icon, keywords, theme }`
- `langCommands` array: `{ id, label: { fr, en }, icon, keywords, locale }`
- `switchLocale()` handler for language switching
- `labels.preferencesGroup` for group heading
- All items use `onSelect` handler pattern + `onOpenChange(false)`
- `DialogTitle` + `DialogDescription` from `@radix-ui/react-dialog` for a11y

**From Story 5-2 (Navigation Commands):**
- `navCommands` array: `{ id, label: { fr, en }, href, icon, keywords }`
- `navigate()` handler for page routing
- `projects` imported from `@/data/projects` — each has `{ slug, title, tags }`

**From Story 5-1 (Command Palette Core):**
- `Command.Dialog` with `overlayClassName`, `contentClassName`
- `Command.Input` with `placeholder`, `autoFocus`
- `Command.List` with `Command.Empty`, `Command.Group`, `Command.Item`
- cmdk has built-in filtering via `value` + `keywords` props — fuzzy search REPLACES this for typed queries

**Code Review Intelligence (Epic 5 CR):**
- H3: Never modify `components/ui/`
- M1: All headings localized via `labels` object
- CR fix: `DialogTitle` + `DialogDescription` required for Radix a11y

### Key Implementation Decision: cmdk Filtering vs Fuse.js

cmdk has built-in substring matching via `value` and `keywords` props. However:
- cmdk filtering is NOT fuzzy — "khra" won't match "khora"
- AC1 explicitly requires fuzzy matching with typos
- **Strategy**: Use cmdk's built-in filtering for empty/short queries (< 2 chars), switch to Fuse.js for longer queries
- When using Fuse.js results, set `shouldFilter={false}` on `Command` to disable cmdk's built-in filter
- This preserves default behavior for browsing while enabling fuzzy for search

### Fuse.js Integration Pattern

```tsx
// In CommandPalette.tsx
const [query, setQuery] = useState('')
const allItems = useMemo(() => buildSearchableItems(locale, navigate, setTheme, switchLocale, onOpenChange), [locale])
const { results } = useFuzzySearch(allItems, query)

// Toggle between grouped view and flat search results
const isSearching = query.length >= 2

return (
  <Command shouldFilter={!isSearching}>
    <Command.Input onValueChange={setQuery} />
    {isSearching ? (
      // Flat results with highlighting
      results.map(result => <Command.Item>...</Command.Item>)
    ) : (
      // Default grouped view (existing code)
      <Command.Group>...</Command.Group>
    )}
  </Command>
)
```

### Dependencies

- **Requires**: Story 5-1 (done), Story 5-2 (done), Story 5-3 (done) — all command items must exist
- **Enables**: Story 5-5 (Keyboard Navigation) — search results need keyboard nav

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Command palette, cmdk
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-54-fuzzy-search)
- [Story 5-1](/_bmad-output/implementation-artifacts/5-1-command-palette-core.md) — Core palette
- [Story 5-2](/_bmad-output/implementation-artifacts/5-2-navigation-commands.md) — Nav commands
- [Story 5-3](/_bmad-output/implementation-artifacts/5-3-theme-language-commands.md) — Theme/lang commands
- [CommandPalette.tsx](src/components/features/command-palette/CommandPalette.tsx) — Current implementation
- [Fuse.js docs](https://www.fusejs.io/) — Fuzzy search library
- [cmdk docs](https://cmdk.paco.me/) — Command palette library

### Testing Checklist

- [ ] Type "khra" → Khora project appears
- [ ] Type "sombr" → "Mode sombre" appears
- [ ] Type "proj" → multiple results (nav + projects)
- [ ] Type "lang" → language commands appear
- [ ] Matching characters highlighted with `text-primary`
- [ ] Short query (1 char) → default grouped view
- [ ] Empty query → all groups visible
- [ ] No match → empty state message
- [ ] Search < 50ms (no visible delay)
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Installed fuse.js v7.1.0 for fuzzy search
- Created `useFuzzySearch` hook with Fuse.js (threshold 0.4, includeMatches, ignoreLocation, minMatchCharLength 2)
- Created `HighlightMatch` component rendering matched chars with `text-primary font-semibold`
- Integrated into CommandPalette with dual mode: cmdk filtering for short queries, Fuse.js for >= 2 chars
- Fixed TypeScript namespace import errors — use named type imports (`IFuseOptions`, `FuseResult`, `FuseResultMatch`) instead of namespace access
- Build passes with no errors (16 pages)

### File List

- `src/hooks/useFuzzySearch.ts` (new)
- `src/hooks/index.ts` (modified — added useFuzzySearch export)
- `src/components/features/command-palette/HighlightMatch.tsx` (new)
- `src/components/features/command-palette/index.ts` (modified — added HighlightMatch export)
- `src/components/features/command-palette/CommandPalette.tsx` (modified — fuzzy search integration)
- `package.json` (modified — added fuse.js dependency)
- `package-lock.json` (modified — lockfile update)
