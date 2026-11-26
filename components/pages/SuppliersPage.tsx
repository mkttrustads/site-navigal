'use client'

import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import ContactForm from '@/components/forms/ContactForm'
import { CertificationsSection, TaglogSection } from '@/components/sections/Shared'
import { useI18n } from '@/lib/i18n/I18nProvider'

/** `routeMap` vem da página (Server Component) para a biblioteca do mapa ficar fora do bundle do cliente. */
export default function SuppliersPage({ routeMap }: { routeMap: ReactNode }) {
  const {
    t,
    content: { audiences, lookingFor, navLabel },
  } = useI18n()

  return (
    <>
      <PageHero
        image="/images/handshake-sky.jpg"
        title={t('suppliers.hero.title')}
        subtitle={t('suppliers.hero.subtitle')}
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/suppliers'), path: '/suppliers' },
        ]}
      />

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow={audiences.suppliers.eyebrow}
            title={audiences.suppliers.title}
            intro={t('suppliers.intro')}
          />
          <ul className="space-y-5 self-center">
            {[...audiences.suppliers.items, t('suppliers.extraItem')].map((item) => (
              <li key={item} className="flex gap-4 border-b border-linha pb-5 text-lg leading-relaxed">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalto text-white">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t('suppliers.look.eyebrow')} title={t('suppliers.look.title')} align="center" />
        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {lookingFor.map((item, index) => (
            <RevealItem key={index} className="rounded-card border border-linha bg-white p-7">
              <Icon name={item.icon} className="h-7 w-7 text-cobalto" />
              <h3 className="mt-5 text-lg">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-suave">{item.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <SectionHeading
            eyebrow={t('suppliers.gateway.eyebrow')}
            title={t('suppliers.gateway.title')}
            intro={t('suppliers.gateway.intro')}
          />
          {routeMap}
        </div>
      </Section>

      <TaglogSection />

      <CertificationsSection />

      <Section id="register">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeading
            eyebrow={t('contact.tab.supplier')}
            title={t('suppliers.register.title')}
            intro={t('suppliers.register.intro')}
          />
          <div className="rounded-card border border-linha bg-white p-6 shadow-sm sm:p-10">
            <ContactForm type="supplier" />
          </div>
        </div>
      </Section>
    </>
  )
}
