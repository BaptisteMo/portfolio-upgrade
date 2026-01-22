---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
  - project-context.md
workflowType: 'epics-and-stories'
project_name: 'portoflio-upgrade'
user_name: 'Baptiste'
date: '2026-01-21'
---

# portoflio-upgrade - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for portoflio-upgrade, decomposing the requirements from the PRD, UX Design, Architecture, and Project Context into implementable stories.

## Requirements Inventory

### Functional Requirements

**Capability Area 1: Content Presentation System (7 FRs)**

- FR-CP-01: Splash Screen Animé Full Viewport - Le système DOIT afficher un splash screen full viewport (100vh) animé avec typographie monumentale, tagline avec keywords critiques, animation d'entrée spectaculaire, et indication visuelle pour interagir
- FR-CP-01-BIS: Transition Splash → Dashboard - Le système DOIT fournir une transition fluide et animée du splash screen vers le dashboard principal suite à interaction utilisateur
- FR-CP-01-TER: Mode Dashboard Tri-Panel - Le système DOIT afficher le portfolio en mode "dashboard" après le splash screen avec layout tri-panel responsive (Desktop: 20% Nav / 50% Content / 30% Context)
- FR-CP-02: Liste Projets avec Tags Visuels - Le système DOIT afficher une liste de projets avec tags visuels cliquables (B2B SaaS, CRM, Design System, 0→1)
- FR-CP-03: Structure Case Study Standard - Le système DOIT présenter chaque case study avec structure narrative: Context → Research → Process → Solution → Results
- FR-CP-04: Affichage Résultats Business Quantifiés - Le système DOIT afficher des métriques business factuelles dans la section Results
- FR-CP-05: Page About avec Positionnement - Le système DOIT fournir une page About avec bio, positionnement (Founder Designer), et timeline d'expérience

**Capability Area 2: Contextual Information Panel (3 FRs)**

- FR-CIP-01: Panel Adaptatif selon Section - Le système DOIT afficher un panel contextuel qui change son contenu selon la section du case study consultée
- FR-CIP-02: Variantes Contextuelles - Le système DOIT fournir variantes: Problem → Contraintes business, Solution → Alternatives envisagées, Results → Métriques détaillées
- FR-CIP-03: Comportement Responsive Panel - Le système DOIT adapter le panel: Desktop (30% fixe), Tablet/Mobile (slide-over activable)

**Capability Area 3: Advanced Navigation & Command Interface (5 FRs)**

- FR-NAV-01: Command Palette Cmd+K - Le système DOIT fournir une command palette activable via Cmd+K (Mac) ou Ctrl+K (Windows/Linux)
- FR-NAV-02: Commandes Navigation Essentielles - Le système DOIT fournir commandes: /home, /about, /contact, /projects, /project-1, /dark, /light
- FR-NAV-03: Recherche Fuzzy dans Palette - Le système DOIT permettre recherche fuzzy dans la command palette
- FR-NAV-04: Navigation Clavier Palette - Le système DOIT permettre navigation clavier (↑↓ sélection, Enter validation, Esc fermeture)
- FR-NAV-05: Breadcrumbs Navigation - Le système DOIT afficher un fil d'ariane dans le header

**Capability Area 4: Visual Experience & Interactions (6 FRs)**

- FR-VX-01: Animations Hero Typography - Le système DOIT animer la typographie hero section (cascade, fade-in, timing curves)
- FR-VX-02: Hover Effects Narratifs - Le système DOIT fournir 5-10 hover effects narratifs clés sur éléments interactifs
- FR-VX-03: Scroll Parallax Subtil - Le système DOIT implémenter animations scroll parallax subtiles sur éléments visuels clés
- FR-VX-04: Page Transitions Fluides - Le système DOIT fournir transitions fluides entre pages (< 300ms)
- FR-VX-05: Compteurs Animés Métriques - Le système DOIT animer les chiffres d'impact (compteur progressif)
- FR-VX-06: Dark/Light Mode Toggle - Le système DOIT fournir un toggle dark/light mode avec transition smooth

**Capability Area 5: Conversion & Engagement (4 FRs)**

- FR-CE-01: CTA "Disponible" avec Statut - Le système DOIT afficher un CTA avec statut (🟢 Disponible, 🟡 Discussions, 🔴 Non disponible)
- FR-CE-02: Formulaire Contact avec Validation - Le système DOIT fournir un formulaire contact avec validation temps réel
- FR-CE-03: Social Sharing Meta Tags - Le système DOIT générer meta tags Open Graph et Twitter Cards
- FR-CE-04: Easter Egg Konami Code - Le système DOIT détecter le Konami code et déclencher Design Forensics (grille + wireframe + process)

**Capability Area 6: Technical Performance & Optimization (5 FRs)**

- FR-PERF-01: Performance Targets Lighthouse - Le système DOIT atteindre Lighthouse Performance Score > 90
- FR-PERF-02: Core Web Vitals Targets - FCP < 1.5s, LCP < 2.5s, TTI < 3s, CLS < 0.1, FID < 100ms
- FR-PERF-03: Image Optimization Automatique - Le système DOIT optimiser automatiquement toutes les images (lazy load, WebP, responsive)
- FR-PERF-04: Code Splitting par Route - Le système DOIT implémenter code splitting automatique par route
- FR-PERF-05: Font Optimization - Le système DOIT optimiser le chargement des fonts (preload, variable fonts)

**Capability Area 7: Accessibility & Inclusivity (6 FRs)**

- FR-A11Y-01: WCAG AA Baseline - Contraste 4.5:1, navigation clavier complète, focus visible, alt text images
- FR-A11Y-02: Skip Links - Skip link "Skip to main content" visible au premier Tab
- FR-A11Y-03: Focus Trap Command Palette - Focus piégé dans la command palette quand ouverte
- FR-A11Y-04: Focus Trap Modals & Slide-Overs - Focus piégé dans modals et slide-overs
- FR-A11Y-05: Reduced Motion Support - Détecter prefers-reduced-motion et désactiver animations complexes
- FR-A11Y-06: ARIA Labels Complets - ARIA labels sur tous éléments interactifs non explicites

**Capability Area 8 (Bonus): Analytics & Tracking (2 FRs)**

- FR-ANALYTICS-01: Vercel Analytics Integration - Intégrer Vercel Analytics pour tracking métriques engagement
- FR-ANALYTICS-02: Command Palette Usage Tracking - Tracker utilisation command palette (% visiteurs)

