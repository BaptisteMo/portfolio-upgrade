interface SkillsListProps {
  skills: string[]
}

export function SkillsList({ skills }: SkillsListProps) {
  if (!skills || skills.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
