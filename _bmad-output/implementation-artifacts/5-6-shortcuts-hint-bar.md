# Story 5.6: Shortcuts Hint Bar

Status: done

## Story

**As a** visitor,
**I want** to see keyboard shortcuts hints,
**So that** I discover available shortcuts.

## Acceptance Criteria

1. **AC1**: A subtle shortcuts bar appears (top-right, Linear style) on desktop viewport
2. **AC2**: Bar shows: "⌘K Search" (and optionally other shortcuts)
3. **AC3**: Hints disappear after first use of Command Palette (localStorage flag)
4. **AC4**: Bar is not shown on mobile
5. **AC5**: Component uses `ShortcutsBar` from `features/shortcuts-bar/`
6. **AC6**: Bar can be dismissed manually
7. **AC7**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Create ShortcutsBar Component** (AC: 1, 2, 4, 5)
  - [x] Create `src/components/features/shortcuts-bar/ShortcutsBar.tsx`
  - [x] Create `src/components/features/shortcuts-bar/index.ts` barrel export
  - [x] Self-contained component (no props — uses `useLanguage` for locale, `isMac()` for OS detection)
  - [x] Position: `fixed top-4 right-4 bg-popover/80 backdrop-blur-sm border rounded-lg`
  - [x] Render `⌘K Search` / `Ctrl+K Rechercher` with `<kbd>` badge
  - [x] OS detection via `navigator.userAgent` — Mac: `⌘`, other: `Ctrl`
  - [x] Hidden on mobile: `hidden md:flex`

- [x] **Task 2: Dismiss & Auto-hide Logic** (AC: 3, 6)
  - [x] `X` close button with lucide `X` icon
  - [x] On dismiss → `localStorage.setItem('shortcuts-hint-dismissed', 'true')`
  - [x] Listens for `shortcuts-hint-dismiss` custom event (palette open triggers this)
  - [x] On mount: reads localStorage — if dismissed, `visible` stays `false`
  - [x] `useState(false)` + `useEffect` to read localStorage on client (avoids SSR mismatch)

- [x] **Task 3: Integrate into Layout** (AC: 1, 5)
  - [x] Import `ShortcutsBar` in `src/app/[locale]/layout.tsx`
  - [x] Self-contained — no props needed (locale from context)
  - [x] z-index `z-40` — below palette overlay `z-50`, no conflict
  - [x] Positioned `fixed top-4 right-4` — no overlap

- [x] **Task 4: Connect to Command Palette State** (AC: 3)
  - [x] `CommandPaletteProvider` dispatches `shortcuts-hint-dismiss` custom event on first palette open
  - [x] Uses `useRef(false)` to track first open only
  - [x] `ShortcutsBar` listens for event → sets localStorage + hides
  - [x] Approach: custom DOM event — clean decoupling between components

