// Prova e credibilidade. Fonte: apresentação para fornecedores v4 (slides 9, 11 e 12).
// Regra: cada certificação é atribuída à empresa do grupo que a detém, nunca à Navigal.

import { rankingFootnote } from './site'

export const certificationsFootnote = rankingFootnote

// Bloco "Certifications & compliance" (About e /suppliers).
// `holder` é a empresa do grupo que detém a certificação. O item do IMO foi
// retirado por decisão do Marketing.
export const certifications = [
  {
    icon: 'badgeCheck',
    title: 'Top 35 chemical importers in Brazil*',
    holder: 'Trust Group',
    description: 'Ranked among the largest chemical importers in the country.',
  },
  {
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
    icon: 'clipboard',
    title: 'SASSMAQ and ISO 9001',
    holder: 'Taglog Logística Integrada, a Trust Group company',
    description: 'Safety, health, environment and quality standards in logistics operations.',
  },
]

// Logística no Brasil via Taglog (slide 9).
export const taglog = {
  licensed: 'Licensed for products regulated by IBAMA, MAPA, ANVISA, the Brazilian Army and the Federal Police.',
  hubs: [
    { site: 'Itajaí, SC (HQ)', area: '47,000+ m²', pallets: '18,000+ pallet positions', access: '15 min from the Port of Navegantes' },
    { site: 'Garuva, SC', area: '16,000+ m²', pallets: '5,000+ pallet positions', access: '45 min from the Port of Itapoá' },
    { site: 'Sumaré, SP', area: '7,000+ m²', pallets: '6,000+ pallet positions', access: '25 min from Viracopos Airport' },
    {
      site: 'Cabo de Santo Agostinho, PE',
      area: '10,000+ m²',
      pallets: '9,000+ pallet positions',
      access: '30 min from the Port of Suape',
    },
  ],
  total: { area: '80,000+ m²', pallets: '38,000+ pallet positions' },
}

// Slide 12, "Our commitment". Sem números, como pedido.
export const commitment = [
  {
    icon: 'handshake',
    title: 'Instituto Trust',
    description: 'Sport as a tool for inclusion and social development.',
  },
  {
    icon: 'scale',
    title: 'Ethics, compliance and sustainability',
    description: 'Shared standards across the group, assessed by independent organizations.',
  },
]
