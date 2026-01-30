# Story 7.10: Command Palette Usage Tracking

Status: done

## Story

**As** Baptiste,
**I want** to know how many visitors use the command palette,
**So that** I can gauge if this feature resonates with users.

## Acceptance Criteria

1. **AC1**: Un événement est tracké quand le Command Palette est ouvert (`command_palette_opened`)
2. **AC2**: Les commandes exécutées sont trackées (navigation, theme change, etc.)
3. **AC3**: Le tracking utilise Vercel Analytics custom events
4. **AC4**: Aucune donnée sensible n'est incluse dans les événements
5. **AC5**: Le tracking n'affecte pas la performance du palette
6. **AC6**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Ajouter le tracking d'ouverture** (AC: 1, 3)
  - [x] Lire `src/components/features/command-palette/CommandPalette.tsx` ✅
  - [x] Importer `track` de `@vercel/analytics` ✅
  - [x] Ajouter `track('command_palette_opened')` quand le palette s'ouvre ✅
  - [x] Pattern : `useEffect` + `useRef` sur `open` state (track uniquement à l'ouverture)

- [x] **Task 2: Ajouter le tracking des commandes** (AC: 2, 3, 4)
  - [x] Identifié les actions : navigation, theme_change, language_change ✅
  - [x] Tracké chaque type d'action :
    - `track('command_executed', { type: 'navigation', target: href })` ✅
    - `track('command_executed', { type: 'theme_change', value: cmd.theme })` ✅
    - `track('command_executed', { type: 'language_change', value: newLocale })` ✅
  - [x] Aucune donnée personnelle incluse ✅

- [x] **Task 3: Vérifier la performance** (AC: 5)
  - [x] `track()` est fire-and-forget, pas de `await` ✅
  - [x] Palette reste réactif ✅

- [x] **Task 4: Build Verification** (AC: 6)
  - [x] Run `npm run build` — no errors ✅
  - [ ] Test : Cmd+K → vérifier dans le Network tab (manual, prod only)
  - [ ] Test : Exécuter une commande → event tracké (manual, prod only)

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/components/features/command-palette/CommandPalette.tsx  # track() calls
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. `track()` est noop en dev local — normal
4. Pas de données personnelles dans les events
5. Event names en snake_case : `command_palette_opened`, `command_executed`

### Tracking Pattern

```tsx
import { track } from '@vercel/analytics'

// Ouverture
useEffect(() => {
  if (open) {
    track('command_palette_opened')
  }
}, [open])

// Exécution de commande
function handleSelect(item: CommandItem) {
  track('command_executed', {
    type: item.type,       // 'navigation' | 'theme' | 'language'
    target: item.label,    // 'Projects' | 'dark' | 'English'
  })
  // ... existing logic
}
```

### Dependencies

- **Requires**: Story 7-9 (Vercel Analytics installé)
- **New packages**: Aucun (`@vercel/analytics` déjà installé via 7-9)

### References

- [Vercel Analytics Custom Events](https://vercel.com/docs/analytics/custom-events)
- [CommandPalette](src/components/features/command-palette/CommandPalette.tsx)
- [track() API](https://vercel.com/docs/analytics/custom-events#track)

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Pas d'erreur console en dev (track est noop)
- [ ] En production : event `command_palette_opened` visible dans Vercel Dashboard
- [ ] En production : event `command_executed` avec type et target
- [ ] Palette reste réactif (pas de lag au tracking)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

- Importé `track` de `@vercel/analytics` dans CommandPalette.tsx
- Ajouté tracking d'ouverture via `useEffect` + `useRef` : `track('command_palette_opened')` uniquement à la transition closed→open
- Ajouté `track('command_executed', { type, target/value })` pour les 3 types d'actions : navigation, theme_change, language_change
- Theme tracking ajouté dans les deux code paths (searchable items + grouped view)
- Tous les appels `track()` sont fire-and-forget (pas de `await`), noop en dev
- Build passe sans erreurs

### File List

- `src/components/features/command-palette/CommandPalette.tsx` — MODIFIED: ajout track() pour ouverture + commandes
