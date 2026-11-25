// Dados institucionais da Navigal usados em mais de uma página (cabeçalho,
// rodapé, contato, JSON-LD). Textos sempre em inglês, como pede o Brand
// Persona ("Os textos devem ser sempre em inglês").

import { products } from './products'

export const SITE_URL = 'https://www.navigal-ts.com'

export const company = {
  name: 'Navigal',
  legalName: 'Navigal Trading Solutions Limited',
  tagline: 'Building reliable connections.',
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

export type NavItem = { label: string; href: string }

export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'For Suppliers', href: '/suppliers' },
  { label: 'Contact', href: '/contact' },
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

// Seção "Part of Trust Group". A apresentação não traz o "14M+ investido em
// tecnologia" (moeda indefinida), por isso não é publicado.
export const trustGroupFacts = [
  { value: '20+', label: 'years in the market' },
  { value: '300+', label: 'employees' },
  { value: '80k+ m²', label: 'of warehousing' },
  { value: '65+', label: 'international routes' },
  { value: '10+', label: 'certifications and seals' },
  { value: 'Top 35*', label: 'chemical importers in Brazil (Trust Group)' },
]

// Slide 4: "Five companies working together so every operation runs end to end".
export const trustGroupLines = {
  title: 'Five companies working together so every operation runs end to end',
  items: [
    { name: 'Foreign Trade', description: 'Import/export services and trade finance' },
    { name: 'International Trading', description: 'Navigal' },
    { name: 'International Logistics', description: 'Sea, air and road freight, including project cargo' },
    { name: 'National Logistics', description: 'Warehouses and road transport across Brazil' },
    { name: 'Global Brands Management', description: 'Expansion of international brands in Brazil' },
  ],
}
