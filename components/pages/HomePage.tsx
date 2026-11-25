'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import HomeHero from '@/components/sections/HomeHero'
import { AudienceSplit, CtaBand, IndustriesGrid, TrustGroupSection } from '@/components/sections/Shared'
import WhatWeDo from '@/components/sections/WhatWeDo'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'

/** `routeMap` vem da página (Server Component) para a biblioteca do mapa ficar fora do bundle do cliente. */
export default function HomePage({ routeMap }: { routeMap: ReactNode }) {
  const { t } = useI18n()

  return (
    <>
      <HomeHero />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <RevealItem>
              <SectionHeading
                eyebrow={t('home.about.eyebrow')}
                title={t('home.about.title')}
                intro={
                  <>
                    <p>{t('home.about.p1')}</p>
                    <p className="mt-4">
                      {t('home.about.p2')} <span className="font-semibold text-cobalto">{t('home.about.highlight')}</span>
                    </p>
                  </>
                }
              />
            </RevealItem>
            <RevealItem className="mt-10 flex flex-col gap-3">
              <p className="text-sm font-semibold text-suave">{t('home.about.backedBy')}</p>
              <Image
                src="/brand/trust-group-horizontal.png"
                alt="Trust Group"
                width={1134}
                height={294}
                className="h-8 w-auto self-start sm:h-9"
              />
            </RevealItem>
            <RevealItem className="mt-10">
              <Button href="/about" variant="link" arrow>
                {t('home.about.link')}
              </Button>
            </RevealItem>
          </Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/bulk-vessel-loading.jpg"
              alt={t('home.imageAlt')}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <WhatWeDo />

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t('common.industries')} title={t('home.industries.title')} />
          <Button href="/products" variant="link" arrow className="shrink-0">
            {t('home.industries.link')}
          </Button>
        </div>
        <div className="mt-14">
          <IndustriesGrid />
        </div>
      </Section>

      <Section tone="brand">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <SectionHeading
            tone="brand"
            eyebrow={t('home.network.eyebrow')}
            title={t('home.network.title')}
            intro={
              <>
                <p>{t('home.network.p1')}</p>
                <p className="mt-4">{t('home.network.p2')}</p>
              </>
            }
          />
          {routeMap}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t('common.whoWeServe')} title={t('home.who.title')} align="center" />
        <div className="mt-14">
          <AudienceSplit />
        </div>
      </Section>

      <TrustGroupSection />

      <CtaBand title={t('home.cta.title')} />
    </>
  )
}
