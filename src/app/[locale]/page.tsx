'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashScreen } from '@/components/features/splash'
import { HeroLanding, NavPanel, Breadcrumbs } from '@/components/features'
import { TriPanelLayout } from '@/components/layout'
import { useReducedMotion, useBreadcrumbs } from '@/hooks'
import { useLanguage } from '@/contexts'

// Flow: Step 0 (splash 1) -> Step 1 (splash 2) -> Step 2 (dashboard)
type Step = 0 | 1 | 2

const splashContent = {
  fr: {
    step0: {
      headline: 'Créer des expériences qui comptent',
      buttonText: 'Entrer sur le site',
    },
    step1: {
      headline: 'Product Designer',
      subtitle: "B2B SaaS • Design Systems • 6 ans d'expérience",
      buttonText: 'Suivant',
    },
  },
  en: {
    step0: {
      headline: 'Creating experiences that matter',
      buttonText: 'Enter the site',
    },
    step1: {
      headline: 'Product Designer',
      subtitle: 'B2B SaaS • Design Systems • 6 years of experience',
      buttonText: 'Next',
    },
  },
}

export default function HomePage() {
  const [step, setStep] = useState<Step>(0)
  const [mounted, setMounted] = useState(false)
  const [splashSeen, setSplashSeen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  const content = splashContent[locale]

  useEffect(() => {
    // Check if splash was already seen this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash_seen')) {
      setStep(2)
      setSplashSeen(true)
    }
    setMounted(true)
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

  const dashboard = (
    <TriPanelLayout
      nav={<NavPanel />}
      
    >
      <HeroLanding />
    </TriPanelLayout>
  )

  // If splash already seen, render dashboard directly (PageTransition in TriPanelLayout handles animation)
  if (splashSeen) {
    return dashboard
  }

  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <SplashScreen
          key="splash-2"
          headline={content.step0.headline}
          buttonText={content.step0.buttonText}
          onComplete={handleNextStep}
        />
      )}

      {step === 1 && (
        <SplashScreen
          key="splash-1"
          headline={content.step1.headline}
          subtitle={content.step1.subtitle}
          buttonText={content.step1.buttonText}
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
          {dashboard}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
