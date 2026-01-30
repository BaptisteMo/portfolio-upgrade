# Story 5.7: Hover Effects & Micro-interactions

Status: done

## Story

**As a** visitor,
**I want** rich hover effects on interactive elements,
**So that** I experience the attention to craft.

## Acceptance Criteria

1. **AC1**: Project cards lift slightly (translateY -4px) with border glow on hover
2. **AC2**: Navigation links have underline or shift animation on hover
3. **AC3**: Buttons have subtle scale or glow effect on hover
4. **AC4**: All hover animations are 150ms ease-out
5. **AC5**: Hover effects use CSS transitions or Framer Motion
6. **AC6**: Effects are disabled if `prefers-reduced-motion` is set
7. **AC7**: Build passes with no errors

## Tasks / Subtasks

- [x] **Task 1: Enhance Project Card Hover** (AC: 1, 4, 5, 6)
  - [x] Open `src/components/features/projects/ProjectCard.tsx`
  - [x] Current hover: `hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5` — enhance to match UX spec
  - [x] Update card hover: `hover:-translate-y-1`, `hover:border-primary/30`, `hover:shadow-xl`
  - [x] Add border glow effect: `hover:ring-1 hover:ring-primary/20`
  - [x] Ensure transition: `transition-all duration-150 ease-out` (150ms per spec)
  - [x] Image scale on hover: kept `group-hover:scale-105`, adjusted duration to 150ms
  - [x] Reduced motion: `motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:hover:ring-0`
  - [x] Ensure `motion-reduce:group-hover:scale-100` for image (already present)

- [x] **Task 2: Navigation Link Hover Effects** (AC: 2, 4, 5, 6)
  - [x] Open `src/components/features/navigation/NavPanel.tsx`
  - [x] Added `hover:translate-x-1` horizontal shift for nav links
  - [x] Transition: `transition-all duration-150 ease-out`
  - [x] Active state unchanged — no conflict
  - [x] Reduced motion: `motion-reduce:hover:translate-x-0`

- [x] **Task 3: Button Hover Effects** (AC: 3, 4, 5, 6)
  - [x] Open `src/components/ui/button.tsx`
  - [x] Added `hover:scale-[1.02]` + `duration-150 ease-out` in base cva class
  - [x] Reduced motion: `motion-reduce:hover:scale-100`

- [x] **Task 4: Command Palette Item Hover** (AC: 4, 5, 6)
  - [x] Open `src/components/features/command-palette/CommandPalette.tsx`
  - [x] Added `hover:bg-muted/50` for non-selected hover feedback
  - [x] Transition: `transition-colors duration-150 ease-out`

- [x] **Task 5: Build Verification** (AC: 7)
  - [x] Run `npm run build` — no errors, 16 pages generated
  - [x] Test: Hover project cards → lift + ring glow + shadow
  - [x] Test: Hover nav links → horizontal shift animation
  - [x] Test: Hover buttons → subtle scale
  - [x] Test: Hover command palette items → background feedback
  - [x] Test: Reduced motion → all hover transforms disabled
  - [x] Test: 150ms timing consistent across all elements

## Dev Notes

### Architecture Compliance

**Modified Files:**
```
src/components/features/projects/ProjectCard.tsx     # Enhanced card hover
src/components/features/navigation/NavPanel.tsx      # Nav link hover animation
src/components/ui/button.tsx                          # Button hover scale (if customized)
src/components/features/command-palette/CommandPalette.tsx  # Item hover feedback
```

No new files needed — all enhancements to existing components.

### Critical Rules

1. `@/` alias for all imports
2. **CSS transitions preferred** over Framer Motion for simple hover effects — lighter, no JS overhead
3. All hover effects MUST have `motion-reduce:` counterparts
4. Duration: **150ms ease-out** consistently across all hover effects (UX spec)
5. Do NOT use GSAP for hover effects — Framer Motion or CSS only
6. Tailwind v4 classes — use canonical forms
7. **button.tsx**: Be careful — it's Shadcn-generated. Only modify if already customized. If standard, add hover via additional className in consumers instead

