# Alinhamento do site à apresentação para fornecedores v4

Branch: `fix/alinhamento-apresentacao-v4` (sem push, sem deploy). Lint e build passam.

> **Idiomas:** o site só existe em inglês (sem i18n; PT/ES no menu aparecem como "Coming soon").
> O EN foi aplicado no site. As traduções PT-BR e ES de tudo que foi criado ou alterado estão na seção 4,
> prontas para entrar quando houver i18n.

## 1. O que mudou, por item

| Item | Arquivos | Resumo |
| --- | --- | --- |
| **A** Hero | `content/site.ts`, `components/sections/HomeHero.tsx` | "Navigal launched / 2021"; "Tons imported by Navigal in 2025 / 11k". "30+" agora é derivado de `products.length` (34 produtos, arredondado na dezena). Removida a nota do "25,000+". |
| **B** História | `content/about.ts` (novo `story`, `milestones`, `values`, `offices`), `app/page.tsx`, `app/about/page.tsx` | Título/subtítulo/texto/fecho dos slides 2–3 na Home e no About. Timeline 2005 / 2021 / Today. Removidos "Founded in Panama in 2008" e "more than a decade". UAE + Miami mantidos. Meta description do About reescrita. |
| **C** Ranking | `content/site.ts`, `components/sections/Shared.tsx`, `content/credibility.ts` | "Top 35" com a nota de rodapé, atribuído ao Trust Group. Aparece na seção Trust Group (Home e About) e no bloco de certificações (About e /suppliers). |
| **D** Produtos | `content/products.ts` | Novos: MSG, Potassium Sorbate, Titanium Dioxide (TiO₂), Hydrofluoric Acid (HF, 70%). Plasticizers com `grade: 'DOTP, DOP, DINP'`. |
| **E** Ceramic Coating | `content/industries.ts` | Slug `ceramic-coating`, descrição sugerida, 4 produtos (TiO₂, STPP, Caustic Soda Flakes, HF). Filtros, cards da Home, contagens e `/industries` derivam de `industries` e `products`. Metadata de `/industries` e `/products` atualizada. |
| **F** Tags | `content/products.ts` | As 7 correções do slide 7 aplicadas. |
| **G** | — | Soda Ash (Dense), DMF e Polyacrylamide mantidos. Não estão na apresentação. |
| **H** /products | `app/products/page.tsx`, `app/industries/page.tsx`, `app/solutions/page.tsx` | "Our product portfolio." / "Key products we supply today." e novo title/meta. "Winner Mix" removido de todos os textos públicos (restou só em comentários internos e no histórico do README). |
| **I** Certificações | `content/credibility.ts`, `Shared.tsx` (`CertificationsSection`), `/about`, `/suppliers` | 4 itens, cada um atribuído à empresa correta. |
| **J** Trust Group | `content/site.ts`, `Shared.tsx` (`TrustGroupSection`) | Eyebrow "Part of Trust Group", 5 stats do prompt + Top 35, 5 linhas de negócio (slide 4). "80,000 m²" virou "80k+ m²" / "80,000+ m²". |
| **K** Taglog | `content/credibility.ts`, `Shared.tsx` (`TaglogSection`), `/suppliers` | 4 hubs + total + texto de licenciamento. |
| **L** Menções | `app/suppliers/page.tsx`, `Shared.tsx` (`CommitmentSection`), `/about` | Trust Tech adicionado ao bloco "Your gateway". "Our commitment" no About. Os 6 diferenciais: ver pendências. |

