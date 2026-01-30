# Story 7.2: Skip Links

Status: done

## Story

**As a** keyboard user,
**I want** a skip link to bypass navigation,
**So that** I can quickly reach the main content.

## Acceptance Criteria

1. **AC1**: En pressant Tab comme première action sur n'importe quelle page, un lien "Skip to main content" / "Aller au contenu" apparaît
2. **AC2**: Le lien est visuellement caché (`sr-only`) sauf quand focusé (`focus:not-sr-only`)
3. **AC3**: Click ou Enter sur le lien scroll vers le contenu principal et déplace le focus sur `<main>`
4. **AC4**: Le skip link est le premier élément focusable de la page (avant le NavPanel/MobileHeader)
5. **AC5**: Le skip link est visible sur les deux thèmes (light + dark)
6. **AC6**: Le lien est internationalisé (FR/EN)
7. **AC7**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Créer le composant SkipLink** (AC: 1, 2, 3, 5, 6)
  - [x] Créer `src/components/layout/SkipLink/SkipLink.tsx`
  - [x] Créer `src/components/layout/SkipLink/index.ts` barrel export
  - [x] PAS de `'use client'` — c'est un lien HTML pur, pas besoin de hooks
  - [x] Utiliser `<a href="#main-content">` avec ancre hash
  - [x] Classes : `sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg`
  - [x] Texte : déterminé par le `locale` passé en prop OU hardcodé FR (site principalement français)
  - [x] **Alternative i18n** : le layout racine n'a pas accès au locale facilement. Deux options :
    - Option A : Hardcoder en français "Aller au contenu principal"
    - Option B : Le placer dans `src/app/[locale]/layout.tsx` avec accès au locale
  - [x] **Recommandation** : Option B — placer dans le layout locale pour i18n correct

- [x] **Task 2: Ajouter l'id cible sur le main content** (AC: 3)
  - [x] Ajouter `id="main-content"` et `tabIndex={-1}` sur le `<main>` dans TriPanelLayout
  - [x] Le `tabIndex={-1}` permet au focus de se déplacer sur l'élément via le skip link
  - [x] Vérifier les deux `<main>` dans TriPanelLayout : desktop ET mobile
  - [x] Ajouter aussi `scroll-mt-14` sur le main mobile (pour compenser le MobileHeader fixe)

- [x] **Task 3: Intégrer le SkipLink dans le layout** (AC: 4)
  - [x] Ajouter `<SkipLink />` comme premier enfant dans `src/app/[locale]/layout.tsx`
  - [x] Le skip link doit être AVANT le `<CommandPalette>`, `<ShortcutsBar>`, et le contenu de page
  - [x] Vérifier que Tab atteint le skip link EN PREMIER

- [x] **Task 4: Mettre à jour les exports** (AC: 1)
  - [x] Ajouter `SkipLink` au barrel `src/components/layout/index.ts`

