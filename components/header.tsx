'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'
import { site } from '@/lib/site'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#areas', label: 'Service Areas' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-[200] w-full overflow-visible border-b-[3px] border-accent bg-brand-navy text-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur-md supports-[backdrop-filter]:bg-brand-navy/95">
      <div className="relative z-[210] mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-[211] flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src={site.logoSrc}
            alt=""
            width={180}
            height={84}
            className="h-[48px] w-auto max-w-[min(100%,160px)] shrink-0 object-contain object-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:h-[54px] sm:max-w-[200px]"
            priority
            aria-hidden
          />
          <span className="min-w-0 max-w-[11rem] font-semibold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] sm:max-w-[20rem] sm:text-sm md:text-base">
            <span className="flex flex-col gap-0.5 sm:hidden">
              {site.nameLines.map((line) => (
                <span key={line}>{line.toUpperCase()}</span>
              ))}
            </span>
            <span className="hidden sm:inline">{site.name.toUpperCase()}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="gold" size="sm" asChild>
            <a href={`tel:${site.phoneTel}`}>
              <Phone className="size-4" />
              {site.phoneDisplay}
            </a>
          </Button>
          <Button size="sm" variant="gold" asChild className="shadow-md">
            <a href="#quote">Request Quote</a>
          </Button>
        </div>

        <button
          type="button"
          className="relative z-[212] flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-white/25 bg-white/5 text-white md:hidden active:bg-white/15"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="size-7" strokeWidth={2} /> : <Menu className="size-7" strokeWidth={2} />}
        </button>
      </div>

      {/* Panel móvil: fixed para que nunca quede bajo el hero / vídeo */}
      {mobileMenuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[4.25rem] z-[190] bg-black/55 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            className="fixed left-0 right-0 top-[4.25rem] z-[205] max-h-[min(85dvh,calc(100dvh-4.25rem))] overflow-y-auto border-t border-white/15 bg-brand-navy-deep shadow-2xl md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col space-y-1 px-4 py-4 pb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="gold" asChild className="w-full">
                  <a href={`tel:${site.phoneTel}`}>
                    <Phone className="size-4" />
                    {site.phoneDisplay}
                  </a>
                </Button>
                <Button variant="gold" asChild className="w-full shadow-md">
                  <a href="#quote" onClick={() => setMobileMenuOpen(false)}>
                    Request Quote
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  )
}
