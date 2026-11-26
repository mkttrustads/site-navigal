'use client'

import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { AudienceSplit, SolutionsGrid } from '@/components/sections/Shared'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function SolutionsPage() {
  const {
    t,
    content: { navLabel, processSteps, riskPillars },
  } = useI18n()

  return (
    <>
      <PageHero
        image="/images/port-sunset.jpg"
        title={t('solutions.hero.title')}
        subtitle={t('solutions.hero.subtitle')}
        breadcrumb={[
          { name: t('common.home'), path: '/' },
          { name: navLabel('/solutions'), path: '/solutions' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow={t('common.whatWeDo')}
          title={t('solutions.what.title')}
          intro={t('solutions.what.intro')}
        />
        <div className="mt-14">
          <SolutionsGrid />
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow={t('solutions.how.eyebrow')}
          title={t('solutions.how.title')}
          intro={t('solutions.how.intro')}
        />
        {/* Mobile: lista vertical com linha conectora à esquerda.
            Tablet (sm): grade 2x2, conector horizontal na coluna esquerda.
            Desktop (lg): 4 colunas proporcionais ocupando toda a largura. */}
        <Reveal className="mt-16 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1
            // Em 2 colunas, só a coluna esquerda conecta com a direita; em 4 colunas, todas menos a última.
            const tabletVisibility = index % 2 === 0 ? 'sm:block' : 'sm:hidden lg:block'
            return (
              <RevealItem key={index} className="relative flex gap-5 pb-10 last:pb-0 sm:block sm:pb-0">
                <div className="flex flex-col items-center sm:flex-row sm:gap-4">
                  <span className="stat-numeral flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cobalto-claro text-base font-bold text-cobalto-claro">
                    {index + 1}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`my-2 w-px flex-1 bg-gradient-to-b from-cobalto to-transparent sm:my-0 sm:-mr-3 sm:h-px sm:w-auto sm:bg-gradient-to-r ${tabletVisibility}`}
                    />
                  )}
                </div>
                <div className="min-w-0 sm:mt-6">
                  <h3 className="pt-2.5 text-lg sm:pt-0">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/70">{step.description}</p>
                </div>
              </RevealItem>
            )
          })}
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={t('solutions.risk.eyebrow')}
            title={t('solutions.risk.title')}
            intro={t('solutions.risk.intro')}
          />
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {riskPillars.map((pillar, index) => (
              <RevealItem key={index} className="rounded-card border border-linha bg-white p-7">
                <Icon name={pillar.icon} className="h-7 w-7 text-cobalto" />
                <h3 className="mt-5 text-lg">{pillar.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-suave">{pillar.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t('common.whoWeServe')} title={t('solutions.who.title')} align="center" />
        <div className="mt-14">
          <AudienceSplit />
        </div>
      </Section>
    </>
  )
}
