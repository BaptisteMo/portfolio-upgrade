'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks'

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

// Letter animation with blur effect - slower timing
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

// Item variants for non-letter elements (tagline, CTAs)
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

// Reduced motion variants (AC: 5)
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
  className,
  variants,
}: {
  text: string
  className?: string
  variants: Variants
}) {
  return (
    <span className={className} aria-label={text}>
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

export function HeroLanding() {
  const reducedMotion = useReducedMotion()

  // Select variants based on user preference (AC: 5)
  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const letterVars = reducedMotion ? reducedMotionVariants : letterVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="min-h-screen flex items-center justify-center bg-background"
      aria-label="Introduction - Baptiste Morillon, Product Designer"
    >
      <div className="container max-w-7xl px-4 py-16 md:py-24">
        {/* Headline - Letter-by-letter cascade animation with blur */}
        <motion.h1
          variants={containerVars}
          className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground"
        >
          <AnimatedLetters text="Product Designer" variants={letterVars} />
        </motion.h1>

        {/* Tagline with keywords - appears after headline */}
        <motion.p
          variants={itemVars}
          className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground"
        >
          B2B SaaS • Design Systems • 6 ans d&apos;expérience
        </motion.p>

        {/* CTAs with staggered entrance */}
        <motion.div
          variants={itemVars}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg" className="min-h-[--touch-target] min-w-[--touch-target]">
            <Link href="#projects">Voir les projets</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[--touch-target] min-w-[--touch-target]">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
