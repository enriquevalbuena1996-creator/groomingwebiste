'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X, PawPrint } from 'lucide-react'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#areas', label: 'Service Areas' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="size-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Paws & Shine</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:+19415551234">
              <Phone className="size-4" />
              (941) 555-1234
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="#quote">Request Quote</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="size-6 text-foreground" />
          ) : (
            <Menu className="size-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-card md:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" asChild className="w-full">
                <a href="tel:+19415551234">
                  <Phone className="size-4" />
                  (941) 555-1234
                </a>
              </Button>
              <Button asChild className="w-full">
                <a href="#quote" onClick={() => setMobileMenuOpen(false)}>
                  Request Quote
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
