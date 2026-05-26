import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://xyras.one'),
  title: {
    default: 'Xyras Sun - Builder around software, B2B export, and AI workflows',
    template: '%s | Xyras Sun',
  },
  description:
    'Personal digital garden of Xyras Sun, a Zhongshan-based builder working around software, B2B export, AI workflows, multilingual websites, CRM systems, and product data.',
  openGraph: {
    title: 'Xyras Sun',
    description: 'Personal digital garden around software, B2B export, AI workflows, and useful systems.',
    url: 'https://xyras.one',
    siteName: 'Xyras Sun',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xyras Sun',
    description: 'Personal digital garden around software, B2B export, AI workflows, and useful systems.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
