'use server'

import { headers } from 'next/headers'
import { getContactSchema, type ContactFormData } from '@/lib/validations/contact'
import { sendContactEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

interface SubmitResult {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: ContactFormData & { honeypot?: string }
): Promise<SubmitResult> {
  try {
    // Step 1: Honeypot check — silent accept if bot
    if (data.honeypot) {
      return { success: true }
    }

    // Step 2: Rate limiting
    const headersList = await headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      headersList.get('x-real-ip') ??
      'unknown'
    const rateLimitResult = rateLimit(ip)
    if (!rateLimitResult.success) {
      return { success: false, error: 'rate-limited' }
    }

    // Step 3: Server-side validation (defense in depth)
    const schema = getContactSchema('en')
    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      return { success: false, error: 'validation-failed' }
    }

    // Step 4: Send email
    return await sendContactEmail(parsed.data)
  } catch (err) {
    console.error('submitContactForm error:', err)
    return { success: false, error: 'unknown' }
  }
}
