import { motion, type Variants } from 'framer-motion'
import type { ContextItem } from '@/content/meta'

interface ContextPanelItemProps {
  item: ContextItem
  variants: Variants
}

export function ContextPanelItem({ item, variants }: ContextPanelItemProps) {
  const type = item.type ?? 'text'

  if (type === 'metric') {
    return (
      <motion.div variants={variants} className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{item.value}</p>
        <p className="text-xs text-muted-foreground">{item.label}</p>
      </motion.div>
    )
  }

  if (type === 'quote') {
    return (
      <motion.div variants={variants} className="space-y-1">
        <p className="border-l-2 border-border pl-3 text-sm italic text-foreground">
          {item.value}
        </p>
        <p className="text-xs text-muted-foreground">— {item.label}</p>
      </motion.div>
    )
  }

  if (type === 'link') {
    const isValidUrl =
      item.value.startsWith('https://') || item.value.startsWith('http://')
    if (!isValidUrl) return null

    return (
      <motion.div variants={variants}>
        <a
          href={item.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground underline underline-offset-2 transition-colors hover:text-muted-foreground"
        >
          {item.label} ↗
        </a>
      </motion.div>
    )
  }

  if (type === 'list') {
    const listItems = item.value.split(',').map((s) => s.trim())
    return (
      <motion.div variants={variants} className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {item.label}
        </p>
        <ul className="space-y-1">
          {listItems.map((li) => (
            <li key={li} className="text-sm text-foreground">
              {li}
            </li>
          ))}
        </ul>
      </motion.div>
    )
  }

  // Default: text
  return (
    <motion.div variants={variants} className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {item.label}
      </p>
      <p className="text-sm text-foreground">{item.value}</p>
    </motion.div>
  )
}
