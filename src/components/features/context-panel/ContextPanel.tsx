'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { ContextPanelItem } from './ContextPanelItem'
import type { ContextSection } from '@/content/meta'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
}

interface ContextPanelProps {
  sections: ContextSection[]
  activeSection?: string
  showAll?: boolean
}

export function ContextPanel({ sections, activeSection, showAll }: ContextPanelProps) {
  const reducedMotion = useReducedMotion()

  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  if (showAll) {
    return (
      <div className="flex h-full flex-col overflow-y-auto p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVars}
          className="space-y-8"
        >
          {sections.map((section) => (
            <motion.div key={section.sectionId} variants={itemVars} className="space-y-4">
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.label}
              </h2>
              {section.items.map((item, index) => (
                <ContextPanelItem
                  key={`${item.label}-${index}`}
                  item={item}
                  variants={itemVars}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  const currentSection =
    sections.find((s) => s.sectionId === activeSection) ?? sections[0]

  if (!currentSection) {
    return null
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.sectionId}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVars}
          className="space-y-6"
        >
          {/* Section Header */}
          <motion.h2
            variants={itemVars}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            {currentSection.label}
          </motion.h2>

          {/* Section Items */}
          {currentSection.items.map((item, index) => (
            <ContextPanelItem
              key={`${item.label}-${index}`}
              item={item}
              variants={itemVars}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
