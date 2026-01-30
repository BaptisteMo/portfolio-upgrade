# Story 6.5: Mobile FAB Component

Status: done

## Story

**As a** mobile visitor,
**I want** a floating action button to access the context panel,
**So that** I can see additional information without losing my place.

## Acceptance Criteria

1. **AC1**: Un FAB (56×56px) apparaît en bas à droite sur mobile (< 1024px, breakpoint `lg`)
2. **AC2**: Le FAB utilise une icône info/panel (lucide-react)
3. **AC3**: Le FAB a un touch target suffisant (≥ 44×44px — 56px > 44px ✓)
4. **AC4**: Le FAB est en position fixed et n'interfère pas avec le contenu
5. **AC5**: Le FAB n'est PAS visible sur desktop (≥ 1024px)
6. **AC6**: Le FAB est accessible avec `aria-label="Open context panel"` (localisé)
7. **AC7**: Le FAB n'apparaît QUE sur les pages case study (là où le ContextPanel a du contenu)
8. **AC8**: Le FAB gère un état open/close pour déclencher le bottom sheet (Story 6-6)
9. **AC9**: Le build passe sans erreurs

## Tasks / Subtasks

- [ ] **Task 1: Créer le hook useMediaQuery** (AC: 1, 5)
  - [ ] Créer `src/hooks/useMediaQuery.ts`
  - [ ] Exporter `useMediaQuery(query: string): boolean`
  - [ ] Utiliser `window.matchMedia` avec listener `change`
  - [ ] SSR-safe : retourner `false` côté serveur (check `typeof window`)
  - [ ] Cleanup du listener dans le `useEffect` return
  - [ ] Ajouter au barrel export `src/hooks/index.ts`

- [ ] **Task 2: Créer le composant MobileFAB** (AC: 1, 2, 3, 4, 5, 6, 8)
  - [ ] Créer `src/components/features/mobile-fab/MobileFAB.tsx`
  - [ ] Créer `src/components/features/mobile-fab/index.ts` barrel export
  - [ ] `'use client'` — utilise hooks, state, Framer Motion
  - [ ] Props : `onToggle: () => void`, `isOpen: boolean`
  - [ ] Utiliser `useMediaQuery('(max-width: 1023px)')` pour conditionner le rendu
  - [ ] Icône : `PanelRightOpen` de lucide-react (ou `Info`) — switch vers `X` quand `isOpen`
  - [ ] Position : `fixed bottom-6 right-6 z-30`
  - [ ] Taille : `w-14 h-14` (56px)
  - [ ] Style : `rounded-full bg-primary text-primary-foreground shadow-lg`
  - [ ] Hover : `hover:bg-primary/90`
  - [ ] Active : `active:scale-95 transition-transform`
  - [ ] `aria-label` localisé : FR "Ouvrir le panneau contextuel" / EN "Open context panel"
  - [ ] Quand `isOpen` : `aria-label` = FR "Fermer le panneau" / EN "Close panel"
  - [ ] Framer Motion : `AnimatePresence` + `motion.button` avec `scale: [0, 1]` à l'entrée
  - [ ] `useReducedMotion` : si activé, pas d'animation scale

- [ ] **Task 3: Intégrer le FAB dans CaseStudyShell** (AC: 7, 8)
  - [ ] Modifier `src/components/features/case-study/CaseStudyShell.tsx`
  - [ ] Ajouter un state `const [panelOpen, setPanelOpen] = useState(false)`
  - [ ] Rendre `<MobileFAB isOpen={panelOpen} onToggle={() => setPanelOpen(!panelOpen)} />`
  - [ ] Le FAB est rendu dans CaseStudyShell (pas dans TriPanelLayout) car il est spécifique aux case studies
  - [ ] Le state `panelOpen` sera utilisé par Story 6-6 pour le bottom sheet

