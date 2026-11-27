'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
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

export function IndustriesGrid({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const {
    t,
    content: { industries, productsForIndustry },
  } = useI18n()
  const dark = tone === 'dark'
  // Grid de 12 colunas com cards de largura idêntica e linhas de mesma altura (auto-rows-fr):
  //  - lg+: 6 cards (span 2) + 5 cards centralizados (7º card começa na coluna 2)
  //  - md: 3 por linha, última linha (2 cards) centralizada
  //  - sm: 2 por linha, card final centralizado
  //  - mobile: 1 por linha
  // Se a quantidade de setores mudar, ajuste os offsets em `offsetClass`.
  const offsetClass = (index: number) => {
    if (index === 6) return 'lg:col-start-2'
    if (index === 9) return 'md:col-start-3 lg:col-start-auto'
    if (index === 10) return 'sm:col-start-4 md:col-start-auto'
    return ''
  }
  return (
    <Reveal className="grid auto-rows-fr grid-cols-12 gap-3 xl:gap-4" stagger={0.05}>
      {industries.map((industry, index) => (
        <RevealItem
          key={industry.slug}
          className={cn('col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2', offsetClass(index))}
        >
          <Link
            href={`/products?industry=${industry.slug}`}
            className={cn(
              'group flex h-full min-h-[11rem] flex-col gap-6 rounded-card border p-6 transition-colors lg:min-h-[12rem] lg:p-4 xl:p-5',
              dark
                ? 'border-white/10 bg-white/[0.03] hover:border-cobalto hover:bg-cobalto'
                : 'border-linha bg-white hover:border-cobalto hover:bg-cobalto hover:text-white'
            )}
          >
            <div className="flex items-start justify-between">
              <Icon
                name={industry.icon}
                className={cn('h-8 w-8 transition-colors group-hover:text-white', dark ? 'text-cobalto-claro' : 'text-cobalto')}
              />
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="flex-1 text-balance text-lg leading-snug lg:text-base xl:text-lg">{industry.name}</h3>
              <p className={cn('mt-2 text-sm transition-colors group-hover:text-white/80', dark ? 'text-white/60' : 'text-suave')}>
                {t('common.productCount', { count: productsForIndustry(industry.slug).length })}
              </p>
            </div>
          </Link>
        </RevealItem>
      ))}
    </Reveal>
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

/** Logo vertical do Trust Group (recortada nas bordas) da assinatura institucional dos Big Numbers. */
const BACKED_BY_LOGO = {
  src: '/brand/trust-group-vertical.png',
  width: 799,
  height: 606,
  className: 'h-10 w-auto sm:h-12',
}

/**
 * Big Numbers (About, logo abaixo de "Por que a Navigal existe"): sem título; no topo, uma
 * assinatura discreta ("Com o respaldo do" + logo do Trust Group) centralizada, e abaixo quatro
 * indicadores só com número e descrição, sem ícone, card, borda ou sombra. Desktop: 1 linha de 4;
 * tablet e mobile: grade de 2 colunas. A nota do ranking é a mesma da seção de certificações.
 * Alinhamento: em ≥640px os indicadores ficam centralizados; no mobile o CSS global
 * (`.text-center` → esquerda, app/globals.css) alinha à esquerda, como nos demais blocos do site;
 * a assinatura é um flex centralizado (não depende de `text-align`) e fica centralizada em todos os tamanhos.
 */
export function BigNumbersSection() {
  const {
    t,
    content: { bigNumbers, rankingFootnote },
  } = useI18n()
  return (
    <Section tone="muted" className="py-10 sm:py-12">
      <Reveal className="flex items-center justify-center gap-3 sm:gap-4">
        <RevealItem className="text-sm font-medium text-suave sm:text-base">{t('about.bigNumbers.backedBy')}</RevealItem>
        <RevealItem className="flex items-center">
          <Image
            src={BACKED_BY_LOGO.src}
            alt="Trust Group"
            width={BACKED_BY_LOGO.width}
            height={BACKED_BY_LOGO.height}
            className={BACKED_BY_LOGO.className}
          />
        </RevealItem>
      </Reveal>
      <Reveal className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-8 lg:grid-cols-4 lg:gap-x-8">
        {bigNumbers.map((item) => (
          <RevealItem key={item.id} className="flex flex-col items-center text-center">
            <CountUp
              to={item.count}
              prefix={item.prefix}
              suffix={item.suffix}
              className="stat-numeral block text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-none tracking-tight text-cobalto"
            />
            <p className="mt-2 max-w-[16rem] text-pretty text-sm leading-snug text-suave sm:text-base">{item.label}</p>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-relaxed text-suave">{rankingFootnote}</p>
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
 * "Parte do Trust Group": carrossel de 3 slides (contexto, números, empresas)
 * à esquerda e montagem de 3 fotos à direita (1 grande + 2 menores).
 * Mobile/tablet: carrossel primeiro, montagem depois.
 */
export function TrustGroupSection() {
  const {
    t,
    content: { rankingFootnote, trustGroupFacts, trustGroupLines },
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

    // 2. Números e estrutura
    <div key="facts">
      <SlideEyebrow>{t('trust.eyebrow')}</SlideEyebrow>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
        {trustGroupFacts.map((fact) => (
          <div key={fact.id} className="flex flex-col">
            <dt className="mt-1 text-sm leading-snug text-suave">{fact.label}</dt>
            <dd className="stat-numeral order-first text-3xl font-bold text-preto">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-xs leading-relaxed text-suave">{rankingFootnote}</p>
    </div>,

    // 3. Ecossistema de empresas
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
 * "Our commitment" (About): conteúdo institucional à esquerda (título e blocos Ética/Compliance e
 * Instituto Trust), foto vertical do Instituto Trust à direita e, abaixo das duas colunas, a faixa
 * de selos. A ordem do DOM é a do mobile: título, blocos, selos e, por último, a foto; no desktop
 * a foto sobe para a coluna da direita (lg:col-start-2 / lg:row-start-1).
 */
export function CommitmentSection() {
  const {
    t,
    content: { commitment, commitmentSeals },
  } = useI18n()
  return (
    <Section>
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <div className="lg:col-start-1 lg:row-start-1">
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
        </div>

        <div className="lg:col-span-2 lg:row-start-2 lg:flex lg:items-center lg:gap-8">
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

        <div className="relative mx-auto aspect-[5/6] w-full max-w-sm overflow-hidden rounded-card sm:max-w-md lg:col-start-2 lg:row-start-1 lg:mx-0 lg:aspect-auto lg:min-h-[28rem] lg:max-w-none">
          <Image
            src="/images/instituto-trust-criancas.webp"
            alt={t('commitment.imageAlt')}
            fill
            sizes="(min-width: 1280px) 448px, (min-width: 1024px) 384px, (min-width: 640px) 448px, 384px"
            className="object-cover object-[40%_center]"
          />
        </div>
      </div>
    </Section>
  )
}
