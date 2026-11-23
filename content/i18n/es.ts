// Español (es), neutro y orientado a América Latina, con trato formal ("usted")
// por tratarse de comunicación B2B. Se mantienen sin traducir: Navigal, Trust
// Group, Trust Tech, Taglog, Instituto Trust, siglas regulatorias (IBAMA, MAPA,
// ANVISA), normas (ISO 9001, SASSMAQ), CAS, NCM, fórmulas, Incoterm, SLA, KPI y
// términos de mercado sin equivalente corriente (sourcing, trading).
// Términos reutilizados de docs/alinhamento-v4.md, ya revisados por Marketing.

import type { Translation } from './types'

const SDS = 'Hoja de Datos de Seguridad (HDS)'
const EMERGENCY = 'Hoja de Respuesta a Emergencias'

const POLICE_LICENSE =
  'Controlado por la Policía Federal de Brasil y, en algunos estados, por la Policía Civil. Todos los eslabones de la cadena deben contar con licencia.'
const POLICE = 'Controlado por la Policía Federal de Brasil y, en algunos estados, por la Policía Civil.'
const POLICE_EXPORT = 'Controlado por la Policía Federal de Brasil en las exportaciones a Bolivia, Colombia y Perú.'
const IMO = 'Mercancía peligrosa clasificada por la IMO.'

