'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { revealUp, staggerContainer, staticReveal } from '@/lib/motion-variants'
import Button from '@/components/ui/Button'
import GlobeMark from '@/components/ui/GlobeMark'
import { facts, quoteCta } from '@/content/site'

const heroFacts = [facts.founded, facts.containers, facts.portfolio, facts.continents]

export default function HomeHero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const globeY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
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
      <motion.div style={{ y: globeY }} className="absolute -right-32 top-24 hidden h-[85%] lg:block" aria-hidden="true">
        <GlobeMark tone="dark" className="h-full w-auto opacity-[0.06]" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12, 0.1)}
        className="relative mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-6 pb-16 pt-40"
      >
        <motion.p variants={item} className="eyebrow flex items-center gap-3 text-cobalto-claro">
          <span aria-hidden="true" className="h-px w-10 bg-cobalto-claro" />
          Navigal Trading Solutions Limited
        </motion.p>
        <motion.h1 variants={item} className="mt-6 max-w-4xl text-balance text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[1.02]">
          Building reliable connections.
        </motion.h1>
        <motion.p variants={item} className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
          We structure international supply chains and trade strategic raw materials for Latin American industry: from
          qualified suppliers at origin to delivery at your plant, with every risk governed along the way.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Button href={quoteCta.href} arrow>
            {quoteCta.label}
          </Button>
          <Button href="/products" variant="outline">
            Explore our portfolio
          </Button>
        </motion.div>
      </motion.div>

      <div className="relative border-t border-white/10 bg-preto/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-site grid-cols-2 px-6 lg:grid-cols-4">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1 py-6 lg:py-8 ${index % 2 === 1 ? 'pl-6' : 'pr-6'} ${
                index > 0 ? 'lg:border-l lg:border-white/10 lg:pl-8' : ''
              } ${index > 1 ? 'border-t border-white/10 lg:border-t-0' : ''}`}
            >
              <dt className="text-sm leading-snug text-white/65">{fact.label}</dt>
              <dd className="stat-numeral order-first text-3xl font-bold text-white sm:text-4xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
