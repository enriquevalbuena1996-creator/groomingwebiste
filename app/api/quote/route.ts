import { randomUUID } from 'node:crypto'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { site } from '@/lib/site'

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

/** Quote display name for RFC 5322-style `From` (apostrophes/spaces inside the name must be quoted). */
function quoteDisplayName(name: string): string {
  const safe = name.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `"${safe}"`
}

/** Env value looks like plain `addr@verified.domain` — wrap with branded display name. */
function looksLikeBareEmail(s: string): boolean {
  const t = s.trim()
  return !/[<>]/.test(t) && /^[^\s@]+@[^\s@]+$/.test(t)
}

/** Address inside `Display <addr>` or bare `addr`; Resend cannot send FROM @gmail / @yahoo etc. (not verifiable domains). */
function extractMailbox(fromHeader: string): string | null {
  const m = fromHeader.match(/<([\s\S]*?)>/)
  if (m) {
    const inner = m[1].trim().replace(/^mailto:/i, '')
    if (looksLikeBareEmail(inner)) return inner.trim()
  }
  const t = fromHeader.trim().replace(/^mailto:/i, '')
  return looksLikeBareEmail(t) ? t : null
}

const NON_VERIFIABLE_FROM_DOMAINS = new Set(
  (
    [
      'gmail.com',
      'googlemail.com',
      'hotmail.com',
      'hotmail.es',
      'hotmail.fr',
      'hotmail.co.uk',
      'outlook.com',
      'live.com',
      'msn.com',
      'yahoo.com',
      'yahoo.es',
      'yahoo.co.uk',
      'ymail.com',
      'icloud.com',
      'me.com',
      'mac.com',
      'aol.com',
      'proton.me',
      'protonmail.com',
      'gmx.com',
      'mail.com',
    ] as const
  ).map((h) => h.toLowerCase()),
)

function mailboxUsesNonVerifiableDomain(mailbox: string): boolean {
  const at = mailbox.lastIndexOf('@')
  const domain = at === -1 ? '' : mailbox.slice(at + 1).toLowerCase().trim()
  return domain !== '' && NON_VERIFIABLE_FROM_DOMAINS.has(domain)
}

function onboardingFromResolved(): string {
  return `${quoteDisplayName(site.name)} <onboarding@resend.dev>`
}

function resendPublicError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const msg = (error as { message?: unknown }).message
    if (typeof msg === 'string') {
      const t = msg.trim()
      if (t.length > 0 && t.length <= 360) return t
    }
  }
  return 'Failed to send email. Check sender domain and Resend logs.'
}

/** Resend idempotency key: max 256 chars; reuse client `Idempotency-Key` for safe retries */
function quoteIdempotencyKey(request: Request): string {
  const header = request.headers.get('Idempotency-Key')?.trim()
  if (header) return header.slice(0, 256)
  return `quote-request/${randomUUID()}`.slice(0, 256)
}

/**
 * Prefer `RESEND_FROM_EMAIL`, or `FROM_EMAIL` (same value; some dashboards use the shorter name).
 * If unset, falls back to onboarding@resend.dev (test-only; verify a domain sender for production).
 */
function resolvedFromEmail(): string {
  const onboarding = onboardingFromResolved()
  const configured =
    process.env.RESEND_FROM_EMAIL?.trim() || process.env.FROM_EMAIL?.trim()

  if (!configured) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        'RESEND_FROM_EMAIL / FROM_EMAIL is unset — using onboarding@resend.dev. Add a verified sender in Resend + Vercel for reliable delivery.'
      )
    }
    return onboarding
  }

  let from: string =
    !configured.includes('<') && looksLikeBareEmail(configured)
      ? `${quoteDisplayName(site.name)} <${configured}>`
      : configured

  const mailbox = extractMailbox(from)
  if (mailbox && mailboxUsesNonVerifiableDomain(mailbox)) {
    console.warn(
      `FROM_EMAIL / RESEND_FROM_EMAIL uses "${mailbox}", a public inbox Resend cannot verify. Falling back to onboarding@resend.dev. Add DNS for your own domain in Resend and set FROM_EMAIL to e.g. noreply@yourdomain.com.`,
    )
    return onboarding
  }

  return from
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const from = resolvedFromEmail()
  const notifyTo =
    process.env.QUOTE_TO_EMAIL?.trim() ?? 'alfonsomobilegrooming@gmail.com'

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
  const idempotencyKey = quoteIdempotencyKey(request)

  const { data, error } = await resend.emails.send({
    from,
    to: [notifyTo],
    replyTo: d.email,
    subject: `Quote request — ${d.fullName} (${d.dogName})`,
    html,
    idempotencyKey,
    tags: [
      { name: 'kind', value: 'quote-request' },
      { name: 'environment', value: process.env.NODE_ENV === 'production' ? 'production' : 'development' },
    ],
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: resendPublicError(error) }, { status: 502 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}