Decisões minhas que você pode reverter:
- **Top 35 como 6ª estatística** da seção Trust Group. O item J lista 5 stats e o item C manda trocar o ranking onde ele aparece. Mantive os dois (grade 2×3). Para ficar só com os 5, remova a última linha de `trustGroupFacts`.
- **Card "Panama / Incorporated in 2008" removido** de `offices` (About). Ele contradiz a nova história (Navigal lançada em 2021).
- **Parágrafo "We combine market intelligence…" removido** da Home, por ser parte da história antiga.
- **Títulos que não vieram do prompt:** "Credentials that back every operation.", "Licensed warehousing across Brazil, through Taglog." e "Responsibility beyond the operation.". Descrições dos itens de certificação e compromisso são paráfrases do prompt (não tenho o texto dos slides 11–12).
- **Layout:** com 11 setores, o grid de cards da Home (5 colunas) fecha com 1 card sozinho na 3ª linha. Não mexi no design.

## 2. Pendências

### Dados que faltaram (item deixado de fora)
1. **"14M+ invested in technology"**: não publicado (moeda indefinida).
2. **Slide 11, 6 diferenciais.** Só tenho o texto de "Real-time visibility". Em `/suppliers` hoje:
   - Já refletidos, em outras palavras: Real-time visibility (`content/solutions.ts`, `audiences.suppliers.items`), Efficient logistics (nova seção Taglog), Expert team ("technical, regulatory and logistics expertise") e Tailored solutions ("partnerships designed for each product and market").
   - Não refletidos: **Nationwide network** (parcial, via hubs Taglog) e **Cost efficiency** (nada no `/suppliers`).
   - Para criar a seção "Why partner with Navigal", preciso dos textos do slide 11.
3. **Atribuição do IMO**: o prompt não diz qual empresa do grupo. O item está sem empresa em `content/credibility.ts:19-23`. Informe e eu atribuo.
4. **CAS dos 4 produtos novos**: verificados (MSG 142-47-2, Potassium Sorbate 24634-61-5, TiO₂ 13463-67-7, HF 7664-39-3), mas não exibidos. O CAS só existe dentro do `datasheet`, que exige NCM, fórmula, aplicações e compradores, e a apresentação não os traz. Estão como comentário em `content/products.ts` (topo). Sem CAS, esses itens também não aparecem na busca por CAS.
5. **Slide 12 (Our commitment)**: texto montado a partir da descrição do prompt (`content/credibility.ts`, `commitment`). Confira com o slide.
6. **Soda Ash (Dense), DMF e Polyacrylamide** estão no site e não na apresentação (`content/products.ts`: linhas 82, 135 e 166).

### Decisões suas (não alterei)
1. **Contato.** A apresentação usa Fernando Victorino, fernando.victorino@trust.group, +55 (47) 98844 9269 e www.navigal-ts.com. O site usa contact@navigal-ts.com, +1 646 915 1713 e +55 11 93312 5318. Onde o contato aparece:
   - Fonte dos dados: `content/site.ts:17` (e-mail) e `:22-23` (telefones).
   - Rodapé: `components/layout/Footer.tsx:80-90`.
   - /contact: `app/contact/page.tsx:41-55`.
   - Mensagem de erro do formulário (e-mail de fallback): `components/forms/ContactForm.tsx:116-117`. O formulário de /suppliers usa o mesmo componente.
   - **Destino real dos formulários (Resend):** `app/api/contact/route.ts:4` (`DESTINATION`) e o comentário do remetente `:7-8`.
   - JSON-LD (schema.org) `email`: `app/layout.tsx:32`.
   - Domínio e canonical: `content/site.ts:7` (`SITE_URL`), usado em `lib/seo.ts`, `app/sitemap.ts` e no JSON-LD.
   - /suppliers: não há contato direto, só o formulário.
2. **Slide 8 (mercado brasileiro):** nada publicado ("Top 10 … urea exporters" e demais números de mercado).
3. **Entidade legal / Panamá (mantido como estava):**
   - `content/site.ts:11` (`legalName`), usado no rodapé (`Footer.tsx:106`) e no JSON-LD (`app/layout.tsx:29`).
   - `lib/seo.ts:13` (`siteName`) e `app/contact/page.tsx:12` (meta description).
   - `alt`/`aria-label` do logo em `HomeHero.tsx:50`, `Footer.tsx:21` e `Header.tsx:54`.
   - **`foundingDate` do JSON-LD** continua **2008** (`content/site.ts:16`, `app/layout.tsx:33`), enquanto o texto público diz 2021. Decida se 2008 é a data da entidade legal e deve ficar.
   - **Marcador "Panama" no mapa** (`components/sections/RouteMap.tsx:14, 46` e o `aria-label` na `:69`), que ainda lista Panamá como escritório. Isso agora destoa do About, que não tem mais o card.

