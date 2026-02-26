'use client'

const skillStyles = [
  { size: 'text-base', weight: 'font-bold' },
  { size: 'text-sm', weight: 'font-semibold' },
  { size: 'text-xs', weight: 'font-medium' },
  { size: 'text-base', weight: 'font-semibold' },
  { size: 'text-xs', weight: 'font-bold' },
  { size: 'text-sm', weight: 'font-medium' },
  { size: 'text-base', weight: 'font-semibold' },
  { size: 'text-xs', weight: 'font-bold' },
  { size: 'text-sm', weight: 'font-medium' },
  { size: 'text-xs', weight: 'font-semibold' },
] as const

const skillColors = [
  'text-primary',
  'text-foreground',
  'text-accent',
  'text-muted-foreground',
  'text-foreground/80',
] as const

interface SkillCloudProps {
  skills: string[]
}

export function SkillCloud({ skills }: SkillCloudProps) {
  if (!skills || skills.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      {skills.map((skill, i) => {
        const style = skillStyles[i % skillStyles.length]
        const color = skillColors[i % skillColors.length]
        return (
          <span
            key={skill}
            className={`${style.size} ${style.weight} ${color} leading-tight`}
          >
            {skill}
          </span>
        )
      })}
    </div>
  )
}
