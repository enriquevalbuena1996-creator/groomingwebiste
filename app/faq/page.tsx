import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Faq } from '@/components/faq'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    "FAQ for Alfonso's Dog Mobile Grooming: Sarasota & Manatee service area, how mobile grooming works, booking a van visit, pricing, breeds, safety, and what to expect.",
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `FAQ — ${site.name}`,
    description:
      'Answers about mobile dog grooming in Sarasota, Bradenton, and nearby — booking, pricing, and our grooming van.',
    type: 'website',
    url: '/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: `FAQ — ${site.name}`,
    description: 'Mobile grooming questions answered for Sarasota & Manatee County pet owners.',
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
