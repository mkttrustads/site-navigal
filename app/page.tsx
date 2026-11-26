import HomePage from '@/components/pages/HomePage'
import { RouteMapStory } from '@/components/sections/RouteMap'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/'], path: '/' })

export default function Page() {
  return <HomePage routeMap={<RouteMapStory />} />
}