- [ ] **Task 4: Mettre à jour les barrel exports** (AC: 7)
  - [ ] Ajouter `MobileFAB` au barrel `src/components/features/mobile-fab/index.ts`
  - [ ] Ajouter à `src/components/features/index.ts`
  - [ ] Ajouter `useMediaQuery` à `src/hooks/index.ts`

- [ ] **Task 5: Build Verification** (AC: 9)
  - [ ] Run `npm run build` — no errors
  - [ ] Test : FAB visible sur mobile (< 1024px) sur page case study (manual)
  - [ ] Test : FAB invisible sur desktop (manual)
  - [ ] Test : FAB invisible sur pages non-case-study (home, about, contact) (manual)
  - [ ] Test : Click → toggle state (icône change) (manual)
  - [ ] Test : Accessibility — aria-label correct (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/hooks/useMediaQuery.ts                              # Hook responsive
src/components/features/mobile-fab/MobileFAB.tsx        # Composant FAB
src/components/features/mobile-fab/index.ts             # Barrel export
```

**Modified Files:**
```
src/components/features/case-study/CaseStudyShell.tsx   # Intégration FAB + state
src/components/features/index.ts                        # Barrel export
src/hooks/index.ts                                      # Barrel export
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` sur MobileFAB (hooks + state + Framer Motion)
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. Framer Motion pour animations (PAS GSAP)
5. Tailwind design tokens pour le styling
6. `useReducedMotion` pour respecter les préférences accessibilité

### Z-Index Map

```
z-10  — TriPanelLayout nav + panel (desktop)
z-30  — MobileFAB (NEW)
z-40  — ShortcutsBar (desktop only, top-right)
z-50  — SplashScreen, CommandPalette overlay
```

Le FAB à `z-30` est au-dessus du contenu mais sous la CommandPalette. Pas de conflit avec ShortcutsBar (desktop-only, top-right).

### useMediaQuery Hook Pattern

```tsx
// src/hooks/useMediaQuery.ts
'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
```

**Note** : `useState(false)` pour SSR safety — le FAB n'est pas rendu au SSR, il apparaît après hydration. Pas de flash car le FAB est un ajout visuel (pas un retrait).

### MobileFAB Component Pattern

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PanelRightOpen, X } from 'lucide-react'
import { useLanguage } from '@/contexts'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks'

interface MobileFABProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileFAB({ isOpen, onToggle }: MobileFABProps) {
  const { locale } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const reducedMotion = useReducedMotion()

  const label = isOpen
    ? locale === 'fr' ? 'Fermer le panneau' : 'Close panel'
    : locale === 'fr' ? 'Ouvrir le panneau contextuel' : 'Open context panel'

  const Icon = isOpen ? X : PanelRightOpen

  return (
    <AnimatePresence>
      {isMobile && (
        <motion.button
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={onToggle}
          aria-label={label}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 active:scale-95"
        >
          <Icon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

### CaseStudyShell Integration

```tsx
// Dans CaseStudyShell.tsx — ajouter :
import { useState } from 'react'
import { MobileFAB } from '@/components/features/mobile-fab'

// Dans le composant :
const [panelOpen, setPanelOpen] = useState(false)

// Dans le JSX, après TriPanelLayout :
<MobileFAB isOpen={panelOpen} onToggle={() => setPanelOpen(prev => !prev)} />
```

**Note** : Le state `panelOpen` sera consommé par Story 6-6 (Bottom Sheet) pour afficher/masquer le contenu du panel contextuel sur mobile.

### TriPanelLayout — État actuel responsive

```
Desktop (≥ 1024px) :
┌──────┬──────────────────────────┬──────────┐
│ Nav  │       Content            │  Panel   │
│ 15%  │       (scroll)           │   20%    │
│fixed │                          │  fixed   │
└──────┴──────────────────────────┴──────────┘

Mobile (< 1024px) :
┌──────────────────────────────────────────┐
│              Content only                │
│           (single column)                │
│                                          │
│                                  [FAB] ← │  NEW (Story 6-5)
└──────────────────────────────────────────┘
```

Le ContextPanel est complètement masqué sur mobile (`hidden lg:block`). Le FAB est le point d'accès mobile au contenu contextuel.

### ContextPanel — Données disponibles

Le ContextPanel reçoit `sections` et `activeSection` depuis CaseStudyShell. Ces mêmes props seront passées au bottom sheet (Story 6-6). Le FAB ne manipule pas les données — il toggle juste l'ouverture.

### Existing Hook: useReducedMotion

```tsx
// Déjà dans src/hooks/useReducedMotion.ts
export function useReducedMotion(): boolean
```

Utilisé dans le FAB pour désactiver l'animation scale à l'entrée si l'utilisateur préfère le mouvement réduit.

### Breakpoint Choice

L'AC dit `< 768px` mais le TriPanelLayout utilise le breakpoint `lg` (1024px) pour basculer entre desktop et mobile. **Utiliser 1024px** (cohérent avec le layout existant) plutôt que 768px — le FAB apparaît exactement quand le panel contextuel disparaît.

### Previous Story Intelligence

**From Story 4-1 (Context Panel Component):**
- `ContextPanel` composant dans `src/components/features/context-panel/`
- Props : `sections: ContextSection[]`, `activeSection: string`
- Utilise `AnimatePresence` pour transitions entre sections
- Rendu dans le slot `panel` de `TriPanelLayout`

**From Story 4-2 (Scroll Synchronization):**
- `useActiveSection` hook dans `src/hooks/`
- `CaseStudyShell` orchestre le tout : `activeSection` + `sections` + layout

**From Story 5-6 (Shortcuts Bar):**
- Pattern de composant fixed avec `AnimatePresence`
- Z-index `z-40` (ShortcutsBar est desktop-only, pas de conflit)

### Dependencies

- **Requires**: Story 4-1 done (ContextPanel existe)
- **New packages**: Aucun
- **Enables**: Story 6-6 (Bottom Sheet — utilise le state `panelOpen` du FAB)

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CIP-03 : Comportement Responsive Panel
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — UX-02 : Mobile Panel Pattern FAB + Bottom Sheet
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 6.5
- [TriPanelLayout](src/components/layout/TriPanelLayout/TriPanelLayout.tsx) — Layout responsive
- [CaseStudyShell](src/components/features/case-study/CaseStudyShell.tsx) — Point d'intégration
- [ContextPanel](src/components/features/context-panel/ContextPanel.tsx) — Contenu à exposer

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] FAB visible sur viewport < 1024px sur page case study
- [ ] FAB invisible sur viewport ≥ 1024px
- [ ] FAB invisible sur home, about, contact, projects list
- [ ] Click FAB → isOpen toggle (icône PanelRightOpen ↔ X)
- [ ] aria-label correct en FR et EN
- [ ] aria-label change quand isOpen toggle
- [ ] Animation entrée smooth (scale + opacity)
- [ ] Reduced motion : pas d'animation scale
- [ ] Touch target ≥ 44px (le FAB est 56px ✓)
- [ ] Pas de conflit z-index avec CommandPalette ou ShortcutsBar
- [ ] Position fixe bottom-right, ne bouge pas au scroll

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- All 5 tasks completed, build passes
- `useMediaQuery` hook created (SSR-safe, useState(false))
- `MobileFAB` component: fixed bottom-6 right-6 z-30, 56px, PanelRightOpen/X toggle
- AnimatePresence + scale/opacity animation, useReducedMotion support
- CaseStudyShell: added panelOpen state + MobileFAB integration (Fragment wrapper)
- Barrel exports updated: hooks/index.ts, features/index.ts, mobile-fab/index.ts

### File List

- `src/hooks/useMediaQuery.ts` (NEW)
- `src/components/features/mobile-fab/MobileFAB.tsx` (NEW)
- `src/components/features/mobile-fab/index.ts` (NEW)
- `src/components/features/case-study/CaseStudyShell.tsx` (MODIFIED)
- `src/hooks/index.ts` (MODIFIED)
- `src/components/features/index.ts` (MODIFIED)
