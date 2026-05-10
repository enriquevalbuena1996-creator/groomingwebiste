/** Google Ads / gtag IDs for this property (website tag wizard). */
export const GOOGLE_ADS_ID = 'AW-18153308949'

/** Event snippet: “Click to call website” conversion — `send_to` from Ads → Goals → Conversion → Tag setup. */
export const GOOGLE_ADS_CLICK_TO_CALL_SEND_TO = 'AW-18153308949/GpkYCI6g6aocEJWGltBD'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Event snippet helper (Google Ads HTML copy). Call on phone-button / tel link click.
 * Mirrors: gtag_report_conversion(url) returning false → we use preventDefault + this in React.
 * If `url` is passed, navigates after the conversion beacon (e.g. `tel:+15551234567`).
 */
export function gtag_report_conversion(url?: string): boolean {
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
    send_to: GOOGLE_ADS_CLICK_TO_CALL_SEND_TO,
    event_callback: callback,
  })
  return false
}
