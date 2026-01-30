# Story 6.1: Availability Status CTA

Status: done

## Story

**As a** visitor (Thomas),
**I want** to see Baptiste's current availability status prominently,
**So that** I know immediately if he's available for new projects.

## Acceptance Criteria

1. **AC1**: Un badge CTA affiche le statut actuel avec indicateur couleur (🟢 Disponible, 🟡 En discussion, 🔴 Non disponible)
2. **AC2**: Le statut est configurable via un fichier config (`src/config/availability.ts`)
3. **AC3**: Le CTA est visible dans la section hero (HeroLanding)
4. **AC4**: Cliquer sur le CTA navigue vers la page/section contact
5. **AC5**: Le label du statut est localisé (FR/EN)
6. **AC6**: Le composant utilise `AvailabilityStatusCTA` depuis `features/hero/`
7. **AC7**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Créer le fichier de configuration availability** (AC: 2)
  - [x] Créer `src/config/availability.ts`
  - [x] Exporter `const availabilityConfig = { status: 'available' as AvailabilityStatus }`
  - [x] Importer le type `AvailabilityStatus` depuis `@/content/meta`
  - [x] Ce fichier est la source unique de vérité — Baptiste le modifie manuellement pour changer son statut

- [x] **Task 2: Créer le composant AvailabilityStatusCTA** (AC: 1, 3, 4, 5, 6)
  - [x] Créer `src/components/features/hero/AvailabilityStatusCTA.tsx`
  - [x] Exporter depuis `src/components/features/hero/index.ts` (barrel existant)
  - [x] `'use client'` — utilise `useLanguage` context
  - [x] Props: aucune — auto-contenu, lit `availabilityConfig` directement
  - [x] Réutiliser la logique `statusConfig` existante de `AvailabilityBadge` (mapping couleur + label i18n)
  - [x] Rendre un `<Link href="/contact">` wrappant le badge (clickable CTA)
  - [x] Style: `inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-2 cursor-pointer`
  - [x] Hover: `hover:bg-card transition-colors`
  - [x] Indicateur couleur: `<span className="h-2.5 w-2.5 rounded-full animate-pulse" />` (pulse uniquement pour `available`)
  - [x] Framer Motion `motion.div` avec `itemVariants` pour animation d'entrée cohérente avec HeroLanding

- [x] **Task 3: Intégrer dans HeroLanding** (AC: 3, 6)
  - [x] Importer `AvailabilityStatusCTA` dans `HeroLanding.tsx`
  - [x] Positionner AVANT les boutons CTA existants (au-dessus de la `motion.div` avec `mt-10`)
  - [x] Wrapper dans `motion.div variants={itemVars}` pour animation staggered cohérente
  - [x] Placement: `mt-8 mb-2` entre le sous-texte et les boutons

- [x] **Task 4: Mettre à jour les exports** (AC: 6)
  - [x] Ajouter `AvailabilityStatusCTA` au barrel `src/components/features/hero/index.ts`
  - [x] Ajouter à `src/components/features/index.ts`

