import Image from 'next/image'
import { CheckCircle2, Truck } from 'lucide-react'

const benefits = [
  'Convenient at-home grooming',
  'Less stress and anxiety for pets',
  'One-on-one personalized attention',
  'No cages or long waiting times',
  'Professional equipment and premium products',
  'Clean and sanitized mobile salon',
  'Flexible scheduling',
]

const vanIncludes = [
  'Professional bathing station',
  'Grooming table & drying system',
  'Air conditioning & ventilation',
  'Sanitized grooming tools',
  'Fresh water & power supply',
  'Safe and comfortable grooming environment',
]

export function MobileService() {
  return (
    <section id="mobile-service" className="border-t border-accent/25 bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <Truck className="size-3.5" aria-hidden />
              Mobile Service
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              We Come to You
            </h2>
            <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">
              Mobile Grooming At Your Doorstep
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              At{' '}
              <span className="font-semibold text-foreground">AMG Mobile Grooming</span>, we bring the grooming salon directly
              to your home with our fully equipped mobile grooming van. No more stressful car rides, waiting rooms, or
              crowded salons — your pet receives one-on-one care right outside your house.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Our mobile grooming service is designed to provide convenience, comfort, and a stress-free experience for both
              pets and owners. The van is fully self-contained with water, power, professional grooming equipment, and premium
              products to ensure a safe and clean environment.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
            <div className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/van.png"
                  alt="AMG Mobile Grooming van with professional equipment and branding."
                  width={960}
                  height={720}
                  className="h-auto w-full object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>

            <div className="order-1 space-y-10 lg:order-2 lg:pt-2">
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Benefits of Our Mobile Grooming Service
                </h3>
                <ul className="mt-5 space-y-3 text-left text-muted-foreground">
                  {benefits.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                  Our Mobile Grooming Van Includes
                </h3>
                <ul className="mt-5 space-y-3 text-left text-muted-foreground">
                  {vanIncludes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-lg text-muted-foreground">
            We proudly serve Sarasota and surrounding areas with reliable, professional, and convenient mobile pet grooming
            services.
          </p>
        </div>
      </div>
    </section>
  )
}