## 3. Checklist de verificação manual (EN; PT/ES não existem ainda)

- **Home:** stats (Navigal launched 2021 · 11k tons · 34→"30+" · 3); história "Born from the chemical industry" com fecho e UAE/Miami; 11 cards de setor com contagens (Ceramic Coating = 4); Trust Group com 6 stats, nota do ranking e 5 linhas de negócio.
- **About:** história e timeline 2005/2021/Today; valor "Experience" sem "decade"; offices sem Panamá; Trust Group; Our commitment; Certifications com nota.
- **Products:** título/subtítulo novos; "Showing 34 of 34"; filtros: Ceramic Coating (4: Caustic Soda Flakes, STPP, TiO₂, HF), Food (11, com MSG, Sorbate, Phosphoric, Lactic, EDTA, Citric no Water Treatment), Paints (4, com Acetic e TiO₂), Water (10); Plasticizers com "DOTP, DOP, DINP"; busca por "TiO₂".
- **Industries:** 11 blocos, `ceramic-coating` com 4 produtos e link para o filtro.
- **Suppliers:** frase do Trust Tech; seção Taglog (4 hubs + total); certificações; formulário continua enviando.
- **Contact:** sem mudanças (conferir que continua igual).
- **Em todas:** nenhuma ocorrência de "2008", "Winner Mix", "Top 30" ou "25,000".

## 4. Traduções (PT-BR / ES) dos textos novos ou alterados

### Hero (A)
| EN | PT-BR | ES |
| --- | --- | --- |
| Navigal launched | Navigal lançada em | Navigal lanzada en |
| Tons imported by Navigal in 2025 | Toneladas importadas pela Navigal em 2025 | Toneladas importadas por Navigal en 2025 |

