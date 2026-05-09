import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bath, Bug, Dog, Ear, HandMetal, Heart, Scissors, Wind, type LucideIcon } from 'lucide-react'

/** Filenames must match files in `public/` exactly (URLs encode spaces). */
function publicAssetUrl(filename: string): string {
  const segments = filename.replace(/^\/+/, '').split('/')
  return `/${segments.map(encodeURIComponent).join('/')}`
}

function serviceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}

type ServiceItem = {
  icon: LucideIcon
  title: string
  description: string
  imageFilename?: string
}

const services: ServiceItem[] = [
  {
    icon: Scissors,
    title: 'Full Grooming',
    description:
      'Complete grooming: bath, haircut, nails, ears, and breed-specific styling—all in one visit.',
    imageFilename: 'full grooming.jpg',
  },
  {
    icon: Bath,
    title: 'Bath & Brush',
    description:
      'Premium shampoo and conditioner, brush-out and blow-dry for a soft, shiny, fresh-smelling coat.',
    imageFilename: 'bath y brush.jpg',
  },
  {
    icon: HandMetal,
    title: 'Nail Trimming',
    description: 'Gentle, precise nail care to keep pups comfortable and your floors scratch-free.',
    imageFilename: 'nail trim.jpg',
  },
  {
    icon: Ear,
    title: 'Ear Cleaning',
    description: 'Careful cleaning to lift debris and help prevent irritation and infections.',
    imageFilename: 'ear cleaning.jpg',
  },
  {
    icon: Wind,
    title: 'De-shedding Treatment',
    description: 'Targeted treatment for heavy shedders—less fur at home between grooms.',
    imageFilename: 'de shedding treatment.jpg',
  },
  {
    icon: Dog,
    title: 'Puppy Grooming',
    description: 'A calm first-time experience so young dogs learn to love the grooming process.',
    imageFilename: 'puppy grooming.jpg',
  },
  {
    icon: Heart,
    title: 'Senior Dog Grooming',
    description:
      'Extra patience and pacing for seniors—mobility-aware handling and breed-appropriate trims.',
    imageFilename: 'senior.jpg',
  },
  {
    icon: Bug,
    title: 'Flea & Tick Bath',
    description: 'Medicated bathing to tackle fleas and ticks and leave your pup comfortable again.',
    imageFilename: 'flea.jpg',
  },
]

function ServiceImageCard({ imageFilename }: { imageFilename: string }) {
  const src = publicAssetUrl(imageFilename)

  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        aria-hidden
      />
      {/* Legibilidad: velo inferior (estilo pantalla tipo servicios con overlay oscuro). */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/52 to-black/38 transition-colors duration-300 group-hover:from-black/74 group-hover:via-black/44 group-hover:to-black/30"
        aria-hidden
      />
    </>
  )
}

function ServicePlaceholderCard({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-deep to-[oklch(0.26_0.07_264)]"
        aria-hidden
      />
      <Icon
        className="pointer-events-none absolute -bottom-8 -right-8 size-[11rem] text-white/[0.08] sm:size-[13rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/40"
        aria-hidden
      />
    </>
  )
}

function ServiceMarketingCard({ service }: { service: ServiceItem }) {
  const hasPhoto = Boolean(service.imageFilename)
  const sid = serviceSlug(service.title)

  return (
    <Link
      href="/#quote"
      className="group relative isolate flex aspect-[3/5] w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/15 outline-offset-4 transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_16px_48px_-14px_oklch(0.76_0.17_82_/_0.35)] focus-visible:outline-2 focus-visible:outline-accent sm:aspect-[10/13]"
      aria-labelledby={`svc-${sid}`}
    >
      {hasPhoto && service.imageFilename ? (
        <ServiceImageCard imageFilename={service.imageFilename} />
      ) : (
        <ServicePlaceholderCard icon={service.icon} />
      )}

      <div className="relative z-[1] flex h-full flex-col justify-end p-6 text-center sm:p-7">
        <div className="flex flex-col items-center gap-3 pb-2">
          <h3
            id={`svc-${sid}`}
            className="font-heading text-balance text-xl font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-2xl"
          >
            {service.title}
          </h3>
          <p className="max-w-[24ch] text-pretty text-sm leading-relaxed text-white/92 sm:max-w-[26ch] sm:text-[0.9375rem]">
            {service.description}
          </p>
        </div>
        <span className="mt-5 inline-flex items-center justify-center gap-2 text-center text-sm font-bold tracking-wide text-white">
          Learn more
          <ArrowRight
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  )
}

export function Services() {
  return (
    <section id="services" className="surface-band-light border-t border-accent/25 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Layout estilo “Screen Armors”: título centrado + raya accent, rejilla sobre fondo claro */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.375rem]">
            Services
          </h2>
          <div
            className="mx-auto mt-4 h-1.5 w-16 shrink-0 rounded-full bg-accent shadow-[0_0_22px_-4px_oklch(0.76_0.17_82_/_0.55)] sm:w-20"
            aria-hidden
          />
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Mobile salon quality at your curb — pick your service below and {"we'll"} tailor the visit to your dog.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ServiceMarketingCard key={svc.title} service={svc} />
          ))}
        </div>
      </div>
    </section>
  )
}
