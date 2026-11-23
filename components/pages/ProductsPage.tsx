'use client'

import { Suspense } from 'react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ProductCatalog from '@/components/sections/ProductCatalog'
import { CtaBand } from '@/components/sections/Shared'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function ProductsPage() {
  const {
    t,
    content: { navLabel },
  } = useI18n()

  return (
    <>
      <PageHero
        image="/images/chemicals-drums.jpg"
        title={t('products.hero.title')}
        subtitle={t('products.hero.subtitle')}
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/products'), path: '/products' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow={t('products.intro.eyebrow')}
          title={t('products.intro.title')}
          intro={t('products.intro.intro')}
        />
        <div className="mt-14">
          <Suspense fallback={null}>
            <ProductCatalog />
          </Suspense>
        </div>
      </Section>

      <Section tone="muted" className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 rounded-card border border-linha bg-white p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-cobalto">{t('products.onDemand.eyebrow')}</p>
            <h2 className="mt-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">{t('products.onDemand.title')}</h2>
            <p className="mt-4 text-base leading-relaxed text-suave">{t('products.onDemand.body')}</p>
          </div>
          <Button href="/contact" arrow className="shrink-0 self-start lg:self-center">
            {t('products.onDemand.cta')}
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
