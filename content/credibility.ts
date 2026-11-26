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
// `paragraphs` é prosa em ordem (mesma quantidade em todos os idiomas).
export type CommitmentId = 'ethics' | 'instituto-trust'
export type CommitmentItem = { id: CommitmentId; icon: string; title: string; paragraphs: string[] }
export const commitment: CommitmentItem[] = [
  {
    id: 'ethics',
    icon: 'scale',
    title: 'Ethics, compliance and sustainability',
    paragraphs: [
      'Across Trust Group, we follow shared standards of ethics, compliance and sustainability. These practices are independently assessed by international and Brazilian organizations. Our partners can count on transparent processes at every stage.',
    ],
  },
  {
    id: 'instituto-trust',
    icon: 'handshake',
    title: 'Instituto Trust',
    paragraphs: [
      'Through Instituto Trust, Trust Group invests in the communities where we operate.',
      'Sport is a tool for inclusion and social development, and thousands of families in the region have already been impacted.',
    ],
  },
]

// Selos da faixa "Independently assessed by" (seção Our commitment, About).
// Ordem de exibição = ordem da lista. `scale` padroniza a altura VISUAL: 1 = selo
// quadrado/vertical; selos largos ficam mais baixos para não dominar a linha.
// O arquivo nunca é esticado (largura automática pela proporção `width`/`height`).
// LGPD: o arquivo do selo ainda não foi enviado. Para incluir, adicione o arquivo em
// public/brand/seals/, uma entrada aqui (na posição desejada) e o `alt` em
// content/i18n/pt.ts e es.ts (credibility.seals).
export type SealId = 'ods' | 'ecovadis' | 'gptw' | 'empresa-limpa'
export type Seal = { id: SealId; src: string; width: number; height: number; scale: number; alt: string }
export const commitmentSeals: Seal[] = [
  {
    id: 'ods',
    src: '/brand/seals/ods-santa-catarina.webp',
    width: 256,
    height: 256,
    scale: 1,
    alt: 'Together for the SDGs seal – Movimento Nacional ODS Santa Catarina, signatory since 2024',
  },
  {
    id: 'ecovadis',
    src: '/brand/seals/ecovadis-bronze.webp',
    width: 256,
    height: 256,
    scale: 1,
    alt: 'EcoVadis Sustainability Rating – Bronze medal, top 35%, December 2024',
  },
  {
    id: 'gptw',
    src: '/brand/seals/great-place-to-work.webp',
    width: 256,
    height: 362,
    scale: 1,
    alt: 'Great Place to Work certified seal – Brazil, October 2025 to October 2026',
  },
  {
    id: 'empresa-limpa',
    src: '/brand/seals/empresa-limpa.webp',
    width: 256,
    height: 101,
    scale: 0.6,
    alt: 'Empresa Limpa (Clean Company) seal',
  },
]