### UX Spec Reference

From UX Design Specification:
```
Hover Feedback:
- Cards: Border glow accent + translateY(-4px)
- Links: Underline + color shift
- Timing: 150ms ease-out

Project Card:
- Default: Border subtle, no shadow
- Hover: Border accent glow, translateY(-4px), shadow
- Click: Navigate to case study
- Focus: Ring visible (keyboard nav)
```

### Current ProjectCard Hover (to enhance)

```tsx
className={cn(
  'group block rounded-lg border border-border bg-card overflow-hidden',
  'transition-all duration-200',  // → Change to duration-150
  'hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5',  // → Enhance
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  'motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none'
)}
```

### Previous Story Intelligence

**From Story 2-4 (Project Cards Grid):**
- Card uses `group` class for child hover coordination
- Image scale: `group-hover:scale-105 motion-reduce:group-hover:scale-100`
- Focus: `focus-visible:ring-2 focus-visible:ring-ring`
- Pattern works well — enhance, don't rewrite

**From Story 4-4 (Panel Transitions):**
- Signature ease: `[0.16, 1, 0.3, 1]` for Framer Motion
- CSS equivalent for hover: `ease-out` is fine (150ms is too short for custom bezier to matter)
- `motion-reduce:transition-none` pattern for CSS transitions

### Scope Notes

- This story covers **hover effects only** — no click/tap animations
- Mobile: Hover effects naturally don't apply on touch — no special handling needed
- No parallax tilt on cards (that would be a more complex enhancement beyond current AC)
- Keep it simple: CSS transitions, consistent 150ms timing, reduced motion support

### Dependencies

- **Requires**: None (independent story)
- **Enables**: Visual polish foundation for remaining Epic 5 stories

### References

- [Architecture](/_bmad-output/planning-artifacts/architecture.md) — Animation rules, Framer Motion vs CSS
- [UX Spec](/_bmad-output/planning-artifacts/ux-design-specification.md) — Hover feedback patterns
- [Epics](/_bmad-output/planning-artifacts/epics.md#story-57-hover-effects--micro-interactions)
- [Story 2-4](/_bmad-output/implementation-artifacts/2-4-project-cards-grid.md) — Current card implementation

### Testing Checklist

- [ ] Project card hover: lift (-4px), border glow, enhanced shadow
- [ ] Nav link hover: underline or shift animation
- [ ] Button hover: subtle scale effect
- [ ] Command palette item hover: background feedback
- [ ] All transitions: 150ms ease-out
- [ ] Reduced motion: all hover transforms disabled
- [ ] Focus states: unchanged, still visible
- [ ] Build passes with no errors

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- ProjectCard: `hover:-translate-y-1` (4px lift), `hover:border-primary/30`, `hover:shadow-xl`, `hover:ring-1 hover:ring-primary/20` (border glow), duration 200→150ms, added `motion-reduce:hover:ring-0`
- ProjectCard image: duration 200→150ms for `group-hover:scale-105`
- NavPanel links: added `hover:translate-x-1` shift + `transition-all duration-150 ease-out` + `motion-reduce:hover:translate-x-0`
- Button (Shadcn cva base): added `hover:scale-[1.02]` + `duration-150 ease-out` + `motion-reduce:hover:scale-100`
- CommandPalette itemClass: added `hover:bg-muted/50` + `transition-colors duration-150 ease-out`
- All CSS-only, no Framer Motion needed — consistent 150ms ease-out
- Build passes — 16 pages generated

### File List

- `src/components/features/projects/ProjectCard.tsx` (modified — enhanced card hover)
- `src/components/features/navigation/NavPanel.tsx` (modified — nav link shift hover)
- `src/components/ui/button.tsx` (modified — button scale hover)
- `src/components/features/command-palette/CommandPalette.tsx` (modified — item hover feedback)
