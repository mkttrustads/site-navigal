// Aplica as traduções (content/i18n/pt.ts e es.ts) sobre o conteúdo-fonte em
// inglês (content/*.ts), devolvendo objetos com o MESMO formato. Assim os
// componentes continuam iterando sobre `solutions`, `industries`, `products`...
// como antes, só que lendo de `useI18n().content`.
//
// Regras que mantêm os três idiomas com a MESMA estrutura:
//  - a ESTRUTURA (quais itens existem, ordem, ícones, imagens, links) vem sempre
//    do conteúdo-fonte; a tradução só fornece TEXTO;
//  - listas são casadas pelo `id` estável do item, nunca pela posição;
//  - texto ausente ou vazio cai, campo a campo, no inglês: um item nunca some
//    nem fica sem título por causa de uma tradução incompleta (em desenvolvimento
//    o fallback é avisado no console; `npm run check:i18n` falha o build/CI).
// Para EN devolve o próprio conteúdo-fonte.

import { bigNumbers, company, facts, primaryNav, quoteCta, rankingFootnote, trustGroupLines } from '../../content/site'
import { milestones, mission, offices, principles, story } from '../../content/about'
import { certifications, certificationsFootnote, commitment, commitmentSeals, taglog } from '../../content/credibility'
import { accessoryServices, audiences, lookingFor, processSteps, riskPillars, solutions, type AudienceItem } from '../../content/solutions'
import { industries, type Industry } from '../../content/industries'
import { products, type Product } from '../../content/products'
import { formFields, type Field, type FormType } from '../../content/forms'
import { pageMeta, type MetaPath, type PageMeta } from '../../content/i18n/en'
import type { ProductText, Translation } from '../../content/i18n/types'
import type { Locale } from './config'
import { getTranslation } from './translations'

type LocalizedField = Omit<Field, 'options'> & { options?: { value: string; label: string }[] }

const warned = new Set<string>()
/** Avisa (uma vez, só em desenvolvimento) que um texto caiu no fallback em inglês. */
function warnFallback(where: string) {
  if (process.env.NODE_ENV === 'production' || warned.has(where)) return
  warned.add(where)
  console.warn(`[i18n] tradução ausente, usando o texto em inglês: ${where}`)
}

/** Texto utilizável: string não vazia. */
const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim() !== ''

/** Sobrepõe só os campos de texto realmente preenchidos; o resto fica como no inglês. */
function overlayText<T extends object>(base: T, overlay: Partial<Record<keyof T, unknown>> | undefined, where: string): T {
  if (!overlay) return base
  const result: T = { ...base }
  for (const key of Object.keys(overlay) as (keyof T)[]) {
    const value = overlay[key]
    const source = base[key]
    if (typeof source === 'string') {
      if (hasText(value)) result[key] = value as T[keyof T]
      else warnFallback(`${where}.${String(key)}`)
    } else if (Array.isArray(source) && source.every((entry) => typeof entry === 'string')) {
      result[key] = mergeLines(source, Array.isArray(value) ? value : undefined, `${where}.${String(key)}`) as T[keyof T]
    } else if (value !== undefined) {
      result[key] = value as T[keyof T]
    }
  }
  return result
}

/**
 * Mescla os textos traduzidos sobre a lista-fonte casando pelo `id` do item.
 * A lista devolvida tem sempre os mesmos itens, na mesma ordem, que a fonte.
 */
function mergeById<T extends { id: string }>(
  base: readonly T[],
  overlay: Partial<Record<T['id'], Partial<Record<keyof T, unknown>>>> | undefined,
  where: string
): T[] {
  return base.map((item) => {
    const text = overlay?.[item.id as T['id']]
    if (overlay && !text) warnFallback(`${where}.${item.id}`)
    return overlayText(item, text, `${where}.${item.id}`)
  })
}

/** Como `mergeById`, para listas cujo texto é uma única string (rótulo) por id. */
function mergeLabels<T extends { id: string }>(
  base: readonly T[],
  overlay: Partial<Record<T['id'], string>> | undefined,
  field: keyof T,
  where: string
): T[] {
  return base.map((item) => {
    const label = overlay?.[item.id as T['id']]
    if (hasText(label)) return { ...item, [field]: label }
    if (overlay) warnFallback(`${where}.${item.id}`)
    return item
  })
}

/** Linhas de prosa em ordem (parágrafos, endereço): completa por posição o que faltar com o inglês. */
function mergeLines(base: readonly string[], overlay: readonly string[] | undefined, where: string): string[] {
  return base.map((line, index) => {
    if (hasText(overlay?.[index])) return overlay![index]
    if (overlay) warnFallback(`${where}[${index}]`)
    return line
  })
}

function localizeProduct(product: Product, text: ProductText | undefined, translated: boolean): Product {
  const where = `products.${product.slug}`
  if (!text) {
    if (translated) warnFallback(where)
    return product
  }
  const localized = overlayText(product, { name: text.name, grade: text.grade }, where)
  if (!product.datasheet) return localized
  return { ...localized, datasheet: overlayText(product.datasheet, text.datasheet, `${where}.datasheet`) }
}

