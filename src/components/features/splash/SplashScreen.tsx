'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks'

interface SplashScreenProps {
  onComplete: () => void
}

// Container for staggered children - same as HeroLanding
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

// Letter animation with blur effect - same as HeroLanding
const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Item variants for non-letter elements
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Reduced motion variants
const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

// Animated text component that splits into letters
function AnimatedLetters({
  text,
  variants,
}: {
  text: string
  variants: Variants
}) {
  return (
    <span aria-label={text}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()
  const hasTriggered = useRef(false)

  // Memoize handler to prevent multiple triggers
  const handleTrigger = useCallback(() => {
    if (hasTriggered.current) return
    hasTriggered.current = true
    onComplete()
  }, [onComplete])

  // Handle all triggers: click, scroll, keydown
  useEffect(() => {
    const handleClick = () => handleTrigger()
    const handleScroll = () => handleTrigger()
    const handleKeyDown = () => handleTrigger()

    window.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleTrigger])

  // Select variants based on user preference
  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const letterVars = reducedMotion ? reducedMotionVariants : letterVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: reducedMotion ? 0 : -50,
        transition: { duration: reducedMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVars}
        className="text-center px-4"
      >
        {/* Headline - Letter-by-letter cascade animation with blur */}
        <motion.h1
          variants={containerVars}
          className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground"
        >
          <AnimatedLetters text="Product Designer" variants={letterVars} />
        </motion.h1>

        {/* Tagline with keywords */}
        <motion.p
          variants={itemVars}
          className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground"
        >
          B2B SaaS • Design Systems • 6 ans d&apos;expérience
        </motion.p>

        {/* Visual indicator - animated arrow */}
        <motion.div
          variants={itemVars}
          className="mt-16"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="mx-auto h-8 w-8 text-muted-foreground" />
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2 block">
            Cliquez pour entrer
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
