import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Gallery } from '@/components/gallery'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Before & After Gallery',
  description:
    "See real before-and-after dog grooming photos from Alfonso's Mobile Grooming in Sarasota & Manatee County — bath, haircut, styling and coat care at your home.",
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: `Before & After Gallery — ${site.name}`,
    description:
      'Mobile grooming transformations: same-day salon results from our fully equipped grooming van.',
    type: 'website',
    url: '/gallery',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Before & After Gallery — ${site.name}`,
    description: 'Real grooming results from our Sarasota-area mobile dog grooming service.',
  },
}

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Gallery />
      </main>
      <Footer />
      <StickyFloatingActions />
    </div>
  )
}
