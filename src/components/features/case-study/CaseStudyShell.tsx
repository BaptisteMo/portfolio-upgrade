'use client'

import { useState, type ReactNode } from 'react'
import { useActiveSection } from '@/hooks'
import { TriPanelLayout } from '@/components/layout'
import { NavPanel } from '@/components/features/navigation'
import { ContextPanel } from '@/components/features/context-panel'
import { MobileFAB } from '@/components/features/mobile-fab'
import { MobileBottomSheet } from '@/components/features/mobile-bottom-sheet'
import type { ContextSection } from '@/content/meta'

interface CaseStudyShellProps {
  sectionAnchors: { label: string; id: string }[]
  sections: ContextSection[]
  children: ReactNode
}

export function CaseStudyShell({
  sectionAnchors,
  sections,
  children,
}: CaseStudyShellProps) {
  const sectionIds = sectionAnchors.map((a) => a.id)
  const activeSection = useActiveSection(sectionIds)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <>
      <TriPanelLayout
        nav={<NavPanel />}
        panel={
          <>
            <ContextPanel sections={sections} activeSection={activeSection ?? undefined} />
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {activeSection
                ? sectionAnchors.find((a) => a.id === activeSection)?.label
                : null}
            </div>
          </>
        }
      >
        {children}
      </TriPanelLayout>

      <MobileFAB isOpen={panelOpen} onToggle={() => setPanelOpen((prev) => !prev)} />
      <MobileBottomSheet open={panelOpen} onOpenChange={setPanelOpen}>
        <ContextPanel sections={sections} showAll />
      </MobileBottomSheet>
    </>
  )
}
