import ProductsPage from '@/components/pages/ProductsPage'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/products'], path: '/products' })

export default function Page() {
  return <ProductsPage />
}
