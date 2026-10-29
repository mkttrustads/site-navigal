import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { AudienceSplit, CtaBand, SolutionsGrid } from '@/components/sections/Shared'
import { processSteps, riskPillars } from '@/content/solutions'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Solutions',
  description:
    'Supplier sourcing and negotiation, quality assessment, process management and door-to-door control for international purchases of raw materials.',
  path: '/solutions',
})

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        image="/images/port-sunset.jpg"
        title="End-to-end international trading solutions."
        subtitle="Reliability, quality and ease across every link of your supply chain, from the supplier’s gate to your plant."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Discover international business opportunities."
          intro="We buy and sell international products, with special expertise in our Winner Mix portfolio, and tailor each solution to your specific needs. As a sourcing company, we keep expanding our network of clients and suppliers to offer the best connection for everyone involved."
        />
        <div className="mt-14">
          <SolutionsGrid />
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow="How it works"
          title="From requirement to delivery, one accountable partner."
          intro="Send us the details of your requirement and we will quickly come back with an offer for your analysis."
        />
        <Reveal className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {processSteps.map((step, index) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="stat-numeral flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cobalto-claro text-base font-bold text-cobalto-claro">
                  {index + 1}
                </span>
                {index < processSteps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-cobalto to-transparent md:block" />
                )}
              </div>
              <h3 className="mt-6 text-lg">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-white/70">{step.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Risk management"
            title="Predictability is built, link by link."
            intro="International supply of regulated and dangerous goods demands more than a good price. We govern the risks that matter to industry, so every shipment arrives compliant, on specification and on time."
          />
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {riskPillars.map((pillar) => (
              <RevealItem key={pillar.title} className="rounded-card border border-linha bg-white p-7">
                <Icon name={pillar.icon} className="h-7 w-7 text-cobalto" />
                <h3 className="mt-5 text-lg">{pillar.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-suave">{pillar.description}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Who we serve" title="Built for both sides of the trade." align="center" />
        <div className="mt-14">
          <AudienceSplit />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
