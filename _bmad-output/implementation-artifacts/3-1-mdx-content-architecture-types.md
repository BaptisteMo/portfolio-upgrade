# Story 3.1: MDX Content Architecture & Types

Status: done

## Story

**As a** developer,
**I want** a typed MDX content system with locale support,
**So that** content is structured, validated, and available in FR and EN.

## Acceptance Criteria

1. **AC1**: src/content/ has fr/ and en/ subdirectories
2. **AC2**: Each locale folder contains projects/ and about.mdx
3. **AC3**: src/content/meta.ts defines TypeScript interfaces for frontmatter (ProjectMeta, AboutMeta)
4. **AC4**: ProjectMeta includes: title, slug, description, tags[], status, timeline, metrics[], image
5. **AC5**: lib/mdx.ts provides getProjectBySlug(slug, locale) and getAllProjects(locale) functions
6. **AC6**: MDX parsing uses next-mdx-remote or similar library
7. **AC7**: Invalid frontmatter throws TypeScript errors at build time

## Tasks / Subtasks

- [x] **Task 1: Create Content Directory Structure** (AC: 1, 2)
  - [x] Create `src/content/fr/projects/` directory
  - [x] Create `src/content/en/projects/` directory
  - [x] Create placeholder `src/content/fr/about.mdx`
  - [x] Create placeholder `src/content/en/about.mdx`

- [x] **Task 2: Define TypeScript Interfaces for Frontmatter** (AC: 3, 4, 7)
  - [x] Create `src/content/meta.ts`
  - [x] Define `ProjectMeta` interface with all required fields
  - [x] Define `AboutMeta` interface for about page
  - [x] Define `Metric` interface for metrics[] array
  - [x] Define `Locale` type ('fr' | 'en')
  - [x] Export all types for use in lib/mdx.ts

- [x] **Task 3: Install MDX Dependencies** (AC: 6)
  - [x] Install `next-mdx-remote` package
  - [x] Install `gray-matter` for frontmatter parsing
  - [x] Verify packages in package.json

- [x] **Task 4: Create MDX Utility Functions** (AC: 5, 7)
  - [x] Create `src/lib/mdx.ts`
  - [x] Implement `getProjectBySlug(slug: string, locale: Locale)` function
  - [x] Implement `getAllProjects(locale: Locale)` function
  - [x] Implement `getAboutContent(locale: Locale)` function
  - [x] Add frontmatter validation with TypeScript
  - [x] Add proper error handling for missing files

- [x] **Task 5: Create Sample MDX Content** (AC: 1, 2, 4)
  - [x] Create `src/content/fr/projects/la-wooferie.mdx` with full frontmatter
  - [x] Create `src/content/fr/projects/khora.mdx` with full frontmatter
  - [x] Create `src/content/en/projects/la-wooferie.mdx` (translated)
  - [x] Create `src/content/en/projects/khora.mdx` (translated)
  - [x] Ensure frontmatter matches ProjectMeta interface exactly

- [x] **Task 6: Migrate Mock Data to MDX** (AC: 4, 5)
  - [x] Update `src/data/projects.ts` to use MDX utilities
  - [x] OR create adapter that reads from MDX instead of hardcoded data
  - [x] Verify ProjectGrid still works with new data source

- [x] **Task 7: Validate Build & Type Safety** (AC: 7)
  - [x] Run `npm run build` to verify no type errors
  - [x] Test with intentionally invalid frontmatter (should fail)
  - [x] Verify all locale content loads correctly

## Dev Notes

### Architecture Compliance

**Component Location:** `src/content/` and `src/lib/`

**Source: [architecture.md](_bmad-output/planning-artifacts/architecture.md)**

```
src/content/
├── fr/
│   ├── projects/
│   │   ├── la-wooferie.mdx
│   │   ├── khora.mdx
│   │   └── nexus-crm.mdx
│   └── about.mdx
├── en/
│   ├── projects/
│   │   ├── la-wooferie.mdx
│   │   ├── khora.mdx
│   │   └── nexus-crm.mdx
│   └── about.mdx
└── meta.ts

src/lib/
├── utils.ts          # cn() utility (existing)
├── fonts.ts          # Font configuration (existing)
├── mdx.ts            # MDX parsing utilities (new)
└── animations.ts     # Animation configs (future)
```

### Technical Requirements

**ProjectMeta Interface:**

```typescript
// src/content/meta.ts
export type Locale = 'fr' | 'en'

export type ProjectTag =
  | 'B2B SaaS'
  | 'Design System'
  | '0→1'
  | 'CRM'
  | 'Mobile'
  | 'Web App'

export type ProjectStatus = 'completed' | 'in-progress' | 'concept'

export interface Metric {
  label: string
  value: string
  description?: string
}

export interface ProjectMeta {
  title: string
  slug: string
  description: string
  tags: ProjectTag[]
  status: ProjectStatus
  timeline: string
  metrics: Metric[]
  image?: string
  client?: string
  role?: string
}

export interface AboutMeta {
  title: string
  subtitle: string
  bio: string
  availability: 'available' | 'in-talks' | 'unavailable'
  skills: string[]
  experience: {
    year: string
    title: string
    company: string
  }[]
}
```

**MDX Utilities Skeleton:**

