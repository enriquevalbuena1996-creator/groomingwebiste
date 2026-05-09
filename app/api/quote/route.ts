import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  fullName: z.string().min(1).max(200),
  phone: z.string().min(1).max(50),
  email: z.string().email().max(320),
  address: z.string().min(1).max(500),
  dogName: z.string().min(1).max(120),
  dogBreed: z.string().min(1).max(120),
  dogSize: z.string().min(1).max(120),
  service: z.string().min(1).max(200),
  preferredDate: z.string().max(40).optional(),
  details: z.string().max(8000).optional(),
})

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const toEmail = process.env.QUOTE_TO_EMAIL ?? 'alfonsomobilegrooming@gmail.com'

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const d = parsed.data
  const preferred =
    typeof d.preferredDate === 'string' && d.preferredDate.trim() !== ''
      ? escapeHtml(d.preferredDate.trim())
      : '—'

  const detailsBlock =
    typeof d.details === 'string' && d.details.trim() !== ''
      ? escapeHtml(d.details.trim()).replace(/\r?\n/g, '<br>')
      : '—'

  const html = `
    <p><strong>New quote request</strong></p>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#e5e5e5;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(d.fullName)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(d.phone)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(d.email)}</td></tr>
      <tr><td><strong>Address / City</strong></td><td>${escapeHtml(d.address)}</td></tr>
      <tr><td><strong>Dog name</strong></td><td>${escapeHtml(d.dogName)}</td></tr>
      <tr><td><strong>Breed</strong></td><td>${escapeHtml(d.dogBreed)}</td></tr>
      <tr><td><strong>Size</strong></td><td>${escapeHtml(d.dogSize)}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(d.service)}</td></tr>
      <tr><td><strong>Preferred date</strong></td><td>${preferred}</td></tr>
      <tr><td><strong>Details</strong></td><td>${detailsBlock}</td></tr>
    </table>
  `

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: d.email,
    subject: `Quote request — ${d.fullName} (${d.dogName})`,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}
