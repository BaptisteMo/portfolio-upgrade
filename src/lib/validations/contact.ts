import { z } from 'zod'
import type { Locale } from '@/content/meta'

export function getContactSchema(locale: Locale) {
  const t =
    locale === 'fr'
      ? {
          nameRequired: 'Le nom est requis',
          nameMin: 'Le nom doit contenir au moins 2 caractères',
          emailRequired: "L'email est requis",
          emailInvalid: "Format d'email invalide",
          messageRequired: 'Le message est requis',
          messageMin: 'Le message doit contenir au moins 10 caractères',
        }
      : {
          nameRequired: 'Name is required',
          nameMin: 'Name must be at least 2 characters',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email format',
          messageRequired: 'Message is required',
          messageMin: 'Message must be at least 10 characters',
        }

  return z.object({
    name: z.string().min(1, t.nameRequired).min(2, t.nameMin),
    email: z.string().min(1, t.emailRequired).email(t.emailInvalid),
    company: z.string().optional(),
    message: z.string().min(1, t.messageRequired).min(10, t.messageMin),
  })
}

export type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>
