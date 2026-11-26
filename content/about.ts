// Conteúdo da página About. Fontes: Brand Persona, apresentação Navigal.pptx
// e tradução para o espanhol do site antigo (misión, valores).

export const mission =
  'To find the best possible combination of quality, price and capability for each client’s business, and to secure their complete satisfaction.'

// Linha do tempo (slides 2 e 3 da apresentação para fornecedores v4).
export type MilestoneId = 'founded' | 'launch' | 'today'
export type Milestone = { id: MilestoneId; label: string; title: string; description: string }
export const milestones: Milestone[] = [
  {
    id: 'founded',
    label: '2005',
    title: 'Trust is founded in Itajaí/SC',
    description:
      'Juliano Victorino founds Trust to import the chemical raw materials he had found so hard to source from abroad.',
  },
  {
    id: 'launch',
    label: '2024',
    title: 'Navigal is launched',
    description:
      'Trust Group creates its international trading company to take the group’s know-how to the source, working side by side with suppliers.',
  },
  {
    id: 'today',
    label: 'Today',
    title: 'Full ecosystem support',
    description: 'Navigal operates with the full support of a foreign trade and logistics ecosystem.',
  },
]

// História (slides 2 e 3). Usada na Home e na página About.
export const story = {
  eyebrow: 'Why Navigal exists',
  title: 'Born from the chemical industry',
  paragraphs: [
    'Before Trust Group, our founder Juliano Victorino ran a detergent powder factory in Brazil and learned first-hand how hard it is to source chemical inputs from abroad. In 2005, he founded Trust in Itajaí/SC to import those raw materials.',
    'Two decades of importing chemicals and other products taught us every technical, regulatory and logistics requirement of the Brazilian market. In 2024, Trust Group created Navigal to take this know-how to the source, working side by side with suppliers to grow their market share in Brazil and Latin America.',
  ],
  closing: 'We know the industry because we were the industry.',
  // Mantém a informação de base: escritório nos Emirados e em Miami.
  presence: 'Navigal operates from the United Arab Emirates, with an office in Miami.',
}

// Personalidade do Brand Persona traduzida em princípios de atuação.
export type PrincipleId = 'global' | 'risk' | 'link'
export type Principle = { id: PrincipleId; icon: string; title: string; description: string }
export const principles: Principle[] = [
  {
    id: 'global',
    icon: 'globe',
    title: 'Global by nature',
    description:
      'Cosmopolitan and multicultural, we speak the language of global business and respect the regulations of every border we cross.',
  },
  {
    id: 'risk',
    icon: 'shield',
    title: 'Risk, governed',
    description:
      'We discover qualified suppliers anywhere in the world and govern the risks of each operation, bringing predictability and stability.',
  },
  {
    id: 'link',
    icon: 'handshake',
    title: 'The trusted link',
    description:
      'We are the connection between reliable global suppliers and the industries that depend on a secure, competitive supply.',
  },
]

export type ValueId = 'experience' | 'security' | 'quality' | 'commitment' | 'punctuality'
export type Value = { id: ValueId; icon: string; title: string; description: string }
export const values: Value[] = [
  { id: 'experience', icon: 'clock', title: 'Experience', description: 'Two decades of Trust Group experience importing chemicals and other products.' },
  { id: 'security', icon: 'shield', title: 'Security', description: 'Experience and analytical capability applied to make every negotiation safer.' },
  { id: 'quality', icon: 'badgeCheck', title: 'Quality', description: 'Always raising the bar to deliver the best service and product.' },
  { id: 'commitment', icon: 'target', title: 'Commitment', description: 'Our mission is your satisfaction, and we are committed to it.' },
  { id: 'punctuality', icon: 'truck', title: 'Punctuality', description: 'We honor every request with commitment and precise delivery.' },
]

// "Miami" vem da página Trading Internacional do site Trust Group; o Brand
// Persona cita Dubai e Panamá. O card do Panamá ("Incorporated in 2008") saiu
// com a nova história (Navigal lançada em 2024); decisão sobre o Panamá pendente.
// Confirmar a lista final com o Marketing.
export type OfficeId = 'uae' | 'usa' | 'brazil'
export type Office = { id: OfficeId; country: string; role: string; detail: string }
export const offices: Office[] = [
  {
    id: 'uae',
    country: 'United Arab Emirates',
    role: 'Headquarters',
    detail: 'RAKEZ Amenity Center, Al Hamra Industrial Zone FZ, Ras Al Khaimah',
  },
  { id: 'usa', country: 'United States', role: 'Miami office', detail: 'Supplier and market relations in the Americas' },
  { id: 'brazil', country: 'Brazil', role: 'Commercial & operations team', detail: 'Close to industrial buyers across Latin America' },
]
