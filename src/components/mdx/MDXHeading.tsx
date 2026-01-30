'use client'

import { ScrollReveal } from '@/components/ui'
import type { ReactNode } from 'react'

interface MDXHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 2 | 3
  children?: ReactNode
}

export function MDXHeading({ level, children, ...props }: MDXHeadingProps) {
  const id = children
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (level === 2) {
    return (
      <ScrollReveal>
        <h2
          id={id}
          className="text-2xl font-bold text-foreground mt-12 mb-4 scroll-mt-20"
          {...props}
        >
          {children}
        </h2>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal>
      <h3
        className="text-xl font-semibold text-foreground mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    </ScrollReveal>
  )
}
