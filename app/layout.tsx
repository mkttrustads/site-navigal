import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import DocumentMeta from '@/components/layout/DocumentMeta'
import { pageMeta } from '@/content/i18n/en'
import { SITE_URL, company } from '@/content/site'
import { I18nProvider } from '@/lib/i18n/I18nProvider'
import { bootScript } from '@/lib/i18n/config'
import './globals.css'

// Figtree em todo o site, títulos em negrito (pedido do Marketing).
// Hospedada no repositório (variável, 400–800, subset latin; licença OFL) em vez de
// next/font/google: o build não depende mais do Google Fonts, que na Vercel às vezes
// devolve URLs sem extensão e derruba o build do Next 14.2.5 ("Cannot read properties of null").
const figtree = localFont({
  src: './fonts/Figtree-latin.woff2',
  weight: '400 800',
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
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  )
}
