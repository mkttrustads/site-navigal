// Prova e credibilidade. Fonte: apresentação para fornecedores v4 (slides 9, 11 e 12).
// Regra: cada certificação é atribuída à empresa do grupo que a detém, nunca à Navigal.

import { rankingFootnote } from './site'

export const certificationsFootnote = rankingFootnote

// Bloco "Certifications & compliance" (About e /suppliers).
// `holder` é a empresa do grupo que detém a certificação. O item do IMO foi
// retirado por decisão do Marketing.
export type CertificationId = 'top35' | 'aeo' | 'sassmaq'
export type Certification = {
  id: CertificationId
  icon: string
  title: string
  holder: string
  description: string
  /** Selo exibido no lugar do ícone. */
  badge?: string
  badgeAlt?: string
  /** Vários selos no mesmo card (substituem o ícone). `badgeAlts` segue a mesma ordem e é traduzido em content/i18n/*. */
  badges?: { src: string; width: number; height: number; size: 'md' | 'sm' }[]
  badgeAlts?: string[]
}
export const certifications: Certification[] = [
  {
    id: 'top35',
    icon: 'badgeCheck',
    title: 'Top 35 chemical importers in Brazil*',
    holder: 'Trust Group',
    description: 'Ranked among the largest chemical importers in the country.',
  },
  {
    id: 'aeo',
    icon: 'landmark',
    title: 'AEO – Essential Compliance',
    holder: 'Trust Comércio Exterior',
    description:
      'Certified by the Brazilian Federal Revenue, we are part of the Brazilian Authorized Economic Operator (AEO) Program, recognized for its compliance and risk management standards.',
    // Selo exibido no lugar do ícone; o alt é traduzido em content/i18n/*.
    badge: '/brand/oea-conformidade-essencial.webp',
    badgeAlt: 'Authorized Economic Operator (AEO) seal – Essential Compliance',
  },
  {
    id: 'sassmaq',
    icon: 'clipboard',
    title: 'SASSMAQ and ISO 9001',
    holder: 'Taglog Logística Integrada, a Trust Group company',
    description: 'Safety, health, environment and quality standards in logistics operations.',
    badges: [
      { src: '/brand/sassmaq-empresa-aprovada.webp', width: 256, height: 192, size: 'md' },
      { src: '/brand/iso-9001-bureau-veritas.webp', width: 256, height: 97, size: 'sm' },
    ],
    badgeAlts: [
      'SASSMAQ seal – Approved company (Safety, Health, Environment and Quality Assessment System)',
      'ISO 9001 certification seal – Bureau Veritas',
    ],
  },
]

// Logística no Brasil via Taglog (slide 9).
export type TaglogHubId = 'itajai' | 'garuva' | 'sumare' | 'cabo'
export type TaglogHub = { id: TaglogHubId; site: string; area: string; pallets: string; access: string }
export const taglog: { licensed: string; hubs: TaglogHub[]; total: { area: string; pallets: string } } = {
  licensed: 'Licensed for products regulated by IBAMA, MAPA, ANVISA, the Brazilian Army and the Federal Police.',
  hubs: [
    { id: 'itajai', site: 'Itajaí, SC (HQ)', area: '47,000+ m²', pallets: '18,000+ pallet positions', access: '15 min from the Port of Navegantes' },
    { id: 'garuva', site: 'Garuva, SC', area: '16,000+ m²', pallets: '5,000+ pallet positions', access: '45 min from the Port of Itapoá' },
    { id: 'sumare', site: 'Sumaré, SP', area: '7,000+ m²', pallets: '6,000+ pallet positions', access: '25 min from Viracopos Airport' },
    {
      id: 'cabo',
      site: 'Cabo de Santo Agostinho, PE',
      area: '10,000+ m²',
      pallets: '9,000+ pallet positions',
      access: '30 min from the Port of Suape',
    },
  ],
  total: { area: '80,000+ m²', pallets: '38,000+ pallet positions' },
}

// Slide 12, "Our commitment". Sem números, como pedido.
export type CommitmentId = 'instituto-trust' | 'ethics'
export type CommitmentItem = { id: CommitmentId; icon: string; title: string; description: string }
export const commitment: CommitmentItem[] = [
  {
    id: 'instituto-trust',
    icon: 'handshake',
    title: 'Instituto Trust',
    description: 'Sport as a tool for inclusion and social development.',
  },
  {
    id: 'ethics',
    icon: 'scale',
    title: 'Ethics, compliance and sustainability',
    description: 'Shared standards across the group, assessed by independent organizations.',
  },
]
