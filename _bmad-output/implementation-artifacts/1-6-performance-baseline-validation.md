# Story 1.6: Performance Baseline Validation

Status: ready-for-dev

## Story

**As a** developer,
**I want** the foundation to meet Core Web Vitals targets,
**So that** performance is established from the start.

## Acceptance Criteria

1. **AC1**: FCP (First Contentful Paint) is < 1.5s on Lighthouse audit
2. **AC2**: LCP (Largest Contentful Paint) is < 2.5s
3. **AC3**: CLS (Cumulative Layout Shift) is < 0.1
4. **AC4**: Lighthouse Performance score is > 90
5. **AC5**: Fonts are preloaded and don't cause FOUT (Flash of Unstyled Text)
6. **AC6**: First Load JS bundle is < 100kb (compressed)

## Tasks / Subtasks

- [ ] **Task 1: Run Initial Lighthouse Audit** (AC: 1, 2, 3, 4)
  - [ ] Build production: `npm run build`
  - [ ] Start production server: `npm run start`
  - [ ] Run Lighthouse in Chrome DevTools (Performance mode)
  - [ ] Document baseline scores

- [ ] **Task 2: Optimize Font Loading** (AC: 5)
  - [ ] Verify font preload links in layout
  - [ ] Use `font-display: swap` or `optional` appropriately
  - [ ] Test for FOUT in slow 3G simulation
  - [ ] Consider using `next/font` for automatic optimization

- [ ] **Task 3: Analyze Bundle Size** (AC: 6)
  - [ ] Run `npm run build` and check output
  - [ ] Verify First Load JS < 100kb
  - [ ] If over budget, identify heavy dependencies
  - [ ] Consider dynamic imports for non-critical code

- [ ] **Task 4: Fix Performance Issues** (AC: all)
  - [ ] Address any CLS issues (reserve space for dynamic content)
  - [ ] Optimize images if any (use next/image)
  - [ ] Remove unused dependencies
  - [ ] Ensure no render-blocking resources

- [ ] **Task 5: Final Validation** (AC: all)
  - [ ] Run Lighthouse audit again
  - [ ] Confirm all metrics meet targets
  - [ ] Document final scores in this story

## Dev Notes

### Performance Targets (from PRD)

| Metric | Target | Test Method |
|--------|--------|-------------|
| FCP | < 1.5s | Lighthouse |
| LCP | < 2.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| TTI | < 3s | Lighthouse |
| FID | < 100ms | Lighthouse |
| Performance Score | > 90 | Lighthouse |
| First Load JS | < 100kb | Next.js build output |

### Font Optimization

**Using next/font (Recommended):**
```tsx
// src/lib/fonts.ts
import { Fira_Code } from 'next/font/google'
import localFont from 'next/font/local'

export const satoshi = localFont({
  src: [
    { path: '../../public/fonts/satoshi/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../../public/fonts/satoshi/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})

export const jetbrainsMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Apply in Layout:**
```tsx
// src/app/layout.tsx
import { satoshi, fraunces, jetbrainsMono } from '@/lib/fonts'

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${satoshi.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      ...
    </html>
  )
}
```

### Bundle Analysis

**Check Build Output:**
```bash
npm run build

# Look for output like:
# Route (app)                              Size     First Load JS
# ┌ ○ /                                    5.2 kB         87.3 kB
# └ ○ /projects                            3.1 kB         85.2 kB
```

**If First Load JS > 100kb:**
1. Check for large dependencies (framer-motion is ~40kb)
2. Use dynamic imports: `const Component = dynamic(() => import('./Heavy'))`
3. Remove unused imports
4. Check for accidentally bundled dev dependencies

### CLS Prevention

**Common CLS Issues:**
1. Images without dimensions → Use `next/image` with width/height
2. Fonts causing text reflow → Use `font-display: swap` + fallback
3. Dynamic content above fold → Reserve space with min-height

**Fix Pattern:**
```tsx
// Bad - causes CLS
<img src="/hero.jpg" alt="Hero" />

// Good - no CLS
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### Lighthouse Audit Steps

1. Build production: `npm run build`
2. Start server: `npm run start`
3. Open Chrome DevTools → Lighthouse tab
4. Select: Performance, Accessibility, Best Practices, SEO
5. Choose: Mobile + Desktop
6. Run audit
7. Screenshot results

### Critical Rules (from project-context.md)

1. Performance is a FEATURE - not optional
2. Use `next/image` for ALL images
3. Use `next/font` for font optimization
4. Lazy load non-critical components
5. No render-blocking resources

### Expected Results Documentation

```markdown
## Epic 1 Performance Baseline

**Date:** [date]
**Environment:** Production build, localhost

### Desktop Results
- Performance: XX/100
- FCP: X.Xs
- LCP: X.Xs
- CLS: 0.0X
- TTI: X.Xs

### Mobile Results
- Performance: XX/100
- FCP: X.Xs
- LCP: X.Xs
- CLS: 0.0X
- TTI: X.Xs

### Bundle Size
- First Load JS: XXkb
```

### Dependencies

- **Requires**: Stories 1.1-1.5 complete (full Epic 1 foundation)
- **Blocked by**: All previous Epic 1 stories
- **Enables**: Epic 2 (with performance baseline established)

### References

- [PRD](../_bmad-output/planning-artifacts/prd.md) - FR-PERF-01, FR-PERF-02, NFR-PERF-01
- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - Performance requirements
- [Project Context](../_bmad-output/project-context.md) - Performance rules

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Performance Results

**Desktop Lighthouse:**
- Performance: _/100
- FCP: _s
- LCP: _s
- CLS: _
- TTI: _s

**Mobile Lighthouse:**
- Performance: _/100
- FCP: _s
- LCP: _s
- CLS: _
- TTI: _s

**Bundle Analysis:**
- First Load JS: _kb

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/lib/fonts.ts` (optimized if needed)
- `src/app/layout.tsx` (font optimization)
- Any files modified for performance fixes
