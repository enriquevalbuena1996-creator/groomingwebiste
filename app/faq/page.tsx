import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `FAQ | ${site.name}`,
  description:
    "Answers about Alfonso's Dog Mobile Grooming: service areas, how mobile grooming works, pricing, booking, breeds, sanitation, and more.",
  openGraph: {
    title: `FAQ — ${site.name}`,
    description: 'Frequently asked questions about mobile dog grooming in Sarasota & Manatee County.',
    type: 'website',
  },
}

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Faq />
      </main>
      <Footer />
      <StickyFloatingActions />
    </div>
  )
}
