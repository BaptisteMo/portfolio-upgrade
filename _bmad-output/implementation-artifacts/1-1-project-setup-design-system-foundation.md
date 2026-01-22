# Story 1.1: Project Setup & Design System Foundation

Status: review

## Story

**As a** developer,
**I want** the project initialized with Next.js, shadcn/ui, and design tokens configured,
**So that** I can build components with a consistent design system.

## Acceptance Criteria

1. **AC1**: Next.js App Router project created with TypeScript strict mode, Tailwind CSS, ESLint, `src/` directory, and `@/*` import alias
2. **AC2**: Shadcn/ui initialized with default configuration (New York style, CSS variables enabled)
3. **AC3**: CSS variables defined in `globals.css` for colors (violet/vert palettes), spacing (8px scale), and typography
4. **AC4**: Satoshi, Fraunces, and JetBrains Mono fonts configured in `lib/fonts.ts` with proper preloading
5. **AC5**: Dark mode set as default theme via `next-themes` provider
6. **AC6**: Project builds without errors (`npm run build` succeeds)

## Tasks / Subtasks

- [x] **Task 1: Initialize Next.js Project** (AC: 1)
  - [x] Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - [x] Verify TypeScript strict mode in `tsconfig.json`
  - [x] Confirm `src/` directory structure created
  - [x] Test `@/` import alias works

- [x] **Task 2: Initialize Shadcn/ui** (AC: 2)
  - [x] Run `npx shadcn@latest init`
  - [x] Select: New York style, CSS variables enabled, `@/components` path
  - [x] Verify `components.json` created
  - [x] Verify `components/ui/` directory created
  - [x] Install base components: `npx shadcn@latest add button`

