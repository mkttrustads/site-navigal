// Contrato das traduções. PT-BR e ES precisam preencher exatamente esta
// estrutura; chaves ou itens faltando quebram o `tsc`, e `npm run check:i18n`
// confere o que o TypeScript não enxerga (ids, textos vazios, textos
// idênticos ao inglês).
//
// Só entram aqui os CAMPOS DE TEXTO. Ícones, slugs, links, CAS, NCM, fórmulas,
// imagens e números ficam em content/*.ts e valem para todos os idiomas.
//
// Listas de cards/itens são indexadas pelo `id` ESTÁVEL do item (definido em
// content/*.ts, igual nos três idiomas), nunca pela posição: reordenar, inserir
// ou esquecer um item não desloca os textos dos demais.

import type { Milestone, MilestoneId, Office, OfficeId, Principle, PrincipleId, Value, ValueId, story } from '../about'
import type { Certification, CertificationId, CommitmentId, CommitmentItem, Seal, SealId, TaglogHub, TaglogHubId, taglog } from '../credibility'
import type { FormType } from '../forms'
import type {
  AccessoryServiceId,
  AudienceItemId,
  AudienceKey,
  LookingForId,
  LookingForItem,
  ProcessStep,
  ProcessStepId,
  RiskPillar,
  RiskPillarId,
  Solution,
  SolutionId,
} from '../solutions'
import type { company, NavId, TrustGroupFactId, TrustGroupLine, TrustGroupLineId } from '../site'
import type { Datasheet } from '../products'
import type { PageMeta, MetaPath, UiKey } from './en'

type Pick2<T, K extends keyof T> = Pick<T, K>
/** Texto de uma lista de itens, por `id` estável. */
type ById<Id extends string, Fields> = Record<Id, Fields>

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
    /** Rótulo de cada item do menu, por id (`primaryNav`). */
    nav: ById<NavId, string>
    quoteCta: string
    facts: { launched: string; tons: string; portfolio: string; continents: string }
    rankingFootnote: string
    /** Rótulo de cada número do Trust Group, por id (`trustGroupFacts`). */
    trustGroupFacts: ById<TrustGroupFactId, string>
    trustGroupLines: {
      title: string
      items: ById<TrustGroupLineId, Pick2<TrustGroupLine, 'name' | 'description'>>
    }
    /** Linhas do endereço, na ordem de `company.address.lines` (mesma quantidade em todos os idiomas). */
    addressLines: (typeof company.address.lines)[number][]
  }

  about: {
    mission: string
    milestones: ById<MilestoneId, Pick2<Milestone, 'label' | 'title' | 'description'>>
    /** `paragraphs` é prosa em ordem (mesma quantidade em todos os idiomas). */
    story: Pick2<typeof story, 'eyebrow' | 'title' | 'paragraphs' | 'closing' | 'presence'>
    principles: ById<PrincipleId, Pick2<Principle, 'title' | 'description'>>
    values: ById<ValueId, Pick2<Value, 'title' | 'description'>>
    offices: ById<OfficeId, Pick2<Office, 'country' | 'role' | 'detail'>>
  }

  credibility: {
    certifications: ById<CertificationId, Pick2<Certification, 'title' | 'holder' | 'description'> & { badgeAlt?: string }>
    taglog: {
      licensed: string
      hubs: ById<TaglogHubId, Pick2<TaglogHub, 'site' | 'area' | 'pallets' | 'access'>>
      total: Pick2<typeof taglog.total, 'area' | 'pallets'>
    }
    /** `paragraphs` é prosa em ordem (mesma quantidade em todos os idiomas). */
    commitment: ById<CommitmentId, Pick2<CommitmentItem, 'title' | 'paragraphs'>>
    seals: ById<SealId, Pick2<Seal, 'alt'>>
  }

  solutions: {
    solutions: ById<SolutionId, Pick2<Solution, 'title' | 'description'>>
    accessoryServices: ById<AccessoryServiceId, string>
    processSteps: ById<ProcessStepId, Pick2<ProcessStep, 'title' | 'description'>>
    riskPillars: ById<RiskPillarId, Pick2<RiskPillar, 'title' | 'description'>>
    lookingFor: ById<LookingForId, Pick2<LookingForItem, 'title' | 'description'>>
    audiences: { [K in AudienceKey]: AudienceText<K> }
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

type AudienceText<K extends AudienceKey> = {
  eyebrow: string
  title: string
  items: ById<AudienceItemId[K], string>
  cta: string
}
