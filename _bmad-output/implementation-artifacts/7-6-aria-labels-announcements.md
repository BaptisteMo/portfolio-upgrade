# Story 7.6: ARIA Labels & Announcements

Status: done

## Story

**As a** screen reader user,
**I want** proper ARIA labels on all interactive elements,
**So that** I understand what each element does.

## Acceptance Criteria

1. **AC1**: Tous les boutons sans texte visible ont un `aria-label`
2. **AC2**: Les boutons icon-only (theme toggle, language toggle, FAB) sont labellisés
3. **AC3**: Les landmarks de navigation utilisent `role="navigation"` avec `aria-label`
4. **AC4**: La zone de contenu principal utilise `role="main"`
5. **AC5**: Les mises à jour du Context Panel sont annoncées via `aria-live="polite"`
6. **AC6**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Auditer les boutons icon-only** (AC: 1, 2)
  - [x] Scanner tous les `<button>` et `<Button>` sans texte enfant
  - [x] Vérifier : ThemeToggle — ✅ aria-label i18n déjà présent
  - [x] Vérifier : LanguageToggle — ✅ aria-label i18n déjà présent
  - [x] Vérifier : MobileFAB — ✅ aria-label i18n déjà présent
  - [x] Vérifier : MobileHeader hamburger button — ✅ aria-label i18n déjà présent
  - [x] Vérifier : MobileNavDrawer close button — ✅ aria-label i18n déjà présent
  - [x] Vérifier : MobileBottomSheet drag handle / close — ✅ Dialog.Title/Description sr-only i18n
  - [x] Ajouter `aria-label` i18n si manquant — Aucun manquant

- [x] **Task 2: Auditer les landmarks** (AC: 3, 4)
  - [x] Vérifier `role="navigation"` + `aria-label` sur NavPanel desktop — ✅ `aria-label="Navigation principale"` déjà présent
  - [x] Vérifier `role="navigation"` + `aria-label` sur MobileNavDrawer — ✅ via Radix Dialog
  - [x] Vérifier `role="main"` sur les `<main>` dans TriPanelLayout — ✅ `role="main"` présent
  - [x] Vérifier `role="complementary"` + `aria-label` sur ContextPanel — ✅ via TriPanelLayout aside
  - [x] Ajouter `aria-label` descriptif si manquant — **Ajouté** `aria-label="Navigation principale"` sur aside navigation + `aria-label="Panneau contextuel"` sur aside complementary dans TriPanelLayout

- [x] **Task 3: Ajouter aria-live pour le Context Panel** (AC: 5)
  - [x] Vérifier aria-live sur CaseStudyShell — ✅ `<div aria-live="polite" aria-atomic="true">` déjà présent
  - [x] Quand `activeSection` change, le screen reader annonce le changement — ✅ déjà implémenté
  - [x] Pattern : `<div aria-live="polite" aria-atomic="true">` sur le wrapper — ✅ en place

- [x] **Task 4: Build Verification** (AC: 6)
  - [x] Run `npm run build` — no errors ✅
  - [ ] Test : VoiceOver (macOS) lit correctement les labels (manual)
  - [ ] Test : Tous les boutons icon-only annoncent leur fonction (manual)

## Dev Notes

### Architecture Compliance

**Modified Files (potentiels):**
```
src/components/shared/ThemeToggle.tsx           # aria-label si manquant
src/components/shared/LanguageToggle.tsx        # aria-label si manquant
src/components/features/mobile-fab/MobileFAB.tsx  # aria-label si manquant
src/components/layout/MobileHeader/MobileHeader.tsx  # aria-label hamburger
src/components/layout/MobileNavDrawer/MobileNavDrawer.tsx  # aria-label nav landmark
src/components/features/navigation/NavPanel.tsx  # aria-label nav landmark
src/components/layout/TriPanelLayout/TriPanelLayout.tsx  # aria-label landmarks
src/components/features/case-study/CaseStudyShell.tsx  # aria-live context panel
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. Labels i18n : utiliser le `locale` du contexte ou hardcoder FR
4. `aria-label` en français par défaut, anglais si locale === 'en'
5. Ne pas surcharger — seulement les éléments interactifs sans texte visible

### Previous Story Intelligence

**From Story 7-1 (WCAG AA Baseline):**
- TriPanelLayout a déjà `role="main"`, `role="navigation"`, `role="complementary"`
- Les landmarks existent mais peuvent manquer d'`aria-label`

**From Story 6-5 (MobileFAB):**
- FAB utilise un bouton avec icône Lucide — vérifier `aria-label`

**From Story 6-6 (MobileBottomSheet):**
- Dialog.Title et Dialog.Description en sr-only — déjà i18n

**From Story 6-7 (MobileNavDrawer):**
- Dialog.Title et Dialog.Description en sr-only — déjà i18n
- Close button avec X icon — vérifier `aria-label`

### Dependencies

- **Requires**: Aucune
- **New packages**: Aucun

### References

- [ThemeToggle](src/components/shared/ThemeToggle.tsx)
- [LanguageToggle](src/components/shared/LanguageToggle.tsx)
- [MobileFAB](src/components/features/mobile-fab/MobileFAB.tsx)
- [NavPanel](src/components/features/navigation/NavPanel.tsx)
- [TriPanelLayout](src/components/layout/TriPanelLayout/TriPanelLayout.tsx)
- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) — Name, Role, Value

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] ThemeToggle : VoiceOver annonce "Changer le thème" ou équivalent
- [ ] LanguageToggle : VoiceOver annonce "Changer la langue"
- [ ] MobileFAB : VoiceOver annonce "Ouvrir le panneau contextuel"
- [ ] MobileHeader hamburger : VoiceOver annonce "Ouvrir le menu"
- [ ] Landmarks : VoiceOver liste les régions correctement
- [ ] Context Panel : changement de section annoncé

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

- Audit complet de tous les boutons icon-only : tous déjà labellisés avec i18n (FR/EN)
- Audit des landmarks : `role="navigation"`, `role="main"`, `role="complementary"` tous présents
- Seul fix nécessaire : ajout `aria-label` sur les deux `<aside>` de TriPanelLayout (navigation + complementary)
- `aria-live="polite"` déjà en place dans CaseStudyShell pour les changements de section
- Build passe sans erreurs

### File List

- `src/components/layout/TriPanelLayout/TriPanelLayout.tsx` — ajout aria-label sur aside navigation + aside complementary
