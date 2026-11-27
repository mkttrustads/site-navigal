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
    <Section>
      {/* Imagem à esquerda, conteúdo à direita a partir de lg. Abaixo disso a imagem vai para cima do texto. */}
      <div className="grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-20">
        {/*
          Mobile/tablet: proporção fixa (quadrada → 4:3 em telas médias). Em lg a coluna estica
          até a altura do conteúdo; o recorte já vem enquadrado em navio + guindastes + contêineres,
          e `object-cover` mantém o foco ao variar a proporção.
        */}
        <div className="relative aspect-square overflow-hidden rounded-card sm:aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]">
          <Image
            src="/images/port-container-ship.webp"
            alt={t('home.what.imageAlt')}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[40%_50%]"
          />
        </div>

        <div className="flex flex-col justify-center">
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
