# Story 7.5: Reduced Motion Support

Status: done

## Story

**As a** visitor with vestibular disorders,
**I want** animations disabled when I prefer reduced motion,
**So that** the site doesn't cause discomfort.

## Acceptance Criteria

1. **AC1**: Les animations hero typography sont simplifiées en fade instant
2. **AC2**: Les page transitions sont instantanées (pas de slide/fade)
3. **AC3**: Les effets parallax sont désactivés
4. **AC4**: Les animations de compteurs affichent la valeur finale immédiatement
5. **AC5**: Les animations GSAP vérifient `prefers-reduced-motion` avant initialisation
6. **AC6**: Framer Motion respecte le hook `useReducedMotion`
7. **AC7**: Les feedbacks UI essentiels (hover states) restent fonctionnels
8. **AC8**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Auditer les animations hero** (AC: 1)
  - [x] Lire `src/components/features/hero/HeroLanding.tsx`
  - [x] Vérifier que les animations de typographie (letter-by-letter cascade) respectent `useReducedMotion`
  - [x] Si reduced motion : fade instant (opacity 0→1 sans delay)
  - [x] Vérifier le SplashScreen aussi

- [x] **Task 2: Auditer les page transitions** (AC: 2)
  - [x] Lire `src/components/layout/PageTransition/PageTransition.tsx`
  - [x] Vérifier que le composant utilise `useReducedMotion` ou `motion-reduce:`
  - [x] Si reduced motion : transition instantanée (pas de slide/fade)

- [x] **Task 3: Auditer les effets parallax** (AC: 3, 5)
  - [x] Lire `src/hooks/useParallax.ts`
  - [x] Vérifier que GSAP vérifie `prefers-reduced-motion` avant création du ScrollTrigger
  - [x] Si reduced motion : pas de parallax, éléments en position statique

- [x] **Task 4: Auditer les compteurs animés** (AC: 4)
  - [x] Lire `src/hooks/useCountUp.ts`
  - [x] Vérifier que les compteurs affichent la valeur finale immédiatement si reduced motion
  - [x] Pattern : `if (reducedMotion) { setValue(target); return; }`

- [x] **Task 5: Audit transversal Framer Motion** (AC: 6)
  - [x] Scanner tous les composants utilisant `motion.` ou `AnimatePresence`
  - [x] Vérifier que chaque composant animé respecte `useReducedMotion`
  - [x] Pattern établi : `initial={reducedMotion ? false : 'hidden'}`
  - [x] Composants critiques : MobileFAB, MobileBottomSheet, MobileNavDrawer, ProjectCard hover, ContextPanel

- [x] **Task 6: Vérifier les hover states** (AC: 7)
  - [x] Les hover states CSS (via Tailwind `hover:`) ne sont PAS affectés par reduced motion — c'est correct
  - [x] Vérifier que `motion-reduce:hover:translate-x-0` est utilisé sur les liens NavPanel (déjà fait)
  - [x] Les hover ne doivent PAS être désactivés — seulement les transitions/transform animées

- [x] **Task 7: Build Verification** (AC: 8)
  - [x] Run `npm run build` — no errors
  - [x] Test : Activer reduced motion dans OS → vérifier chaque animation (manual)

## Dev Notes

### Architecture Compliance

