// Conteúdo da página About. Fontes: Brand Persona, apresentação Navigal.pptx
// e tradução para o espanhol do site antigo (misión, valores).

export const mission =
  'To find the best possible combination of quality, price and capability for each client’s business, and to secure their complete satisfaction.'

// Só 2008 tem data confirmada nos materiais; as demais etapas ficam sem ano.
export const milestones = [
  {
    label: '2008',
    title: 'Founded in Panama',
    description: 'Navigal is incorporated in Panama to manage the international supply of raw materials for Latin American industry.',
  },
  {
    label: 'Global hub',
    title: 'Operating from the UAE',
    description:
      'Headquartered in the United Arab Emirates, a trade hub at the crossroads of Asia, Europe, Africa and the Middle East.',
  },
  {
    label: 'Trust Group',
    title: 'Backed by a full-service group',
    description:
      'Built on Trust Group’s experience in importing chemical inputs, with the group’s complete foreign trade, logistics and warehousing structure in Brazil.',
  },
  {
    label: 'Today',
    title: 'A strategic partner for the region',
    description: 'Chemicals, fertilizers, resins and specialty inputs for more than ten industries across Latin America.',
  },
]

// Personalidade do Brand Persona traduzida em princípios de atuação.
export const principles = [
  {
    icon: 'globe',
    title: 'Global by nature',
    description:
      'Cosmopolitan and multicultural, we speak the language of global business and respect the regulations of every border we cross.',
  },
  {
    icon: 'shield',
    title: 'Risk, governed',
    description:
      'We discover qualified suppliers anywhere in the world and govern the risks of each operation, bringing predictability and stability.',
  },
  {
    icon: 'handshake',
    title: 'The trusted link',
    description:
      'We are the connection between reliable global suppliers and the industries that depend on a secure, competitive supply.',
  },
]

export const values = [
  { icon: 'clock', title: 'Experience', description: 'More than a decade building outstanding commercial relationships across continents.' },
  { icon: 'shield', title: 'Security', description: 'Experience and analytical capability applied to make every negotiation safer.' },
  { icon: 'badgeCheck', title: 'Quality', description: 'Always raising the bar to deliver the best service and product.' },
  { icon: 'target', title: 'Commitment', description: 'Our mission is your satisfaction, and we are committed to it.' },
  { icon: 'truck', title: 'Punctuality', description: 'We honor every request with commitment and precise delivery.' },
]

// "Miami" vem da página Trading Internacional do site Trust Group; o Brand
// Persona cita Dubai e Panamá. Confirmar a lista final com o Marketing.
export const offices = [
  {
    country: 'United Arab Emirates',
    role: 'Headquarters',
    detail: 'RAKEZ Amenity Center, Al Hamra Industrial Zone FZ, Ras Al Khaimah',
  },
  { country: 'Panama', role: 'Where it all began', detail: 'Incorporated in 2008' },
  { country: 'United States', role: 'Miami office', detail: 'Supplier and market relations in the Americas' },
  { country: 'Brazil', role: 'Commercial & operations team', detail: 'Close to industrial buyers across Latin America' },
]
