import { MDXRemote } from 'next-mdx-remote/rsc'
import { ScrollReveal } from '@/components/ui'
import { Callout } from './Callout'
import { ImageFull } from './ImageFull'
import { MDXHeading } from './MDXHeading'

const components = {
  Callout: (props: React.ComponentProps<typeof Callout>) => (
    <ScrollReveal>
      <Callout {...props} />
    </ScrollReveal>
  ),
  ImageFull: (props: React.ComponentProps<typeof ImageFull>) => (
    <ScrollReveal>
      <ImageFull {...props} />
    </ScrollReveal>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <MDXHeading level={2} {...props}>{children}</MDXHeading>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <ScrollReveal>
      <h3
        className="text-xl font-semibold text-foreground mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    </ScrollReveal>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <ScrollReveal>
      <p className="text-muted-foreground leading-relaxed mb-4" {...props}>
        {children}
      </p>
    </ScrollReveal>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ScrollReveal>
      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2" {...props}>
        {children}
      </ul>
    </ScrollReveal>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ScrollReveal>
      <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2" {...props}>
        {children}
      </ol>
    </ScrollReveal>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <ScrollReveal>
      <blockquote
        className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6"
        {...props}
      >
        {children}
      </blockquote>
    </ScrollReveal>
  ),
}

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <article className="prose-custom max-w-187.5 mx-auto">
      <MDXRemote source={content} components={components} />
    </article>
  )
}
