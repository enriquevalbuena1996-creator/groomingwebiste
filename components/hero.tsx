import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, MessageSquare, MapPin, Mail } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Professional Mobile Dog Grooming at Your Doorstep
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
              We bring expert grooming services directly to your home. No more stressful car rides 
              or waiting in crowded salons. Your furry friend gets pampered in a calm, comfortable 
              environment they know and love.
            </p>

            {/* Contact Info */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <span>(941) 555-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>hello@pawsandshine.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span>Sarasota & Surrounding Areas</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="tel:+19415551234">
                  <Phone className="size-5" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <a href="#quote">
                  <MessageSquare className="size-5" />
                  Request a Quote
                </a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-dog.jpg"
                alt="Happy dog being groomed professionally"
                width={600}
                height={500}
                className="aspect-[4/3] object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 size-24 rounded-full bg-primary/10" />
            <div className="absolute -right-4 -top-4 size-16 rounded-full bg-accent/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
