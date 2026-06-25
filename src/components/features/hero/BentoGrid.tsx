'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'
import { useLanguage } from '@/contexts'
import { HomeCard } from './HomeCard'

interface CardDef {
  key: string
  title: { fr: string; en: string }
  // Edit each card's blurb here, per language. Omit to hide the description.
  description?: { fr: string; en: string }
  href: string
  animation: string
}

// Routes wired to existing content. `#` = placeholder (no matching route yet).
const ROW_1: CardDef[] = [
  {
    key: 'projects-1',
    title: { fr: 'Mes projets', en: 'My projects' },
    href: '/projects',
    animation: 'projects',
  },
  {
    key: 'ai-1',
    title: { fr: 'Mes exploration IA', en: 'My AI explorations' },

    href: '/ai-journey',
    animation: 'ai-explorations',
  },
]
const ROW_2: CardDef[] = [
  {
    key: 'atlas',
    title: { fr: 'Atlas - Le cockpit financier & contractuel à +1 Md€/an', en: 'Atlas' },

    href: '/projects/atlas',
    animation: 'atlas',
  },
  {
    key: 'studio',
    title: { fr: 'Studio de design IA', en: 'AI Design Studio' },

    href: '#',
    animation: 'studio',
  },
  {
    key: 'ai-2',
    title: { fr: 'Me contacter', en: 'Contact me' },

    href: '/contact',
    animation: 'contact',
  },
]


export function BentoGrid() {
  const reducedMotion = useReducedMotion()
  const { locale } = useLanguage()

  const bio =
    locale === 'fr'
      ? "Product Designer depuis 6 ans, je travaille à l'intersection du design, du dev et de l'IA. Je conçois des produits B2B et des design systems pensés pour durer, et j'intègre l'IA directement dans ma façon de travailler : workflows d'agents, design systems pilotables, protos haute-fidélité livrés en quelques heures."
      : "Product Designer with 6 years of experience, working at the intersection of design, development and AI. I build B2B products and design systems made to last, and I weave AI directly into how I work: agent workflows, controllable design systems, high-fidelity prototypes shipped in a few hours."

  const href = (path: string) => (path === '#' ? '#' : `/${locale}${path}`)

  let i = 0
  const card = (c: CardDef) => (
    <HomeCard
      key={c.key}
      index={i++}
      href={href(c.href)}
      title={c.title[locale === 'fr' ? 'fr' : 'en']}
      description={c.description?.[locale === 'fr' ? 'fr' : 'en']}
      animation={c.animation}
    />
  )

  return (
    <div className="flex flex-col gap-6 pt-6 lg:min-h-screen lg:gap-8 lg:pt-10">
      {/* Header: name (left) + bio (right) */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 lg:pr-10">
        <h1 className="text-4xl font-bold leading-[1.04] tracking-tight text-foreground lg:whitespace-nowrap lg:text-6xl">
          Baptiste Morillon,
          <span className="name-sweep block w-fit cursor-default pb-[0.12em] -mb-[0.12em]">product designer</span>
        </h1>
        <p className="w-full max-w-162.5 text-base leading-relaxed text-foreground lg:text-xl">
          {bio}
        </p>
      </header>

      {/* Bento panel */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } },
        }}
        className="flex flex-col gap-3 rounded-2xl bg-muted p-3 lg:flex-1 lg:gap-4 lg:rounded-tl-[32px] lg:rounded-tr-none lg:rounded-bl-none lg:rounded-br-none lg:p-4 lg:pr-14"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:flex-1 lg:gap-4 lg:max-h-75">
          {ROW_1.map(card)}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:flex-1 lg:gap-4">
          {ROW_2.map(card)}
        </div>
      </motion.div>
    </div>
  )
}
