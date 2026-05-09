import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin, Facebook } from 'lucide-react'
import { site } from '@/lib/site'

const quickLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About Us' },
  { href: '/#areas', label: 'Service Areas' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/#quote', label: 'Request Quote' },
  { href: '/#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="site-footer-brand bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex min-w-0 items-center gap-3">
              <Image
                src={site.logoSrc}
                alt=""
                width={200}
                height={94}
                className="h-16 w-auto max-w-[180px] shrink-0 object-contain object-left opacity-95 drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:max-w-[240px]"
                aria-hidden
              />
              <span className="min-w-0 font-semibold uppercase leading-tight tracking-wide text-white">
                <span className="flex flex-col gap-0.5 sm:hidden">
                  {site.nameLines.map((line) => (
                    <span key={line}>{line.toUpperCase()}</span>
                  ))}
                </span>
                <span className="hidden sm:inline">{site.name.toUpperCase()}</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Professional mobile dog grooming at your doorstep — the comfort of home with the polish of a luxury
              salon.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold tracking-wide text-white">Quick Links</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold tracking-wide text-white">Contact Us</h3>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-accent"
              >
                <Phone className="size-4 shrink-0 text-accent" />
                {site.phoneDisplay}
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-white/75 transition-colors hover:text-accent"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.addressLine}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-white/35 bg-white/10 text-white transition-colors hover:border-accent hover:bg-accent/20 hover:text-accent"
              aria-label="Alfonso's Mobile pet grooming on Facebook (opens in a new tab)"
            >
              <Facebook className="size-5" aria-hidden />
            </a>
            <p className="text-sm text-white/55">
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
