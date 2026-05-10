'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'
import { PhoneLink } from '@/components/phone-link'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#about', label: 'About Us' },
  { href: '/#areas', label: 'Service Areas' },
  { href: '/faq', label: 'FAQ' },
]

function BrandLogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative z-[211] flex min-w-0 items-center gap-2 sm:gap-3', className)}>
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
  )
}

function HeaderCtas({ className }: { className?: string }) {
  return (
    <div className={cn('flex shrink-0 items-center gap-2 sm:gap-3', className)}>
      <Button variant="gold" size="sm" className="shrink-0 gap-2 whitespace-nowrap px-3 text-[0.8125rem] xl:text-sm" asChild>
        <PhoneLink href={`tel:${site.phoneTel}`}>
          <Phone className="size-4 shrink-0" aria-hidden />
          {site.phoneDisplay}
        </PhoneLink>
      </Button>
      <Button size="sm" variant="gold" className="shrink-0 whitespace-nowrap px-3 text-[0.8125rem] shadow-md xl:text-sm" asChild>
        <a href="/#quote">Request Quote</a>
      </Button>
    </div>
  )
}

function NavAnchors({
  variant,
  linkClassName,
  onNavigate,
}: {
  variant: 'inline' | 'stacked'
  linkClassName: string
  onNavigate?: () => void
}) {
  const navCls =
    variant === 'stacked'
      ? 'flex w-full flex-col space-y-1'
      : 'flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6'

  return (
    <nav aria-label="Main navigation" className={navCls}>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} onClick={onNavigate} className={linkClassName}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

/** Desktop xl+: single row — nav centered, CTAs isolated on the right (no overlap). */
function HeaderBarXl() {
  return (
    <div className="relative z-[210] mx-auto hidden h-[4.25rem] w-full max-w-7xl items-center gap-4 px-4 sm:px-6 xl:flex xl:justify-between xl:gap-6 lg:px-8">
      <BrandLogoLink className="max-w-[min(100%,18rem)] shrink-0 2xl:max-w-none" />
      <nav
        aria-label="Main navigation"
        className="flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-3 px-2 sm:gap-x-5 [&_a]:whitespace-nowrap 2xl:gap-x-7"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-accent 2xl:text-[0.9375rem]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <HeaderCtas className="shrink-0 pl-4 2xl:pl-6" />
    </div>
  )
}

/** md–lg / mid screens: logo + CTAs row, then full-width centered nav row (nothing sits under the buttons). */
function HeaderStackedMd() {
  return (
    <div className="relative z-[210] mx-auto hidden w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex xl:hidden lg:gap-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <BrandLogoLink className="min-w-0 shrink" />
        <HeaderCtas />
      </div>
      <NavAnchors
        variant="inline"
        linkClassName="text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-accent"
      />
      <div className="h-px w-full shrink-0 bg-white/12" aria-hidden />
    </div>
  )
}

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
      {/* Phones: single bar + menu */}
      <div className="relative z-[210] mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 md:hidden sm:px-6">
        <BrandLogoLink className="shrink min-w-0" />
        <button
          type="button"
          className="relative z-[212] flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-white/25 bg-white/5 text-white active:bg-white/15"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="size-7" strokeWidth={2} /> : <Menu className="size-7" strokeWidth={2} />}
        </button>
      </div>

      <HeaderStackedMd />

      <HeaderBarXl />

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
            <div className="flex flex-col space-y-1 px-4 py-4 pb-8">
              <NavAnchors
                variant="stacked"
                onNavigate={() => setMobileMenuOpen(false)}
                linkClassName="rounded-lg px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-accent"
              />
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="gold" asChild className="w-full">
                  <PhoneLink href={`tel:${site.phoneTel}`}>
                    <Phone className="size-4" />
                    {site.phoneDisplay}
                  </PhoneLink>
                </Button>
                <Button variant="gold" asChild className="w-full shadow-md">
                  <a href="/#quote" onClick={() => setMobileMenuOpen(false)}>
                    Request Quote
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  )
}
