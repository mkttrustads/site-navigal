import SolutionsPage from '@/components/pages/SolutionsPage'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/solutions'], path: '/solutions' })

export default function Page() {
  return <SolutionsPage />
}
