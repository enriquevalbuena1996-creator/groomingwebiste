import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { MobileService } from '@/components/mobile-service'
import { Reviews } from '@/components/reviews'
import { QuoteForm } from '@/components/quote-form'
import { About } from '@/components/about'
import { Areas } from '@/components/areas'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { StickyFloatingActions } from '@/components/sticky-floating-actions'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <MobileService />
        <Reviews />
        <QuoteForm />
        <About />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <StickyFloatingActions />
    </div>
  )
}
