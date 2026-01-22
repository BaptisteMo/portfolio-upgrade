import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroLanding() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-5xl px-4 py-16 md:py-24">
        {/* Headline - Monumental typography */}
        <h1 className="text-5xl md:text-7xl lg:text-[clamp(4.5rem,8vw,6rem)] font-bold tracking-tight leading-[1.1] text-foreground">
          Product Designer
        </h1>

        {/* Tagline with keywords */}
        <p className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground">
          B2B SaaS • Design Systems • 6 ans d&apos;expérience
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="min-h-[44px] min-w-[44px]">
            <Link href="#projects">Voir les projets</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[44px] min-w-[44px]">
            <Link href="/contact">Me contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
