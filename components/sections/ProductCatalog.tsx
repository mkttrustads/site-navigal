'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, FileText, Search } from 'lucide-react'
import { products, type Product } from '@/content/products'
import { getIndustry, industries } from '@/content/industries'
import Formula from '@/components/ui/Formula'
import { cn } from '@/lib/utils'

/**
 * Portfólio com filtro por setor (sincronizado com `?industry=` na URL, para
 * os cards de setor do site apontarem direto para o filtro) e busca por nome
 * ou CAS. Produtos com ficha técnica abrem os dados do Book de serviços.
 */
export default function ProductCatalog() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const industryParam = searchParams.get('industry')
  const active = industryParam && getIndustry(industryParam) ? industryParam : 'all'
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      if (active !== 'all' && !product.industries.includes(active)) return false
      if (!q) return true
      return [product.name, product.grade, product.datasheet?.cas, product.datasheet?.chemicalName]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    })
  }, [active, query])

  function selectIndustry(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') params.delete('industry')
    else params.set('industry', slug)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Search products by name or CAS number</span>
          <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-suave" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product or CAS number"
            className="w-full rounded-card border border-linha bg-white py-3.5 pl-12 pr-4 text-base outline-none transition focus:border-cobalto"
          />
        </label>
        <p className="text-sm text-suave" aria-live="polite">
          Showing <strong className="text-preto">{filtered.length}</strong> of {products.length} products
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
        {[{ slug: 'all', name: 'All industries' }, ...industries].map((industry) => (
          <button
            key={industry.slug}
            type="button"
            onClick={() => selectIndustry(industry.slug)}
            aria-pressed={active === industry.slug}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              active === industry.slug
                ? 'border-cobalto bg-cobalto text-white'
                : 'border-linha bg-white text-preto/80 hover:border-cobalto hover:text-cobalto'
            )}
          >
            {industry.name}
          </button>
        ))}
      </div>

      {active !== 'all' && (
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-suave">{getIndustry(active)?.description}</p>
      )}

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-card border border-dashed border-linha p-10 text-center text-base text-suave">
          No products match your search. Our on-demand sourcing team can find it for you.
        </p>
      )}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const sheet = product.datasheet
  const panelId = `sheet-${product.slug}`

  return (
    <li className={cn('rounded-card border bg-white transition-colors', open ? 'border-cobalto md:col-span-2' : 'border-linha')}>
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl">{product.name}</h3>
          {(product.grade || sheet) && (
            <p className="mt-1 text-sm text-suave">
              {[product.grade, sheet && `CAS ${sheet.cas}`].filter(Boolean).join(' · ')}
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.industries.map((slug) => (
              <li key={slug} className="rounded-full bg-off-white px-3 py-1 text-xs font-semibold text-preto/70">
                {getIndustry(slug)?.name}
              </li>
            ))}
          </ul>
        </div>
        {sheet && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-card border border-linha px-4 py-2 text-sm font-semibold text-cobalto transition hover:border-cobalto"
          >
            <FileText aria-hidden="true" className="h-4 w-4" />
            Technical data
            <ChevronDown aria-hidden="true" className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {sheet && open && (
          <motion.div
            id={panelId}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 border-t border-linha p-6 lg:grid-cols-[0.9fr_1.4fr]">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 self-start rounded-card bg-off-white p-5 text-sm">
                <dt className="font-semibold text-suave">Chemical name</dt>
                <dd>{sheet.chemicalName}</dd>
                <dt className="font-semibold text-suave">CAS No.</dt>
                <dd className="stat-numeral">{sheet.cas}</dd>
                <dt className="font-semibold text-suave">Formula</dt>
                <dd>
                  <Formula value={sheet.formula} />
                </dd>
                <dt className="font-semibold text-suave">NCM</dt>
                <dd className="stat-numeral">{sheet.ncm}</dd>
                {sheet.description && (
                  <>
                    <dt className="font-semibold text-suave">Description</dt>
                    <dd>{sheet.description}</dd>
                  </>
                )}
              </dl>
              <div className="space-y-5 text-base leading-relaxed">
                <SheetBlock title="Applications">{sheet.applications}</SheetBlock>
                <SheetBlock title="Typical buyers">{sheet.buyers}</SheetBlock>
                {sheet.regulatory && (
                  <SheetBlock title="Regulatory notes (Brazil)">
                    <ul className="list-disc space-y-1 pl-5">
                      {sheet.regulatory.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </SheetBlock>
                )}
                <SheetBlock title="Documents provided">{sheet.documents.join(' and ')}</SheetBlock>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function SheetBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="eyebrow text-cobalto">{title}</h4>
      <div className="mt-2 text-suave">{children}</div>
    </div>
  )
}
