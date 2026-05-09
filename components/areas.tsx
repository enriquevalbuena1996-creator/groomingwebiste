import { MapPin } from 'lucide-react'

const areas = [
  'Sarasota',
  'Bradenton',
  'Venice',
  'Lakewood Ranch',
  'Osprey',
  'Nokomis',
  'Parrish',
]

export function Areas() {
  return (
    <section id="areas" className="border-t border-accent/25 bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8 sm:py-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Areas We Serve
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We proudly serve pet owners throughout the Sarasota-Manatee area. {"Don't"} see your location? Contact us to
              check availability!
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 rounded-full border-2 border-accent bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-[0_4px_18px_rgba(212,175,55,0.35)] ring-2 ring-accent/30 transition-transform hover:scale-[1.02] hover:brightness-105"
              >
                <MapPin className="size-5" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <div className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-xl border-2 border-accent/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-accent/20">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1bYsY3Y3Ip_LSbTed1hxpLPKJWUBsXBY&ehbc=2E312F&noprof=1"
              title="Map of service areas"
              width={640}
              height={480}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Travel fees may apply for locations outside our primary service area.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
