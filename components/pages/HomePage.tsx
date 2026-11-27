'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import HomeHero from '@/components/sections/HomeHero'
import { CtaBand } from '@/components/sections/Shared'
import { IndustriesMarquee } from '@/components/sections/IndustriesMarquee'
import NetworkStory from '@/components/sections/NetworkStory'
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

      {/* Setores: faixa contínua logo abaixo da capa, de ponta a ponta (sem o container central). */}
      <Section tone="muted" className="py-8 sm:py-10" containerClassName="!max-w-none !px-0">
        <IndustriesMarquee />
      </Section>

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
              <Button href="https://trust.group" variant="link" arrow>
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

      <NetworkStory map={routeMap} />

      <WhatWeDo />

      <CtaBand
        title={t('home.cta.title')}
        image="/images/cta-chemical-drums.webp"
        imageClassName="object-cover object-[82%_62%] sm:object-[50%_62%]"
      />
    </>
  )
}
