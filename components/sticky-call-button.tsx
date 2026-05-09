'use client'

import { Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { Button } from '@/components/ui/button'

export function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        size="lg"
        variant="gold"
        className="size-14 rounded-full shadow-lg ring-2 ring-accent/80 ring-offset-2 ring-offset-background"
        asChild
      >
        <a href={`tel:${site.phoneTel}`} aria-label="Call us">
          <Phone className="size-6" />
        </a>
      </Button>
    </div>
  )
}
