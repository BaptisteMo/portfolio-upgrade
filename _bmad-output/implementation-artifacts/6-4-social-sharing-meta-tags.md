# Story 6.4: Formulaire Contact "Phrase à Trous"

Status: done

## Story

**As a** visitor (Thomas),
**I want** a unique, engaging contact form presented as a fill-in-the-blank sentence,
**So that** the experience feels creative and memorable — not like a boring standard form.

## Acceptance Criteria

1. **AC1**: Le formulaire est présenté comme une grande phrase à trous que l'utilisateur complète inline
2. **AC2**: La phrase contient les champs : nom, email, entreprise (optionnel), et message/besoin
3. **AC3**: Les champs sont des inputs inline stylisés (underline, pas de labels séparés) intégrés dans le flux du texte
4. **AC4**: Le focus sur un champ déclenche une animation subtile (underline expand, couleur accent, ou glow)
5. **AC5**: Les champs remplis changent visuellement d'état (texte plein vs placeholder)
6. **AC6**: La validation existante (Zod + RHF mode onBlur) est préservée — les erreurs s'affichent sous le champ inline
7. **AC7**: Le formulaire est localisé (FR/EN) — la phrase est différente selon la locale
8. **AC8**: La soumission (bouton en bas) conserve le loading state + toast existants
9. **AC9**: Responsive : la phrase reste lisible sur mobile (line breaks naturels)
10. **AC10**: Le build passe sans erreurs

## Tasks / Subtasks

- [ ] **Task 1: Créer le composant MadLibsContactForm** (AC: 1, 2, 3, 7)
  - [ ] Créer `src/components/features/contact/MadLibsContactForm.tsx`
  - [ ] `'use client'` — utilise React Hook Form, useLanguage, Framer Motion
  - [ ] Réutiliser le même `useForm<ContactFormData>` avec `zodResolver(getContactSchema(locale))`
  - [ ] Définir la phrase template FR et EN avec les slots pour chaque champ :
    - **FR** : `Bonjour Baptiste, je suis [nom] et je travaille chez [entreprise]. J'aimerais discuter de [message]. Tu peux me joindre à [email].`
    - **EN** : `Hi Baptiste, I'm [name] and I work at [company]. I'd like to discuss [message]. You can reach me at [email].`
  - [ ] Chaque `[slot]` est un `<input>` ou `<textarea>` inline dans le flux du texte
  - [ ] Le champ `[entreprise/company]` affiche un placeholder style "(optionnel)" / "(optional)"
  - [ ] Le champ `[message]` peut être un `<textarea>` auto-resize ou un `contentEditable` — préférer `<textarea>` avec auto-resize pour garder la compatibilité RHF

- [ ] **Task 2: Styliser les champs inline** (AC: 3, 4, 5)
  - [ ] Style de base des inputs inline :
    - Pas de bordure (border: none), pas de background
    - Underline via `border-bottom: 2px solid var(--border)`
    - Taille de police : identique au texte parent (`text-2xl md:text-3xl lg:text-4xl`)
    - Width dynamique : `min-width` basé sur le placeholder, s'étend avec le contenu
    - Font : hériter du texte parent (même font-family, même weight)
  - [ ] État focus :
    - Underline s'étend et change de couleur (`border-bottom-color: var(--primary)`)
    - Animation Framer Motion ou transition CSS : `transition: border-color 0.2s, width 0.3s`
    - Optionnel : léger glow ou shadow sous le champ focus
  - [ ] État rempli (non vide) :
    - Texte en `text-foreground` (vs placeholder en `text-muted-foreground`)
    - Underline en couleur accent subtile ou disparaît
  - [ ] État erreur :
    - Underline en `text-destructive`
    - Message d'erreur Zod sous le champ (petit texte, `text-destructive`, apparition animée)
  - [ ] Placeholder : style `text-muted-foreground italic` pour distinguer du contenu saisi

