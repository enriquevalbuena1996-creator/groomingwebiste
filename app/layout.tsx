import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Paws & Shine Mobile Dog Grooming | Professional At-Home Pet Care',
  description: 'Professional mobile dog grooming services at your doorstep. We bring comfort, convenience, and expert care directly to your home in Sarasota, Bradenton, Venice, and surrounding areas.',
  keywords: 'mobile dog grooming, dog grooming at home, pet grooming, Sarasota dog grooming, Bradenton pet care',
  openGraph: {
    title: 'Paws & Shine Mobile Dog Grooming',
    description: 'Professional mobile dog grooming services at your doorstep.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#2d9596',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
