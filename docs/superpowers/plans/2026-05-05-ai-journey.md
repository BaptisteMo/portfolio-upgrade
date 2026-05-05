# AI Journey Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/ai-journey` list page rendering 4 timeline-grouped levels (Level 0–3), each with title, description, and a grid of article cards loaded from MDX files. Wire nav + bento link.

**Architecture:** Reuse the existing MDX-frontmatter pipeline used by `/projects` (gray-matter, file system loader in `src/lib/mdx.ts`). Add an `AiArticleMeta` type with a `level: 0 | 1 | 2 | 3` field and a separate localized `levels` config (titles + descriptions per level). Server component reads articles + level config, groups by level, passes to a client `AiJourneyTimeline` component. Card visuals reuse `ProjectCard` styling via a new lightweight `AiArticleCard`.

**Tech Stack:** Next.js App Router (server components + `[locale]`), MDX via `gray-matter`, Tailwind, framer-motion (existing patterns).

---

## File Structure

**Create:**
- `src/content/ai-journey-levels.ts` — exported FR/EN level titles + descriptions (4 levels)
- `src/content/fr/ai-journey/level-0-prompt-basics.mdx` — mock article
- `src/content/fr/ai-journey/level-0-first-tools.mdx` — mock article
- `src/content/fr/ai-journey/level-1-rag-intro.mdx` — mock article
- `src/content/fr/ai-journey/level-1-context-window.mdx` — mock article
- `src/content/fr/ai-journey/level-2-agents.mdx` — mock article
- `src/content/fr/ai-journey/level-3-mcp-superpowers.mdx` — mock article
- `src/content/en/ai-journey/level-0-prompt-basics.mdx` — mock article (EN twin)
- `src/content/en/ai-journey/level-0-first-tools.mdx` — mock article
- `src/content/en/ai-journey/level-1-rag-intro.mdx` — mock article
- `src/content/en/ai-journey/level-1-context-window.mdx` — mock article
- `src/content/en/ai-journey/level-2-agents.mdx` — mock article
- `src/content/en/ai-journey/level-3-mcp-superpowers.mdx` — mock article
- `src/components/features/ai-journey/AiArticleCard.tsx` — single article card
- `src/components/features/ai-journey/LevelSection.tsx` — one level (dot + title + desc + grid)
- `src/components/features/ai-journey/AiJourneyTimeline.tsx` — full timeline w/ dotted spine
- `src/components/features/ai-journey/index.ts` — barrel
- `src/app/[locale]/ai-journey/page.tsx` — route page

**Modify:**
- `src/content/meta.ts` — add `AiArticleLevel`, `AiArticleMeta`, `AiJourneyLevelConfig` types
- `src/lib/mdx.ts` — add `getAllAiArticles(locale)` and `getAiArticleBySlug(slug, locale)` (latter unused for now but symmetric)
- `src/components/features/index.ts` — export ai-journey barrel
- `src/components/features/navigation/NavPanel.tsx` — change href `/side-projects` → `/ai-journey`
- `src/components/features/hero/BentoGrid.tsx` — change href `/side-projects` → `/ai-journey`

**Delete (after route swap verified):**
- `src/app/[locale]/side-projects/` (whole dir)
- `src/components/features/side-projects/` (whole dir, including `Constellation.tsx`, `SideProjectsPlaceholder.tsx`)

---

## Task 1: Types

**Files:**
- Modify: `src/content/meta.ts`

- [ ] **Step 1: Add types at end of file**

```ts
export type AiArticleLevel = 0 | 1 | 2 | 3

export interface AiArticleMeta {
  title: string
  slug: string
  description: string
  level: AiArticleLevel
  image?: string
  href?: string
}

export interface AiJourneyLevel {
  level: AiArticleLevel
  title: string
  description: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/content/meta.ts
git commit -m "feat(ai-journey): add article and level types"
```

---

## Task 2: Level config (FR/EN)

**Files:**
- Create: `src/content/ai-journey-levels.ts`