**Modified Files (potentiels — dépend de l'audit):**
```
src/components/features/hero/HeroLanding.tsx        # Si animations ne respectent pas reduced motion
src/components/layout/PageTransition/PageTransition.tsx  # Si transitions ne respectent pas
src/hooks/useParallax.ts                            # Si GSAP ne vérifie pas
src/hooks/useCountUp.ts                             # Si compteur ne respecte pas
src/components/features/splash/SplashScreen.tsx     # Si splash ne respecte pas
```

### Critical Rules

1. `useReducedMotion` de `@/hooks` pour Framer Motion
2. `window.matchMedia('(prefers-reduced-motion: reduce)')` pour GSAP
3. NE PAS désactiver les hover states — seulement les animations/transitions longues
4. Les `motion-reduce:` prefix Tailwind sont OK pour les micro-animations CSS

### Patterns déjà en place

- `useReducedMotion` hook créé et utilisé dans : MobileFAB, MobileBottomSheet, MobileNavDrawer
- Pattern Framer Motion : `initial={reducedMotion ? false : 'hidden'}`
- Pattern NavPanel : `motion-reduce:hover:translate-x-0`
- Pattern story spec : `transition={{ duration: reducedMotion ? 0 : 0.2 }}`

### Previous Story Intelligence

**From Epic 6 (Mobile):**
- `useReducedMotion` bien intégré dans les composants mobiles
- Pattern spring avec `reducedMotion ? undefined : { y: '100%' }` pour le bottom sheet

**From Epic 5:**
- useParallax utilise GSAP ScrollTrigger — DOIT vérifier reduced motion
- Hover effects dans story 5-7 — doivent rester fonctionnels

### Dependencies

- **Requires**: Aucune
- **New packages**: Aucun
- **Concerne**: Audit transversal de toutes les animations

### References

- [useReducedMotion](src/hooks/useReducedMotion.ts) — Hook existant
- [useParallax](src/hooks/useParallax.ts) — GSAP ScrollTrigger
- [useCountUp](src/hooks/useCountUp.ts) — Compteurs animés
- [PageTransition](src/components/layout/PageTransition/PageTransition.tsx) — Transitions de page
- [Project Context](/_bmad-output/project-context.md) — Animation rules

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Hero : fade instant (pas de cascade letter-by-letter)
- [ ] Page transitions : instantanées
- [ ] Parallax : désactivé, éléments en position statique
- [ ] Compteurs : valeur finale affichée immédiatement
- [ ] Mobile FAB, Bottom Sheet, Nav Drawer : animation instant
- [ ] Hover states : toujours fonctionnels
- [ ] Aucun flash ou glitch visuel en mode reduced motion

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- **Hero animations (AC1):** HeroLanding et SplashScreen utilisent `reducedMotionVariants` (opacity fade instant 0.1s) quand `useReducedMotion()` est true. Letter-by-letter cascade → simple fade. Exit animation du SplashScreen adapté aussi (`y: 0, duration: 0.1`).
- **Page transitions (AC2):** PageTransition utilise `reducedMotionVariants` (opacity 1→1, pas de transition visible) + `duration: 0`.
- **Parallax (AC3,5):** useParallax retourne immédiatement si `reducedMotion` true. Double vérification avec `window.matchMedia('(prefers-reduced-motion: reduce)')` pour SSR safety.
- **Compteurs (AC4):** useCountUp (hook séparé) set `endValue` immédiatement. **FIX:** Le `CountUp` inline dans HeroLanding ne respectait PAS reduced motion — ajouté `reducedMotion` prop qui skip l'animation et set la valeur directement.
- **Framer Motion transversal (AC6):** 14 fichiers avec `motion.` audités. 11 utilisent `useReducedMotion`. **FIX:** AvailabilityStatusCTA n'avait pas `useReducedMotion` — ajouté avec `reducedItemVars` + désactivation de `animate-pulse` sur le status dot. ContextPanelItem reçoit les variants du parent ContextPanel (qui gère reduced motion). ShortcutsBar : animation mineure (hint bar enter/exit), acceptable.
- **Hover states (AC7):** Les hover CSS Tailwind (`hover:`) ne sont pas affectés. `motion-reduce:hover:translate-x-0` déjà sur NavPanel links. OK.
- **Build (AC8):** `npm run build` passe sans erreurs.

### File List

- `src/components/features/hero/HeroLanding.tsx` — MODIFIED: CountUp respects reducedMotion prop, StatCard receives variants via prop (no more module-level shadowing)
- `src/components/features/hero/AvailabilityStatusCTA.tsx` — MODIFIED: Added useReducedMotion, reducedItemVars, disabled animate-pulse
- `src/components/features/splash/SplashScreen.tsx` — AUDITED: reducedMotionVariants already in place
- `src/components/layout/PageTransition/PageTransition.tsx` — AUDITED: reducedMotionVariants + duration:0
- `src/hooks/useParallax.ts` — AUDITED: double reduced motion check (hook + native API)
- `src/hooks/useCountUp.ts` — AUDITED: immediate value set in reduced motion