```typescript
// src/lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Locale, ProjectMeta, AboutMeta } from '@/content/meta'

const contentDirectory = path.join(process.cwd(), 'src/content')

export async function getProjectBySlug(
  slug: string,
  locale: Locale
): Promise<{ meta: ProjectMeta; content: string }> {
  const filePath = path.join(contentDirectory, locale, 'projects', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: data as ProjectMeta,
    content,
  }
}

export async function getAllProjects(locale: Locale): Promise<ProjectMeta[]> {
  const projectsDir = path.join(contentDirectory, locale, 'projects')
  const filenames = fs.readdirSync(projectsDir)

  const projects = filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(projectsDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return data as ProjectMeta
    })

  return projects
}

export async function getAboutContent(
  locale: Locale
): Promise<{ meta: AboutMeta; content: string }> {
  const filePath = path.join(contentDirectory, locale, 'about.mdx')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: data as AboutMeta,
    content,
  }
}

export function getAllProjectSlugs(): string[] {
  const projectsDir = path.join(contentDirectory, 'fr', 'projects')
  const filenames = fs.readdirSync(projectsDir)

  return filenames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace('.mdx', ''))
}
```

**Sample MDX File:**

```mdx
---
title: "La Wooferie"
slug: "la-wooferie"
description: "Plateforme de réservation pour pension canine avec système de gestion intégré."
tags:
  - "B2B SaaS"
  - "0→1"
status: "completed"
timeline: "6 mois • 2024"
client: "La Wooferie"
role: "Lead Product Designer"
image: "/images/projects/la-wooferie.jpg"
metrics:
  - label: "Réservations"
    value: "+240%"
    description: "Augmentation des réservations en ligne"
  - label: "Temps de gestion"
    value: "-65%"
    description: "Réduction du temps administratif"
---

## Context

La Wooferie est une pension canine premium...

## Research

Nous avons conduit 12 interviews utilisateurs...

## Process

Le design a été itéré en 3 phases...

## Solution

L'application finale comprend...

## Results

Après 3 mois de déploiement...
```

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports
2. MDX files use kebab-case: `project-name.mdx`
3. All MDX files MUST have typed frontmatter per `src/content/meta.ts`
4. Content parsed via `lib/mdx.ts`
5. TypeScript strict mode - no `any` types

### Previous Story Intelligence (Story 2.4)

**From Story 2.4 (Project Cards):**
- Mock data in `src/data/projects.ts` uses Project interface
- ProjectTag type already defined
- This story should align types with existing mock data
- After this story, ProjectGrid can consume MDX data instead of mock

**Migration Strategy:**
1. Keep `src/data/projects.ts` as adapter initially
2. Update it to call `getAllProjects('fr')` from lib/mdx.ts
3. This ensures ProjectGrid works without changes
4. Full migration in Story 3.3 (Case Study Page Structure)

### UX Design Spec Context

**From UX Spec - Content Architecture:**
> Contenu séparé du code dans fichiers Markdown/MDX

**From UX Spec - i18n Support:**
> Français par défaut, Anglais optionnel, switch via toggle header

### Dependencies

- **Requires**: Epic 2 complete (uses ProjectGrid which will consume MDX data)
- **Blocked by**: None
- **Enables**: Story 3.2 (i18n routing), Story 3.3 (Case Study pages)

### References

- [Architecture](_bmad-output/planning-artifacts/architecture.md) - Content Architecture section
- [PRD](_bmad-output/planning-artifacts/prd.md) - FR-I18N-01 (Internationalisation FR/EN)
- [Epics](_bmad-output/planning-artifacts/epics.md) - Story 3.1 acceptance criteria
- [Project Context](_bmad-output/project-context.md) - MDX Content Rules

### Implementation Notes

**Package Installation:**
```bash
npm install next-mdx-remote gray-matter
```

**Type Safety Strategy:**
- Define strict interfaces in meta.ts
- Use `as ProjectMeta` with validation
- Build will fail if frontmatter doesn't match interface
- Consider using Zod for runtime validation (optional)

**Locale Default:**
- French ('fr') is the default locale
- English ('en') is secondary
- Both must have identical project slugs

**File Naming:**
- MDX files: kebab-case (e.g., `la-wooferie.mdx`)
- Match slug field in frontmatter exactly
- No locale prefix in filename (folder structure handles it)

**Testing Checklist:**
- [ ] Create content/fr/projects/ with at least 2 MDX files
- [ ] Create content/en/projects/ with matching files
- [ ] Create about.mdx in both locales
- [ ] Verify getAllProjects returns typed array
- [ ] Verify getProjectBySlug returns typed object
- [ ] Verify build passes with valid frontmatter
- [ ] Verify build fails with invalid frontmatter (type safety)

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/content/meta.ts` (created)
- `src/content/fr/projects/la-wooferie.mdx` (created)
- `src/content/fr/projects/khora.mdx` (created)
- `src/content/fr/projects/nexus-crm.mdx` (created)
- `src/content/fr/about.mdx` (created)
- `src/content/en/projects/la-wooferie.mdx` (created)
- `src/content/en/projects/khora.mdx` (created)
- `src/content/en/projects/nexus-crm.mdx` (created)
- `src/content/en/about.mdx` (created)
- `src/lib/mdx.ts` (created)
- `package.json` (updated - added dependencies)
