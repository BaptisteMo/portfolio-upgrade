import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroLanding() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-background"
      aria-label="Introduction - Baptiste Morillon, Product Designer"
    >
      <div className="container max-w-7xl px-4 py-16 md:py-24">
        {/* Headline - Monumental typography (UX spec: 96px, -0.03em, 1.25 line-height) */}
        <h1 className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-[--tracking-hero] leading-[--leading-title] text-foreground">
          Product Designer
        </h1>

        {/* Tagline with keywords */}
        <p className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground">
          B2B SaaS • Design Systems • 6 ans d&apos;expérience
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="min-h-[--touch-target] min-w-[--touch-target]">
            <Link href="#projects">Voir les projets</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[--touch-target] min-w-[--touch-target]">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
