'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm, type ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts'
import { useReducedMotion } from '@/hooks'
import { getContactSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContactForm } from '@/app/[locale]/contact/actions'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { cn } from '@/lib/utils'

const phrases = {
  fr: {
    greeting: 'Bonjour Baptiste,',
    intro: 'je suis',
    company: 'et je travaille chez',
    dot: '.',
    message: "J'aimerais discuter de",
    email: 'Tu peux me joindre à',
    namePlaceholder: 'votre nom',
    companyPlaceholder: 'optionnel',
    messagePlaceholder: 'décrivez votre projet ou besoin...',
    emailPlaceholder: 'votre@email.com',
    submit: 'Envoyer',
    sending: 'Envoi...',
    successTitle: 'Message envoyé !',
    successDesc: 'Je vous répondrai dans les plus brefs délais.',
    errorTitle: 'Erreur',
    errorDesc: 'Une erreur est survenue. Réessayez dans quelques instants.',
    rateLimitTitle: 'Trop de tentatives',
    rateLimitDesc: 'Veuillez réessayer dans une minute.',
    nameLabel: 'Votre nom',
    companyLabel: 'Votre entreprise',
    messageLabel: 'Votre message',
    emailLabel: 'Votre email',
  },
  en: {
    greeting: 'Hi Baptiste,',
    intro: "I'm",
    company: 'and I work at',
    dot: '.',
    message: "I'd like to discuss",
    email: 'You can reach me at',
    namePlaceholder: 'your name',
    companyPlaceholder: 'optional',
    messagePlaceholder: 'describe your project or need...',
    emailPlaceholder: 'your@email.com',
    submit: 'Send',
    sending: 'Sending...',
    successTitle: 'Message sent!',
    successDesc: "I'll get back to you as soon as possible.",
    errorTitle: 'Error',
    errorDesc: 'Something went wrong. Please try again.',
    rateLimitTitle: 'Too many attempts',
    rateLimitDesc: 'Please try again in a minute.',
    nameLabel: 'Your name',
    companyLabel: 'Your company',
    messageLabel: 'Your message',
    emailLabel: 'Your email',
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

// --- Inline Input ---

interface InlineInputProps {
  field: ControllerRenderProps<ContactFormData, keyof ContactFormData>
  placeholder: string
  error?: string
  type?: 'text' | 'email'
  ariaLabel: string
}

function InlineInput({ field, placeholder, error, type = 'text', ariaLabel }: InlineInputProps) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth)
    }
  }, [field.value, placeholder])

  const errorId = error ? `${field.name}-error` : undefined

  return (
    <span className="relative inline-block align-baseline">
      <span
        ref={measureRef}
        className="invisible absolute left-0 top-0 whitespace-pre text-inherit"
        aria-hidden="true"
      >
        {field.value || placeholder}
      </span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        aria-describedby={errorId}
        style={{ width: Math.max(width + 12, 60) }}
        className={cn(
          'inline-block border-0 border-b-2 border-border bg-transparent',
          'text-inherit outline-none',
          'placeholder:text-muted-foreground placeholder:italic',
          'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200',
          error && 'border-destructive',
        )}
      />
      {error && (
        <motion.span
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full mt-1 text-xs text-destructive"
        >
          {error}
        </motion.span>
      )}
    </span>
  )
}

// --- Inline Textarea ---

interface InlineTextareaProps {
  field: ControllerRenderProps<ContactFormData, keyof ContactFormData>
  placeholder: string
  error?: string
  ariaLabel: string
}

function InlineTextarea({ field, placeholder, error, ariaLabel }: InlineTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }, [field.value])

  const errorId = error ? `${field.name}-error` : undefined

  return (
    <span className="relative inline-block w-full align-baseline">
      <textarea
        {...field}
        ref={(el) => {
          textareaRef.current = el
          if (typeof field.ref === 'function') field.ref(el)
        }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        aria-describedby={errorId}
        rows={1}
        className={cn(
          'w-full border-0 border-b-2 border-border bg-transparent',
          'text-inherit outline-none resize-none',
          'placeholder:text-muted-foreground placeholder:italic',
          'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring transition-colors duration-200',
          error && 'border-destructive',
        )}
      />
      {error && (
        <motion.span
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full mt-1 text-xs text-destructive"
        >
          {error}
        </motion.span>
      )}
    </span>
  )
}

// --- Phrase Line Wrapper ---

function PhraseLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={lineVariants} className="mb-6">
      {children}
    </motion.p>
  )
}

// --- Main Component ---

export function MadLibsContactForm() {
  const { locale } = useLanguage()
  const reducedMotion = useReducedMotion()
  const [honeypot, setHoneypot] = useState('')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(getContactSchema(locale)),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', company: '', message: '' },
  })

  const p = phrases[locale]

  async function onSubmit(data: ContactFormData) {
    const result = await submitContactForm({ ...data, honeypot })

    if (result.success) {
      toast.success(p.successTitle, { description: p.successDesc })
      form.reset()
      setHoneypot('')
    } else if (result.error === 'rate-limited') {
      toast.error(p.rateLimitTitle, { description: p.rateLimitDesc })
    } else {
      toast.error(p.errorTitle, { description: p.errorDesc })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          className="text-2xl leading-relaxed text-foreground md:text-3xl md:leading-relaxed lg:text-4xl lg:leading-relaxed"
        >
          <PhraseLine>
            {p.greeting}
          </PhraseLine>

          <PhraseLine>
            {p.intro}{' '}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <InlineInput
                  field={field}
                  placeholder={p.namePlaceholder}
                  error={fieldState.error?.message}
                  ariaLabel={p.nameLabel}
                />
              )}
            />{' '}
            {p.company}{' '}
            <FormField
              control={form.control}
              name="company"
              render={({ field, fieldState }) => (
                <InlineInput
                  field={field}
                  placeholder={p.companyPlaceholder}
                  error={fieldState.error?.message}
                  ariaLabel={p.companyLabel}
                />
              )}
            />
            {p.dot}
          </PhraseLine>

          <PhraseLine>
            {p.message}{' '}
            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <InlineTextarea
                  field={field}
                  placeholder={p.messagePlaceholder}
                  error={fieldState.error?.message}
                  ariaLabel={p.messageLabel}
                />
              )}
            />
          </PhraseLine>

          <PhraseLine>
            {p.email}{' '}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <InlineInput
                  field={field}
                  placeholder={p.emailPlaceholder}
                  error={fieldState.error?.message}
                  type="email"
                  ariaLabel={p.emailLabel}
                />
              )}
            />
            {p.dot}
          </PhraseLine>

          <motion.div variants={lineVariants} className="mt-8">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="min-h-[--touch-target] min-w-[--touch-target]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {p.sending}
                </>
              ) : (
                p.submit
              )}
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </Form>
  )
}
