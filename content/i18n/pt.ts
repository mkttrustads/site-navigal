// Português do Brasil (pt-BR). Mantém em inglês, de propósito: Navigal, Trust
// Group, Trust Tech, Taglog, Instituto Trust, siglas regulatórias (IBAMA, MAPA,
// ANVISA), normas (ISO 9001, SASSMAQ), CAS, NCM, fórmulas, Incoterm, SLA, KPI e
// termos de mercado sem equivalente corrente (sourcing, trading, trader, home care).
// Termos reaproveitados do docs/alinhamento-v4.md, já vistos pelo Marketing.

import type { Translation } from './types'

const SDS = 'Ficha de Dados de Segurança (FDS)'
const EMERGENCY = 'Ficha de Emergência'

const POLICE_LICENSE =
  'Controlado pela Polícia Federal e, em alguns estados, pela Polícia Civil. Todos os elos da cadeia precisam ter licença.'
const POLICE = 'Controlado pela Polícia Federal e, em alguns estados, pela Polícia Civil.'
const POLICE_EXPORT = 'Controlado pela Polícia Federal nas exportações para Bolívia, Colômbia e Peru.'
const IMO = 'Produto perigoso classificado pela IMO.'

export const pt: Translation = {
  ui: {
    'a11y.skipToContent': 'Ir para o conteúdo',
    'a11y.language': 'Idioma',
    'a11y.mainNav': 'Principal',
    'a11y.openMenu': 'Abrir menu',
    'a11y.closeMenu': 'Fechar menu',
    'a11y.breadcrumb': 'Trilha de navegação',
    'a11y.backToTop': 'Voltar ao topo',
    'header.homeLabel': 'Navigal Trading Solutions Limited, página inicial',
    'header.contact': 'Contato',

    'common.home': 'Início',
    'common.ourMission': 'Nossa missão',
    'common.whatWeDo': 'O que fazemos',
    'common.industries': 'Setores',
    'common.whoWeServe': 'Quem atendemos',
    'common.viewProducts': 'Ver produtos',
    'common.productCount': '{count} produtos',

    'footer.homeLabel': 'Navigal, página inicial',
    'footer.description':
      'Uma plataforma global de trading que estrutura cadeias de suprimento internacionais e entrega matérias-primas estratégicas à indústria latino-americana.',
    'footer.companyOf': 'Uma empresa do',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados.',

    'home.hero.lead':
      'Estruturamos cadeias de suprimento internacionais e negociamos matérias-primas estratégicas para a indústria latino-americana: de fornecedores qualificados na origem até a entrega na sua fábrica, com cada risco governado ao longo do caminho.',
    'home.hero.explore': 'Conheça nosso portfólio',
    'home.imageAlt': 'Matéria-prima a granel sendo carregada no porão de um navio',
    'home.about.eyebrow': 'Quem somos',
    'home.about.title': 'Conectamos fornecedores globais à indústria latino-americana',
    'home.about.p1':
      'A Navigal é a empresa de trading internacional do Trust Group. Conectamos fornecedores globais a fabricantes e distribuidores em toda a América Latina.',
    'home.about.p2': 'O parceiro ideal para conduzir negócios internacionais com segurança.',
    'home.about.highlight': 'Da estratégia à entrega.',
    'home.about.backedBy': 'Com o respaldo do',
    'home.about.link': 'Conheça a Navigal',
    'home.about.mission': "Encontrar a melhor combinação possível de qualidade, preço e capacidade para o negócio de cada cliente.",
    'home.what.item1': 'Fornecimento de insumos industriais estratégicos.',
    'home.what.item2': 'Desenvolvimento de fornecedores na Ásia, Europa e Oriente Médio.',
    'home.what.item3': 'Equipe comercial local e carteira de clientes na América Latina.',
    'home.what.link': 'Conheça nossas soluções',
    'home.industries.title': 'Matérias-primas para setores com altos padrões técnicos e regulatórios',
    'home.industries.link': 'Portfólio completo',
    'home.network.eyebrow': 'Rede global',
    'home.network.title': 'Onde a oferta global encontra a demanda latino-americana',
    'home.network.p1':
      'Estrategicamente sediados nos Emirados Árabes Unidos, um dos polos comerciais mais dinâmicos do mundo, trabalhamos ao lado de fabricantes na Ásia, na Europa e no Oriente Médio.',
    'home.network.p2':
      'Nossa equipe no Brasil nos mantém próximos dos compradores industriais de toda a América Latina, onde avaliamos cada oportunidade em primeira mão.',
    'home.cta.title': 'Importe a sua própria linha de produtos',

    'about.hero.title': 'Conectando o mundo à indústria latino-americana',
    'about.hero.subtitle':
      'Estruturamos cadeias de suprimento internacionais e negociamos matérias-primas estratégicas, conectando os principais polos comerciais do mundo a uma execução prática e segura.',
    'about.story.trustLink': 'Conheça o Trust Group',
    'about.values.eyebrow': 'Nossos valores',
    'about.values.title': 'O que guia cada operação',
    'about.imageAlt': 'Baía do Rio de Janeiro com o Pão de Açúcar',
    'about.presence.eyebrow': 'Presença global',
    'about.presence.title': 'Presentes onde o comércio acontece',
    'about.presence.intro':
      'Uma presença que une a sofisticação dos polos globais ao conhecimento direto dos mercados latino-americanos.',

    'solutions.hero.title': 'Soluções internacionais de trading, de ponta a ponta',
    'solutions.hero.subtitle':
      'Confiabilidade, qualidade e facilidade em cada elo da sua cadeia de suprimentos, do portão do fornecedor até a sua fábrica.',
    'solutions.what.title': 'Descubra oportunidades de negócios internacionais',
    'solutions.what.intro':
      'Compramos e vendemos produtos internacionais, com especialidade no nosso portfólio de produtos, e adaptamos cada solução às suas necessidades específicas. Como empresa de sourcing, ampliamos continuamente nossa rede de clientes e fornecedores para oferecer a melhor conexão para todos os envolvidos.',
    'solutions.how.eyebrow': 'Como funciona',
    'solutions.how.title': 'Da necessidade à entrega, um único parceiro responsável',
    'solutions.how.intro':
      'Envie os detalhes da sua necessidade e retornaremos rapidamente com uma oferta para a sua análise.',
    'solutions.risk.eyebrow': 'Gestão de riscos',
    'solutions.risk.title': 'A previsibilidade é construída, elo por elo',
    'solutions.risk.intro':
      'O suprimento internacional de produtos controlados e perigosos exige mais do que um bom preço. Governamos os riscos que importam para a indústria, para que cada embarque chegue em conformidade, dentro da especificação e no prazo.',
    'solutions.who.title': 'Pensada para os dois lados da negociação',

    'products.hero.title': 'Nosso portfólio de produtos',
    'products.hero.subtitle': 'Principais produtos que fornecemos hoje.',
    'products.intro.eyebrow': 'Vamos crescer juntos',
    'products.intro.title': 'Matérias-primas de excelência para diversos setores industriais',
    'products.intro.intro':
      'Para estes produtos temos experiência comprovada e podemos oferecer as melhores condições de importação. Trabalhamos com fabricantes renomados e oferecemos controle de qualidade confiável e apoio financeiro.',
    'products.onDemand.eyebrow': 'Sourcing sob demanda',
    'products.onDemand.title': 'Procura um produto que não está na lista?',
    'products.onDemand.body':
      'Envie o produto, a especificação técnica, o número CAS, o uso final e o volume anual. Encontraremos os fornecedores que melhor atendem à sua necessidade, inclusive em outros segmentos.',
    'products.onDemand.cta': 'Envie sua necessidade',
    'products.highlightsLabel': 'Destaques em fotos',
    'products.caption.sulfur': 'Enxofre para a indústria de fertilizantes',
    'products.caption.resins': 'Resinas termoplásticas',
    'products.caption.lab': 'Controle de qualidade na origem',

    'catalog.searchLabel': 'Buscar produtos por nome ou número CAS',
    'catalog.searchPlaceholder': 'Buscar por produto ou número CAS',
    'catalog.showing': 'Mostrando',
    'catalog.of': 'de',
    'catalog.products': 'produtos',
    'catalog.browseByIndustry': 'Navegue por setor',
    'catalog.filterLabel': 'Filtrar por setor',
    'catalog.allIndustries': 'Todos os setores',
    'catalog.noResults':
      'Nenhum produto corresponde à sua busca. Nossa equipe de sourcing sob demanda pode encontrá-lo para você.',
    'catalog.technicalData': 'Dados técnicos',
    'sheet.chemicalName': 'Nome químico',
    'sheet.cas': 'Nº CAS',
    'sheet.formula': 'Fórmula',
    'sheet.ncm': 'NCM',
    'sheet.description': 'Descrição',
    'sheet.applications': 'Aplicações',
    'sheet.buyers': 'Compradores típicos',
    'sheet.regulatory': 'Notas regulatórias (Brasil)',
    'sheet.documents': 'Documentos fornecidos',

    'suppliers.hero.title': 'Cresça com os clientes da Navigal em toda a América Latina',
    'suppliers.hero.subtitle':
      'Cadastre sua empresa e os produtos que você fabrica ou comercializa. Atuamos em todas as etapas, da prospecção à entrega ao cliente.',
    'suppliers.intro':
      'O Brasil e a América Latina estão entre os mercados mais promissores para insumos industriais, e entre os mais complexos. A Navigal conhece as exigências regulatórias, aduaneiras, logísticas e de pagamento da região e as transforma em um caminho claro até o mercado.',
    'suppliers.extraItem':
      'Força de vendas local com clientes em agronegócio, alimentos, farma, tratamento de água e automotivo',
    'suppliers.look.eyebrow': 'O que buscamos',
    'suppliers.look.title': 'Os parceiros com quem construímos',
    'suppliers.gateway.eyebrow': 'Sua porta de entrada',
    'suppliers.gateway.title': 'Da sua fábrica à indústria latino-americana',
    'suppliers.gateway.intro':
      'Combinada à estrutura licenciada do Trust Group no Brasil, cuidamos do desembaraço aduaneiro, da armazenagem e da entrega de produtos controlados e perigosos, com visibilidade total de cada operação. A plataforma Trust Tech acompanha cada etapa da operação.',
    'suppliers.register.title': 'Cadastre sua empresa',
    'suppliers.register.intro':
      'Conte-nos sobre seus produtos e sua capacidade. Nossa equipe analisará o seu perfil e entrará em contato para conversar sobre os próximos passos.',

    'contact.hero.title': 'Como podemos ajudar?',
    'contact.hero.subtitle':
      'Conte-nos os detalhes da sua necessidade e enviaremos rapidamente uma oferta para a sua análise.',
    'contact.getInTouch': 'Fale conosco',
    'contact.help': 'O que você precisar, estamos aqui para ajudar',
    'contact.email': 'E-mail',
    'contact.phone': 'Telefone',
    'contact.hq': 'Sede',
    'contact.tabsLabel': 'Formulário de contato',
    'contact.tab.supplier': 'Seja um fornecedor',
    'contact.tab.quote.intro':
      'Saia das mãos dos distribuidores locais e comece a importar a sua própria linha de produtos.',
    'contact.tab.supplier.intro': 'Cresça junto com os clientes da Navigal cadastrando sua empresa e seus produtos.',

    'form.submit.quote': 'Enviar solicitação',
    'form.submit.supplier': 'Cadastrar como fornecedor',
    'form.sending': 'Enviando…',
    'form.thanks': 'Obrigado. Recebemos a sua mensagem',
    'form.thanksBody': 'Nossa equipe analisará os detalhes e retornará em breve.',
    'form.select': 'Selecione',
    'form.required': 'Campos obrigatórios',
    'form.error': 'Não foi possível enviar a sua mensagem agora. Tente novamente ou escreva para',

    'trust.eyebrow': 'Parte do Trust Group',
    'trust.title': 'Alcance global, sustentado por um grupo de serviço completo em campo',
    'trust.p1':
      'A Navigal faz parte do Trust Group, um dos principais grupos de comércio exterior do Brasil. Cada operação pode ser integrada às empresas do grupo: despacho aduaneiro, agenciamento de carga internacional, armazenagem e distribuição nacional.',
    'trust.p2': 'Um único parceiro, do portão do fornecedor até a sua fábrica.',
    'trust.visit': 'Visite trust.group',
    'trust.imageAlt': 'Vista aérea de um centro logístico do Trust Group no Brasil',
    'trust.imageAlt2': 'Empilhadeira de contêineres movimentando um contêiner em terminal portuário',
    'trust.imageAlt3': 'Operador de armazém com tablet ao lado de empilhadeira e porta-paletes',
    'trust.carouselLabel': 'Sobre a Navigal e o Trust Group',
    'trust.slideLabel': 'Slide {current} de {total}',
    'trust.prev': 'Slide anterior',
    'trust.next': 'Próximo slide',
    'trust.goTo': 'Ir para o slide {n}',
    'cta.title': 'Saia das mãos dos distribuidores locais e importe a sua própria linha de produtos',
    'cta.body':
      'Envie a especificação técnica, o uso final e o volume anual. Retornaremos com uma análise e opções de suprimento.',
    'certs.eyebrow': 'Certificações e compliance',
    'certs.title': 'Credenciais que sustentam cada operação',
    'taglog.eyebrow': 'Logística no Brasil',
    'taglog.title': 'Armazenagem licenciada em todo o Brasil, com a Taglog',
    'taglog.total': 'Total:',
    'commitment.eyebrow': 'Nosso compromisso',
    'commitment.title': 'Responsabilidade além da operação',

    'map.aria':
      'Mapa da rede da Navigal: base da Navigal nos Emirados Árabes Unidos, escritórios em Miami e no Brasil, e rotas de suprimento da Itália, Turquia, Omã, China, Taiwan, Vietnã e Malásia convergindo para a Navigal, com uma única rota da Navigal para o Brasil e a América Latina.',
    'map.place.Navigal': 'Navigal',
    'map.place.Miami': 'Miami',
    'map.place.Brazil': 'Brasil',
    'map.place.Italy': 'Itália',
    'map.place.Turkey': 'Turquia',
    'map.place.Oman': 'Omã',
    'map.place.China': 'China',
    'map.place.Taiwan': 'Taiwan',
    'map.place.Vietnam': 'Vietnã',
    'map.place.Malaysia': 'Malásia',
    'map.legend.offices': 'Escritórios da Navigal',
    'map.legend.origins': 'Principais origens de suprimento',
    'map.legend.routes': 'Rotas de suprimento para a América Latina',

    'notFound.eyebrow': 'Erro 404',
    'notFound.title': 'Esta rota não existe',
    'notFound.body': 'A página que você procura pode ter sido movida. Vamos colocar você de volta no rumo.',
    'notFound.back': 'Voltar ao início',
  },

  meta: {
    '/': {
      title: 'Navigal Trading Solutions | Trading Internacional para a Indústria Latino-Americana',
      description:
        'A Navigal estrutura cadeias de suprimento internacionais e negocia matérias-primas estratégicas para a indústria latino-americana: fornecedores globais qualificados, risco gerenciado e entrega porta a porta.',
    },
    '/about': {
      title: 'Sobre a Navigal',
      description:
        'Nascida da indústria química: a Navigal é a trading internacional lançada pelo Trust Group em 2024, opera a partir dos Emirados Árabes Unidos e conecta fornecedores globais à indústria latino-americana.',
    },
    '/solutions': {
      title: 'Soluções',
      description:
        'Prospecção e negociação com fornecedores, avaliação de qualidade, gestão de processos e controle porta a porta para compras internacionais de matérias-primas.',
    },
    '/products': {
      title: 'Portfólio de produtos por setor',
      description:
        'Matérias-primas da Navigal por setor: agronegócio, cosméticos, tratamento de água, alimentos e farma, automotivo, poliuretanos, revestimentos, têxtil e plásticos.',
    },
    '/suppliers': {
      title: 'Para Fornecedores',
      description:
        'Fabricantes internacionais: entrem no Brasil e na América Latina com a Navigal. Força de vendas local, logística licenciada para produtos controlados e parcerias de longo prazo.',
    },
    '/contact': {
      title: 'Contato',
      description:
        'Solicite uma cotação ou cadastre-se como fornecedor. Navigal Trading Solutions Limited, Ras Al Khaimah, Emirados Árabes Unidos.',
    },
  },

  site: {
    tagline: 'Construindo conexões confiáveis',
    nav: ['Sobre', 'Soluções', 'Produtos', 'Para Fornecedores', 'Contato'],
    quoteCta: 'Solicitar cotação',
    facts: {
      launched: 'Navigal lançada',
      tons: 'Toneladas importadas pela Navigal em 2025',
      portfolio: 'Matérias-primas estratégicas em nosso portfólio',
      continents: 'Regiões de origem: Ásia, Europa e Oriente Médio',
    },
    rankingFootnote:
      '*Entre mais de 8.200 importadores (FOB, US$), excluindo defensivos agrícolas e combustíveis. Dados públicos de importação, ago/25 a jul/26.',
    trustGroupFacts: [
      'anos no mercado',
      'colaboradores',
      'de armazenagem',
      'rotas internacionais',
      'certificações e selos',
      'importadores químicos do Brasil (Trust Group)',
    ],
    trustGroupLines: {
      title: 'Cinco empresas trabalhando juntas para que toda operação funcione de ponta a ponta',
      items: [
        { name: 'Comércio Exterior', description: 'Serviços de importação/exportação e financiamento do comércio' },
        { name: 'Trading Internacional', description: 'Navigal' },
        { name: 'Logística Internacional', description: 'Frete marítimo, aéreo e rodoviário, incluindo cargas de projeto' },
        { name: 'Logística Nacional', description: 'Armazéns e transporte rodoviário em todo o Brasil' },
        { name: 'Global Brands Management', description: 'Expansão de marcas internacionais no Brasil' },
      ],
    },
    addressLines: ['Escritório nº TI-4F-11, RAKEZ Amenity Center', 'Al Hamra Industrial Zone FZ', 'Ras Al Khaimah, Emirados Árabes Unidos'],
  },

  about: {
    mission:
      'Encontrar a melhor combinação possível de qualidade, preço e capacidade para o negócio de cada cliente e garantir a sua completa satisfação.',
    milestones: [
      {
        label: '2005',
        title: 'A Trust é fundada em Itajaí/SC',
        description:
          'Juliano Victorino funda a Trust para importar as matérias-primas químicas que tinha tanta dificuldade de obter no exterior.',
      },
      {
        label: '2024',
        title: 'A Navigal é lançada',
        description:
          'O Trust Group cria sua trading internacional para levar o conhecimento do grupo até a origem, trabalhando lado a lado com os fornecedores.',
      },
      {
        label: 'Hoje',
        title: 'Apoio do ecossistema completo',
        description: 'A Navigal opera com o apoio total de um ecossistema de comércio exterior e logística.',
      },
    ],
    story: {
      eyebrow: 'Por que a Navigal existe',
      title: 'Nascida da indústria química',
      paragraphs: [
        'Antes do Trust Group, nosso fundador Juliano Victorino dirigia uma fábrica de detergente em pó no Brasil e aprendeu na prática como é difícil obter insumos químicos no exterior. Em 2005, fundou a Trust em Itajaí/SC para importar essas matérias-primas.',
        'Duas décadas importando produtos químicos e outros itens nos ensinaram todas as exigências técnicas, regulatórias e logísticas do mercado brasileiro. Em 2024, o Trust Group criou a Navigal para levar esse conhecimento até a origem, trabalhando lado a lado com os fornecedores para ampliar sua participação de mercado no Brasil e na América Latina.',
      ],
      closing: 'Conhecemos a indústria porque fomos a indústria.',
      presence: 'A Navigal opera a partir dos Emirados Árabes Unidos, com escritório em Miami.',
    },
    principles: [
      {
        title: 'Global por natureza',
        description:
          'Cosmopolitas e multiculturais, falamos a língua dos negócios globais e respeitamos as regulamentações de cada fronteira que cruzamos.',
      },
      {
        title: 'Risco sob governança',
        description:
          'Descobrimos fornecedores qualificados em qualquer lugar do mundo e governamos os riscos de cada operação, trazendo previsibilidade e estabilidade.',
      },
      {
        title: 'O elo de confiança',
        description:
          'Somos a conexão entre fornecedores globais confiáveis e as indústrias que dependem de um suprimento seguro e competitivo.',
      },
    ],
    values: [
      { title: 'Experiência', description: 'Duas décadas de experiência do Trust Group importando produtos químicos e outros itens.' },
      { title: 'Segurança', description: 'Experiência e capacidade analítica aplicadas para tornar cada negociação mais segura.' },
      { title: 'Qualidade', description: 'Sempre elevando o padrão para entregar o melhor serviço e produto.' },
      { title: 'Comprometimento', description: 'Nossa missão é a sua satisfação, e estamos comprometidos com ela.' },
      { title: 'Pontualidade', description: 'Atendemos cada pedido com comprometimento e entrega precisa.' },
    ],
    offices: [
      {
        country: 'Emirados Árabes Unidos',
        role: 'Sede',
        detail: 'RAKEZ Amenity Center, Al Hamra Industrial Zone FZ, Ras Al Khaimah',
      },
      { country: 'Estados Unidos', role: 'Escritório em Miami', detail: 'Relacionamento com fornecedores e mercado nas Américas' },
      { country: 'Brasil', role: 'Equipe comercial e de operações', detail: 'Próxima dos compradores industriais de toda a América Latina' },
    ],
  },

  credibility: {
    certifications: [
      {
        title: 'Top 35 importadores químicos do Brasil*',
        holder: 'Trust Group',
        description: 'Entre os maiores importadores químicos do país.',
      },
      {
        title: 'Certificação da Receita Federal',
        holder: 'Trust Comércio Exterior',
        description: 'A Trust Comércio Exterior é certificada pela Receita Federal do Brasil.',
      },
      {
        title: 'SASSMAQ e ISO 9001',
        holder: 'Taglog Logística Integrada, empresa do Trust Group',
        description: 'Padrões de segurança, saúde, meio ambiente e qualidade nas operações logísticas.',
      },
    ],
    taglog: {
      licensed: 'Licenciada para produtos regulados por IBAMA, MAPA, ANVISA, Exército Brasileiro e Polícia Federal.',
      hubs: [
        { site: 'Itajaí, SC (matriz)', area: '47.000+ m²', pallets: '18.000+ posições-pallet', access: 'a 15 min do Porto de Navegantes' },
        { site: 'Garuva, SC', area: '16.000+ m²', pallets: '5.000+ posições-pallet', access: 'a 45 min do Porto de Itapoá' },
        { site: 'Sumaré, SP', area: '7.000+ m²', pallets: '6.000+ posições-pallet', access: 'a 25 min do Aeroporto de Viracopos' },
        {
          site: 'Cabo de Santo Agostinho, PE',
          area: '10.000+ m²',
          pallets: '9.000+ posições-pallet',
          access: 'a 30 min do Porto de Suape',
        },
      ],
      total: { area: '80.000+ m²', pallets: '38.000+ posições-pallet' },
    },
    commitment: [
      { title: 'Instituto Trust', description: 'O esporte como ferramenta de inclusão e desenvolvimento social.' },
      {
        title: 'Ética, compliance e sustentabilidade',
        description: 'Padrões compartilhados em todo o grupo, avaliados por organizações independentes.',
      },
    ],
  },

  solutions: {
    solutions: [
      {
        title: 'Prospecção e negociação com fornecedores',
        description:
          'Identificamos e desenvolvemos fabricantes qualificados na Ásia, na Europa e no Oriente Médio, e negociamos preço, prazos e condições de pagamento, com possibilidade de linha de crédito.',
      },
      {
        title: 'Avaliação da qualidade dos fornecedores',
        description:
          'Qualificação técnica de cada fornecedor antes do primeiro embarque: análise de especificações, documentação e controle de qualidade confiável na origem.',
      },
      {
        title: 'Gestão de processos',
        description:
          'Gerenciamos todo o trânsito internacional até a chegada ao porto de destino, com acompanhamento de KPIs em relação ao SLA acordado.',
      },
      {
        title: 'Controle porta a porta',
        description:
          'Retirada no porto, armazenagem e entrega no destino final por meio do Trust Group, com um único ponto de contato para toda a operação.',
      },
      {
        title: 'Sourcing sob demanda',
        description:
          'Procura um produto fora do nosso portfólio, mesmo em outro segmento? Localizamos os fornecedores que melhor atendem à sua especificação.',
      },
      {
        title: 'Serviços acessórios',
        description:
          'Auditoria de fornecedores, consolidação de fornecedores, testes laboratoriais e inspeção de produtos, disponíveis como serviços independentes.',
      },
    ],
    accessoryServices: ['Auditoria de fornecedores', 'Consolidação de fornecedores', 'Testes laboratoriais', 'Inspeção de produtos'],
    processSteps: [
      { title: 'Sua necessidade', description: 'Produto, especificação técnica, número CAS, uso final e volume anual.' },
      {
        title: 'Sourcing e qualificação',
        description: 'Mapeamos fabricantes qualificados e avaliamos qualidade, capacidade e conformidade na origem.',
      },
      {
        title: 'Oferta e negociação',
        description: 'Você recebe uma oferta estruturada com preço, Incoterm, prazo de entrega e condições de pagamento.',
      },
      {
        title: 'Embarque e trânsito',
        description: 'Reserva de carga, documentação e trânsito internacional, acompanhados em relação ao SLA acordado.',
      },
      {
        title: 'Desembaraço e entrega',
        description: 'Desembaraço aduaneiro, armazenagem e entrega na sua fábrica por meio das empresas do Trust Group.',
      },
    ],
    riskPillars: [
      {
        title: 'Conformidade regulatória',
        description:
          'Produtos controlados pela Polícia Federal, Polícia Civil, Exército, IBAMA, MAPA ou ANVISA são tratados com as licenças que cada elo da cadeia exige.',
      },
      {
        title: 'Produtos perigosos',
        description:
          'Cargas classificadas pela IMO embarcadas com a embalagem correta, Fichas de Dados de Segurança e documentação de resposta a emergências.',
      },
      {
        title: 'Qualidade na origem',
        description: 'Qualificação de fornecedores, inspeção pré-embarque e testes laboratoriais antes de a carga deixar o porto.',
      },
      {
        title: 'Pagamentos e condições',
        description: 'Condições de pagamento estruturadas e opções de financiamento que protegem o seu fluxo de caixa e a operação.',
      },
    ],
    lookingFor: [
      { title: 'Um parceiro confiável', description: 'Transparente, em conformidade e consistente em cada negociação.' },
      { title: 'Relacionamentos de longo prazo', description: 'Parcerias pensadas para crescer ao longo de muitos anos, não negócios isolados.' },
      { title: 'Uma abordagem prática', description: 'Colaboração estreita em especificações, documentação e logística.' },
      { title: 'Produtos de qualidade', description: 'Qualidade estável e certificada, que atende às especificações industriais.' },
      { title: 'Entrega no prazo', description: 'Planejamento de produção confiável e embarques dentro do prazo.' },
    ],
    audiences: {
      buyers: {
        eyebrow: 'Para indústrias e distribuidores',
        title: 'Importe a sua própria linha de produtos com um parceiro global',
        items: [
          'Acesso a novas origens e produtos de fornecedores qualificados',
          'Insumos para setores com exigências técnicas e regulatórias rigorosas',
          'Planejamento tributário e logístico para otimizar custos e fluxo de caixa',
          'Acompanhamento de ponta a ponta, da compra na origem à entrega na sua fábrica',
        ],
        cta: 'Solicitar cotação',
      },
      suppliers: {
        eyebrow: 'Para fornecedores internacionais',
        title: 'Entre no Brasil e na América Latina com um parceiro que conhece o mercado',
        items: [
          'Entrada no mercado respaldada por expertise técnica, regulatória e logística',
          'Estrutura logística licenciada no Brasil para produtos controlados',
          'Visibilidade em tempo real de cada operação de comércio exterior',
          'Parcerias de longo prazo desenhadas para cada produto e mercado',
        ],
        cta: 'Seja um fornecedor',
      },
    },
  },

  industries: {
    agribusiness: {
      name: 'Agronegócio e Nutrição Animal',
      description: 'Fertilizantes e insumos para uma agricultura de alta performance, e ingredientes para a indústria de rações.',
    },
    'cosmetics-home-care': {
      name: 'Cosméticos e Home Care',
      description: 'Tensoativos, ácidos e especialidades químicas para formulações de cuidados pessoais, limpeza e home care.',
    },
    'water-treatment': {
      name: 'Tratamento de Água e Saneamento',
      description: 'Desinfetantes, floculantes e fosfatos para tratamento de água e produtos saneantes.',
    },
    'food-pharma': {
      name: 'Alimentos, Suplementos e Farma',
      description:
        'Acidulantes, conservantes e ativos com a pureza e a consistência que a fabricação de alimentos e medicamentos exige.',
    },
    automotive: {
      name: 'Automotivo',
      description: 'Ureia automotiva para a produção de AdBlue / ARLA 32 e insumos para a cadeia de suprimentos automotiva.',
    },
    polyurethanes: {
      name: 'Poliuretanos e Estofados',
      description: 'Isocianatos e solventes para espumas flexíveis, colchões, bancos automotivos e revestimentos.',
    },
    'paints-coatings': {
      name: 'Tintas, Vernizes e Revestimentos',
      description: 'Solventes para tintas, vernizes e lacas que exigem durabilidade, resistência e acabamento consistente.',
    },
    'ceramic-coating': {
      name: 'Revestimento Cerâmico',
      description: 'Insumos para revestimentos cerâmicos e esmaltes.',
    },
    textile: {
      name: 'Têxtil e Fibras',
      description: 'Solventes e produtos químicos de processo para síntese de fibras, tingimento e acabamento têxtil.',
    },
    plastics: {
      name: 'Resinas e Plastificantes',
      description: 'Resinas termoplásticas e plastificantes para a cadeia de transformação de plásticos.',
    },
    'industrial-chemicals': {
      name: 'Vidro e Químicos Industriais',
      description: 'Barrilha, enxofre e químicos de base para a fabricação de vidro, síntese química e indústria em geral.',
    },
  },

  products: {
    'acetic-acid': {
      name: 'Ácido Acético',
      datasheet: {
        chemicalName: 'Ácido etanoico',
        applications:
          'Coagulante de látex na fabricação de borracha, agente neutralizante e acidificante no processamento têxtil, síntese de ativos farmacêuticos, matéria-prima para ésteres orgânicos e para a produção de garrafas PET. Não adequado para uso em grau alimentício.',
        buyers: 'Fabricantes de defensivos agrícolas, cosméticos, químicos farmacêuticos e têxteis.',
        regulatory: [POLICE_LICENSE, IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    'citric-acid': {
      name: 'Ácido Cítrico',
      datasheet: {
        chemicalName: 'Ácido 2-hidroxi-1,2,3-propanotricarboxílico',
        applications: 'Acidulante, conservante e antioxidante.',
        buyers: 'Fabricantes de alimentos de uma ampla variedade de produtos, e indústrias de cosméticos e farmacêutica.',
        documents: [SDS],
      },
    },
    'soda-ash': {
      name: 'Barrilha (Carbonato de Sódio) Densa',
      datasheet: {
        chemicalName: 'Carbonato de sódio denso',
        description: 'Pó cristalino branco. Forma uma solução aquosa alcalina.',
        applications: 'Muito usada em produtos de limpeza de piscinas e na produção de bicarbonato de sódio e de vidro.',
        buyers: 'Fabricantes de vidro, produtos saneantes e indústria química em geral.',
        regulatory: [POLICE_EXPORT, 'O uso como preservante de madeira exige licença do IBAMA.'],
        documents: [SDS],
      },
    },
    'methylene-chloride': {
      name: 'Cloreto de Metileno',
      datasheet: {
        chemicalName: 'Diclorometano',
        applications:
          'Usado principalmente na produção de vernizes e lacas. Solvente para as indústrias de plásticos, farmacêutica e de cosméticos, e extrator de cafeína no processamento de alimentos.',
        buyers: 'Fabricantes de tintas e vernizes, plásticos, poliuretanos, produtos farmacêuticos e cosméticos.',
        regulatory: [POLICE, IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    creatine: {
      name: 'Creatina Monoidratada',
      datasheet: {
        chemicalName: 'Creatina monoidratada, 200 mesh',
        applications: 'Auxilia na força, no ganho de massa muscular, no foco e na redução da fadiga muscular.',
        buyers: 'Fabricantes de suplementos alimentares.',
        documents: [SDS],
      },
    },
    dmf: {
      name: 'DMF (Dimetilformamida)',
      datasheet: {
        chemicalName: 'N,N-dimetilformamida',
        applications: 'Solvente orgânico e agente de polimerização.',
        buyers: 'Fabricantes de síntese de fibras, tintas, produtos farmacêuticos e defensivos agrícolas.',
        regulatory: ['Produto perigoso classificado pela IMO (inflamável).'],
        documents: [SDS, EMERGENCY],
      },
    },
    sulfur: {
      name: 'Enxofre',
      datasheet: {
        chemicalName: 'Enxofre',
        applications:
          'Usado principalmente na produção de ácido sulfúrico, o insumo essencial dos fertilizantes que impulsionam a produtividade no campo.',
        buyers: 'Fabricantes de fertilizantes, químicos, cosméticos e borracha.',
        regulatory: [
          'Controlado pela Polícia Civil em alguns estados brasileiros; os compradores devem ter a licença quando aplicável.',
        ],
        documents: [SDS],
      },
    },
    polyacrylamide: {
      name: 'Poliacrilamida',
      grade: 'Catiônica ou aniônica',
      datasheet: {
        chemicalName: 'Poliacrilamida, catiônica ou aniônica',
        cas: '69418-26-4 (catiônica)',
        applications:
          'Floculante para tratamento de água. Usada para flocular sólidos minerais e clarificar a água de lavagem de minerais como carvão, areia e argila.',
        buyers: 'Indústrias química, farmacêutica, de processamento de alimentos e de mineração.',
        documents: [SDS],
      },
    },
    tcca: {
      name: 'TCCA (Ácido Tricloroisocianúrico)',
      grade: '90%, em pó ou granulado (8–30 mesh)',
      datasheet: {
        chemicalName: 'Ácido tricloroisocianúrico',
        applications:
          'Produção de desinfetantes, algicidas e bactericidas para tratamento de água. Na indústria, usado como agente branqueador e reagente de síntese orgânica.',
        buyers: 'Tratamento de água e indústria química em geral.',
        regulatory: [IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    tdi: {
      name: 'TDI 80/20 (Diisocianato de Tolueno)',
      datasheet: {
        chemicalName: 'Diisocianato de tolueno, mistura de isômeros 80/20',
        applications: 'Produção de espumas flexíveis para colchões e estofados automotivos, fibras e revestimentos.',
        buyers: 'Fabricantes de espumas, resinas, adesivos e componentes para construção.',
        regulatory: [IMO],
        documents: [SDS, EMERGENCY],
      },
    },
    'automotive-urea': {
      name: 'Ureia Automotiva',
      datasheet: {
        chemicalName: 'Ureia, grau automotivo (premium)',
        applications:
          'Ureia premium usada na fabricação de AdBlue / ARLA 32, a solução que reduz as emissões de poluentes de veículos a diesel.',
        buyers:
          'O grau automotivo é exclusivo da indústria automotiva. Outros graus de ureia atendem a fertilizantes, ração animal e aplicações químicas, farmacêuticas e saneantes.',
        regulatory: [
          'O uso agrícola (fertilizante) exige licença do Ministério da Agricultura (MAPA).',
          POLICE_EXPORT,
          'Altamente higroscópica: exige armazenagem adequada e protegida da umidade.',
        ],
        documents: [SDS],
      },
    },
    'fertilizer-urea': { name: 'Ureia Fertilizante' },
    'formic-acid': { name: 'Ácido Fórmico' },
    'rock-phosphate': { name: 'Rocha Fosfática' },
    'potassium-chloride': { name: 'Cloreto de Potássio (KCl)' },
    'ammonium-sulfate': { name: 'Sulfato de Amônio (SAM)' },
    tsp: { name: 'Superfosfato Triplo (SFT)' },
    'potassium-hydroxide': { name: 'Hidróxido de Potássio (KOH)' },
    'caustic-soda': { name: 'Soda Cáustica em Escamas' },
    edta: { name: 'EDTA' },
    'sodium-percarbonate': { name: 'Percarbonato de Sódio' },
    labsa: { name: 'Ácido Sulfônico (LABSA)' },
    sles: { name: 'Lauril Éter Sulfato de Sódio (SLES)' },
    mea: { name: 'Monoetanolamina (MEA)' },
    'lactic-acid': { name: 'Ácido Lático' },
    sdic: { name: 'SDIC (Dicloroisocianurato de Sódio)' },
    'phosphoric-acid': { name: 'Ácido Fosfórico' },
    stpp: { name: 'STPP (Tripolifosfato de Sódio)' },
    msg: { name: 'Glutamato Monossódico (MSG)' },
    'potassium-sorbate': { name: 'Sorbato de Potássio' },
    tio2: { name: 'Dióxido de Titânio (TiO₂)' },
    'hydrofluoric-acid': { name: 'Ácido Fluorídrico (HF)' },
    'thermoplastic-resins': { name: 'Resinas Termoplásticas', grade: 'PP, PE, PVC e PET' },
    plasticizers: { name: 'Plastificantes' },
  },

  forms: {
    fields: {
      quote: {
        firstName: { label: 'Nome' },
        lastName: { label: 'Sobrenome' },
        company: { label: 'Empresa' },
        country: { label: 'País' },
        email: { label: 'E-mail corporativo' },
        phone: { label: 'Telefone / WhatsApp' },
        businessType: { label: 'Tipo de negócio' },
        product: { label: 'Produto de interesse' },
        specification: { label: 'Especificação técnica / nº CAS' },
        endUse: { label: 'Uso final' },
        annualVolume: { label: 'Volume anual estimado', placeholder: 'ex.: 1.200 toneladas métricas' },
        preferredContact: { label: 'Contato preferido' },
        message: { label: 'Informações adicionais' },
      },
      supplier: {
        firstName: { label: 'Nome' },
        lastName: { label: 'Sobrenome' },
        company: { label: 'Empresa' },
        country: { label: 'País' },
        email: { label: 'E-mail corporativo' },
        phone: { label: 'Telefone / WhatsApp' },
        businessType: { label: 'Tipo de negócio' },
        product: { label: 'Produtos que você fornece' },
        specification: { label: 'Nº CAS / especificação técnica' },
        capacity: { label: 'Capacidade mensal ou anual' },
        certifications: { label: 'Certificações', placeholder: 'ex.: ISO 9001, REACH' },
        message: { label: 'Fale sobre a sua empresa' },
      },
    },
    options: {
      Industry: 'Indústria',
      Distributor: 'Distribuidor',
      Other: 'Outro',
      Manufacturer: 'Fabricante',
      Trader: 'Trader',
      Email: 'E-mail',
      'Phone call': 'Ligação telefônica',
      WhatsApp: 'WhatsApp',
      Any: 'Qualquer um',
    },
  },
}
