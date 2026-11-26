'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import HomeHero from '@/components/sections/HomeHero'
import { CtaBand, IndustriesGrid } from '@/components/sections/Shared'
import WhatWeDo from '@/components/sections/WhatWeDo'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'

// Fluxo da seção "Global network": fornecedor → Navigal → clientes (chaves `home.network.<step>.*`).
const networkSteps = ['step1', 'step2', 'step3'] as const

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
          <div className="relative mx-auto mb-6 w-full max-w-xl lg:mb-0 lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-card">
              <Image
                src="/images/bulk-vessel-loading.jpg"
                alt={t('home.imageAlt')}
                fill
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-card bg-preto p-6 text-white shadow-2xl sm:left-auto sm:right-8 sm:w-72">
              <p className="eyebrow text-cobalto-claro">{t('common.ourMission')}</p>
              <p className="mt-3 text-base leading-relaxed text-white/85">{t('home.about.mission')}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={t('home.network.eyebrow')}
              title={t('home.network.title')}
              intro={<p className="font-semibold text-cobalto">{t('home.network.subtitle')}</p>}
            />
            <ol className="mt-10">
              {networkSteps.map((step, index) => (
                <li key={step} className="relative flex gap-4 pb-7 last:pb-0">
                  {index < networkSteps.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-4 top-10 w-px -translate-x-1/2 bg-linha" />}
                  <span
                    aria-hidden="true"
                    className="stat-numeral relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cobalto text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight">{t(`home.network.${step}.title`)}</h3>
                    <p className="mt-1 text-sm font-semibold text-cobalto">{t(`home.network.${step}.role`)}</p>
                    <p className="mt-1.5 text-base leading-relaxed text-suave">{t(`home.network.${step}.text`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-l-2 border-cobalto pl-5 text-lg font-semibold leading-snug text-preto">{t('home.network.highlight')}</p>
          </div>
          {routeMap}
        </div>
      </Section>

      <WhatWeDo />

      <Section tone="muted">
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

      <CtaBand
        title={t('home.cta.title')}
        image="/images/cta-chemical-drums.webp"
        imageClassName="object-cover object-[82%_62%] sm:object-[50%_62%]"
      />
    </>
  )
}