function build(tr?: Translation) {
  /** Texto traduzido se houver; senão o inglês (com aviso em desenvolvimento quando há tradução). */
  const pick = (value: string | undefined, fallback: string, where: string) => {
    if (hasText(value)) return value
    if (tr) warnFallback(where)
    return fallback
  }
  const localizedIndustries: Industry[] = industries.map((industry) =>
    overlayText(industry, tr?.industries[industry.slug], `industries.${industry.slug}`)
  )
  const localizedProducts = products.map((product) => localizeProduct(product, tr?.products[product.slug], !!tr))

  const audienceBlock = (key: 'buyers' | 'suppliers') => {
    const text = tr?.solutions.audiences[key]
    const base = audiences[key]
    const where = `solutions.audiences.${key}`
    return {
      ...base,
      eyebrow: pick(text?.eyebrow, base.eyebrow, `${where}.eyebrow`),
      title: pick(text?.title, base.title, `${where}.title`),
      items: mergeLabels<AudienceItem>(base.items, text?.items, 'text', `${where}.items`),
      cta: { ...base.cta, label: pick(text?.cta, base.cta.label, `${where}.cta`) },
    }
  }

  const localizedFields = Object.fromEntries(
    (Object.keys(formFields) as FormType[]).map((type) => [
      type,
      formFields[type].map((field): LocalizedField => {
        const text = tr?.forms.fields[type][field.name]
        return {
          ...field,
          label: pick(text?.label, field.label, `forms.${type}.${field.name}.label`),
          placeholder: field.placeholder && pick(text?.placeholder, field.placeholder, `forms.${type}.${field.name}.placeholder`),
          options: field.options?.map((option) => ({ value: option, label: pick(tr?.forms.options[option], option, `forms.options.${option}`) })),
        }
      }),
    ])
  ) as Record<FormType, LocalizedField[]>

  const factText = tr?.site.facts
  const localizedNav = mergeLabels(primaryNav, tr?.site.nav, 'label', 'site.nav')

  return {
    company: {
      ...company,
      tagline: pick(tr?.site.tagline, company.tagline, 'site.tagline'),
      address: { ...company.address, lines: mergeLines(company.address.lines, tr?.site.addressLines, 'site.addressLines') },
    },
    primaryNav: localizedNav,
    /** Rótulo do menu para um href (usado nos breadcrumbs). */
    navLabel: (href: string) => localizedNav.find((item) => item.href === href)?.label ?? href,
    quoteCta: { ...quoteCta, label: pick(tr?.site.quoteCta, quoteCta.label, 'site.quoteCta') },
    facts: {
      launched: { ...facts.launched, label: pick(factText?.launched, facts.launched.label, 'site.facts.launched') },
      tons: { ...facts.tons, label: pick(factText?.tons, facts.tons.label, 'site.facts.tons') },
      portfolio: { ...facts.portfolio, label: pick(factText?.portfolio, facts.portfolio.label, 'site.facts.portfolio') },
      continents: { ...facts.continents, label: pick(factText?.continents, facts.continents.label, 'site.facts.continents') },
    },
    rankingFootnote: pick(tr?.site.rankingFootnote, rankingFootnote, 'site.rankingFootnote'),
    bigNumbers: mergeLabels(bigNumbers, tr?.site.bigNumbers, 'label', 'site.bigNumbers'),
    trustGroupLines: {
      title: pick(tr?.site.trustGroupLines.title, trustGroupLines.title, 'site.trustGroupLines.title'),
      items: mergeById(trustGroupLines.items, tr?.site.trustGroupLines.items, 'site.trustGroupLines.items'),
    },

    mission: pick(tr?.about.mission, mission, 'about.mission'),
    milestones: mergeById(milestones, tr?.about.milestones, 'about.milestones'),
    story: overlayText(story, tr?.about.story, 'about.story'),
    principles: mergeById(principles, tr?.about.principles, 'about.principles'),
    offices: mergeById(offices, tr?.about.offices, 'about.offices'),

    certifications: mergeById(certifications, tr?.credibility.certifications, 'credibility.certifications'),
    // A nota do ranking é a mesma exibida na seção Trust Group.
    certificationsFootnote: pick(tr?.site.rankingFootnote, certificationsFootnote, 'site.rankingFootnote'),
    taglog: {
      licensed: pick(tr?.credibility.taglog.licensed, taglog.licensed, 'credibility.taglog.licensed'),
      hubs: mergeById(taglog.hubs, tr?.credibility.taglog.hubs, 'credibility.taglog.hubs'),
      total: overlayText(taglog.total, tr?.credibility.taglog.total, 'credibility.taglog.total'),
    },
    commitment: mergeById(commitment, tr?.credibility.commitment, 'credibility.commitment'),
    commitmentSeals: mergeById(commitmentSeals, tr?.credibility.seals, 'credibility.seals'),

    solutions: mergeById(solutions, tr?.solutions.solutions, 'solutions.solutions'),
    accessoryServices: mergeLabels(accessoryServices, tr?.solutions.accessoryServices, 'label', 'solutions.accessoryServices'),
    processSteps: mergeById(processSteps, tr?.solutions.processSteps, 'solutions.processSteps'),
    riskPillars: mergeById(riskPillars, tr?.solutions.riskPillars, 'solutions.riskPillars'),
    lookingFor: mergeById(lookingFor, tr?.solutions.lookingFor, 'solutions.lookingFor'),
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

/** Aplica uma tradução (ou nenhuma, para o inglês) sobre o conteúdo-fonte. Exportada para os testes (scripts/check-i18n.cjs). */
export const localizeTranslation = build

const cache = new Map<Locale, LocalizedContent>()

export function localizeContent(locale: Locale): LocalizedContent {
  let content = cache.get(locale)
  if (!content) {
    content = build(getTranslation(locale))
    cache.set(locale, content)
  }
  return content
}
