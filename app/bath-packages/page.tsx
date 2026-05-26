import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BathPackages } from '@/components/bath-packages'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Grooming Bath Packages',
  description:
    "Bath package pricing for Alfonso's Mobile Grooming in Sarasota — Doodles & Bichon premium baths, short-hair packages, and add-ons like deshedding and paw care.",
  alternates: { canonical: '/bath-packages' },
  openGraph: {
    title: `Grooming Bath Packages — ${site.name}`,
    description:
      'Transparent bath pricing by weight: Doodles & Bichon premium grooming, short-hair baths, and optional add-on treatments.',
    type: 'website',
    url: '/bath-packages',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Grooming Bath Packages — ${site.name}`,
    description: 'Mobile bath packages and add-on services with clear pricing for Sarasota-area dogs.',
  },
}

export default function BathPackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BathPackages />
      </main>
      <Footer />
      <StickyFloatingActions />
    </div>
  )
}
