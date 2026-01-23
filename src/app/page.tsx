'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashScreen } from '@/components/features/splash'
import { HeroLanding } from '@/components/features/hero'
import { useReducedMotion } from '@/hooks'

// Flow: Step 0 (splash 1) -> Step 1 (splash 2) -> Step 2 (dashboard)
type Step = 0 | 1 | 2

export default function HomePage() {
  const [step, setStep] = useState<Step>(0)
  const [mounted, setMounted] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
    // Check if splash was already seen this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_seen')) {
      setStep(2) // Skip to dashboard
    }
  }, [])

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1)
    } else if (step === 1) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('splash_seen', 'true')
      }
      setStep(2)
    }
  }

  // Avoid hydration mismatch - show nothing until mounted
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <SplashScreen
          key="splash-1"
          headline="Product Designer"
          subtitle="B2B SaaS • Design Systems • 6 ans d'expérience"
          buttonText="Suivant"
          onComplete={handleNextStep}
        />
      )}

      {step === 1 && (
        <SplashScreen
          key="splash-2"
          headline="Créer des expériences qui comptent"
          buttonText="Entrer sur le site"
          onComplete={handleNextStep}
        />
      )}

      {step === 2 && (
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
