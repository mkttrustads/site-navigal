import { Suspense } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section from '@/components/ui/Section'
import ContactTabs from '@/components/forms/ContactTabs'
import { company } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Request a quote or register as a supplier. Navigal Trading Solutions Limited, Ras Al Khaimah, United Arab Emirates.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/latam-rio.jpg"
        title="How can we help?"
        subtitle="Let us know the details of your requirement and we will quickly send you an offer for your analysis."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.4fr] lg:gap-20">
          <aside className="space-y-10">
            <div>
              <p className="eyebrow text-cobalto">Get in touch</p>
              <h2 className="mt-4 text-[clamp(1.8rem,2.6vw,2.4rem)]">Whatever you need, we are here to help.</h2>
            </div>
            <ul className="space-y-8 text-base">
              <li className="flex gap-4">
                <Mail aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-cobalto" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${company.email}`} className="text-suave transition hover:text-cobalto">
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-cobalto" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <ul className="space-y-1">
                    {company.phones.map((phone) => (
                      <li key={phone.href}>
                        <a href={phone.href} className="text-suave transition hover:text-cobalto">
                          {phone.display}
                        </a>{' '}
                        <span className="text-sm text-suave/70">({phone.label})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-cobalto" />
                <div>
                  <p className="font-semibold">Headquarters</p>
                  <address className="not-italic leading-relaxed text-suave">
                    {company.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>
            </ul>
          </aside>
          <div className="rounded-card border border-linha bg-white p-6 shadow-sm sm:p-10">
            <Suspense fallback={null}>
              <ContactTabs />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  )
}
