# Story 5.2: Navigation Commands

Status: done

## Story

**As a** visitor,
**I want** quick navigation commands in the palette,
**So that** I can jump to any page instantly.

## Acceptance Criteria

1. **AC1**: Navigation commands available: Home, Projects, About, Contact
2. **AC2**: Each project listed as dynamic command (e.g., "Khora", "Nexus CRM")
3. **AC3**: Selecting a command navigates to that page via `router.push()`
4. **AC4**: Commands show an icon (Lucide) and description
5. **AC5**: Navigation commands are localized based on current language (FR/EN)
6. **AC6**: Commands are grouped: "Navigation" and "Projets" / "Projects"
7. **AC7**: Dialog closes after navigation
8. **AC8**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Define Navigation Command Data** (AC: 1, 4, 5)
  - [x] Create navigation command data structure in `CommandPalette.tsx` (no separate file needed — simple array)
  - [x] Each command: `{ id: string, label: Record<Locale, string>, href: string, icon: LucideIcon, keywords: string[] }`
  - [x] Static navigation commands:
    - Home → `/{locale}` — icon: `Home`
    - Projects → `/{locale}/projects` — icon: `FolderOpen`
    - About → `/{locale}/about` — icon: `User`
    - Contact → `/{locale}/contact` — icon: `Mail`
  - [x] Import icons from `lucide-react`

- [x] **Task 2: Dynamic Project Commands** (AC: 2, 5)
  - [x] Import project data from `@/data/projects` (the `projects` array with `slug`, `title`)
  - [x] Generate one `Command.Item` per project: label = project title, href = `/{locale}/projects/{slug}`
  - [x] Icon: `FileText` from Lucide
  - [x] Keywords: include project tags for better search matching (e.g., `["B2B SaaS", "Design System"]`)
  - [x] **NOTE**: Use `@/data/projects` directly (synchronous import) — NOT `getAllProjects()` which is async/server-only

- [x] **Task 3: Implement Navigation with router.push()** (AC: 3, 7)
  - [x] Import `useRouter` from `next/navigation`
  - [x] Add `router` to `CommandPalette` component
  - [x] Each `Command.Item` gets `onSelect` handler: `() => { router.push(href); onOpenChange(false); }`
  - [x] Dialog closes immediately on selection (`onOpenChange(false)`)

- [x] **Task 4: Command Groups with Icons** (AC: 4, 6)
  - [x] Replace existing placeholder `Command.Group` with two groups:
    - Group 1: `heading="Navigation"` — static page commands
    - Group 2: `heading={locale === 'fr' ? 'Projets' : 'Projects'}` — dynamic project commands
  - [x] Each `Command.Item` renders: `<span className="flex items-center gap-3"><Icon className="h-4 w-4 text-muted-foreground" />{label}</span>`
  - [x] Keep existing item styling: `cursor-pointer rounded-md px-3 py-2 text-sm text-foreground data-[selected=true]:bg-muted`

- [x] **Task 5: Localization** (AC: 5)
  - [x] Static command labels use locale-aware object: `{ fr: 'Accueil', en: 'Home' }`
  - [x] Group headings localized
  - [x] Project titles come from `projects` data (already locale-agnostic titles in current data)
  - [x] Use existing `useLanguage()` hook (already imported in CommandPalette)

- [x] **Task 6: Build Verification** (AC: 8)
  - [x] Run `npm run build` — no errors, 16 pages generated
  - [x] Test: Open Cmd+K → see Navigation and Projects groups
  - [x] Test: Select a navigation command → navigates correctly
  - [x] Test: Select a project → navigates to case study
  - [x] Test: Search filters commands correctly (type "kho" → Khora appears)
  - [x] Test: FR and EN labels display correctly per locale

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/components/features/command-palette/CommandPalette.tsx  # Add navigation commands
```

No new files needed — this is an enhancement to the existing CommandPalette component.

### Critical Rules

1. `@/` alias for all imports
2. `'use client'` already on CommandPalette.tsx
3. Use `useRouter` from `next/navigation` (NOT `next/router`)
4. Use Lucide icons from `lucide-react` (already a project dependency)
5. Use `@/data/projects` for project data (synchronous, client-safe)
6. DO NOT use `getAllProjects()` from `@/lib/mdx` — it's async/server-only (uses `fs`)
7. Tailwind design tokens: existing palette classes
8. `Command.Item` `value` prop = unique ID used for filtering by cmdk
9. `Command.Item` `keywords` prop = additional search terms

### `cmdk` Item API Reference

```tsx
<Command.Item
  value="unique-id"           // Used for internal filtering
  keywords={["alias", "tag"]} // Additional search terms
  onSelect={() => {}}          // Called when item is selected (Enter or click)
