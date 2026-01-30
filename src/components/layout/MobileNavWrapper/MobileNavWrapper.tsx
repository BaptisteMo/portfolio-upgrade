'use client'

import { useState, type ReactNode } from 'react'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer'

interface MobileNavWrapperProps {
  nav: ReactNode
}

export function MobileNavWrapper({ nav }: MobileNavWrapperProps) {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <MobileHeader onMenuClick={() => setNavOpen(true)} />
      <MobileNavDrawer open={navOpen} onOpenChange={setNavOpen}>
        {nav}
      </MobileNavDrawer>
    </>
  )
}