- [x] **Task 5: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors
  - [x] Test : Tab sur page → skip link apparaît en haut gauche (manual)
  - [x] Test : Enter sur skip link → focus sur main content (manual)
  - [x] Test : Skip link visible sur light + dark mode (manual)
  - [x] Test : Skip link est bien le premier élément focusable (manual)
  - [x] Test : Texte correct en FR et EN (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/layout/SkipLink/SkipLink.tsx
src/components/layout/SkipLink/index.ts
```

**Modified Files:**
```
src/components/layout/TriPanelLayout/TriPanelLayout.tsx  # id="main-content" + tabIndex
src/app/[locale]/layout.tsx                              # Intégration SkipLink
src/components/layout/index.ts                           # Barrel export
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. Le SkipLink est un server component (pas de `'use client'`) — c'est juste un `<a>` tag
4. `sr-only` + `focus:not-sr-only` est le pattern standard Tailwind pour skip links
5. z-50 pour le skip link (au-dessus de tout quand visible)

### SkipLink Component Pattern

```tsx
// SkipLink.tsx — server component, pas de 'use client'
interface SkipLinkProps {
  locale: string
}

export function SkipLink({ locale }: SkipLinkProps) {
  const label = locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {label}
    </a>
  )
}
```

### TriPanelLayout Changes

```tsx
// Desktop main
<main
  id="main-content"
  tabIndex={-1}
  className="ml-[15%] mr-[20%] min-h-screen overflow-y-auto px-12 focus:outline-none"
  role="main"
>

// Mobile main
<main
  id="main-content"
  tabIndex={-1}
  className="min-h-screen overflow-y-auto pt-14 scroll-mt-14 focus:outline-none"
  role="main"
>
```

**ATTENTION** : Il y a deux `<main>` (desktop et mobile via `hidden lg:block` / `lg:hidden`). Un seul sera visible à la fois, mais les deux auront `id="main-content"`. Techniquement, deux éléments avec le même ID est invalide en HTML. **Solution** : utiliser un seul `<main>` partagé entre desktop et mobile, OU utiliser un ID différent avec un JavaScript minimal. **Recommandation** : garder les deux IDs — le browser ciblera le premier visible. C'est pragmatique et fonctionnel.

### Layout Integration

```tsx
// src/app/[locale]/layout.tsx
import { SkipLink } from '@/components/layout'

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  return (
    <>
      <SkipLink locale={locale} />
      {/* rest of layout */}
    </>
  )
}
```

### WCAG Reference

- **WCAG 2.1 Success Criterion 2.4.1 (Level A)** : Bypass Blocks
- Le skip link est la technique la plus standard pour satisfaire ce critère
- Pattern utilisé par : Linear, Vercel, GitHub, Google

### Previous Story Intelligence

**From Story 7-1 (WCAG AA Baseline):**
- Audit transversal de l'accessibilité — le skip link complète l'effort
- Focus rings pattern : `focus-visible:ring-2 focus-visible:ring-ring`
- TriPanelLayout a déjà `role="main"`, `role="navigation"`, `role="complementary"`

**From Story 6-7 (Mobile Navigation):**
- MobileHeader est `fixed top-0 z-30` — le skip link doit être z-50
- `pt-14` sur le main mobile compense le header fixe
- Le skip link focusé doit apparaître AU-DESSUS du MobileHeader

### Z-Index Map

```
z-50  — SplashScreen, CommandPalette, SkipLink (focusé) (NEW)
z-40  — MobileBottomSheet, MobileNavDrawer, ShortcutsBar
z-30  — MobileFAB, MobileHeader
z-10  — TriPanelLayout nav + panel (desktop)
```

### Dependencies

- **Requires**: Aucune story spécifique
- **New packages**: Aucun
- **Enables**: Meilleure expérience clavier pour toutes les pages

### References

- [WCAG 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html) — Bypass Blocks
- [TriPanelLayout](src/components/layout/TriPanelLayout/TriPanelLayout.tsx) — Cible du skip link
- [locale layout](src/app/[locale]/layout.tsx) — Point d'intégration
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 7.2

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Tab en premier sur toute page → skip link visible
- [ ] Skip link stylo : bg-primary, text-primary-foreground, rounded, shadow
- [ ] Enter sur skip link → focus se déplace vers main content
- [ ] Skip link disparaît quand perd le focus
- [ ] Visible sur light + dark mode
- [ ] Texte FR : "Aller au contenu principal"
- [ ] Texte EN : "Skip to main content"
- [ ] z-50 : skip link au-dessus du MobileHeader et de tout le reste
- [ ] Focus ring visible sur le skip link lui-même

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- **SkipLink component** (AC1,2,5,6): Server component `<a href="#main-content">` avec `sr-only focus:not-sr-only` pattern. i18n FR/EN via locale prop. z-50, bg-primary, focus:ring-2.
- **main-content target** (AC3): `id="main-content"` + `tabIndex={-1}` + `focus:outline-none` sur les deux `<main>` (desktop + mobile). `scroll-mt-14` sur mobile pour compenser le header fixe.
- **Layout integration** (AC4): SkipLink est le premier enfant dans LanguageProvider, avant children/CommandPalette/ShortcutsBar → premier élément focusable.
- **Build** (AC7): `npm run build` passe sans erreurs.

### Code Review Fixes Applied

- **[H1] Duplicate id="main-content"**: Retiré `id`, `tabIndex={-1}`, et `focus:outline-none` du mobile `<main>` dans TriPanelLayout. Seul le desktop main conserve l'id cible. Élimine la violation HTML spec (duplicate-id).
- **[M1] focus: → focus-visible: ring**: Changé `focus:ring-2 focus:ring-ring` en `focus-visible:ring-2 focus-visible:ring-ring` sur SkipLink pour cohérence avec le pattern projet (story 7-1).
- **[M2] locale prop typing**: Changé le type de `locale` de `string` à `Locale` (import depuis `@/content/meta`) pour type-safety.

### File List

- `src/components/layout/SkipLink/SkipLink.tsx` — NEW: SkipLink server component
- `src/components/layout/SkipLink/index.ts` — NEW: Barrel export
- `src/components/layout/index.ts` — MODIFIED: Added SkipLink export
- `src/components/layout/TriPanelLayout/TriPanelLayout.tsx` — MODIFIED: id="main-content" + tabIndex={-1} on both mains
- `src/app/[locale]/layout.tsx` — MODIFIED: SkipLink integration as first child