**Capability Area 9: Internationalization (1 FR)**

- FR-I18N-01: Internationalisation FR/EN - Le système DOIT supporter 2 langues (Français par défaut, Anglais), permettre le switch via toggle header ET Command Palette (/fr, /en), persister le choix (localStorage), charger le contenu MDX de la langue sélectionnée, et adapter les URLs (/fr/... ou /en/...)

### Non-Functional Requirements

**Performance (7 NFRs)**

- NFR-PERF-01: Bundle Size Limits - First Load JS < 100kb (compressed)
- NFR-PERF-02: Asset Optimization - Images en WebP/AVIF avec fallback, < 500kb par image
- NFR-PERF-03: Cache Strategy - Assets statiques cachés CDN edge (max-age 1 an assets versionnés)
- NFR-PERF-04: Time to Interactive Desktop - TTI < 2.5s sur desktop (4G simulée)
- NFR-PERF-05: Time to Interactive Mobile - TTI < 4s sur mobile (3G Fast simulée)
- NFR-PERF-06: Animation Frame Rate - Toutes animations 60fps (frame time < 16ms)
- NFR-PERF-07: Form Submission Response Time - Feedback formulaire < 1s (P95)

**Maintainability (5 NFRs)**

- NFR-MAINT-01: Component Architecture - Max 1 niveau de nesting composants
- NFR-MAINT-02: Design System Tokenization - Toutes valeurs design en CSS Variables
- NFR-MAINT-03: Content Separation - Contenu séparé du code dans fichiers Markdown/MDX
- NFR-MAINT-04: Build Time - Build complet < 2 minutes
- NFR-MAINT-05: Code Documentation - JSDoc sur composants complexes (> 100 lignes)

**Usability (6 NFRs)**

- NFR-USA-01: Mobile Touch Targets - Minimum 44x44px touch target mobile
- NFR-USA-02: Error Recovery Formulaire - Conserver données saisies en cas d'erreur
- NFR-USA-03: Loading States - Loading indicator si action > 200ms
- NFR-USA-04: Keyboard Navigation Efficiency - Toute page accessible en < 10 tabs
- NFR-USA-05: Browser Compatibility - Chrome/Edge/Firefox/Safari dernières 2 versions
- NFR-USA-06: Command Palette Discoverability - Hint "⌘K" visible header

### Additional Requirements

**From Architecture Document:**

- ARCH-01: Starter Template - Initialiser avec `npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` puis `npx shadcn@latest init`
- ARCH-02: MDX Content Architecture - Fichiers MDX dans src/content/ avec frontmatter typé selon meta.ts
- ARCH-03: Animation Coordination - Framer Motion pour transitions React, GSAP pour scroll animations uniquement
- ARCH-04: State Management - next-themes pour theme, cmdk state interne, useState local seulement
- ARCH-05: Project Structure - Suivre structure définie dans architecture.md (src/app/, src/components/, src/content/, etc.)
- ARCH-06: Import Pattern - TOUJOURS utiliser alias @/ pour imports, JAMAIS chemins relatifs profonds

**From UX Design Document:**

