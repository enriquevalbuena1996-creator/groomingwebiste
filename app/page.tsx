import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { QuoteForm } from '@/components/quote-form'
import { About } from '@/components/about'
import { Areas } from '@/components/areas'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { StickyCallButton } from '@/components/sticky-call-button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <QuoteForm />
        <About />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  )
}
