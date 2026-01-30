# Story 6.3: Contact Form Submission

Status: done

## Story

**As a** visitor (Thomas),
**I want** my contact form submission to be processed,
**So that** Baptiste receives my message.

## Acceptance Criteria

1. **AC1**: Les données du formulaire sont envoyées via un endpoint backend (Resend API)
2. **AC2**: Un message de confirmation succès s'affiche après soumission
3. **AC3**: Le formulaire est réinitialisé après soumission réussie
4. **AC4**: Si la soumission échoue, un message d'erreur s'affiche et les données sont préservées
5. **AC5**: Un rate limiting empêche le spam (max 5 soumissions par minute par IP)
6. **AC6**: Un champ honeypot est inclus pour la protection anti-bot
7. **AC7**: La validation est effectuée côté serveur en plus du client (defense in depth)
8. **AC8**: Le build passe sans erreurs

## Tasks / Subtasks

- [ ] **Task 1: Installer Resend SDK** (AC: 1)
  - [ ] `npm install resend`
  - [ ] Créer `.env.local` avec `RESEND_API_KEY` et `CONTACT_EMAIL_TO`
  - [ ] Créer `.env.example` (sans valeurs sensibles) pour documentation
  - [ ] Vérifier que `.env.local` est dans `.gitignore`

- [ ] **Task 2: Créer le module d'envoi email** (AC: 1)
  - [ ] Créer `src/lib/email.ts`
  - [ ] Exporter une fonction `sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }>`
  - [ ] Utiliser le SDK Resend pour envoyer l'email
  - [ ] Template email : sujet `[Portfolio] Nouveau message de {name}`, body avec tous les champs
  - [ ] `from`: utiliser le domaine vérifié Resend ou `onboarding@resend.dev` pour dev
  - [ ] `to`: lire depuis `process.env.CONTACT_EMAIL_TO`
  - [ ] `replyTo`: l'email du visiteur (pour pouvoir répondre directement)
  - [ ] Gestion d'erreurs : catch les erreurs Resend API, retourner message d'erreur typé

- [ ] **Task 3: Implémenter le rate limiting simple** (AC: 5)
  - [ ] Créer `src/lib/rate-limit.ts`
  - [ ] Implémenter un rate limiter in-memory basé sur `Map<string, number[]>`
  - [ ] Exporter `rateLimit(ip: string, limit?: number, windowMs?: number): { success: boolean; remaining: number }`
  - [ ] Defaults : `limit = 5`, `windowMs = 60_000` (5 requêtes par minute)
  - [ ] Nettoyage automatique des entrées expirées à chaque appel
  - [ ] **Note** : In-memory = reset au redéploiement, suffisant pour un portfolio

- [ ] **Task 4: Mettre à jour le server action** (AC: 1, 2, 3, 4, 5, 6, 7)
  - [ ] Modifier `src/app/[locale]/contact/actions.ts`
  - [ ] Importer `sendContactEmail` depuis `@/lib/email`
  - [ ] Importer `rateLimit` depuis `@/lib/rate-limit`
  - [ ] Importer `getContactSchema` depuis `@/lib/validations/contact`
  - [ ] Récupérer l'IP via `headers()` de `next/headers` (`x-forwarded-for` ou `x-real-ip`)
  - [ ] **Étape 1** : Vérifier le honeypot — si `honeypot` non vide, retourner `{ success: true }` silencieusement (ne pas alerter le bot)
  - [ ] **Étape 2** : Appliquer le rate limit — si dépassé, retourner `{ success: false, error: 'rate-limited' }`
  - [ ] **Étape 3** : Valider côté serveur avec `getContactSchema('en').safeParse(data)` — si invalide, retourner erreur
  - [ ] **Étape 4** : Appeler `sendContactEmail(data)`
  - [ ] **Étape 5** : Retourner le résultat (`success` ou `error`)
  - [ ] Wrapper le tout dans try/catch pour les erreurs inattendues

- [ ] **Task 5: Ajouter le champ honeypot au formulaire** (AC: 6)
  - [ ] Modifier `src/components/features/contact/ContactForm.tsx`
  - [ ] Ajouter un champ caché `honeypot` au schéma `defaultValues` : `honeypot: ''`
  - [ ] Rendre un `<input>` caché avec `aria-hidden="true"`, `tabIndex={-1}`, `autoComplete="off"`
  - [ ] Style : `className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"` (pas `display:none` — certains bots détectent)
  - [ ] Passer la valeur `honeypot` dans l'appel à `submitContactForm`
  - [ ] **NE PAS** ajouter le champ honeypot au schéma Zod côté client — le garder comme champ non validé