- UX-01: Desktop-First Strategy - Tri-panel 20%/50%/30%, optimisé desktop puis adapté mobile
- UX-02: Mobile Panel Pattern - FAB (56x56px) + Bottom Sheet iOS-style pour panel contextuel
- UX-03: Color System - 2 palettes testables (Violet #a855f7 ou Vert #22c55e) avec CSS variables sémantiques
- UX-04: Typography System - Satoshi (UI/titres) + Fraunces (corps) + JetBrains Mono (code)
- UX-05: Custom Components Required - HeroLanding, TriPanelLayout, ContextPanel, ProjectCard, CaseStudyHeader, ShortcutsBar, StatCard
- UX-06: Journey Flows - Denis (0-25s scan), Mathilde (2-5min validation), Thomas (5-8min projection)

**From Project Context:**

- CTX-01: GSAP Accessibility - TOUTES animations GSAP DOIVENT checker prefers-reduced-motion avant exécution
- CTX-02: Theme Default - Dark mode est le mode par défaut
- CTX-03: Naming Conventions - PascalCase composants, camelCase hooks/utils, kebab-case MDX/CSS vars
- CTX-04: Shadcn Components - Ne JAMAIS modifier components/ui/ directement (sera écrasé par shadcn)

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR-CP-01 | Epic 1 | Splash screen animé |
| FR-CP-01-BIS | Epic 1 | Transition splash → dashboard |
| FR-CP-01-TER | Epic 2 | Dashboard tri-panel |
| FR-CP-02 | Epic 2 | Liste projets + tags |
| FR-CP-03 | Epic 3 | Structure case study |
| FR-CP-04 | Epic 3 | Métriques business |
| FR-CP-05 | Epic 3 | Page About |
| FR-CIP-01 | Epic 4 | Panel adaptatif |
| FR-CIP-02 | Epic 4 | Variantes contextuelles |
| FR-CIP-03 | Epic 4/6 | Responsive panel (desktop E4, mobile E6) |
| FR-NAV-01 | Epic 5 | Command Palette |
| FR-NAV-02 | Epic 5 | Commandes navigation |
| FR-NAV-03 | Epic 5 | Recherche fuzzy |
| FR-NAV-04 | Epic 5 | Navigation clavier |
| FR-NAV-05 | Epic 2 | Breadcrumbs |
| FR-VX-01 | Epic 1 | Animations hero |
| FR-VX-02 | Epic 5 | Hover effects |
| FR-VX-03 | Epic 5 | Scroll parallax |
| FR-VX-04 | Epic 2 | Page transitions |
| FR-VX-05 | Epic 3 | Compteurs animés |
| FR-VX-06 | Epic 1 | Dark/light toggle |
| FR-CE-01 | Epic 6 | CTA statut |
| FR-CE-02 | Epic 6 | Formulaire contact |
| FR-CE-03 | Epic 6 | Meta tags social |
| FR-CE-04 | Epic 7 | Easter egg Konami |
| FR-PERF-01 | Epic 1/7 | Lighthouse > 90 |
| FR-PERF-02 | Epic 1 | Core Web Vitals |
| FR-PERF-03 | Epic 7 | Image optimization |
| FR-PERF-04 | Epic 7 | Code splitting |
| FR-PERF-05 | Epic 1 | Font optimization |
| FR-A11Y-01 | Epic 7 | WCAG AA Baseline |
| FR-A11Y-02 | Epic 7 | Skip Links |
| FR-A11Y-03 | Epic 7 | Focus Trap Command Palette |
| FR-A11Y-04 | Epic 7 | Focus Trap Modals |
| FR-A11Y-05 | Epic 7 | Reduced Motion Support |
| FR-A11Y-06 | Epic 7 | ARIA Labels |
| FR-ANALYTICS-01 | Epic 7 | Vercel Analytics |
| FR-ANALYTICS-02 | Epic 7 | Command Palette Tracking |
| FR-I18N-01 | Epic 3 | Internationalisation FR/EN |

## Epic List

### Epic 1: Foundation & Landing Experience

**But :** Baptiste peut montrer une première impression "wow" qui capte Denis en < 10s

**User Outcome :** Portfolio chargé en < 1.5s avec hero impactant, keywords visibles, animations spectaculaires, dark mode par défaut.

**FRs couverts :** FR-CP-01, FR-CP-01-BIS, FR-VX-01, FR-VX-06, FR-PERF-01, FR-PERF-02, FR-PERF-05

**Additional Requirements :** ARCH-01, UX-03, UX-04, CTX-02

---

### Epic 2: Dashboard & Navigation System

**But :** Les utilisateurs peuvent explorer le portfolio et comprendre où ils sont

**User Outcome :** Layout tri-panel fonctionnel, liste de projets avec tags, navigation breadcrumbs, transitions fluides entre pages.

**FRs couverts :** FR-CP-01-TER, FR-CP-02, FR-NAV-05, FR-VX-04

**Additional Requirements :** ARCH-05, UX-01, UX-05 (TriPanelLayout, ProjectCard)

---

### Epic 3: Case Studies, Content & i18n

**But :** Mathilde peut lire des case studies structurés en FR ou EN avec process visible

**User Outcome :** Case studies avec structure narrative (Context → Results), métriques business animées, page About, contenu MDX typé, switch FR/EN fonctionnel.

**FRs couverts :** FR-CP-03, FR-CP-04, FR-CP-05, FR-VX-05, FR-I18N-01

**Additional Requirements :** ARCH-02, UX-05 (CaseStudyHeader, StatCard), UX-06

---

### Epic 4: Contextual Panel System

**But :** Thomas peut se projeter grâce au contexte enrichi synchronisé

**User Outcome :** Panel contextuel qui change selon la section lue (Problem → Contraintes, Solution → Alternatives, Results → Métriques), synchronisation scroll automatique.

**FRs couverts :** FR-CIP-01, FR-CIP-02, FR-CIP-03 (desktop)

**Additional Requirements :** UX-05 (ContextPanel)

---

### Epic 5: Command Palette & Visual Polish

**But :** Power users naviguent efficacement, craft visible par interactions polies

**User Outcome :** Command Palette Cmd+K avec recherche fuzzy, commandes navigation + theme + langue, hover effects narratifs, scroll parallax subtil.

**FRs couverts :** FR-NAV-01, FR-NAV-02, FR-NAV-03, FR-NAV-04, FR-VX-02, FR-VX-03

**Additional Requirements :** ARCH-03 (GSAP), CTX-01, UX-05 (ShortcutsBar)

---

### Epic 6: Conversion, Mobile & SEO

**But :** Thomas peut facilement contacter Baptiste, mobile fonctionnel, partage social optimisé

**User Outcome :** CTA "Disponible" avec statut, formulaire contact validé, meta tags social localisés, expérience mobile avec FAB + Bottom Sheet.

**FRs couverts :** FR-CE-01, FR-CE-02, FR-CE-03, FR-CIP-03 (mobile)

**Additional Requirements :** UX-02, NFR-USA-01, NFR-USA-02

---

### Epic 7: Accessibility, Performance & Analytics

**But :** Tous les utilisateurs ont une expérience rapide et accessible

**User Outcome :** WCAG AA compliant, Lighthouse > 90 en production, analytics intégrés, easter egg Konami.

**FRs couverts :** FR-A11Y-01 à FR-A11Y-06, FR-PERF-03, FR-PERF-04, FR-ANALYTICS-01, FR-ANALYTICS-02, FR-CE-04

**Additional Requirements :** Tous NFRs restants

---

## Epic Dependencies

```
Epic 1 (Foundation) ──► Epic 2 (Dashboard) ──► Epic 3 (Content + i18n)
                                            ↘
                                              Epic 4 (Panel)
                    ↘
                      Epic 5 (Command Palette)
                                            ↘
                                              Epic 6 (Conversion + Mobile)
                                                                      ↘
                                                                        Epic 7 (Quality)
```

**Règle :** Chaque Epic est autonome et fonctionne sans les Epics suivants.

---

## Epic 1: Foundation & Landing Experience

**But :** Baptiste peut montrer une première impression "wow" qui capte Denis en < 10s

### Story 1.1: Project Setup & Design System Foundation

**As a** developer,
**I want** the project initialized with Next.js, shadcn/ui, and design tokens configured,
**So that** I can build components with a consistent design system.

**Acceptance Criteria:**

**Given** a fresh development environment
**When** I run the initialization commands
**Then** Next.js App Router project is created with TypeScript, Tailwind, ESLint, src/ directory, and @/* import alias
**And** shadcn/ui is initialized with default configuration
**And** CSS variables are defined in globals.css for colors (violet/vert palettes), spacing (8px scale), and typography
**And** Satoshi, Fraunces, and JetBrains Mono fonts are configured in lib/fonts.ts
**And** Dark mode is set as default theme
**And** The project builds without errors

---

### Story 1.2: Hero Landing Component

**As a** visitor (Denis),
**I want** to see a hero section with impactful typography and visible keywords,
**So that** I can immediately understand Baptiste's positioning (< 3s).

**Acceptance Criteria:**

**Given** I visit the portfolio homepage
**When** the page loads
**Then** I see a full-viewport hero section (100vh)
**And** The headline displays "Product Designer" with monumental typography (72-96px)
**And** Keywords "B2B SaaS • Design Systems • 6 ans d'expérience" are visible within 3 seconds
**And** A primary CTA button is visible ("Voir les projets")
**And** A secondary CTA is available ("Me contacter")
**And** The component uses design tokens from globals.css

---

### Story 1.3: Hero Typography Animations

**As a** visitor,
**I want** the hero text to animate spectacularly on page load,
**So that** I experience the craft and technical skill immediately.

**Acceptance Criteria:**

**Given** I visit the homepage
**When** the hero section loads
**Then** Typography animates with cascade effect (staggered fade-in)
**And** Animation uses Framer Motion with custom timing curves (ease-out ~1.2s)
**And** Keywords appear progressively but are fully visible within 3 seconds
**And** Animation runs at 60fps with no frame drops
**And** If prefers-reduced-motion is enabled, animation is simplified to instant fade

---

### Story 1.4: Dark/Light Theme System

**As a** visitor,
**I want** the portfolio to respect my theme preference with dark mode as default,
**So that** I have a comfortable viewing experience.

**Acceptance Criteria:**

**Given** I visit the portfolio
**When** the page loads for the first time
**Then** Dark mode is displayed by default
**And** next-themes provider is configured in root layout
**And** CSS variables switch correctly between light and dark palettes
**And** Theme preference persists via localStorage
**And** No flash of wrong theme on page load (FOUC prevented)
**And** System preference (prefers-color-scheme) is respected if no manual choice

---

### Story 1.5: Splash Screen & Dashboard Transition

**As a** visitor (Denis),
**I want** an animated splash screen that transitions to the main dashboard,
**So that** I experience a "wow" effect while seeing keywords quickly.

**Acceptance Criteria:**

**Given** I visit the portfolio
**When** the splash screen displays
**Then** Keywords are visible on the first slide within 3 seconds
**And** A visual indicator shows how to proceed (button or scroll hint)
**And** Clicking/scrolling/pressing key triggers transition to dashboard
**And** Transition animation runs at 60fps (fade + slide, ~500ms)
**And** After transition, the tri-panel dashboard layout is visible
**And** If reduced motion is preferred, transition is instant fade

---

### Story 1.6: Performance Baseline Validation

**As a** developer,
**I want** the foundation to meet Core Web Vitals targets,
**So that** performance is established from the start.

**Acceptance Criteria:**

**Given** the Epic 1 stories are complete
**When** I run Lighthouse audit on the homepage
**Then** FCP (First Contentful Paint) is < 1.5s
**And** LCP (Largest Contentful Paint) is < 2.5s
**And** CLS (Cumulative Layout Shift) is < 0.1
**And** Performance score is > 90
**And** Fonts are preloaded and don't cause FOUT
**And** First Load JS bundle is < 100kb

---

## Epic 2: Dashboard & Navigation System

**But :** Les utilisateurs peuvent explorer le portfolio et comprendre où ils sont

### Story 2.1: Tri-Panel Layout Component

**As a** visitor,
**I want** a desktop layout with three distinct panels,
**So that** I can navigate, read content, and see contextual information simultaneously.

**Acceptance Criteria:**

**Given** I am on a desktop viewport (≥1024px)
**When** I view the dashboard or case study pages
**Then** I see a tri-panel layout with Navigation (20%), Content (50%), and Context Panel (30%)
**And** Navigation and Context panels are position:fixed (don't scroll)
**And** Content panel is scrollable independently
**And** Layout uses CSS Grid or Flexbox with design token spacing (48px gap)
**And** Max container width is 1440px, centered
**And** Component accepts nav, children, and panel as props

---

### Story 2.2: Navigation Panel (Left Column)

**As a** visitor,
**I want** a persistent navigation panel on the left,
**So that** I can quickly jump to any section of the portfolio.

**Acceptance Criteria:**

**Given** I am viewing the tri-panel layout
**When** the navigation panel renders
**Then** I see the portfolio logo/name at the top
**And** Navigation links include: Home, Projects, About, Contact
**And** Active page is visually highlighted
**And** Links use Next.js Link component for client-side navigation
**And** On case study pages, section anchors are listed below main nav
**And** Navigation is keyboard accessible (Tab navigation works)

---

### Story 2.3: Breadcrumbs Component

**As a** visitor,
**I want** breadcrumbs showing my current location,
**So that** I always know where I am in the portfolio.

**Acceptance Criteria:**

**Given** I navigate to a case study or subpage
**When** the page renders
**Then** Breadcrumbs display in the header area (e.g., "Projects / La Wooferie")
**And** Each segment is clickable and navigates to that level
**And** Current page segment is not a link (displayed as text)
**And** Separator is a "/" or "›" character
**And** Breadcrumbs are accessible with aria-label="Breadcrumb"

---

### Story 2.4: Project Cards Grid

**As a** visitor (Denis),
**I want** to see a grid of project cards with visual tags,
**So that** I can quickly scan projects and identify relevant ones.

**Acceptance Criteria:**

**Given** I am on the Projects page or dashboard
**When** the project list renders
**Then** Projects display as cards in a responsive grid (2 cols desktop, 1 col mobile)
**And** Each card shows: title, description snippet, preview image, and tags
**And** Tags are colored badges (e.g., "B2B SaaS", "Design System", "0→1")
**And** Clicking a tag filters projects by that tag (optional, can be deferred)
**And** Hovering a card shows visual feedback (border glow, slight lift)
**And** Cards link to their respective case study pages
**And** Card data comes from MDX frontmatter

---

### Story 2.5: Page Transitions

**As a** visitor,
**I want** smooth transitions when navigating between pages,
**So that** the experience feels polished and professional.

**Acceptance Criteria:**

**Given** I click a navigation link
**When** the page changes
**Then** A fade transition occurs (< 300ms duration)
**And** Transition uses Framer Motion AnimatePresence
**And** Content fades out, then fades in
**And** No jarring layout shifts during transition (CLS < 0.1)
**And** If reduced motion is preferred, transition is instant
**And** Browser back/forward navigation also triggers transitions

---

## Epic 3: Case Studies, Content & i18n

**But :** Mathilde peut lire des case studies structurés en FR ou EN avec process visible

### Story 3.1: MDX Content Architecture & Types

**As a** developer,
**I want** a typed MDX content system with locale support,
**So that** content is structured, validated, and available in FR and EN.

**Acceptance Criteria:**

**Given** the project needs localized content
**When** I set up the content architecture
**Then** src/content/ has fr/ and en/ subdirectories
**And** Each locale folder contains projects/ and about.mdx
**And** src/content/meta.ts defines TypeScript interfaces for frontmatter (ProjectMeta, AboutMeta)
**And** ProjectMeta includes: title, slug, description, tags[], status, timeline, metrics[], image
**And** lib/mdx.ts provides getProjectBySlug(slug, locale) and getAllProjects(locale) functions
**And** MDX parsing uses next-mdx-remote or similar library
**And** Invalid frontmatter throws TypeScript errors at build time

---

### Story 3.2: i18n Routing & Language Context

**As a** visitor,
**I want** to access the portfolio in French or English via URL,
**So that** I can read content in my preferred language.

**Acceptance Criteria:**

**Given** I navigate to the portfolio
**When** I visit /fr/ or /en/ prefixed URLs
**Then** Content loads from the corresponding locale folder
**And** Default locale is French (/fr/ is the root)
**And** Language preference persists via localStorage
**And** A LanguageContext provides current locale to all components
**And** URLs follow pattern: /[locale]/projects/[slug]
**And** Static generation works for both locales (generateStaticParams)

---

### Story 3.3: Case Study Page Structure

**As a** visitor (Mathilde),
**I want** case studies with a clear narrative structure,
**So that** I can follow the design process from context to results.

**Acceptance Criteria:**

**Given** I navigate to a case study page
**When** the page renders
**Then** I see sections in order: Context, Research, Process, Solution, Results
**And** Each section has a clear heading (H2)
**And** Section headings are anchored for navigation (id="context", etc.)
**And** MDX content renders with custom components (images, code blocks, callouts)
**And** Section transitions are smooth when scrolling
**And** Content is loaded from the current locale's MDX file

---

### Story 3.4: Case Study Header Component

**As a** visitor,
**I want** a clear header showing project metadata,
**So that** I immediately understand the project scope.

**Acceptance Criteria:**

**Given** I view a case study page
**When** the header renders
**Then** I see: project title, status badge (Shipped/In Progress/Concept), tags
**And** Timeline is displayed (e.g., "4 months • 2024")
**And** Client/company name is shown if applicable
**And** Header uses CaseStudyHeader component from features/case-study/
**And** All data comes from MDX frontmatter
**And** Header adapts to current locale (translated labels)

---

### Story 3.5: Business Metrics & Animated Counters

**As a** visitor (Thomas),
**I want** to see business impact metrics with animated numbers,
**So that** I can quickly assess the project's value.

**Acceptance Criteria:**

**Given** I scroll to the Results section
**When** metrics come into view
**Then** StatCard components display metrics (e.g., "-35% temps", "+240% adoption")
**And** Numbers animate from 0 to final value (count-up effect)
**And** Animation triggers on intersection (IntersectionObserver)
**And** Animation duration is ~1s with ease-out
**And** If reduced motion is preferred, numbers display instantly
**And** Metrics data comes from MDX frontmatter metrics[] array

---

### Story 3.6: About Page

**As a** visitor,
**I want** to read an About page with Baptiste's positioning,
**So that** I understand his background and expertise.

**Acceptance Criteria:**

**Given** I navigate to /[locale]/about
**When** the page renders
**Then** I see Baptiste's bio and positioning statement ("Founder Designer")
**And** A professional photo is displayed
**And** An experience timeline shows key career milestones
**And** Skills/expertise areas are listed
**And** Current availability status is visible
**And** Content loads from about.mdx in current locale
**And** Page uses tri-panel layout with contextual info in right panel

---

### Story 3.7: Language Switcher Component

**As a** visitor,
**I want** to switch between French and English,
**So that** I can read the portfolio in my preferred language.

**Acceptance Criteria:**

**Given** I am viewing the portfolio
**When** I see the header
**Then** A language toggle is visible (FR/EN or flag icons)
**And** Clicking switches to the other locale
**And** URL updates to reflect the new locale (e.g., /fr/projects → /en/projects)
**And** Language preference is saved to localStorage
**And** Current language is visually indicated
**And** Switching preserves the current page (same slug, different locale)

---

## Epic 4: Contextual Panel System

**But :** Thomas peut se projeter grâce au contexte enrichi synchronisé

### Story 4.1: Context Panel Component

**As a** visitor,
**I want** a right-side panel showing contextual information,
**So that** I can see enriched details while reading the main content.

**Acceptance Criteria:**

**Given** I am viewing a case study on desktop
**When** the page renders
**Then** A context panel (30% width) appears on the right
**And** Panel is position:fixed and doesn't scroll with content
**And** Panel has a clear header showing current section name
**And** Panel content area displays relevant contextual information
**And** Panel uses ContextPanel component from features/context-panel/
**And** Panel is accessible with role="complementary"

---

### Story 4.2: Scroll Synchronization

**As a** visitor,
**I want** the context panel to update as I scroll through sections,
**So that** I always see relevant information for what I'm reading.

**Acceptance Criteria:**

**Given** I am reading a case study with the context panel visible
**When** I scroll through different sections (Context, Research, Process, Solution, Results)
**Then** The context panel content updates to match the current section
**And** Synchronization uses IntersectionObserver with threshold ~0.3
**And** Active section is highlighted in the left navigation
**And** Panel updates are announced to screen readers (aria-live="polite")
**And** No janky or delayed updates (sync happens within 100ms)

---

### Story 4.3: Contextual Content Variants

**As a** visitor (Thomas),
**I want** different contextual information based on the section I'm reading,
**So that** I get the most relevant insights for each part of the case study.

**Acceptance Criteria:**

**Given** I scroll through a case study
**When** I reach the Context/Problem section
**Then** Panel shows: Business constraints, Timeline, Team composition
**When** I reach the Research section
**Then** Panel shows: Methodology used, Key findings, User quotes
**When** I reach the Process section
**Then** Panel shows: Alternatives considered, Decision rationale, Wireframe thumbnails
**When** I reach the Solution section
**Then** Panel shows: Technical stack, Design decisions, Before/After comparisons
**When** I reach the Results section
**Then** Panel shows: Detailed metrics, Learnings, Next steps
**And** All contextual data comes from MDX frontmatter or content sections

---

### Story 4.4: Panel Transitions & Animations

**As a** visitor,
**I want** smooth transitions when the panel content changes,
**So that** the experience feels polished, not jarring.

**Acceptance Criteria:**

**Given** I scroll to a new section
**When** the context panel content updates
**Then** Old content fades out (200ms)
**And** New content fades in with slight upward motion (300ms)
**And** Animation uses Framer Motion with ease-out timing
**And** Total transition time is < 500ms
**And** If reduced motion is preferred, content changes instantly
**And** No layout shift occurs during transition

---

## Epic 5: Command Palette & Visual Polish

**But :** Power users naviguent efficacement, craft visible par interactions polies

### Story 5.1: Command Palette Core

**As a** power user,
**I want** a command palette accessible via Cmd+K,
**So that** I can quickly access any part of the portfolio.

**Acceptance Criteria:**

**Given** I am viewing any page of the portfolio
**When** I press Cmd+K (Mac) or Ctrl+K (Windows/Linux)
**Then** A command palette dialog opens centered on screen
**And** Dialog has backdrop blur and dark overlay
**And** Search input is auto-focused
**And** Dialog uses cmdk library for core functionality
**And** Pressing Escape closes the dialog
**And** Clicking outside the dialog closes it
**And** Dialog is accessible with role="dialog" and aria-modal="true"

---

### Story 5.2: Navigation Commands

**As a** visitor,
**I want** quick navigation commands in the palette,
**So that** I can jump to any page instantly.

**Acceptance Criteria:**

**Given** I open the command palette
**When** I type or see the command list
**Then** I see navigation commands: /home, /projects, /about, /contact
**And** Each project is listed as /project-[slug] (e.g., /project-khora)
**And** Selecting a command navigates to that page
**And** Commands show an icon and description
**And** Recently used commands appear at the top
**And** Navigation commands are localized based on current language

---

### Story 5.3: Theme & Language Commands

**As a** visitor,
**I want** to switch theme and language from the command palette,
**So that** I can customize my experience without leaving keyboard.

**Acceptance Criteria:**

**Given** I open the command palette
**When** I type /dark or /light
**Then** Theme switches accordingly
**And** When I type /fr or /en, language switches
**And** URL updates for language change
**And** Visual confirmation appears briefly (toast or palette closes with feedback)
**And** Commands are grouped under "Settings" or "Preferences" category

---

### Story 5.4: Fuzzy Search

**As a** visitor,
**I want** fuzzy search across all content,
**So that** I can find what I need even with typos.

**Acceptance Criteria:**

**Given** I open the command palette and type a query
**When** I type partial words or misspellings
**Then** Results show fuzzy matches (e.g., "khra" matches "Khora")
**And** Search covers: page names, project titles, project tags, commands
**And** Results are ranked by relevance
**And** Matching characters are highlighted in results
**And** Empty state shows "No results found" message
**And** Search is performant (< 50ms for filtering)

---

### Story 5.5: Keyboard Navigation

**As a** visitor,
**I want** full keyboard control in the command palette,
**So that** I never need to use my mouse.

**Acceptance Criteria:**

**Given** the command palette is open
**When** I use arrow keys
**Then** ↑ and ↓ navigate through results
**And** Enter selects the highlighted item
**And** Escape closes the palette
**And** Tab moves between search input and results (if applicable)
**And** Focus is visually indicated with highlight
**And** Focus is trapped within the dialog (cannot Tab outside)

---

### Story 5.6: Shortcuts Hint Bar

**As a** visitor,
**I want** to see keyboard shortcuts hints,
**So that** I discover available shortcuts.

**Acceptance Criteria:**

**Given** I am on a desktop viewport
**When** the page loads
**Then** A subtle shortcuts bar appears (top-right, Linear style)
**And** Bar shows: "⌘K Search" and optionally other shortcuts
**And** Hints disappear after first use of Command Palette (localStorage flag)
**And** Bar is not shown on mobile
**And** Component uses ShortcutsBar from features/shortcuts-bar/
**And** Bar can be dismissed manually

---

### Story 5.7: Hover Effects & Micro-interactions

**As a** visitor,
**I want** rich hover effects on interactive elements,
**So that** I experience the attention to craft.

**Acceptance Criteria:**

**Given** I hover over interactive elements
**When** I hover a project card
**Then** Card lifts slightly (translateY -4px) with border glow
**When** I hover a navigation link
**Then** Text shifts or underline animates
**When** I hover a button
**Then** Subtle scale or glow effect occurs
**And** All hover animations are 150ms ease-out
**And** Hover effects use CSS transitions or Framer Motion
**And** Effects are disabled if prefers-reduced-motion

---

### Story 5.8: Scroll Parallax Effects

**As a** visitor,
**I want** subtle parallax effects on scroll,
**So that** the portfolio feels dynamic and premium.

**Acceptance Criteria:**

**Given** I scroll through pages with visual elements
**When** images or decorative elements come into view
**Then** Subtle parallax movement occurs (slower scroll rate)
**And** Parallax uses GSAP ScrollTrigger
**And** Effect is calibrated for both trackpad and mouse wheel
**And** Parallax intensity is subtle (max 50px offset)
**And** GSAP checks prefers-reduced-motion before initializing
**And** Parallax is disabled on mobile for performance

---

## Epic 6: Conversion, Mobile & SEO

**But :** Thomas peut facilement contacter Baptiste, mobile fonctionnel, partage social optimisé

### Story 6.1: Availability Status CTA

**As a** visitor (Thomas),
**I want** to see Baptiste's current availability status prominently,
**So that** I know immediately if he's available for new projects.

**Acceptance Criteria:**

**Given** I visit any page of the portfolio
**When** the page renders
**Then** A CTA badge displays current status with color indicator
**And** Status options are: 🟢 "Disponible" / "Available", 🟡 "En discussion" / "In talks", 🔴 "Non disponible" / "Unavailable"
**And** Status is configurable via a config file (src/config/availability.ts)
**And** CTA is visible in the header and/or hero section
**And** Clicking the CTA navigates to the contact section/page
**And** Status label is localized (FR/EN)

---

### Story 6.2: Contact Form with Validation

**As a** visitor (Thomas),
**I want** a contact form with real-time validation,
**So that** I can easily reach out to Baptiste without errors.

**Acceptance Criteria:**

**Given** I navigate to the contact section
**When** I interact with the form
**Then** Form includes: Name, Email, Company (optional), Message fields
**And** Email field validates format in real-time
**And** Required fields show error state if empty on blur
**And** Error messages are clear and localized
**And** Form data is preserved if validation fails (NFR-USA-02)
**And** Submit button shows loading state during submission (< 1s feedback)
**And** Success/error toast appears after submission
**And** Form uses shadcn/ui form components with React Hook Form

---

### Story 6.3: Contact Form Submission

**As a** visitor,
**I want** my contact form submission to be processed,
**So that** Baptiste receives my message.

**Acceptance Criteria:**

**Given** I fill out and submit a valid contact form
**When** I click Submit
**Then** Form data is sent to a backend endpoint (e.g., Vercel serverless function or Resend API)
**And** I receive a success confirmation message
**And** Form is reset after successful submission
**And** If submission fails, error message displays and form data is preserved
**And** Rate limiting prevents spam (e.g., 5 submissions per minute per IP)
**And** Basic honeypot field is included for bot protection

---

### Story 6.4: Social Sharing Meta Tags

**As a** visitor,
**I want** rich previews when sharing portfolio links,
**So that** links look professional on social platforms.

**Acceptance Criteria:**

**Given** I share a portfolio URL on social media
**When** the platform fetches the URL
**Then** Open Graph tags are present (og:title, og:description, og:image, og:url)
**And** Twitter Card tags are present (twitter:card, twitter:title, twitter:image)
**And** Each case study has a unique og:image (project preview)
**And** Meta tags are localized based on URL locale
**And** Default og:image is the portfolio hero image
**And** Tags are generated via Next.js generateMetadata

---

### Story 6.5: Mobile FAB Component

**As a** mobile visitor,
**I want** a floating action button to access the context panel,
**So that** I can see additional information without losing my place.

**Acceptance Criteria:**

**Given** I am viewing a case study on mobile (< 768px)
**When** the page renders
**Then** A FAB (56x56px) appears in the bottom-right corner
**And** FAB uses the info/panel icon
**And** FAB has proper touch target size (44x44px minimum)
**And** FAB position is fixed and doesn't interfere with content
**And** FAB is not visible on desktop
**And** FAB is accessible with aria-label="Open context panel"

---

### Story 6.6: Mobile Bottom Sheet Context Panel

**As a** mobile visitor,
**I want** a bottom sheet to display context panel content,
**So that** I get the same enriched experience as desktop.

**Acceptance Criteria:**

**Given** I tap the FAB on mobile
**When** the bottom sheet opens
**Then** Sheet slides up from bottom (iOS-style animation)
**And** Sheet height is ~60% of viewport with drag-to-resize
**And** Sheet displays the same content as desktop context panel
**And** I can drag the sheet down to dismiss
**And** Background content is dimmed but visible
**And** Focus is trapped within the sheet when open
**And** Sheet uses Framer Motion for animations

---

### Story 6.7: Mobile Navigation Adaptation

**As a** mobile visitor,
**I want** navigation adapted for touch screens,
**So that** I can easily navigate on my phone.

**Acceptance Criteria:**

**Given** I am on mobile viewport (< 768px)
**When** the page renders
**Then** Tri-panel layout collapses to single column
**And** Navigation is accessible via hamburger menu icon
**And** Menu slides in from left as overlay
**And** All touch targets are minimum 44x44px
**And** Language switcher is accessible from mobile menu
**And** Menu closes on navigation or outside tap
**And** Menu animation is smooth (< 300ms)

---

## Epic 7: Accessibility, Performance & Analytics

**But :** Tous les utilisateurs ont une expérience rapide et accessible

### Story 7.1: WCAG AA Baseline Compliance

**As a** visitor with disabilities,
**I want** the portfolio to meet WCAG AA standards,
**So that** I can access all content regardless of my abilities.

**Acceptance Criteria:**

**Given** I use assistive technologies or have visual impairments
**When** I navigate the portfolio
**Then** All text has minimum 4.5:1 contrast ratio against background
**And** All interactive elements are keyboard accessible (Tab navigation)
**And** Focus indicators are clearly visible on all focusable elements
**And** All images have meaningful alt text
**And** Form inputs have associated labels
**And** Heading hierarchy is logical (h1 → h2 → h3)
**And** axe-core audit returns no critical/serious issues

---

### Story 7.2: Skip Links

**As a** keyboard user,
**I want** a skip link to bypass navigation,
**So that** I can quickly reach the main content.

**Acceptance Criteria:**

**Given** I press Tab as first action on any page
**When** focus moves to the first element
**Then** A "Skip to main content" link appears
**And** Link is visually hidden until focused
**And** Clicking/pressing Enter scrolls to main content area
**And** Focus moves to the main content container
**And** Skip link uses sr-only class with focus:not-sr-only

---

### Story 7.3: Focus Trap - Command Palette

**As a** keyboard user,
**I want** focus trapped inside the command palette,
**So that** I can't accidentally navigate outside the dialog.

**Acceptance Criteria:**

**Given** the command palette is open
**When** I press Tab repeatedly
**Then** Focus cycles within the palette only
**And** Focus cannot escape to background content
**And** Pressing Escape releases focus trap and closes palette
**And** Focus returns to the element that opened the palette
**And** Implementation uses focus-trap library or equivalent

---

### Story 7.4: Focus Trap - Modals & Slide-overs

**As a** keyboard user,
**I want** focus trapped inside modals and mobile menus,
**So that** I can navigate them effectively.

**Acceptance Criteria:**

**Given** a modal, bottom sheet, or mobile menu is open
**When** I navigate with keyboard
**Then** Focus is trapped within the overlay
**And** Background content is inert (aria-hidden="true")
**And** Pressing Escape closes the overlay
**And** Focus returns to the triggering element on close
**And** Applies to: Mobile menu, Bottom sheet, any future modals

---

### Story 7.5: Reduced Motion Support

**As a** visitor with vestibular disorders,
**I want** animations disabled when I prefer reduced motion,
**So that** the site doesn't cause discomfort.

**Acceptance Criteria:**

**Given** I have prefers-reduced-motion: reduce enabled
**When** I visit the portfolio
**Then** Hero typography animations are simplified to instant fade
**And** Page transitions are instant (no slide/fade)
**And** Parallax effects are disabled
**And** Counter animations show final value immediately
**And** GSAP animations check prefers-reduced-motion before initializing
**And** Framer Motion respects useReducedMotion hook
**And** Essential UI feedback (hover states) remains functional

---

### Story 7.6: ARIA Labels & Announcements

**As a** screen reader user,
**I want** proper ARIA labels on all interactive elements,
**So that** I understand what each element does.

**Acceptance Criteria:**

**Given** I navigate with a screen reader
**When** I encounter interactive elements
**Then** All buttons without visible text have aria-label
**And** Icon-only buttons (theme toggle, language toggle, FAB) are labeled
**And** Navigation landmarks use role="navigation" with aria-label
**And** Main content area uses role="main"
**And** Context panel updates announce via aria-live="polite"
**And** Form errors are announced via aria-describedby

---

### Story 7.7: Image Optimization Pipeline

**As a** visitor,
**I want** images to load quickly and efficiently,
**So that** the site remains fast on any connection.

**Acceptance Criteria:**

**Given** images are used throughout the portfolio
**When** the site builds and serves images
**Then** All images use Next.js Image component
**And** Images are automatically converted to WebP/AVIF with fallback
**And** Images are lazy loaded by default (loading="lazy")
**And** Responsive srcset is generated for different screen sizes
**And** Each image is < 500kb after optimization
**And** Blur placeholder is shown while loading
**And** Priority loading is used for above-fold images

---

### Story 7.8: Code Splitting & Bundle Optimization

**As a** visitor,
**I want** the site to load only what's needed,
**So that** initial page load is fast.

**Acceptance Criteria:**

**Given** the portfolio has multiple pages and features
**When** I visit a page
**Then** Only code for that route is loaded initially
**And** Command palette code is dynamically imported (not in initial bundle)
**And** GSAP is loaded only on pages with parallax
**And** First Load JS is < 100kb (compressed)
**And** Build output shows reasonable chunk sizes
**And** next/dynamic is used for heavy components

---

### Story 7.9: Vercel Analytics Integration

**As** Baptiste,
**I want** analytics to track visitor engagement,
**So that** I can understand how recruiters interact with my portfolio.

**Acceptance Criteria:**

**Given** the portfolio is deployed on Vercel
**When** visitors interact with the site
**Then** Vercel Analytics is integrated via @vercel/analytics
**And** Page views are tracked automatically
**And** Web Vitals are reported (FCP, LCP, CLS, FID)
**And** No personal data is collected (GDPR compliant)
**And** Analytics script doesn't impact Lighthouse score
**And** Dashboard is accessible via Vercel project

---

### Story 7.10: Command Palette Usage Tracking

**As** Baptiste,
**I want** to know how many visitors use the command palette,
**So that** I can gauge if this feature resonates with users.

**Acceptance Criteria:**

**Given** a visitor uses the command palette
**When** they open it via Cmd+K
**Then** An event is tracked (e.g., "command_palette_opened")
**And** Commands executed are tracked (navigation, theme change, etc.)
**And** Tracking uses Vercel Analytics custom events
**And** No sensitive data is included in events
**And** Tracking doesn't affect palette performance

---

### Story 7.11: Easter Egg - Konami Code

**As a** curious visitor,
**I want** to discover a hidden Easter egg,
**So that** I can see Baptiste's playful attention to detail.

**Acceptance Criteria:**

**Given** I know the Konami code (↑↑↓↓←→←→BA)
**When** I enter the sequence on any page
**Then** Design Forensics mode activates
**And** A visual overlay appears showing: design grid, wireframe skeleton, component boundaries
**And** A subtle sound effect plays (optional, respects muted preference)
**And** Mode can be deactivated by pressing Escape or entering code again
**And** Easter egg discovery is tracked via analytics
**And** Mode doesn't break any functionality

---

### Story 7.12: Production Performance Validation

**As a** developer,
**I want** to validate performance in production,
**So that** the live site meets all targets.

**Acceptance Criteria:**

**Given** the portfolio is deployed to production
**When** I run Lighthouse audit
**Then** Performance score is > 90
**And** Accessibility score is > 90
**And** Best Practices score is > 90
**And** SEO score is > 90
**And** FCP < 1.5s, LCP < 2.5s, CLS < 0.1, FID < 100ms
**And** Mobile and desktop audits both pass
**And** No console errors on any page

---

## Final Validation Summary

### Coverage Matrix

| Epic | Stories | FRs Covered |
|------|---------|-------------|
| Epic 1: Foundation & Landing | 6 | FR-CP-01, FR-CP-01-BIS, FR-VX-01, FR-VX-06, FR-PERF-01, FR-PERF-02, FR-PERF-05 |
| Epic 2: Dashboard & Navigation | 5 | FR-CP-01-TER, FR-CP-02, FR-NAV-05, FR-VX-04 |
| Epic 3: Content & i18n | 7 | FR-CP-03, FR-CP-04, FR-CP-05, FR-VX-05, FR-I18N-01 |
| Epic 4: Contextual Panel | 4 | FR-CIP-01, FR-CIP-02, FR-CIP-03 (desktop) |
| Epic 5: Command Palette & Polish | 8 | FR-NAV-01, FR-NAV-02, FR-NAV-03, FR-NAV-04, FR-VX-02, FR-VX-03 |
| Epic 6: Conversion, Mobile & SEO | 7 | FR-CE-01, FR-CE-02, FR-CE-03, FR-CIP-03 (mobile) |
| Epic 7: Accessibility & Performance | 12 | FR-A11Y-01-06, FR-PERF-03, FR-PERF-04, FR-ANALYTICS-01-02, FR-CE-04 |
| **Total** | **49** | **40 FRs (100%)** |

### NFR Coverage

All 18 NFRs are addressed through acceptance criteria across stories:
- **Performance (7)**: Stories 1.6, 7.7, 7.8, 7.12
- **Maintainability (5)**: Stories 1.1, 3.1, throughout architecture decisions
- **Usability (6)**: Stories 6.2, 6.5, 6.7, 5.5, 5.6

### Additional Requirements Coverage

- **ARCH-01 to ARCH-06**: Story 1.1, 3.1, 5.8
- **UX-01 to UX-06**: Stories 2.1, 6.5, 6.6, 1.1, 1.2
- **CTX-01 to CTX-04**: Stories 7.5, 1.4, throughout

### Validation Checklist

- [x] All 40 FRs mapped to at least one story
- [x] All stories have Given/When/Then acceptance criteria
- [x] Epics organized by user value, not technical layer
- [x] Dependencies documented (Epic 1 → 2 → 3/4/5 → 6 → 7)
- [x] Each Epic is independently deployable
- [x] Mobile experience covered (Epic 6)
- [x] i18n (FR/EN) integrated into Epic 3
- [x] Accessibility requirements in dedicated Epic 7
- [x] Performance validation story included (7.12)

### Recommended Sprint Sequence

1. **Sprint 1**: Epic 1 (Foundation) - 6 stories
2. **Sprint 2**: Epic 2 (Dashboard) - 5 stories
3. **Sprint 3**: Epic 3 (Content & i18n) - 7 stories
4. **Sprint 4**: Epic 4 (Context Panel) + Epic 5 start - 4 + 4 stories
5. **Sprint 5**: Epic 5 finish + Epic 6 start - 4 + 4 stories
6. **Sprint 6**: Epic 6 finish + Epic 7 - 3 + 12 stories

---

*Document generated: 2026-01-22*
*Total: 7 Epics, 49 Stories, 100% FR Coverage*

