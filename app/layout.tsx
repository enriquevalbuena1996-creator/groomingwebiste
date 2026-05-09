import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { site } from '@/lib/site'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${site.name} | Professional At-Home Pet Care`,
  description:
    'Professional mobile dog grooming in Sarasota and surrounding areas. We bring comfort, convenience, and expert care directly to your home.',
  keywords:
    'mobile dog grooming, dog grooming at home, pet grooming, Sarasota dog grooming, Alfonso dog grooming',
  openGraph: {
    title: site.name,
    description: 'Professional mobile dog grooming services at your doorstep.',
    type: 'website',
  },
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
    <html lang="en" className={`dark ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
