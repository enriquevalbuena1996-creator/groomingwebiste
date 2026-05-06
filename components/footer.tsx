import Link from 'next/link'
import { PawPrint, Phone, Mail } from 'lucide-react'

const quickLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#areas', label: 'Service Areas' },
  { href: '#quote', label: 'Request Quote' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <PawPrint className="size-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Paws & Shine</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional mobile dog grooming services at your doorstep. 
              We bring comfort and quality care to your furry friend.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="mt-4 space-y-3">
              <a
                href="tel:+19415551234"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4" />
                (941) 555-1234
              </a>
              <a
                href="mailto:hello@pawsandshine.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
                hello@pawsandshine.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Paws & Shine Mobile Dog Grooming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
