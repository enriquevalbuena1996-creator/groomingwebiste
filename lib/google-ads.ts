/** Google Ads base tag ID (gtag.js `?id=` + `gtag('config', …)`). */
export const GOOGLE_ADS_ID = 'AW-18153308949'

/** Event snippet: Click to call website. */
export const GOOGLE_ADS_CLICK_TO_CALL_SEND_TO = 'AW-18153308949/GpkYCI6g6aocEJWGltBD'

/** Event snippet: Submit lead form. */
export const GOOGLE_ADS_LEAD_FORM_SEND_TO = 'AW-18153308949/TBo8CMur6qocEJWGltBD'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function gtagReportConversion(url: string | undefined, sendTo: string): boolean {
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
    send_to: sendTo,
    event_callback: callback,
  })
  return false
}

/** Click-to-call (`tel:`) — same logic as Google’s event snippet for phone links. */
export function gtag_report_click_to_call_conversion(url?: string): boolean {
  return gtagReportConversion(url, GOOGLE_ADS_CLICK_TO_CALL_SEND_TO)
}

/** After a successful quote submit — same logic as Google’s event snippet for lead form. */
export function gtag_report_lead_form_conversion(url?: string): boolean {
  return gtagReportConversion(url, GOOGLE_ADS_LEAD_FORM_SEND_TO)
}
