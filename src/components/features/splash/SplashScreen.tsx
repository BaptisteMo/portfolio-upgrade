'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks'

interface SplashScreenProps {
  headline: string
  subtitle?: string
  buttonText: string
  onComplete: () => void
}

// Container for staggered children
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

// Letter animation with blur effect
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

export function SplashScreen({ headline, subtitle, buttonText, onComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()

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
          <AnimatedLetters text={headline} variants={letterVars} />
        </motion.h1>

        {/* Tagline with keywords (optional) */}
        {subtitle && (
          <motion.p
            variants={itemVars}
            className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVars} className="mt-16">
          <Button
            size="lg"
            onClick={onComplete}
            className="min-h-[--touch-target] px-8"
          >
            {buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
