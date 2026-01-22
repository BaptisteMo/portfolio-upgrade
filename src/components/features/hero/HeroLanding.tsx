'use client'

import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks'

// Animation variants for staggered entrance (AC: 1, 2)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom ease-out for premium feel
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

export function HeroLanding() {
  const reducedMotion = useReducedMotion()

  // Select variants based on user preference (AC: 5)
  const variants = reducedMotion ? reducedMotionVariants : containerVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={variants}
      className="min-h-screen flex items-center justify-center bg-background"
      aria-label="Introduction - Baptiste Morillon, Product Designer"
    >
      <div className="container max-w-7xl px-4 py-16 md:py-24">
        {/* Headline - Monumental typography with cascade animation (AC: 1, 3) */}
        <motion.h1
          variants={itemVars}
          className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground"
        >
          Product Designer
        </motion.h1>

        {/* Tagline with keywords - visible within 3s (AC: 3) */}
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
