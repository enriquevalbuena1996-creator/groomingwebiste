import Image from 'next/image'
import { groomingGalleryPairs } from '@/lib/gallery-pairs'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Gallery() {
  return (
    <section className="border-b border-accent/25 bg-secondary py-16 sm:py-24" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8">
          <div className="text-center">
            <h1 id="gallery-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Before &amp; After
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Real transformations from our mobile grooming — same visit, salon-quality finish, calm at-home convenience for clients across{' '}
              {site.serviceArea}.
            </p>
          </div>

          <ul className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
            {groomingGalleryPairs.map((pair) => (
              <li key={pair.num}>
                <article
                  aria-label={`Transformation ${pair.num} of ${groomingGalleryPairs.length}: before and after`}
                  className="grid gap-6 md:grid-cols-2 md:gap-8"
                >
                  <GalleryPhoto
                    badge="Before"
                    src={pair.beforeSrc}
                    alt={`Dog before grooming — transformation ${pair.num}, ${site.name}`}
                  />
                  <GalleryPhoto
                    badge="After"
                    src={pair.afterSrc}
                    alt={`Dog after professional grooming — transformation ${pair.num}, ${site.name}`}
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function GalleryPhoto({ badge, src, alt }: { badge: string; src: string; alt: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg',
        'ring-2 ring-accent/35 ring-offset-2 ring-offset-card',
        'bg-muted/40',
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <span
        className={cn(
          'absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm',
          badge === 'Before'
            ? 'border border-white/35 bg-brand-navy/80 text-white'
            : 'border border-accent/40 bg-accent/90 text-accent-foreground',
        )}
      >
        {badge}
      </span>
    </div>
  )
}
