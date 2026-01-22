---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['/Users/morillonbaptiste/portoflio-upgrade/_bmad-output/analysis/brainstorming-session-2026-01-11.md']
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
projectType: 'greenfield'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
  targetAudience: "Recruiters, PMs, and Designers in B2B SaaS ecosystem"
  designerPositioning: "Senior designer specialized in complex B2B products (CRM, workflows, data-heavy systems)"
---

# Product Requirements Document - portoflio-upgrade

**Author:** Baptiste
**Date:** 2026-01-13

## Success Criteria

### User Success

**Perception Cible - "Ce designer peut mener des projets complexes"**

Le succès utilisateur se mesure au moment où le recruteur (PM, Hiring Manager, ou Designer senior) se dit : **"Lui il est capable de mener les projets de bout en bout peu importe la complexité du produit, il saura m'accompagner"**.

**Profil cible prioritaire :**
- **Founder Designer** - Premier designer d'une startup en croissance, responsable de poser les fondations design et de construire l'équipe
- **Solo Designer évolutif** - Designer autonome avec vocation à recruter et manager une équipe design

**Moments "aha!" recherchés :**

1. **Première impression (0-10 secondes)** : "Wow, cette UI est impeccable"
   - Réaction viscérale face à la qualité d'exécution pixel perfect
   - Animations et micro-interactions parfaitement calibrées créent effet de maîtrise professionnelle
   - Palette signature et typographie monumentale établissent identité forte

2. **Exploration initiale (10s-2min)** : "Ce portfolio est lui-même un produit tech"
   - Découverte du panel contextuel qui enrichit la lecture
   - Navigation fluide et interactions narratives révèlent attention aux détails
   - Command Palette (Cmd+K) montre compréhension des power users