### História (B)
| EN | PT-BR | ES |
| --- | --- | --- |
| Why Navigal exists | Por que a Navigal existe | Por qué existe Navigal |
| Born from the chemical industry | Nascida da indústria química | Nacida de la industria química |
| Before Trust Group, our founder Juliano Victorino ran a detergent powder factory in Brazil and learned first-hand how hard it is to source chemical inputs from abroad. In 2005, he founded Trust in Itajaí/SC to import those raw materials. | Antes do Trust Group, nosso fundador Juliano Victorino dirigia uma fábrica de detergente em pó no Brasil e aprendeu na prática como é difícil obter insumos químicos no exterior. Em 2005, fundou a Trust em Itajaí/SC para importar essas matérias-primas. | Antes de Trust Group, nuestro fundador Juliano Victorino dirigía una fábrica de detergente en polvo en Brasil y aprendió de primera mano lo difícil que es conseguir insumos químicos en el exterior. En 2005 fundó Trust en Itajaí/SC para importar esas materias primas. |
| Two decades of importing chemicals and other products taught us every technical, regulatory and logistics requirement of the Brazilian market. In 2021, Trust Group created Navigal to take this know-how to the source, working side by side with suppliers to grow their market share in Brazil and Latin America. | Duas décadas importando produtos químicos e outros itens nos ensinaram todas as exigências técnicas, regulatórias e logísticas do mercado brasileiro. Em 2021, o Trust Group criou a Navigal para levar esse conhecimento até a origem, trabalhando lado a lado com os fornecedores para ampliar sua participação de mercado no Brasil e na América Latina. | Dos décadas importando productos químicos y otros artículos nos enseñaron todos los requisitos técnicos, regulatorios y logísticos del mercado brasileño. En 2021, Trust Group creó Navigal para llevar este conocimiento al origen, trabajando codo a codo con los proveedores para ampliar su participación de mercado en Brasil y América Latina. |
| We know the industry because we were the industry. | Conhecemos a indústria porque fomos a indústria. | Conocemos la industria porque fuimos la industria. |
| Navigal operates from the United Arab Emirates, with an office in Miami. | A Navigal opera a partir dos Emirados Árabes Unidos, com escritório em Miami. | Navigal opera desde los Emiratos Árabes Unidos, con oficina en Miami. |
| 2005 · Trust is founded in Itajaí/SC | 2005 · A Trust é fundada em Itajaí/SC | 2005 · Se funda Trust en Itajaí/SC |
| Juliano Victorino founds Trust to import the chemical raw materials he had found so hard to source from abroad. | Juliano Victorino funda a Trust para importar as matérias-primas químicas que tinha tanta dificuldade de obter no exterior. | Juliano Victorino funda Trust para importar las materias primas químicas que tanto le costaba conseguir en el exterior. |
| 2021 · Navigal is launched | 2021 · A Navigal é lançada | 2021 · Se lanza Navigal |
| Trust Group creates its international trading company to take the group’s know-how to the source, working side by side with suppliers. | O Trust Group cria sua trading internacional para levar o conhecimento do grupo até a origem, trabalhando lado a lado com os fornecedores. | Trust Group crea su trading internacional para llevar el conocimiento del grupo al origen, trabajando codo a codo con los proveedores. |
| Today · Full ecosystem support | Hoje · Apoio do ecossistema completo | Hoy · Respaldo del ecosistema completo |
| Navigal operates with the full support of a foreign trade and logistics ecosystem. | A Navigal opera com o apoio total de um ecossistema de comércio exterior e logística. | Navigal opera con el respaldo total de un ecosistema de comercio exterior y logística. |
| Experience: Two decades of Trust Group experience importing chemicals and other products. | Experiência: duas décadas de experiência do Trust Group importando produtos químicos e outros itens. | Experiencia: dos décadas de experiencia de Trust Group importando productos químicos y otros artículos. |
| Meta (About): Born from the chemical industry: Navigal is the international trading company launched by Trust Group in 2021, operating from the United Arab Emirates and connecting global suppliers to Latin American industry. | Nascida da indústria química: a Navigal é a trading internacional lançada pelo Trust Group em 2021, opera a partir dos Emirados Árabes Unidos e conecta fornecedores globais à indústria latino-americana. | Nacida de la industria química: Navigal es la trading internacional lanzada por Trust Group en 2021, opera desde los Emiratos Árabes Unidos y conecta proveedores globales con la industria latinoamericana. |

