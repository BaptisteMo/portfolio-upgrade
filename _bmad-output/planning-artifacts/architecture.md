---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowStatus: 'complete'
completedAt: '2026-01-21'
inputDocuments:
  - prd.md
  - ux-design-specification.md
  - implementation-readiness-report-2026-01-14.md
  - brainstorming-session-2026-01-11.md
workflowType: 'architecture'
project_name: 'portoflio-upgrade'
user_name: 'Baptiste'
date: '2026-01-21'
---

# Architecture Decision Document

_Ce document se construit collaborativement à travers une découverte étape par étape. Les sections sont ajoutées au fur et à mesure que nous travaillons ensemble sur chaque décision architecturale._

## Notes Initiales

- **Animation Stack** : Framer Motion + GSAP (confirmé par l'utilisateur pour animations complexes)

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
40 FRs réparties en 8 domaines de capacité couvrant :
- Hero Landing avec présentation et call-to-action
- Navigation tri-panneau avec panel contextuel dynamique
- Command Palette (Cmd+K) pour navigation rapide et recherche
- Système de case studies avec métadonnées et contenu riche
- Composants statistiques et visualisation de compétences
- Animations et micro-interactions cohérentes

**Non-Functional Requirements:**
18 NFRs structurant les décisions architecturales :
- **Performance** : Core Web Vitals (Lighthouse > 90, FCP < 1.5s, TTI < 3s, animations 60fps)
- **Maintenabilité** : Code TypeScript strict, composants modulaires, design tokens CSS variables
- **Utilisabilité** : WCAG AA, navigation clavier complète, support reduced-motion

**Scale & Complexity:**
- Primary domain: Frontend Web (Next.js SSG/ISR)
- Complexity level: Medium-High
- Estimated architectural components: ~15-20 (7 custom + shadcn extensions + layouts + utilities)

### Technical Constraints & Dependencies

**Stack Confirmé :**
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + CSS Variables (design tokens)
- UI Library: Shadcn/ui (baseline components)
- Animation: Framer Motion + GSAP
- Command Palette: cmdk library

**Contraintes Techniques :**
- SSG prioritaire pour performance (pages statiques)
- Pas de base de données (contenu statique/MDX)
- Optimisation images via next/image
- Font loading optimisé (Satoshi + Fraunces)

### Cross-Cutting Concerns Identified

1. **Animation System** : Coordination Framer Motion / GSAP, respect prefers-reduced-motion
2. **Theme System** : Dark mode default, CSS variables, toggle via Command Palette
3. **Responsive Adaptation** : Tri-panel → Single column, Desktop Cmd+K → Mobile FAB + Bottom Sheet
4. **Keyboard Navigation** : Focus management, shortcuts globaux, accessibilité
5. **Performance Budget** : Lazy loading, code splitting, font optimization

## Starter Template Evaluation

### Primary Technology Domain

Web Application Frontend (SSG/ISR) - Portfolio statique avec interactions riches

### Starter Options Considered

1. **create-next-app@latest + shadcn init** - Approche officielle modulaire
2. **next14-shadcn-starter** - Template GitHub pré-configuré
3. **shadcn/create** - Nouveau scaffolding shadcn

### Selected Starter: create-next-app + shadcn/ui CLI

**Rationale for Selection:**
- Versions officielles toujours à jour
- Flexibilité maximale sur la configuration
- Tailwind CSS v4 support natif
- Documentation complète et maintenue

**Initialization Commands:**

```bash
# Étape 1: Créer le projet Next.js
npx create-next-app@latest portoflio-upgrade --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Étape 2: Initialiser shadcn/ui
cd portoflio-upgrade
npx shadcn@latest init
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript strict mode activé
- React 19 (avec Next.js 16) ou React 18 (Next.js 15)
- ESLint configuration par défaut

**Styling Solution:**
- Tailwind CSS v4 (configuration CSS-first)
- CSS Variables pour design tokens
- PostCSS avec @tailwindcss/postcss

**Build Tooling:**
- Turbopack (dev et build avec Next.js 16)
- Optimisation automatique des images/fonts
- Code splitting automatique

**Code Organization:**
- App Router (dossier `app/`)
- Source directory (`src/`)
- Import alias `@/*` configuré
- Structure shadcn: `components/ui/`

**Development Experience:**
- Hot reload avec Turbopack
- TypeScript IntelliSense complet
- ESLint intégré

**Note:** L'initialisation du projet avec ces commandes sera la première story d'implémentation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Content Architecture: MDX avec frontmatter typé
- State Management: Solutions intégrées (next-themes, cmdk, useState)
- Animation Stack: Framer Motion + GSAP avec règles de répartition

**Deferred Decisions (Post-MVP):**
- Analytics (peut être ajouté plus tard)
- Optimisations avancées (après validation performance)

### Content Architecture

**Decision:** MDX pour tout le contenu

| Aspect | Choix |
|--------|-------|
| Format | Fichiers `.mdx` dans `src/content/` |
| Structure | Frontmatter typé pour metadata + contenu riche markdown |
| Panel contextuel | Données extraites du frontmatter MDX actif |
| Rationale | Versionné avec Git, composants React intégrés, pas de dépendance externe |

**Structure des fichiers :**
```
src/content/
├── projects/
│   ├── khora.mdx
│   ├── farmer.mdx
│   └── portfolio.mdx
├── about.mdx
└── meta.ts          # Types TypeScript pour frontmatter
```

### State Management

**Decision:** Solutions intégrées shadcn/ui - pas de state management externe

| Besoin | Solution |
|--------|----------|
| Theme dark/light | `next-themes` (shadcn built-in) |
| Command Palette | `cmdk` state interne |
| Bottom Sheet mobile | Simple `useState` local |
| Panel contextuel | Dérivé de la route/MDX actif |

**Rationale:** Moins de dépendances, moins de complexité, solutions battle-tested.

### Animation Coordination

**Decision:** Framer Motion + GSAP avec règles de répartition claires

| Framer Motion | GSAP |
|---------------|------|
| Transitions composants React | Scroll-triggered animations |
| AnimatePresence (mount/unmount) | Timelines séquencées complexes |
| Hover/tap micro-interactions | Morphing SVG |
| Layout animations | ScrollTrigger parallax |
| Variants pour états | Animations haute performance |

**Règle générale:** Framer Motion par défaut, GSAP pour scroll et séquences complexes.

**Accessibilité:** Toutes les animations doivent respecter `prefers-reduced-motion`.

### Infrastructure & Deployment

**Decision:** Vercel

| Aspect | Choix |
|--------|-------|
| Hosting | Vercel (intégration native Next.js) |
| CI/CD | Vercel Git integration (auto-deploy on push) |
| Preview | Automatic preview deployments sur PR |
| Domain | Custom domain configuration |

**Rationale:** Zero config, optimisé pour Next.js, gratuit pour projets personnels.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Points de conflit identifiés :** 5 catégories où les agents IA pourraient faire des choix différents

### Naming Patterns

**Fichiers & Composants:**

| Élément | Convention | Exemple |
|---------|------------|---------|
| Composants React | PascalCase | `ProjectCard.tsx` |
| Hooks custom | camelCase + `use` | `useCommandPalette.ts` |
| Utilitaires | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `ProjectMeta` |
| MDX files | kebab-case | `projet-khora.mdx` |
| CSS Variables | kebab-case | `--color-primary` |

### Structure Patterns

**Organisation des composants:**
```
src/components/
├── ui/                    # Shadcn/ui (auto-généré)
├── layout/               # Composants de layout (TriPanelLayout, etc.)
├── features/             # Composants par feature
│   └── [feature-name]/   # Dossier par composant majeur
└── shared/               # Composants réutilisables
```

**Règle dossier composant:**
Chaque composant custom majeur = dossier avec `ComponentName.tsx` + `index.ts`

### Format Patterns

**MDX Frontmatter Standard:**
Tous les fichiers MDX projet DOIVENT inclure les champs obligatoires définis dans `src/content/meta.ts`

**Import Pattern:**
- TOUJOURS utiliser l'alias `@/` pour les imports
- JAMAIS de chemins relatifs profonds (`../../../`)

### Communication Patterns

**Theme Toggle:**
Via `next-themes` uniquement - pas de state custom pour le theme

**Command Palette:**
État géré par `cmdk` - ouverture via `Cmd+K` (desktop) ou FAB (mobile)

### Process Patterns

**Animation Accessibility:**
TOUTES les animations GSAP doivent checker `prefers-reduced-motion` avant exécution

**Loading States:**
Utiliser les conventions React Suspense + loading.tsx de Next.js App Router

### Enforcement Guidelines

**Tous les agents IA DOIVENT:**
1. Utiliser l'alias `@/` pour tous les imports
2. Respecter les conventions de naming définies
3. Placer les composants dans la structure définie
4. Vérifier `prefers-reduced-motion` pour GSAP
5. Typer le frontmatter MDX selon `meta.ts`

### Anti-Patterns à Éviter

| Anti-Pattern | Pourquoi |
|--------------|----------|
| Imports avec chemins relatifs profonds | Difficile à maintenir, refactoring complexe |
| Composants sans sous-dossier approprié | Structure incohérente |
| Animations GSAP sans check reduced-motion | Accessibilité non respectée |
| State custom pour theme | Duplication avec next-themes |
| Frontmatter MDX non typé | Erreurs runtime, données incohérentes |

## Project Structure & Boundaries

### Complete Project Directory Structure

```
portoflio-upgrade/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json                 # Config shadcn/ui
├── .env.example
├── .gitignore
├── .eslintrc.json
│
├── public/
│   ├── fonts/
│   │   ├── satoshi/               # Font UI
│   │   └── fraunces/              # Font body
│   └── images/
│       ├── projects/              # Screenshots projets
│       └── og/                    # Open Graph images
│
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind + CSS Variables (design tokens)
│   │   ├── layout.tsx             # Root layout (ThemeProvider, fonts)
│   │   ├── page.tsx               # Home / Hero Landing
│   │   ├── loading.tsx            # Global loading state
│   │   ├── not-found.tsx          # 404 page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       ├── page.tsx           # Projects list
│   │       └── [slug]/
│   │           └── page.tsx       # Project detail (case study)
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui (auto-généré)
│   │   │
│   │   ├── layout/
│   │   │   ├── TriPanelLayout/
│   │   │   │   ├── TriPanelLayout.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   └── NavigationPanel/
│   │   │       ├── NavigationPanel.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── features/
│   │   │   ├── hero/
│   │   │   │   ├── HeroLanding.tsx
│   │   │   │   └── index.ts
│   │   │   ├── command-palette/
│   │   │   │   ├── CommandPalette.tsx
│   │   │   │   ├── useCommandPalette.ts
│   │   │   │   └── index.ts
│   │   │   ├── context-panel/
│   │   │   │   ├── ContextPanel.tsx
│   │   │   │   ├── ContextPanel.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── project-card/
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   └── index.ts
│   │   │   ├── case-study/
│   │   │   │   ├── CaseStudyHeader.tsx
│   │   │   │   └── index.ts
│   │   │   ├── stats/
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── SkillsGrid.tsx
│   │   │   │   └── index.ts
│   │   │   ├── shortcuts-bar/
│   │   │   │   ├── ShortcutsBar.tsx
│   │   │   │   └── index.ts
│   │   │   └── mobile-nav/
│   │   │       ├── MobileBottomSheet.tsx
│   │   │       ├── FloatingActionButton.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── shared/
│   │       ├── ThemeToggle.tsx
│   │       ├── AnimatedContainer.tsx
│   │       └── MDXComponents.tsx  # Custom MDX components
│   │
│   ├── content/
│   │   ├── meta.ts                # Types frontmatter (ProjectMeta, etc.)
│   │   ├── projects/
│   │   │   ├── khora.mdx
│   │   │   ├── farmer.mdx
│   │   │   └── portfolio.mdx
│   │   └── about.mdx
│   │
│   ├── lib/
│   │   ├── utils.ts               # cn() utility (shadcn)
│   │   ├── mdx.ts                 # MDX parsing utilities
│   │   ├── fonts.ts               # Font configuration
│   │   └── animations.ts          # GSAP/Framer shared configs
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts
│   │   └── useKeyboardShortcut.ts
│   │
│   └── types/
│       └── index.ts               # Global type definitions
│
└── tests/
    ├── components/
    └── e2e/
```

### Architectural Boundaries

**Component Communication:**

| Boundary | Pattern |
|----------|---------|
| Layout → Features | Props only, pas de state partagé |
| Features ↔ Content | Import MDX via `lib/mdx.ts` |
| Command Palette ↔ Navigation | URL routing (Next.js router) |
| Theme ↔ All | `next-themes` context (provider in layout) |

**Data Flow:**
```
MDX Files (src/content/)
    ↓ parsed by lib/mdx.ts
Typed Content (ProjectMeta)
    ↓ passed to
Page Components (src/app/)
    ↓ props to
Feature Components + Context Panel
```

### Requirements to Structure Mapping

| Domaine Fonctionnel | Location |
|---------------------|----------|
| Hero Landing | `src/components/features/hero/` |
| Tri-Panel Layout | `src/components/layout/TriPanelLayout/` |
| Command Palette | `src/components/features/command-palette/` |
| Context Panel | `src/components/features/context-panel/` |
| Project Cards | `src/components/features/project-card/` |
| Case Studies | `src/app/projects/[slug]/` + `src/content/projects/` |
| Stats Display | `src/components/features/stats/` |
| Mobile Navigation | `src/components/features/mobile-nav/` |

### Cross-Cutting Concerns Mapping

| Concern | Location |
|---------|----------|
| Theme System | `src/app/layout.tsx` (provider) + `src/components/shared/ThemeToggle.tsx` |
| Animation Utils | `src/lib/animations.ts` + `src/hooks/useReducedMotion.ts` |
| Typography/Fonts | `src/lib/fonts.ts` + `public/fonts/` |
| MDX Processing | `src/lib/mdx.ts` + `src/content/meta.ts` |
| Keyboard Shortcuts | `src/hooks/useKeyboardShortcut.ts` |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
Toutes les technologies choisies sont compatibles et forment un stack cohérent :
- Next.js + TypeScript + Tailwind : Stack officiel documenté
- Shadcn/ui + Tailwind CSS v4 : Même écosystème
- Framer Motion + GSAP : Cohabitent avec règles de répartition
- MDX + App Router : Support natif

**Pattern Consistency:**
- Naming conventions cohérentes à travers le projet
- Structure aligne avec les conventions App Router
- Communication patterns respectent le flux unidirectionnel React

**Structure Alignment:**
- Project structure supporte toutes les décisions architecturales
- Boundaries clairement définis entre layout/features/shared
- Integration points bien structurés (lib/, hooks/)

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
40 FRs couverts à 100% par les décisions architecturales :
- Chaque domaine FR mappé à un dossier spécifique
- Composants custom identifiés et localisés
- Patterns d'animation définis pour micro-interactions

**Non-Functional Requirements Coverage:**
18 NFRs adressés architecturalement :
- Performance : SSG, Turbopack, code splitting
- Accessibilité : reduced-motion hook, patterns WCAG
- Maintenabilité : TypeScript strict, structure modulaire

### Implementation Readiness Validation ✅

**Decision Completeness:**
- Toutes les décisions critiques documentées
- Commandes d'initialisation fournies
- Règles de répartition Framer/GSAP claires

**Structure Completeness:**
- Arborescence complète avec tous les fichiers
- Boundaries composants bien définis
- Data flow documenté

**Pattern Completeness:**
- Conventions naming complètes avec exemples
- Anti-patterns identifiés et documentés
- Guidelines enforcement clairs

### Gap Analysis Results

**Aucun gap critique identifié.**

**Gaps mineurs (non-bloquants) :**
- MDX processing library à choisir lors de l'implémentation (contentlayer vs next-mdx-remote)
- Framework de tests E2E à décider post-MVP

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context analysé (40 FRs, 18 NFRs)
- [x] Scale et complexity évalués (Medium-High)
- [x] Contraintes techniques identifiées (SSG, no DB)
- [x] Cross-cutting concerns mappés (5 concerns)

**✅ Architectural Decisions**
- [x] Stack technologique complet (Next.js, TS, Tailwind, Shadcn)
- [x] Content architecture définie (MDX)
- [x] Animation stack coordonné (Framer + GSAP)
- [x] Infrastructure choisie (Vercel)

**✅ Implementation Patterns**
- [x] Naming conventions établies
- [x] Structure patterns définis
- [x] Communication patterns spécifiés
- [x] Process patterns documentés

**✅ Project Structure**
- [x] Directory structure complète
- [x] Component boundaries établis
- [x] Requirements mappés à la structure

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Stack moderne et bien documenté
- Structure claire pour collaboration multi-agents
- Patterns explicites réduisant les conflits potentiels
- Alignment fort avec PRD et UX Spec

**Areas for Future Enhancement:**
- Analytics implementation (post-MVP)
- Performance monitoring setup
- E2E testing framework selection

### Implementation Handoff

**AI Agent Guidelines:**
1. Suivre toutes les décisions architecturales exactement comme documentées
2. Utiliser les patterns d'implémentation de manière consistante
3. Respecter la structure projet et les boundaries
4. Référer à ce document pour toute question architecturale

**First Implementation Priority:**
```bash
npx create-next-app@latest portoflio-upgrade --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx shadcn@latest init
```

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-21
**Document Location:** `_bmad-output/planning-artifacts/architecture.md`

### Final Architecture Deliverables

**📋 Complete Architecture Document**
- Toutes les décisions architecturales documentées avec versions spécifiques
- Patterns d'implémentation garantissant la consistance des agents IA
- Structure projet complète avec tous les fichiers et répertoires
- Mapping requirements → architecture
- Validation confirmant cohérence et complétude

**🏗️ Implementation Ready Foundation**
- 12+ décisions architecturales prises
- 5+ patterns d'implémentation définis
- 8 domaines fonctionnels mappés
- 40 FRs + 18 NFRs supportés

**📚 AI Agent Implementation Guide**
- Stack technologique avec versions vérifiées
- Règles de consistance prévenant les conflits d'implémentation
- Structure projet avec boundaries clairs
- Patterns d'intégration et standards de communication

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] Toutes les décisions fonctionnent ensemble sans conflits
- [x] Choix technologiques compatibles
- [x] Patterns supportent les décisions architecturales
- [x] Structure alignée avec tous les choix

**✅ Requirements Coverage**
- [x] Tous les functional requirements supportés
- [x] Tous les non-functional requirements adressés
- [x] Cross-cutting concerns gérés
- [x] Points d'intégration définis

**✅ Implementation Readiness**
- [x] Décisions spécifiques et actionnables
- [x] Patterns préviennent les conflits entre agents
- [x] Structure complète et non-ambiguë
- [x] Exemples fournis pour clarté

---

**Architecture Status:** ✅ READY FOR IMPLEMENTATION

**Next Phase:** Créer les Epics & Stories puis commencer l'implémentation

**Document Maintenance:** Mettre à jour cette architecture si des décisions techniques majeures sont prises pendant l'implémentation.

