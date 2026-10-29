import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

const routes = ['', '/about', '/solutions', '/products', '/industries', '/suppliers', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
