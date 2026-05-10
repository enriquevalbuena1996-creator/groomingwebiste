/** Google Ads / gtag IDs for this property (website tag wizard). */
export const GOOGLE_ADS_ID = 'AW-18153308949'

/** Event snippet: “Click to call website”. */
export const GOOGLE_ADS_CLICK_TO_CALL_SEND_TO = 'AW-18153308949/GpkYCI6g6aocEJWGltBD'

/** Event snippet: “Submit lead form”. */
export const GOOGLE_ADS_LEAD_FORM_SEND_TO = 'AW-18153308949/TBo8CMur6qocEJWGltBD'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function gtag_report_conversion_inner(url: string | undefined, send_to: string): boolean {
  if (typeof window === 'undefined') return false

  const callback = () => {
    if (typeof url !== 'undefined') {
      window.location.href = url
    }
  }

  const gtag = window.gtag
  if (typeof gtag !== 'function') {
    callback()
    return false
  }

  gtag('event', 'conversion', {
    send_to,
    event_callback: callback,
  })
  return false
}

/**
 * Click-to-call (`tel:`) — mirrors Google Ads event snippet with `preventDefault` handled in PhoneLink.
 * Pass `url` (the `tel:…` href) to open the dialer after the beacon fires.
 */
export function gtag_report_phone_conversion(url?: string): boolean {
  return gtag_report_conversion_inner(url, GOOGLE_ADS_CLICK_TO_CALL_SEND_TO)
}

/** Submit lead form — call after a successful Send Request / quote submit (no redirect unless `url`). */
export function gtag_report_lead_form_conversion(url?: string): boolean {
  return gtag_report_conversion_inner(url, GOOGLE_ADS_LEAD_FORM_SEND_TO)
}