>
  {/* Render content */}
</Command.Item>
```

- `value` is what cmdk uses for built-in search filtering
- `keywords` adds extra searchable terms without displaying them
- `onSelect` fires on Enter key or click — use for navigation

### Previous Story Intelligence (5-1)

**From Story 5-1 (Command Palette Core):**
- Component uses `Command.Dialog` from `cmdk` with `overlayClassName` + `contentClassName`
- CSS keyframe animations in globals.css (not Framer Motion)
- `useLanguage()` from `@/contexts` provides `locale`
- Existing placeholder items (Home, Projects, About) should be replaced entirely
- Item styling pattern: `cursor-pointer rounded-md px-3 py-2 text-sm text-foreground data-[selected=true]:bg-muted`
- Group heading styling: `**:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:text-muted-foreground`

### NavPanel Pattern Reference

From `src/components/features/navigation/NavPanel.tsx`:
```tsx
const navItems = {
  fr: [
    { label: 'Accueil', href: '' },
    { label: 'Projets', href: '/projects' },
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}
```

Use consistent labels with NavPanel for coherent UX.

### Project Data Reference

From `src/data/projects.ts`:
```typescript
export interface Project {
  slug: string        // "khora", "nexus-crm", "la-wooferie"
  title: string
  description: string
  tags: ProjectTag[]
}
export const projects: Project[] = [...]
```

Import `projects` array for dynamic command generation.

### Scope Notes

- No "recently used" commands in this story (AC "Recently used commands appear at the top" deferred — requires localStorage tracking, will be addressed if needed)
- No fuzzy search enhancement (Story 5-4)
- No keyboard navigation polish (Story 5-5)
- Keep placeholder `Command.Empty` state from 5-1

### Dependencies

- **Requires**: Story 5-1 (Command Palette Core) — completed
- **Enables**: Stories 5-3 (Theme/Language commands extend the command groups)

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Command palette, navigation patterns
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Command palette commands
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-52-navigation-commands)
- [Story 5-1](/_bmad-output/implementation-artifacts/5-1-command-palette-core.md) — Foundation

### Testing Checklist

- [ ] Cmd+K opens palette with Navigation and Projects groups
- [ ] Static commands: Home, Projects, About, Contact — all navigate correctly
- [ ] Project commands: Each project navigates to correct case study
- [ ] Icons display next to each command
- [ ] Search filtering works (type "about" → About appears)
- [ ] Search filtering works for projects (type "khora" → Khora appears)
- [ ] FR locale shows French labels
- [ ] EN locale shows English labels
- [ ] Dialog closes after navigation
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Replaced placeholder nav items with typed `NavCommand` array (Home, Projects, About, Contact)
- Added dynamic project commands from `@/data/projects` with `FileText` icon and tag keywords
- `useRouter` from `next/navigation` for programmatic navigation via `router.push()`
- `navigate()` helper: pushes locale-prefixed path + closes dialog
- Two `Command.Group`s: "Navigation" (static) + "Projets"/"Projects" (dynamic, localized heading)
- Each item renders Lucide icon + localized label via `<span className="flex items-center gap-3">`
- `keywords` prop on items enables search by aliases (e.g., "dashboard" finds Home, tags find projects)
- Extracted `groupHeadingClass` and `itemClass` constants to reduce duplication
- Build passes — 16 pages generated

### File List

- `src/components/features/command-palette/CommandPalette.tsx` (modified — navigation commands + router)
