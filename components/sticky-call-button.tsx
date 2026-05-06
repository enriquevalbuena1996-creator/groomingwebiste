'use client'

import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        size="lg"
        className="size-14 rounded-full shadow-lg"
        asChild
      >
        <a href="tel:+19415551234" aria-label="Call us">
          <Phone className="size-6" />
        </a>
      </Button>
    </div>
  )
}
