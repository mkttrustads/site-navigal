'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, FileText, Search } from 'lucide-react'
import { products as sourceProducts, type Product } from '@/content/products'
import Formula from '@/components/ui/Formula'
import Icon from '@/components/ui/Icon'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { htmlLang } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

/** Minúsculas e sem acentos: "acido" encontra "Ácido". */
function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

// Texto-fonte (inglês) por slug: a busca continua achando pelo nome em inglês em qualquer idioma.
const sourceBySlug = new Map(sourceProducts.map((product) => [product.slug, product]))

/**
 * Portfólio com filtro por setor (sincronizado com `?industry=` na URL, para
 * os cards de setor do site apontarem direto para o filtro) e busca por nome
 * ou CAS. Produtos com ficha técnica abrem os dados do Book de serviços.
 */
export default function ProductCatalog() {
  const {
    t,
    content: { getIndustry, industries, products, productsForIndustry },
  } = useI18n()
  const searchParams = useSearchParams()
  const industryParam = searchParams.get('industry')
  const paramIndustry = industryParam && getIndustry(industryParam) ? industryParam : 'all'
  // Estado local: a troca de setor é instantânea e não depende de navegação do Next.
  const [active, setActive] = useState(paramIndustry)
  const [query, setQuery] = useState('')

  // Mantém o filtro em sincronia com a URL (cards de setor, voltar/avançar do navegador).
  useEffect(() => {
    setActive(paramIndustry)
  }, [paramIndustry])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return products.filter((product) => {
      if (active !== 'all' && !product.industries.includes(active)) return false
      if (!q) return true
      const source = sourceBySlug.get(product.slug)
      return [
        product.name,
        product.grade,
        product.datasheet?.cas,
        product.datasheet?.chemicalName,
        source?.name,
        source?.datasheet?.chemicalName,
      ]
        .filter(Boolean)
        .some((field) => normalize(field!).includes(q))
    })
  }, [active, query, products])

  function selectIndustry(slug: string) {
    setActive(slug)
    // Só atualiza a URL (compartilhável) sem navegar nem alterar a rolagem.
    const url = new URL(window.location.href)
    if (slug === 'all') url.searchParams.delete('industry')
    else url.searchParams.set('industry', slug)
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
  }

  const options = [
    { slug: 'all', name: t('catalog.allIndustries'), icon: 'network', count: products.length },
    ...industries.map((industry) => ({
      slug: industry.slug,
      name: industry.name,
      icon: industry.icon,
      count: productsForIndustry(industry.slug).length,
    })),
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label={t('catalog.filterLabel')}>
        {options.map((option) => {
          const selected = active === option.slug
          return (
            <button
              key={option.slug}
              type="button"
              onClick={() => selectIndustry(option.slug)}
              aria-pressed={selected}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border py-2 pl-3.5 pr-2.5 text-left text-sm font-semibold leading-snug transition-colors sm:gap-2.5 sm:py-2.5 sm:pl-4 sm:pr-3 sm:text-base',
                selected
                  ? 'border-cobalto bg-cobalto text-white'
                  : 'border-linha bg-white text-preto/85 hover:border-cobalto hover:text-cobalto'
              )}
            >
              <Icon name={option.icon} className={cn('h-5 w-5 shrink-0', selected ? 'text-white' : 'text-cobalto')} />
              {option.name}
              <span
                className={cn(
                  'stat-numeral rounded-full px-2.5 py-0.5 text-sm font-semibold',
                  selected ? 'bg-white/20 text-white' : 'bg-off-white text-preto/70'
                )}
              >
                {option.count}
                <span className="sr-only"> {t('catalog.products')}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">{t('catalog.searchLabel')}</span>
            <Search aria-hidden="true" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-suave" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="w-full rounded-card border border-linha bg-white py-3.5 pl-12 pr-4 text-base outline-none transition focus:border-cobalto"
            />
          </label>
          <p className="text-sm text-suave" aria-live="polite">
            {t('catalog.showing')} <strong className="text-preto">{filtered.length}</strong> {t('catalog.of')} {products.length}{' '}
            {t('catalog.products')}
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-card border border-dashed border-linha p-10 text-center text-base text-suave">
            {t('catalog.noResults')}
          </p>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const {
    t,
    locale,
    content: { getIndustry },
  } = useI18n()
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
            {t('catalog.technicalData')}
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
                <dt className="font-semibold text-suave">{t('sheet.chemicalName')}</dt>
                <dd>{sheet.chemicalName}</dd>
                <dt className="font-semibold text-suave">{t('sheet.cas')}</dt>
                <dd className="stat-numeral">{sheet.cas}</dd>
                <dt className="font-semibold text-suave">{t('sheet.formula')}</dt>
                <dd>
                  <Formula value={sheet.formula} />
                </dd>
                <dt className="font-semibold text-suave">{t('sheet.ncm')}</dt>
                <dd className="stat-numeral">{sheet.ncm}</dd>
                {sheet.description && (
                  <>
                    <dt className="font-semibold text-suave">{t('sheet.description')}</dt>
                    <dd>{sheet.description}</dd>
                  </>
                )}
              </dl>
              <div className="space-y-5 text-base leading-relaxed">
                <SheetBlock title={t('sheet.applications')}>{sheet.applications}</SheetBlock>
                <SheetBlock title={t('sheet.buyers')}>{sheet.buyers}</SheetBlock>
                {sheet.regulatory && (
                  <SheetBlock title={t('sheet.regulatory')}>
                    <ul className="list-disc space-y-1 pl-5">
                      {sheet.regulatory.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </SheetBlock>
                )}
                <SheetBlock title={t('sheet.documents')}>
                  {new Intl.ListFormat(htmlLang[locale], { style: 'long', type: 'conjunction' }).format(sheet.documents)}
                </SheetBlock>
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
