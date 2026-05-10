'use client'

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { gtag_report_conversion } from '@/lib/google-ads'

/** Same as `<a>` but uses the Google Ads click-to-call event snippet on `tel:` links. */
export const PhoneLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function PhoneLink(
  { onClick, href, ...props },
  ref,
) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    const h = typeof href === 'string' ? href : ''
    if (h.startsWith('tel:')) {
      e.preventDefault()
      gtag_report_conversion(h)
    }
  }

  return <a ref={ref} href={href} {...props} onClick={handleClick} />
})