### Trust Group (C, J)
| EN | PT-BR | ES |
| --- | --- | --- |
| Part of Trust Group | Parte do Trust Group | Parte de Trust Group |
| 20+ years in the market | 20+ anos no mercado | 20+ años en el mercado |
| 300+ employees | 300+ colaboradores | 300+ colaboradores |
| 80k+ m² of warehousing | 80k+ m² de armazenagem | 80k+ m² de almacenamiento |
| 65+ international routes | 65+ rotas internacionais | 65+ rutas internacionales |
| 10+ certifications and seals | 10+ certificações e selos | 10+ certificaciones y sellos |
| Top 35* chemical importers in Brazil (Trust Group) | Top 35* importadores químicos do Brasil (Trust Group) | Top 35* importadores químicos de Brasil (Trust Group) |
| *Among 8,200+ importers (FOB, US$), excluding pesticides and fuels. Public import data, Aug/25 to Jul/26. | *Entre mais de 8.200 importadores (FOB, US$), excluindo defensivos agrícolas e combustíveis. Dados públicos de importação, ago/25 a jul/26. | *Entre más de 8.200 importadores (FOB, US$), excluidos agroquímicos y combustibles. Datos públicos de importación, ago/25 a jul/26. |
| Five companies working together so every operation runs end to end | Cinco empresas trabalhando juntas para que toda operação funcione de ponta a ponta | Cinco empresas trabajando juntas para que cada operación funcione de punta a punta |
| Foreign Trade: Import/export services and trade finance | Comércio Exterior: serviços de importação/exportação e financiamento do comércio | Comercio Exterior: servicios de importación/exportación y financiamiento del comercio |
| International Trading: Navigal | Trading Internacional: Navigal | Trading Internacional: Navigal |
| International Logistics: Sea, air and road freight, including project cargo | Logística Internacional: frete marítimo, aéreo e rodoviário, incluindo cargas de projeto | Logística Internacional: flete marítimo, aéreo y terrestre, incluidas cargas de proyecto |
| National Logistics: Warehouses and road transport across Brazil | Logística Nacional: armazéns e transporte rodoviário em todo o Brasil | Logística Nacional: almacenes y transporte terrestre en todo Brasil |
| Global Brands Management: Expansion of international brands in Brazil | Global Brands Management: expansão de marcas internacionais no Brasil | Global Brands Management: expansión de marcas internacionales en Brasil |

### Certificações (I)
| EN | PT-BR | ES |
| --- | --- | --- |
| Certifications & compliance | Certificações e compliance | Certificaciones y cumplimiento |
| Credentials that back every operation. | Credenciais que sustentam cada operação. | Credenciales que respaldan cada operación. |
| Top 35 chemical importers in Brazil* (Trust Group) | Top 35 importadores químicos do Brasil* (Trust Group) | Top 35 importadores químicos de Brasil* (Trust Group) |
| Ranked among the largest chemical importers in the country. | Entre os maiores importadores químicos do país. | Entre los mayores importadores químicos del país. |
| IMO: Hazardous cargo handled with full licensing. | IMO: carga perigosa movimentada com licenciamento completo. | IMO: carga peligrosa manejada con licenciamiento completo. |
| Federal Revenue certification (Trust Comércio Exterior): Trust Comércio Exterior is certified by the Brazilian Federal Revenue. | Certificação da Receita Federal (Trust Comércio Exterior): a Trust Comércio Exterior é certificada pela Receita Federal do Brasil. | Certificación de la Receita Federal (Trust Comércio Exterior): Trust Comércio Exterior está certificada por la Receita Federal de Brasil. |
| SASSMAQ and ISO 9001 (Taglog Logística Integrada, a Trust Group company): Safety, health, environment and quality standards in logistics operations. | SASSMAQ e ISO 9001 (Taglog Logística Integrada, empresa do Trust Group): padrões de segurança, saúde, meio ambiente e qualidade nas operações logísticas. | SASSMAQ e ISO 9001 (Taglog Logística Integrada, empresa de Trust Group): estándares de seguridad, salud, medio ambiente y calidad en las operaciones logísticas. |

### Logística Taglog (K)
| EN | PT-BR | ES |
| --- | --- | --- |
| Logistics in Brazil | Logística no Brasil | Logística en Brasil |
| Licensed warehousing across Brazil, through Taglog. | Armazenagem licenciada em todo o Brasil, com a Taglog. | Almacenamiento licenciado en todo Brasil, con Taglog. |
| Licensed for products regulated by IBAMA, MAPA, ANVISA, the Brazilian Army and the Federal Police. | Licenciada para produtos regulados por IBAMA, MAPA, ANVISA, Exército Brasileiro e Polícia Federal. | Licenciada para productos regulados por IBAMA, MAPA, ANVISA, el Ejército Brasileño y la Policía Federal. |
| 18,000+ pallet positions | 18.000+ posições-pallet | 18.000+ posiciones de palet |
| 15 min from the Port of Navegantes | a 15 min do Porto de Navegantes | a 15 min del Puerto de Navegantes |
| 45 min from the Port of Itapoá | a 45 min do Porto de Itapoá | a 45 min del Puerto de Itapoá |
| 25 min from Viracopos Airport | a 25 min do Aeroporto de Viracopos | a 25 min del Aeropuerto de Viracopos |
| 30 min from the Port of Suape | a 30 min do Porto de Suape | a 30 min del Puerto de Suape |
| Total: 80,000+ m² · 38,000+ pallet positions | Total: 80.000+ m² · 38.000+ posições-pallet | Total: 80.000+ m² · 38.000+ posiciones de palet |