- [ ] **Task 3: Auto-resize des champs** (AC: 3, 9)
  - [ ] Input text (nom, email, entreprise) : width qui s'adapte au contenu
    - Technique : `<span>` invisible avec le même texte pour mesurer la largeur, ou `ch` units
    - Min-width : largeur du placeholder + padding
    - Max-width : `100%` du container (pour mobile)
  - [ ] Textarea (message) : hauteur auto-resize
    - Utiliser `scrollHeight` pour ajuster automatiquement
    - Min-height : 1 ligne
    - Max-height : 4-5 lignes puis scroll
    - Responsive : sur mobile, le textarea peut passer en pleine largeur sous la phrase

- [ ] **Task 4: Animations d'entrée** (AC: 4)
  - [ ] La phrase apparaît avec un stagger Framer Motion :
    - Chaque segment de texte + champ apparaît séquentiellement
    - `variants` avec `staggerChildren: 0.08` (rapide mais visible)
    - Animation : `opacity: 0 → 1`, `y: 10 → 0`
  - [ ] Au focus du premier champ : léger pulse ou highlight pour guider l'utilisateur

- [ ] **Task 5: Remplacer ContactForm par MadLibsContactForm dans la page** (AC: 1)
  - [ ] Modifier `src/app/[locale]/contact/page.tsx`
  - [ ] Remplacer `<ContactForm />` par `<MadLibsContactForm />`
  - [ ] Mettre à jour l'import
  - [ ] Ajuster le layout si nécessaire : le formulaire phrase à trous a besoin de plus de largeur — passer de `max-w-xl` à `max-w-3xl` ou retirer la contrainte
  - [ ] **Conserver** `ContactForm.tsx` existant (ne pas supprimer — fallback possible)

- [ ] **Task 6: Mettre à jour le barrel export** (AC: 1)
  - [ ] Ajouter `MadLibsContactForm` au barrel `src/components/features/contact/index.ts`
  - [ ] Optionnel : ajouter à `src/components/features/index.ts`

