'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Carousel from '@/components/ui/Carousel'
import CountUp from '@/components/ui/CountUp'
import CoverOverlay from '@/components/ui/CoverOverlay'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'

// Seções reaproveitadas em mais de uma página.

export function SolutionsGrid({ limit }: { limit?: number }) {
  const {
    content: { solutions },
  } = useI18n()
  const items = limit ? solutions.slice(0, limit) : solutions
  return (
    <Reveal className="grid gap-px overflow-hidden rounded-card border border-linha bg-linha sm:grid-cols-2 lg:grid-cols-3">
      {items.map((solution, index) => (
        <RevealItem key={solution.id} className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-off-white">
          <span className="stat-numeral absolute right-8 top-8 text-sm font-semibold text-preto/25">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-card bg-cobalto/10 text-cobalto transition-colors group-hover:bg-cobalto group-hover:text-white">
            <Icon name={solution.icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-xl">{solution.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-suave">{solution.description}</p>
        </RevealItem>
      ))}
    </Reveal>
  )
}

const ARROW_CLASS =
  'flex h-10 w-10 items-center justify-center rounded-card border border-preto/15 text-preto transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto disabled:pointer-events-none disabled:opacity-35'

/**
 * Setores em carrossel horizontal de uma linha (Home). Mesmos cards do antigo grid (cores, borda, ícone,
 * tipografia, contagem de produtos, hover e link para `/products?industry=`), agora numa faixa rolável.
 *
 * - Rolagem nativa com `scroll-snap`: o swipe no toque, a inércia e a acessibilidade vêm do navegador; as
 *   setas só chamam `scrollBy` (transição suave, sem autoplay) e ficam desabilitadas nas pontas.
 * - Cards visíveis: 1 (com "espiada" do próximo) no mobile estreito, 2 (≥480px), 3 (≥640px), 4 (≥768px)
 *   e 6 (≥1024px). Cada clique nas setas avança uma "página" (a quantidade visível naquele momento).
 * - Altura uniforme: os cards são flex items do mesmo contêiner (stretch) com `h-full` e `min-h` fixo.
 * - Setas abaixo dos cards, à direita, no mesmo estilo das setas do `Carousel` (Trust Group).
 */
export function IndustriesCarousel() {
  const {
    t,
    content: { industries, productsForIndustry },
  } = useI18n()
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const start = track.scrollLeft <= 1
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [updateEdges])

  function scrollPage(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const first = track.firstElementChild as HTMLElement | null
    const second = first?.nextElementSibling as HTMLElement | null
    const step = first && second ? second.offsetLeft - first.offsetLeft : first?.offsetWidth ?? 0
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / (step || 1)))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * visible * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section aria-roledescription="carousel" aria-label={t('home.industries.carouselLabel')}>
      <Reveal>
        <RevealItem>
          {/* `-m-1 p-1`: folga para o contorno de foco e o hover não serem cortados pelo overflow. */}
          <ul
            ref={trackRef}
            onScroll={updateEdges}
            className="-m-1 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain p-1 [--gap:0.75rem] [-ms-overflow-style:none] [scroll-padding-inline:0.25rem] [scrollbar-width:none] xl:gap-4 xl:[--gap:1rem] [&::-webkit-scrollbar]:hidden"
          >
            {industries.map((industry, index) => (
              <li
                key={industry.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={t('home.industries.slideLabel', { current: index + 1, total: industries.length })}
                className="flex shrink-0 basis-[85%] snap-start min-[480px]:basis-[calc((100%-var(--gap))/2)] sm:basis-[calc((100%-var(--gap)*2)/3)] md:basis-[calc((100%-var(--gap)*3)/4)] lg:basis-[calc((100%-var(--gap)*5)/6)]"
              >
                <Link
                  href={`/products?industry=${industry.slug}`}
                  draggable={false}
                  className="group flex h-full min-h-[11rem] w-full flex-col gap-6 rounded-card border border-linha bg-white p-6 transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white lg:min-h-[12rem] lg:p-4 xl:p-5"
                >
                  <div className="flex items-start justify-between">
                    <Icon name={industry.icon} className="h-8 w-8 text-cobalto transition-colors group-hover:text-white" />
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="flex-1 text-balance text-lg leading-snug lg:text-base xl:text-lg">{industry.name}</h3>
                    <p className="mt-2 text-sm text-suave transition-colors group-hover:text-white/80">
                      {t('common.productCount', { count: productsForIndustry(industry.slug).length })}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </RevealItem>
      </Reveal>

      <div className="mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollPage(-1)}
          disabled={edges.start}
          aria-label={t('home.industries.prev')}
          className={ARROW_CLASS}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollPage(1)}
          disabled={edges.end}
          aria-label={t('home.industries.next')}
          className={ARROW_CLASS}
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export function AudienceSplit() {
  const {
    content: { audiences },
  } = useI18n()
  const blocks = [
    { key: 'buyers', ...audiences.buyers },
    { key: 'suppliers', ...audiences.suppliers },
  ]
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {blocks.map((block, index) => (
        <div
          key={block.key}
          className={cn(
            'relative flex flex-col overflow-hidden rounded-card p-8 sm:p-12',
            index === 0 ? 'bg-preto text-white' : 'bg-cobalto text-white'
          )}
        >
          <p className={cn('eyebrow', index === 0 ? 'text-cobalto-claro' : 'text-white/80')}>{block.eyebrow}</p>
          <h3 className="mt-4 max-w-md text-balance text-[clamp(1.6rem,2.4vw,2.1rem)]">{block.title}</h3>
          <ul className="mt-8 flex-1 space-y-4">
            {block.items.map((item) => (
              <li key={item.id} className="flex gap-3 text-base leading-relaxed text-white/85">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-white" />
                {item.text}
              </li>
            ))}
          </ul>
          <Button
            href={block.cta.href}
            variant={index === 0 ? 'primary' : 'dark'}
            arrow
            className="relative mt-10 self-start"
          >
            {block.cta.label}
          </Button>
        </div>
      ))}
    </div>
  )
}

/** Logo vertical do Trust Group (recortada nas bordas): primeiro bloco da faixa de Big Numbers. */
const TRUST_GROUP_LOGO = {
  src: '/brand/trust-group-vertical.png',
  width: 799,
  height: 606,
  className: 'h-14 w-auto sm:h-16 lg:h-[4.5rem]',
}

/**
 * Big Numbers (About, logo abaixo de "Por que a Navigal existe"): sem título nem texto de apoio; logo do
 * Trust Group centralizada no topo e, abaixo, os 7 indicadores (só número e descrição, sem ícone, card,
 * borda ou sombra). Os indicadores vêm de `bigNumbers`, a única fonte desses números no site.
 * Grade de 8 colunas em ≥768px: cada indicador ocupa 2, então a 1ª linha tem 4 e a 2ª tem 3, centralizada
 * (o 5º item começa na coluna 2). Mobile: 2 colunas; o 7º indicador ocupa a linha inteira, para não sobrar
 * um item solto. Em <640px o CSS global (`.text-center` → esquerda, app/globals.css) alinha os indicadores
 * à esquerda, como nos demais blocos do site; a logo é um flex centralizado (não depende de `text-align`).
 * A nota do ranking, centralizada abaixo, é a mesma da seção de certificações.
 */
export function BigNumbersSection() {
  const {
    content: { bigNumbers, rankingFootnote },
  } = useI18n()
  return (
    <Section tone="muted" className="py-10 sm:py-12">
      <Reveal className="grid grid-cols-2 items-start gap-x-6 gap-y-8 md:grid-cols-8 md:gap-y-10 lg:gap-x-8">
        <RevealItem className="col-span-2 flex items-center justify-center md:col-span-8">
          <Image
            src={TRUST_GROUP_LOGO.src}
            alt="Trust Group"
            width={TRUST_GROUP_LOGO.width}
            height={TRUST_GROUP_LOGO.height}
            className={TRUST_GROUP_LOGO.className}
          />
        </RevealItem>
        {bigNumbers.map((item, index) => (
          <RevealItem
            key={item.id}
            className={`flex flex-col items-center text-center md:col-span-2 ${index === 4 ? 'md:col-start-2' : ''} ${
              index === bigNumbers.length - 1 ? 'col-span-2' : ''
            }`}
          >
            <CountUp
              to={item.count}
              prefix={item.prefix}
              suffix={item.suffix}
              className="stat-numeral block whitespace-nowrap text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-none tracking-tight text-cobalto lg:text-[clamp(1.75rem,2.9vw,2.5rem)]"
            />
            <p className="mt-2 max-w-[16rem] text-pretty text-sm leading-snug text-suave sm:text-base">{item.label}</p>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-suave">{rankingFootnote}</p>
    </Section>
  )
}

/** Rótulo de seção no mesmo padrão do `SectionHeading` (usado nos slides sem título principal). */
function SlideEyebrow({ children }: { children: string }) {
  return (
    <p className="eyebrow text-cobalto">{children}</p>
  )
}

/**
 * "Parte do Trust Group": carrossel de 2 slides (contexto, empresas; os números ficam nos Big Numbers)
 * à esquerda e montagem de 3 fotos à direita (1 grande + 2 menores).
 * Mobile/tablet: carrossel primeiro, montagem depois.
 */
export function TrustGroupSection() {
  const {
    t,
    content: { trustGroupLines },
  } = useI18n()

  const slides = [
    // 1. Contexto institucional
    <div key="context">
      <SectionHeading
        eyebrow={t('trust.eyebrow')}
        title={t('trust.title')}
        intro={
          <>
            <p>{t('trust.p1')}</p>
            <p className="mt-5 border-l-2 border-cobalto pl-4 font-semibold text-preto">{t('trust.p2')}</p>
          </>
        }
      />
    </div>,

    // 2. Ecossistema de empresas
    <div key="lines">
      <SlideEyebrow>{t('trust.eyebrow')}</SlideEyebrow>
      <h3 className="mt-4 text-lg leading-snug">{trustGroupLines.title}</h3>
      <ul className="mt-4 divide-y divide-preto/10 border-y border-preto/10">
        {trustGroupLines.items.map((line) => (
          <li key={line.id} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-6">
            <span className="text-base font-semibold sm:w-48 sm:shrink-0">{line.name}</span>
            <span className="text-[0.9375rem] leading-snug text-suave">{line.description}</span>
          </li>
        ))}
      </ul>
      <Button href="https://trust.group" variant="link" arrow className="mt-5">
        {t('trust.visit')}
      </Button>
    </div>,
  ]

  return (
    <Section tone="muted">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <Carousel
          className="mx-auto w-full max-w-2xl lg:max-w-none"
          label={t('trust.carouselLabel')}
          slides={slides}
          labels={{
            prev: t('trust.prev'),
            next: t('trust.next'),
            slide: (current, total) => t('trust.slideLabel', { current, total }),
            goTo: (n) => t('trust.goTo', { n }),
          }}
        />

        {/* Montagem: foto larga em cima, duas menores lado a lado. Mesmos cantos e espaçamento. */}
        <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3 sm:gap-4 lg:max-w-none lg:grid-rows-[3fr_2fr]">
          <div className="relative col-span-2 aspect-[2.2/1] overflow-hidden lg:aspect-auto rounded-card">
            <Image
              src="/images/trust-group-warehouse-aerial.jpg"
              alt={t('trust.imageAlt')}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 672px) 672px, 100vw"
              className="object-cover object-[50%_60%]"
            />
            <div className="absolute bottom-0 left-0 rounded-tr-card bg-white px-4 py-2.5 sm:px-5 sm:py-3">
              <Image
                src="/brand/trust-group-horizontal.png"
                alt="Trust Group"
                width={1134}
                height={294}
                className="h-6 w-auto sm:h-7"
              />
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card lg:aspect-auto">
            <Image
              src="/images/trust-group-container-handling.webp"
              alt={t('trust.imageAlt2')}
              fill
              sizes="(min-width: 1024px) 264px, (min-width: 672px) 330px, 50vw"
              className="object-cover object-[38%_50%]"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card lg:aspect-auto">
            <Image
              src="/images/trust-group-warehouse-operation.webp"
              alt={t('trust.imageAlt3')}
              fill
              sizes="(min-width: 1024px) 264px, (min-width: 672px) 330px, 50vw"
              className="object-cover object-[45%_40%]"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

export function CtaBand({
  title,
  body,
  image = '/images/handshake-dark.jpg',
  imageClassName = 'object-cover',
  tone = 'photo',
}: {
  title?: string
  body?: string
  image?: string
  imageClassName?: string
  /** `photo` (padrão): foto + overlay. `blue`: fundo azul institucional sólido (#071A33, mesmo azul das capas), sem foto. */
  tone?: 'photo' | 'blue'
}) {
  const {
    t,
    content: { quoteCta },
  } = useI18n()
  return (
    <section className={cn('relative isolate overflow-hidden text-white', tone === 'blue' ? 'bg-[#071A33]' : 'bg-preto')}>
      {tone === 'photo' && (
        <>
          <Image src={image} alt="" aria-hidden="true" fill sizes="100vw" className={imageClassName} />
          <CoverOverlay />
        </>
      )}
      <div className="relative mx-auto max-w-site px-6 py-24 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)]">{title ?? t('cta.title')}</h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/80">{body ?? t('cta.body')}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={quoteCta.href} arrow>
              {quoteCta.label}
            </Button>
            <Button href="/products" variant="outline">
              {t('common.viewProducts')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Bloco "Certifications & compliance" (About e /suppliers). */
export function CertificationsSection() {
  const {
    t,
    content: { certifications, certificationsFootnote },
  } = useI18n()
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t('certs.eyebrow')} title={t('certs.title')} align="center" />
      <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item) => (
          <RevealItem key={item.id} className="rounded-card border border-linha bg-white p-7">
            {item.badges ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                {item.badges.map((badge, i) => (
                  <Image
                    key={badge.src}
                    src={badge.src}
                    alt={item.badgeAlts?.[i] ?? item.title}
                    width={badge.width}
                    height={badge.height}
                    sizes="140px"
                    className={`${badge.size === 'md' ? 'h-16' : 'h-12'} w-auto max-w-full`}
                  />
                ))}
              </div>
            ) : item.badge ? (
              <Image
                src={item.badge}
                alt={item.badgeAlt ?? item.title}
                width={item.badgeWidth ?? 256}
                height={item.badgeHeight ?? 120}
                sizes="(min-width: 1024px) 260px, 200px"
                className="h-16 w-auto max-w-full object-contain object-left"
              />
            ) : (
              <Icon name={item.icon} className="h-7 w-7 text-cobalto" />
            )}
            <h3 className="mt-5 text-lg">{item.title}</h3>
            {item.holder && <p className="mt-1 text-sm font-semibold text-cobalto">{item.holder}</p>}
            <p className="mt-2 text-base leading-relaxed text-suave">{item.description}</p>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-suave">{certificationsFootnote}</p>
    </Section>
  )
}

/** Logística no Brasil via Taglog (/suppliers). */
export function TaglogSection() {
  const {
    t,
    content: { taglog },
  } = useI18n()
  return (
    <Section>
      <SectionHeading
        eyebrow={t('taglog.eyebrow')}
        title={t('taglog.title')}
        intro={taglog.licensed}
      />
      <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {taglog.hubs.map((hub) => (
          <RevealItem key={hub.id} className="rounded-card border border-linha bg-white p-7">
            <h3 className="text-lg">{hub.site}</h3>
            <p className="stat-numeral mt-4 text-2xl font-bold">{hub.area}</p>
            <p className="mt-1 text-base text-suave">{hub.pallets}</p>
            <p className="mt-4 border-t border-linha pt-4 text-sm text-suave">{hub.access}</p>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mt-8 text-lg font-bold">
        {t('taglog.total')} <span className="stat-numeral">{taglog.total.area}</span> · <span className="stat-numeral">{taglog.total.pallets}</span>
      </p>
    </Section>
  )
}

/**
 * "Our commitment" (About): conteúdo institucional à esquerda (título, blocos Ética/Compliance e
 * Instituto Trust e faixa de selos) e foto vertical do Instituto Trust à direita. Mesma lógica da
 * "We handle the hard parts" (Home), espelhada: a foto é "sangrada", ocupa a altura inteira da
 * seção (topo ao fim) e encosta na borda direita da tela; o texto mantém o alinhamento do container
 * (`max-w-site` + `px-6`). A ordem do DOM é a do mobile (texto, selos e, por último, a foto, em
 * largura total); no desktop a foto fica na coluna da direita (lg:col-start-2).
 */
export function CommitmentSection() {
  const {
    t,
    content: { commitment, commitmentSeals },
  } = useI18n()
  return (
    <Section className="py-0 sm:py-0" containerClassName="!max-w-none !px-0">
      <div className="grid items-stretch lg:grid-cols-[1.15fr_0.85fr]">
        <div className="px-6 py-16 sm:py-20 lg:col-start-1 lg:row-start-1 lg:py-28 lg:pl-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))] lg:pr-14 xl:pr-20">
          <SectionHeading eyebrow={t('commitment.eyebrow')} title={t('commitment.title')} />

          <Reveal className="mt-12 divide-y divide-linha border-y border-linha">
            {commitment.map((item) => (
              <RevealItem key={item.id} className="grid gap-4 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-cobalto/10 text-cobalto">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-[0.08em] text-cobalto">{item.title}</h3>
                  <div className="mt-3 space-y-3 text-pretty text-lg leading-relaxed text-suave">
                    {item.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
          <div className="mt-12 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-4">
            <p className="eyebrow shrink-0 text-suave">{t('commitment.sealsTitle')}</p>
            {/* Selos 30% menores que o original (4.5/5.25/5.75rem x 0,7) e agrupados à esquerda,
                logo ao lado do rótulo, em vez de distribuídos pela largura da seção. */}
            <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-5 [--seal-size:3.15rem] sm:gap-x-5 sm:[--seal-size:3.675rem] lg:mt-0 lg:[--seal-size:4.025rem]">
              {commitmentSeals.map((seal) => (
                <li key={seal.id} className="flex items-center">
                  <Image
                    src={seal.src}
                    alt={seal.alt}
                    width={seal.width}
                    height={seal.height}
                    sizes="(min-width: 1024px) 180px, 140px"
                    style={{ height: `calc(var(--seal-size) * ${seal.scale})`, width: 'auto' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/3] lg:col-start-2 lg:row-start-1 lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src="/images/instituto-trust-criancas.webp"
            alt={t('commitment.imageAlt')}
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover object-[40%_center]"
          />
        </div>
      </div>
    </Section>
  )
}
