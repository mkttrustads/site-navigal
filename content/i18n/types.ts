// Contrato das traduções. PT-BR e ES precisam preencher exatamente esta
// estrutura; chaves ou itens faltando quebram o `tsc`, e `npm run check:i18n`
// confere o que o TypeScript não enxerga (tamanho dos arrays, slugs, textos
// idênticos ao inglês).
//
// Só entram aqui os CAMPOS DE TEXTO. Ícones, slugs, links, CAS, NCM, fórmulas e
// números ficam em content/*.ts e valem para todos os idiomas.

import type { milestones, offices, principles, story, values } from '../about'
import type { certifications, commitment, taglog } from '../credibility'
import type { FormType } from '../forms'
import type { lookingFor, processSteps, riskPillars, solutions } from '../solutions'
import type { company, trustGroupLines } from '../site'
import type { Datasheet } from '../products'
import type { PageMeta, MetaPath, UiKey } from './en'

type Item<T extends readonly unknown[]> = T[number]
type Pick2<T, K extends keyof T> = Pick<T, K>

export type ProductText = {
  name: string
  grade?: string
  datasheet?: Pick2<Datasheet, 'chemicalName' | 'applications' | 'buyers' | 'documents'> &
    Partial<Pick2<Datasheet, 'description' | 'regulatory' | 'cas'>>
}

export type FieldText = { label: string; placeholder?: string }

export type Translation = {
  ui: Record<UiKey, string>
  meta: Record<MetaPath, PageMeta>

  site: {
    tagline: string
    /** Rótulo de cada item do menu, na ordem de `primaryNav`. */
    nav: string[]
    quoteCta: string
    facts: { launched: string; tons: string; portfolio: string; continents: string }
    rankingFootnote: string
    /** Rótulo de cada número do Trust Group, na ordem de `trustGroupFacts`. */
    trustGroupFacts: string[]
    trustGroupLines: {
      title: string
      items: Pick2<Item<typeof trustGroupLines.items>, 'name' | 'description'>[]
    }
    /** Linhas do endereço, na ordem de `company.address.lines`. */
    addressLines: (typeof company.address.lines)[number][]
  }

  about: {
    mission: string
    milestones: Pick2<Item<typeof milestones>, 'label' | 'title' | 'description'>[]
    story: Pick2<typeof story, 'eyebrow' | 'title' | 'paragraphs' | 'closing' | 'presence'>
    principles: Pick2<Item<typeof principles>, 'title' | 'description'>[]
    values: Pick2<Item<typeof values>, 'title' | 'description'>[]
    offices: Pick2<Item<typeof offices>, 'country' | 'role' | 'detail'>[]
  }

  credibility: {
    certifications: Pick2<Item<typeof certifications>, 'title' | 'holder' | 'description'>[]
    taglog: {
      licensed: string
      hubs: Pick2<Item<typeof taglog.hubs>, 'site' | 'area' | 'pallets' | 'access'>[]
      total: Pick2<typeof taglog.total, 'area' | 'pallets'>
    }
    commitment: Pick2<Item<typeof commitment>, 'title' | 'description'>[]
  }

  solutions: {
    solutions: Pick2<Item<typeof solutions>, 'title' | 'description'>[]
    accessoryServices: string[]
    processSteps: Pick2<Item<typeof processSteps>, 'title' | 'description'>[]
    riskPillars: Pick2<Item<typeof riskPillars>, 'title' | 'description'>[]
    lookingFor: Pick2<Item<typeof lookingFor>, 'title' | 'description'>[]
    audiences: {
      buyers: AudienceText
      suppliers: AudienceText
    }
  }

  /** Por slug do setor. */
  industries: Record<string, { name: string; description: string }>
  /** Por slug do produto. */
  products: Record<string, ProductText>

  forms: {
    fields: Record<FormType, Record<string, FieldText>>
    /** Texto exibido de cada opção dos selects; o VALOR enviado continua em inglês. */
    options: Record<string, string>
  }
}

type AudienceText = {
  eyebrow: string
  title: string
  items: string[]
  cta: string
}
