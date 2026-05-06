'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, CheckCircle } from 'lucide-react'

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

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="quote" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle className="mb-4 size-16 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
              <p className="mt-2 text-muted-foreground">
                {"We've received your request and will contact you shortly."}
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="quote" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Request a Quote
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fill out the form below and {"we'll"} get back to you with a personalized quote.
          </p>
        </div>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>
              {"We'll"} contact you shortly after receiving your request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(941) 555-1234"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address / City *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, Sarasota"
                    required
                  />
                </div>
              </div>

              {/* Dog Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dogName">{"Dog's"} Name *</Label>
                  <Input
                    id="dogName"
                    name="dogName"
                    placeholder="Buddy"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dogBreed">Dog Breed *</Label>
                  <Input
                    id="dogBreed"
                    name="dogBreed"
                    placeholder="Golden Retriever"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dogSize">Dog Size *</Label>
                  <Select name="dogSize" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Grooming Service Needed *</Label>
                  <Select name="service" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                />
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

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
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
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
