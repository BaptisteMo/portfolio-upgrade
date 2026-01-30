# Story 6.7: Mobile Navigation Adaptation

Status: ready-for-dev

## Story

**As a** mobile visitor,
**I want** navigation adapted for touch screens,
**So that** I can easily navigate on my phone.

## Acceptance Criteria

1. **AC1**: Le tri-panel layout collapse en single column sur mobile (< 1024px) — déjà fait
2. **AC2**: La navigation est accessible via une icône hamburger menu
3. **AC3**: Le menu slide in depuis la gauche comme overlay
4. **AC4**: Tous les touch targets sont ≥ 44×44px
5. **AC5**: Le language switcher est accessible depuis le menu mobile
6. **AC6**: Le menu se ferme à la navigation (click lien) ou au tap outside
7. **AC7**: L'animation du menu est smooth (< 300ms)
8. **AC8**: Le build passe sans erreurs

## Tasks / Subtasks

- [ ] **Task 1: Créer le composant MobileHeader** (AC: 2, 4)
  - [ ] Créer `src/components/layout/MobileHeader/MobileHeader.tsx`
  - [ ] Créer `src/components/layout/MobileHeader/index.ts` barrel export
  - [ ] `'use client'` — state, hooks
  - [ ] Rendu uniquement sur mobile (`lg:hidden`) — header fixe en haut
  - [ ] Position : `fixed top-0 left-0 right-0 z-30 h-14 bg-background/80 backdrop-blur-sm border-b border-border`
  - [ ] Contenu :
    - Gauche : bouton hamburger (`Menu` icon de lucide-react), `min-h-[--touch-target] min-w-[--touch-target]`
    - Centre : "Baptiste Morillon" ou logo (lien vers home)
    - Droite : optionnel (vide ou thème toggle)
  - [ ] `aria-label` : FR "Ouvrir le menu" / EN "Open menu"

- [ ] **Task 2: Créer le composant MobileNavDrawer** (AC: 3, 5, 6, 7)
  - [ ] Créer `src/components/layout/MobileNavDrawer/MobileNavDrawer.tsx`
  - [ ] Créer `src/components/layout/MobileNavDrawer/index.ts` barrel export
  - [ ] `'use client'` — Radix Dialog, Framer Motion
  - [ ] Props : `open: boolean`, `onOpenChange: (open: boolean) => void`
  - [ ] Utiliser Radix Dialog (`@radix-ui/react-dialog`) pour overlay + focus trap
  - [ ] **Overlay** : `fixed inset-0 z-40 bg-black/50`
  - [ ] **Drawer** : `fixed top-0 left-0 z-40 h-full w-[280px] max-w-[80vw] bg-background border-r border-border shadow-xl`
  - [ ] Animation Framer Motion :
    - `initial={{ x: '-100%' }}`
    - `animate={{ x: 0 }}`
    - `exit={{ x: '-100%' }}`
    - `transition={{ type: 'spring', damping: 30, stiffness: 300 }}` (< 300ms)
  - [ ] Contenu du drawer : réutiliser les éléments de NavPanel :
    - Logo/nom en haut (lien home)
    - Liens navigation : Home, Projects, About, Contact
    - Section anchors (si sur page case study) — `sectionAnchors` prop optionnel
    - Language switcher en bas
  - [ ] **Fermeture** : click sur un lien → `onOpenChange(false)` + navigation
  - [ ] **Fermeture** : click overlay → Radix Dialog gère automatiquement
  - [ ] **Fermeture** : Escape → Radix Dialog gère automatiquement
  - [ ] `useReducedMotion` : animation instant si reduced motion

- [ ] **Task 3: Créer les liens navigation mobile** (AC: 4, 5, 6)
  - [ ] Dans le drawer, chaque lien de navigation :
    - `min-h-[--touch-target]` (44px)
    - `px-4 py-3` pour zone de tap confortable
    - Active state : background highlight comme NavPanel desktop
    - `onClick` : fermer le drawer puis naviguer
  - [ ] Language switcher : même pattern que NavPanel, touch-friendly
  - [ ] Section anchors (case study) : liens hash vers sections, ferment le drawer

- [ ] **Task 4: Intégrer dans TriPanelLayout** (AC: 1, 2, 3)
  - [ ] Modifier `src/components/layout/TriPanelLayout/TriPanelLayout.tsx`
  - [ ] Ajouter state `navOpen` dans le layout (ou remonter via props/context)
  - [ ] **Option A** (recommandée) : TriPanelLayout gère son propre state mobile nav
  - [ ] Dans la section mobile (`lg:hidden`) :
    - Ajouter `<MobileHeader onMenuClick={() => setNavOpen(true)} />`
    - Ajouter `<MobileNavDrawer open={navOpen} onOpenChange={setNavOpen} />`
    - Ajouter `pt-14` au `<main>` mobile pour compenser le header fixe
  - [ ] Passer `nav` content au drawer : le NavPanel existant est déjà passé en prop
  - [ ] **Challenge** : TriPanelLayout est un server component actuellement — il faudra soit :
    - Le convertir en `'use client'` (impact minimal — il wrappe juste du JSX)
    - OU créer un wrapper `MobileNavProvider` client qui gère le state
    - Préférer le wrapper client pour garder TriPanelLayout en server component

