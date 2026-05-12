'use client'

import { forwardRef, type AnchorHTMLAttributes } from 'react'

/** Same as `<a>`; conversions can be configured in Google Tag Manager if needed. */
export const PhoneLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function PhoneLink(
  props,
  ref,
) {
  return <a ref={ref} {...props} />
})
