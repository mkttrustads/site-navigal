import { Check } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import ContactForm from '@/components/forms/ContactForm'
import RouteMap from '@/components/sections/RouteMap'
import { audiences } from '@/content/solutions'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'For Suppliers',
  description:
    'International manufacturers: enter Brazil and Latin America with Navigal. Local sales force, licensed logistics for regulated products and long-term partnerships.',
  path: '/suppliers',
})

// "What are we looking for?" — apresentação comercial (ULTIMA APRESENTAÇÃO).
const lookingFor = [
  { icon: 'handshake', title: 'A trustworthy partner', description: 'Transparent, compliant and consistent in every negotiation.' },
  { icon: 'clock', title: 'Long-term relationships', description: 'Partnerships designed to grow over many years, not single deals.' },
  { icon: 'target', title: 'A hands-on approach', description: 'Close collaboration on specifications, documentation and logistics.' },
  { icon: 'badgeCheck', title: 'Products with quality', description: 'Stable, certified quality that meets industrial specifications.' },
  { icon: 'truck', title: 'Delivery on time', description: 'Reliable production planning and on-time shipments.' },
]

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        image="/images/handshake-sky.jpg"
        title="Grow with Navigal’s clients across Latin America."
        subtitle="Register your company and the products you manufacture or trade. We work at every stage, from prospecting to delivery to the client."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'For Suppliers', path: '/suppliers' },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow={audiences.suppliers.eyebrow}
            title={audiences.suppliers.title}
            intro="Brazil and Latin America are among the most promising markets for industrial inputs, and among the most complex. Navigal knows the region’s regulatory, customs, logistics and payment requirements and turns them into a clear path to market."
          />
          <ul className="space-y-5 self-center">
            {[
              ...audiences.suppliers.items,
              'Local sales force with clients in agribusiness, food, pharma, water treatment and automotive',
            ].map((item) => (
              <li key={item} className="flex gap-4 border-b border-linha pb-5 text-lg leading-relaxed">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalto text-white">
                  <Check aria-hidden="true" className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="What we look for" title="The partners we build with." align="center" />
        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {lookingFor.map((item) => (
            <RevealItem key={item.title} className="rounded-card border border-linha bg-white p-7">
              <Icon name={item.icon} className="h-7 w-7 text-cobalto" />
              <h3 className="mt-5 text-lg">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-suave">{item.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
          <SectionHeading
            tone="dark"
            eyebrow="Your gateway"
            title="From your plant to Latin American industry."
            intro="Combined with Trust Group’s licensed structure in Brazil, we handle customs, storage and delivery of regulated and dangerous goods, with full visibility of each operation."
          />
          <RouteMap />
        </div>
      </Section>

      <Section id="register">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeading
            eyebrow="Become a supplier"
            title="Register your company."
            intro="Tell us about your products and capacity. Our team will review your profile and contact you to discuss the next steps."
          />
          <div className="rounded-card border border-linha bg-white p-6 shadow-sm sm:p-10">
            <ContactForm type="supplier" />
          </div>
        </div>
      </Section>
    </>
  )
}
