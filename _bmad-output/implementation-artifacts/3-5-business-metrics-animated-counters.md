# Story 3.5: Business Metrics & Animated Counters

Status: done

## Story

**As a** visitor (Thomas),
**I want** to see business impact metrics with animated numbers,
**So that** I can quickly assess the project's value.

## Acceptance Criteria

1. **AC1**: StatCard components display metrics (e.g., "-35% temps", "+240% adoption")
2. **AC2**: Numbers animate from 0 to final value (count-up effect)
3. **AC3**: Animation triggers on intersection (when visible in viewport)
4. **AC4**: Animation duration is ~1s with ease-out
5. **AC5**: If reduced motion is preferred, numbers display instantly
6. **AC6**: Metrics data comes from MDX frontmatter metrics[] array

## Tasks / Subtasks

- [x] **Task 1: Create StatCard Component** (AC: 1, 6)
  - [x] Create `src/components/features/case-study/StatCard.tsx`
  - [x] Define `StatCardProps` with Metric type
  - [x] Layout: large value, label, optional description
  - [x] Style with design tokens

- [x] **Task 2: Implement useCountUp Hook** (AC: 2, 4)
  - [x] Create `src/hooks/useCountUp.ts`
  - [x] Parse value string (handle +, -, %, numbers)
  - [x] Animate from 0 to target value
  - [x] Use Framer Motion's `useSpring` or `animate`
  - [x] Duration ~1s with easeOut

- [x] **Task 3: Implement Intersection Observer** (AC: 3)
  - [x] Use Framer Motion's `useInView` hook
  - [x] Trigger animation only when card enters viewport
  - [x] Set threshold to 0.5 (50% visible)
  - [x] Animation should only play once

- [x] **Task 4: Add Reduced Motion Support** (AC: 5)
  - [x] Use existing `useReducedMotion` hook
  - [x] When reduced motion: skip animation, show final value
  - [x] Ensure no flicker or layout shift

- [x] **Task 5: Create MetricsGrid Component** (AC: 1, 6)
  - [x] Create `src/components/features/case-study/MetricsGrid.tsx`
  - [x] Accept `metrics: Metric[]` prop
  - [x] Responsive grid: 2 cols desktop, 1 col mobile
  - [x] Map metrics to StatCard components

- [x] **Task 6: Integrate with Case Study Page** (AC: all)
  - [x] Import MetricsGrid in case study page
  - [x] Pass `project.metrics` from frontmatter
  - [x] Position in Results section

- [x] **Task 7: Update Exports** (AC: all)
  - [x] Export StatCard, MetricsGrid from case-study/
  - [x] Export useCountUp from hooks/

## Dev Notes

### Architecture Compliance

**Component Location:** `src/components/features/case-study/`

```
src/components/features/case-study/
├── CaseStudyHeader.tsx    # Story 3.4
├── StatCard.tsx           # This story
├── MetricsGrid.tsx        # This story
└── index.ts

src/hooks/
├── useCountUp.ts          # This story
├── useReducedMotion.ts    # Existing
└── index.ts
```

### Technical Requirements

**Metric Interface (from meta.ts):**

```typescript
interface Metric {
  label: string      // "Temps de gestion"
  value: string      // "-65%" or "+240"
  description?: string
}
```

**useCountUp Hook:**

```tsx
// src/hooks/useCountUp.ts
'use client'

import { useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseCountUpOptions {
  duration?: number
  delay?: number
}

export function useCountUp(
  endValue: number,
  isInView: boolean,
  options: UseCountUpOptions = {}
) {
  const { duration = 1, delay = 0 } = options
  const reducedMotion = useReducedMotion()

  const motionValue = useMotionValue(reducedMotion ? endValue : 0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView && !reducedMotion) {
      const controls = motionValue.set(0)
      const timeout = setTimeout(() => {
        motionValue.set(endValue)
      }, delay * 1000)

      return () => clearTimeout(timeout)
    } else if (reducedMotion) {
      motionValue.set(endValue)
    }
  }, [isInView, endValue, reducedMotion, delay, motionValue])

  return rounded
}
```

**StatCard Component:**

```tsx
// src/components/features/case-study/StatCard.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '@/hooks'
import type { Metric } from '@/content/meta'

interface StatCardProps {
  metric: Metric
}

function parseValue(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([+-]?)(\d+)(.*)$/)
  if (!match) return { number: 0, prefix: '', suffix: value }

  return {
    prefix: match[1] || '',
    number: parseInt(match[2], 10),
    suffix: match[3] || '',
  }
}

export function StatCard({ metric }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const { prefix, number, suffix } = parseValue(metric.value)
  const animatedNumber = useCountUp(number, isInView)

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border border-border bg-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl font-bold text-foreground">
        {prefix}
        <motion.span>{animatedNumber}</motion.span>
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-foreground">
        {metric.label}
      </div>
      {metric.description && (
        <div className="mt-1 text-sm text-muted-foreground">
          {metric.description}
        </div>
      )}
    </motion.div>
  )
}
```

**MetricsGrid Component:**

```tsx
// src/components/features/case-study/MetricsGrid.tsx
import { StatCard } from './StatCard'
import type { Metric } from '@/content/meta'

interface MetricsGridProps {
  metrics: Metric[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-8">
      {metrics.map((metric, index) => (
        <StatCard key={index} metric={metric} />
      ))}
    </div>
  )
}
```

### Animation Specs

| Property | Value |
|----------|-------|
| Duration | 1s |
| Easing | ease-out |
| Trigger | 50% in viewport |
| Play count | Once |

### Dependencies

- **Requires**: Story 3.3 (Case Study Page), Framer Motion (installed)
- **Uses**: useReducedMotion hook (existing)

## Dev Agent Record

### Agent Model Used

_To be filled by Dev Agent_

### Completion Notes List

_To be filled during implementation_

### File List

_Files created/modified:_
- `src/components/features/case-study/StatCard.tsx`
- `src/components/features/case-study/MetricsGrid.tsx`
- `src/components/features/case-study/index.ts` (updated)
- `src/hooks/useCountUp.ts`
- `src/hooks/index.ts` (updated)
