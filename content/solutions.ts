// Soluções, etapas do processo e frentes de mitigação de risco.
// Fontes: apresentação "ULTIMA APRESENTAÇÃO" (Our solutions / Door to door),
// tradução para o espanhol do site antigo (servicios accesorios) e página
// Trading Internacional do site Trust Group.

export type SolutionId = 'sourcing' | 'quality' | 'process' | 'door-to-door' | 'on-demand' | 'accessory'
export type Solution = { id: SolutionId; icon: string; title: string; description: string }

export const solutions: Solution[] = [
  {
    id: 'sourcing',
    icon: 'search',
    title: 'Supplier sourcing & negotiation',
    description:
      'We identify and develop qualified manufacturers in Asia, Europe and the Middle East, and negotiate price, terms and payment conditions, with the possibility of a credit line.',
  },
  {
    id: 'quality',
    icon: 'badgeCheck',
    title: 'Supplier quality assessment',
    description:
      'Technical qualification of every supplier before the first shipment: specification review, documentation and reliable quality control at origin.',
  },
  {
    id: 'process',
    icon: 'route',
    title: 'Process management',
    description:
      'We manage the entire international transit until arrival at the destination port, with KPI tracking against the agreed SLA.',
  },
  {
    id: 'door-to-door',
    icon: 'truck',
    title: 'Door-to-door control',
    description:
      'Port collection, storage and delivery to the final destination through Trust Group, with a single point of contact for the whole operation.',
  },
  {
    id: 'on-demand',
    icon: 'network',
    title: 'On-demand sourcing',
    description:
      'Looking for a product outside our portfolio, even in another segment? We locate the suppliers that best match your specification.',
  },
  {
    id: 'accessory',
    icon: 'clipboard',
    title: 'Accessory services',
    description:
      'Supplier audits, supplier consolidation, laboratory testing and product inspection, available as stand-alone services.',
  },
]

export type AccessoryServiceId = 'audit' | 'consolidation' | 'lab' | 'inspection'
export const accessoryServices: { id: AccessoryServiceId; label: string }[] = [
  { id: 'audit', label: 'Supplier audit' },
  { id: 'consolidation', label: 'Supplier consolidation' },
  { id: 'lab', label: 'Laboratory testing' },
  { id: 'inspection', label: 'Product inspection' },
]

export type ProcessStepId = 'requirement' | 'offer' | 'shipment' | 'delivery'
export type ProcessStep = { id: ProcessStepId; title: string; description: string }
export const processSteps: ProcessStep[] = [
  {
    id: 'requirement',
    title: 'Your requirement',
    description: 'Product, technical specification, CAS number, end use and annual volume.',
  },
  {
    id: 'offer',
    title: 'Offer & negotiation',
    description: 'You receive a structured offer with price, Incoterm, lead time and payment terms.',
  },
  {
    id: 'shipment',
    title: 'Shipment & transit',
    description:
      'Quality control at origin, cargo booking, documentation and international transit, tracked in line with the established SLA.',
  },
  {
    id: 'delivery',
    title: 'Clearance & delivery',
    description: 'Customs clearance, storage and delivery to your plant through Trust Group companies.',
  },
]

export type RiskPillarId = 'compliance' | 'dangerous-goods' | 'quality' | 'payments'
export type RiskPillar = { id: RiskPillarId; icon: string; title: string; description: string }
export const riskPillars: RiskPillar[] = [
  {
    id: 'compliance',
    icon: 'scale',
    title: 'Regulatory compliance',
    description:
      'Products controlled by the Federal Police, Civil Police, Army, IBAMA, MAPA or ANVISA are handled with the licenses each link of the chain requires.',
  },
  {
    id: 'dangerous-goods',
    icon: 'shield',
    title: 'Dangerous goods',
    description:
      'IMO-classified cargo shipped with the right packaging, Safety Data Sheets and emergency response documentation.',
  },
  {
    id: 'quality',
    icon: 'badgeCheck',
    title: 'Quality at origin',
    description: 'Supplier qualification, pre-shipment inspection and laboratory testing before the cargo leaves port.',
  },
  {
    id: 'payments',
    icon: 'landmark',
    title: 'Payments & terms',
    description: 'Structured payment terms and financing options that protect your cash flow and the operation.',
  },
]

export type AudienceKey = 'buyers' | 'suppliers'
export type AudienceItemId = {
  buyers: 'new-origins' | 'demanding-sectors' | 'tax-logistics' | 'end-to-end'
  suppliers: 'market-entry' | 'licensed-logistics' | 'visibility' | 'long-term'
}
export type AudienceItem<K extends AudienceKey = AudienceKey> = { id: AudienceItemId[K]; text: string }
type Audience<K extends AudienceKey> = {
  eyebrow: string
  title: string
  items: AudienceItem<K>[]
  cta: { label: string; href: string }
}
export const audiences: { [K in AudienceKey]: Audience<K> } = {
  buyers: {
    eyebrow: 'For industry & distributors',
    title: 'Import your industrial inputs with a global partner',
    items: [
      { id: 'new-origins', text: 'Access to new origins and products from qualified suppliers' },
      { id: 'demanding-sectors', text: 'Inputs for sectors with demanding technical and regulatory requirements' },
      { id: 'tax-logistics', text: 'Tax and logistics planning to optimize costs and cash flow' },
      { id: 'end-to-end', text: 'End-to-end follow-up, from purchase at origin to delivery at your plant' },
    ],
    cta: { label: 'Request a quote', href: '/contact' },
  },
  suppliers: {
    eyebrow: 'For international suppliers',
    title: 'Enter Brazil and Latin America with a partner that knows the market',
    items: [
      { id: 'market-entry', text: 'Market entry backed by technical, regulatory and logistics expertise' },
      { id: 'licensed-logistics', text: 'Licensed logistics structure in Brazil for regulated products' },
      { id: 'visibility', text: 'Real-time visibility of every foreign trade operation' },
      { id: 'long-term', text: 'Long-term partnerships designed for each product and market' },
    ],
    cta: { label: 'Become a supplier', href: '/suppliers' },
  },
}

// "What are we looking for?" (página /suppliers) — apresentação comercial (ULTIMA APRESENTAÇÃO).
export type LookingForId = 'partner' | 'long-term' | 'hands-on' | 'quality' | 'on-time'
export type LookingForItem = { id: LookingForId; icon: string; title: string; description: string }
export const lookingFor: LookingForItem[] = [
  { id: 'partner', icon: 'handshake', title: 'A trustworthy partner', description: 'Transparent, compliant and consistent in every negotiation.' },
  { id: 'long-term', icon: 'clock', title: 'Long-term relationships', description: 'Partnerships designed to grow over many years, not single deals.' },
  { id: 'hands-on', icon: 'target', title: 'A hands-on approach', description: 'Close collaboration on specifications, documentation and logistics.' },
  { id: 'quality', icon: 'badgeCheck', title: 'Products with quality', description: 'Stable, certified quality that meets industrial specifications.' },
  { id: 'on-time', icon: 'truck', title: 'Delivery on time', description: 'Reliable production planning and on-time shipments.' },
]
