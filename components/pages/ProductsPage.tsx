'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import PageHero from '@/components/ui/PageHero'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ProductCatalog from '@/components/sections/ProductCatalog'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'

// Fotos de apoio no fim da página — só setores com imagem própria disponível.
const highlights: { image: string; caption: UiKey; position?: string }[] = [
  // Enquadramento: base da montanha de enxofre + esteira industrial visíveis em todos os breakpoints.
  { image: '/images/sulfur-plant.webp', caption: 'products.caption.sulfur', position: 'object-[50%_65%]' },
  { image: '/images/resins.jpg', caption: 'products.caption.resins' },
  { image: '/images/quality-lab.jpg', caption: 'products.caption.lab' },
]

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
        titleClassName="max-w-[52rem]"
        subtitleClassName="max-w-[44rem]"
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/products'), path: '/products' },
        ]}
      />

      {/* Texto de abertura agora vive na capa: o catálogo (tags de setor → produtos) começa direto. */}
      <Section className="pt-12 sm:pt-16">
        <Suspense fallback={null}>
          <ProductCatalog />
        </Suspense>
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

      <section className="grid sm:grid-cols-3" aria-label={t('products.highlightsLabel')}>
        {highlights.map((highlight) => (
          <figure key={highlight.image} className="relative aspect-[4/3] overflow-hidden bg-preto">
            <Image src={highlight.image} alt={t(highlight.caption)} fill sizes="(min-width: 640px) 33vw, 100vw" className={`object-cover opacity-80 ${highlight.position ?? ''}`} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto/90 to-transparent p-6 text-base font-semibold text-white">
              {t(highlight.caption)}
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  )
}
