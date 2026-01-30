# Story 6.2: Contact Form with Validation

Status: done

## Story

**As a** visitor (Thomas),
**I want** a contact form with real-time validation,
**So that** I can easily reach out to Baptiste without errors.

## Acceptance Criteria

1. **AC1**: Le formulaire inclut les champs : Name, Email, Company (optionnel), Message
2. **AC2**: Le champ Email valide le format en temps réel
3. **AC3**: Les champs requis affichent un état erreur si vides au blur
4. **AC4**: Les messages d'erreur sont clairs et localisés (FR/EN)
5. **AC5**: Les données du formulaire sont préservées si la validation échoue (NFR-USA-02)
6. **AC6**: Le bouton Submit affiche un état loading pendant la soumission (< 1s feedback)
7. **AC7**: Un toast succès/erreur apparaît après soumission
8. **AC8**: Le formulaire utilise shadcn/ui form components avec React Hook Form + Zod
9. **AC9**: La page contact est accessible via `/[locale]/contact`
10. **AC10**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Installer les dépendances** (AC: 8)
  - [x] `npm install react-hook-form @hookform/resolvers zod`
  - [x] `npx shadcn@latest add form input textarea label sonner` (shadcn form components)
  - [x] Vérifier que les composants sont générés dans `src/components/ui/`

- [x] **Task 2: Créer le schéma de validation Zod** (AC: 1, 2, 3, 4)
  - [x] Créer `src/lib/validations/contact.ts`
  - [x] Schéma Zod avec champs : `name` (required, min 2), `email` (required, email format), `company` (optional), `message` (required, min 10)
  - [x] Messages d'erreur localisés : exporter une fonction `getContactSchema(locale: Locale)` qui retourne le schéma avec messages FR/EN
  - [x] Type inféré : `export type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>`

- [x] **Task 3: Créer le composant ContactForm** (AC: 1, 2, 3, 4, 5, 6, 7, 8)
  - [x] Créer `src/components/features/contact/ContactForm.tsx`
  - [x] Créer `src/components/features/contact/index.ts` barrel export
  - [x] `'use client'` — utilise React Hook Form, useLanguage, state
  - [x] `useForm<ContactFormData>` avec `zodResolver`
  - [x] Champs via shadcn `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`
  - [x] Validation on blur (`mode: 'onBlur'`) pour feedback temps réel
  - [x] Bouton submit avec état loading : `disabled` + Loader2 spinner quand `isSubmitting`
  - [x] `onSubmit` handler : appelle server action stub
  - [x] Toast via sonner : succès "Message envoyé !" / erreur "Erreur, réessayez."
  - [x] Labels et placeholders localisés via `useLanguage()`
  - [x] Données préservées automatiquement par React Hook Form (AC5 — natif)

- [x] **Task 4: Créer la page contact** (AC: 9)
  - [x] Créer `src/app/[locale]/contact/page.tsx`
  - [x] Layout: intégrer dans `TriPanelLayout` avec `NavPanel`
  - [x] Breadcrumbs : `Accueil > Contact`
  - [x] Titre de page localisé : "Contactez-moi" / "Get in Touch"
  - [x] Sous-titre localisé
  - [x] Rendre `<ContactForm />` dans la zone de contenu principale
  - [x] Metadata : `generateMetadata()` avec titre/description localisés
  - [x] `<Toaster />` rendu dans la page pour les toast notifications

- [x] **Task 5: Stub server action pour soumission** (AC: 6, 7)
  - [x] Créer `src/app/[locale]/contact/actions.ts` avec `'use server'`
  - [x] Exporter `submitContactForm` — stub 500ms delay + return success
  - [x] La vraie implémentation sera dans Story 6-3

- [x] **Task 6: Mettre à jour les exports et navigation** (AC: 9)
  - [x] Ajouter `ContactForm` au barrel `src/components/features/contact/index.ts`
  - [x] Ajouter `ContactForm` à `src/components/features/index.ts`
  - [x] Route `/contact` déjà dans NavPanel (existante)
  - [x] Route `/contact` déjà dans Command Palette navCommands (existante)

