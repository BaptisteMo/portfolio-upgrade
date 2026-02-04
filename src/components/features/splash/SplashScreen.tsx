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

// ============================================
// Background Circles Configuration
// ============================================
const CIRCLES = [
  { size: 1800, delay: 0 },
  { size: 1500, delay: 0.06 },
  { size: 1200, delay: 0.12 },
  { size: 900, delay: 0.18 },
  { size: 600, delay: 0.24 },
  { size: 300, delay: 0.30 },
]

const circleVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      type: 'spring',
      stiffness: 180,
      damping: 18,
      mass: 1,
    },
  }),
}

// ============================================
// Text Animation Configuration (Original)
// ============================================
const LETTER_STAGGER = 0.03

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.7 } },
}

const wordVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: LETTER_STAGGER,
    },
  }),
}

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
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Delayed variants for subtitle and button (cascade at end of text animation)
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 1.0,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 1.4,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

// ============================================
// Animated Words Component
// ============================================
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
                <motion.span
                  key={`${w}-${i}`}
                  variants={letterVariants}
                  className="inline-block"
                  aria-hidden="true"
                >
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

// ============================================
// Main Component
// ============================================
export function SplashScreen({ headline, subtitle, buttonText, onComplete }: SplashScreenProps) {
  const reducedMotion = useReducedMotion()

  const circleVars = reducedMotion ? reducedMotionVariants : circleVariants
  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const letterVars = reducedMotion ? reducedMotionVariants : letterVariants
  const subtitleVars = reducedMotion ? reducedMotionVariants : subtitleVariants
  const buttonVars = reducedMotion ? reducedMotionVariants : buttonVariants

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: reducedMotion ? 0 : -50,
        transition: { duration: reducedMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Background: Concentric circles with skeuomorphic depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {CIRCLES.map((circle, index) => (
          <motion.div
            key={index}
            custom={circle.delay}
            initial="hidden"
            animate="visible"
            variants={circleVars}
            className="absolute rounded-full bg-muted/20 shadow-[inset_0_2px_6px_rgba(255,255,255,0.08),inset_0_-2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:bg-muted/20 dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.03),inset_0_-2px_8px_rgba(0,0,0,0.2),0_4px_16px_rgba(0,0,0,0.15)]"
            style={{
              width: circle.size,
              height: circle.size,
            }}
          />
        ))}
      </div>

      {/* Foreground: Text content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVars}
        className="relative z-10 text-center px-4"
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

        {/* Tagline (optional) - appears near end of text animation */}
        {subtitle && (
          <motion.p
            variants={subtitleVars}
            className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button - appears slightly after subtitle */}
        <motion.div variants={buttonVars} className="mt-16">
          <Button
            variant="outline"
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
