'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import HomeHero from '@/components/sections/HomeHero'
import { AudienceSplit, CtaBand, IndustriesGrid, SolutionsGrid, TrustGroupSection } from '@/components/sections/Shared'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'

/** `routeMap` vem da página (Server Component) para a biblioteca do mapa ficar fora do bundle do cliente. */
export default function HomePage({ routeMap }: { routeMap: ReactNode }) {
  const {
    t,
    content: { story },
  } = useI18n()

  return (
    <>
      <HomeHero />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <RevealItem>
              <SectionHeading
                eyebrow={story.eyebrow}
                title={story.title}
                intro={
                  <>
                    {story.paragraphs.map((paragraph, index) => (
                      <p key={index} className={index > 0 ? 'mt-4' : undefined}>
                        {paragraph}
                      </p>
                    ))}
                    <p className="mt-4 font-semibold text-preto">{story.closing}</p>
                    <p className="mt-4">{story.presence}</p>
                  </>
                }
              />
            </RevealItem>
            <RevealItem className="mt-10">
              <Button href="/about" variant="link" arrow>
                {t('home.aboutLink')}
              </Button>
            </RevealItem>
          </Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/bulk-vessel-loading.jpg"
                alt={t('home.imageAlt')}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-card bg-preto p-6 text-white shadow-2xl sm:left-auto sm:right-8 sm:w-72">
              <p className="eyebrow text-cobalto-claro">{t('common.ourMission')}</p>
              <p className="mt-3 text-base leading-relaxed text-white/85">{t('home.mission.short')}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t('common.whatWeDo')} title={t('home.what.title')} intro={t('home.what.intro')} />
          <Button href="/solutions" variant="link" arrow className="shrink-0">
            {t('home.what.link')}
          </Button>
        </div>
        <div className="mt-14">
          <SolutionsGrid />
        </div>
      </Section>

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

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <SectionHeading
            tone="dark"
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
