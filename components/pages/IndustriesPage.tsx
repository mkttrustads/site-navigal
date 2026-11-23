'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/sections/Shared'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'

// Fotos de apoio entre os blocos — só setores com imagem própria disponível.
const highlights: { image: string; caption: UiKey }[] = [
  { image: '/images/sulfur-plant.jpg', caption: 'industries.caption.sulfur' },
  { image: '/images/resins.jpg', caption: 'industries.caption.resins' },
  { image: '/images/quality-lab.jpg', caption: 'industries.caption.lab' },
]

export default function IndustriesPage() {
  const {
    t,
    content: { industries, navLabel, productsForIndustry },
  } = useI18n()

  return (
    <>
      <PageHero
        image="/images/bulk-vessel-loading.jpg"
        title={t('industries.hero.title')}
        subtitle={t('industries.hero.subtitle')}
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/industries'), path: '/industries' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow={t('industries.sectors.eyebrow')}
          title={t('industries.sectors.title')}
          intro={t('industries.sectors.intro')}
        />
        <Reveal className="mt-14 divide-y divide-linha border-y border-linha" stagger={0.05}>
          {industries.map((industry) => {
            const items = productsForIndustry(industry.slug)
            return (
              <RevealItem key={industry.slug}>
                <article id={industry.slug} className="grid scroll-mt-28 gap-6 py-10 lg:grid-cols-[0.9fr_1.4fr_auto] lg:items-start lg:gap-12">
                  <div className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-cobalto/10 text-cobalto">
                      <Icon name={industry.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <h2 className="text-2xl">{industry.name}</h2>
                      <p className="mt-2 text-base leading-relaxed text-suave">{industry.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2 lg:pt-1">
                    {items.map((product) => (
                      <li key={product.slug} className="rounded-full border border-linha px-3 py-1.5 text-sm text-preto/80">
                        {product.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products?industry=${industry.slug}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap text-base font-semibold text-cobalto hover:underline lg:pt-1"
                  >
                    {t('common.viewProducts')}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              </RevealItem>
            )
          })}
        </Reveal>
      </Section>

      <section className="grid sm:grid-cols-3" aria-label={t('industries.highlightsLabel')}>
        {highlights.map((highlight) => (
          <figure key={highlight.image} className="relative aspect-[4/3] overflow-hidden bg-preto">
            <Image src={highlight.image} alt={t(highlight.caption)} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover opacity-80" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto/90 to-transparent p-6 text-base font-semibold text-white">
              {t(highlight.caption)}
            </figcaption>
          </figure>
        ))}
      </section>

      <CtaBand />
    </>
  )
}
