# Story 7.9: Vercel Analytics Integration

Status: done

## Story

**As** Baptiste,
**I want** analytics to track visitor engagement,
**So that** I can understand how recruiters interact with my portfolio.

## Acceptance Criteria

1. **AC1**: Vercel Analytics est intégré via `@vercel/analytics`
2. **AC2**: Les page views sont trackées automatiquement
3. **AC3**: Les Web Vitals sont reportés (FCP, LCP, CLS, FID)
4. **AC4**: Aucune donnée personnelle n'est collectée (GDPR compliant)
5. **AC5**: Le script analytics n'impacte pas le score Lighthouse
6. **AC6**: Le dashboard est accessible via le projet Vercel
7. **AC7**: Le build passe sans erreurs

## Tasks / Subtasks

- [x] **Task 1: Installer @vercel/analytics** (AC: 1)
  - [x] `npm install @vercel/analytics @vercel/speed-insights` ✅
  - [x] Versions installées dans package.json

- [x] **Task 2: Intégrer le composant Analytics** (AC: 1, 2, 5)
  - [x] Ajouté `<Analytics />` dans `src/app/layout.tsx` (root layout) après ThemeProvider
  - [x] Le composant se charge automatiquement de manière non-bloquante

- [x] **Task 3: Intégrer Speed Insights (Web Vitals)** (AC: 3)
  - [x] Ajouté `<SpeedInsights />` dans `src/app/layout.tsx` après Analytics

- [x] **Task 4: Vérifier la conformité GDPR** (AC: 4)
  - [x] Vercel Analytics : cookie-free, pas de fingerprinting ✅
  - [x] Commentaire GDPR ajouté dans le code

- [x] **Task 5: Build Verification** (AC: 5, 7)
  - [x] Run `npm run build` — no errors ✅
  - [ ] Lighthouse : pas d'impact négatif sur Performance (manual)

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/app/layout.tsx          # Analytics + SpeedInsights components
package.json                # @vercel/analytics, @vercel/speed-insights
```

### Critical Rules

1. `@/` alias pour tous les imports
2. NE PAS modifier `components/ui/`
3. Analytics dans le ROOT layout (`src/app/layout.tsx`), pas le locale layout
4. Le composant Analytics se charge automatiquement — pas de config supplémentaire
5. Fonctionne automatiquement en production sur Vercel, noop en dev local

### Integration Pattern

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <ThemeProvider ...>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Dependencies

- **Requires**: Aucune
- **New packages**: `@vercel/analytics`, `@vercel/speed-insights`

### References

- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Root Layout](src/app/layout.tsx) — Point d'intégration

### Testing Checklist

- [ ] Build passe sans erreurs
- [ ] `@vercel/analytics` dans package.json
- [ ] `@vercel/speed-insights` dans package.json
- [ ] `<Analytics />` dans root layout
- [ ] `<SpeedInsights />` dans root layout
- [ ] En dev : pas d'erreur console (noop silencieux)
- [ ] Lighthouse : pas de régression Performance

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5

### Completion Notes List

- Installé `@vercel/analytics` et `@vercel/speed-insights`
- Ajouté `<Analytics />` et `<SpeedInsights />` dans le root layout (`src/app/layout.tsx`), après `</ThemeProvider>` dans le `<body>`
- Commentaire GDPR ajouté : cookie-free, privacy-compliant
- Page views trackées automatiquement, Web Vitals (FCP, LCP, CLS, FID) reportés via Speed Insights
- Noop silencieux en dev local, actif en production sur Vercel
- Build passe sans erreurs

### File List

- `src/app/layout.tsx` — MODIFIED: ajout Analytics + SpeedInsights
- `package.json` — MODIFIED: ajout @vercel/analytics, @vercel/speed-insights
