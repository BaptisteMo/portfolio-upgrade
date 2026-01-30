# Story 6.6: Mobile Bottom Sheet Context Panel

Status: ready-for-dev

## Story

**As a** mobile visitor,
**I want** a bottom sheet to display context panel content,
**So that** I get the same enriched experience as desktop.

## Acceptance Criteria

1. **AC1**: Le bottom sheet slide up depuis le bas (animation iOS-style) quand on tape le FAB
2. **AC2**: La hauteur du sheet est ~60% du viewport avec drag-to-resize
3. **AC3**: Le sheet affiche le même contenu que le ContextPanel desktop
4. **AC4**: On peut drag le sheet vers le bas pour le fermer
5. **AC5**: Le contenu en arrière-plan est dimmed mais visible
6. **AC6**: Le focus est piégé dans le sheet quand ouvert
7. **AC7**: Le sheet utilise Framer Motion pour les animations
8. **AC8**: Le contenu du sheet est synchronisé avec la section active (scroll du contenu principal)
9. **AC9**: Le build passe sans erreurs

## Tasks / Subtasks

- [ ] **Task 1: Installer shadcn Dialog (si nécessaire)** (AC: 6)
  - [ ] Vérifier si `@radix-ui/react-dialog` est déjà installé (il l'est via `cmdk`)
  - [ ] **Ne pas** installer shadcn dialog — utiliser Radix Dialog directement pour un contrôle total
  - [ ] Import : `import * as Dialog from '@radix-ui/react-dialog'`

- [ ] **Task 2: Créer le composant MobileBottomSheet** (AC: 1, 2, 4, 5, 6, 7)
  - [ ] Créer `src/components/features/mobile-bottom-sheet/MobileBottomSheet.tsx`
  - [ ] Créer `src/components/features/mobile-bottom-sheet/index.ts` barrel export
  - [ ] `'use client'` — Radix Dialog, Framer Motion, hooks
  - [ ] Props : `open: boolean`, `onOpenChange: (open: boolean) => void`, `children: ReactNode`
  - [ ] Utiliser `Dialog.Root` + `Dialog.Portal` + `Dialog.Overlay` + `Dialog.Content`
  - [ ] **Overlay** : `fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40`
  - [ ] **Content** : `fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl bg-background border-t border-border`
  - [ ] Hauteur : `h-[60vh]` avec possibilité de drag-to-resize
  - [ ] **Drag handle** : barre grise en haut du sheet (pill 40×4px, `bg-muted-foreground/30 rounded-full`)
  - [ ] `Dialog.Title` et `Dialog.Description` en `sr-only` pour accessibilité
  - [ ] Framer Motion wrapper sur `Dialog.Content` :
    - `initial={{ y: '100%' }}`
    - `animate={{ y: 0 }}`
    - `exit={{ y: '100%' }}`
    - `transition={{ type: 'spring', damping: 30, stiffness: 300 }}`
  - [ ] `useReducedMotion` : si activé, pas d'animation spring (instant)

- [ ] **Task 3: Implémenter le drag-to-dismiss** (AC: 4)
  - [ ] Utiliser Framer Motion `drag="y"` sur le content wrapper
  - [ ] `dragConstraints={{ top: 0 }}` — ne peut pas drag vers le haut au-delà de la position initiale
  - [ ] `dragElastic={{ top: 0, bottom: 0.3 }}` — résistance élastique vers le bas
  - [ ] `onDragEnd` : si `offset.y > 100` ou `velocity.y > 500`, fermer le sheet (`onOpenChange(false)`)
  - [ ] Sinon, spring back à la position initiale
  - [ ] Le drag handle en haut du sheet est la zone de drag principale
  - [ ] **Optionnel** : tout le header du sheet est draggable (pas juste le handle)

- [ ] **Task 4: Intégrer dans CaseStudyShell** (AC: 3, 8)
  - [ ] Modifier `src/components/features/case-study/CaseStudyShell.tsx`
  - [ ] Le state `panelOpen` existe déjà (créé dans Story 6-5)
  - [ ] Rendre `<MobileBottomSheet open={panelOpen} onOpenChange={setPanelOpen}>`
  - [ ] À l'intérieur du sheet : `<ContextPanel sections={sections} activeSection={activeSection ?? undefined} />`
  - [ ] Le contenu est automatiquement synchronisé car `activeSection` est partagé

- [ ] **Task 5: Gérer le scroll lock** (AC: 5)
  - [ ] Radix Dialog gère automatiquement `body { overflow: hidden }` quand ouvert
  - [ ] Vérifier que le comportement est correct sur iOS (Safari a des quirks avec le scroll lock)
  - [ ] Le contenu du sheet lui-même doit scroller : `overflow-y-auto` sur le content wrapper

- [ ] **Task 6: Mettre à jour les exports** (AC: 3)
  - [ ] Ajouter `MobileBottomSheet` au barrel `src/components/features/mobile-bottom-sheet/index.ts`
  - [ ] Ajouter à `src/components/features/index.ts`

- [ ] **Task 7: Build Verification** (AC: 9)
  - [ ] Run `npm run build` — no errors
  - [ ] Test : FAB click → sheet slide up (manual)
  - [ ] Test : Drag down → sheet dismiss (manual)
  - [ ] Test : Backdrop click → sheet dismiss (manual)
  - [ ] Test : Escape → sheet dismiss (manual)
  - [ ] Test : Focus trap — Tab cycle dans le sheet (manual)
  - [ ] Test : Contenu ContextPanel affiché et synchronisé avec scroll (manual)
  - [ ] Test : Reduced motion — animation instant (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/features/mobile-bottom-sheet/MobileBottomSheet.tsx
src/components/features/mobile-bottom-sheet/index.ts
```

**Modified Files:**
```
src/components/features/case-study/CaseStudyShell.tsx   # Intégration bottom sheet
src/components/features/index.ts                        # Barrel export
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` sur MobileBottomSheet
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. Framer Motion pour animations
5. Radix Dialog pour focus trap + overlay + accessibilité
6. `useReducedMotion` pour respecter les préférences

### Z-Index Map (Updated)

```
z-50  — SplashScreen, CommandPalette overlay
z-40  — MobileBottomSheet overlay + content (NEW), ShortcutsBar (desktop)
z-30  — MobileFAB (Story 6-5)
z-10  — TriPanelLayout nav + panel (desktop)
```

### MobileBottomSheet Component Pattern

```tsx
'use client'

import { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface MobileBottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function MobileBottomSheet({ open, onOpenChange, children }: MobileBottomSheetProps) {
  const reducedMotion = useReducedMotion()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
              />
            </Dialog.Overlay>

            {/* Sheet */}
            <Dialog.Content asChild>
              <motion.div
                initial={reducedMotion ? undefined : { y: '100%' }}
                animate={reducedMotion ? undefined : { y: 0 }}
                exit={reducedMotion ? undefined : { y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.3 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100 || info.velocity.y > 500) {
                    onOpenChange(false)
                  }
                }}
                className="fixed bottom-0 left-0 right-0 z-40 flex h-[60vh] flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl"
              >
                {/* Drag handle */}
                <div className="flex justify-center py-3">
                  <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-safe">
                  {children}
                </div>

                {/* Accessibility */}
                <Dialog.Title className="sr-only">Panneau contextuel</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Informations contextuelles liées à la section en cours
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

### CaseStudyShell Integration (Updated from Story 6-5)

```tsx
// CaseStudyShell.tsx après Story 6-5 + 6-6 :
import { useState } from 'react'
import { MobileFAB } from '@/components/features/mobile-fab'
import { MobileBottomSheet } from '@/components/features/mobile-bottom-sheet'

export function CaseStudyShell({ sectionAnchors, sections, children }: CaseStudyShellProps) {
  const sectionIds = sectionAnchors.map((a) => a.id)
  const activeSection = useActiveSection(sectionIds)
  const [panelOpen, setPanelOpen] = useState(false) // Added in Story 6-5

  return (
    <>
      <TriPanelLayout
        nav={<NavPanel sectionAnchors={sectionAnchors} activeSection={activeSection} />}
        panel={
          <>
            <ContextPanel sections={sections} activeSection={activeSection ?? undefined} />
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {activeSection ? sectionAnchors.find((a) => a.id === activeSection)?.label : null}
            </div>
          </>
        }
      >
        {children}
      </TriPanelLayout>

      {/* Mobile: FAB + Bottom Sheet */}
      <MobileFAB isOpen={panelOpen} onToggle={() => setPanelOpen(prev => !prev)} />
      <MobileBottomSheet open={panelOpen} onOpenChange={setPanelOpen}>
        <ContextPanel sections={sections} activeSection={activeSection ?? undefined} />
      </MobileBottomSheet>
    </>
  )
}
```

### Backdrop Pattern (from CommandPalette)

Le CommandPalette utilise `bg-black/50 backdrop-blur-[8px]`. Le bottom sheet utilise un blur plus léger (`backdrop-blur-[2px]`) car le contenu en arrière-plan reste partiellement visible — c'est un "peek" overlay, pas un modal bloquant.

### iOS Safe Area

Le bottom sheet doit respecter les safe areas iOS (notch, home indicator) :
- `pb-safe` ou `padding-bottom: env(safe-area-inset-bottom)` sur le content
- Le drag handle est au-dessus de la safe area

### Drag-to-Dismiss UX

- **Threshold** : 100px de déplacement OU 500px/s de vélocité → fermeture
- **Feedback** : le sheet suit le doigt pendant le drag (Framer Motion drag natif)
- **Spring back** : si on lâche avant le threshold, le sheet revient à sa position avec un spring
- **Direction** : uniquement vers le bas (`dragConstraints={{ top: 0 }}`)

### Previous Story Intelligence

**From Story 6-5 (Mobile FAB):**
- State `panelOpen` + `setPanelOpen` déjà dans CaseStudyShell
- `MobileFAB` toggle `panelOpen` — le bottom sheet écoute ce même state
- `useMediaQuery('(max-width: 1023px)')` dans le FAB — pas besoin dans le sheet (le FAB gère la visibilité)

**From Story 4-1 (Context Panel):**
- `ContextPanel` est un composant pur — accepte `sections` + `activeSection`
- Peut être rendu n'importe où (desktop sidebar OU bottom sheet)
- Utilise `AnimatePresence` interne pour transitions entre sections

**From Story 5-1 (Command Palette):**
- Pattern overlay `bg-black/50 backdrop-blur` bien établi
- Radix Dialog via `cmdk` — même base technique

### Dependencies

- **Requires**: Story 6-5 done (FAB + state `panelOpen`)
- **New packages**: Aucun (`@radix-ui/react-dialog` déjà installé via `cmdk`)
- **Enables**: Expérience mobile complète pour les case studies

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CIP-03 : Comportement Responsive Panel
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — UX-02 : Mobile Panel Pattern
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 6.6
- [ContextPanel](src/components/features/context-panel/ContextPanel.tsx) — Composant réutilisé
- [CaseStudyShell](src/components/features/case-study/CaseStudyShell.tsx) — Point d'intégration
- [CommandPalette](src/components/features/command-palette/CommandPalette.tsx) — Pattern overlay

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] FAB click → sheet slide up smooth
- [ ] Sheet affiche le contenu ContextPanel correct
- [ ] Contenu synchronisé avec section active (scroll main → sheet update)
- [ ] Drag down → sheet dismiss
- [ ] Backdrop click → sheet dismiss
- [ ] Escape → sheet dismiss
- [ ] Focus trap — Tab ne sort pas du sheet
- [ ] Focus retourne au FAB après fermeture
- [ ] Scroll lock — body ne scroll pas quand sheet ouvert
- [ ] Sheet content scroll — le contenu interne scroll si trop long
- [ ] Reduced motion — animation instant
- [ ] Drag handle visible et draggable
- [ ] iOS safe area respectée (pas de contenu sous le home indicator)

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Completion Notes List

### File List
