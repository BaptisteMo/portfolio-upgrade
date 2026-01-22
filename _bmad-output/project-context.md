---
project_name: 'portoflio-upgrade'
user_name: 'Baptiste'
date: '2026-01-21'
sections_completed: ['technology_stack', 'implementation_rules', 'anti_patterns', 'usage_guidelines']
source_document: 'architecture.md'
status: 'complete'
rule_count: 25
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | Latest (App Router) | Use `src/` directory |
| TypeScript | Strict mode | No `any` types |
| Tailwind CSS | v4 | CSS-first config |
| Shadcn/ui | Latest | Components in `components/ui/` |
| Framer Motion | Latest | For React transitions |
| GSAP | Latest | For scroll animations only |
| cmdk | Latest | Command palette |
| next-themes | Latest | Theme management |

## Critical Implementation Rules

### Import Rules

- **ALWAYS** use `@/` alias for imports
- **NEVER** use relative paths beyond one level (`../`)
- Example: `import { Button } from '@/components/ui/button'`

### Component Structure

- Custom components: `components/features/[name]/ComponentName.tsx` + `index.ts`
- Layout components: `components/layout/[name]/`
- Shared utilities: `components/shared/`
- Shadcn components: `components/ui/` (auto-generated, don't modify)

### Animation Rules

- **Framer Motion**: React component transitions, hover states, AnimatePresence
- **GSAP**: Scroll-triggered animations, timelines, ScrollTrigger
- **CRITICAL**: ALL GSAP animations MUST check `prefers-reduced-motion`:

```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

### Theme Rules

- Use `next-themes` for dark/light mode
- **NEVER** create custom theme state
- Dark mode is DEFAULT
- Toggle via Command Palette (`/dark` or `/light`)

### MDX Content Rules

- All MDX files MUST have typed frontmatter per `src/content/meta.ts`
- MDX files use kebab-case: `project-name.mdx`
- Content parsed via `lib/mdx.ts`

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ProjectCard.tsx` |
| Hooks | camelCase + use | `useReducedMotion.ts` |
| Utils | camelCase | `formatDate.ts` |
| MDX files | kebab-case | `projet-khora.mdx` |
| CSS vars | kebab-case | `--color-primary` |

### Performance Rules

- Target: Lighthouse > 90, FCP < 1.5s, TTI < 3s
- Use `next/image` for all images
- Use `loading.tsx` for Suspense boundaries
- Lazy load non-critical components

### Accessibility Rules

- WCAG AA compliance required
- All interactive elements must be keyboard navigable
- Respect `prefers-reduced-motion`
- Use semantic HTML

## Anti-Patterns to AVOID

| Anti-Pattern | Why |
|--------------|-----|
| ❌ Relative imports beyond `../` | Hard to maintain, complex refactoring |
| ❌ GSAP without reduced-motion check | Accessibility violation |
| ❌ Custom theme state | Duplicates next-themes |
| ❌ Untyped MDX frontmatter | Runtime errors, inconsistent data |
| ❌ Components outside folder structure | Inconsistent organization |
| ❌ Modifying `components/ui/` directly | Will be overwritten by shadcn |

## Quick Reference

**Init Project:**
```bash
npx create-next-app@latest portoflio-upgrade --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx shadcn@latest init
```

**Architecture Document:** `_bmad-output/planning-artifacts/architecture.md`

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Reference architecture.md for detailed structure

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review periodically for outdated rules

---

_Last Updated: 2026-01-21_

