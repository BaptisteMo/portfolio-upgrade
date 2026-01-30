import { cn } from '@/lib/utils'
import type { ProjectTag as ProjectTagType } from '@/content/meta'

const tagColors: Record<ProjectTagType, string> = {
  'B2B SaaS': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'Design System': 'bg-green-500/10 text-green-500 border-green-500/20',
  '0→1': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  CRM: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Mobile: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'Web App': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
}

interface ProjectTagProps {
  tag: ProjectTagType
}

export function ProjectTag({ tag }: ProjectTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        tagColors[tag]
      )}
    >
      {tag}
    </span>
  )
}