- [x] **Task 7: Build Verification** (AC: 10)
  - [x] Run `npm run build` — no errors (18 pages — +2 contact)
  - [ ] Test: Page /fr/contact et /en/contact accessibles (manual)
  - [ ] Test: Validation email format (manual)
  - [ ] Test: Champs requis erreur au blur (manual)
  - [ ] Test: Submit avec données valides → toast succès (manual)
  - [ ] Test: Labels FR/EN corrects (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/lib/validations/contact.ts                          # Schéma Zod + types
src/components/features/contact/ContactForm.tsx         # Composant formulaire
src/components/features/contact/index.ts                # Barrel export
src/app/[locale]/contact/page.tsx                       # Page contact
src/app/[locale]/contact/actions.ts                     # Server action stub
```

**Modified Files:**
```
src/components/features/index.ts                        # Ajout ContactForm export
src/components/features/command-palette/CommandPalette.tsx  # Ajout route /contact
package.json                                            # react-hook-form, zod, @hookform/resolvers
package-lock.json                                       # Lock file
```

**Auto-generated (shadcn):**
```
src/components/ui/form.tsx                              # shadcn Form
src/components/ui/input.tsx                             # shadcn Input
src/components/ui/textarea.tsx                          # shadcn Textarea
src/components/ui/label.tsx                             # shadcn Label
src/components/ui/sonner.tsx                            # shadcn Sonner (toast)
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` sur ContactForm (React Hook Form + state)
3. `'use server'` sur actions.ts (server action)
4. NE PAS modifier `components/ui/` manuellement — shadcn les génère
5. PascalCase pour composant, camelCase pour hooks et utils
6. Tailwind design tokens pour tout le styling
7. Framer Motion pour animations d'entrée de page (PAS GSAP)

### Composants shadcn nécessaires

Les composants UI suivants n'existent PAS encore et doivent être installés via `npx shadcn@latest add` :
- `form` — wrapper React Hook Form avec `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`
- `input` — champ texte standard
- `textarea` — champ texte multiline
- `label` — label accessible
- `sonner` — toast notifications (basé sur sonner library)

**Commande unique :** `npx shadcn@latest add form input textarea label sonner`

### React Hook Form + Zod Pattern

```tsx
// Pattern à suivre :
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getContactSchema, type ContactFormData } from '@/lib/validations/contact'