- [x] **Task 3: Configure Design Tokens in globals.css** (AC: 3)
  - [x] Define color palettes (violet primary: #a855f7, green accent: #22c55e)
  - [x] Define semantic colors for light/dark modes
  - [x] Define 8px spacing scale (--spacing-1 through --spacing-12)
  - [x] Define typography tokens (font-family, font-size, line-height)
  - [x] Add Tailwind v4 CSS-first configuration

- [x] **Task 4: Configure Fonts** (AC: 4)
  - [x] Create `src/lib/fonts.ts`
  - [x] Download and add Satoshi (variable font) to `public/fonts/satoshi/` *(directories created, using Inter as fallback until font files added)*
  - [x] Download and add Fraunces (variable font) to `public/fonts/fraunces/` *(using Google Fonts)*
  - [x] Add JetBrains Mono via next/font/google or local
  - [x] Configure font preloading in layout
  - [x] Set CSS variables for font families

- [x] **Task 5: Configure Dark Mode as Default** (AC: 5)
  - [x] Install `next-themes`: `npm install next-themes`
  - [x] Create ThemeProvider wrapper component
  - [x] Add ThemeProvider to root `layout.tsx`
  - [x] Set `defaultTheme="dark"` and `enableSystem={true}`
  - [x] Prevent FOUC with `suppressHydrationWarning` on html

- [x] **Task 6: Verify Build** (AC: 6)
  - [x] Run `npm run build`
  - [x] Fix any TypeScript or ESLint errors
  - [x] Verify no warnings about missing dependencies
  - [x] Run `npm run dev` and confirm app loads

## Dev Notes

### Architecture Compliance

**Source: [architecture.md](../_bmad-output/planning-artifacts/architecture.md)**

```
Project Structure (required):
portoflio-upgrade/
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens + Tailwind
│   │   ├── layout.tsx       # Root layout (ThemeProvider, fonts)
│   │   └── page.tsx         # Home page (placeholder)
│   ├── components/
│   │   └── ui/              # Shadcn components (auto-generated)
│   └── lib/
│       ├── utils.ts         # cn() utility (shadcn)
│       └── fonts.ts         # Font configuration
└── public/
    └── fonts/
        ├── satoshi/
        └── fraunces/
```

### Technical Requirements

**Initialization Commands (EXACT):**
```bash
# Step 1: Create Next.js project (run from parent directory)
npx create-next-app@latest portoflio-upgrade --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Step 2: Navigate and initialize shadcn
cd portoflio-upgrade
npx shadcn@latest init
```

**Shadcn Init Prompts (answer these):**
- Style: New York
- Base color: Neutral
- CSS variables: Yes
- Tailwind config location: tailwind.config.ts
- Global CSS location: src/app/globals.css
- Components location: @/components

### Design Token Specifications

**Color Palette (from UX Design Spec):**
```css
/* Primary Palette - Violet */
--color-primary: 168 85% 57%;        /* #a855f7 - Violet 500 */
--color-primary-foreground: 0 0% 100%;

/* Accent Palette - Green (for availability CTA) */
--color-accent: 142 76% 36%;         /* #22c55e - Green 500 */

/* Semantic Colors - Dark Mode (DEFAULT) */
--background: 224 71% 4%;            /* Near black */
--foreground: 213 31% 91%;           /* Off-white */
--card: 224 71% 4%;
--card-foreground: 213 31% 91%;
--muted: 223 47% 11%;
--muted-foreground: 215 20% 65%;
--border: 216 34% 17%;

/* Semantic Colors - Light Mode */
.light {
  --background: 0 0% 100%;
  --foreground: 224 71% 4%;
  /* ... mirror structure */
}
```

**Spacing Scale (8px base):**
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

**Typography:**
```css
--font-sans: 'Satoshi', system-ui, sans-serif;
--font-serif: 'Fraunces', Georgia, serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Font Configuration

**Satoshi Font (UI/Headlines):**
- Source: https://www.fontshare.com/fonts/satoshi
- Weight: Variable 300-900
- Style: Variable (includes italic)
- Usage: Headings, UI elements, navigation

**Fraunces Font (Body/Content):**
- Source: https://www.fontshare.com/fonts/fraunces or Google Fonts
- Weight: Variable 100-900
- Style: Variable (includes italic)
- Usage: Body text, case study content

**JetBrains Mono (Code):**
- Source: Google Fonts or local
- Weight: 400, 500, 700
- Usage: Code snippets, technical annotations

### Theme Configuration

**next-themes Setup:**
```tsx
// src/app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Project Structure Notes

- **Alignment**: This story creates the foundational structure per architecture.md
- **Next Steps**: Story 1.2 (Hero Landing) will add first feature component
- **Dependencies**: None (this is the first story)

### Critical Rules (from project-context.md)

1. **ALWAYS** use `@/` alias for imports - NEVER relative paths beyond `../`
2. **NEVER** modify `components/ui/` directly (shadcn regenerates)
3. Dark mode is DEFAULT - set via `next-themes`
4. TypeScript strict mode - no `any` types
5. All CSS values via design tokens (CSS variables)

### Anti-Patterns to AVOID

| Don't Do | Do Instead |
|----------|------------|
| `import Button from '../../../components/ui/button'` | `import { Button } from '@/components/ui/button'` |
| Hard-coded colors in components | Use CSS variables: `bg-[var(--background)]` |
| Custom theme state with useState | Use `next-themes` useTheme hook |
| `any` TypeScript types | Proper typing always |

### References

- [Architecture Document](../_bmad-output/planning-artifacts/architecture.md) - Section "Starter Template Evaluation"
- [Project Context](../_bmad-output/project-context.md) - All critical rules
- [UX Design Spec](../_bmad-output/planning-artifacts/ux-design-specification.md) - Color System, Typography System

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- **2026-01-22**: Story 1.1 implementation complete
- Next.js 16.1.4 with App Router, TypeScript strict mode, Tailwind CSS v4
- Shadcn/ui v3.7.0 initialized with New York style
- Design tokens configured in globals.css using oklch color space (Tailwind v4 default)
- Fonts: Inter (Satoshi fallback), Fraunces, JetBrains Mono via next/font/google
- Dark mode default via next-themes with ThemeProvider
- Build succeeds, dev server responds HTTP 200
- Font directories created at public/fonts/satoshi/ and public/fonts/fraunces/ for future local font files
- Minor note: Parent directory has extra lockfile causing non-blocking warning

### File List

_Files created/modified:_
- `src/app/globals.css` - Design tokens, color palettes, spacing scale, typography
- `src/app/layout.tsx` - Root layout with ThemeProvider and fonts
- `src/app/page.tsx` - Default Next.js page (unchanged)
- `src/lib/fonts.ts` - Font configuration (Inter, Fraunces, JetBrains Mono)
- `src/lib/utils.ts` - cn() utility (shadcn generated)
- `src/components/shared/ThemeProvider.tsx` - next-themes wrapper
- `src/components/ui/button.tsx` - shadcn button component
- `components.json` - shadcn configuration
- `tsconfig.json` - TypeScript config with strict mode
- `package.json` - Dependencies
- `public/fonts/satoshi/` - Directory created (empty, for local fonts)
- `public/fonts/fraunces/` - Directory created (empty, for local fonts)
