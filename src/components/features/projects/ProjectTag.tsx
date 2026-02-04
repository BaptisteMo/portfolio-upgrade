'use client'

import { cn } from '@/lib/utils'
import {
  Building2,
  Layers,
  Rocket,
  Users,
  Smartphone,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import type { ProjectTag as ProjectTagType } from '@/content/meta'

interface TagConfig {
  icon: LucideIcon
  // bg color, text color, top inset shadow (lighter), bottom inset shadow (darker)
  classes: string
}

const tagConfig: Record<ProjectTagType, TagConfig> = {
  'B2B SaaS': {
    icon: Building2,
    classes:
      'bg-violet-200 text-violet-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(139,92,246,0.3)] dark:bg-violet-400/30 dark:text-violet-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(139,92,246,0.4)]',
  },
  'Design System': {
    icon: Layers,
    classes:
      'bg-emerald-200 text-emerald-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(16,185,129,0.3)] dark:bg-emerald-400/30 dark:text-emerald-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(16,185,129,0.4)]',
  },
  '0→1': {
    icon: Rocket,
    classes:
      'bg-orange-200 text-orange-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(249,115,22,0.3)] dark:bg-orange-400/30 dark:text-orange-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(249,115,22,0.4)]',
  },
  CRM: {
    icon: Users,
    classes:
      'bg-blue-200 text-blue-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(59,130,246,0.3)] dark:bg-blue-400/30 dark:text-blue-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(59,130,246,0.4)]',
  },
  Mobile: {
    icon: Smartphone,
    classes:
      'bg-pink-200 text-pink-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(236,72,153,0.3)] dark:bg-pink-400/30 dark:text-pink-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(236,72,153,0.4)]',
  },
  'Web App': {
    icon: Globe,
    classes:
      'bg-lime-200 text-lime-600 shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(132,204,22,0.3)] dark:bg-lime-400/30 dark:text-lime-300 dark:shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-2px_2px_rgba(132,204,22,0.4)]',
  },
}

interface ProjectTagProps {
  tag: ProjectTagType
}

export function ProjectTag({ tag }: ProjectTagProps) {
  const config = tagConfig[tag]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium',
        config.classes
      )}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
      {tag}
    </span>
  )
}