const form = useForm<ContactFormData>({
  resolver: zodResolver(getContactSchema(locale)),
  mode: 'onBlur',  // Validation au blur, pas au submit
  defaultValues: { name: '', email: '', company: '', message: '' },
})
```

### i18n — Messages d'erreur localisés

Le schéma Zod doit accepter la locale pour personnaliser les messages :

```tsx
export function getContactSchema(locale: Locale) {
  const t = locale === 'fr' ? {
    nameRequired: 'Le nom est requis',
    nameMin: 'Le nom doit contenir au moins 2 caractères',
    emailRequired: "L'email est requis",
    emailInvalid: "Format d'email invalide",
    messageRequired: 'Le message est requis',
    messageMin: 'Le message doit contenir au moins 10 caractères',
  } : {
    nameRequired: 'Name is required',
    nameMin: 'Name must be at least 2 characters',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    messageRequired: 'Message is required',
    messageMin: 'Message must be at least 10 characters',
  }

  return z.object({
    name: z.string().min(1, t.nameRequired).min(2, t.nameMin),
    email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
    company: z.string().optional(),
    message: z.string().min(1, t.messageRequired).min(10, t.messageMin),
  })
}
```

### UX Design Notes

Le UX spec met en garde contre un formulaire classique trop lourd (Anti-Pattern 4). L'approche retenue :
- **Minimaliste** : 4 champs seulement (Name, Email, Company optionnel, Message)
- **Pas de friction** : Validation au blur (pas de soumission bloquante)
- **Feedback immédiat** : Toast succès/erreur
- **Alternatives visibles** : La page contact pourrait aussi afficher email direct et liens LinkedIn (hors scope story, mais le layout doit permettre)

### Server Action Stub

La Story 6-2 crée uniquement le formulaire frontend avec validation. La soumission réelle (envoi email, API) sera dans Story 6-3. Le stub simule un délai de 500ms et retourne succès.

### Page Layout Pattern

La page contact doit suivre le pattern existant des autres pages (`about`, `projects`) :
- `TriPanelLayout` avec `NavPanel` dans le slot nav
- Breadcrumbs en haut du contenu
- Contenu principal centré

### Command Palette Integration

Ajouter une commande de navigation `/contact` dans les `searchableItems` de `CommandPalette.tsx`, suivant le pattern existant pour les autres pages.

### Sonner (Toast) Setup

Sonner nécessite un `<Toaster />` component dans le layout root. Vérifier si `src/app/layout.tsx` ou `src/app/[locale]/layout.tsx` doit être modifié pour ajouter `<Toaster />` depuis `sonner` ou depuis `@/components/ui/sonner`.

### Previous Story Intelligence

**From Story 6-1 (Availability Status CTA):**
- `src/config/availability.ts` — fichier config créé
- Pattern de composant self-contained dans `features/hero/`
- `useLanguage()` pour i18n
- AvailabilityStatusCTA pointe vers `/contact` — cette page doit exister

**From Story 5-4 (Fuzzy Search):**
- `CommandPalette.tsx` contient `searchableItems` avec `navigate()` helper
- Pattern pour ajouter des commandes de navigation : `{ id, label, keywords, action: () => navigate('/path') }`

### Dependencies

- **Requires**: Story 6-1 (done ou en cours) — le CTA pointe vers /contact
- **New packages**: `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner` (via shadcn)
- **Enables**: Story 6-3 (Contact Form Submission — implémentation réelle de l'envoi)

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CE-02, NFR-USA-02, NFR-PERF-07
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Anti-Pattern 4 (formulaire basique)
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Component structure
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 6.2
- [CommandPalette](src/components/features/command-palette/CommandPalette.tsx) — Navigation items pattern
- [shadcn/ui Form docs](https://ui.shadcn.com/docs/components/form) — React Hook Form integration

### Testing Checklist

- [ ] Page /fr/contact accessible et affiche le formulaire
- [ ] Page /en/contact accessible avec labels EN
- [ ] Champ Name : vide au blur → erreur "Le nom est requis"
- [ ] Champ Email : format invalide au blur → erreur "Format d'email invalide"
- [ ] Champ Message : < 10 chars au blur → erreur "Le message doit contenir au moins 10 caractères"
- [ ] Champ Company : optionnel, pas d'erreur si vide
- [ ] Submit valide → loading state sur bouton → toast succès
- [ ] Submit invalide → erreurs inline, données préservées
- [ ] Navigation depuis Command Palette → /contact fonctionne
- [ ] Breadcrumbs affichés correctement
- [ ] Responsive : formulaire lisible sur mobile
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Installed `react-hook-form`, `@hookform/resolvers`, `zod` via npm
- Installed shadcn components: `form`, `input`, `textarea`, `label`, `sonner` (form.tsx was new, others already existed)
- Created Zod schema with `getContactSchema(locale)` — localized error messages FR/EN
- `ContactFormData` type inferred from schema via `z.infer<ReturnType<typeof getContactSchema>>`
- ContactForm: React Hook Form + zodResolver, mode `onBlur`, 4 fields (name, email, company optional, message)
- Loading state: Loader2 spinner + disabled button during `isSubmitting`
- Toast notifications via sonner: success + error messages localized
- Server action stub: 500ms delay, returns `{ success: true }`
- Contact page: TriPanelLayout + NavPanel + Breadcrumbs + metadata
- `<Toaster />` rendered in contact page for toast support
- NavPanel and Command Palette already had `/contact` route — no changes needed
- Build passes — 18 pages (+2 contact pages), 0 errors

### File List

- `src/lib/validations/contact.ts` (new — Zod schema + types)
- `src/components/features/contact/ContactForm.tsx` (new — form component)
- `src/components/features/contact/index.ts` (new — barrel export)
- `src/app/[locale]/contact/page.tsx` (new — contact page)
- `src/app/[locale]/contact/actions.ts` (new — server action stub)
- `src/components/features/index.ts` (modified — added ContactForm export)
- `src/components/ui/form.tsx` (new — shadcn auto-generated)
- `package.json` (modified — react-hook-form, zod, @hookform/resolvers)
- `package-lock.json` (modified)
