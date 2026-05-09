import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone, MessageSquare, MapPin } from 'lucide-react'
import { site } from '@/lib/site'

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100dvh-4.25rem)] min-h-[calc(100svh-4.25rem)] flex-col items-center justify-center overflow-hidden text-white"
      aria-label="Introduction"
    >
      {/* Vídeo de fondo (cinemático, loop) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={site.heroPosterSrc}
          aria-hidden
        >
          <source src={encodeURI(site.heroVideoSrc)} type="video/mp4" />
        </video>
        {/* Fallback imagen si motion reduce o vídeo no carga */}
        <div className="absolute inset-0 hidden motion-reduce:block">
          <Image
            src={site.heroPosterSrc}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Velos oscuros + toque azul rey / dorado (legibilidad estilo portada) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/88 via-brand-navy-deep/55 to-brand-navy-deep/92"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,rgba(212,175,55,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
      </div>

      {/* Contenido centrado (titular + CTAs) */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <h1 className="font-heading text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-b from-white from-[5%] via-[#f5e6b0] to-[#d4af37] to-[92%] bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]">
            Professional Mobile Dog Grooming at Your Doorstep
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/88 sm:text-xl">
          We bring expert grooming services directly to your home. No more stressful car rides or waiting in crowded
          salons. Your furry friend gets pampered in a calm, comfortable environment they know and love.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/85">
          <div className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-accent" aria-hidden />
            <span>{site.phoneDisplay}</span>
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
            <span>{site.addressLine}</span>
          </a>
          <div className="flex items-center gap-2 text-white/75">
            <span>Serving {site.serviceArea}</span>
          </div>
        </div>

        <div className="mt-12 flex w-full max-w-lg flex-col items-stretch gap-4 sm:mx-auto sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            size="lg"
            asChild
            className="w-full bg-white font-semibold text-brand-navy shadow-[0_8px_28px_rgba(0,0,0,0.4)] hover:bg-white/92 sm:w-auto sm:min-w-[200px]"
          >
            <a href={`tel:${site.phoneTel}`}>
              <Phone className="size-5" />
              Call Now
            </a>
          </Button>
          <Button size="lg" variant="gold" asChild className="w-full sm:w-auto sm:min-w-[200px]">
            <a href="#quote">
              <MessageSquare className="size-5" />
              Request a Quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
