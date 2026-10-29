'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { revealUp, staggerContainer, staticReveal } from '@/lib/motion-variants'
import GlobeMark from '@/components/ui/GlobeMark'

type Crumb = { name: string; path: string }

/**
 * Banner das páginas internas — mesma estrutura do ServiceHero do site Trust
 * Group (foto com gradiente, breadcrumb, H1 e subtítulo), em preto
 * corporativo e com o globo como marca d'água.
 */
export default function PageHero({
  image,
  title,
  subtitle,
  breadcrumb,
}: {
  image: string
  title: string
  subtitle: string
  breadcrumb: Crumb[]
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1])
  const item = reduce ? staticReveal : revealUp

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-preto">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={image} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-preto via-preto/85 to-preto/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-preto/80 via-transparent to-preto/40" />
      <GlobeMark tone="dark" className="absolute -right-24 top-1/2 hidden h-[130%] -translate-y-1/2 opacity-[0.07] lg:block" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.1)}
        className="relative mx-auto flex min-h-[24rem] max-w-site flex-col justify-end px-6 pb-16 pt-36 sm:min-h-[28rem] lg:min-h-[30rem]"
      >
        <motion.nav variants={item} aria-label="Breadcrumb">
          <ol className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-cobalto-claro">
            {breadcrumb.map((crumb, index) => {
              const last = index === breadcrumb.length - 1
              return (
                <li key={crumb.path} className="flex items-center gap-x-2">
                  {last ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="transition-colors hover:text-white">
                        {crumb.name}
                      </Link>
                      <span aria-hidden="true" className="text-white/40">
                        /
                      </span>
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </motion.nav>
        <motion.h1 variants={item} className="mt-5 max-w-3xl text-balance text-[clamp(2.4rem,4.6vw,4rem)] text-white">
          {title}
        </motion.h1>
        <motion.p variants={item} className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  )
}
