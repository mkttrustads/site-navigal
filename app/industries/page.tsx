import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/sections/Shared'
import { industries } from '@/content/industries'
import { productsForIndustry } from '@/content/products'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Industries',
  description:
    'Raw materials for agribusiness, cosmetics and home care, water treatment, food and pharma, automotive, polyurethanes, coatings, textile and plastics in Latin America.',
  path: '/industries',
})

// Fotos de apoio entre os blocos — só setores com imagem própria disponível.
const highlights = [
  { image: '/images/sulfur-plant.jpg', caption: 'Sulfur for the fertilizer industry' },
  { image: '/images/resins.jpg', caption: 'Thermoplastic resins' },
  { image: '/images/quality-lab.jpg', caption: 'Quality control at origin' },
]

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        image="/images/bulk-vessel-loading.jpg"
        title="Industries we supply."
        subtitle="We work in sectors with demanding technical and regulatory standards, where a secure, predictable supply makes the difference."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Sectors"
          title="Delivering essential products to Latin American industry."
          intro="Through the Winner Mix we bring Brazilian and Latin American manufacturers the best purchasing opportunities to expand their business."
        />
        <Reveal className="mt-14 divide-y divide-linha border-y border-linha" stagger={0.05}>
          {industries.map((industry) => {
            const items = productsForIndustry(industry.slug)
            return (
              <RevealItem key={industry.slug}>
                <article id={industry.slug} className="grid scroll-mt-28 gap-6 py-10 lg:grid-cols-[0.9fr_1.4fr_auto] lg:items-start lg:gap-12">
                  <div className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-cobalto/10 text-cobalto">
                      <Icon name={industry.icon} className="h-7 w-7" />
                    </span>
                    <div>
                      <h2 className="text-2xl">{industry.name}</h2>
                      <p className="mt-2 text-base leading-relaxed text-suave">{industry.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2 lg:pt-1">
                    {items.map((product) => (
                      <li key={product.slug} className="rounded-full border border-linha px-3 py-1.5 text-sm text-preto/80">
                        {product.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/products?industry=${industry.slug}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap text-base font-semibold text-cobalto hover:underline lg:pt-1"
                  >
                    View products
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              </RevealItem>
            )
          })}
        </Reveal>
      </Section>

      <section className="grid sm:grid-cols-3" aria-label="Photo highlights">
        {highlights.map((highlight) => (
          <figure key={highlight.image} className="relative aspect-[4/3] overflow-hidden bg-preto">
            <Image src={highlight.image} alt={highlight.caption} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover opacity-80" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-preto/90 to-transparent p-6 text-base font-semibold text-white">
              {highlight.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <CtaBand />
    </>
  )
}
