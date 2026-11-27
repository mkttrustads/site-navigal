// Textos de interface em inglês (idioma-fonte e padrão do site) e metadados de
// página. Os textos "de conteúdo" (produtos, setores, soluções...) continuam em
// content/*.ts; PT-BR e ES vivem em ./pt.ts e ./es.ts e precisam ter exatamente
// as mesmas chaves (o TypeScript e `npm run check:i18n` conferem).
//
// Regra: nome de marca, de empresa do grupo, sigla regulatória (IBAMA, MAPA,
// ANVISA), norma (ISO 9001, SASSMAQ), CAS, NCM e fórmula química não se traduzem.

export const ui = {
  // Acessibilidade e navegação
  'a11y.skipToContent': 'Skip to content',
  'a11y.language': 'Language',
  'a11y.mainNav': 'Main',
  'a11y.openMenu': 'Open menu',
  'a11y.closeMenu': 'Close menu',
  'a11y.breadcrumb': 'Breadcrumb',
  'a11y.backToTop': 'Back to top',
  'contactFab.open': 'Contact us',
  'contactFab.close': 'Close',
  'contactFab.title': 'How can we help?',
  'contactFab.subtitle': 'Select your profile to continue.',
  'contactFab.supplier.title': 'I’m a supplier',
  'contactFab.supplier.description': 'I want to supply my products',
  'contactFab.industry.title': 'I’m a manufacturer or distributor',
  'contactFab.industry.description': 'I want to import raw materials',
  'header.homeLabel': 'Navigal Trading Solutions Limited, home',
  'header.contact': 'Contact',

  // Termos comuns
  'common.home': 'Home',
  'common.ourMission': 'Our mission',
  'common.whatWeDo': 'What we do',
  'common.industries': 'Industries',
  'common.whoWeServe': 'Who we serve',
  'common.viewProducts': 'View products',
  'common.productCount': '{count} products',

  // Rodapé
  'footer.homeLabel': 'Navigal home',
  'footer.description':
    'A global trading platform that structures international supply chains and delivers strategic raw materials to Latin American industry.',
  'footer.companyOf': 'A company of',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',

  // Home
  'home.hero.eyebrow': 'Navigal Trading Solutions · A Trust Group company',
  'home.hero.title': 'Connecting global markets to Brazilian industry',
  'home.hero.subtitle':
    'Navigal is the trading company of Trust Group. We buy from you, develop demand with manufacturers and distributors in Brazil and LATAM, and Trust Group handles the import.',
  'home.hero.cta.supplier': 'I’m a supplier',
  'home.hero.cta.import': 'I want to import',
  'home.hero.proof.label': 'Trust Group in numbers',
  'home.hero.proof.ranking': 'chemical importer in Brazil*',
  'home.hero.proof.years': 'years in the market (Trust Group)',
  'home.hero.proof.warehousing': 'of warehousing across Brazil',
  'home.hero.proof.people': 'people across the group',
  'home.imageAlt': "Bulk raw material being loaded into a vessel's hold",
  'home.about.eyebrow': 'Who we are',
  'home.about.title': 'We connect global suppliers to Latin American industry',
  'home.about.p1':
    'Navigal is the international trading company of Trust Group. We connect global suppliers to manufacturers and distributors across Latin America.',
  'home.about.p2': 'The ideal partner to conduct international business with confidence.',
  'home.about.highlight': 'From strategy to delivery.',
  'home.about.backedBy': 'Backed by',
  'home.about.link': 'Discover Trust Group',
  'home.about.mission': "To find the best possible combination of quality, price and capability for each client’s business.",
  'home.what.eyebrow': 'What we do',
  'home.what.title': 'We handle the hard parts',
  'home.what.item1': 'Supply of strategic industrial inputs.',
  'home.what.item2': 'Supplier development across Asia, Europe and the Middle East.',
  'home.what.item3': 'Local sales force and customer base in Latin America.',
  'home.what.link': 'Explore our solutions',
  'home.what.imageAlt': 'Container ship berthed at a port terminal at dusk',
  'home.industries.link': 'Full portfolio',
  'home.industries.carouselLabel': 'Industries we serve',
  'home.industries.slideLabel': 'Industry {current} of {total}',
  'home.industries.prev': 'Previous industries',
  'home.industries.next': 'Next industries',
  'home.sectors.agribusiness': 'Agribusiness',
  'home.sectors.animalFeed': 'Animal feed',
  'home.sectors.foodPharma': 'Food and pharma',
  'home.sectors.waterTreatment': 'Water treatment',
  'home.sectors.cosmeticsHomeCare': 'Cosmetics and home care',
  'home.sectors.resinsPlasticizers': 'Resins and plasticizers',
  'home.sectors.paints': 'Paints',
  'home.sectors.automotive': 'Automotive',
  'home.network.eyebrow': 'Global network',
  'home.network.title': 'A reliable partner to sell in Brazil',
  'home.network.subtitle':
    'Navigal buys from you and sells to Brazilian industry. Trust Group supports the import.',
  'home.network.step1.title': 'Global supplier',
  'home.network.step1.text': 'Sell and ship to one counterpart.',
  'home.network.step2.title': 'Navigal',
  'home.network.step2.text': 'Buys from you and sells in Brazil and LATAM.',
  'home.network.step3.title': 'Customers',
  'home.network.step3.text': 'Imports with full support from Trust Group.',
  'home.cta.title': 'Import your supplies with a global partner',

  // About
  'about.hero.title': 'Connecting the world to Latin American industry',
  'about.hero.subtitle':
    'We structure international supply chains and trade strategic raw materials, connecting the world’s key trade hubs to practical, secure execution.',
  'about.story.trustLink': 'Discover Trust Group',
  'about.imageAlt': 'Rio de Janeiro bay with Sugarloaf Mountain',
  'about.presence.eyebrow': 'Global presence',
  'about.presence.title': 'Present where trade happens',
  'about.presence.intro':
    'A presence that combines the sophistication of global hubs with first-hand knowledge of Latin American markets.',
  'about.cta.title': 'Together beyond borders',

  // Solutions
  'solutions.hero.title': 'End-to-end international trading solutions',
  'solutions.hero.subtitle':
    'Reliability, quality and ease across every link of your supply chain, from the supplier’s gate to your plant.',
  'solutions.what.title': 'Discover international business opportunities',
  'solutions.what.intro':
    'We buy and sell international products, with special expertise in our product portfolio, and tailor each solution to your specific needs. As a sourcing company, we keep expanding our network of clients and suppliers to offer the best connection for everyone involved.',
  'solutions.how.eyebrow': 'How it works',
  'solutions.how.title': 'From requirement to delivery, one accountable partner',
  'solutions.how.intro': 'Send us the details of your requirement and we will quickly come back with an offer for your analysis.',
  'solutions.risk.eyebrow': 'Risk management',
  'solutions.risk.title': 'Predictability is built, link by link',
  'solutions.risk.intro':
    'International supply of regulated and dangerous goods demands more than a good price. We govern the risks that matter to industry, so every shipment arrives compliant, on specification and on time.',
  'solutions.who.title': 'Built for both sides of the trade',

  // Products
  'products.hero.title': 'Raw materials of excellence for many industrial sectors',
  'products.hero.subtitle':
    'For these products we have proven experience and can offer the best conditions for import. We work with renowned manufacturers and provide reliable quality control and financial support.',
  'products.onDemand.eyebrow': 'On-demand sourcing',
  'products.onDemand.title': 'Looking for a product that is not listed?',
  'products.onDemand.body':
    'Send us the product, technical specification, CAS number, end use and annual volume. We will find the suppliers that best match your requirement, even in other segments.',
  'products.onDemand.cta': 'Send your requirement',
  'products.highlightsLabel': 'Photo highlights',
  'products.caption.sulfur': 'Sulfur for the fertilizer industry',
  'products.caption.resins': 'Thermoplastic resins',
  'products.caption.lab': 'Quality control at origin',

  // Catálogo de produtos
  'catalog.searchLabel': 'Search products by name or CAS number',
  'catalog.searchPlaceholder': 'Search by product or CAS number',
  'catalog.showing': 'Showing',
  'catalog.of': 'of',
  'catalog.products': 'products',
  'catalog.filterLabel': 'Filter by industry',
  'catalog.allIndustries': 'All industries',
  'catalog.noResults': 'No products match your search. Our on-demand sourcing team can find it for you.',
  'catalog.technicalData': 'Technical data',
  'sheet.chemicalName': 'Chemical name',
  'sheet.cas': 'CAS No.',
  'sheet.formula': 'Formula',
  'sheet.ncm': 'NCM',
  'sheet.description': 'Description',
  'sheet.applications': 'Applications',
  'sheet.buyers': 'Typical buyers',
  'sheet.regulatory': 'Regulatory notes (Brazil)',
  'sheet.documents': 'Documents provided',

  // Suppliers
  'suppliers.hero.title': 'Grow with Navigal’s clients across Latin America',
  'suppliers.hero.subtitle':
    'Register your company and the products you manufacture or trade. We work at every stage, from prospecting to delivery to the client.',
  'suppliers.intro':
    'Brazil and Latin America are among the most promising markets for industrial inputs, and among the most complex. Navigal knows the region’s regulatory, customs, logistics and payment requirements and turns them into a clear path to market.',
  'suppliers.extraItem': 'Local sales force with clients in agribusiness, food, pharma, water treatment and automotive',
  'suppliers.look.eyebrow': 'What we look for',
  'suppliers.look.title': 'The partners we build with',
  'suppliers.gateway.eyebrow': 'Your gateway',
  'suppliers.gateway.title': 'From your plant to Latin American industry',
  'suppliers.gateway.intro':
    'Combined with Trust Group’s licensed structure in Brazil, we handle customs, storage and delivery of regulated and dangerous goods, with full visibility of each operation. The Trust Tech platform tracks every stage of the operation.',
  'suppliers.register.title': 'Register your company',
  'suppliers.register.intro':
    'Tell us about your products and capacity. Our team will review your profile and contact you to discuss the next steps.',

  // Contact
  'contact.hero.title': 'How can we help?',
  'contact.hero.subtitle':
    'Let us know the details of your requirement and we will quickly send you an offer for your analysis.',
  'contact.getInTouch': 'Get in touch',
  'contact.help': 'Whatever you need, we are here to help',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.hq': 'Headquarters',
  'contact.tabsLabel': 'Contact form',
  'contact.tab.supplier': 'Become a supplier',
  'contact.tab.quote.intro': 'Step out of local distributors’ hands and start importing your own product line.',
  'contact.tab.supplier.intro': 'Grow together with Navigal’s clients by registering your company and products.',

  // Formulários
  'form.submit.quote': 'Send request',
  'form.submit.supplier': 'Register as a supplier',
  'form.sending': 'Sending…',
  'form.thanks': 'Thank you. Your message has been received',
  'form.thanksBody': 'Our team will review the details and get back to you shortly.',
  'form.select': 'Select',
  'form.required': 'Required fields',
  'form.error': 'We could not send your message right now. Please try again or write to',

  // Seções compartilhadas
  'trust.eyebrow': 'Part of Trust Group',
  'trust.title': 'Global reach, backed by a full-service group on the ground',
  'trust.p1':
    'Navigal is part of Trust Group, one of Brazil’s leading foreign trade groups. Every operation can be integrated with the group’s companies: customs brokerage, international freight forwarding, warehousing and national distribution.',
  'trust.p2': 'One partner from the supplier’s gate to your plant.',
  'trust.visit': 'Visit trust.group',
  'trust.imageAlt': 'Aerial view of a Trust Group logistics center in Brazil',
  'trust.imageAlt2': 'Reach stacker lifting a shipping container at a port terminal',
  'trust.imageAlt3': 'Warehouse operator with a tablet next to a forklift and pallet racking',
  'trust.carouselLabel': 'About Navigal and Trust Group',
  'trust.slideLabel': 'Slide {current} of {total}',
  'trust.prev': 'Previous slide',
  'trust.next': 'Next slide',
  'trust.goTo': 'Go to slide {n}',
  'cta.title': 'Step out of local distributors’ hands and import your own product line',
  'cta.body':
    'Send us the technical specification, end use and annual volume. We will come back with an analysis and supply options.',
  'certs.eyebrow': 'Certifications & compliance',
  'certs.title': 'Credentials that back every operation',
  'taglog.eyebrow': 'Logistics in Brazil',
  'taglog.title': 'Licensed warehousing across Brazil, through Taglog',
  'taglog.total': 'Total:',
  'commitment.eyebrow': 'Our commitment',
  'commitment.title': 'Our commitment goes further',
  'commitment.sealsTitle': 'Independently assessed by',
  'commitment.imageAlt':
    'Children wearing Instituto Trust vests and holding basketballs, posing on a sports court with a coach from the project',

  // Mapa de rotas
  'map.aria':
    "Map of Navigal's network: Navigal's base in the United Arab Emirates, offices in Miami and Brazil, and sourcing routes from Italy, Turkey, Oman, China, Taiwan, Vietnam and Malaysia converging on Navigal, with a single route from Navigal to Brazil and Latin America.",
  'map.place.Navigal': 'Navigal',
  'map.place.NavigalHub': 'Navigal · UAE',
  'map.place.BrazilLatam': 'Brazil / LATAM',
  'map.place.Miami': 'Miami',
  'map.place.Brazil': 'Brazil',
  'map.place.Italy': 'Italy',
  'map.place.Turkey': 'Turkey',
  'map.place.Oman': 'Oman',
  'map.place.China': 'China',
  'map.place.Taiwan': 'Taiwan',
  'map.place.Vietnam': 'Vietnam',
  'map.place.Malaysia': 'Malaysia',
  'map.legend.offices': 'Navigal offices',
  'map.legend.origins': 'Main sourcing origins',
  'map.legend.routes': 'Supply routes to Latin America',

  // 404
  'notFound.eyebrow': 'Error 404',
  'notFound.title': 'This route does not exist',
  'notFound.body': 'The page you are looking for may have moved. Let us take you back on course.',
  'notFound.back': 'Back to home',
} as const

