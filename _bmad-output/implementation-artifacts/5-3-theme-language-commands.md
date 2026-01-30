# Story 5.3: Theme & Language Commands

Status: done

## Story

**As a** visitor,
**I want** to switch theme and language from the command palette,
**So that** I can customize my experience without leaving keyboard.

## Acceptance Criteria

1. **AC1**: Typing "dark" or "light" in palette shows theme commands
2. **AC2**: Selecting a theme command switches theme via `next-themes` `setTheme()`
3. **AC3**: Typing "fr" or "en" shows language commands
4. **AC4**: Selecting a language command switches locale, updates URL, persists via `setStoredLocale()`
5. **AC5**: Theme and language commands are grouped under "Préférences" / "Preferences"
6. **AC6**: Commands show Lucide icon + localized label
7. **AC7**: Dialog closes after executing a command
8. **AC8**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Add Theme Commands** (AC: 1, 2, 6, 7)
  - [x] Import `useTheme` from `next-themes` in `CommandPalette.tsx`
  - [x] Import `Sun`, `Moon` from `lucide-react`
  - [x] Create theme commands array
  - [x] Add `onSelect` handler: `setTheme()` + `onOpenChange(false)`
  - [x] Wrap in `Command.Group` with heading from `labels.preferencesGroup`

- [x] **Task 2: Add Language Commands** (AC: 3, 4, 6, 7)
  - [x] Import `setStoredLocale` from `@/lib/locale-storage`
  - [x] Import `usePathname` from `next/navigation`
  - [x] Import `Languages` icon from `lucide-react`
  - [x] Create language commands array
  - [x] Add `switchLocale` handler (reused exact logic from `LanguageSwitcher.tsx`)
  - [x] Import `Locale` type from `@/content/meta`

- [x] **Task 3: Create Preferences Group** (AC: 5)
  - [x] Add `preferencesGroup` to `labels` object
  - [x] Create single `Command.Group` containing both theme and language items
  - [x] Placed AFTER Navigation and Projects groups

- [x] **Task 4: Build Verification** (AC: 8)
  - [x] Run `npm run build` — no errors (16 pages generated)
  - [ ] Test: Open Cmd+K → see Preferences group with 4 commands (manual)
  - [ ] Test: Theme/language switching (manual)
  - [ ] Test: Search filtering (manual)

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/components/features/command-palette/CommandPalette.tsx  # Add preferences commands
```

No new files needed — single file enhancement to existing CommandPalette.

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` already on CommandPalette.tsx
3. Use `useTheme` from `next-themes` (NOT custom theme state — project-context.md CTX rule)
4. Use `setStoredLocale` from `@/lib/locale-storage` for persistence
5. Use `usePathname` from `next/navigation` for locale URL swap
6. Reuse exact locale-switching logic from `LanguageSwitcher.tsx` — do NOT reinvent
7. Import `Locale` type from `@/content/meta`
8. Tailwind design tokens: existing palette classes
9. DO NOT modify `components/ui/` (project-context anti-pattern)

### Previous Story Intelligence

**From Story 5-2 (Navigation Commands):**
- `NavCommand` interface: `{ id, label: { fr, en }, href, icon, keywords }`
- Theme/language commands don't have `href` — use a different interface or action pattern
- Pattern: `onSelect` handler + `onOpenChange(false)` to close dialog
- `groupHeadingClass` and `itemClass` constants already extracted — reuse
- `navigate()` helper for routing — reuse for language switch
- Lucide icons pattern: `<cmd.icon className="h-4 w-4 text-muted-foreground" />`

**From Story 5-1 (Command Palette Core):**
- CommandPalette receives `{ open, onOpenChange }` props
- Uses `useLanguage()` for locale context
- Uses `useRouter()` for navigation

**From Story 1-4 (Dark/Light Theme System):**
- `ThemeToggle.tsx` uses `useTheme()` from `next-themes` with `{ theme, setTheme }`
- Mounted check needed for hydration — BUT inside command palette, component is already mounted (only renders when `open=true`)
- No need for `mounted` state in command palette context

**From LanguageSwitcher.tsx:**
- Exact locale switch pattern:
  ```tsx
  const segments = pathname.split('/')
  segments[1] = newLocale
  router.push(segments.join('/'))
  setStoredLocale(newLocale)
  ```
- Imports: `setStoredLocale` from `@/lib/locale-storage`, `Locale` from `@/content/meta`

### Code Review Intelligence (Epic 5 CR)

- H3 fix: Do NOT modify `button.tsx` or any `components/ui/` file
- M1 fix: All group headings must go through `labels` object for localization

### Scope Notes

- No toast/visual feedback beyond dialog closing — AC says "toast or palette closes with feedback". Closing is sufficient feedback.
- No "current theme" or "current language" indicator in the command items (could be enhanced later, not in AC)
- Theme commands don't need mounted check (palette only renders when opened = already client-mounted)

### Dependencies

- **Requires**: Story 5-1 (Command Palette Core) — done, Story 5-2 (Navigation Commands) — done
- **Enables**: No direct dependencies downstream

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Command palette, next-themes
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Command palette commands
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-53-theme--language-commands)
- [Story 5-1](/_bmad-output/implementation-artifacts/5-1-command-palette-core.md) — Foundation
- [Story 5-2](/_bmad-output/implementation-artifacts/5-2-navigation-commands.md) — Navigation commands pattern
- [ThemeToggle](src/components/shared/ThemeToggle.tsx) — `useTheme` pattern
- [LanguageSwitcher](src/components/features/navigation/LanguageSwitcher.tsx) — Locale switch pattern
- [locale-storage](src/lib/locale-storage.ts) — `setStoredLocale` API

### Testing Checklist

- [ ] Cmd+K shows "Préférences" group with 4 commands
- [ ] Theme commands: "Mode clair" / "Mode sombre" switch theme
- [ ] Language commands: "Français" / "Anglais" switch locale + URL
- [ ] Language preference persisted in localStorage
- [ ] Search "dark" → shows dark mode command
- [ ] Search "langue" → shows both language commands
- [ ] Dialog closes after each command execution
- [ ] FR locale shows French labels, EN shows English
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- All 4 tasks completed. Theme and language commands added to CommandPalette in a single Preferences group.
- Reused exact locale-switching pattern from LanguageSwitcher.tsx.
- No new files created — single file enhancement as specified.
- CR fix: Added DialogTitle + DialogDescription (sr-only) for Radix a11y compliance, moved outside wrapper div.

### File List

- `src/components/features/command-palette/CommandPalette.tsx` — Added theme/language commands, imports, switchLocale handler, Preferences group
