import ContactPage from '@/components/pages/ContactPage'
import { pageMeta } from '@/content/i18n/en'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({ ...pageMeta['/contact'], path: '/contact' })

export default function Page() {
  return <ContactPage />
}
