'use client'

import { animate, motion, useMotionValue, useTransform, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AvailabilityStatusCTA } from './AvailabilityStatusCTA'
import { useEffect } from "react"
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

// --- CountUp réutilisable (motion/react) ---
function CountUp({
  to,
  duration = 1.6,
  delay = 0,
  className,
  reducedMotion = false,
}: {
  to: number
  duration?: number
  delay?: number
  className?: string
  reducedMotion?: boolean
}) {
  const mv = useMotionValue(reducedMotion ? to : 0)
  const rounded = useTransform(() => Math.round(mv.get()))

  useEffect(() => {
    if (reducedMotion) {
      mv.set(to)
      return
    }
    const controls = animate(mv, to, {
      duration,
      delay,
      ease: "easeOut",
    })
    return () => controls.stop()
  }, [mv, to, duration, delay, reducedMotion])

  return (
    <motion.span className={className} aria-label={`${to}`}>
      {rounded}
    </motion.span>
  )
}

function StatCard({
  value,
  suffix,
  title,
  description,
  delay = 0,
  reducedMotion = false,
  variants,
}: {
  value: number
  suffix?: string
  title: string
  description: string
  delay?: number
  reducedMotion?: boolean
  variants: Variants
}) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border bg-background/60 backdrop-blur-sm p-5 shadow-sm"
    >
      <div className="flex items-end gap-2">
        <CountUp
          to={value}
          delay={delay}
          duration={1.7}
          reducedMotion={reducedMotion}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
        />
        {suffix ? (
          <span className="text-lg md:text-xl font-medium text-muted-foreground pb-0.5">
            {suffix}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

export function HeroLanding() {
  const reducedMotion = useReducedMotion()
  const stats = [
    {
      value: 6,
      suffix: "+",
      title: "Années d’expérience",
      description: "Produit, design systems, discovery & delivery.",
    },
    {
      value: 12,
      suffix: "+",
      title: "Produits & modules livrés",
      description: "Web apps internes, B2B, mobile, multi-pays.",
    },
    {
      value: 40,
      suffix: "+",
      title: "Interviews utilisateurs",
      description: "Personas, parcours, tests, insights actionnables.",
    },
    {
      value: 3,
      suffix: "",
      title: "Stacks explorées",
      description: "React / Next.js, design tokens, prototyping avancé.",
    },
  ] as const

  // Select variants based on user preference (AC: 5)
  const containerVars = reducedMotion ? reducedMotionVariants : containerVariants
  const letterVars = reducedMotion ? reducedMotionVariants : letterVariants
  const itemVars = reducedMotion ? reducedMotionVariants : itemVariants

return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className=" flex items-center justify-center bg-background"
      aria-label="Introduction - Baptiste Morillon, Product Designer"
    >
      <div className="container max-w-7xl px-4 py-16 md:py-24">
        <motion.h1
          variants={containerVars}
          className="text-5xl md:text-6xl font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground"
        >
          <AnimatedLetters text="Bienvenue" variants={letterVars} />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVars}
          className="mt-4 max-w-2xl text-lg md:text-xl font-medium text-muted-foreground"
        >
          Je conçois des produits clairs, utiles et scalables — du discovery à la
          livraison, avec une obsession : <span className="text-foreground">la simplicité</span>.
        </motion.p>

        {/* Availability Status */}
        <AvailabilityStatusCTA />

        {/* CTAs */}
        <motion.div variants={itemVars} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="min-h-[--touch-target] min-w-[--touch-target]">
            <Link href="#projects">Voir les projets</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-h-[--touch-target] min-w-[--touch-target]"
          >
            <Link href="/contact">Me contacter</Link>
          </Button>
        </motion.div>

        {/* Dashboard stats */}
        <motion.div
          variants={itemVars}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, idx) => (
            <StatCard
              key={s.title}
              value={s.value}
              suffix={s.suffix}
              title={s.title}
              description={s.description}
              delay={0.15 + idx * 0.08}
              reducedMotion={reducedMotion}
              variants={itemVars}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
