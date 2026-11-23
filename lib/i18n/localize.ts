// Aplica as traduções (content/i18n/pt.ts e es.ts) sobre o conteúdo-fonte em
// inglês (content/*.ts), devolvendo objetos com o MESMO formato. Assim os
// componentes continuam iterando sobre `solutions`, `industries`, `products`...
// como antes, só que lendo de `useI18n().content`. Campo sem tradução cai no
// inglês. Para EN devolve o próprio conteúdo-fonte.

import { company, facts, primaryNav, quoteCta, rankingFootnote, trustGroupFacts, trustGroupLines } from '../../content/site'
import { milestones, mission, offices, principles, story, values } from '../../content/about'
import { certifications, certificationsFootnote, commitment, taglog } from '../../content/credibility'
import { accessoryServices, audiences, lookingFor, processSteps, riskPillars, solutions } from '../../content/solutions'
import { industries, type Industry } from '../../content/industries'
import { products, type Product } from '../../content/products'
import { formFields, type Field, type FormType } from '../../content/forms'
import { pageMeta, type MetaPath, type PageMeta } from '../../content/i18n/en'
import type { ProductText, Translation } from '../../content/i18n/types'
import type { Locale } from './config'
import { getTranslation } from './translations'

type LocalizedField = Omit<Field, 'options'> & { options?: { value: string; label: string }[] }

/** Mescla, item a item (mesma posição), os textos traduzidos sobre a lista-fonte. */
function mergeList<T extends object>(base: readonly T[], overlay?: readonly Partial<T>[]): T[] {
  return base.map((item, index) => ({ ...item, ...overlay?.[index] }))
}

function localizeProduct(product: Product, text?: ProductText): Product {
  if (!text) return product
  return {
    ...product,
    name: text.name,
    grade: text.grade ?? product.grade,
    datasheet: product.datasheet && { ...product.datasheet, ...text.datasheet },
  }
}

function build(tr?: Translation) {
  const localizedIndustries: Industry[] = industries.map((industry) => ({ ...industry, ...tr?.industries[industry.slug] }))
  const localizedProducts = products.map((product) => localizeProduct(product, tr?.products[product.slug]))

  const audienceBlock = (key: 'buyers' | 'suppliers') => {
    const text = tr?.solutions.audiences[key]
    const base = audiences[key]
    return {
      ...base,
      eyebrow: text?.eyebrow ?? base.eyebrow,
      title: text?.title ?? base.title,
      items: text?.items ?? base.items,
      cta: { ...base.cta, label: text?.cta ?? base.cta.label },
    }
  }

  const localizedFields = Object.fromEntries(
    (Object.keys(formFields) as FormType[]).map((type) => [
      type,
      formFields[type].map((field): LocalizedField => {
        const text = tr?.forms.fields[type][field.name]
        return {
          ...field,
          label: text?.label ?? field.label,
          placeholder: text?.placeholder ?? field.placeholder,
          options: field.options?.map((option) => ({ value: option, label: tr?.forms.options[option] ?? option })),
        }
      }),
    ])
  ) as Record<FormType, LocalizedField[]>

  const factText = tr?.site.facts
  const localizedNav = mergeList(primaryNav, tr?.site.nav.map((label) => ({ label })))

  return {
    company: {
      ...company,
      tagline: tr?.site.tagline ?? company.tagline,
      phones: mergeList(company.phones, tr?.site.phoneLabels.map((label) => ({ label }))),
      address: { ...company.address, lines: tr?.site.addressLines ?? company.address.lines },
    },
    primaryNav: localizedNav,
    /** Rótulo do menu para um href (usado nos breadcrumbs). */
    navLabel: (href: string) => localizedNav.find((item) => item.href === href)?.label ?? href,
    quoteCta: { ...quoteCta, label: tr?.site.quoteCta ?? quoteCta.label },
    facts: {
      launched: { ...facts.launched, label: factText?.launched ?? facts.launched.label },
      tons: { ...facts.tons, label: factText?.tons ?? facts.tons.label },
      portfolio: { ...facts.portfolio, label: factText?.portfolio ?? facts.portfolio.label },
      continents: { ...facts.continents, label: factText?.continents ?? facts.continents.label },
    },
    rankingFootnote: tr?.site.rankingFootnote ?? rankingFootnote,
    trustGroupFacts: mergeList(trustGroupFacts, tr?.site.trustGroupFacts.map((label) => ({ label }))),
    trustGroupLines: {
      title: tr?.site.trustGroupLines.title ?? trustGroupLines.title,
      items: mergeList(trustGroupLines.items, tr?.site.trustGroupLines.items),
    },

    mission: tr?.about.mission ?? mission,
    milestones: mergeList(milestones, tr?.about.milestones),
    story: { ...story, ...tr?.about.story },
    principles: mergeList(principles, tr?.about.principles),
    values: mergeList(values, tr?.about.values),
    offices: mergeList(offices, tr?.about.offices),

    certifications: mergeList(certifications, tr?.credibility.certifications),
    // A nota do ranking é a mesma exibida na seção Trust Group.
    certificationsFootnote: tr?.site.rankingFootnote ?? certificationsFootnote,
    taglog: {
      licensed: tr?.credibility.taglog.licensed ?? taglog.licensed,
      hubs: mergeList(taglog.hubs, tr?.credibility.taglog.hubs),
      total: { ...taglog.total, ...tr?.credibility.taglog.total },
    },
    commitment: mergeList(commitment, tr?.credibility.commitment),

    solutions: mergeList(solutions, tr?.solutions.solutions),
    accessoryServices: tr?.solutions.accessoryServices ?? accessoryServices,
    processSteps: mergeList(processSteps, tr?.solutions.processSteps),
    riskPillars: mergeList(riskPillars, tr?.solutions.riskPillars),
    lookingFor: mergeList(lookingFor, tr?.solutions.lookingFor),
    audiences: { buyers: audienceBlock('buyers'), suppliers: audienceBlock('suppliers') },

    industries: localizedIndustries,
    getIndustry: (slug: string) => localizedIndustries.find((industry) => industry.slug === slug),
    products: localizedProducts,
    productsForIndustry: (slug: string) => localizedProducts.filter((product) => product.industries.includes(slug)),

    formFields: localizedFields,

    pageMeta: Object.fromEntries(
      (Object.keys(pageMeta) as MetaPath[]).map((path) => [path, tr?.meta[path] ?? pageMeta[path]])
    ) as Record<MetaPath, PageMeta>,
  }
}

export type LocalizedContent = ReturnType<typeof build>

const cache = new Map<Locale, LocalizedContent>()

export function localizeContent(locale: Locale): LocalizedContent {
  let content = cache.get(locale)
  if (!content) {
    content = build(getTranslation(locale))
    cache.set(locale, content)
  }
  return content
}
