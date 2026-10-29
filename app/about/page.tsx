import Image from 'next/image'
import { MapPin } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import GlobeMark from '@/components/ui/GlobeMark'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { CtaBand, TrustGroupSection } from '@/components/sections/Shared'
import { milestones, mission, offices, principles, values } from '@/content/about'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About Navigal',
  description:
    'Founded in Panama in 2008 and operating from the United Arab Emirates, Navigal is a Trust Group company connecting global suppliers to Latin American industry.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/office-meeting.jpg"
        title="Multinational intelligence, driving Latin American industry."
        subtitle="We structure international supply chains and trade strategic raw materials, connecting the world’s key trade hubs to practical, secure execution."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Our story"
            title="Navigate international business with us."
            intro={
              <>
                <p>
                  Founded in Panama in 2008 and now operating from the United Arab Emirates, Navigal manages the
                  supply of products mainly for the chemical, agribusiness, thermoplastic resin and specialty input
                  segments, with a clear focus on Latin America.
                </p>
                <p className="mt-4">
                  Our competitive advantage is our close relationship with the region&rsquo;s industrial markets: we
                  evaluate each opportunity on the ground and help our clients see the world differently, uncovering
                  opportunities they may never have imagined.
                </p>
              </>
            }
          />
          <Reveal className="relative border-l border-linha pl-8 sm:pl-10">
            {milestones.map((milestone) => (
              <RevealItem key={milestone.title} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-cobalto ring-1 ring-cobalto sm:-left-[2.85rem]"
                />
                <p className="eyebrow text-cobalto">{milestone.label}</p>
                <h3 className="mt-2 text-xl">{milestone.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-suave">{milestone.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-preto text-white">
        <GlobeMark tone="dark" className="absolute -left-20 top-1/2 h-[120%] -translate-y-1/2 opacity-[0.06]" />
        <div className="relative mx-auto grid max-w-site gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow text-cobalto-claro">Our mission</p>
            <p className="mt-6 text-balance text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold leading-snug">{mission}</p>
          </div>
          <Reveal className="grid gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-3">
            {principles.map((principle) => (
              <RevealItem key={principle.title} className="bg-preto p-7">
                <Icon name={principle.icon} className="h-7 w-7 text-cobalto-claro" />
                <h3 className="mt-5 text-lg">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{principle.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeading eyebrow="Our values" title="What guides every operation." align="center" />
        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value) => (
            <RevealItem key={value.title} className="rounded-card border border-linha bg-white p-7">
              <Icon name={value.icon} className="h-7 w-7 text-cobalto" />
              <h3 className="mt-5 text-lg">{value.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-suave">{value.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/latam-rio.jpg"
              alt="Rio de Janeiro bay with Sugarloaf Mountain"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Global presence"
              title="Present where trade happens."
              intro="A presence that combines the sophistication of global hubs with first-hand knowledge of Latin American markets."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {offices.map((office) => (
                <li key={office.country} className="border-t-2 border-preto pt-5">
                  <p className="flex items-center gap-2 text-lg font-bold">
                    <MapPin aria-hidden="true" className="h-5 w-5 text-cobalto" />
                    {office.country}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-cobalto">{office.role}</p>
                  <p className="mt-2 text-base leading-relaxed text-suave">{office.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <TrustGroupSection />

      <CtaBand />
    </>
  )
}
