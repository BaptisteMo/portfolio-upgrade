'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts'
import { getContactSchema, type ContactFormData } from '@/lib/validations/contact'
import { submitContactForm } from '@/app/[locale]/contact/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export function ContactForm() {
  const { locale } = useLanguage()
  const [honeypot, setHoneypot] = useState('')

  const form = useForm<ContactFormData>({
    resolver: zodResolver(getContactSchema(locale)),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  })

  const t = locale === 'fr'
    ? {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'votre@email.com',
        company: 'Entreprise',
        companyPlaceholder: 'Optionnel',
        message: 'Message',
        messagePlaceholder: 'Décrivez votre projet ou votre besoin...',
        submit: 'Envoyer',
        sending: 'Envoi...',
        successTitle: 'Message envoyé !',
        successDesc: 'Je vous répondrai dans les plus brefs délais.',
        errorTitle: 'Erreur',
        errorDesc: 'Une erreur est survenue. Réessayez dans quelques instants.',
        rateLimitTitle: 'Trop de tentatives',
        rateLimitDesc: 'Veuillez réessayer dans une minute.',
      }
    : {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        company: 'Company',
        companyPlaceholder: 'Optional',
        message: 'Message',
        messagePlaceholder: 'Describe your project or need...',
        submit: 'Send',
        sending: 'Sending...',
        successTitle: 'Message sent!',
        successDesc: "I'll get back to you as soon as possible.",
        errorTitle: 'Error',
        errorDesc: 'Something went wrong. Please try again.',
        rateLimitTitle: 'Too many attempts',
        rateLimitDesc: 'Please try again in a minute.',
      }

  async function onSubmit(data: ContactFormData) {
    const result = await submitContactForm({ ...data, honeypot })

    if (result.success) {
      toast.success(t.successTitle, { description: t.successDesc })
      form.reset()
      setHoneypot('')
    } else if (result.error === 'rate-limited') {
      toast.error(t.rateLimitTitle, { description: t.rateLimitDesc })
    } else {
      toast.error(t.errorTitle, { description: t.errorDesc })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.name}</FormLabel>
              <FormControl>
                <Input placeholder={t.namePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t.emailPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.company}{' '}
                <span className="text-muted-foreground font-normal">
                  ({locale === 'fr' ? 'optionnel' : 'optional'})
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder={t.companyPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.message}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.messagePlaceholder}
                  className="min-h-[120px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full sm:w-auto min-h-[--touch-target] min-w-[--touch-target]"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.sending}
            </>
          ) : (
            t.submit
          )}
        </Button>
      </form>
    </Form>
  )
}