- [ ] **Task 6: Mettre à jour les messages d'erreur** (AC: 4)
  - [ ] Modifier `ContactForm.tsx` `onSubmit` pour gérer le cas `error: 'rate-limited'`
  - [ ] Ajouter un toast spécifique : FR "Trop de tentatives. Réessayez dans une minute." / EN "Too many attempts. Try again in a minute."

- [ ] **Task 7: Build Verification** (AC: 8)
  - [ ] Run `npm run build` — no errors
  - [ ] Test: Soumission avec données valides → email envoyé (manual, nécessite API key)
  - [ ] Test: Honeypot rempli → silently accepted, pas d'email (manual)
  - [ ] Test: Rate limit → message d'erreur après 5+ soumissions rapides (manual)
  - [ ] Test: Données invalides côté serveur → erreur retournée (manual)

## Dev Notes

### Architecture Compliance

**New Files:**
```
src/lib/email.ts                              # Module d'envoi Resend
src/lib/rate-limit.ts                         # Rate limiter in-memory
.env.example                                  # Template variables d'environnement
```

**Modified Files:**
```
src/app/[locale]/contact/actions.ts           # Server action — impl réelle
src/components/features/contact/ContactForm.tsx  # Ajout honeypot + rate-limit toast
package.json                                  # Ajout resend
package-lock.json                             # Lock file
```

**Created locally (pas commité) :**
```
.env.local                                    # Variables d'environnement réelles
```

### Critical Rules

1. `@/` alias pour tous les imports
2. `'use server'` sur actions.ts — server action Next.js
3. NE PAS modifier `components/ui/` (anti-pattern project-context)
4. TypeScript strict — no `any` types
5. Variables d'environnement : `RESEND_API_KEY` et `CONTACT_EMAIL_TO` via `process.env`
6. `.env.local` DOIT être dans `.gitignore` (vérifier)

### Resend SDK Pattern

```tsx
// src/lib/email.ts
import { Resend } from 'resend'
import type { ContactFormData } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // ou domaine vérifié
      to: process.env.CONTACT_EMAIL_TO!,
      replyTo: data.email,
      subject: `[Portfolio] Nouveau message de ${data.name}`,
      text: `Nom: ${data.name}\nEmail: ${data.email}\nEntreprise: ${data.company || 'Non renseignée'}\n\nMessage:\n${data.message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'email-failed' }
    }

    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, error: 'email-failed' }
  }
}
```

### Rate Limiter Pattern

```tsx
// src/lib/rate-limit.ts
const rateMap = new Map<string, number[]>()

export function rateLimit(
  ip: string,
  limit = 5,
  windowMs = 60_000
): { success: boolean; remaining: number } {
  const now = Date.now()
  const timestamps = (rateMap.get(ip) ?? []).filter(t => now - t < windowMs)

  if (timestamps.length >= limit) {
    rateMap.set(ip, timestamps)
    return { success: false, remaining: 0 }
  }

  timestamps.push(now)
  rateMap.set(ip, timestamps)
  return { success: true, remaining: limit - timestamps.length }
}
```

### Server Action Pattern

```tsx
// src/app/[locale]/contact/actions.ts
'use server'

import { headers } from 'next/headers'
import { getContactSchema, type ContactFormData } from '@/lib/validations/contact'
import { sendContactEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

interface SubmitResult {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: ContactFormData & { honeypot?: string }
): Promise<SubmitResult> {
  try {
    // Step 1: Honeypot check — silent accept if bot
    if (data.honeypot) {
      return { success: true }
    }

    // Step 2: Rate limiting
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? headersList.get('x-real-ip')
      ?? 'unknown'
    const rateLimitResult = rateLimit(ip)
    if (!rateLimitResult.success) {
      return { success: false, error: 'rate-limited' }
    }

    // Step 3: Server-side validation (defense in depth)
    const schema = getContactSchema('en')
    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'validation-failed' }
    }

    // Step 4: Send email
    return await sendContactEmail(parsed.data)
  } catch (err) {
    console.error('submitContactForm error:', err)
    return { success: false, error: 'unknown' }
  }
}
```

### Honeypot Field Pattern

```tsx
// Dans ContactForm.tsx — ajouter dans le form, avant les FormFields visibles
<div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
  <input
    type="text"
    name="honeypot"
    tabIndex={-1}
    autoComplete="off"
    value={honeypot}
    onChange={(e) => setHoneypot(e.target.value)}
  />