- [ ] **Task 5: Créer le MobileNavWrapper** (AC: 2, 3)
  - [ ] Créer `src/components/layout/MobileNavWrapper/MobileNavWrapper.tsx`
  - [ ] `'use client'` — gère le state `navOpen`
  - [ ] Props : `nav: ReactNode` (le NavPanel passé par TriPanelLayout)
  - [ ] Rend le `<MobileHeader>` + `<MobileNavDrawer>` avec state partagé
  - [ ] Utilisé dans la section `lg:hidden` de TriPanelLayout

- [ ] **Task 6: Ajuster le padding mobile** (AC: 1)
  - [ ] Le `<main>` mobile dans TriPanelLayout doit avoir `pt-14` (hauteur du header fixe)
  - [ ] Vérifier que le contenu ne passe pas sous le header

- [ ] **Task 7: Mettre à jour les exports** (AC: 2)
  - [ ] Ajouter les exports dans `src/components/layout/index.ts`
  - [ ] Ajouter `MobileNavDrawer` et `MobileHeader` si nécessaire

- [ ] **Task 8: Build Verification** (AC: 8)
  - [ ] Run `npm run build` — no errors
  - [ ] Test : Hamburger visible sur mobile (< 1024px) (manual)
  - [ ] Test : Hamburger invisible sur desktop (manual)
  - [ ] Test : Click hamburger → drawer slide in depuis la gauche (manual)
  - [ ] Test : Click lien → navigation + drawer ferme (manual)
  - [ ] Test : Click overlay → drawer ferme (manual)
  - [ ] Test : Escape → drawer ferme (manual)
  - [ ] Test : Language switcher accessible dans le drawer (manual)
  - [ ] Test : Touch targets ≥ 44px (manual)
  - [ ] Test : Animation < 300ms (manual)
  - [ ] Test : Reduced motion → instant (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/layout/MobileHeader/MobileHeader.tsx
src/components/layout/MobileHeader/index.ts
src/components/layout/MobileNavDrawer/MobileNavDrawer.tsx
src/components/layout/MobileNavDrawer/index.ts
src/components/layout/MobileNavWrapper/MobileNavWrapper.tsx
src/components/layout/MobileNavWrapper/index.ts
```

**Modified Files:**
```
src/components/layout/TriPanelLayout/TriPanelLayout.tsx  # Intégration mobile nav
src/components/layout/index.ts                           # Barrel exports
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` sur tous les composants mobile (state + hooks)
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. Framer Motion pour animations (PAS GSAP)
5. Radix Dialog pour overlay + focus trap
6. `useReducedMotion` pour préférences accessibilité
7. **Garder TriPanelLayout en server component** — utiliser MobileNavWrapper client

### Z-Index Map (Final)

```
z-50  — SplashScreen, CommandPalette overlay
z-40  — MobileBottomSheet (Story 6-6), MobileNavDrawer (NEW), ShortcutsBar (desktop)
z-30  — MobileFAB (Story 6-5), MobileHeader (NEW)
z-10  — TriPanelLayout nav + panel (desktop)
```

### Server Component Preservation Strategy

TriPanelLayout est actuellement un **server component** (pas de `'use client'`). Pour garder cet avantage :

```tsx
// TriPanelLayout.tsx — reste server component
import { MobileNavWrapper } from '@/components/layout/MobileNavWrapper'

export function TriPanelLayout({ nav, children, panel }: TriPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop — inchangé */}
      <div className="hidden lg:block">
        {/* ... existing desktop layout ... */}
      </div>

      {/* Mobile — avec navigation */}
      <div className="lg:hidden">
        <MobileNavWrapper nav={nav} />
        <main className="min-h-screen overflow-y-auto pt-14" role="main">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </div>
  )
}
```

```tsx
// MobileNavWrapper.tsx — client component
'use client'

import { useState, type ReactNode } from 'react'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer'

interface MobileNavWrapperProps {
  nav: ReactNode
}

export function MobileNavWrapper({ nav }: MobileNavWrapperProps) {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <MobileHeader onMenuClick={() => setNavOpen(true)} />
      <MobileNavDrawer open={navOpen} onOpenChange={setNavOpen}>
        {nav}
      </MobileNavDrawer>
    </>
  )
}
```

### MobileHeader Pattern

```tsx
'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useLanguage } from '@/contexts'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { locale } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm">
      <button
        onClick={onMenuClick}
        aria-label={locale === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
        className="flex min-h-[--touch-target] min-w-[--touch-target] items-center justify-center rounded-md hover:bg-muted transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link
        href={`/${locale}`}
        className="text-sm font-medium text-foreground"
      >
        Baptiste Morillon
      </Link>

      {/* Spacer for centering */}
      <div className="min-w-[--touch-target]" />
    </header>
  )
}
```

### MobileNavDrawer Pattern

```tsx
'use client'

import { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'

interface MobileNavDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MobileNavDrawer({ open, onOpenChange, children }: MobileNavDrawerProps) {
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/50"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={reducedMotion ? undefined : { x: '-100%' }}
                animate={reducedMotion ? undefined : { x: 0 }}
                exit={reducedMotion ? undefined : { x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 left-0 z-40 flex h-full w-[280px] max-w-[80vw] flex-col border-r border-border bg-background shadow-xl"
              >
                {/* Header with close button */}
                <div className="flex h-14 items-center justify-between border-b border-border px-4">
                  <span className="text-sm font-medium text-foreground">Menu</span>
                  <Dialog.Close asChild>
                    <button
                      aria-label={locale === 'fr' ? 'Fermer le menu' : 'Close menu'}
                      className="flex min-h-[--touch-target] min-w-[--touch-target] items-center justify-center rounded-md hover:bg-muted transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Nav content — reuse NavPanel */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>

                <Dialog.Title className="sr-only">
                  {locale === 'fr' ? 'Menu de navigation' : 'Navigation menu'}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  {locale === 'fr' ? 'Navigation principale du site' : 'Main site navigation'}
                </Dialog.Description>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
```

### NavPanel Adaptation pour Mobile

Le NavPanel existant est conçu pour la sidebar desktop. Dans le drawer mobile, il est passé en `children`. **Points d'attention** :
- Les liens de navigation dans NavPanel ferment le drawer au click — ajouter un handler `onClick` qui appelle `onOpenChange(false)`
- **Option 1** : NavPanel accepte une prop `onNavigate?: () => void` appelée au click d'un lien
- **Option 2** : Le MobileNavDrawer intercepte les clicks sur les liens descendants
- **Recommandation** : Option 1 — plus explicite et propre

```tsx
// NavPanel.tsx — ajouter prop optionnelle
interface NavPanelProps {
  sectionAnchors?: { label: string; id: string }[]
  activeSection?: string | null
  onNavigate?: () => void // NEW — appelé au click d'un lien
}
```

Chaque `<Link>` dans NavPanel appelle `onNavigate?.()` dans son `onClick`.

### Touch Target Compliance

Tous les éléments interactifs dans le drawer :
- `min-h-[--touch-target]` (44px) via le design token existant
- `px-4 py-3` pour padding confortable
- Hover state visible (`hover:bg-muted`)

### Previous Story Intelligence

**From Story 6-5 (Mobile FAB):**
- `useMediaQuery` hook créé — réutilisable si besoin
- Pattern de composant mobile-only avec `AnimatePresence`

**From Story 6-6 (Bottom Sheet):**
- Pattern Radix Dialog + Framer Motion bien établi
- Overlay `bg-black/50` + focus trap
- `useReducedMotion` pour animations

**From Story 2-2 (NavPanel):**
- NavPanel rend : logo, liens nav, section anchors, language switcher
- Active state basé sur `pathname`
- Structure complète réutilisable dans le drawer

### Dependencies

- **Requires**: Aucune story spécifique (TriPanelLayout et NavPanel existent depuis Epic 2)
- **New packages**: Aucun (`@radix-ui/react-dialog` déjà installé)
- **Modifie**: NavPanel (ajout prop `onNavigate`), TriPanelLayout (ajout wrapper mobile)

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CIP-03 : Comportement Responsive
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — UX-02 : Mobile Panel Pattern
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 6.7
- [TriPanelLayout](src/components/layout/TriPanelLayout/TriPanelLayout.tsx) — Layout à modifier
- [NavPanel](src/components/features/navigation/NavPanel.tsx) — Contenu du drawer

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Hamburger visible sur mobile (< 1024px)
- [ ] Hamburger invisible sur desktop
- [ ] Click hamburger → drawer slide in depuis la gauche
- [ ] Click lien nav → navigation + drawer ferme
- [ ] Click overlay → drawer ferme
- [ ] Escape → drawer ferme
- [ ] Focus trap — Tab ne sort pas du drawer
- [ ] Focus retourne au hamburger après fermeture
- [ ] Language switcher accessible dans le drawer
- [ ] Section anchors affichés sur page case study
- [ ] Touch targets ≥ 44px sur tous les liens
- [ ] Animation spring < 300ms
- [ ] Reduced motion → instant
- [ ] Header fixe ne cache pas le contenu (pt-14)
- [ ] Header backdrop-blur visible au scroll

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List
