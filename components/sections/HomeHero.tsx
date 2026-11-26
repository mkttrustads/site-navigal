'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { revealUp, staggerContainer, staticReveal } from '@/lib/motion-variants'
import Button from '@/components/ui/Button'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function HomeHero() {
  const {
    t,
    content: { company, quoteCta },
  } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const item = reduce ? staticReveal : revealUp

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-preto text-white">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/images/hero-port-truck.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          // Caminhão, carga (big bags) e portal ficam no centro-direita da foto (≈42–85% da largura). Em telas
          // estreitas o recorte acompanha a carga e a traseira do caminhão; em tablet o caminhão cabe inteiro;
          // de lg para cima a foto aparece praticamente toda, centralizada.
          className="object-cover object-[78%_center] md:object-[72%_center] lg:object-center"
        />
      </motion.div>
      {/* Overlay azul-escuro (#071A33): véu uniforme leve + gradiente na base (título e faixa descrição + CTAs)
          + gradiente lateral no canto do texto. O topo e o miolo ficam quase limpos para preservar o céu, o
          sol e a carga. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#071A33]/10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,26,51,0.84)_0%,rgba(7,26,51,0.6)_34%,rgba(7,26,51,0.36)_62%,rgba(7,26,51,0.1)_86%,rgba(7,26,51,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,51,0.5)_0%,rgba(7,26,51,0.2)_45%,rgba(7,26,51,0)_75%)]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12, 0.1)}
        className="relative mx-auto flex w-full max-w-site flex-1 flex-col justify-end px-6 pb-12 pt-28 sm:pt-32 lg:pb-16"
      >
        {/* Ritmo vertical do bloco: logo → título (mt-7/8) < título → faixa (mt-10/12). Na faixa, descrição e
            botões dividem a mesma linha no desktop (lg) e empilham abaixo disso. */}
        {/* Logo completa na Hero e só a esfera no menu, como no site Trust Group. */}
        <motion.div variants={item}>
          <Image
            src="/brand/navigal-logo-white.png"
            alt="Navigal Trading Solutions Limited"
            width={809}
            height={520}
            priority
            className="h-20 w-auto sm:h-[6.3rem]"
          />
        </motion.div>
        <motion.h1 variants={item} className="hero-title-home mt-7 max-w-[12.2em] text-balance sm:mt-8">
          {company.tagline}
        </motion.h1>
        <div className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-8 sm:mt-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <motion.p variants={item} className="min-w-0 max-w-2xl text-pretty text-lg leading-relaxed text-white/85">
            {t('home.hero.lead')}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 lg:shrink-0 lg:flex-nowrap">
            <Button href={quoteCta.href} arrow>
              {quoteCta.label}
            </Button>
            <Button href="/products" variant="outline">
              {t('home.hero.explore')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
