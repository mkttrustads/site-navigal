// Dados institucionais da Navigal usados em mais de uma página (cabeçalho,
// rodapé, contato, JSON-LD). Textos sempre em inglês, como pede o Brand
// Persona ("Os textos devem ser sempre em inglês").

import { products } from './products'

export const SITE_URL = 'https://www.navigal-ts.com'

export const company = {
  name: 'Navigal',
  legalName: 'Navigal Trading Solutions Limited',
  tagline: 'Building reliable connections',
  // Ano de lançamento da Navigal (2024). Alimenta o foundingDate do JSON-LD e
  // deve ficar igual a facts.launched e à linha do tempo do About.
  founded: 2024,
  email: 'sales@navigal-ts.com',
  // Número único, igual em todos os idiomas (sem rótulo de região).
  phones: [{ display: '+55 (47) 98844-9269', href: 'tel:+5547988449269' }],
  address: {
    lines: ['Office No. TI-4F-11, RAKEZ Amenity Center', 'Al Hamra Industrial Zone FZ', 'Ras Al Khaimah, United Arab Emirates'],
  },
}

// `id` é o identificador estável do item (chave de React e das traduções); o rótulo muda por idioma.
export type NavId = 'about' | 'solutions' | 'products' | 'suppliers' | 'contact'
export type NavItem = { id: NavId; label: string; href: string }

export const primaryNav: NavItem[] = [
  { id: 'about', label: 'About us', href: '/about' },
  { id: 'solutions', label: 'Solutions', href: '/solutions' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'suppliers', label: 'For Suppliers', href: '/suppliers' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export const quoteCta = { label: 'Request a quote', href: '/contact' }

// Métricas da Navigal e do Trust Group. Mesma regra do site Trust Group:
// todo número que se repete vem daqui. Fonte: apresentação para fornecedores v4.
// "30+", "40+"... derivado da contagem real do portfólio, arredondada para
// baixo na dezena, para o número não ficar defasado quando produtos entram.
const portfolioFloor = Math.floor(products.length / 10) * 10

export const facts = {
  launched: { value: '2024', label: 'Navigal launched' },
  tons: { value: '11k', label: 'Tons imported by Navigal in 2025' },
  portfolio: { value: `${portfolioFloor}+`, label: 'Strategic raw materials in our portfolio' },
  continents: { value: '3', label: 'Sourcing regions: Asia, Europe and the Middle East' },
}

// Nota do ranking de importadores (apresentação v4). Exibida onde o ranking aparece.
export const rankingFootnote =
  '*Among 8,200+ importers (FOB, US$), excluding pesticides and fuels. Public import data, Aug/25 to Jul/26.'

// Big Numbers da página About (logo abaixo de "Por que a Navigal existe"), já com os números que eram da seção "Parte do Trust Group". Fonte: apresentação institucional.
// O número exibido é `prefix` + `count` + `suffix`; só `count` é animado (contagem ao entrar na tela).
// `prefix`/`suffix` e `count` valem para os três idiomas; só o `label` é traduzido (content/i18n/*).
// `footnote: true` marca o item que remete à nota do ranking (`rankingFootnote`, a mesma da seção de certificações).
export type BigNumberId = 'years' | 'people' | 'warehousing' | 'routes' | 'certifications' | 'ranking' | 'revenue'
export type BigNumber = {
  id: BigNumberId
  icon: string
  prefix: string
  count: number
  suffix: string
  label: string
  footnote?: boolean
}
export const bigNumbers: BigNumber[] = [
  { id: 'years', icon: 'medal', prefix: '', count: 20, suffix: '+', label: 'Years in the market' },
  { id: 'people', icon: 'users', prefix: '', count: 300, suffix: '+', label: 'People across the group' },
  { id: 'warehousing', icon: 'package', prefix: '', count: 80, suffix: 'k+ m²', label: 'Of warehousing' },
  { id: 'routes', icon: 'route', prefix: '', count: 65, suffix: '+', label: 'International routes' },
  { id: 'certifications', icon: 'badgeCheck', prefix: '', count: 10, suffix: '+', label: 'Certifications and seals' },
  { id: 'ranking', icon: 'trophy', prefix: 'Top ', count: 35, suffix: '', label: 'Chemical importers in Brazil*', footnote: true },
  { id: 'revenue', icon: 'barChart', prefix: 'US$ ', count: 100, suffix: 'M+', label: 'Trust Group revenue in 2024' },
]

// Slide 4: "Five companies working together so every operation runs end to end".
export type TrustGroupLineId = 'foreign-trade' | 'international-trading' | 'international-logistics' | 'national-logistics' | 'global-brands'
export type TrustGroupLine = { id: TrustGroupLineId; name: string; description: string }
export const trustGroupLines: { title: string; items: TrustGroupLine[] } = {
  title: 'Five companies working together so every operation runs end to end',
  items: [
    { id: 'foreign-trade', name: 'Foreign Trade', description: 'Import/export services and trade finance' },
    { id: 'international-trading', name: 'International Trading', description: 'Navigal' },
    { id: 'international-logistics', name: 'International Logistics', description: 'Sea, air and road freight, including project cargo' },
    { id: 'national-logistics', name: 'National Logistics', description: 'Warehouses and road transport across Brazil' },
    { id: 'global-brands', name: 'Global Brands Management', description: 'Expansion of international brands in Brazil' },
  ],
}
