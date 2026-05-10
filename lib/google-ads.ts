/** Google Ads / gtag IDs for this property (website tag wizard). */
export const GOOGLE_ADS_ID = 'AW-18153308949'

/**
 * Paste the full value from Ads → Goals → Conversion → Tag setup → "Event snippet" → send_to:
 * e.g. AW-18153308949/AbCdEfGhIjKlMnOpQr
 */
export const GOOGLE_ADS_CLICK_TO_CALL_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLICK_TO_CALL_SEND_TO?.trim() || ''

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Fire Ads conversion when the user taps a click-to-call (tel:) link on the site. */
export function fireGoogleAdsClickToCallConversion(): void {
  const sendTo = GOOGLE_ADS_CLICK_TO_CALL_SEND_TO
  if (!sendTo || typeof window === 'undefined') return
  window.gtag?.('event', 'conversion', {
    send_to: sendTo,
  })
}
