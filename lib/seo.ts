import type { Metadata } from 'next'
import { SITE_URL } from '@/content/site'

export function buildMetadata(page: { title: string; description: string; path: string }): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${SITE_URL}${page.path}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: 'Navigal Trading Solutions Limited',
      images: ['/images/hero-container-ship-night.jpg'],
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  }
}
