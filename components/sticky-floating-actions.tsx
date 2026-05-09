'use client'

import Link from 'next/link'
import { Phone, Send } from 'lucide-react'
import { site } from '@/lib/site'
import { Button } from '@/components/ui/button'

/** Fixed CTAs: Request Quote (+ call on smaller screens only, above quote). */
export function StickyFloatingActions() {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[130] flex flex-col items-end gap-3">
      <Button
        size="lg"
        variant="gold"
        className="pointer-events-auto h-11 min-h-11 gap-2 rounded-full px-4 py-3 text-[0.8125rem] font-semibold shadow-xl ring-2 ring-accent/80 ring-offset-2 ring-offset-background sm:h-12 sm:min-h-12 sm:px-5 sm:text-sm"
        asChild
      >
        <Link href="/#quote">
          <Send className="size-[1.125rem] shrink-0 sm:size-5" aria-hidden strokeWidth={2.25} />
          Request Quote
        </Link>
      </Button>
      <Button
        size="lg"
        variant="gold"
        className="pointer-events-auto size-14 rounded-full shadow-lg ring-2 ring-accent/80 ring-offset-2 ring-offset-background md:hidden"
        asChild
      >
        <a href={`tel:${site.phoneTel}`} aria-label={`Call ${site.phoneDisplay}`}>
          <Phone className="size-6" aria-hidden />
        </a>
      </Button>
    </div>
  )
}