export const es: Translation = {
  ui: {
    'a11y.skipToContent': 'Ir al contenido',
    'a11y.language': 'Idioma',
    'a11y.mainNav': 'Principal',
    'a11y.openMenu': 'Abrir menú',
    'a11y.closeMenu': 'Cerrar menú',
    'a11y.breadcrumb': 'Ruta de navegación',
    'header.homeLabel': 'Navigal Trading Solutions Limited, inicio',

    'common.home': 'Inicio',
    'common.ourMission': 'Nuestra misión',
    'common.whatWeDo': 'Qué hacemos',
    'common.industries': 'Sectores',
    'common.whoWeServe': 'A quién atendemos',
    'common.viewProducts': 'Ver productos',
    'common.productCount': '{count} productos',

    'footer.homeLabel': 'Navigal, inicio',
    'footer.description':
      'Una plataforma global de trading que estructura cadenas de suministro internacionales y entrega materias primas estratégicas a la industria latinoamericana.',
    'footer.companyOf': 'Una empresa de',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',

    'home.hero.lead':
      'Estructuramos cadenas de suministro internacionales y comercializamos materias primas estratégicas para la industria latinoamericana: desde proveedores calificados en origen hasta la entrega en su planta, con cada riesgo gobernado a lo largo del camino.',
    'home.hero.explore': 'Conozca nuestro portafolio',
    'home.aboutLink': 'Sobre Navigal',
    'home.imageAlt': 'Materia prima a granel cargándose en la bodega de un buque',
    'home.mission.short':
      'Encontrar la mejor combinación posible de calidad, precio y capacidad para el negocio de cada cliente.',
    'home.what.title': 'Soluciones internacionales de trading, de punta a punta.',
    'home.what.intro':
      'Desde el desarrollo de proveedores en origen hasta la entrega en su planta, con confiabilidad, calidad y facilidad en cada etapa.',
    'home.what.link': 'Todas las soluciones',
    'home.industries.title': 'Materias primas para sectores con altos estándares técnicos y regulatorios.',
    'home.industries.link': 'Portafolio completo',
    'home.network.eyebrow': 'Red global',
    'home.network.title': 'Donde la oferta global se encuentra con la demanda latinoamericana.',
    'home.network.p1':
      'Con base estratégica en los Emiratos Árabes Unidos, uno de los centros comerciales más dinámicos del mundo, trabajamos junto a fabricantes de Asia, Europa y Medio Oriente.',
    'home.network.p2':
      'Nuestro equipo en Brasil nos mantiene cerca de los compradores industriales de toda América Latina, donde evaluamos cada oportunidad de primera mano.',
    'home.who.title': 'Dos lados de la misma conexión de confianza.',

    'about.hero.title': 'Inteligencia multinacional, impulsando la industria latinoamericana.',
    'about.hero.subtitle':
      'Estructuramos cadenas de suministro internacionales y comercializamos materias primas estratégicas, conectando los principales centros comerciales del mundo con una ejecución práctica y segura.',
    'about.values.eyebrow': 'Nuestros valores',
    'about.values.title': 'Lo que guía cada operación.',
    'about.imageAlt': 'Bahía de Río de Janeiro con el Pan de Azúcar',
    'about.presence.eyebrow': 'Presencia global',
    'about.presence.title': 'Presentes donde ocurre el comercio.',
    'about.presence.intro':
      'Una presencia que combina la sofisticación de los centros globales con el conocimiento directo de los mercados latinoamericanos.',

    'solutions.hero.title': 'Soluciones internacionales de trading, de punta a punta.',
    'solutions.hero.subtitle':
      'Confiabilidad, calidad y facilidad en cada eslabón de su cadena de suministro, desde la puerta del proveedor hasta su planta.',
    'solutions.what.title': 'Descubra oportunidades de negocios internacionales.',
    'solutions.what.intro':
      'Compramos y vendemos productos internacionales, con especialidad en nuestro portafolio de productos, y adaptamos cada solución a sus necesidades específicas. Como empresa de sourcing, seguimos ampliando nuestra red de clientes y proveedores para ofrecer la mejor conexión a todos los involucrados.',
    'solutions.how.eyebrow': 'Cómo funciona',
    'solutions.how.title': 'De la necesidad a la entrega, un único socio responsable.',
    'solutions.how.intro':
      'Envíenos los detalles de su requerimiento y le responderemos rápidamente con una oferta para su análisis.',
    'solutions.risk.eyebrow': 'Gestión de riesgos',
    'solutions.risk.title': 'La previsibilidad se construye, eslabón por eslabón.',
    'solutions.risk.intro':
      'El suministro internacional de productos regulados y peligrosos exige más que un buen precio. Gobernamos los riesgos que importan a la industria, para que cada embarque llegue en cumplimiento, dentro de la especificación y a tiempo.',
    'solutions.who.title': 'Pensada para ambos lados de la negociación.',

    'industries.hero.title': 'Sectores que atendemos.',
    'industries.hero.subtitle':
      'Trabajamos en sectores con altos estándares técnicos y regulatorios, donde un suministro seguro y predecible marca la diferencia.',
    'industries.sectors.eyebrow': 'Sectores',
    'industries.sectors.title': 'Entregando productos esenciales a la industria latinoamericana.',
    'industries.sectors.intro':
      'A través de nuestro portafolio de productos, ofrecemos a fabricantes brasileños y latinoamericanos las mejores oportunidades de compra para expandir sus negocios.',
    'industries.highlightsLabel': 'Fotos destacadas',
    'industries.caption.sulfur': 'Azufre para la industria de fertilizantes',
    'industries.caption.resins': 'Resinas termoplásticas',
    'industries.caption.lab': 'Control de calidad en origen',

    'products.hero.title': 'Nuestro portafolio de productos.',
    'products.hero.subtitle': 'Principales productos que suministramos hoy.',
    'products.intro.eyebrow': 'Crezcamos juntos',
    'products.intro.title': 'Materias primas de excelencia para numerosos sectores industriales.',
    'products.intro.intro':
      'Para estos productos contamos con experiencia comprobada y podemos ofrecer las mejores condiciones de importación. Trabajamos con fabricantes reconocidos y ofrecemos control de calidad confiable y apoyo financiero.',
    'products.onDemand.eyebrow': 'Sourcing a pedido',
    'products.onDemand.title': '¿Busca un producto que no figura en la lista?',
    'products.onDemand.body':
      'Envíenos el producto, la especificación técnica, el número CAS, el uso final y el volumen anual. Encontraremos los proveedores que mejor se ajusten a su requerimiento, incluso en otros segmentos.',
    'products.onDemand.cta': 'Envíe su requerimiento',

    'catalog.searchLabel': 'Buscar productos por nombre o número CAS',
    'catalog.searchPlaceholder': 'Buscar por producto o número CAS',
    'catalog.showing': 'Mostrando',
    'catalog.of': 'de',
    'catalog.products': 'productos',
    'catalog.filterLabel': 'Filtrar por sector',
    'catalog.allIndustries': 'Todos los sectores',
    'catalog.noResults':
      'Ningún producto coincide con su búsqueda. Nuestro equipo de sourcing a pedido puede encontrarlo por usted.',
    'catalog.technicalData': 'Datos técnicos',
    'sheet.chemicalName': 'Nombre químico',
    'sheet.cas': 'N.º CAS',
    'sheet.formula': 'Fórmula',
    'sheet.ncm': 'NCM',
    'sheet.description': 'Descripción',
    'sheet.applications': 'Aplicaciones',
    'sheet.buyers': 'Compradores típicos',
    'sheet.regulatory': 'Notas regulatorias (Brasil)',
    'sheet.documents': 'Documentos proporcionados',

    'suppliers.hero.title': 'Crezca con los clientes de Navigal en toda América Latina.',
    'suppliers.hero.subtitle':
      'Registre su empresa y los productos que fabrica o comercializa. Trabajamos en cada etapa, desde la prospección hasta la entrega al cliente.',
    'suppliers.intro':
      'Brasil y América Latina están entre los mercados más prometedores para insumos industriales, y entre los más complejos. Navigal conoce los requisitos regulatorios, aduaneros, logísticos y de pago de la región y los convierte en un camino claro hacia el mercado.',
    'suppliers.extraItem':
      'Fuerza de ventas local con clientes en agroindustria, alimentos, farma, tratamiento de agua y automotriz',
    'suppliers.look.eyebrow': 'Qué buscamos',
    'suppliers.look.title': 'Los socios con quienes construimos.',
    'suppliers.gateway.eyebrow': 'Su puerta de entrada',
    'suppliers.gateway.title': 'De su planta a la industria latinoamericana.',
    'suppliers.gateway.intro':
      'Combinados con la estructura licenciada de Trust Group en Brasil, nos encargamos del despacho aduanero, el almacenamiento y la entrega de productos regulados y peligrosos, con visibilidad total de cada operación. La plataforma Trust Tech da seguimiento a cada etapa de la operación.',
    'suppliers.register.title': 'Registre su empresa.',
    'suppliers.register.intro':
      'Cuéntenos sobre sus productos y su capacidad. Nuestro equipo revisará su perfil y se pondrá en contacto para conversar sobre los próximos pasos.',

    'contact.hero.title': '¿Cómo podemos ayudar?',
    'contact.hero.subtitle':
      'Háganos saber los detalles de su requerimiento y le enviaremos rápidamente una oferta para su análisis.',
    'contact.getInTouch': 'Contáctenos',
    'contact.help': 'Lo que necesite, estamos aquí para ayudar.',
    'contact.email': 'Correo electrónico',
    'contact.phone': 'Teléfono',
    'contact.hq': 'Sede',
    'contact.tabsLabel': 'Formulario de contacto',
    'contact.tab.supplier': 'Sea proveedor',
    'contact.tab.quote.intro':
      'Salga de las manos de los distribuidores locales y comience a importar su propia línea de productos.',
    'contact.tab.supplier.intro': 'Crezca junto con los clientes de Navigal registrando su empresa y sus productos.',

    'form.submit.quote': 'Enviar solicitud',
    'form.submit.supplier': 'Registrarse como proveedor',
    'form.sending': 'Enviando…',
    'form.thanks': 'Gracias. Hemos recibido su mensaje.',
    'form.thanksBody': 'Nuestro equipo revisará los detalles y le responderá en breve.',
    'form.select': 'Seleccione',
    'form.required': 'Campos obligatorios',
    'form.error': 'No pudimos enviar su mensaje en este momento. Inténtelo de nuevo o escriba a',

    'trust.eyebrow': 'Parte de Trust Group',
    'trust.title': 'Alcance global, respaldado por un grupo de servicio completo en el terreno.',
    'trust.p1':
      'Navigal forma parte de Trust Group, uno de los principales grupos de comercio exterior de Brasil. Cada operación puede integrarse con las empresas del grupo: despacho aduanero, agenciamiento de carga internacional, almacenamiento y distribución nacional.',
    'trust.p2': 'Un solo socio, desde la puerta del proveedor hasta su planta.',
    'trust.visit': 'Visite trust.group',
    'trust.imageAlt': 'Vista aérea de un centro logístico de Trust Group en Brasil',
    'cta.title': 'Salga de las manos de los distribuidores locales e importe su propia línea de productos.',
    'cta.body':
      'Envíenos la especificación técnica, el uso final y el volumen anual. Volveremos con un análisis y opciones de suministro.',
    'certs.eyebrow': 'Certificaciones y cumplimiento',
    'certs.title': 'Credenciales que respaldan cada operación.',
    'taglog.eyebrow': 'Logística en Brasil',
    'taglog.title': 'Almacenamiento licenciado en todo Brasil, con Taglog.',
    'taglog.total': 'Total:',
    'commitment.eyebrow': 'Nuestro compromiso',
    'commitment.title': 'Responsabilidad más allá de la operación.',

    'map.aria':
      'Mapa de la red de Navigal: base de Navigal en los Emiratos Árabes Unidos, oficinas en Miami y Brasil, y rutas de abastecimiento desde Italia, Turquía, Omán, China, Taiwán, Vietnam y Malasia que convergen en Navigal, con una única ruta de Navigal hacia Brasil y América Latina.',
    'map.place.Navigal': 'Navigal',
    'map.place.Miami': 'Miami',
    'map.place.Brazil': 'Brasil',
    'map.place.Italy': 'Italia',
    'map.place.Turkey': 'Turquía',
    'map.place.Oman': 'Omán',
    'map.place.China': 'China',
    'map.place.Taiwan': 'Taiwán',
    'map.place.Vietnam': 'Vietnam',
    'map.place.Malaysia': 'Malasia',
    'map.legend.offices': 'Oficinas de Navigal',
    'map.legend.origins': 'Principales orígenes de abastecimiento',
    'map.legend.routes': 'Rutas de suministro hacia América Latina',

    'notFound.eyebrow': 'Error 404',
    'notFound.title': 'Esta ruta no existe.',
    'notFound.body': 'La página que busca puede haber sido movida. Le ayudamos a retomar el rumbo.',
    'notFound.back': 'Volver al inicio',
  },

  meta: {
    '/': {
      title: 'Navigal Trading Solutions | Trading Internacional para la Industria Latinoamericana',
      description:
        'Navigal estructura cadenas de suministro internacionales y comercializa materias primas estratégicas para la industria latinoamericana: proveedores globales calificados, riesgo gestionado y entrega puerta a puerta.',
    },
    '/about': {
      title: 'Sobre Navigal',
      description:
        'Nacida de la industria química: Navigal es la trading internacional lanzada por Trust Group en 2021, opera desde los Emiratos Árabes Unidos y conecta proveedores globales con la industria latinoamericana.',
    },
    '/solutions': {
      title: 'Soluciones',
      description:
        'Búsqueda y negociación con proveedores, evaluación de calidad, gestión de procesos y control puerta a puerta para compras internacionales de materias primas.',
    },
    '/products': {
      title: 'Portafolio de productos',
      description:
        'Portafolio de productos de Navigal: fertilizantes, químicos industriales, tratamiento de agua, ingredientes para cosméticos y alimentos, poliuretanos, resinas e insumos para recubrimiento cerámico, de fabricantes calificados en todo el mundo.',
    },
    '/industries': {
      title: 'Sectores',
      description:
        'Materias primas para agroindustria, cosmética y cuidado del hogar, tratamiento de agua, alimentos y farma, automotriz, poliuretanos, pinturas y recubrimientos, recubrimiento cerámico, textil y plásticos en América Latina.',
    },
    '/suppliers': {
      title: 'Para Proveedores',
      description:
        'Fabricantes internacionales: ingrese a Brasil y América Latina con Navigal. Fuerza de ventas local, logística licenciada para productos regulados y alianzas de largo plazo.',
    },
    '/contact': {
      title: 'Contacto',
      description:
        'Solicite una cotización o regístrese como proveedor. Navigal Trading Solutions Limited, Ras Al Khaimah, Emiratos Árabes Unidos.',
    },
  },

  site: {
    tagline: 'Construyendo conexiones confiables.',
    nav: ['Nosotros', 'Soluciones', 'Productos', 'Sectores', 'Para Proveedores', 'Contacto'],
    quoteCta: 'Solicitar cotización',
    facts: {
      launched: 'Navigal lanzada',
      tons: 'Toneladas importadas por Navigal en 2025',
      portfolio: 'Materias primas estratégicas en nuestro portafolio',
      continents: 'Regiones de abastecimiento: Asia, Europa y Medio Oriente',
    },
    rankingFootnote:
      '*Entre más de 8.200 importadores (FOB, US$), excluidos agroquímicos y combustibles. Datos públicos de importación, ago/25 a jul/26.',
    trustGroupFacts: [
      'años en el mercado',
      'colaboradores',
      'de almacenamiento',
      'rutas internacionales',
      'certificaciones y sellos',
      'importadores químicos de Brasil (Trust Group)',
    ],
    trustGroupLines: {
      title: 'Cinco empresas trabajando juntas para que cada operación funcione de punta a punta',
      items: [
        { name: 'Comercio Exterior', description: 'Servicios de importación/exportación y financiamiento del comercio' },
        { name: 'Trading Internacional', description: 'Navigal' },
        { name: 'Logística Internacional', description: 'Flete marítimo, aéreo y terrestre, incluidas cargas de proyecto' },
        { name: 'Logística Nacional', description: 'Almacenes y transporte terrestre en todo Brasil' },
        { name: 'Global Brands Management', description: 'Expansión de marcas internacionales en Brasil' },
      ],
    },
    addressLines: ['Oficina n.º TI-4F-11, RAKEZ Amenity Center', 'Al Hamra Industrial Zone FZ', 'Ras Al Khaimah, Emiratos Árabes Unidos'],
  },

  about: {
    mission:
      'Encontrar la mejor combinación posible de calidad, precio y capacidad para el negocio de cada cliente y asegurar su plena satisfacción.',
    milestones: [
      {
        label: '2005',
        title: 'Se funda Trust en Itajaí/SC',
        description:
          'Juliano Victorino funda Trust para importar las materias primas químicas que tanto le costaba conseguir en el exterior.',
      },
      {
        label: '2021',
        title: 'Se lanza Navigal',
        description:
          'Trust Group crea su trading internacional para llevar el conocimiento del grupo al origen, trabajando codo a codo con los proveedores.',
      },
      {
        label: 'Hoy',
        title: 'Respaldo del ecosistema completo',
        description: 'Navigal opera con el respaldo total de un ecosistema de comercio exterior y logística.',
      },
    ],
    story: {
      eyebrow: 'Por qué existe Navigal',
      title: 'Nacida de la industria química',
      paragraphs: [
        'Antes de Trust Group, nuestro fundador Juliano Victorino dirigía una fábrica de detergente en polvo en Brasil y aprendió de primera mano lo difícil que es conseguir insumos químicos en el exterior. En 2005 fundó Trust en Itajaí/SC para importar esas materias primas.',
        'Dos décadas importando productos químicos y otros artículos nos enseñaron todos los requisitos técnicos, regulatorios y logísticos del mercado brasileño. En 2021, Trust Group creó Navigal para llevar este conocimiento al origen, trabajando codo a codo con los proveedores para ampliar su participación de mercado en Brasil y América Latina.',
      ],
      closing: 'Conocemos la industria porque fuimos la industria.',
      presence: 'Navigal opera desde los Emiratos Árabes Unidos, con oficina en Miami.',
    },
    principles: [
      {
        title: 'Global por naturaleza',
        description:
          'Cosmopolitas y multiculturales, hablamos el idioma de los negocios globales y respetamos las regulaciones de cada frontera que cruzamos.',
      },
      {
        title: 'Riesgo bajo gobernanza',
        description:
          'Descubrimos proveedores calificados en cualquier lugar del mundo y gobernamos los riesgos de cada operación, aportando previsibilidad y estabilidad.',
      },
      {
        title: 'El eslabón de confianza',
        description:
          'Somos la conexión entre proveedores globales confiables y las industrias que dependen de un suministro seguro y competitivo.',
      },
    ],
    values: [
      { title: 'Experiencia', description: 'Dos décadas de experiencia de Trust Group importando productos químicos y otros artículos.' },
      { title: 'Seguridad', description: 'Experiencia y capacidad analítica aplicadas para que cada negociación sea más segura.' },
      { title: 'Calidad', description: 'Siempre elevando el estándar para ofrecer el mejor servicio y producto.' },
      { title: 'Compromiso', description: 'Nuestra misión es su satisfacción, y estamos comprometidos con ella.' },
      { title: 'Puntualidad', description: 'Atendemos cada pedido con compromiso y entrega precisa.' },
    ],
    offices: [
      {
        country: 'Emiratos Árabes Unidos',
        role: 'Sede',
        detail: 'RAKEZ Amenity Center, Al Hamra Industrial Zone FZ, Ras Al Khaimah',
      },
      { country: 'Estados Unidos', role: 'Oficina en Miami', detail: 'Relaciones con proveedores y mercado en las Américas' },
      { country: 'Brasil', role: 'Equipo comercial y de operaciones', detail: 'Cerca de los compradores industriales de toda América Latina' },
    ],
  },

  credibility: {
    certifications: [
      {
        title: 'Top 35 importadores químicos de Brasil*',
        holder: 'Trust Group',
        description: 'Entre los mayores importadores químicos del país.',
      },
      {
        title: 'Certificación de la Receita Federal',
        holder: 'Trust Comércio Exterior',
        description: 'Trust Comércio Exterior está certificada por la Receita Federal de Brasil.',
      },
      {
        title: 'SASSMAQ e ISO 9001',
        holder: 'Taglog Logística Integrada, empresa de Trust Group',
        description: 'Estándares de seguridad, salud, medio ambiente y calidad en las operaciones logísticas.',
      },
    ],
    taglog: {
      licensed: 'Licenciada para productos regulados por IBAMA, MAPA, ANVISA, el Ejército Brasileño y la Policía Federal.',
      hubs: [
        { site: 'Itajaí, SC (sede)', area: '47.000+ m²', pallets: '18.000+ posiciones de palet', access: 'a 15 min del Puerto de Navegantes' },
        { site: 'Garuva, SC', area: '16.000+ m²', pallets: '5.000+ posiciones de palet', access: 'a 45 min del Puerto de Itapoá' },
        { site: 'Sumaré, SP', area: '7.000+ m²', pallets: '6.000+ posiciones de palet', access: 'a 25 min del Aeropuerto de Viracopos' },
        {
          site: 'Cabo de Santo Agostinho, PE',
          area: '10.000+ m²',
          pallets: '9.000+ posiciones de palet',
          access: 'a 30 min del Puerto de Suape',
        },
      ],
      total: { area: '80.000+ m²', pallets: '38.000+ posiciones de palet' },
    },
    commitment: [
      { title: 'Instituto Trust', description: 'El deporte como herramienta de inclusión y desarrollo social.' },
      {
        title: 'Ética, cumplimiento y sostenibilidad',
        description: 'Estándares compartidos en todo el grupo, evaluados por organizaciones independientes.',
      },
    ],
  },

  solutions: {
    solutions: [
      {
        title: 'Búsqueda y negociación con proveedores',
        description:
          'Identificamos y desarrollamos fabricantes calificados en Asia, Europa y Medio Oriente, y negociamos precio, plazos y condiciones de pago, con posibilidad de línea de crédito.',
      },
      {
        title: 'Evaluación de calidad de proveedores',
        description:
          'Calificación técnica de cada proveedor antes del primer embarque: revisión de especificaciones, documentación y control de calidad confiable en origen.',
      },
      {
        title: 'Gestión de procesos',
        description:
          'Gestionamos todo el tránsito internacional hasta la llegada al puerto de destino, con seguimiento de KPI frente al SLA acordado.',
      },
      {
        title: 'Control puerta a puerta',
        description:
          'Retiro en puerto, almacenamiento y entrega en el destino final a través de Trust Group, con un único punto de contacto para toda la operación.',
      },
      {
        title: 'Sourcing a pedido',
        description:
          '¿Busca un producto fuera de nuestro portafolio, incluso de otro segmento? Ubicamos a los proveedores que mejor se ajusten a su especificación.',
      },
      {
        title: 'Servicios accesorios',
        description:
          'Auditorías de proveedores, consolidación de proveedores, ensayos de laboratorio e inspección de productos, disponibles como servicios independientes.',
      },
    ],
    accessoryServices: ['Auditoría de proveedores', 'Consolidación de proveedores', 'Ensayos de laboratorio', 'Inspección de productos'],
    processSteps: [
      { title: 'Su requerimiento', description: 'Producto, especificación técnica, número CAS, uso final y volumen anual.' },
      {
        title: 'Sourcing y calificación',
        description: 'Mapeamos fabricantes calificados y evaluamos calidad, capacidad y cumplimiento en origen.',
      },
      {
        title: 'Oferta y negociación',
        description: 'Usted recibe una oferta estructurada con precio, Incoterm, plazo de entrega y condiciones de pago.',
      },
      {
        title: 'Embarque y tránsito',
        description: 'Reserva, documentación y tránsito internacional, con seguimiento frente al SLA acordado.',
      },
      {
        title: 'Despacho y entrega',
        description: 'Despacho aduanero, almacenamiento y entrega en su planta a través de las empresas de Trust Group.',
      },
    ],
    riskPillars: [
      {
        title: 'Cumplimiento regulatorio',
        description:
          'Los productos controlados por la Policía Federal, la Policía Civil, el Ejército, IBAMA, MAPA o ANVISA se manejan con las licencias que exige cada eslabón de la cadena.',
      },
      {
        title: 'Mercancías peligrosas',
        description:
          'Carga clasificada por la IMO embarcada con el embalaje correcto, Hojas de Datos de Seguridad y documentación de respuesta a emergencias.',
      },
      {
        title: 'Calidad en origen',
        description: 'Calificación de proveedores, inspección previa al embarque y ensayos de laboratorio antes de que la carga salga del puerto.',
      },
      {
        title: 'Pagos y condiciones',
        description: 'Condiciones de pago estructuradas y opciones de financiamiento que protegen su flujo de caja y la operación.',
      },
    ],
    lookingFor: [
      { title: 'Un socio confiable', description: 'Transparente, en cumplimiento y consistente en cada negociación.' },
      { title: 'Relaciones de largo plazo', description: 'Alianzas pensadas para crecer durante muchos años, no negocios aislados.' },
      { title: 'Un enfoque práctico', description: 'Colaboración estrecha en especificaciones, documentación y logística.' },
      { title: 'Productos de calidad', description: 'Calidad estable y certificada que cumple las especificaciones industriales.' },
      { title: 'Entrega a tiempo', description: 'Planificación de producción confiable y embarques puntuales.' },
    ],
    audiences: {
      buyers: {
        eyebrow: 'Para industrias y distribuidores',
        title: 'Importe su propia línea de productos con un socio global.',
        items: [
          'Acceso a nuevos orígenes y productos de proveedores calificados',
          'Insumos para sectores con exigencias técnicas y regulatorias rigurosas',
          'Planificación tributaria y logística para optimizar costos y flujo de caja',
          'Seguimiento de punta a punta, desde la compra en origen hasta la entrega en su planta',
        ],
        cta: 'Solicitar cotización',
      },
      suppliers: {
        eyebrow: 'Para proveedores internacionales',
        title: 'Ingrese a Brasil y América Latina con un socio que conoce el mercado.',
        items: [
          'Ingreso al mercado respaldado por experiencia técnica, regulatoria y logística',
          'Estructura logística licenciada en Brasil para productos regulados',
          'Visibilidad en tiempo real de cada operación de comercio exterior',
          'Alianzas de largo plazo diseñadas para cada producto y mercado',
        ],
        cta: 'Sea proveedor',
      },
    },
  },

  industries: {
    agribusiness: {
      name: 'Agroindustria y Nutrición Animal',
      description: 'Fertilizantes e insumos para una agricultura de alto rendimiento, e ingredientes para la industria de alimentos balanceados.',
    },
    'cosmetics-home-care': {
      name: 'Cosmética y Cuidado del Hogar',
      description: 'Tensioactivos, ácidos y especialidades químicas para formulaciones de cuidado personal, limpieza y cuidado del hogar.',
    },
    'water-treatment': {
      name: 'Tratamiento de Agua y Saneamiento',
      description: 'Desinfectantes, floculantes y fosfatos para el tratamiento de agua y productos sanitizantes.',
    },
    'food-pharma': {
      name: 'Alimentos, Suplementos y Farma',
      description:
        'Acidulantes, conservantes y activos con la pureza y la consistencia que exige la fabricación de alimentos y medicamentos.',
    },
    automotive: {
      name: 'Automotriz',
      description: 'Urea de grado automotriz para la producción de AdBlue / ARLA 32 e insumos para la cadena de suministro automotriz.',
    },
    polyurethanes: {
      name: 'Poliuretanos y Tapicería',
      description: 'Isocianatos y solventes para espumas flexibles, colchones, asientos automotrices y recubrimientos.',
    },
    'paints-coatings': {
      name: 'Pinturas, Barnices y Recubrimientos',
      description: 'Solventes para pinturas, barnices y lacas que requieren durabilidad, resistencia y un acabado uniforme.',
    },
    'ceramic-coating': {
      name: 'Recubrimiento Cerámico',
      description: 'Insumos para recubrimientos cerámicos y esmaltes.',
    },
    textile: {
      name: 'Textil y Fibras',
      description: 'Solventes y químicos de proceso para síntesis de fibras, teñido y acabado textil.',
    },
    plastics: {
      name: 'Resinas y Plastificantes',
      description: 'Resinas termoplásticas y plastificantes para la cadena de transformación de plásticos.',
    },
    'industrial-chemicals': {
      name: 'Vidrio y Químicos Industriales',
      description: 'Carbonato de sodio, azufre y químicos de base para la fabricación de vidrio, la síntesis química y la industria en general.',
    },
  },

  products: {
    'acetic-acid': {
      name: 'Ácido Acético',
      datasheet: {
        chemicalName: 'Ácido etanoico',
        applications:
          'Coagulante de látex en la fabricación de caucho, agente neutralizante y acidificante en el procesamiento textil, síntesis de activos farmacéuticos, materia prima para ésteres orgánicos y para la producción de botellas PET. No apto para uso en grado alimentario.',
        buyers: 'Fabricantes de agroquímicos, cosméticos, químicos farmacéuticos y textiles.',
        regulatory: [POLICE_LICENSE, IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    'citric-acid': {
      name: 'Ácido Cítrico',
      datasheet: {
        chemicalName: 'Ácido 2-hidroxi-1,2,3-propanotricarboxílico',
        applications: 'Acidulante, conservante y antioxidante.',
        buyers: 'Fabricantes de alimentos de una amplia variedad de productos, e industrias de cosméticos y farmacéutica.',
        documents: [SDS],
      },
    },
    'soda-ash': {
      name: 'Carbonato de Sodio (Ceniza de Soda) Denso',
      datasheet: {
        chemicalName: 'Carbonato de sodio denso',
        description: 'Polvo cristalino blanco. Forma una solución acuosa alcalina.',
        applications: 'Muy utilizado en productos de limpieza de piscinas y en la producción de bicarbonato de sodio y de vidrio.',
        buyers: 'Fabricantes de vidrio, productos sanitizantes e industria química en general.',
        regulatory: [POLICE_EXPORT, 'El uso como preservante de madera requiere licencia del IBAMA.'],
        documents: [SDS],
      },
    },
    'methylene-chloride': {
      name: 'Cloruro de Metileno',
      datasheet: {
        chemicalName: 'Diclorometano',
        applications:
          'Utilizado principalmente en la producción de barnices y lacas. Solvente para las industrias de plásticos, farmacéutica y de cosméticos, y extractor de cafeína en el procesamiento de alimentos.',
        buyers: 'Fabricantes de pinturas y barnices, plásticos, poliuretanos, productos farmacéuticos y cosméticos.',
        regulatory: [POLICE, IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    creatine: {
      name: 'Creatina Monohidratada',
      datasheet: {
        chemicalName: 'Creatina monohidratada, 200 mesh',
        applications: 'Contribuye a la fuerza, la ganancia de masa muscular, la concentración y la reducción de la fatiga muscular.',
        buyers: 'Fabricantes de suplementos alimenticios.',
        documents: [SDS],
      },
    },
    dmf: {
      name: 'DMF (Dimetilformamida)',
      datasheet: {
        chemicalName: 'N,N-dimetilformamida',
        applications: 'Solvente orgánico y agente de polimerización.',
        buyers: 'Fabricantes de síntesis de fibras, pinturas, productos farmacéuticos y agroquímicos.',
        regulatory: ['Mercancía peligrosa clasificada por la IMO (inflamable).'],
        documents: [SDS, EMERGENCY],
      },
    },
    sulfur: {
      name: 'Azufre',
      datasheet: {
        chemicalName: 'Azufre',
        applications:
          'Utilizado principalmente en la producción de ácido sulfúrico, el insumo esencial de los fertilizantes que impulsan la productividad en el campo.',
        buyers: 'Fabricantes de fertilizantes, químicos, cosméticos y caucho.',
        regulatory: [
          'Controlado por la Policía Civil en algunos estados brasileños; los compradores deben contar con la licencia cuando corresponda.',
        ],
        documents: [SDS],
      },
    },
    polyacrylamide: {
      name: 'Poliacrilamida',
      grade: 'Catiónica o aniónica',
      datasheet: {
        chemicalName: 'Poliacrilamida, catiónica o aniónica',
        cas: '69418-26-4 (catiónica)',
        applications:
          'Floculante para tratamiento de agua. Se utiliza para flocular sólidos minerales y clarificar el agua de lavado de minerales como carbón, arena y arcilla.',
        buyers: 'Industrias química, farmacéutica, de procesamiento de alimentos y minera.',
        documents: [SDS],
      },
    },
    tcca: {
      name: 'TCCA (Ácido Tricloroisocianúrico)',
      grade: '90%, en polvo o granulado (8–30 mesh)',
      datasheet: {
        chemicalName: 'Ácido tricloroisocianúrico',
        applications:
          'Producción de desinfectantes, alguicidas y bactericidas para tratamiento de agua. En la industria, se utiliza como agente blanqueador y reactivo de síntesis orgánica.',
        buyers: 'Tratamiento de agua e industria química en general.',
        regulatory: [IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    tdi: {
      name: 'TDI 80/20 (Diisocianato de Tolueno)',
      datasheet: {
        chemicalName: 'Diisocianato de tolueno, mezcla de isómeros 80/20',
        applications: 'Producción de espumas flexibles para colchones y tapicería automotriz, fibras y recubrimientos.',
        buyers: 'Fabricantes de espumas, resinas, adhesivos y componentes para la construcción.',
        regulatory: [IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    'automotive-urea': {
      name: 'Urea Automotriz',
      datasheet: {
        chemicalName: 'Urea, grado automotriz (premium)',
        applications:
          'Urea premium utilizada en la fabricación de AdBlue / ARLA 32, la solución que reduce las emisiones de contaminantes de los vehículos diésel.',
        buyers:
          'El grado automotriz es exclusivo de la industria automotriz. Otros grados de urea atienden fertilizantes, alimentación animal y aplicaciones químicas, farmacéuticas y sanitizantes.',
        regulatory: [
          'El uso agrícola (fertilizante) requiere licencia del Ministerio de Agricultura de Brasil (MAPA).',
          POLICE_EXPORT,
          'Altamente higroscópica: requiere almacenamiento adecuado y protegido de la humedad.',
        ],
        documents: [SDS],
      },
    },
    'fertilizer-urea': { name: 'Urea Fertilizante' },
    'formic-acid': { name: 'Ácido Fórmico' },
    'rock-phosphate': { name: 'Roca Fosfórica' },
    'potassium-chloride': { name: 'Cloruro de Potasio (KCl)' },
    'ammonium-sulfate': { name: 'Sulfato de Amonio (SAM)' },
    tsp: { name: 'Superfosfato Triple (TSP)' },
    'potassium-hydroxide': { name: 'Hidróxido de Potasio (KOH)' },
    'caustic-soda': { name: 'Soda Cáustica en Escamas' },
    edta: { name: 'EDTA' },
    'sodium-percarbonate': { name: 'Percarbonato de Sodio' },
    labsa: { name: 'Ácido Sulfónico (LABSA)' },
    sles: { name: 'Lauril Éter Sulfato de Sodio (SLES)' },
    mea: { name: 'Monoetanolamina (MEA)' },
    'lactic-acid': { name: 'Ácido Láctico' },
    sdic: { name: 'SDIC (Dicloroisocianurato de Sodio)' },
    'phosphoric-acid': { name: 'Ácido Fosfórico' },
    stpp: { name: 'STPP (Tripolifosfato de Sodio)' },
    msg: { name: 'Glutamato Monosódico (MSG)' },
    'potassium-sorbate': { name: 'Sorbato de Potasio' },
    tio2: { name: 'Dióxido de Titanio (TiO₂)' },
    'hydrofluoric-acid': { name: 'Ácido Fluorhídrico (HF)' },
    'thermoplastic-resins': { name: 'Resinas Termoplásticas', grade: 'PP, PE, PVC y PET' },
    plasticizers: { name: 'Plastificantes' },
  },

  forms: {
    fields: {
      quote: {
        firstName: { label: 'Nombre' },
        lastName: { label: 'Apellido' },
        company: { label: 'Empresa' },
        country: { label: 'País' },
        email: { label: 'Correo electrónico corporativo' },
        phone: { label: 'Teléfono / WhatsApp' },
        businessType: { label: 'Tipo de negocio' },
        product: { label: 'Producto de interés' },
        specification: { label: 'Especificación técnica / N.º CAS' },
        endUse: { label: 'Uso final' },
        annualVolume: { label: 'Volumen anual estimado', placeholder: 'p. ej., 1.200 toneladas métricas' },
        preferredContact: { label: 'Contacto preferido' },
        message: { label: 'Información adicional' },
      },
      supplier: {
        firstName: { label: 'Nombre' },
        lastName: { label: 'Apellido' },
        company: { label: 'Empresa' },
        country: { label: 'País' },
        email: { label: 'Correo electrónico corporativo' },
        phone: { label: 'Teléfono / WhatsApp' },
        businessType: { label: 'Tipo de negocio' },
        product: { label: 'Productos que suministra' },
        specification: { label: 'N.º CAS / especificación técnica' },
        capacity: { label: 'Capacidad mensual o anual' },
        certifications: { label: 'Certificaciones', placeholder: 'p. ej., ISO 9001, REACH' },
        message: { label: 'Cuéntenos sobre su empresa' },
      },
    },
    options: {
      Industry: 'Industria',
      Distributor: 'Distribuidor',
      Other: 'Otro',
      Manufacturer: 'Fabricante',
      Trader: 'Trader',
      Email: 'Correo electrónico',
      'Phone call': 'Llamada telefónica',
      WhatsApp: 'WhatsApp',
      Any: 'Cualquiera',
    },
  },
}
