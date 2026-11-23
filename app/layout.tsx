import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DocumentMeta from '@/components/layout/DocumentMeta'
import { pageMeta } from '@/content/i18n/en'
import { SITE_URL, company } from '@/content/site'
import { I18nProvider } from '@/lib/i18n/I18nProvider'
import { bootScript } from '@/lib/i18n/config'
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
    default: pageMeta['/'].title,
    template: '%s | Navigal Trading Solutions',
  },
  description: pageMeta['/'].description,
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
    // `lang` e o atributo de "idioma pendente" são ajustados antes da hidratação
    // pelo script abaixo (idioma salvo do visitante), por isso o aviso é suprimido.
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-white font-body text-lg text-preto antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <I18nProvider>
          <DocumentMeta />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
