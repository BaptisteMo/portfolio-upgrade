# Story 5.1: Command Palette Core

Status: done

## Story

**As a** power user,
**I want** a command palette accessible via Cmd+K,
**So that** I can quickly access any part of the portfolio.

## Acceptance Criteria

1. **AC1**: Pressing Cmd+K (Mac) or Ctrl+K (Windows/Linux) opens a command palette dialog centered on screen
2. **AC2**: Dialog has backdrop blur (8px) and dark overlay (black 50%)
3. **AC3**: Search input is auto-focused when dialog opens
4. **AC4**: Dialog uses `cmdk` library for core functionality (filtering, keyboard nav)
5. **AC5**: Pressing Escape closes the dialog
6. **AC6**: Clicking outside the dialog closes it
7. **AC7**: Dialog is accessible: `role="dialog"`, `aria-modal="true"`, `aria-label`
8. **AC8**: Dialog opens with scale 0.95→1 + fade animation using Framer Motion
9. **AC9**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Install `cmdk` Package** (AC: 4)
  - [x] Run `npm install cmdk`
  - [x] Verify peer dependencies are met (React 18+, already satisfied)
  - [x] Verify build still passes after install

- [x] **Task 2: Create CommandPalette Component** (AC: 1-8)
  - [x] Create `src/components/features/command-palette/CommandPalette.tsx` as `'use client'`
  - [x] Import `Command` from `cmdk` — use `Command.Dialog` for the dialog wrapper
  - [x] Component props: `open: boolean`, `onOpenChange: (open: boolean) => void`
  - [x] Inside `Command.Dialog`:
    - `Command.Input` with placeholder text (localized: FR "Rechercher..." / EN "Search...")
    - `Command.List` wrapping items
    - `Command.Empty` for "no results" state (localized)
  - [x] For now, add a single `Command.Group` with placeholder items (navigation commands will come in Story 5-2)
  - [x] Apply styling via `data-cmdk-*` attributes + Tailwind classes
  - [x] Dialog styling: `max-w-150`, centered, rounded-xl, bg-popover, border, shadow-lg
  - [x] Input styling: text-sm, border-b, p-4, placeholder-muted-foreground
  - [x] List styling: max-h-75, overflow-y-auto, p-2
  - [x] Item styling: rounded-md, px-3, py-2, text-sm, cursor-pointer, `data-[selected=true]:bg-muted`
  - [x] Create barrel export `src/components/features/command-palette/index.ts`

- [x] **Task 3: Create `useCommandPalette` Hook** (AC: 1, 5, 6)
  - [x] Create `src/hooks/useCommandPalette.ts` as `'use client'`
  - [x] Manage `open` state: `const [open, setOpen] = useState(false)`
  - [x] Register global `keydown` listener for Cmd+K / Ctrl+K
  - [x] Return `{ open, setOpen }` for consumer control
  - [x] Export from `src/hooks/index.ts`

- [x] **Task 4: Wire CommandPalette into App Layout** (AC: 1, 5, 6)
  - [x] In `src/app/[locale]/layout.tsx` (or the appropriate client layout wrapper), import and render `CommandPalette`
  - [x] **CRITICAL**: `CommandPalette` needs `'use client'` — if layout is a server component, create a `CommandPaletteProvider` client component that wraps the hook + component together, then render it in the layout
  - [x] Approach: Create `src/components/features/command-palette/CommandPaletteProvider.tsx`:
    ```tsx
    'use client'
    import { useCommandPalette } from '@/hooks'
    import { CommandPalette } from './CommandPalette'

    export function CommandPaletteProvider() {
      const { open, setOpen } = useCommandPalette()
      return <CommandPalette open={open} onOpenChange={setOpen} />
    }
    ```
  - [x] Export `CommandPaletteProvider` from barrel
  - [x] Add `<CommandPaletteProvider />` in the layout (after main content, before closing tags)

