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
      {/* Mobile header - only visible below lg */}
      <div className="lg:hidden">
        <MobileNavWrapper nav={nav} />
      </div>

      <div className="relative lg:flex lg:flex-row">
        {/* Navigation - Fixed Left (desktop only) */}
        <aside
          className="hidden lg:block sticky left-0 top-0 h-screen w-[15%] min-w-47.5 shrink-0 border-r border-border bg-background z-10"
          role="navigation"
          aria-label="Navigation principale"
        >
          {nav}
        </aside>

        {/* Content - Single main rendered once */}
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-screen pt-14 scroll-mt-14 lg:pt-0 lg:scroll-mt-0 lg:min-w-0 lg:flex-1 px-4 lg:px-12 focus:outline-none"
          role="main"
        >
          <div className="mx-auto max-w-3xl lg:max-w-none py-8 lg:py-0">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>

        {/* Context Panel - Fixed Right (desktop only) */}
        {panel && (
          <aside
            className="hidden lg:block sticky right-0 top-0 h-screen w-[20%] min-w-62.5 shrink-0 border-l border-border bg-background z-10"
            role="complementary"
            aria-label="Panneau contextuel"
          >
            {panel}
          </aside>
        )}
      </div>
    </div>
  )
}
