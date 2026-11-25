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
          src="/images/hero-container-ship-night.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-preto via-preto/80 to-preto/20" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-preto via-transparent to-preto/50" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12, 0.1)}
        className="relative mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-6 pb-10 pt-28 sm:pt-32"
      >
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
        <motion.h1 variants={item} className="hero-title mt-6 max-w-[12.2em] text-balance">
          {company.tagline}
        </motion.h1>
        <motion.p variants={item} className="mt-4 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-white/80 sm:text-base">
          {t('home.hero.lead')}
        </motion.p>
        <motion.div variants={item} className="mt-7 flex flex-wrap gap-4">
          <Button href={quoteCta.href} arrow>
            {quoteCta.label}
          </Button>
          <Button href="/products" variant="outline">
            {t('home.hero.explore')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
