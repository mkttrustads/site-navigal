import IndustriesPage from '@/components/pages/IndustriesPage'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/industries'], path: '/industries' })

export default function Page() {
  return <IndustriesPage />
}
