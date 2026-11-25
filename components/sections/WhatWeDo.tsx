'use client'

import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'

// Seção "O que fazemos" da Home: três pilares curtos que levam à página de Soluções,
// onde o detalhamento dos serviços continua (ver `SolutionsGrid`).
const pillars = [
  { icon: 'package', key: 'home.what.item1' },
  { icon: 'globe', key: 'home.what.item2' },
  { icon: 'handshake', key: 'home.what.item3' },
] as const

export default function WhatWeDo() {
  const { t } = useI18n()

  return (
    <Section tone="muted">
      <SectionHeading title={t('common.whatWeDo')} />

      {/* Três colunas de mesma largura a partir de md; `h-full` + `items-stretch` igualam a altura dos cards. */}
      <Reveal className="mt-14 grid items-stretch gap-4 md:grid-cols-3 lg:gap-6">
        {pillars.map(({ icon, key }) => (
          <RevealItem key={key} className="h-full">
            {/* O hover fica no elemento interno: o `RevealItem` já usa transform na entrada. */}
            <div className="flex h-full flex-col gap-6 rounded-card border border-linha bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cobalto/40 hover:shadow-[0_12px_28px_-14px_rgba(43,94,167,0.35)] motion-safe:hover:-translate-y-1 lg:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-card bg-cobalto/10 text-cobalto">
                <Icon name={icon} className="h-6 w-6" />
              </span>
              <p className="text-pretty text-lg font-medium leading-snug text-preto">{t(key)}</p>
            </div>
          </RevealItem>
        ))}
      </Reveal>

      <div className="mt-10">
        <Button href="/solutions" variant="link" arrow>
          {t('home.what.link')}
        </Button>
      </div>
    </Section>
  )
}