</div>
```

**Note** : Le honeypot est géré via un `useState` séparé (pas via React Hook Form) car il n'a pas besoin de validation Zod. Il est passé manuellement dans l'appel `submitContactForm({ ...data, honeypot })`.

### ContactForm onSubmit Update

```tsx
async function onSubmit(data: ContactFormData) {
  const result = await submitContactForm({ ...data, honeypot })

  if (result.success) {
    toast.success(t.successTitle, { description: t.successDesc })
    form.reset()
  } else if (result.error === 'rate-limited') {
    toast.error(t.rateLimitTitle, { description: t.rateLimitDesc })
  } else {
    toast.error(t.errorTitle, { description: t.errorDesc })
  }
}
```

Nouveaux labels i18n à ajouter dans `t` :
- FR: `rateLimitTitle: 'Trop de tentatives'`, `rateLimitDesc: 'Veuillez réessayer dans une minute.'`
- EN: `rateLimitTitle: 'Too many attempts'`, `rateLimitDesc: 'Please try again in a minute.'`

### Environment Variables

```bash
# .env.example (à commiter)
# Contact Form - Resend API
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL_TO=your_email@example.com

# .env.local (NE PAS commiter)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=baptiste@example.com
```

### .gitignore Check

Vérifier que `.gitignore` contient déjà `.env*.local`. Next.js le fait par défaut mais confirmer.

### Previous Story Intelligence

**From Story 6-2 (Contact Form with Validation):**
- `ContactForm.tsx` utilise React Hook Form avec `mode: 'onBlur'`
- `onSubmit` gère déjà `result.success` et `result.error` avec toast
- Server action stub retourne `{ success: boolean; error?: string }` — même interface
- `getContactSchema(locale)` existe déjà pour validation serveur
- `<Toaster />` est rendu dans la page contact
- Loader2 spinner déjà implémenté pendant `isSubmitting`
- Toast success réinitialise le form via `form.reset()` — déjà fonctionnel

**From Story 6-1 (Availability Status CTA):**
- Le CTA "Disponible pour mission" pointe vers `/contact` — la page doit fonctionner end-to-end

### NFR Requirements

- **NFR-PERF-07** : Form submission feedback < 1s (P95) — Resend API est rapide (~200-300ms)
- **NFR-USA-02** : Préservation données en cas d'erreur — déjà géré par React Hook Form (pas de `form.reset()` en cas d'erreur)

### Security Considerations

- **CSRF** : Protégé automatiquement par Next.js server actions
- **XSS** : Zod valide et sanitize les inputs; l'email est envoyé en text plain (pas HTML)
- **Rate limiting** : In-memory, reset au redéploiement — suffisant pour un portfolio
- **Honeypot** : Technique anti-bot simple mais efficace pour un site non ciblé
- **Secrets** : `RESEND_API_KEY` uniquement côté serveur (server action), jamais exposé au client

### Dependencies

- **Requires**: Story 6-2 done (formulaire + validation + page contact)
- **New packages**: `resend`
- **Enables**: Flux complet de conversion — visiteur peut contacter Baptiste

### References

- [PRD](/_bmad-output/planning-artifacts/prd.md) — FR-CE-02, NFR-PERF-07, NFR-USA-02
- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Server actions, Vercel deployment
- [Epics](/_bmad-output/planning-artifacts/epics.md) — Story 6.3
- [Project Context](/_bmad-output/project-context.md) — TypeScript strict, import rules
- [Story 6-2](/_bmad-output/implementation-artifacts/6-2-contact-form-with-validation.md) — Prédécesseur direct
- [Resend Docs](https://resend.com/docs/send-with-nextjs) — SDK Next.js integration

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] Soumission valide → email reçu par Baptiste (nécessite RESEND_API_KEY)
- [ ] Soumission valide → toast succès + form reset
- [ ] Soumission échouée (API down) → toast erreur + données préservées
- [ ] Honeypot rempli → accepted silently, PAS d'email envoyé
- [ ] Rate limit (6e soumission en <1min) → toast "Trop de tentatives"
- [ ] Données invalides côté serveur → erreur retournée
- [ ] `.env.local` non visible dans le bundle client
- [ ] `.env.example` documenté
- [ ] Email contient tous les champs (nom, email, entreprise, message)
- [ ] `replyTo` dans l'email = email du visiteur

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- All 7 tasks completed, build passes
- Resend SDK installed, email module created at `src/lib/email.ts`
- In-memory rate limiter at `src/lib/rate-limit.ts` (5 req/min per IP)
- Server action updated with full pipeline: honeypot → rate limit → server validation → email send
- Honeypot field added to ContactForm (hidden input, separate useState)
- Rate-limit toast added (FR/EN)
- `.env.example` created, `.gitignore` updated with `!.env.example` exception

### File List

- `src/lib/email.ts` (NEW)
- `src/lib/rate-limit.ts` (NEW)
- `.env.example` (NEW)
- `src/app/[locale]/contact/actions.ts` (MODIFIED)
- `src/components/features/contact/ContactForm.tsx` (MODIFIED)
- `.gitignore` (MODIFIED)
- `package.json` (MODIFIED — resend dependency)
- `package-lock.json` (MODIFIED)
