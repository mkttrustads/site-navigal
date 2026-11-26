'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { BigNumbersSection, CertificationsSection, CommitmentSection, CtaBand, TrustGroupSection } from '@/components/sections/Shared'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function AboutPage() {
  const {
    t,
    content: { milestones, mission, navLabel, offices, principles, story },
  } = useI18n()

  return (
    <>
      <PageHero
        image="/images/earth-from-space.webp"
        imageClassName="object-cover object-[60%_45%]"
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/about'), path: '/about' },
        ]}
      />

      <BigNumbersSection />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
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
                <p className="mt-8">
                  <Button href="https://trust.group/" variant="link" arrow>
                    {t('about.story.trustLink')}
                  </Button>
                </p>
              </>
            }
          />
          <Reveal className="relative border-l border-linha pl-8 sm:pl-10">
            {milestones.map((milestone) => (
              <RevealItem key={milestone.id} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-cobalto ring-1 ring-cobalto sm:-left-[2.85rem]"
                />
                <p className="eyebrow text-cobalto">{milestone.label}</p>
                <h3 className="mt-2 text-xl">{milestone.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-suave">{milestone.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-preto text-white">
        <div className="relative mx-auto grid max-w-site gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow text-cobalto-claro">{t('common.ourMission')}</p>
            <p className="mt-6 text-balance text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug">{mission}</p>
          </div>
          <Reveal className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-3">
            {principles.map((principle) => (
              <RevealItem key={principle.id} className="bg-preto p-7">
                <Icon name={principle.icon} className="h-7 w-7 text-cobalto-claro" />
                <h3 className="mt-5 text-lg">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{principle.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/latam-rio.jpg"
              alt={t('about.imageAlt')}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow={t('about.presence.eyebrow')}
              title={t('about.presence.title')}
              intro={t('about.presence.intro')}
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {offices.map((office) => (
                <li key={office.id} className="border-t-2 border-preto pt-5">
                  <p className="flex items-center gap-2 text-lg font-bold">
                    <MapPin aria-hidden="true" className="h-5 w-5 text-cobalto" />
                    {office.country}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-cobalto">{office.role}</p>
                  <p className="mt-2 text-base leading-relaxed text-suave">{office.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <TrustGroupSection />

      <CommitmentSection />

      <CertificationsSection />

      <CtaBand title={t('about.cta.title')} tone="blue" />
    </>
  )
}