- [ ] **Task 7: Build Verification** (AC: 10)
  - [ ] Run `npm run build` — no errors
  - [ ] Test : La phrase s'affiche correctement en FR et EN (manual)
  - [ ] Test : Les champs sont cliquables et éditables inline (manual)
  - [ ] Test : Validation au blur fonctionne (erreurs sous le champ) (manual)
  - [ ] Test : Soumission → loading + toast (manual)
  - [ ] Test : Mobile — phrase lisible, line breaks naturels (manual)
  - [ ] Test : Auto-resize des inputs fonctionne (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/components/features/contact/MadLibsContactForm.tsx    # Formulaire phrase à trous
```

**Modified Files:**
```
src/app/[locale]/contact/page.tsx                         # Remplacer ContactForm → MadLibsContactForm
src/components/features/contact/index.ts                  # Barrel export
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use client'` sur MadLibsContactForm (RHF + Framer Motion + state)
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. Framer Motion pour animations (PAS GSAP — c'est du React)
5. Tailwind design tokens pour le styling
6. Réutiliser `getContactSchema(locale)` et `ContactFormData` existants — même validation
7. Réutiliser `submitContactForm` server action existant — même soumission

### Design Concept

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Bonjour Baptiste,                                                  │
│                                                                     │
│  je suis _____________ et je travaille                              │
│           (votre nom)                                               │
│                                                                     │
│  chez _______________.                                              │
│       (optionnel)                                                   │
│                                                                     │
│  J'aimerais discuter de ________________________________            │
│                         (décrivez votre projet...)                  │
│                                                                     │
│  Tu peux me joindre à __________________.                           │
│                        (votre@email.com)                            │
│                                                                     │
│                                                    [Envoyer →]      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Typographie** : Grande taille (`text-2xl` à `text-4xl` responsive) pour rendre la phrase immersive. Les inputs héritent de la même taille.

**Couleurs** :
- Texte statique : `text-foreground`
- Placeholder inputs : `text-muted-foreground italic`
- Input rempli : `text-foreground` (même que le texte)
- Underline default : `border-border`
- Underline focus : `border-primary`
- Underline erreur : `border-destructive`

### Inline Input Component Pattern

```tsx
// Composant réutilisable pour chaque champ inline
interface InlineInputProps {
  field: ControllerRenderProps
  placeholder: string
  error?: string
  type?: 'text' | 'email'
  className?: string
}

function InlineInput({ field, placeholder, error, type = 'text', className }: InlineInputProps) {
  const [width, setWidth] = useState(placeholder.length)
  const measureRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth)
    }
  }, [field.value, placeholder])

  return (
    <span className="relative inline-block align-baseline">
      {/* Invisible span to measure text width */}
      <span
        ref={measureRef}
        className="invisible absolute whitespace-pre text-inherit"
        aria-hidden="true"
      >
        {field.value || placeholder}
      </span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        style={{ width: Math.max(width + 8, 60) }}
        className={cn(
          'inline-block border-0 border-b-2 border-border bg-transparent',
          'text-inherit font-inherit outline-none',
          'placeholder:text-muted-foreground placeholder:italic',
          'focus:border-primary transition-colors duration-200',
          error && 'border-destructive',
          className,
        )}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full text-xs text-destructive mt-1"
        >
          {error}
        </motion.span>
      )}
    </span>
  )
}
```

### Inline Textarea Pattern (pour le message)

```tsx
function InlineTextarea({ field, placeholder, error }: InlineInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }, [field.value])

  return (
    <span className="relative inline-block align-baseline w-full">
      <textarea
        {...field}
        ref={textareaRef}
        placeholder={placeholder}
        rows={1}
        className={cn(
          'w-full border-0 border-b-2 border-border bg-transparent',
          'text-inherit font-inherit outline-none resize-none',
          'placeholder:text-muted-foreground placeholder:italic',
          'focus:border-primary transition-colors duration-200',
          error && 'border-destructive',
        )}
      />
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full text-xs text-destructive mt-1"
        >
          {error}
        </motion.span>
      )}
    </span>
  )
}
```

### Phrase Templates

```tsx
const phrases = {
  fr: {
    greeting: 'Bonjour Baptiste,',
    intro: 'je suis',
    company: 'et je travaille chez',
    message: "J'aimerais discuter de",
    email: 'Tu peux me joindre à',
    namePlaceholder: 'votre nom',
    companyPlaceholder: 'optionnel',
    messagePlaceholder: 'décrivez votre projet ou besoin...',
    emailPlaceholder: 'votre@email.com',
  },
  en: {
    greeting: 'Hi Baptiste,',
    intro: "I'm",
    company: 'and I work at',
    message: "I'd like to discuss",
    email: 'You can reach me at',
    namePlaceholder: 'your name',
    companyPlaceholder: 'optional',
    messagePlaceholder: 'describe your project or need...',
    emailPlaceholder: 'your@email.com',
  },
}
```

### MadLibsContactForm Structure

```tsx
export function MadLibsContactForm() {
  const { locale } = useLanguage()
  const form = useForm<ContactFormData>({
    resolver: zodResolver(getContactSchema(locale)),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', company: '', message: '' },
  })
  const p = phrases[locale]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-foreground"
        >
          <motion.p variants={lineVars}>{p.greeting}</motion.p>
          <motion.p variants={lineVars}>
            {p.intro} <InlineInput ... name="name" /> {p.company} <InlineInput ... name="company" />.
          </motion.p>
          <motion.p variants={lineVars}>
            {p.message} <InlineTextarea ... name="message" />.
          </motion.p>
          <motion.p variants={lineVars}>
            {p.email} <InlineInput ... name="email" type="email" />.
          </motion.p>
        </motion.div>

        <motion.div variants={lineVars} className="mt-8">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 .../> {t.sending}</> : t.submit}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
```

### Contact Page Layout Update

Le formulaire phrase à trous est plus large que le formulaire standard. Ajuster la page :

```tsx
// Avant (story 6-2):
<div className="max-w-xl py-8">

// Après (story 6-4):
<div className="max-w-3xl py-8">
```

Le titre et sous-titre de la page (`h1` + `p`) peuvent être supprimés ou simplifiés — la phrase "Bonjour Baptiste" fait office d'introduction. Laisser le `<Breadcrumbs />` en haut.

### React Hook Form + Inline Inputs

**Clé** : Les inputs inline doivent être wrappés dans `<FormField>` pour garder la validation RHF :

```tsx
<FormField
  control={form.control}
  name="name"
  render={({ field, fieldState }) => (
    <InlineInput
      field={field}
      placeholder={p.namePlaceholder}
      error={fieldState.error?.message}
    />
  )}
/>
```

**NE PAS** utiliser `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` — ces composants shadcn ajoutent du markup block-level incompatible avec l'inline. Utiliser directement `<FormField>` + render prop.

### Accessibilité

- Chaque input a un `aria-label` correspondant au label (nom, email, etc.) puisqu'il n'y a pas de `<label>` visible
- Les erreurs utilisent `aria-describedby` pour être annoncées aux lecteurs d'écran
- Tab order naturel (le flow du texte = le tab order)
- `prefers-reduced-motion` : désactiver le stagger d'entrée

### Previous Story Intelligence

**From Story 6-2 (Contact Form with Validation):**
- `ContactFormData` = `{ name, email, company?, message }`
- `getContactSchema(locale)` = validation Zod localisée
- `submitContactForm(data)` = server action (stub ou réel après 6-3)
- `mode: 'onBlur'` = validation au blur — parfait pour les inline inputs
- Toast sonner pour feedback succès/erreur
- `<Toaster />` déjà rendu dans la page contact
- `ContactForm.tsx` existant — ne pas supprimer, garder comme fallback

### Dependencies

- **Requires**: Story 6-2 done (validation + server action)
- **New packages**: Aucun (Framer Motion déjà installé)
- **Modifie**: La page contact uniquement
- **Conserve**: Toute la logique validation + soumission existante

### References

- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Anti-Pattern 4 : formulaire basique
- [Story 6-2](/_bmad-output/implementation-artifacts/6-2-contact-form-with-validation.md) — Formulaire standard existant
- [Project Context](/_bmad-output/project-context.md) — Framer Motion pour animations React

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] FR : La phrase est correcte et naturelle
- [ ] EN : La phrase est correcte et naturelle
- [ ] Inputs inline : underline visible, placeholder affiché
- [ ] Focus : underline change de couleur (accent)
- [ ] Rempli : texte en couleur foreground
- [ ] Validation blur : erreur affichée sous le champ
- [ ] Auto-resize : input name s'élargit avec le texte
- [ ] Auto-resize : textarea message grandit avec le contenu
- [ ] Soumission : loading state + toast succès
- [ ] Mobile : phrase lisible, line breaks naturels
- [ ] Accessibilité : aria-labels sur chaque input
- [ ] Stagger animation : phrase apparaît séquentiellement
- [ ] Tab order : naturel (nom → entreprise → message → email)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- All 7 tasks completed, build passes
- MadLibsContactForm component created with inline inputs, auto-resize textarea, stagger animations
- InlineInput uses invisible span for dynamic width measurement
- InlineTextarea uses scrollHeight auto-resize
- Honeypot field included (same pattern as ContactForm)
- Rate-limit toast labels included
- Framer Motion stagger + useReducedMotion support
- aria-label, aria-invalid, aria-describedby on all inputs
- Contact page updated: removed h1/subtitle (phrase is the intro), max-w-xl → max-w-3xl
- ContactForm.tsx preserved as fallback

### File List

- `src/components/features/contact/MadLibsContactForm.tsx` (NEW)
- `src/app/[locale]/contact/page.tsx` (MODIFIED)
- `src/components/features/contact/index.ts` (MODIFIED)
