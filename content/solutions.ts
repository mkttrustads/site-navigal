// Soluções, etapas do processo e frentes de mitigação de risco.
// Fontes: apresentação "ULTIMA APRESENTAÇÃO" (Our solutions / Door to door),
// tradução para o espanhol do site antigo (servicios accesorios) e página
// Trading Internacional do site Trust Group.

export type Solution = { icon: string; title: string; description: string }

export const solutions: Solution[] = [
  {
    icon: 'search',
    title: 'Supplier sourcing & negotiation',
    description:
      'We identify and develop qualified manufacturers in Asia, Europe and the Middle East, and negotiate price, terms and payment conditions, with the possibility of a credit line.',
  },
  {
    icon: 'badgeCheck',
    title: 'Supplier quality assessment',
    description:
      'Technical qualification of every supplier before the first shipment: specification review, documentation and reliable quality control at origin.',
  },
  {
    icon: 'route',
    title: 'Process management',
    description:
      'We manage the entire international transit until arrival at the destination port, with KPI tracking against the agreed SLA.',
  },
  {
    icon: 'truck',
    title: 'Door-to-door control',
    description:
      'Port collection, storage and delivery to the final destination through Trust Group, with a single point of contact for the whole operation.',
  },
  {
    icon: 'network',
    title: 'On-demand sourcing',
    description:
      'Looking for a product outside our portfolio, even in another segment? We locate the suppliers that best match your specification.',
  },
  {
    icon: 'clipboard',
    title: 'Accessory services',
    description:
      'Supplier audits, supplier consolidation, laboratory testing and product inspection, available as stand-alone services.',
  },
]

export const accessoryServices = ['Supplier audit', 'Supplier consolidation', 'Laboratory testing', 'Product inspection']

export const processSteps = [
  {
    title: 'Your requirement',
    description: 'Product, technical specification, CAS number, end use and annual volume.',
  },
  {
    title: 'Sourcing & qualification',
    description: 'We map qualified manufacturers and assess quality, capacity and compliance at origin.',
  },
  {
    title: 'Offer & negotiation',
    description: 'You receive a structured offer with price, Incoterm, lead time and payment terms.',
  },
  {
    title: 'Shipment & transit',
    description: 'Booking, documentation and international transit, tracked against the agreed SLA.',
  },
  {
    title: 'Clearance & delivery',
    description: 'Customs clearance, storage and delivery to your plant through Trust Group companies.',
  },
]

export const riskPillars = [
  {
    icon: 'scale',
    title: 'Regulatory compliance',
    description:
      'Products controlled by the Federal Police, Civil Police, Army, IBAMA, MAPA or ANVISA are handled with the licenses each link of the chain requires.',
  },
  {
    icon: 'shield',
    title: 'Dangerous goods',
    description:
      'IMO-classified cargo shipped with the right packaging, Safety Data Sheets and emergency response documentation.',
  },
  {
    icon: 'badgeCheck',
    title: 'Quality at origin',
    description: 'Supplier qualification, pre-shipment inspection and laboratory testing before the cargo leaves port.',
  },
  {
    icon: 'landmark',
    title: 'Payments & terms',
    description: 'Structured payment terms and financing options that protect your cash flow and the operation.',
  },
]

export const audiences = {
  buyers: {
    eyebrow: 'For industry & distributors',
    title: 'Import your own product line with a global partner.',
    items: [
      'Access to new origins and products from qualified suppliers',
      'Inputs for sectors with demanding technical and regulatory requirements',
      'Tax and logistics planning to optimize costs and cash flow',
      'End-to-end follow-up, from purchase at origin to delivery at your plant',
    ],
    cta: { label: 'Request a quote', href: '/contact' },
  },
  suppliers: {
    eyebrow: 'For international suppliers',
    title: 'Enter Brazil and Latin America with a partner that knows the market.',
    items: [
      'Market entry backed by technical, regulatory and logistics expertise',
      'Licensed logistics structure in Brazil for regulated products',
      'Real-time visibility of every foreign trade operation',
      'Long-term partnerships designed for each product and market',
    ],
    cta: { label: 'Become a supplier', href: '/suppliers' },
  },
}
