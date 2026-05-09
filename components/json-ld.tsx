import { googleReviewsSummary } from '@/lib/reviews'
import { site } from '@/lib/site'
import { absoluteUrl } from '@/lib/site-url'

/** Structured data for Google — LocalBusiness + WebSite (JSON-LD). */
export function SiteJsonLd() {
  const origin = absoluteUrl('/').replace(/\/$/, '')
  const logoUrl = absoluteUrl(site.logoSrc)
  const heroImage = absoluteUrl(site.heroPosterSrc)

  const localBusiness = {
    '@type': 'LocalBusiness',
    '@id': `${origin}/#localbusiness`,
    name: site.name,
    description:
      'Professional mobile dog grooming in Sarasota, Bradenton, and Manatee County. Fully equipped van, bath, haircut, nails, ear cleaning, and breed-specific styling at your home.',
    url: origin,
    telephone: site.phoneTel,
    image: [heroImage, logoUrl],
    logo: logoUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Glen Ridge Ln',
      addressLocality: 'Sarasota',
      addressRegion: 'FL',
      postalCode: '34232',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Sarasota County' },
      { '@type': 'AdministrativeArea', name: 'Manatee County' },
      { '@type': 'City', name: 'Sarasota' },
      { '@type': 'City', name: 'Bradenton' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [site.facebookUrl, site.yelpUrl, site.thumbtack.profileUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: googleReviewsSummary.averageRating,
      reviewCount: googleReviewsSummary.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  const webSite = {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: site.name,
    publisher: { '@id': `${origin}/#localbusiness` },
    inLanguage: 'en-US',
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [localBusiness, webSite],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
