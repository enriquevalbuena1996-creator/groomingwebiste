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
    <section id="areas" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Areas We Serve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We proudly serve pet owners throughout the Sarasota-Manatee area. 
            {"Don't"} see your location? Contact us to check availability!
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {areas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 rounded-full bg-card px-6 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <MapPin className="size-5 text-primary" />
              <span className="font-medium text-foreground">{area}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Travel fees may apply for locations outside our primary service area.
          </p>
        </div>
      </div>
    </section>
  )
}
