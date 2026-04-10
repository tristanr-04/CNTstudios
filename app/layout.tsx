import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import './globals.css'

export const metadata: Metadata = {
  title: 'CNTstudios | Premium Digital Agency',
  description: 'Wij transformeren bestaande websites naar high-converting machines. Website redesign, conversie optimalisatie en UX/UI verbeteringen.',
  keywords: ['website redesign', 'conversie optimalisatie', 'UX design', 'UI design', 'digital agency', 'Nederland'],
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0e1118',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="dark" data-scroll-behavior="smooth">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen min-w-0 overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