export type UiKey = keyof typeof ui

export type PageMeta = { title: string; description: string }

/** Título e descrição de cada rota (EN). O sufixo " | Navigal Trading Solutions" é aplicado a todas, menos a Home. */
export const pageMeta = {
  '/': {
    title: 'Navigal Trading Solutions | International Trading for Latin American Industry',
    description:
      'Navigal structures international supply chains and trades strategic raw materials for Latin American industry: qualified global suppliers, managed risk and door-to-door delivery.',
  },
  '/about': {
    title: 'About Navigal',
    description:
      'Born from the chemical industry: Navigal is the international trading company launched by Trust Group in 2024, operating from the United Arab Emirates and connecting global suppliers to Latin American industry.',
  },
  '/solutions': {
    title: 'Solutions',
    description:
      'Supplier sourcing and negotiation, quality assessment, process management and door-to-door control for international purchases of raw materials.',
  },
  '/products': {
    title: 'Product portfolio by industry',
    description:
      'Navigal’s raw materials by industry: agribusiness, cosmetics, water treatment, food and pharma, automotive, polyurethanes, coatings, textile and plastics.',
  },
  '/suppliers': {
    title: 'For Suppliers',
    description:
      'International manufacturers: enter Brazil and Latin America with Navigal. Local sales force, licensed logistics for regulated products and long-term partnerships.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Request a quote or register as a supplier. Navigal Trading Solutions Limited, Ras Al Khaimah, United Arab Emirates.',
  },
} as const satisfies Record<string, PageMeta>

export type MetaPath = keyof typeof pageMeta

/** Sufixo do <title> em todas as páginas internas (igual ao `title.template` do layout). */
export const TITLE_SUFFIX = ' | Navigal Trading Solutions'
