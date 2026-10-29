import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_URL, company } from '@/content/site'
import './globals.css'

// Figtree em todo o site, títulos em negrito (pedido do Marketing).
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Navigal Trading Solutions | International Trading for Latin American Industry',
    template: '%s | Navigal Trading Solutions',
  },
  description:
    'Navigal structures international supply chains and trades strategic raw materials for Latin American industry: qualified global suppliers, managed risk and door-to-door delivery.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/navigal-logo.png`,
  email: company.email,
  foundingDate: String(company.founded),
  parentOrganization: { '@type': 'Organization', name: 'Trust Group', url: 'https://trust.group' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.lines.slice(0, 2).join(', '),
    addressLocality: 'Ras Al Khaimah',
    addressCountry: 'AE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="bg-white font-body text-lg text-preto antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
