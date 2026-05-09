import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteJsonLd } from '@/components/json-ld'
import { site } from '@/lib/site'
import { getSiteUrl } from '@/lib/site-url'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const siteUrl = getSiteUrl()
const defaultTitle = `Mobile Dog Grooming Sarasota & Manatee County | ${site.name}`
const defaultDescription =
  "Alfonso's Dog Mobile Grooming brings full-service dog grooming to your driveway in Sarasota, Bradenton, Venice, Lakewood Ranch, and nearby areas. Bath, haircut, nails, ear cleaning, de-shedding & more in our mobile salon."

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  keywords: [
    'mobile dog grooming Sarasota',
    'mobile pet grooming Sarasota FL',
    'dog grooming at home Sarasota',
    'Bradenton mobile dog grooming',
    'Lakewood Ranch dog grooming',
    'Venice FL mobile grooming',
    'Manatee County pet grooming',
    'Alfonso mobile grooming',
    'AMG mobile grooming',
    'dog groomer van Sarasota',
    'puppy grooming Sarasota',
    'senior dog grooming Florida',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl.href,
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: site.heroPosterSrc,
        alt: `${site.name} — professional mobile dog grooming`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [site.heroPosterSrc],
  },
  category: 'business',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#061528',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-US" className={`dark ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased">
        <SiteJsonLd />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
