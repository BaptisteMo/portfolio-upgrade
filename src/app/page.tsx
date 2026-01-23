'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashScreen } from '@/components/features/splash'
import { HeroLanding } from '@/components/features/hero'
import { useReducedMotion } from '@/hooks'

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    // Check if splash was already seen this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_seen')) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splash_seen', 'true')
    }
    setShowSplash(false)
  }

  // Avoid hydration mismatch - show nothing until mounted
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={handleSplashComplete} />
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.1 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Dashboard Placeholder - Tri-panel layout (Epic 2) */}
          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[250px_1fr_350px]">
            {/* Nav Panel - Placeholder */}
            <nav className="hidden lg:block bg-muted/20 border-r border-border p-6">
              <div className="text-sm text-muted-foreground">
                Navigation (Epic 2)
              </div>
            </nav>

            {/* Main Content */}
            <main>
              <HeroLanding />
            </main>

            {/* Context Panel - Placeholder */}
            <aside className="hidden lg:block bg-muted/20 border-l border-border p-6">
              <div className="text-sm text-muted-foreground">
                Panel contextuel (Epic 4)
              </div>
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
