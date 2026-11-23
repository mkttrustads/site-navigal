import SuppliersPage from '@/components/pages/SuppliersPage'
import RouteMap from '@/components/sections/RouteMap'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/suppliers'], path: '/suppliers' })

export default function Page() {
  return <SuppliersPage routeMap={<RouteMap />} />
}
