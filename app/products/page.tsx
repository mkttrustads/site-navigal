import { Suspense } from 'react'
import PageHero from '@/components/ui/PageHero'
import Section, { SectionHeading } from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ProductCatalog from '@/components/sections/ProductCatalog'
import { CtaBand } from '@/components/sections/Shared'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Products',
  description:
    'The Navigal Winner Mix: fertilizers, industrial chemicals, water treatment, cosmetics and food ingredients, polyurethanes and resins sourced from qualified manufacturers worldwide.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <>
      <PageHero
        image="/images/chemicals-drums.jpg"
        title="The Winner Mix portfolio."
        subtitle="Strategic raw materials from qualified manufacturers worldwide, with the best import conditions for Latin American industry."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Let’s grow together"
          title="Raw materials of excellence for many industrial sectors."
          intro="For these products we have proven experience and can offer the best conditions for import. We work with renowned manufacturers and provide reliable quality control and financial support."
        />
        <div className="mt-14">
          <Suspense fallback={null}>
            <ProductCatalog />
          </Suspense>
        </div>
      </Section>

      <Section tone="muted" className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 rounded-card border border-linha bg-white p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-cobalto">On-demand sourcing</p>
            <h2 className="mt-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">Looking for a product that is not listed?</h2>
            <p className="mt-4 text-base leading-relaxed text-suave">
              Send us the product, technical specification, CAS number, end use and annual volume. We will find the
              suppliers that best match your requirement, even in other segments.
            </p>
          </div>
          <Button href="/contact" arrow className="shrink-0 self-start lg:self-center">
            Send your requirement
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