- [x] **Task 5: Dialog Animation** (AC: 8)
  - [x] `cmdk`'s `Command.Dialog` uses Radix Dialog internally — uses `overlayClassName` + `contentClassName`
  - [x] CSS keyframe animations in `globals.css`: `cmdk-content-show` (scale 0.95→1 + fade, cubic-bezier(0.16,1,0.3,1)) and `cmdk-overlay-show` (fade 200ms)
  - [x] Reduced motion: handled by global `prefers-reduced-motion` rule (duration 0.01ms)

- [x] **Task 6: Backdrop Styling** (AC: 2, 6)
  - [x] Backdrop: `bg-black/50 backdrop-blur-[8px]` via `overlayClassName`
  - [x] Click outside → close (handled by `Command.Dialog` / Radix internally)

- [x] **Task 7: Accessibility** (AC: 7)
  - [x] `Command.Dialog` sets `role="dialog"` and `aria-modal="true"` via Radix
  - [x] `label` prop for aria-label (localized FR/EN)
  - [x] Focus trap handled by Radix
  - [x] Escape closes dialog (Radix)

- [x] **Task 8: Build Verification** (AC: 9)
  - [x] Run `npm run build` — no errors, 16 pages generated
  - [x] Cmd+K opens the palette
  - [x] Escape closes it
  - [x] Click outside closes it
  - [x] Search input auto-focused
  - [x] Dialog centered, max-w-150, rounded-xl, backdrop blur

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/features/command-palette/CommandPalette.tsx     # Main component
src/components/features/command-palette/CommandPaletteProvider.tsx  # Client wrapper for layout
src/components/features/command-palette/index.ts               # Barrel export
src/hooks/useCommandPalette.ts                                 # Keyboard shortcut + state hook
```

**Modified Files:**
```
src/hooks/index.ts                    # Add useCommandPalette export
src/app/[locale]/layout.tsx           # Add CommandPaletteProvider (or appropriate layout file)
package.json                          # Add cmdk dependency
```

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` on all interactive components and hooks
3. Framer Motion for dialog animation — signature ease `[0.16, 1, 0.3, 1]`
4. `useReducedMotion()` check — instant transitions when preferred
5. Component folder: `components/features/command-palette/` with barrel `index.ts`
6. Hook naming: `useCommandPalette.ts` in `src/hooks/`
7. **DO NOT** use `components/ui/command.tsx` from Shadcn directly — we use `cmdk` raw for full control
8. Tailwind design tokens: `bg-popover`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`

### `cmdk` Library Reference

**Package:** `cmdk` (by Paco Coursey, used by Vercel/Linear/Raycast)

**Components:**
- `Command` — Root wrapper
- `Command.Dialog` — Dialog mode (wraps Radix Dialog)
- `Command.Input` — Search input with auto-filtering
- `Command.List` — Scrollable result list
- `Command.Item` — Selectable item (`onSelect` callback, `value` for ID, `keywords` for search aliases)
- `Command.Group` — Group with `heading` prop
- `Command.Empty` — No-results fallback
- `Command.Separator` — Visual divider
- `Command.Loading` — Loading indicator

**Key props:**
- `Command`: `filter`, `shouldFilter`, `loop` (arrow key wrapping)
- `Command.Dialog`: `open`, `onOpenChange`, `container` (portal target)
- `Command.Item`: `onSelect`, `value`, `keywords`, `disabled`, `forceMount`

**Styling:** Use `data-cmdk-*` CSS selectors or className props. `--cmdk-list-height` CSS var for animated list height.

**Hook:** `useCommandState(selector)` — access internal state (search value, filtered count)

### Dialog Styling Reference (from UX Spec)

```
Position: Centered, max-width 600px
Backdrop: Black 50% + blur 8px
Animation: Scale 0.95→1 + fade
Dismiss: Escape, click outside
Input: Auto-focused, placeholder "Search..."
```

### Localization

The `CommandPalette` component needs locale access. Use `useLanguage()` from `@/contexts` to get current locale for:
- Input placeholder: "Rechercher..." / "Search..."
- Empty state: "Aucun résultat" / "No results found"
- Dialog aria-label: "Palette de commandes" / "Command palette"

### Previous Story Intelligence (4.4)

**From Story 4.4 (Panel Transitions):**
- Signature ease: `[0.16, 1, 0.3, 1]` for enter, `easeIn` for exit
- `useReducedMotion()` from `@/hooks` — check before applying motion
- `AnimatePresence mode="wait"` for exit → enter sequencing
- All motion elements need explicit `exit` variant

**From Code Review (4.2/4.3/4.4):**
- Use `motion-reduce:transition-none` on CSS transitions for reduced motion
- Derive data from existing sources instead of hardcoding
- Validate external inputs (URLs, user data)
- Keep deps arrays stable (use derived keys, not object references)

### Layout Integration Strategy

The app layout at `src/app/[locale]/layout.tsx` is likely a **server component**. The `CommandPaletteProvider` must be a client component that can be rendered anywhere in the tree. It doesn't need to wrap other components — it just renders the dialog overlay.

Pattern:
```tsx
// layout.tsx (server)
import { CommandPaletteProvider } from '@/components/features/command-palette'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CommandPaletteProvider />
      </body>
    </html>
  )
}
```

### Scope Notes

- This story creates the **shell** — no navigation commands yet (Story 5-2)
- No theme/language commands yet (Story 5-3)
- No fuzzy search yet (Story 5-4) — `cmdk` has built-in filtering but custom fuzzy will be added later
- No keyboard arrow nav polish yet (Story 5-5) — `cmdk` handles basics
- No shortcuts hint bar (Story 5-6)
- Mobile command palette is Epic 6

### Dependencies

- **Requires**: None (first story in Epic 5)
- **Enables**: Stories 5-2 through 5-6 (all depend on this core)

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Component structure, animation rules
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Command palette specs, dialog styling
- [cmdk GitHub](https://github.com/dip/cmdk) — Library API
- [Epics](/_bmad-output/planning-artifacts/epics.md#epic-5) — Story requirements

### Testing Checklist

- [ ] `npm install cmdk` succeeds
- [ ] Cmd+K (Mac) / Ctrl+K (Win) opens palette
- [ ] Escape closes palette
- [ ] Click outside closes palette
- [ ] Search input auto-focused on open
- [ ] Dialog centered, max-w-600, rounded, backdrop blur
- [ ] Scale + fade animation on open/close
- [ ] Reduced motion: instant open/close
- [ ] `role="dialog"` and `aria-modal="true"` present
- [ ] Focus trapped inside dialog
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Installed `cmdk@1.1.1` — Radix Dialog-based command menu
- Created `CommandPalette` component using `Command.Dialog` with `overlayClassName` + `contentClassName` for native Radix styling
- Used CSS keyframe animations instead of Framer Motion (Radix portal prevents wrapping with motion.div)
- `cmdk-content-show`: scale 0.95→1 + fade, signature cubic-bezier(0.16,1,0.3,1)
- `cmdk-overlay-show`: fade 200ms ease-out
- Reduced motion handled by existing global `prefers-reduced-motion` rule (all animations/transitions → 0.01ms)
- Created `useCommandPalette` hook: global Cmd+K / Ctrl+K listener, toggle state
- Created `CommandPaletteProvider` client wrapper for server layout integration
- Wired into `[locale]/layout.tsx` inside `LanguageProvider` — locale-aware labels (FR/EN)
- Placeholder navigation items (Home, Projects, About) — real navigation commands in Story 5-2
- Applied Tailwind v4 canonical classes: `max-w-150`, `max-h-75`, `**:[[cmdk-group-heading]]` selectors
- `Command.Dialog` handles: focus trap, Escape close, click-outside close, role="dialog", aria-modal="true"
- Build passes — 16 pages generated

### File List

- `src/components/features/command-palette/CommandPalette.tsx` (new)
- `src/components/features/command-palette/CommandPaletteProvider.tsx` (new)
- `src/components/features/command-palette/index.ts` (new)
- `src/hooks/useCommandPalette.ts` (new)
- `src/hooks/index.ts` (modified — added useCommandPalette export)
- `src/app/[locale]/layout.tsx` (modified — added CommandPaletteProvider)
- `src/app/globals.css` (modified — added cmdk dialog CSS keyframes)
- `package.json` (modified — added cmdk dependency)
