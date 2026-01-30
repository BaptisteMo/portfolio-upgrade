# Story 7.11: Easter Egg - Konami Code

Status: done

## Story

**As a** curious visitor,
**I want** to discover a hidden Easter egg,
**So that** I can see Baptiste's playful attention to detail.

## Acceptance Criteria

1. **AC1**: La séquence Konami (↑↑↓↓←→←→BA) active le mode Design Forensics
2. **AC2**: Un overlay visuel apparaît montrant : grille design, wireframe skeleton, contours des composants
3. **AC3**: Un son subtil est joué (optionnel, respecte la préférence muted)
4. **AC4**: Le mode peut être désactivé via Escape ou en re-entrant le code
5. **AC5**: La découverte de l'easter egg est trackée via analytics
6. **AC6**: Le mode ne casse aucune fonctionnalité
7. **AC7**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Créer le hook useKonamiCode** (AC: 1)
  - [x] Créer `src/hooks/useKonamiCode.ts` ✅
  - [x] Écouter les événements `keydown` pour la séquence complète ✅
  - [x] Retourner `isActive: boolean` et `toggle: () => void` ✅
  - [x] Reset la séquence après 2 secondes d'inactivité ✅
  - [x] Exporter depuis `src/hooks/index.ts` ✅

- [x] **Task 2: Créer le composant DesignForensicsOverlay** (AC: 2, 6)
  - [x] Créer `src/components/features/easter-egg/DesignForensicsOverlay.tsx` ✅
  - [x] Créer `src/components/features/easter-egg/index.ts` barrel export ✅
  - [x] Overlay fixe plein écran avec `pointer-events-none` ✅
  - [x] Grille 8 colonnes desktop / 4 mobile, contours composants, label ✅
  - [x] Animation fade-in via framer-motion ✅
  - [x] `z-index: 9999` ✅

- [x] **Task 3: Son optionnel** (AC: 3)
  - [x] Omis — trop complexe pour la valeur ajoutée

- [x] **Task 4: Intégrer dans le layout** (AC: 1, 4)
  - [x] `LazyDesignForensicsOverlay` via `next/dynamic` + `ssr: false` ✅
  - [x] Ajouté dans `src/app/[locale]/layout.tsx` ✅
  - [x] Escape ou re-entrée du code → désactiver ✅

- [x] **Task 5: Tracker la découverte** (AC: 5)
  - [x] `track('easter_egg_discovered', { type: 'konami_code' })` — une seule fois via `useRef` ✅

- [x] **Task 6: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors ✅
  - [ ] Test : Entrer le Konami code → overlay apparaît (manual)
  - [ ] Test : Escape → overlay disparaît (manual)
  - [ ] Test : Re-entrer le code → overlay disparaît (manual)
  - [ ] Test : Interactions sous l'overlay fonctionnent (pointer-events-none)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/hooks/useKonamiCode.ts
src/components/features/easter-egg/DesignForensicsOverlay.tsx
src/components/features/easter-egg/index.ts
public/sounds/forensics.mp3                        # Optionnel
```

**Modified Files:**
```
src/hooks/index.ts                                  # Export useKonamiCode
src/app/[locale]/layout.tsx                         # Intégration (dynamic import)
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. `'use client'` pour le hook et l'overlay
4. Dynamic import pour l'overlay — pas dans le bundle initial
5. `pointer-events-none` — l'overlay ne doit JAMAIS bloquer l'interaction

### Konami Code Pattern

```tsx
// useKonamiCode.ts
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA']

export function useKonamiCode() {
  const [isActive, setIsActive] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      clearTimeout(timeoutRef.current)
      if (e.code === KONAMI[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI.length) {
          setIsActive(prev => !prev)
          indexRef.current = 0
        }
        timeoutRef.current = setTimeout(() => { indexRef.current = 0 }, 2000)
      } else {
        indexRef.current = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { isActive, toggle: () => setIsActive(prev => !prev) }
}
```

### Dependencies

- **Requires**: Story 7-9 (analytics pour le tracking)
- **New packages**: Aucun

### References

- [Hooks barrel](src/hooks/index.ts)
- [Features barrel](src/components/features/index.ts)
- [locale layout](src/app/[locale]/layout.tsx) — Point d'intégration

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Konami code ↑↑↓↓←→←→BA → overlay visible
- [ ] Escape → overlay masqué
- [ ] Re-entrer le code → overlay toggle
- [ ] Interactions sous l'overlay fonctionnent
- [ ] Analytics : event `easter_egg_discovered` tracké (prod only)
- [ ] Bundle : overlay non inclus dans le chunk initial

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

- Créé `useKonamiCode` hook : écoute keydown, vérifie la séquence Konami (10 touches), toggle isActive, reset après 2s d'inactivité
- Créé `DesignForensicsOverlay` : grille 8 colonnes (4 mobile), baseline grid horizontale, contours composants via body class CSS, label "Design Forensics Mode"
- Dynamic import via `LazyDesignForensicsOverlay` (`next/dynamic`, `ssr: false`) — pas dans le bundle initial
- Escape ferme l'overlay, re-entrée du code toggle
- Tracking analytics : `easter_egg_discovered` une seule fois par session via `useRef`
- `pointer-events-none` — l'overlay ne bloque aucune interaction
- Son optionnel omis
- Build passe sans erreurs

### File List

- `src/hooks/useKonamiCode.ts` — NEW: hook Konami sequence detection
- `src/hooks/index.ts` — MODIFIED: export useKonamiCode
- `src/components/features/easter-egg/DesignForensicsOverlay.tsx` — NEW: overlay component
- `src/components/features/easter-egg/LazyDesignForensicsOverlay.tsx` — NEW: dynamic import wrapper
- `src/components/features/easter-egg/index.ts` — NEW: barrel export
- `src/app/[locale]/layout.tsx` — MODIFIED: ajout LazyDesignForensicsOverlay