- [ ] **Step 1: Write file**

```ts
import type { AiJourneyLevel, Locale } from './meta'

export const aiJourneyLevels: Record<Locale, AiJourneyLevel[]> = {
  fr: [
    {
      level: 0,
      title: 'Level 0 — Premiers pas',
      description:
        "Découverte des LLM, prompts, outils grand public. Comprendre ce qu'on peut faire avec l'IA en moins d'une heure.",
    },
    {
      level: 1,
      title: 'Level 1 — Sortir du chat',
      description:
        "RAG, fenêtres de contexte, embeddings : connecter l'IA à ses propres données et dépasser le simple chat.",
    },
    {
      level: 2,
      title: 'Level 2 — Agents qui agissent',
      description:
        "Tool use, boucles d'agent, orchestration multi-étapes. L'IA passe du conseil à l'action.",
    },
    {
      level: 3,
      title: 'Level 3 — Superpouvoirs',
      description:
        "MCP, sub-agents, skills custom : étendre Claude Code et construire son propre stack agentique.",
    },
  ],
  en: [
    {
      level: 0,
      title: 'Level 0 — First steps',
      description:
        'LLMs, prompts, consumer tools. Understanding what AI can do in under an hour.',
    },
    {
      level: 1,
      title: 'Level 1 — Beyond chat',
      description:
        'RAG, context windows, embeddings: plugging AI into your own data and moving past plain chat.',
    },
    {
      level: 2,
      title: 'Level 2 — Agents that act',
      description:
        'Tool use, agent loops, multi-step orchestration. AI moves from advice to action.',
    },
    {
      level: 3,
      title: 'Level 3 — Superpowers',
      description:
        'MCP, sub-agents, custom skills: extending Claude Code and building your own agentic stack.',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/content/ai-journey-levels.ts
git commit -m "feat(ai-journey): add localized level config"
```

---

## Task 3: MDX loader

**Files:**
- Modify: `src/lib/mdx.ts`

- [ ] **Step 1: Add validator + loaders at end of file**

```ts
function validateAiArticleMeta(data: Record<string, unknown>): AiArticleMeta {
  const required = ['title', 'slug', 'description', 'level']
  for (const field of required) {
    if (!(field in data)) {
      throw new Error(`Missing required ai-journey frontmatter field: ${field}`)
    }
  }
  const level = data.level
  if (level !== 0 && level !== 1 && level !== 2 && level !== 3) {
    throw new Error(`Invalid level "${String(level)}" in ai-journey article (must be 0|1|2|3)`)
  }
  return data as unknown as AiArticleMeta
}

export async function getAllAiArticles(locale: Locale): Promise<AiArticleMeta[]> {
  const dir = path.join(contentDirectory, locale, 'ai-journey')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const fileContents = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data } = matter(fileContents)
      return validateAiArticleMeta(data)
    })
}
```

- [ ] **Step 2: Update import line**

Change line 4 from:
```ts
import type { Locale, ProjectMeta, AboutMeta } from '@/content/meta'
```
To:
```ts
import type { Locale, ProjectMeta, AboutMeta, AiArticleMeta } from '@/content/meta'
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS (no errors).

- [ ] **Step 4: Commit**

```bash
git add src/lib/mdx.ts
git commit -m "feat(ai-journey): add MDX loader for articles"
```

---

## Task 4: Mock MDX articles (FR)

**Files:**
- Create: 6 files under `src/content/fr/ai-journey/`

- [ ] **Step 1: Write `level-0-prompt-basics.mdx`**

```mdx
---
title: "Bien écrire un prompt"
slug: "level-0-prompt-basics"
description: "Les bases pour transformer une intention floue en instructions claires que le modèle peut suivre."
level: 0
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 2: Write `level-0-first-tools.mdx`**

