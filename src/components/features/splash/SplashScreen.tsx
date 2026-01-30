'use client'

import React from 'react'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks'

interface SplashScreenProps {
  headline: string
  subtitle?: string
  buttonText: string
  onComplete: () => void
}

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }, // mots
}

const LETTER_STAGGER = 0.08

const wordVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      delayChildren: delay,          // <- décale le début de ce mot
      staggerChildren: LETTER_STAGGER,
    },
  }),
}
// Container for staggered children
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
}
;

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


function AnimatedWords({
  text,
  wordVariants,
  letterVariants,
}: {
  text: string
  wordVariants: Variants
  letterVariants: Variants
}) {
  const words = text.split(' ')
  let acc = 0
return (
  <span aria-label={text}>
    {words.map((word, w) => {
      const delay = acc
      acc += word.length * LETTER_STAGGER

      return (
        <React.Fragment key={w}>
          <motion.span
            custom={delay}
            variants={wordVariants}
            className="inline-block whitespace-nowrap"
          >
            {word.split('').map((char, i) => (
              <motion.span key={`${w}-${i}`} variants={letterVariants} className="inline-block" aria-hidden="true">
                {char}
              </motion.span>
            ))}
          </motion.span>

          {w < words.length - 1 && <span aria-hidden="true"> </span>}
        </React.Fragment>
      )
    })}
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
          variants={headlineVariants}
          className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground text-balance"
        >
          <AnimatedWords
            text={headline}
            wordVariants={wordVariants}
            letterVariants={letterVars}
          />
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
            variant='ghost'
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