3. **Lecture projet (2-5min)** : "Il comprend les produits B2B complexes"
   - Projets CRM, Contract Management, workflows métiers démontrent l'expertise domaine
   - Process visible : research → problem → solution → results
   - Clarté dans la complexité (gérer l'information dense avec élégance)

4. **Décision finale (5-8min)** : "Je veux lui parler"
   - Conviction que Baptiste peut gérer autonomie et complexité
   - Envie de le contacter immédiatement via formulaire ou CTA "Disponible"
   - Sentiment : "Ce designer pense produit, pas juste écrans"

**Métriques d'engagement utilisateur :**
- Temps moyen sur site > 3 minutes (exploration approfondie)
- Pages vues par session > 3 (curiosité pour plusieurs projets)
- Taux rebond < 60% (UI accroche et retient)
- Command Palette utilisée par > 15% visiteurs (découverte feature avancée)

---

### Business Success

**Objectif 3 mois : Signer le poste Founder Designer / Solo Designer idéal**

**Métrique Critique - Taux Conversion Candidature → Entretien : 20%**

Le signal de succès principal n'est pas le nombre de visites, mais la **qualité de conversion** des candidatures :
- Baptiste postule à une offre Founder Designer ou Solo Designer
- Le portfolio accompagne la candidature
- **Succès = Décrocher entretien oral dans 20% des cas**

**Pourquoi 20% ?**
- Baseline standard candidature : 5-10% → entretien
- Portfolio "wow" = multiplicateur 2-3x
- Cible : 1 entretien pour 5 candidatures envoyées

**Funnel Business Complet :**

```
100 visiteurs portfolio
↓ (20% action)
20 clics CTA "Disponible" ou formulaire contact
↓ (25% conversion)
5 candidatures qualifiées envoyées
↓ (20% conversion) ← MÉTRIQUE CRITIQUE
1 entretien oral décroché
↓ (33% conversion)
1 offre signée sur 3 entretiens
```

**Métriques Business Intermédiaires :**
- **Intention de contact** : > 10% clics CTA "Disponible pour mission"
- **Engagement formulaire** : > 5% complétions formulaire contact
- **Viralité** : > 2% partages sociaux (recruteurs partagent avec collègues)
- **Retours visiteurs** : > 25% visiteurs reviennent (réflexion sur candidature)

**Succès qualitatif - Type d'entreprises ciblées :**
- Startups B2B SaaS en Série A/B (50-200 personnes)
- Scale-ups cherchant premier Lead Designer ou Founder Designer
- Entreprises avec produits complexes (CRM, workflows, data-heavy)
- Culture produit forte et besoin de designer autonome pouvant recruter

---

### Technical Success

**Démonstration de Maîtrise par l'Exécution Technique**

Le portfolio doit prouver la compétence technique par sa propre qualité d'exécution. Chaque métrique technique devient argument de crédibilité.

**Performance - "Ce designer comprend les contraintes tech"**

```
Lighthouse Performance Score > 90
First Contentful Paint < 1.5s
Time to Interactive < 3s
Core Web Vitals: All Green
```

**Pourquoi c'est important :**
- Démontre compréhension des contraintes de performance
- Prouve capacité à collaborer efficacement avec devs
- Signale connaissance des standards web modernes

**Qualité d'Exécution - "Pixel Perfect & Interactions Millimétrées"**

- **Animations Framer Motion** : Fluides 60fps, timing curves personnalisées, pas de jank
- **Micro-interactions** : Hover states subtils, feedback immédiat, poids visuel cohérent
- **Responsive Design** : 3 breakpoints testés (mobile 375px, tablet 768px, desktop 1440px+)
- **Accessibilité** : Contraste WCAG AA minimum, navigation clavier complète, command palette accessible

**Stack Moderne - "Designer qui code ou comprend la tech"**

```
Frontend: Next.js 14 (App Router) + TypeScript
Styling: Tailwind CSS + Design Tokens CSS Variables
Animations: Framer Motion
Command: cmdk (Vercel)
Content: Markdown + Gray-matter
Deploy: Vercel (CI/CD automatique)
```

**Maintenabilité - "Portfolio comme vrai produit"**

- Architecture composants réutilisables
- Design system documenté (tokens, composants)
- Git avec commits sémantiques
- Versioning visible (Portfolio v1.0.0 → v2.0.0)

---

### Measurable Outcomes

**Semaine 1 post-lancement :**
- ✅ Portfolio live sur URL personnalisé
- ✅ 3 case studies complètes publiées
- ✅ 50+ visiteurs premiers tests (réseau proche)
- ✅ Lighthouse > 90 confirmé en production

**Mois 1 post-lancement :**
- ✅ 200+ visiteurs uniques (diffusion LinkedIn, Twitter, communautés design)
- ✅ Temps moyen > 2min 30s (engagement)
- ✅ 10+ interactions formulaire contact ou CTA
- ✅ 5+ candidatures envoyées avec portfolio

**Mois 2-3 (Phase Active Recherche) :**
- ✅ 500+ visiteurs cumulés
- ✅ 20+ candidatures envoyées → 4+ entretiens décrochés (20% conversion)
- ✅ 2-3 processus recrutement avancés (2ème/3ème tour)
- ✅ Feedback qualitatif : "Ton portfolio m'a vraiment impressionné"

**Succès Final (objectif 3 mois) :**
- 🎯 **Offre signée pour poste Founder Designer ou Solo Designer** dans startup B2B SaaS Série A/B
- 🎯 Fourchette salariale validée selon marché
- 🎯 Scope incluant : autonomie design, construction équipe future, impact produit direct

---

## Product Scope

Pour atteindre ces critères de succès, le portfolio est structuré en 3 phases progressives (MVP, Growth, Vision) avec une stratégie Experience MVP privilégiant la démonstration de compétence par l'exécution.

### MVP Strategy & Philosophy

**Approche MVP : "Experience MVP"**

Le portfolio adopte une approche **Experience MVP** plutôt que Problem-Solving MVP. L'objectif n'est pas de résoudre un problème minimal, mais de **démontrer l'expertise par l'exécution elle-même**.

**Rationale Stratégique :**
- **Contexte marché** : Postes Founder Designer ou Solo Designer dans startups Série A/B exigent preuve de capacité à livrer produits pixel perfect
- **Différenciation** : 90% des portfolios designers montrent des screenshots statiques → Démontrer par l'exécution (animations, micro-interactions) = multiplicateur de crédibilité
- **Investissement justifié** : Timeline MVP plus longue acceptée car portfolio = outil de conversion candidature → entretien (20% target) qui justifie ROI

**Trade-off Conscient :**
- ✅ **Avantage** : Portfolio devient lui-même premier case study démontrant maîtrise technique
- ⚠️ **Risque** : Développement plus long qu'un MVP classique (2-4 semaines vs 1-2 semaines)
- ✅ **Mitigation** : Timeline flexible "le temps qu'il faudra", pas de deadline hard

**Resource Requirements :**
- **Équipe** : Solo (Baptiste seul, design + dev)
- **Support** : BMAD Method pour structuration et accélération développement
- **Stack** : Next.js 14 + Tailwind + Framer Motion (stack connue, réutilisation composants existants)

---

### MVP - Minimum Viable Product (2-4 semaines)

**Objectif MVP :** Portfolio live impressionnant qui démontre expertise senior via l'expérience elle-même. Prêt pour recherche d'emploi active.

**Critère d'Acceptation MVP :**
> "Le portfolio crée l'effet 'wow' suffisant pour que 20% des recruteurs veuillent discuter après l'avoir vu"

**Features Critiques (Triple Priorité) :**

🔥🔥🔥 **UI Pixel Perfect + Micro-Interactions Millimétrées**
- Palette couleurs signature avec design tokens CSS
- Typographie monumentale hero sections
- 5-10 hover effects narratifs clés (tooltips intelligents)
- Animations scroll parallax subtil (Framer Motion)
- Chiffres d'impact avec compteur animé
- Feedback visuel immédiat sur toutes interactions
- Transitions fluides entre pages (page transitions)
- Dark mode toggle avec transition smooth

🔥🔥 **Panel Contextuel Adaptatif**
- Tri-Panel responsive (Desktop 3 cols : 20% Nav / 50% Content / 30% Context)
- Panel droit change selon section consultée
- 3-4 variantes contextuelles par projet :
  - Sur "Problem" → Contraintes projet et contexte business
  - Sur "Solution" → Alternatives envisagées et rationale
  - Sur "Results" → Métriques et learnings clés
- Mobile : 1 colonne avec panel slide-over

🔥 **Command Palette (Cmd+K)**
- 8-12 commandes essentielles navigation
- Commandes système : `/dark`, `/light`, `/home`, `/about`, `/contact`
- Commandes projets : `/projects`, `/project-1`, `/project-2`, etc.
- Recherche fuzzy dans projets
- Animations entrée/sortie palette

**Features MVP Complémentaires (16 features totales) :**

4. Tri-Panel architecture responsive
5. 3 case studies complètes (projets B2B : CRM, Contract Mgmt, Workflow)
6. Page About avec bio impactante positionnement Founder Designer
7. Formulaire contact stylé avec validation
8. CTA "Disponible pour mission" avec statut (🟢 Disponible / 🟡 Discussions en cours)
9. 2-3 Easter eggs simples :
   - Konami code → révèle process design portfolio
   - Triple-click → overlay grille design
10. Navigation header avec breadcrumbs
11. Footer avec liens sociaux (LinkedIn, GitHub, Twitter, Figma)
12. SEO meta tags optimisés (Open Graph, Twitter Cards)
13. Vercel Analytics intégré
14. Performance optimisée (Lighthouse > 90)
15. Responsive mobile/tablet/desktop testé
16. Migration contenu Notion → Markdown (2-3 projets MVP)

**Contenu Minimal MVP :**
- 3 case studies B2B complètes (CRM, Contract Management, Workflow)
- 1 page About avec bio + positionnement
- 1 page Contact avec formulaire

**Timeline MVP :** 2-4 semaines (flexible selon disponibilité)

**Livrable MVP :** Portfolio live sur Vercel subdomain, prêt pour candidatures actives

---

### Growth Features (Post-MVP - Mois 2-4)

**Objectif Growth :** Enrichir l'engagement, ajouter profondeur et intelligence, augmenter conversion.

**Quand activer Growth :** Après signature du poste, en parallèle du nouveau job

**Interactions Enrichies :**
- Feedback haptique visuel (physics-based animations)
- Progression narrative (tooltips évoluent selon visites répétées)
- Hover soundtrack optionnel (sons subtils)
- Interactions narratives avancées (chaque élément raconte micro-histoire)

**Panel Contextuel Avancé :**
- Contexte relationnel (knowledge graph projets interconnectés)
- Contexte comparatif (benchmark auto entre projets)
- Explorateur de profondeur (layers Surface / Depth / Deep Dive)

**Command Palette Avancée :**
- `/hire-me` → Calculateur disponibilité interactif
- `/question` → IA FAQ + contact async hybride
- `/compare project-a project-b` → Split screen comparaison
- `/theme colorblind` → Accessibilité avancée
- `/save-for-later` → Bookmarks avec email recap
- `/speed-run` → Mode condensé recruteurs pressés
- Palette conversationnelle NLP (natural language)

**Easter Eggs Complets :**
- Mode Design Forensics (Cmd+Shift+D) → annotations décisions design
- Design System Explorer (triple-click bouton) → inspect complet
- A/B Test Ghost → variantes testées avec explications
- Timeline du portfolio → historique 15 versions

**Business & Engagement :**
- Tableau de bord live public (analytics transparentes + social proof)
- Newsletter auto-générée (nurturing automatisé)
- Email digest post-visite 24h (ré-engagement)
- Shareable moments (images stylées pour partage social)
- Live Status Real-Time ("🟢 Baptiste designe actuellement" + Spotify)

**Gamification :**
- Achievement System (badges sharables LinkedIn)
- Unlock System (niveaux progressifs qualifiant leads)
- Mystery Box (secrets cachés 3/10 découverts)

**Portfolio comme Produit :**
- Semantic Versioning (v2.4.7 avec changelog visible)
- Beta Features (section expérimentale 🧪)
- Roadmap publique du portfolio

**Contenu Enrichi :**
- 5-7 case studies totales
- Vidéos process behind-the-scenes
- Section "Masterclass" (mini-cours process design)
- Blog/Articles design leadership

---

### Vision (Future - 6+ mois)

**Objectif Vision :** Explorer frontières UX, établir thought leadership, expériences immersives.

**Expériences Immersives VR/Spatial :**
- Portfolio Vision Pro (espaces 3D, salles musée)
- Avatar IA conversationnel guide 24/7
- Mode collaboration multi-users VR
- Replay et recording sessions

**Figma Plugin Écosystème :**
- Plugin portfolio natif Figma
- Template remixable pour communauté designers
- Design System exportable (components importables)
- Collaborative annotations (discussions intégrées)
- Distribution Figma Community

**Intelligence Avancée :**
- Portfolio Caméléon (adaptation PM/Designer/Dev/RH automatique)
- Détection psychométrique (comportement temps réel)
- Multi-univers thématiques (modes complets par audience)

**Portfolio comme Plateforme :**
- API publique (api.baptiste-portfolio.com/projects)
- Portfolio social live (chat + présence communautaire)
- Mode contributeur (suggestions communautaires)
- Interactive challenges (gamification apprentissage)

**Contenu Thought Leadership :**
- Masterclass complète design B2B SaaS
- Conférences et talks enregistrés
- Case studies externes (consulting)
- Newsletter régulière design leadership

---

### Risk Mitigation Strategy

#### Risques Techniques

**Risque Principal : Animations & Micro-Interactions Complexes**

**Nature du risque :**
- Expérience limitée en animations avancées (scroll parallax, timing curves personnalisées, physics-based interactions)
- Feature critique MVP : UI Pixel Perfect + Micro-Interactions Millimétrées (🔥🔥🔥 priorité 1)

**Stratégie de mitigation :**

✅ **Réutilisation de Ressources Existantes**
- GSAP : bibliothèque riche, documentation exhaustive, exemples CodePen
- Framer Motion : composants pré-construits, templates communautaires
- **Approche** : Adapter animations existantes plutôt que développer from scratch

✅ **Prototypage Itératif**
- Développer animations par incréments (hover simple → scroll parallax → physics)
- Valider chaque micro-interaction avec Lighthouse Performance (maintenir > 90)
- Fallback : Simplifier animations si objectif 60fps non atteignable

✅ **Priorisation Sélective**
- **Must-Have** : 5-10 hover effects narratifs clés (high impact, low complexity)
- **Nice-to-Have** : Animations scroll parallax subtil (peut être simplifié si timeline trop long)
- **Deferrable** : Physics-based animations → Growth phase si trop complexe

**Seuil d'acceptation MVP :**
> "Animations suffisamment fluides pour créer effet 'wow' sans ralentir performance. Mieux vaut 5 animations parfaites que 15 moyennes."

---

#### Risques Timeline

**Risque : 2-4 semaines hypothétique, possiblement sous-estimé**

**Stratégie de mitigation :**

✅ **Timeline Flexible**
- Pas de deadline hard, "le temps qu'il faudra"
- Objectif : MVP prêt pour candidatures actives, pas date fixe

✅ **Phasing Interne MVP**
- **Phase 1 (Semaine 1-2)** : Architecture tri-panel + 1 case study complet
  - Livrable : Portfolio navigable avec 1 projet complet
  - Validation : Peut être utilisé en candidature basique
- **Phase 2 (Semaine 3-4)** : Micro-interactions + 2 case studies restants
  - Livrable : MVP complet impressionnant
  - Validation : Atteint critère 20% conversion

✅ **Scope Negotiation Continue**
- Features MVP Complémentaires (4-16) peuvent être réduites si timeline dérape
- Easter eggs (Konami code, triple-click) → reportables Growth sans impact MVP

---

#### Risques Contenu

**Risque : Migration Notion → Markdown + Rédaction 3 Case Studies**

**Stratégie de mitigation :**

✅ **Content-First Approach**
- Rédiger case studies AVANT développement portfolio
- Valide structure narrative et évite blocage dev

✅ **Templates Réutilisables**
- Structure case study standardisée : Context → Research → Process → Solution → Results
- Panel contextuel avec templates pré-remplis (Contraintes, Alternatives, Métriques)

✅ **Migration Incrémentale**
- Migrer 1 case study complet pour tester workflow
- Ajuster templates avant migrer les 2 restants

---

## User Journeys

### Journey 1 : Denis - Le Recruteur en Mode Screening

**Persona : Denis, 32 ans, Chargé de Recrutement chez une startup B2B SaaS**

**Opening Scene - Mardi matin, 9h37**

Denis ouvre son ATS (Welcome to the Jungle) avec un café refroidi et soupire en voyant **42 candidatures en attente** pour le poste "Product Designer Senior". C'est sa 3ème semaine de recrutement sur ce poste et il commence à avoir la flemme. Les profils se ressemblent tous, et il doit faire un premier tri avant de passer les meilleurs à Mathilde, la Lead Designer.

**Sa mission :** Identifier rapidement les profils qui matchent les critères de base :
- 5-7 ans d'expérience
- Expérience B2B ou SaaS
- Compétences UX/UI ou Product Design
- Keyword "Design System" (très valorisé dans la boite)

**État émotionnel :** Fatigué, en mode "prochain par défaut" - il cherche des raisons de dire non, pas de dire oui.

**Rising Action - Le Screening de Baptiste**

**[0-5 secondes] - Scan du CV dans l'ATS**

Denis ouvre la candidature de Baptiste. Son œil scanne le CV en diagonale :
- ✅ "Product Designer" → OK, c'est le bon intitulé
- ✅ "6 ans d'expérience" → Parfait, dans la fourchette
- ⚠️ "B2B SaaS" → Il ne le voit pas immédiatement écrit...

Il hésite. Le CV mentionne des projets (CRM, Contract Management) mais pas clairement "SaaS B2B" comme keyword. Il clique sur le lien du portfolio pour vérifier.

**[5-15 secondes] - Première impression du portfolio**

La page d'accueil se charge instantanément (< 1.5s).

**Effet wow immédiat** : Typographie géante qui apparaît en cascade, animation scroll fluide, palette de couleurs signature. Denis ne s'attendait pas à ça.

Mais il n'a pas le temps d'apprécier. **Son œil cherche les keywords critiques.**

**Tagline hero section :**
> "Product Designer spécialisé B2B SaaS • 6 ans d'expérience • Design Systems & Produits Complexes"

✅ **BINGO.** Tous les keywords sont là, visibles immédiatement.

**[15-25 secondes] - Scroll rapide**

Denis scroll rapidement vers le bas. Il voit :
- 3 projets mis en avant avec des **tags visibles** : "B2B SaaS", "CRM", "Workflow", "Design System"
- Des **screenshots stylés** qui donnent l'impression de qualité
- Une section "Expérience" avec logos d'entreprises reconnaissables

Il n'a pas besoin d'en voir plus. Le profil **coche toutes les cases**.

**Climax - La Décision (25 secondes)**

Denis retourne sur l'ATS et clique sur **"Shortlist - À passer à Mathilde"**.

**Pensée interne :** *"Celui-là a l'air solide. Portfolio stylé, keywords tous présents, bonne exp. Mathilde va valider techniquement mais ça sent bon."*

**Resolution - Nouvelle Réalité**

Baptiste passe le **premier filtre** avec succès. Sa candidature est transférée à Mathilde pour l'entretien technique. Denis ajoute une note dans l'ATS : *"Portfolio très pro, profil senior B2B SaaS confirmé."*

**Facteur de succès :** Les 10 premières secondes. Si Denis n'avait pas vu immédiatement "Product Designer • 6 ans • B2B SaaS", il serait passé au suivant.

---

### Journey 2 : Mathilde - La Designer qui Valide Techniquement

**Persona : Mathilde, 29 ans, Lead Designer chez la même startup**

**Opening Scene - Mercredi après-midi, entre deux meetings**

Mathilde reçoit un Slack de Denis : *"Nouveau profil à checker : Baptiste, Product Designer. Portfolio stylé, peux-tu valider qu'il tient la route techniquement ? Appel prévu vendredi."*

**Sa mission :** Vérifier que Baptiste "est en adéquation avec ce qu'il vend". Elle a déjà vu trop de portfolios "Dribbble" - beaux sur le papier mais irréalisables en production. Elle cherche les **red flags**.

**État émotionnel :** Sceptique par défaut. Elle sait que beaucoup de designers survendent leurs compétences. Son job est de détecter ça AVANT l'entretien pour ne pas perdre de temps.

**Rising Action - L'Analyse Critique**

**[0-30 secondes] - Première impression, œil critique activé**

Mathilde ouvre le portfolio. L'effet wow visuel est là (animations, UI propre) mais elle ne se laisse pas impressionner tout de suite.

**Checklist mentale immédiate :**
- ❌ Trop de screenshots "hero" sans contexte ?
- ❌ Design aléatoire (espacements au pif, couleurs mal gérées) ?
- ❌ Pas de méthodologie visible ?

Elle scroll vers la liste des projets. **Elle cherche un case study complet pour juger.**

**[30s-2min] - Lecture du premier case study : "CRM B2B - Refonte Dashboard"**

Mathilde clique sur le projet CRM. C'est celui qui l'intéresse le plus car leur produit est aussi un CRM.

**Structure du case study :**
```
1. Context & Problem
2. Research & Discovery
3. Design Process
4. Solution & Screens
5. Results & Learnings
```

**Elle lit en diagonal, mais analyse :**

**Section "Design Process" :**
- ✅ Wireframes basse-fidélité visibles
- ✅ Iterations montrées (Version 1 → Version 2 → Finale)
- ✅ Rationale des décisions : "Pourquoi ce layout ? → Optimiser scan visuel des tâches prioritaires"

**Section "Solution & Screens" :**
- ✅ Screenshots stylés MAIS avec contexte (pas juste "hero shots")
- ✅ **UI hyper carrée** : Espacements cohérents (système 8px visible), palette de couleurs maîtrisée (3-4 couleurs max, contrastes respectés)
- ✅ Design system sous-jacent visible (composants réutilisés d'un screen à l'autre)

**[2-4min] - Panel Contextuel qui enrichit la lecture**

Mathilde remarque le **panel contextuel de droite** qui change selon la section :

- Sur "Problem" → Elle voit les contraintes business : "Équipe support submergée par 200 tickets/jour"
- Sur "Solution" → Elle voit les alternatives envisagées : "Option A : Table view vs Option B : Kanban → Kanban choisi pour…"
- Sur "Results" → Métriques claires : "-35% temps traitement tickets, +67% satisfaction équipe support"

**Pensée interne :** *"Ok, ce mec pense vraiment produit. Il ne fait pas juste de beaux écrans, il comprend le business impact."*

**[4-5min] - Vérification d'un 2ème projet**

Mathilde ouvre un 2ème projet (Contract Management Workflow). Même rigueur :
- Process clair
- UI maîtrisée pixel perfect
- Outputs logiques et justifiés

**Climax - Le Moment "Ok, il est Senior" (5min)**

Mathilde arrive à la fin du 2ème case study. **Le déclic se fait** :

**Mix gagnant détecté :**
1. ✅ **Screenshots stylés** (UI pixel perfect, pas de red flags design)
2. ✅ **Process clair** (méthodologie visible, pas juste des livrables)
3. ✅ **Outputs logiques** (décisions justifiées, impact business mesuré)

**Pensée interne :** *"Lui, il est vraiment senior. Pas de bullshit. Il sait designer, mais surtout il sait POURQUOI il design comme ça. Je peux travailler avec quelqu'un comme ça."*

**Resolution - Validation Technique**

Mathilde retourne sur Slack et écrit à Denis :

> "✅ Profil validé. Portfolio très carré, méthodologie solide, UI impeccable. Pas de red flags. On peut passer à l'étape suivante. Je suis OK pour faire l'entretien technique vendredi."

**Facteur de succès :** La combinaison process + exécution. Si Baptiste avait montré seulement de beaux screens sans contexte, Mathilde aurait détecté le red flag "Dribbble syndrome".

---

### Journey 3 : Thomas - Le CEO qui doit Se Projeter

**Persona : Thomas, 38 ans, CEO d'une startup B2B SaaS en Série A (80 personnes)**

**Opening Scene - Jeudi soir, après le board meeting**

Thomas reçoit un email de Denis (RH) : *"Thomas, on a un excellent profil Product Designer senior pour structurer le design. Mathilde a validé techniquement. Peux-tu regarder son portfolio avant le dernier entretien demain ?"*

**Sa situation :** Thomas cherche désespérément un **Founder Designer** pour poser les fondations du design dans sa boite. Actuellement, le produit est fonctionnel mais pas "sexy". Ils perdent des deals face à des concurrents avec une meilleure UI. Il a besoin de quelqu'un qui peut :
- Designer leur dashboard principal (actuellement moche et confus)
- Créer un design system de zéro
- Travailler de manière autonome sans supervision design

**État émotionnel :** Espoir mais prudent. Il a déjà recruté 2 designers qui n'ont pas tenu leurs promesses. Il veut être sûr que Baptiste peut vraiment "faire ça chez nous aussi".

**Rising Action - La Projection**

**[0-30s] - Hero Section et Positionnement**

Thomas ouvre le portfolio. Il est immédiatement impressionné par l'effet visuel (typographie monumentale, animations scroll).

**Tagline qui résonne :**
> "Product Designer spécialisé B2B SaaS • Design Systems & Produits Complexes • 0→1 et Scale"

**Pensée interne :** *"0→1 et Scale, c'est exactement ce qu'on cherche. On est en train de passer de 0 à 1 sur le design."*

**[30s-2min] - Scan des Projets avec Tags**

Thomas scroll vers la liste des projets. Il voit **des titres avec outputs forts** :

1. **"Refonte Dashboard CRM : -35% temps traitement, +240% adoption"**
   - Tags : `B2B SaaS` `CRM` `Dashboard` `Design System`

2. **"Contract Management : Workflow 0→1 pour 500+ users"**
   - Tags : `B2B SaaS` `Workflow` `Enterprise` `0→1`

3. **"Design System : De 0 à 50+ composants en 6 mois"**
   - Tags : `Design System` `Component Library` `Scale`

**Pensée interne :** *"Ok, lui il a fait exactement ce que je veux faire. Dashboard CRM similaire au nôtre, Design System from scratch, et en plus il a des metrics business. Intéressant."*

**[2-5min] - Lecture du Case Study CRM (Projection)**

Thomas clique sur le projet CRM car c'est le plus proche de son produit.

**Ce qu'il cherche activement :**
- Est-ce que le problème de départ ressemble au sien ?
- Est-ce que les résultats sont **factuels et réplicables** ?

**Section "Problem" :**
> "Dashboard CRM existant : 200+ tickets/jour, équipe support débordée, taux d'erreur 15%, interface confuse avec 8 niveaux de navigation."

**Pensée interne :** *"Putain, c'est EXACTEMENT notre dashboard. Interface confuse, trop de niveaux, équipe qui galère."*

**Section "Solution" :**
Thomas voit des screenshots du dashboard avant/après. **Le "après" est exactement ce qu'il imagine pour son produit** : Clean, navigation simplifiée, information hiérarchisée.

**Section "Results" :**
```
- 35% temps de traitement réduit
- 67% satisfaction équipe augmentée
- 240% adoption des nouvelles features
- Design system créé : 32 composants réutilisables
```

**Pensée interne :** *"Ces résultats sont concrets. Si lui peut faire -35% temps de traitement chez eux, il peut faire pareil chez nous. Et en plus il a construit un design system, c'est pile ce qu'on veut."*

**Climax - Le Moment de Projection (5-6min)**

Thomas regarde le **panel contextuel** qui affiche une note :

> "💡 Ce projet a pris 4 mois avec 1 designer (moi) + 2 devs. Design system construit en parallèle pour scaler ensuite."

**Le déclic se fait :**

**Pensée interne :** *"4 mois, 1 designer autonome, résultats mesurables. Lui, il pourra faire ça chez nous aussi. C'est exactement le profil Founder Designer qu'on cherche."*

**Resolution - Conviction et Décision**

Thomas répond à Denis :

> "Ok pour le dernier entretien demain. Portfolio très convaincant, il a fait exactement ce qu'on veut faire. Prépare une offre compétitive, je veux pas le perdre."

Le lendemain, lors de l'entretien, Thomas ne pose même pas de questions sur les compétences techniques (Mathilde a validé). Il parle directement **vision, ambition, et fit culturel**.

**Facteur de succès :** Les **éléments factuels et réplicables**. Thomas a pu se projeter car le problème de départ + la solution + les résultats étaient transposables à sa propre entreprise.

---

### Journey Requirements Summary

Les 3 journeys révèlent des capabilities fonctionnelles claires pour le MVP :

#### Capabilities Critiques Identifiées

**1. Hero Section Optimisée Scanning Rapide (Denis - 0-10s)**
- Tagline avec tous keywords : "Product Designer spécialisé B2B SaaS • 6 ans d'exp • Design Systems"
- Performance < 1.5s FCP
- Animations wow qui ne ralentissent pas

**2. Système de Tags et Navigation (Denis + Thomas)**
- Tags visuels sur chaque projet : `B2B SaaS` `CRM` `Design System` `0→1`
- Filtrage possible par domaine/compétence
- Permet scan rapide et découverte ciblée

**3. Case Studies Structurés Complets (Mathilde + Thomas)**
- Structure narrative : Context → Research → Process → Solution → Results
- Section "Design Process" avec wireframes, iterations, rationale
- Outputs forts dans titres : "[Projet] : [Résultat mesurable]"

**4. Panel Contextuel Adaptatif (Mathilde + Thomas) - KILLER FEATURE**
- Change selon section du case study
- Sur "Problem" → Contraintes business
- Sur "Solution" → Alternatives envisagées
- Sur "Results" → Métriques + insights pratiques (timeline, ressources)

**5. UI Pixel Perfect Démontrable (Mathilde)**
- Système d'espacement cohérent (8px grid)
- Palette de couleurs maîtrisée (design tokens)
- Design system sous-jacent visible (composants réutilisés)

**6. Résultats Business Quantifiés (Thomas)**
- Metrics factuels : -35% temps, +67% satisfaction, +240% adoption
- Timeline et ressources : "4 mois, 1 designer + 2 devs"
- Before/After visuels forts

**7. Section Expérience et Crédibilité (Denis)**
- Timeline 6 années d'expérience claire
- Logos entreprises reconnaissables
- Rassure sur le parcours

---

## Web App Specific Requirements

Les journeys utilisateurs révèlent des besoins techniques spécifiques pour une web app performante. Cette section détaille les exigences techniques pour le type de projet (SPA Next.js 14).

### Application Type & Architecture

**Type:** Single Page Application (SPA)  
**Framework:** Next.js 14 (App Router)  
**Rendering Strategy:** Client-side rendering avec optimisations Next.js (Image, Link, lazy loading)

---

### Browser Support Matrix

**Cible MVP:** Evergreen browsers uniquement (auto-update)

- **Chrome/Edge:** Dernières 2 versions
- **Firefox:** Dernières 2 versions  
- **Safari:** iOS 15+ / macOS dernières 2 versions

**Rationale:** Audience cible (recruteurs tech, designers, PMs) utilise browsers modernes. Pas de legacy support nécessaire.

---

### Responsive Design Specifications

**Breakpoints testés:**
- **Mobile:** 375px (iPhone SE baseline)
- **Tablet:** 768px (iPad portrait)
- **Desktop:** 1440px+ (écrans standards professionnels)

**Layout Responsive:**
- **Desktop (≥1024px):** Tri-Panel 20% Nav / 50% Content / 30% Context
- **Tablet (768-1023px):** 2 cols 30% Nav / 70% Content, context panel slide-over
- **Mobile (<768px):** 1 col stack, navigation drawer + context slide-over

---

### Performance Requirements

Les exigences de performance détaillées (Core Web Vitals, bundle size, optimisations) sont spécifiées dans les sections [Functional Requirements > Performance](#capability-area-6--technical-performance--optimization) et [Non-Functional Requirements > Performance](#performance).

---

### SEO Strategy (Minimaliste)

**Focus:** Partage social, pas trafic organique

**Requis MVP:**
- Meta tags Open Graph (titre, description, image)
- Twitter Cards
- Title dynamique par page
- Meta description par case study

**Non-requis MVP (Growth phase):**
- Sitemap XML
- Structured Data JSON-LD
- robots.txt avancé
- Canonical URLs (1 seul domaine, pas nécessaire)

**Rationale:** L'objectif est conversion candidatures directes, pas SEO organique. Social sharing suffit.

---

### Accessibility Requirements (WCAG AA Complet)

**Baseline WCAG AA:**
- Contraste 4.5:1 texte normal, 3:1 texte large
- Navigation clavier complète (Tab, Shift+Tab, Enter, Esc)
- Focus visible sur tous éléments interactifs
- Alt text sur toutes images

**Features Accessibilité Avancées MVP:**

✅ **Skip Links**
- "Skip to main content" visible au premier Tab
- "Skip to navigation" si nécessaire
- Shortcuts clavier vers sections principales

✅ **Focus Trap**
- Command Palette (Cmd+K) : focus piégé dans modal
- Panel slide-over mobile : focus piégé pendant ouverture
- Modals/Overlays : Esc pour fermer, focus return

✅ **Reduced Motion Support**
- Détection `prefers-reduced-motion: reduce`
- Animations désactivées ou simplifiées si activé
- Transitions essentielles seulement (feedback immédiat)
- Pas d'animations scroll parallax si reduced motion

✅ **ARIA Labels**
- Command Palette : `role="dialog"`, `aria-label="Command menu"`
- Navigation : `role="navigation"`, `aria-label="Main navigation"`
- Buttons iconiques : `aria-label` descriptif
- Panel contextuel : `role="complementary"`, `aria-label="Context panel"`

**Rationale:** En tant que designer senior, démontrer maîtrise accessibilité est argument de crédibilité technique.

---

### Real-Time Features

**MVP:** Aucune feature real-time  
**Growth Phase:** Live Status ("🟢 Baptiste designe actuellement"), analytics live

**Rationale:** Pas nécessaire pour objectif MVP (conversion candidatures). Complexité technique non justifiée.

---

## Functional Requirements (Exigences Fonctionnelles)

### Vue d'Ensemble

Les Functional Requirements définissent **QUOI** le portfolio doit être capable de faire (capabilities), sans spécifier **COMMENT** (implémentation). Ces exigences forment le **contrat de capacités** pour tout le travail en aval : UX Design, Architecture Technique, et Epic Breakdown.

**Organisation :** 7 Capability Areas + 1 Bonus (Analytics) couvrant **40 Functional Requirements** testables et implementation-agnostic.

---

### Capability Area 1 : Content Presentation System

**FR-CP-01 : Splash Screen Animé Full Viewport**
- **QUOI** : Le système DOIT afficher un splash screen full viewport (100vh) animé comme point d'entrée initial avec :
  - Typographie monumentale animée
  - Tagline avec tous les keywords critiques ("Product Designer spécialisé B2B SaaS • X ans d'expérience • Design Systems & Produits Complexes")
  - Animation d'entrée spectaculaire (cascade, fade-in, timing curves)
  - Indication visuelle pour interagir (ex: "Cliquez pour entrer", "↓ Scroll", ou animation CTA)
- **QUI** : Visiteur (Tous profils - Première impression "wow" + keywords scanning Denis)
- **TEST** : Splash screen charge en < 1.5s, occupe 100vh, contient tous les keywords identifiables en < 10s, indication interaction visible

**FR-CP-01-BIS : Transition Splash → Dashboard**
- **QUOI** : Le système DOIT fournir une transition fluide et animée du splash screen vers le dashboard principal suite à interaction utilisateur (clic, scroll, ou touche)
- **QUI** : Visiteur (Tous profils - Expérience premium)
- **TEST** : Clic/scroll/touche déclenche transition fluide 60fps (durée 500-1000ms), arrive sur dashboard tri-panel

**FR-CP-01-TER : Mode Dashboard Tri-Panel**
- **QUOI** : Le système DOIT afficher le portfolio en mode "dashboard" après le splash screen avec :
  - Layout tri-panel responsive (Desktop: 20% Nav / 50% Content / 30% Context)
  - Liste projets avec tags visuels
  - Navigation persistante (header + breadcrumbs)
  - Panel contextuel adaptatif
- **QUI** : Visiteur (Tous profils - Exploration approfondie)
- **TEST** : Dashboard affiche tri-panel sur desktop (≥1024px), layout responsive sur tablet/mobile, navigation fonctionnelle

**FR-CP-02 : Liste Projets avec Tags Visuels**
- **QUOI** : Le système DOIT afficher une liste de projets avec tags visuels cliquables (ex: `B2B SaaS`, `CRM`, `Design System`, `0→1`)
- **QUI** : Visiteur (Denis + Thomas - Scan rapide ou recherche ciblée)
- **TEST** : Chaque projet affiche minimum 3-5 tags pertinents, cliquables pour filtrage

**FR-CP-03 : Structure Case Study Standard**
- **QUOI** : Le système DOIT présenter chaque case study avec structure narrative standard : Context → Research → Process → Solution → Results
- **QUI** : Visiteur (Mathilde - Validation technique, Thomas - Projection)
- **TEST** : Toutes les 5 sections sont présentes et navigables pour chaque case study

**FR-CP-04 : Affichage Résultats Business Quantifiés**
- **QUOI** : Le système DOIT afficher des métriques business factuelles dans la section Results (ex: "-35% temps traitement", "+67% satisfaction", "4 mois, 1 designer + 2 devs")
- **QUI** : Visiteur (Thomas - Besoin de projection factuelle)
- **TEST** : Section Results contient minimum 3 métriques quantifiées + ressources/timeline

**FR-CP-05 : Page About avec Positionnement**
- **QUOI** : Le système DOIT fournir une page About avec bio, positionnement (Founder Designer / Solo Designer), et timeline d'expérience
- **QUI** : Visiteur (Tous profils - Crédibilité et contexte)
- **TEST** : Page About contient bio (200-400 mots), positionnement clair, et timeline 6 années

---

### Capability Area 2 : Contextual Information Panel

**FR-CIP-01 : Panel Adaptatif selon Section**
- **QUOI** : Le système DOIT afficher un panel contextuel qui change son contenu selon la section du case study consultée
- **QUI** : Visiteur (Mathilde + Thomas - Enrichissement lecture)
- **TEST** : Panel affiche contenu différent sur sections Problem, Solution, Results (minimum 3 variantes par case study)

**FR-CIP-02 : Variantes Contextuelles**
- **QUOI** : Le système DOIT fournir ces variantes contextuelles :
  - Sur "Problem" → Contraintes business et contexte
  - Sur "Solution" → Alternatives envisagées et rationale
  - Sur "Results" → Métriques détaillées et learnings
- **QUI** : Visiteur (Mathilde - Analyse critique, Thomas - Projection)
- **TEST** : Chaque variante affiche contenu spécifique et pertinent à la section consultée

**FR-CIP-03 : Comportement Responsive Panel**
- **QUOI** : Le système DOIT adapter le panel contextuel selon breakpoint :
  - Desktop (≥1024px) : Panel fixe colonne droite (30% largeur)
  - Tablet (768-1023px) : Panel slide-over activable
  - Mobile (<768px) : Panel slide-over activable
- **QUI** : Visiteur (Tous devices)
- **TEST** : Panel affiche comportement correct sur 3 breakpoints testés (375px, 768px, 1024px, 1440px+)

---

### Capability Area 3 : Advanced Navigation & Command Interface

**FR-NAV-01 : Command Palette Cmd+K**
- **QUOI** : Le système DOIT fournir une command palette activable via Cmd+K (Mac) ou Ctrl+K (Windows/Linux)
- **QUI** : Visiteur (Power users - Mathilde, Thomas)
- **TEST** : Cmd+K ouvre palette avec 8-12 commandes accessibles

**FR-NAV-02 : Commandes Navigation Essentielles**
- **QUOI** : Le système DOIT fournir ces commandes navigation :
  - Système : `/home`, `/about`, `/contact`, `/projects`
  - Projets : `/project-1`, `/project-2`, `/project-3`
  - Theme : `/dark`, `/light`
- **QUI** : Visiteur (Power users)
- **TEST** : Toutes les commandes listées sont accessibles et fonctionnelles dans la palette

**FR-NAV-03 : Recherche Fuzzy dans Palette**
- **QUOI** : Le système DOIT permettre recherche fuzzy dans la command palette (ex: "crm" trouve "/project-crm-dashboard")
- **QUI** : Visiteur (Power users cherchant projet spécifique)
- **TEST** : Recherche fuzzy retourne résultats pertinents avec minimum 2 caractères tapés

**FR-NAV-04 : Navigation Clavier Palette**
- **QUOI** : Le système DOIT permettre navigation clavier complète dans la command palette (↑↓ sélection, Enter validation, Esc fermeture)
- **QUI** : Visiteur (Power users, accessibilité)
- **TEST** : Navigation clavier fonctionne sans souris requise

**FR-NAV-05 : Breadcrumbs Navigation**
- **QUOI** : Le système DOIT afficher un fil d'ariane (breadcrumbs) dans le header indiquant position actuelle (ex: "Home > Projects > CRM Dashboard")
- **QUI** : Visiteur (Tous profils - Orientation)
- **TEST** : Breadcrumbs affiche hiérarchie correcte sur toutes les pages (minimum 2 niveaux)

---

### Capability Area 4 : Visual Experience & Interactions

**FR-VX-01 : Animations Hero Typography**
- **QUOI** : Le système DOIT animer la typographie hero section à l'arrivée (cascade, fade-in, ou timing curves personnalisées)
- **QUI** : Visiteur (Tous profils - Première impression "wow")
- **TEST** : Animation hero perceptible < 2s après chargement page, maintient 60fps

**FR-VX-02 : Hover Effects Narratifs**
- **QUOI** : Le système DOIT fournir 5-10 hover effects narratifs clés sur éléments interactifs (ex: tooltips intelligents, feedback visuel immédiat)
- **QUI** : Visiteur (Mathilde - Validation UI pixel perfect)
- **TEST** : Minimum 5 hover states distincts identifiables, tous fluides 60fps

**FR-VX-03 : Scroll Parallax Subtil**
- **QUOI** : Le système DOIT implémenter animations scroll parallax subtiles sur éléments visuels clés (hero, sections case study)
- **QUI** : Visiteur (Tous profils - Expérience premium)
- **TEST** : Parallax perceptible au scroll, maintient Lighthouse > 90

**FR-VX-04 : Page Transitions Fluides**
- **QUOI** : Le système DOIT fournir transitions fluides entre pages (fade, slide, ou custom)
- **QUI** : Visiteur (Tous profils - Cohérence expérience)
- **TEST** : Transitions perceptibles et fluides 60fps, < 300ms durée

**FR-VX-05 : Compteurs Animés Métriques**
- **QUOI** : Le système DOIT animer les chiffres d'impact dans la section Results (compteur progressif de 0 à valeur finale)
- **QUI** : Visiteur (Thomas - Impact visuel métriques business)
- **TEST** : Compteurs s'animent au scroll dans viewport, durée 1-2s

**FR-VX-06 : Dark/Light Mode Toggle**
- **QUOI** : Le système DOIT fournir un toggle dark/light mode avec transition smooth entre thèmes
- **QUI** : Visiteur (Tous profils - Préférence utilisateur)
- **TEST** : Toggle change thème avec transition < 300ms, préférence persistante en session

---

### Capability Area 5 : Conversion & Engagement

**FR-CE-01 : CTA "Disponible" avec Statut**
- **QUOI** : Le système DOIT afficher un CTA "Disponible pour mission" avec statut manuel (🟢 Disponible, 🟡 Discussions en cours, 🔴 Non disponible)
- **QUI** : Visiteur (Thomas - Décision contact)
- **TEST** : CTA visible sur toutes les pages dashboard, statut cohérent (mis à jour manuellement par Baptiste)

**FR-CE-02 : Formulaire Contact avec Validation**
- **QUOI** : Le système DOIT fournir un formulaire contact avec validation temps réel (nom, email, message)
- **QUI** : Visiteur (Tous profils - Action contact)
- **TEST** : Formulaire valide champs requis, affiche erreurs inline, soumet avec succès

**FR-CE-03 : Social Sharing Meta Tags**
- **QUOI** : Le système DOIT générer meta tags Open Graph et Twitter Cards pour chaque page (titre, description, image preview)
- **QUI** : Visiteur partageant sur réseaux sociaux
- **TEST** : Preview social correct sur LinkedIn/Twitter pour splash, about, et case studies (minimum 3 pages)

**FR-CE-04 : Easter Egg Konami Code - Design Forensics**
- **QUOI** : Le système DOIT détecter le Konami code (↑↑↓↓←→←→BA) et déclencher une séquence animée progressive :
  1. Affichage de la grille de design (8px grid) en overlay
  2. Animation de "wireframe se dessine" sur la page actuelle (skeleton/structure apparaît progressivement)
  3. Overlay final avec le process de design du portfolio (décisions, iterations, rationale)
- **QUI** : Visiteur curieux (Power users - Mathilde, designers)
- **TEST** : Konami code déclenche séquence complète (grille → wireframe animation → process reveal), Esc ferme l'overlay

---

### Capability Area 6 : Technical Performance & Optimization

**FR-PERF-01 : Performance Targets Lighthouse**
- **QUOI** : Le système DOIT atteindre Lighthouse Performance Score > 90 en production
- **QUI** : Tous visiteurs (Experience fluide + crédibilité technique)
- **TEST** : Lighthouse audit production retourne score > 90 sur 3 pages testées (home, about, case study)

**FR-PERF-02 : Core Web Vitals Targets**
- **QUOI** : Le système DOIT respecter ces Core Web Vitals :
  - FCP (First Contentful Paint) < 1.5s
  - LCP (Largest Contentful Paint) < 2.5s
  - TTI (Time to Interactive) < 3s
  - CLS (Cumulative Layout Shift) < 0.1
  - FID (First Input Delay) < 100ms
- **QUI** : Tous visiteurs (Experience fluide)
- **TEST** : Chrome DevTools / Lighthouse confirme tous les seuils respectés

**FR-PERF-03 : Image Optimization Automatique**
- **QUOI** : Le système DOIT optimiser automatiquement toutes les images (lazy load, WebP, responsive sizes)
- **QUI** : Tous visiteurs (Performance)
- **TEST** : Images servent format WebP quand supporté, lazy load après viewport, responsive srcset

**FR-PERF-04 : Code Splitting par Route**
- **QUOI** : Le système DOIT implémenter code splitting automatique par route (page)
- **QUI** : Tous visiteurs (Performance initial load)
- **TEST** : Bundle JS par page < 200kb, routes chargées à la demande

**FR-PERF-05 : Font Optimization**
- **QUOI** : Le système DOIT optimiser le chargement des fonts (variable fonts si possible, preload des fonts critiques)
- **QUI** : Tous visiteurs (Performance + pas de FOUT)
- **TEST** : Fonts critiques preload, variable fonts utilisées, pas de flash de texte non stylé (FOUT)

---

### Capability Area 7 : Accessibility & Inclusivity

**FR-A11Y-01 : WCAG AA Baseline**
- **QUOI** : Le système DOIT respecter WCAG AA baseline :
  - Contraste 4.5:1 texte normal, 3:1 texte large
  - Navigation clavier complète (Tab, Shift+Tab, Enter, Esc)
  - Focus visible sur tous éléments interactifs
  - Alt text sur toutes images
- **QUI** : Visiteurs avec handicaps visuels ou moteurs
- **TEST** : Audit axe-core retourne 0 violations WCAG AA sur 3 pages testées

**FR-A11Y-02 : Skip Links**
- **QUOI** : Le système DOIT fournir un skip link "Skip to main content" visible au premier Tab
- **QUI** : Visiteurs navigation clavier
- **TEST** : Premier Tab affiche skip link, Enter saute au main content

**FR-A11Y-03 : Focus Trap Command Palette**
- **QUOI** : Le système DOIT piéger le focus clavier dans la command palette quand ouverte (Tab cycle dans palette, Esc ferme et retourne focus)
- **QUI** : Visiteurs navigation clavier
- **TEST** : Tab cycle dans palette ouverte, Esc ferme et retourne focus à élément déclencheur

**FR-A11Y-04 : Focus Trap Modals & Slide-Overs**
- **QUOI** : Le système DOIT piéger le focus clavier dans les modals et slide-overs (panel contextuel mobile) quand ouverts
- **QUI** : Visiteurs navigation clavier
- **TEST** : Focus piégé dans modal/slide-over ouvert, Esc ferme et retourne focus

**FR-A11Y-05 : Reduced Motion Support**
- **QUOI** : Le système DOIT détecter `prefers-reduced-motion: reduce` et désactiver ou simplifier les animations (transitions essentielles seulement)
- **QUI** : Visiteurs sensibles au mouvement
- **TEST** : Avec `prefers-reduced-motion: reduce` activé, animations complexes désactivées, transitions < 100ms seulement

**FR-A11Y-06 : ARIA Labels Complets**
- **QUOI** : Le système DOIT fournir ARIA labels sur tous éléments interactifs non explicites :
  - Command Palette : `role="dialog"`, `aria-label="Command menu"`
  - Navigation : `role="navigation"`, `aria-label="Main navigation"`
  - Buttons iconiques : `aria-label` descriptif
  - Panel contextuel : `role="complementary"`, `aria-label="Context panel"`
- **QUI** : Visiteurs lecteurs d'écran
- **TEST** : Screen reader (NVDA/JAWS) annonce correctement tous les éléments interactifs

---

### Capability Area 8 (Bonus) : Analytics & Tracking

**FR-ANALYTICS-01 : Vercel Analytics Integration**
- **QUOI** : Le système DOIT intégrer Vercel Analytics pour tracking métriques engagement (temps sur site, pages/session, bounce rate)
- **QUI** : Baptiste (propriétaire - mesure succès)
- **TEST** : Vercel Analytics dashboard affiche données visiteurs correctement

**FR-ANALYTICS-02 : Command Palette Usage Tracking**
- **QUOI** : Le système DOIT tracker utilisation command palette (% visiteurs utilisant Cmd+K)
- **QUI** : Baptiste (propriétaire - mesure feature adoption)
- **TEST** : Analytics capture événement "command_palette_opened" avec % visiteurs calculable

---

### Récapitulatif Functional Requirements

**Total : 40 Functional Requirements**

| Capability Area | Nombre FRs |
|----------------|-----------|
| 1. Content Presentation System | 7 FR |
| 2. Contextual Information Panel | 3 FR |
| 3. Advanced Navigation & Command Interface | 5 FR |
| 4. Visual Experience & Interactions | 6 FR |
| 5. Conversion & Engagement | 4 FR |
| 6. Technical Performance & Optimization | 5 FR |
| 7. Accessibility & Inclusivity | 6 FR |
| 8. Analytics & Tracking (Bonus) | 2 FR |

**Extraction Sources :** Success Criteria, User Journeys (Denis, Mathilde, Thomas), MVP Features, Web App Specific Requirements.

**Usage Downstream :** Ces FR forment le contrat de capacités pour UX Design, Architecture Technique, et Epic Breakdown. Toute capability absente de cette liste ne sera PAS implémentée.

---

## Non-Functional Requirements

### Vue d'Ensemble

Les Non-Functional Requirements définissent **COMMENT LE SYSTÈME DOIT PERFORMER** (qualités d'exécution), pas QUOI il doit faire. Ces exigences spécifient les attributs de qualité critiques pour le succès du portfolio.

**Organisation :** 3 catégories NFR pertinentes couvrant **18 Non-Functional Requirements** mesurables.

**Catégories Exclues (Non Pertinentes) :**
- ❌ Security : Pas de données sensibles, pas de login/paiements
- ❌ Scalability : Site statique, Vercel gère automatiquement, 200-500 visiteurs MVP
- ❌ Integration : Pas d'intégrations complexes (juste Vercel Analytics simple)
- ❌ Reliability : Vercel gère uptime 99.9%, pas d'opérations critiques temps réel

**Focus Principal :** Performance (7 NFRs) car utilisateurs pressés (Denis, Mathilde, Thomas) et performance = argument crédibilité technique pour Baptiste.

---

### Performance

**NFR-PERF-01 : Bundle Size Limits**
- **Critère** : Le bundle JavaScript initial (First Load JS) DOIT être < 100kb (compressed)
- **Rationale** : Utilisateurs mobiles ou connexions moyennes, chargement rapide critique pour première impression
- **Test** : Next.js build analysis confirme First Load JS < 100kb pour splash screen et dashboard

**NFR-PERF-02 : Asset Optimization**
- **Critère** : Toutes les images DOIVENT être servies en formats modernes (WebP/AVIF) avec fallback, taille < 500kb par image
- **Rationale** : Case studies avec screenshots peuvent être lourds, optimisation critique pour maintenir performance
- **Test** : Lighthouse audit confirme images optimisées, formats modernes servis aux browsers compatibles

**NFR-PERF-03 : Cache Strategy**
- **Critère** : Assets statiques (images, fonts, JS, CSS) DOIVENT être cachés avec stratégie CDN edge caching (max-age 1 an pour assets versionnés, 1 heure pour HTML)
- **Rationale** : Visiteurs de retour (25% target) doivent charger instantanément
- **Test** : HTTP headers confirment Cache-Control approprié, Vercel Edge Network active

**NFR-PERF-04 : Time to Interactive Desktop**
- **Critère** : TTI (Time to Interactive) DOIT être < 2.5s sur desktop (4G connection simulée)
- **Rationale** : Recruteurs pressés (Denis) abandonnent si site trop lent, 3s est limite psychologique
- **Test** : Lighthouse audit desktop (simulated throttling) confirme TTI < 2.5s

**NFR-PERF-05 : Time to Interactive Mobile**
- **Critère** : TTI (Time to Interactive) DOIT être < 4s sur mobile (3G Fast connection simulée)
- **Rationale** : Mobile représente ~30% trafic, acceptable légèrement plus lent que desktop
- **Test** : Lighthouse audit mobile (simulated 3G Fast) confirme TTI < 4s

**NFR-PERF-06 : Animation Frame Rate**
- **Critère** : Toutes les animations DOIVENT maintenir 60fps (frame time < 16ms) sans frame drops perceptibles
- **Rationale** : Animations jerky = red flag pour Mathilde (validation technique), démontre incompétence
- **Test** : Chrome DevTools Performance profiling montre frame time < 16ms sur animations splash, hover, parallax

**NFR-PERF-07 : Form Submission Response Time**
- **Critère** : Soumission formulaire contact DOIT retourner feedback (succès/erreur) en < 1s (P95)
- **Rationale** : Feedback immédiat critique pour conversion, délai > 1s frustrant
- **Test** : API monitoring confirme P95 response time < 1s sur endpoint contact

---

### Maintainability

**NFR-MAINT-01 : Component Architecture**
- **Critère** : Le code DOIT suivre architecture composants réutilisables avec maximum 1 niveau de nesting (composants parents → composants enfants, pas de deep nesting)
- **Rationale** : Baptiste seul développeur, évolutions Growth/Vision nécessitent code facile à modifier
- **Test** : Code review confirme structure plate, composants réutilisables identifiables

**NFR-MAINT-02 : Design System Tokenization**
- **Critère** : Toutes les valeurs design (couleurs, espacements, typographie, shadows) DOIVENT être définies comme design tokens CSS Variables (`--color-primary`, `--spacing-md`, etc.)
- **Rationale** : Changements thématiques (dark mode, évolutions visuelles) modifiables en un seul endroit
- **Test** : Aucune valeur hard-coded dans composants (colors, spacing), tous référencent CSS Variables

**NFR-MAINT-03 : Content Separation**
- **Critère** : Le contenu (case studies, bio, projets) DOIT être séparé du code dans fichiers Markdown avec frontmatter YAML
- **Rationale** : Baptiste peut éditer contenu sans toucher code, ajout case studies future trivial
- **Test** : Tous les contenus éditoriaux existent dans `/content/**/*.md`, aucun contenu hard-coded dans composants React

**NFR-MAINT-04 : Build Time**
- **Critère** : Le build complet (next build) DOIT compléter en < 2 minutes
- **Rationale** : Déploiements fréquents (itérations MVP), feedback rapide critique pour workflow solo
- **Test** : `next build` localement et sur Vercel confirme durée < 2min

**NFR-MAINT-05 : Code Documentation**
- **Critère** : Les composants complexes (Command Palette, Panel Contextuel, Konami Easter Egg) DOIVENT avoir commentaires JSDoc expliquant props et behavior
- **Rationale** : Baptiste reviendra sur code après 6 mois (Growth phase), documentation aide rappel rapide
- **Test** : Composants complexes (>100 lignes) ont JSDoc header avec description et props

---

### Usability

**NFR-USA-01 : Mobile Touch Targets**
- **Critère** : Tous les éléments interactifs (boutons, liens, CTA) DOIVENT avoir minimum 44x44px touch target sur mobile
- **Rationale** : Standard iOS/Android, évite frustration tap sur mauvais élément
- **Test** : Lighthouse accessibility audit confirme touch targets >= 44x44px

**NFR-USA-02 : Error Recovery - Formulaire Contact**
- **Critère** : En cas d'erreur soumission formulaire, le système DOIT conserver les données saisies et afficher message d'erreur clair avec action corrective
- **Rationale** : Re-saisir formulaire après erreur = friction majeure, peut tuer conversion
- **Test** : Simuler erreur réseau, confirmer formulaire conserve données + message "Erreur réseau. Réessayez dans quelques instants."

**NFR-USA-03 : Loading States**
- **Critère** : Toutes les actions asynchrones (navigation, soumission form, chargement case study) DOIVENT afficher loading indicator si durée > 200ms
- **Rationale** : Feedback visuel immédiat évite confusion "ça marche ou pas ?"
- **Test** : Toutes les actions async montrent spinner/skeleton si > 200ms

**NFR-USA-04 : Keyboard Navigation Efficiency**
- **Critère** : Un utilisateur clavier DOIT pouvoir atteindre n'importe quelle page en < 10 tabs depuis splash screen (via skip links et command palette)
- **Rationale** : Navigation clavier efficace = accessibilité + power users (Mathilde)
- **Test** : Test manuel clavier confirme toutes pages accessibles en < 10 tabs

**NFR-USA-05 : Browser Compatibility**
- **Critère** : Le portfolio DOIT fonctionner correctement (features critiques accessibles, pas de bugs visuels majeurs) sur :
  - Chrome/Edge dernières 2 versions
  - Firefox dernières 2 versions
  - Safari iOS 15+ et macOS dernières 2 versions
- **Rationale** : Audience cible tech-savvy utilise browsers modernes, pas besoin legacy support
- **Test** : Tests manuels sur 3 browsers confirment fonctionnalités critiques (navigation, case studies, form contact) fonctionnelles

**NFR-USA-06 : Command Palette Discoverability**
- **Critère** : Un hint visuel subtil "Press ⌘K to search" DOIT être visible dans le header pour guider découverte Command Palette
- **Rationale** : Feature killer mais pas évidente, hint augmente adoption sans être intrusif
- **Test** : Hint "⌘K" visible dans header, disparaît après première utilisation Command Palette (session storage)

---

### Récapitulatif Non-Functional Requirements

**Total : 18 Non-Functional Requirements**

| Catégorie NFR | Nombre NFRs |
|--------------|-------------|
| Performance | 7 NFR |
| Maintainability | 5 NFR |
| Usability | 6 NFR |

**Rationale Sélective :** Seules les catégories NFR pertinentes pour ce portfolio ont été documentées. Pas de requirement bloat sur Security, Scalability, Integration ou Reliability (gérés automatiquement par Vercel ou non applicables au contexte).

---
