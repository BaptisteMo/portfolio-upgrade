import type { ExperienceItem } from '@/content/meta'

interface TimelineProps {
  items: ExperienceItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-187.5 mx-auto">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-10">
            {/* Dot */}
            <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />

            {/* Content */}
            <div className="text-sm text-muted-foreground">{item.year}</div>
            <div className="font-semibold text-foreground">{item.title}</div>
            <div className="text-muted-foreground">{item.company}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
