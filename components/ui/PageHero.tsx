'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { revealUp, staggerContainer, staticReveal } from '@/lib/motion-variants'
import CoverOverlay from '@/components/ui/CoverOverlay'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'

type Crumb = { name: string; path: string }

/**
 * Banner das páginas internas (foto, breadcrumb, H1 e subtítulo). Overlay azul (mesmo tom da Home)
 * em degradê horizontal reforçado sob o texto — ver `CoverOverlay variant="text"`.
 */
export default function PageHero({
  image,
  title,
  subtitle,
  breadcrumb,
  imageClassName = 'object-cover',
  titleClassName = 'max-w-3xl',
  subtitleClassName = 'max-w-2xl',
}: {
  image: string
  /** Enquadramento da foto (ex.: `object-cover object-[60%_45%]`). Padrão: centralizada. */
  imageClassName?: string
  title: string
  subtitle: string
  /** Largura máxima do H1 (padrão `max-w-3xl`). Títulos longos podem alargar para fechar em duas linhas. */
  titleClassName?: string
  /** Largura máxima do subtítulo (padrão `max-w-2xl`). */
  subtitleClassName?: string
  breadcrumb: Crumb[]
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1])
  const item = reduce ? staticReveal : revealUp

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-preto">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image src={image} alt="" aria-hidden="true" fill priority sizes="100vw" className={imageClassName} />
      </motion.div>
      <CoverOverlay variant="text" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.1)}
        className="relative mx-auto flex min-h-[24rem] max-w-site flex-col justify-end px-6 pb-16 pt-36 sm:min-h-[28rem] lg:min-h-[30rem]"
      >
        {/* Mesmo ritmo vertical da Hero da Home: breadcrumb → título (mt-7/8) < título → subtítulo (mt-8/10). */}
        <motion.nav variants={item} aria-label={t('a11y.breadcrumb')}>
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
        <motion.h1 variants={item} className={cn('hero-title mt-7 text-balance text-white sm:mt-8', titleClassName)}>
          {title}
        </motion.h1>
        <motion.p variants={item} className={cn('mt-8 text-pretty text-lg leading-relaxed text-white/80 sm:mt-10 sm:text-xl', subtitleClassName)}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  )
}