- [x] **Task 5: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors (16 pages)
  - [ ] Test: Badge visible dans le hero sur desktop (manual)
  - [ ] Test: Click navigue vers /contact (manual)
  - [ ] Test: Labels FR/EN corrects (manual)
  - [ ] Test: Indicateur couleur pulse pour "available" (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/config/availability.ts                                    # Config statut
src/components/features/hero/AvailabilityStatusCTA.tsx        # Composant CTA
```

**Modified Files:**
```
src/components/features/hero/HeroLanding.tsx                  # Intégration CTA
src/components/features/hero/index.ts                         # Export barrel
src/components/features/index.ts                              # Export barrel (si nécessaire)
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` directive sur AvailabilityStatusCTA (utilise useLanguage context)
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. PascalCase pour composant, camelCase pour hooks
5. Tailwind design tokens pour tout le styling
6. Framer Motion pour animation d'entrée (PAS GSAP — c'est une transition React)

### Composant existant — AvailabilityBadge

**IMPORTANT**: Un `AvailabilityBadge` existe déjà dans `src/components/features/about/AvailabilityBadge.tsx`. Il est utilisé dans la page About. Le nouveau composant `AvailabilityStatusCTA` a un rôle différent :

- `AvailabilityBadge` = badge statique d'affichage (page About, sidebar)
- `AvailabilityStatusCTA` = CTA cliquable avec navigation (Hero section)

La logique `statusConfig` (couleur + labels i18n) peut être extraite comme constante partagée, OU simplement dupliquée dans le nouveau composant (DRY vs simplicité — préférer la simplicité car c'est une map de 3 entrées).

**Code existant dans AvailabilityBadge.tsx:**
```tsx
const statusConfig = {
  available: { color: 'bg-green-500', fr: 'Disponible', en: 'Available' },
  'in-talks': { color: 'bg-yellow-500', fr: 'En discussion', en: 'In Talks' },
  unavailable: { color: 'bg-red-500', fr: 'Non disponible', en: 'Unavailable' },
}
```

**Type existant dans `src/content/meta.ts`:**
```tsx
export type AvailabilityStatus = 'available' | 'in-talks' | 'unavailable'
```

### Design Reference

```
┌──────────────────────────────────────────┐
│                                          │
│    Baptiste Morillon                     │
│    Product Designer                      │
│                                          │
│    ● Disponible pour mission             │  ← AvailabilityStatusCTA (NEW)
│                                          │
│    [Voir les projets] [Me contacter]     │  ← Boutons existants
│                                          │
└──────────────────────────────────────────┘
```

### UX Spec Notes

- **Style**: Subtle, inline avec le hero, pas trop proéminent
- **CTA primaire**: Les boutons existants restent les CTA primaires — le badge availability est secondaire/informatif
- **Hover**: Transition subtile pour indiquer que c'est cliquable
- **Pulse**: Uniquement sur le dot vert (`available`) pour attirer l'attention sans être intrusif
- **PRD target**: > 10% clics sur le CTA "Disponible pour mission"

### Previous Story Intelligence

**From Story 5-8 (Scroll Parallax):**
- GSAP installé dans le projet (`gsap` package)
- `useParallax` hook créé dans `src/hooks/`
- Pattern de reduced motion bien établi
- Build: 16 pages, 0 erreurs

**From Story 5-6 (Shortcuts Bar):**
- Pattern de composant self-contained (pas de props, lit le contexte)
- `useLanguage()` pour i18n dans composants client
- Framer Motion `AnimatePresence` pour animations

### HeroLanding Integration Point

Le composant HeroLanding utilise un système de variants Framer Motion staggered. Le nouveau CTA doit s'intégrer dans la séquence d'animation existante :

```tsx
// Pattern existant dans HeroLanding.tsx:
<motion.div variants={itemVars}>  // Sous-texte
<motion.div variants={itemVars}>  // ← NOUVEAU: AvailabilityStatusCTA ici
<motion.div variants={itemVars}>  // Boutons CTA existants
```

Les `itemVars` sont définis dans le composant avec `duration: 0.5` et `ease: 'easeOut'`.

### i18n Considerations

Labels localisés via `useLanguage()`:
- FR: `🟢 Disponible pour mission` / `🟡 En discussion` / `🔴 Non disponible`
- EN: `🟢 Available for work` / `🟡 In Talks` / `🔴 Unavailable`

Note: Les labels CTA peuvent être plus longs que ceux du badge About (ajouter "pour mission" / "for work").

### Dependencies

- **Requires**: Rien — premier story de l'Epic 6
- **Pre-existing**: `AvailabilityStatus` type, `AvailabilityBadge` component, `useLanguage` context
- **Enables**: Story 6-2 (Contact Form) — le CTA pointe vers /contact

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CE-01 : CTA "Disponible" avec Statut
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Button Hierarchy, CTA patterns
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Component structure
- [AvailabilityBadge](src/components/features/about/AvailabilityBadge.tsx) — Composant existant
- [AvailabilityStatus type](src/content/meta.ts) — Type existant
- [HeroLanding](src/components/features/hero/HeroLanding.tsx) — Point d'intégration

### Testing Checklist

- [ ] Desktop: Badge visible dans le hero avec statut correct
- [ ] Desktop: Indicateur couleur correspond au statut configuré
- [ ] Desktop: Pulse animation sur dot vert (available uniquement)
- [ ] Desktop: Click → navigation vers /contact
- [ ] Mobile: Badge visible et cliquable (touch target suffisant)
- [ ] Localization: FR "Disponible pour mission", EN "Available for work"
- [ ] Config: Changer statut dans `availability.ts` → build reflète le changement
- [ ] Animation: Entrée staggered cohérente avec les autres éléments du hero
- [ ] No z-index conflicts
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created `src/config/availability.ts` — single source of truth for status config
- Created `AvailabilityStatusCTA` — self-contained, reads config + useLanguage for i18n
- statusConfig with extended labels: "Disponible pour mission" / "Available for work"
- Pulse animation on green dot only (`animate-pulse` conditional on `available` status)
- `<Link href="/contact">` wrapping badge for CTA navigation
- Framer Motion `itemVars` matching HeroLanding stagger sequence
- Integrated before CTA buttons in HeroLanding (`mt-8 mb-2` spacing)
- Barrel exports updated in hero/index.ts and features/index.ts
- Build passes — 16 pages, 0 errors

### File List

- `src/config/availability.ts` (new)
- `src/components/features/hero/AvailabilityStatusCTA.tsx` (new)
- `src/components/features/hero/HeroLanding.tsx` (modified — import + render AvailabilityStatusCTA)
- `src/components/features/hero/index.ts` (modified — added export)
- `src/components/features/index.ts` (modified — added export)
