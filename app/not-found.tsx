'use client'

import Button from '@/components/ui/Button'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-preto text-white">
      <div className="relative mx-auto w-full max-w-site px-6 pt-24">
        <p className="eyebrow text-cobalto-claro">{t('notFound.eyebrow')}</p>
        <h1 className="hero-title mt-4 max-w-2xl">{t('notFound.title')}</h1>
        <p className="mt-5 max-w-xl text-lg text-white/75">{t('notFound.body')}</p>
        <Button href="/" arrow className="mt-10">
          {t('notFound.back')}
        </Button>
      </div>
    </section>
  )
}