```mdx
---
title: "Mes 5 outils IA quotidiens"
slug: "level-0-first-tools"
description: "Le starter-pack que je recommande à toute personne qui découvre l'IA générative en 2026."
level: 0
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 3: Write `level-1-rag-intro.mdx`**

```mdx
---
title: "RAG sans la magie"
slug: "level-1-rag-intro"
description: "Comprendre Retrieval-Augmented Generation avec un cas concret et zéro framework."
level: 1
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 4: Write `level-1-context-window.mdx`**

```mdx
---
title: "La fenêtre de contexte n'est pas une mémoire"
slug: "level-1-context-window"
description: "Pourquoi 1M tokens ne remplace pas une vraie stratégie de mémoire."
level: 1
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 5: Write `level-2-agents.mdx`**

```mdx
---
title: "Mon premier agent qui agit vraiment"
slug: "level-2-agents"
description: "Sortir du chatbot : tool use, boucle d'agent, et premières surprises en production."
level: 2
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 6: Write `level-3-mcp-superpowers.mdx`**

```mdx
---
title: "MCP : le port USB-C des agents"
slug: "level-3-mcp-superpowers"
description: "Comment Model Context Protocol change la donne pour étendre Claude et ses cousins."
level: 3
image: "/images/projects/atlas/banner.jpg"
---

Contenu à venir.
```

- [ ] **Step 7: Commit**

```bash
git add src/content/fr/ai-journey/
git commit -m "feat(ai-journey): add FR mock articles"
```

---

## Task 5: Mock MDX articles (EN)

**Files:**
- Create: 6 files under `src/content/en/ai-journey/`

- [ ] **Step 1: Write `level-0-prompt-basics.mdx`**

```mdx
---
title: "Writing prompts that work"
slug: "level-0-prompt-basics"
description: "Turn fuzzy intent into clear instructions the model can actually follow."
level: 0
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 2: Write `level-0-first-tools.mdx`**

```mdx
---
title: "My 5 daily AI tools"
slug: "level-0-first-tools"
description: "The starter pack I recommend to anyone discovering generative AI in 2026."
level: 0
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 3: Write `level-1-rag-intro.mdx`**

```mdx
---
title: "RAG without the magic"
slug: "level-1-rag-intro"
description: "Retrieval-Augmented Generation explained with one concrete case and zero framework."
level: 1
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 4: Write `level-1-context-window.mdx`**

```mdx
---
title: "Context window is not memory"
slug: "level-1-context-window"
description: "Why 1M tokens won't replace a real memory strategy."
level: 1
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 5: Write `level-2-agents.mdx`**

```mdx
---
title: "My first agent that actually acts"
slug: "level-2-agents"
description: "Past the chatbot: tool use, agent loops, and the first surprises in production."
level: 2
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 6: Write `level-3-mcp-superpowers.mdx`**

```mdx
---
title: "MCP: the USB-C of agents"
slug: "level-3-mcp-superpowers"
description: "How Model Context Protocol shifts what's possible for extending Claude and friends."
level: 3
image: "/images/projects/atlas/banner.jpg"
---

Content coming soon.
```

- [ ] **Step 7: Commit**

```bash
git add src/content/en/ai-journey/
git commit -m "feat(ai-journey): add EN mock articles"
```

---

## Task 6: AiArticleCard component

**Files:**
- Create: `src/components/features/ai-journey/AiArticleCard.tsx`

- [ ] **Step 1: Write component**

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useParallax } from '@/hooks'
import { BLUR_DATA_URL } from '@/lib/image-placeholder'
import type { AiArticleMeta } from '@/content/meta'

interface AiArticleCardProps {
  article: AiArticleMeta
  priority?: boolean
}

export function AiArticleCard({ article, priority = false }: AiArticleCardProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  useParallax(imageRef, { speed: 0.15, maxOffset: 20 })

  const cardClass = cn(
    'group block rounded-lg border border-border bg-card overflow-hidden shadow-secondary-glow',
    'hover:shadow-secondary-hover hover:ring-primary/20 hover:-translate-y-0.5',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:hover:ring-0',
    'active:translate-y-px active:shadow-secondary-down'
  )

  const inner = (
    <>
      <div className="relative aspect-video bg-muted overflow-hidden">
        <div ref={imageRef} className="absolute inset-0">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover transition-transform duration-150 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-muted to-muted-foreground/10" />
          )}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
      </div>
    </>
  )

  if (article.href) {
    return (
      <Link href={article.href} target="_blank" rel="noreferrer" className={cardClass}>
        {inner}
      </Link>
    )
  }

  return <div className={cn(cardClass, 'cursor-default')}>{inner}</div>
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/features/ai-journey/AiArticleCard.tsx
git commit -m "feat(ai-journey): add article card component"
```

