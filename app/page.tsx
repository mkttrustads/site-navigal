import Image from 'next/image'
import HomeHero from '@/components/sections/HomeHero'
import RouteMap from '@/components/sections/RouteMap'
import { AudienceSplit, CtaBand, IndustriesGrid, SolutionsGrid, TrustGroupSection } from '@/components/sections/Shared'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Navigal Trading Solutions | International Trading for Latin American Industry',
  description:
    'Navigal structures international supply chains and trades strategic raw materials for Latin American industry: qualified global suppliers, managed risk and door-to-door delivery.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <RevealItem>
              <SectionHeading
                eyebrow="Who we are"
                title="A global trading platform for Latin American industry."
                intro={
                  <>
                    <p>
                      Founded in Panama in 2008 and operating from the United Arab Emirates, Navigal connects the
                      world&rsquo;s most relevant production hubs to the industries of Brazil and Latin America.
                    </p>
                    <p className="mt-4">
                      We combine market intelligence, rigorous risk management and a global presence to turn complex
                      supply chains into predictable pathways, so our clients can buy better and grow with confidence.
                    </p>
                  </>
                }
              />
            </RevealItem>
            <RevealItem className="mt-10">
              <Button href="/about" variant="link" arrow>
                About Navigal
              </Button>
            </RevealItem>
          </Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/bulk-vessel-loading.jpg"
                alt="Bulk raw material being loaded into a vessel's hold"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-card bg-preto p-6 text-white shadow-2xl sm:left-auto sm:right-8 sm:w-72">
              <p className="eyebrow text-cobalto-claro">Our mission</p>
              <p className="mt-3 text-base leading-relaxed text-white/85">
                To find the best possible combination of quality, price and capability for each client&rsquo;s business.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="End-to-end international trading solutions."
            intro="From supplier development at origin to delivery at your plant, with reliability, quality and ease at every step."
          />
          <Button href="/solutions" variant="link" arrow className="shrink-0">
            All solutions
          </Button>
        </div>
        <div className="mt-14">
          <SolutionsGrid />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Industries"
            title="Raw materials for sectors with demanding technical and regulatory standards."
          />
          <Button href="/products" variant="link" arrow className="shrink-0">
            Full portfolio
          </Button>
        </div>
        <div className="mt-14">
          <IndustriesGrid />
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <SectionHeading
            tone="dark"
            eyebrow="Global network"
            title="Where global supply meets Latin American demand."
            intro={
              <>
                <p>
                  Strategically based in the United Arab Emirates, one of the most dynamic trade hubs in the world, we
                  work alongside manufacturers in Asia, Europe and the Middle East.
                </p>
                <p className="mt-4">
                  Our team in Brazil keeps us close to industrial buyers across Latin America, where we evaluate every
                  opportunity first-hand.
                </p>
              </>
            }
          />
          <RouteMap />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Who we serve" title="Two sides of the same trusted connection." align="center" />
        <div className="mt-14">
          <AudienceSplit />
        </div>
      </Section>

      <TrustGroupSection />

      <CtaBand />
    </>
  )
}