(Os demais hubs seguem o mesmo padrão: 5.000+ / 6.000+ / 9.000+ posições; 47.000+ / 16.000+ / 7.000+ / 10.000+ m².)

### Menções (L)
| EN | PT-BR | ES |
| --- | --- | --- |
| The Trust Tech platform tracks every stage of the operation. | A plataforma Trust Tech acompanha cada etapa da operação. | La plataforma Trust Tech da seguimiento a cada etapa de la operación. |
| Our commitment | Nosso compromisso | Nuestro compromiso |
| Responsibility beyond the operation. | Responsabilidade além da operação. | Responsabilidad más allá de la operación. |
| Instituto Trust: Sport as a tool for inclusion and social development. | Instituto Trust: o esporte como ferramenta de inclusão e desenvolvimento social. | Instituto Trust: el deporte como herramienta de inclusión y desarrollo social. |
| Ethics, compliance and sustainability: Shared standards across the group, assessed by independent organizations. | Ética, compliance e sustentabilidade: padrões compartilhados em todo o grupo, avaliados por organizações independentes. | Ética, cumplimiento y sostenibilidad: estándares compartidos en todo el grupo, evaluados por organizaciones independientes. |

### Produtos e setores (D, E, H)
| EN | PT-BR | ES |
| --- | --- | --- |
| Our product portfolio. | Nosso portfólio de produtos. | Nuestro portafolio de productos. |
| Key products we supply today. | Principais produtos que fornecemos hoje. | Principales productos que suministramos hoy. |
| Ceramic Coating | Revestimento Cerâmico | Recubrimiento Cerámico |
| Inputs for ceramic coatings and glazes. | Insumos para revestimentos cerâmicos e esmaltes. | Insumos para recubrimientos cerámicos y esmaltes. |
| Monosodium Glutamate (MSG) | Glutamato Monossódico (MSG) | Glutamato Monosódico (MSG) |
| Potassium Sorbate | Sorbato de Potássio | Sorbato de Potasio |
| Titanium Dioxide (TiO₂) | Dióxido de Titânio (TiO₂) | Dióxido de Titanio (TiO₂) |
| Hydrofluoric Acid (HF) 70% | Ácido Fluorídrico (HF) 70% | Ácido Fluorhídrico (HF) 70% |
| Plasticizers (DOTP, DOP, DINP) | Plastificantes (DOTP, DOP, DINP) | Plastificantes (DOTP, DOP, DINP) |
| Meta (Products): Navigal’s product portfolio: fertilizers, industrial chemicals, water treatment, cosmetics and food ingredients, polyurethanes, resins and ceramic coating inputs sourced from qualified manufacturers worldwide. | Portfólio de produtos da Navigal: fertilizantes, químicos industriais, tratamento de água, ingredientes para cosméticos e alimentos, poliuretanos, resinas e insumos para revestimento cerâmico, de fabricantes qualificados no mundo todo. | Portafolio de productos de Navigal: fertilizantes, químicos industriales, tratamiento de agua, ingredientes para cosméticos y alimentos, poliuretanos, resinas e insumos para recubrimiento cerámico, de fabricantes calificados en todo el mundo. |
| Through our product portfolio we bring… / …special expertise in our product portfolio | Por meio do nosso portfólio de produtos trazemos… / …especialidade no nosso portfólio de produtos | A través de nuestro portafolio de productos traemos… / …especialidad en nuestro portafolio de productos |