---

## Task 7: LevelSection component

**Files:**
- Create: `src/components/features/ai-journey/LevelSection.tsx`

- [ ] **Step 1: Write component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { AiArticleCard } from './AiArticleCard'
import type { AiArticleMeta, AiJourneyLevel } from '@/content/meta'

interface LevelSectionProps {
  level: AiJourneyLevel
  articles: AiArticleMeta[]
  isLast: boolean
}

export function LevelSection({ level, articles, isLast }: LevelSectionProps) {
  return (
    <section className="relative pl-10">
      {/* Dot */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background"
      />

      {/* Dotted spine continues to next level */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-6 bottom-[-3rem] -translate-x-1/2 border-l-2 border-dashed border-primary/50"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <header className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{level.title}</h2>
          <p className="text-muted-foreground max-w-2xl">{level.description}</p>
        </header>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {articles.map((article, index) => (
              <AiArticleCard
                key={article.slug}
                article={article}
                priority={level.level === 0 && index < 2}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Bientôt.</p>
        )}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/features/ai-journey/LevelSection.tsx
git commit -m "feat(ai-journey): add level section component"
```

---

## Task 8: AiJourneyTimeline component + barrel

**Files:**
- Create: `src/components/features/ai-journey/AiJourneyTimeline.tsx`
- Create: `src/components/features/ai-journey/index.ts`
- Modify: `src/components/features/index.ts`

- [ ] **Step 1: Write `AiJourneyTimeline.tsx`**

```tsx
'use client'

import { LevelSection } from './LevelSection'
import type { AiArticleMeta, AiJourneyLevel } from '@/content/meta'

interface AiJourneyTimelineProps {
  levels: AiJourneyLevel[]
  articles: AiArticleMeta[]
}

export function AiJourneyTimeline({ levels, articles }: AiJourneyTimelineProps) {
  return (
    <div className="space-y-12">
      {levels.map((level, index) => (
        <LevelSection
          key={level.level}
          level={level}
          articles={articles.filter((a) => a.level === level.level)}
          isLast={index === levels.length - 1}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Write `src/components/features/ai-journey/index.ts`**

```ts
export { AiJourneyTimeline } from './AiJourneyTimeline'
export { LevelSection } from './LevelSection'
export { AiArticleCard } from './AiArticleCard'
```

- [ ] **Step 3: Add export to `src/components/features/index.ts`**

Append:
```ts
export { AiJourneyTimeline, LevelSection, AiArticleCard } from './ai-journey'
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/features/ai-journey/ src/components/features/index.ts
git commit -m "feat(ai-journey): add timeline component + barrel"
```

---

## Task 9: Page route `/ai-journey`

**Files:**
- Create: `src/app/[locale]/ai-journey/page.tsx`

- [ ] **Step 1: Write page**

```tsx
import { getAllAiArticles } from '@/lib/mdx'
import { NavPanel, AiJourneyTimeline } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { ConcentricCircles } from '@/components/ui'
import { aiJourneyLevels } from '@/content/ai-journey-levels'
import { notFound } from 'next/navigation'
import type { Locale } from '@/content/meta'

const pageContent = {
  fr: {
    title: 'AI Journey',
    description:
      "Mon parcours d'apprentissage de l'IA, classé par niveau de profondeur. Du premier prompt aux agents custom.",
  },
  en: {
    title: 'AI Journey',
    description:
      'My AI learning journey, sorted by depth. From the first prompt to custom agents.',
  },
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

export default async function AiJourneyPage({ params }: PageProps) {
  const { locale } = await params

  if (locale !== 'fr' && locale !== 'en') {
    notFound()
  }

  const typedLocale = locale as Locale
  const articles = await getAllAiArticles(typedLocale)
  const levels = aiJourneyLevels[typedLocale]
  const content = pageContent[typedLocale]

  return (
    <>
      <ConcentricCircles position="top-right" className="fixed z-0" />
      <TriPanelLayout nav={<NavPanel />}>
        <div className="space-y-8 py-4">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
            <p className="text-muted-foreground max-w-2xl">{content.description}</p>
          </header>
          <AiJourneyTimeline levels={levels} articles={articles} />
        </div>
      </TriPanelLayout>
    </>
  )
}
```

- [ ] **Step 2: Run dev server + manual check**

Run: `pnpm dev` (or `npm run dev`)
Open: `http://localhost:3000/fr/ai-journey` and `http://localhost:3000/en/ai-journey`
Expected: page renders with 4 level sections, dotted timeline visible, mock cards in correct levels.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/ai-journey/
git commit -m "feat(ai-journey): add /ai-journey list page"
```

---

## Task 10: Wire nav + bento link

**Files:**
- Modify: `src/components/features/navigation/NavPanel.tsx`
- Modify: `src/components/features/hero/BentoGrid.tsx`

- [ ] **Step 1: Update NavPanel hrefs**

In `src/components/features/navigation/NavPanel.tsx`, change both occurrences of `href: '/side-projects'` to `href: '/ai-journey'` (lines 15 and 21).

- [ ] **Step 2: Update BentoGrid href**

In `src/components/features/hero/BentoGrid.tsx` line 96, change:
```tsx
href={`/${locale}/side-projects`}
```
To:
```tsx
href={`/${locale}/ai-journey`}
```

Also update comment at line 89 from `Side projects link` to `AI Journey link`.

- [ ] **Step 3: Manual verify**

Run dev server, navigate from home → click bento "Exploration IA" / "AI Journey" card → lands on `/ai-journey` page. Click sidebar "Exploration IA" / "AI Journey" → same page.

- [ ] **Step 4: Commit**

```bash
git add src/components/features/navigation/NavPanel.tsx src/components/features/hero/BentoGrid.tsx
git commit -m "feat(ai-journey): point nav and bento link to /ai-journey"
```

---

## Task 11: Remove old side-projects route + components

**Files:**
- Delete: `src/app/[locale]/side-projects/`
- Delete: `src/components/features/side-projects/`

- [ ] **Step 1: Confirm no remaining references**

Run: `grep -rn "side-projects\|SideProjectsPlaceholder\|side_projects" src/`
Expected: zero matches (after Task 10).

- [ ] **Step 2: Delete directories**

```bash
rm -rf src/app/[locale]/side-projects
rm -rf src/components/features/side-projects
```

- [ ] **Step 3: Remove dead barrel export**

In `src/components/features/index.ts`, delete the line:
```ts
export { SideProjectsPlaceholder } from './side-projects'
```

- [ ] **Step 4: Type-check + build**

Run: `npx tsc --noEmit && npx next build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(ai-journey): remove obsolete side-projects route + components"
```

---

## Self-review checklist (already applied)

- All 4 levels rendered (Task 8 maps `levels`).
- 4 mock articles minimum, distributed across levels (Tasks 4–5: 2× L0, 2× L1, 1× L2, 1× L3).
- Cards reuse same visual treatment as `ProjectCard` (border, glow, hover, parallax image, blur placeholder) — Task 6.
- Level type added to frontmatter and validated at load time (Tasks 1, 3).
- No `contextSection` field on `AiArticleMeta` (intentional, per spec).
- FR + EN parity (12 mock files, 2 level configs).
- Nav + bento updated to new route, old route removed (Tasks 10–11).
- All steps include exact code or exact commands. No placeholders.
