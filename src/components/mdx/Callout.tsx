import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  title?: string
  children: ReactNode
}

const variants = {
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  warning: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  tip: 'bg-green-500/10 border-green-500/20 text-green-400',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  return (
    <div className={cn('rounded-lg border p-4 my-6', variants[type])}>
      {title && <p className="font-semibold mb-2">{title}</p>}
      <div className="text-foreground/80">{children}</div>
    </div>
  )
}