- [x] **Task 5: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors (16 pages)
  - [ ] Test: Bar visible on desktop first visit (manual)
  - [ ] Test: Bar hidden on mobile viewport (manual)
  - [ ] Test: Bar disappears after opening Command Palette (manual)
  - [ ] Test: Bar dismissed manually via X button (manual)
  - [ ] Test: Bar stays hidden on next visit (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/features/shortcuts-bar/ShortcutsBar.tsx    # Main component
src/components/features/shortcuts-bar/index.ts            # Barrel export
```

**Modified Files:**
```
src/components/layout/*/  OR  src/app/[locale]/layout.tsx  # Integration point (TBD by dev)
```

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` directive on ShortcutsBar (uses useState, useEffect, localStorage)
3. DO NOT modify `components/ui/` (project-context anti-pattern)
4. PascalCase for component, camelCase for hooks
5. Tailwind design tokens for all styling
6. Framer Motion for enter/exit animations (NOT GSAP — this is a React transition)

### UX Design Spec

From UX document:
- **Props**: `shortcuts: { key, label, action }[]`, `position?: 'top' | 'bottom'`
- **States**: Visible, Hidden (mobile), Focused
- **Style**: Linear-inspired — subtle, minimal, translucent background
- **Position**: Top-right corner, fixed positioning

### Design Reference (Linear-style)

```
┌──────────────────────────────────────────────┐
│                                    ┌────────┐│
│                                    │ ⌘K Search ✕││
│                                    └────────┘│
│                                              │
│              (page content)                  │
│                                              │
└──────────────────────────────────────────────┘
```

Styling approach:
- `fixed top-4 right-4` positioning
- `bg-popover/80 backdrop-blur-sm` for translucent background
- `border border-border rounded-lg px-3 py-2`
- `text-xs text-muted-foreground`
- Keyboard key badge: `bg-muted rounded px-1.5 py-0.5 font-mono text-[11px]`
- Framer Motion `AnimatePresence` for smooth enter/exit

### Previous Story Intelligence

**From Story 5-4 (Fuzzy Search):**
- CommandPalette uses `onOpenChange` callback
- `useCommandPalette` hook manages open/close state
- `CommandPaletteProvider` bridges layout and palette

**From Story 5-1 (Command Palette Core):**
- `useCommandPalette` hook in `src/hooks/useCommandPalette.ts`
- Cmd+K / Ctrl+K toggles open state
- Provider pattern: `CommandPaletteProvider` renders in layout

**Key insight for AC3:** The simplest approach is to have `ShortcutsBar` manage its own localStorage state independently. When the user opens the palette (via Cmd+K or clicking), the ShortcutsBar doesn't need to know — it just checks localStorage on mount. The dismiss action (and first palette use) both write to the same localStorage key. To detect palette usage from the bar, either:
- (a) Check `localStorage` periodically (bad)
- (b) Listen for `storage` events (works cross-tab only)
- (c) Have `CommandPaletteProvider` set the flag and ShortcutsBar reads on mount
- **(d) Best: Pass a callback or use a shared hook** — `useCommandPalette` already tracks open state. ShortcutsBar could use the same hook and hide when `open` becomes true for the first time, then persist to localStorage.

### i18n Considerations

Shortcuts label should be localized:
- FR: `⌘K Rechercher`
- EN: `⌘K Search`

Use `useLanguage()` context for locale detection.

### Dependencies

- **Requires**: Story 5-1 (done) — Command Palette must exist
- **Optional dep**: Story 5-5 (keyboard nav) — keyboard behavior should work before showing hints
- **Enables**: Nothing directly

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — `features/shortcuts-bar/` folder structure
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md#shortcutsbar) — Props, states
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-56-shortcuts-hint-bar)
- [useCommandPalette.ts](src/hooks/useCommandPalette.ts) — Open/close state hook
- [CommandPaletteProvider.tsx](src/components/features/command-palette/CommandPaletteProvider.tsx) — Layout integration

### Testing Checklist

- [ ] Desktop: Bar visible on first visit (top-right)
- [ ] Desktop: Shows "⌘K Search" (Mac) or "Ctrl+K Search" (Windows)
- [ ] Mobile: Bar NOT visible
- [ ] Click X → bar dismissed, stays hidden on refresh
- [ ] Open Command Palette → bar dismissed, stays hidden on refresh
- [ ] Localization: FR shows "Rechercher", EN shows "Search"
- [ ] Animation: Smooth enter/exit transition
- [ ] No z-index conflicts with palette overlay
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created `ShortcutsBar` component — fixed top-right, Linear-inspired styling
- OS detection via `navigator.userAgent` — `⌘` on Mac, `Ctrl` otherwise
- Localized label: FR "Rechercher", EN "Search"
- Hidden on mobile via `hidden md:flex`
- Framer Motion `AnimatePresence` for smooth enter/exit animation
- localStorage persistence: `shortcuts-hint-dismissed` key
- Manual dismiss via X button + auto-dismiss on first palette open
- Custom DOM event `shortcuts-hint-dismiss` dispatched by `CommandPaletteProvider` on first open
- `useRef` to track first open only (no repeated events)
- Build passes — 16 pages, 0 errors

### File List

- `src/components/features/shortcuts-bar/ShortcutsBar.tsx` (new)
- `src/components/features/shortcuts-bar/index.ts` (new)
- `src/app/[locale]/layout.tsx` (modified — added ShortcutsBar import + render)
- `src/components/features/command-palette/CommandPaletteProvider.tsx` (modified — dispatch shortcuts-hint-dismiss event)

