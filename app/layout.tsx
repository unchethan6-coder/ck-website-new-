import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#E8C547',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ckcapital.co.uk'),
  title: 'CK Capital – Prop Firm | Instant Funded Trading Accounts Up to $1.2M',
  description: 'Get instant funded trading accounts with up to $1.2M capital. 100% profit splits, flexible payouts, 24/7 support. Trade Forex, Crypto & Commodities risk-free with CK Capital prop trading firm.',
  keywords: ['prop trading', 'funded trading', 'trading firm', 'forex trading', 'crypto trading', 'prop firm', 'instant funding', 'trading capital'],
  authors: [{ name: 'CK Capital Group' }],
  creator: 'CK Capital Group',
  publisher: 'CK Capital Group Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ckcapital.co.uk',
    siteName: 'CK Capital',
    title: 'CK Capital – Prop Firm | Instant Funded Trading Accounts Up to $1.2M',
    description: 'Get instant funded trading accounts with up to $1.2M capital. 100% profit splits, flexible payouts, 24/7 support. Trade Forex, Crypto & Commodities.',
    images: [
      {
        url: 'https://ckcapital.co.uk/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CK Capital - Prop Trading Firm',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CK Capital – Prop Firm | Instant Funded Trading Accounts',
    description: 'Get instant funded trading accounts with up to $1.2M capital and 100% profit splits.',
    creator: '@ckcapital',
    images: ['https://ckcapital.co.uk/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://ckcapital.co.uk',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/mask-icon.svg',
        color: '#E8C547',
      },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
