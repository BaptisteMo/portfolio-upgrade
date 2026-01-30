import { type ReactNode } from 'react'
import { PageTransition } from '@/components/layout/PageTransition/PageTransition'
import { MobileNavWrapper } from '@/components/layout/MobileNavWrapper'

interface TriPanelLayoutProps {
  nav: ReactNode
  children: ReactNode
  panel?: ReactNode
}

export function TriPanelLayout({ nav, children, panel }: TriPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop tri-panel layout - max 1440px centered (AC5) */}
      <div className="hidden lg:block">
        {/* Outer container with max-width for ultra-wide screens */}
        <div className="relative flex flex-row">
          {/* Navigation - Fixed Left (AC2) */}
          <aside
            className="sticky left-0 top-0 h-screen w-[15%] min-w-47.5 border-r border-border bg-background z-10"
            role="navigation"
            aria-label="Navigation principale"
          >
            {nav}
          </aside>

          {/* Content - Scrollable Center (AC3) */}
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto min-h-screen overflow-y-auto px-12 focus:outline-none"
            role="main"
          >
            <div className="mx-auto">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>

          {/* Context Panel - Fixed Right (AC2) */}
          {panel && (
            <aside
              className="sticky right-0 top-0 h-screen w-[20%] min-w-62.5 border-l border-border bg-background z-10"
              role="complementary"
              aria-label="Panneau contextuel"
            >
              {panel}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile fallback - single column with nav drawer */}
      <div className="lg:hidden">
        <MobileNavWrapper nav={nav} />
        <main className="min-h-screen overflow-y-auto pt-14 scroll-mt-14" role="main">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </div>
  )
}
