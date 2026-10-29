// Dados institucionais da Navigal usados em mais de uma página (cabeçalho,
// rodapé, contato, JSON-LD). Textos sempre em inglês, como pede o Brand
// Persona ("Os textos devem ser sempre em inglês").

export const SITE_URL = 'https://www.navigal-ts.com'

export const company = {
  name: 'Navigal',
  legalName: 'Navigal Trading Solutions Limited',
  tagline: 'Building reliable connections.',
  founded: 2008,
  email: 'contact@navigal-ts.com',
  // Dois números aparecem nos materiais: +1 (site antigo e tradução para o
  // espanhol) e +55 (apresentação Navigal.pptx). Confirmar com o Marketing
  // quais seguem ativos.
  phones: [
    { label: 'International', display: '+1 646 915 1713', href: 'tel:+16469151713' },
    { label: 'Brazil', display: '+55 11 93312 5318', href: 'tel:+5511933125318' },
  ],
  address: {
    lines: ['Office No. TI-4F-11, RAKEZ Amenity Center', 'Al Hamra Industrial Zone FZ', 'Ras Al Khaimah, United Arab Emirates'],
  },
}

export type NavItem = { label: string; href: string }

export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'For Suppliers', href: '/suppliers' },
  { label: 'Contact', href: '/contact' },
]

export const quoteCta = { label: 'Request a quote', href: '/contact' }

// Métricas da Navigal e do Trust Group. Mesma regra do site Trust Group:
// todo número que se repete vem daqui, com a data-base quando conhecida.
export const facts = {
  founded: { value: '2008', label: 'Founded in Panama' },
  containers: {
    value: '25,000+',
    label: 'Containers managed in the last year',
    note: 'Número do site atual (navigal-ts.com) e do site Trust Group; sem data-base fixa.',
  },
  portfolio: { value: '30+', label: 'Strategic raw materials in our portfolio' },
  continents: { value: '3', label: 'Sourcing regions: Asia, Europe and the Middle East' },
}

export const trustGroupFacts = [
  { value: '20+', label: 'years in international trade' },
  { value: '300+', label: 'professionals' },
  { value: '80,000 m²', label: 'of warehousing in Brazil' },
  { value: 'Top 30', label: 'chemical importers in Brazil' },
]
