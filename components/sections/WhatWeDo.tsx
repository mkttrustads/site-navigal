'use client'

import Image from 'next/image'
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
    <Section className="py-0 sm:py-0" containerClassName="!max-w-none !px-0">
      {/*
        Imagem "sangrada": ocupa a altura inteira da seção (topo ao fim) e encosta na borda esquerda da tela.
        O conteúdo da direita mantém o alinhamento do container do site (`max-w-site` + `px-6`).
        Abaixo de lg a imagem vai para cima do texto, em largura total.
      */}
      <div className="grid items-stretch lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-square overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src="/images/port-container-ship.webp"
            alt={t('home.what.imageAlt')}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[40%_50%]"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:py-20 lg:py-28 lg:pl-14 lg:pr-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))] xl:pl-20">
          <SectionHeading eyebrow={t('home.what.eyebrow')} title={t('home.what.title')} />

          <Reveal className="mt-10 grid gap-4">
            {pillars.map(({ icon, key }) => (
              <RevealItem key={key}>
                {/* O hover fica no elemento interno: o `RevealItem` já usa transform na entrada. */}
                <div className="flex items-center gap-5 rounded-card border border-linha bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-cobalto/40 hover:shadow-[0_12px_28px_-14px_rgba(43,94,167,0.35)] motion-safe:hover:-translate-y-1 lg:p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-cobalto/10 text-cobalto">
                    <Icon name={icon} className="h-6 w-6" />
                  </span>
                  <p className="text-pretty text-lg font-medium leading-snug text-preto">{t(key)}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mt-8">
            <Button href="/solutions" variant="link" arrow>
              {t('home.what.link')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
