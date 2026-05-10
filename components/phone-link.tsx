'use client'

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { fireGoogleAdsClickToCallConversion } from '@/lib/google-ads'

/** Same as `<a>` but sends the Google Ads click-to-call conversion when `href` is a `tel:` link. */
export const PhoneLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function PhoneLink(
  { onClick, href, ...props },
  ref,
) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    const h = typeof href === 'string' ? href : ''
    if (h.startsWith('tel:')) fireGoogleAdsClickToCallConversion()
  }

  return <a ref={ref} href={href} {...props} onClick={handleClick} />
})
