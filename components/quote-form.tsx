'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const dogSizes = ['Small (under 20 lbs)', 'Medium (20-50 lbs)', 'Large (50-80 lbs)', 'Extra Large (80+ lbs)']
const services = [
  'Full Grooming',
  'Bath & Brush',
  'Nail Trimming',
  'Ear Cleaning',
  'De-shedding Treatment',
  'Puppy Grooming',
  'Senior Dog Grooming',
  'Flea & Tick Bath',
]

/** Select nativo con el mismo aspecto que los inputs (los Radix Select fallaban al abrir por z-index/portal). */
const selectClassName = cn(
  'border-input dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none',
  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  '[&>option]:bg-popover [&>option]:text-popover-foreground',
)

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSendError(null)

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      fullName: String(fd.get('fullName') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      address: String(fd.get('address') ?? '').trim(),
      dogName: String(fd.get('dogName') ?? '').trim(),
      dogBreed: String(fd.get('dogBreed') ?? '').trim(),
      dogSize: String(fd.get('dogSize') ?? '').trim(),
      service: String(fd.get('service') ?? '').trim(),
      preferredDate: String(fd.get('preferredDate') ?? '').trim(),
      details: String(fd.get('details') ?? '').trim(),
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setSendError(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again or call us.')
        return
      }

      form.reset()
      setSubmitted(true)
    } catch {
      setSendError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="quote" className="surface-band-light border-t border-accent/25 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="section-gold-frame px-5 py-10 sm:px-8">
            <Card className="border-2 border-accent/50 bg-card shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="mb-4 size-16 text-accent" />
                <h3 className="font-heading text-2xl font-semibold text-foreground">Thank You!</h3>
                <p className="mt-2 text-muted-foreground">
                  {"We've received your request and will contact you shortly."}
                </p>
                <Button className="mt-6" variant="gold" onClick={() => setSubmitted(false)}>
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="surface-band-light border-t border-accent/25 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Treat Your Pet to Premium Grooming
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill out the form below and {"we'll"} get back to you with a personalized quote.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="font-heading text-center text-xl font-semibold text-foreground sm:text-left">
              Booking Information
            </h3>
            <p className="mt-1.5 text-center text-sm text-muted-foreground sm:text-left">
              {"We'll"} contact you shortly after receiving your request.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" name="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(941) 402-9395" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address / City *</Label>
                  <Input id="address" name="address" placeholder="123 Main St, Sarasota" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dogName">{"Dog's"} Name *</Label>
                  <Input id="dogName" name="dogName" placeholder="Buddy" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dogBreed">Dog Breed *</Label>
                  <Input id="dogBreed" name="dogBreed" placeholder="Golden Retriever" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dogSize">Dog Size *</Label>
                  <select id="dogSize" name="dogSize" required defaultValue="" className={selectClassName}>
                    <option value="" disabled>
                      Select size
                    </option>
                    {dogSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Grooming Service Needed *</Label>
                  <select id="service" name="service" required defaultValue="" className={selectClassName}>
                    <option value="" disabled>
                      Select service
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input id="preferredDate" name="preferredDate" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Additional Details / Special Instructions</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Any allergies, behavioral notes, or special requests..."
                  rows={4}
                />
              </div>

              {sendError ? (
                <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive" role="alert">
                  {sendError}
                </p>
              ) : null}

              <Button type="submit" size="lg" variant="gold" className="w-full" disabled={loading}>
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="size-5" />
                    Send Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
