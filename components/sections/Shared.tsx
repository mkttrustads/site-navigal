import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import GlobeMark from '@/components/ui/GlobeMark'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { audiences, solutions } from '@/content/solutions'
import { industries } from '@/content/industries'
import { productsForIndustry } from '@/content/products'
import { quoteCta, trustGroupFacts } from '@/content/site'
import { cn } from '@/lib/utils'

// Seções reaproveitadas em mais de uma página.

export function SolutionsGrid({ limit }: { limit?: number }) {
  const items = limit ? solutions.slice(0, limit) : solutions
  return (
    <Reveal className="grid gap-px overflow-hidden rounded-card border border-linha bg-linha sm:grid-cols-2 lg:grid-cols-3">
      {items.map((solution, index) => (
        <RevealItem key={solution.title} className="group relative flex flex-col bg-white p-8 transition-colors hover:bg-off-white">
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
  const dark = tone === 'dark'
  return (
    <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.05}>
      {industries.map((industry) => (
        <RevealItem key={industry.slug}>
          <Link
            href={`/products?industry=${industry.slug}`}
            className={cn(
              'group flex h-full flex-col justify-between gap-8 rounded-card border p-6 transition-colors',
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
            <div>
              <h3 className="text-lg leading-snug">{industry.name}</h3>
              <p className={cn('mt-2 text-sm transition-colors group-hover:text-white/80', dark ? 'text-white/60' : 'text-suave')}>
                {productsForIndustry(industry.slug).length} products
              </p>
            </div>
          </Link>
        </RevealItem>
      ))}
    </Reveal>
  )
}

export function AudienceSplit() {
  const blocks = [audiences.buyers, audiences.suppliers]
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {blocks.map((block, index) => (
        <div
          key={block.eyebrow}
          className={cn(
            'relative flex flex-col overflow-hidden rounded-card p-8 sm:p-12',
            index === 0 ? 'bg-preto text-white' : 'bg-cobalto text-white'
          )}
        >
          <GlobeMark tone="dark" className="absolute -bottom-16 -right-16 h-64 opacity-[0.08]" />
          <p className={cn('eyebrow', index === 0 ? 'text-cobalto-claro' : 'text-white/80')}>{block.eyebrow}</p>
          <h3 className="mt-4 max-w-md text-balance text-[clamp(1.6rem,2.4vw,2.1rem)]">{block.title}</h3>
          <ul className="mt-8 flex-1 space-y-4">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-white/85">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-white" />
                {item}
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

export function TrustGroupSection() {
  return (
    <Section tone="muted">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="A Trust Group company"
            title="Global reach, backed by a full-service group on the ground."
            intro={
              <>
                <p>
                  Navigal is part of Trust Group, one of Brazil&rsquo;s leading foreign trade groups. Every operation can
                  be integrated with the group&rsquo;s companies: customs brokerage, international freight forwarding,
                  warehousing and national distribution.
                </p>
                <p className="mt-4">One partner from the supplier&rsquo;s gate to your plant.</p>
              </>
            }
          />
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-preto/10 pt-8">
            {trustGroupFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="mt-1 text-sm text-suave">{fact.label}</dt>
                <dd className="stat-numeral order-first text-3xl font-bold text-preto">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <Button href="https://trust.group" variant="link" arrow className="mt-10">
            Visit trust.group
          </Button>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src="/images/trust-group-warehouse-aerial.jpg"
            alt="Aerial view of a Trust Group logistics center in Brazil"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 rounded-tr-card bg-white px-6 py-4">
            <Image src="/brand/trust-group-horizontal.png" alt="Trust Group" width={1134} height={294} className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </Section>
  )
}

export function CtaBand({
  title = 'Step out of local distributors’ hands and import your own product line.',
  body = 'Send us the technical specification, end use and annual volume. We will come back with an analysis and supply options.',
  image = '/images/handshake-dark.jpg',
}: {
  title?: string
  body?: string
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-preto text-white">
      <Image src={image} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-preto via-preto/90 to-preto/40" />
      <GlobeMark tone="dark" className="absolute -right-10 top-1/2 hidden h-[140%] -translate-y-1/2 opacity-[0.08] md:block" />
      <div className="relative mx-auto max-w-site px-6 py-24 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)]">{title}</h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/80">{body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={quoteCta.href} arrow>
              {quoteCta.label}
            </Button>
            <Button href="/products" variant="outline">
              View products
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
