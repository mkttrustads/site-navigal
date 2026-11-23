import AboutPage from '@/components/pages/AboutPage'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/about'], path: '/about' })

export default function Page() {
  return <AboutPage />
}
