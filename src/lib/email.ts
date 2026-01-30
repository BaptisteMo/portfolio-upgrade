import { Resend } from 'resend'
import type { ContactFormData } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email is always sent in French — Baptiste (sole recipient) is francophone.
export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const to = process.env.CONTACT_EMAIL_TO
    if (!to) {
      console.error('CONTACT_EMAIL_TO environment variable is not set')
      return { success: false, error: 'email-failed' }
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to,
      replyTo: data.email,
      subject: `[Portfolio] Nouveau message de ${data.name}`,
      text: `Nom: ${data.name}\nEmail: ${data.email}\nEntreprise: ${data.company || 'Non renseignée'}\n\nMessage:\n${data.message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'email-failed' }
    }

    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, error: 'email-failed' }
  }
}
