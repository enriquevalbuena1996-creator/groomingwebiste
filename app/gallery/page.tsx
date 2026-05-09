import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Gallery } from '@/components/gallery'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `Gallery | ${site.name}`,
  description:
    "See professional before and after grooming results from Alfonso's Dog Mobile Grooming — Sarasota & Manatee County mobile grooming.",
  openGraph: {
    title: `Before & After Gallery — ${site.name}`,
    description: 'Real dog grooming transformations from our mobile grooming service.',
    type: 'website',
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
