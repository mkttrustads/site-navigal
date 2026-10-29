// Portfólio Winner Mix.
//
// Fontes: "Book de serviços - Navigal" (fichas técnicas, `datasheet`),
// "Portfólio Navigal Versão 02" e a lista atualizada da página Trading
// Internacional do site Trust Group ("Principais produtos que fornecemos hoje").
//
// Correções em relação ao Book de serviços (revisar com o time técnico):
// - Ácido Acético: o Book repetia nome químico, CAS e fórmula do Ácido Cítrico
//   (77-92-9, C6H8O7). Aqui estão os dados do ácido acético (64-19-7, CH3COOH).
// - Creatina: fórmula vinha com zeros no lugar da letra O (C4H9N302).
// - TDI 80/20: o Book traz o CAS do isômero 2,4-TDI puro (584-84-9). Para a
//   mistura 80/20 o CAS é 26471-62-5.
// - Poliacrilamida: o Book traz a fórmula do monômero (acrilamida); aqui a do
//   polímero.
//
// `ncm` é o código Mercosul. Notas regulatórias valem para o Brasil.

export type Datasheet = {
  chemicalName: string
  cas: string
  formula: string
  ncm: string
  description?: string
  applications: string
  buyers: string
  regulatory?: string[]
  documents: string[]
}

export type Product = {
  slug: string
  name: string
  industries: string[]
  /** Grau, concentração ou apresentação, quando relevante. */
  grade?: string
  datasheet?: Datasheet
}

const SDS = 'Safety Data Sheet (SDS)'
const EMERGENCY = 'Emergency Response Sheet'

export const products: Product[] = [
  {
    slug: 'acetic-acid',
    name: 'Acetic Acid',
    industries: ['cosmetics-home-care', 'food-pharma', 'textile'],
    datasheet: {
      chemicalName: 'Ethanoic acid',
      cas: '64-19-7',
      formula: 'CH3COOH',
      ncm: '2915.21.00',
      applications:
        'Latex coagulant in rubber manufacturing, neutralizing and acidifying agent in textile processing, synthesis of pharmaceutical actives, raw material for organic esters and PET bottle production. Not suitable for food-grade use.',
      buyers: 'Crop protection, cosmetics, pharmaceutical chemicals and textile manufacturers.',
      regulatory: [
        'Controlled by the Brazilian Federal Police and, in some states, by the Civil Police. Every link in the chain must hold a license.',
        'IMO-classified dangerous good.',
      ],
      documents: [SDS, EMERGENCY],
    },
  },
  {
    slug: 'citric-acid',
    name: 'Citric Acid',
    industries: ['food-pharma', 'cosmetics-home-care'],
    datasheet: {
      chemicalName: '2-hydroxy-1,2,3-propanetricarboxylic acid',
      cas: '77-92-9',
      formula: 'C6H8O7',
      ncm: '2918.14.00',
      applications: 'Acidulant, preservative and antioxidant.',
      buyers: 'Food manufacturers across a wide range of products, cosmetics and pharmaceutical industries.',
      documents: [SDS],
    },
  },
  {
    slug: 'soda-ash',
    name: 'Soda Ash (Dense)',
    industries: ['industrial-chemicals', 'water-treatment'],
    datasheet: {
      chemicalName: 'Sodium carbonate, dense',
      cas: '497-19-8',
      formula: 'Na2CO3',
      ncm: '2836.20.10',
      description: 'White crystalline powder. Forms an alkaline aqueous solution.',
      applications: 'Widely used in pool-cleaning products and in the production of sodium bicarbonate and glass.',
      buyers: 'Glass manufacturers, sanitizing products and the chemical industry in general.',
      regulatory: [
        'Controlled by the Brazilian Federal Police for exports to Bolivia, Colombia and Peru.',
        'Use as a wood preservative requires an IBAMA license.',
      ],
      documents: [SDS],
    },
  },
  {
    slug: 'methylene-chloride',
    name: 'Methylene Chloride',
    industries: ['paints-coatings', 'polyurethanes', 'food-pharma'],
    datasheet: {
      chemicalName: 'Dichloromethane',
      cas: '75-09-2',
      formula: 'CH2Cl2',
      ncm: '2903.12.00',
      applications:
        'Mainly used in the production of varnishes and lacquers. Solvent for the plastics, pharmaceutical and cosmetics industries, and caffeine extractant in food processing.',
      buyers: 'Paint and varnish, plastics, polyurethane, pharmaceutical and cosmetics manufacturers.',
      regulatory: [
        'Controlled by the Brazilian Federal Police and, in some states, by the Civil Police.',
        'IMO-classified dangerous good.',
      ],
      documents: [SDS, EMERGENCY],
    },
  },
  {
    slug: 'creatine',
    name: 'Creatine Monohydrate',
    grade: '200 mesh',
    industries: ['food-pharma'],
    datasheet: {
      chemicalName: 'Creatine monohydrate, 200 mesh',
      cas: '6020-87-7',
      formula: 'C4H9N3O2·H2O',
      ncm: '2925.29.90',
      applications: 'Supports strength, muscle mass gain, focus and reduced muscle fatigue.',
      buyers: 'Food supplement manufacturers.',
      documents: [SDS],
    },
  },
  {
    slug: 'dmf',
    name: 'DMF (Dimethylformamide)',
    industries: ['textile', 'paints-coatings', 'food-pharma'],
    datasheet: {
      chemicalName: 'N,N-dimethylformamide',
      cas: '68-12-2',
      formula: 'C3H7NO',
      ncm: '2924.19.22',
      applications: 'Organic solvent and polymerization agent.',
      buyers: 'Fiber synthesis, paint, pharmaceutical and crop protection manufacturers.',
      regulatory: ['IMO-classified dangerous good (flammable).'],
      documents: [SDS, EMERGENCY],
    },
  },
  {
    slug: 'sulfur',
    name: 'Sulfur',
    industries: ['agribusiness', 'industrial-chemicals'],
    datasheet: {
      chemicalName: 'Sulfur',
      cas: '7704-34-9',
      formula: 'S',
      ncm: '2503.00.10',
      applications:
        'Mainly used to produce sulfuric acid, the essential input for fertilizers that drive productivity in the field.',
      buyers: 'Fertilizer, chemical, cosmetics and rubber manufacturers.',
      regulatory: ['Controlled by the Civil Police in some Brazilian states; buyers must hold the license where applicable.'],
      documents: [SDS],
    },
  },
  {
    slug: 'polyacrylamide',
    name: 'Polyacrylamide',
    grade: 'Cationic or anionic',
    industries: ['water-treatment', 'food-pharma'],
    datasheet: {
      chemicalName: 'Polyacrylamide, cationic or anionic',
      cas: '69418-26-4 (cationic)',
      formula: '(C3H5NO)n',
      ncm: '3906.90.49',
      applications:
        'Flocculant for water treatment. Used to flocculate mineral solids and clarify wash water from minerals such as coal, sand and clay.',
      buyers: 'Chemical, pharmaceutical, food processing and mining industries.',
      documents: [SDS],
    },
  },
  {
    slug: 'tcca',
    name: 'TCCA (Trichloroisocyanuric Acid)',
    grade: '90%, powder or granular (8–30 mesh)',
    industries: ['water-treatment'],
    datasheet: {
      chemicalName: 'Trichloroisocyanuric acid',
      cas: '87-90-1',
      formula: 'C3Cl3N3O3',
      ncm: '2933.69.19',
      applications:
        'Production of disinfectants, algaecides and bactericides for water treatment. In industry, used as a bleaching agent and organic synthesis reagent.',
      buyers: 'Water treatment and the chemical industry in general.',
      regulatory: ['IMO-classified dangerous good.'],
      documents: [SDS, EMERGENCY],
    },
  },
  {
    slug: 'tdi',
    name: 'TDI 80/20 (Toluene Diisocyanate)',
    industries: ['polyurethanes'],
    datasheet: {
      chemicalName: 'Toluene diisocyanate, 80/20 isomer blend',
      cas: '26471-62-5',
      formula: 'C9H6N2O2',
      ncm: '2929.10.21',
      applications: 'Production of flexible foams for mattresses and automotive upholstery, fibers and coatings.',
      buyers: 'Foam, resin, adhesive and construction component manufacturers.',
      regulatory: ['IMO-classified dangerous good.'],
      documents: [SDS, EMERGENCY],
    },
  },
  {
    slug: 'automotive-urea',
    name: 'Automotive Urea',
    industries: ['automotive'],
    datasheet: {
      chemicalName: 'Urea, automotive (premium) grade',
      cas: '57-13-6',
      formula: 'CH4N2O',
      ncm: '3102.10.10',
      applications:
        'Premium urea used to manufacture AdBlue / ARLA 32, the solution that reduces pollutant emissions from diesel vehicles.',
      buyers:
        'Automotive grade is for the automotive industry only. Other urea grades serve fertilizers, animal feed, chemical, pharmaceutical and sanitizing applications.',
      regulatory: [
        'Agricultural (fertilizer) use requires a license from the Brazilian Ministry of Agriculture (MAPA).',
        'Controlled by the Brazilian Federal Police for exports to Bolivia, Colombia and Peru.',
        'Highly hygroscopic: requires suitable, moisture-protected storage.',
      ],
      documents: [SDS],
    },
  },

  // Agribusiness & animal nutrition
  { slug: 'fertilizer-urea', name: 'Fertilizer Urea', industries: ['agribusiness'] },
  { slug: 'formic-acid', name: 'Formic Acid', industries: ['agribusiness'] },
  { slug: 'rock-phosphate', name: 'Rock Phosphate', industries: ['agribusiness'] },
  { slug: 'potassium-chloride', name: 'Potassium Chloride (KCl)', industries: ['agribusiness'] },
  { slug: 'ammonium-sulfate', name: 'Ammonium Sulfate (SAM)', industries: ['agribusiness'] },
  { slug: 'tsp', name: 'Triple Superphosphate (TSP)', industries: ['agribusiness'] },
  { slug: 'potassium-hydroxide', name: 'Potassium Hydroxide (KOH)', industries: ['agribusiness', 'cosmetics-home-care'] },
  { slug: 'caustic-soda', name: 'Caustic Soda Flakes', industries: ['agribusiness', 'cosmetics-home-care', 'water-treatment'] },
  { slug: 'edta', name: 'EDTA', grade: '2Na / 4Na', industries: ['agribusiness', 'cosmetics-home-care', 'water-treatment'] },

  // Cosmetics & home care
  { slug: 'sodium-percarbonate', name: 'Sodium Percarbonate', industries: ['cosmetics-home-care'] },
  { slug: 'labsa', name: 'Sulfonic Acid (LABSA)', grade: '90–96%', industries: ['cosmetics-home-care', 'water-treatment'] },
  { slug: 'sles', name: 'Sodium Lauryl Ether Sulfate (SLES)', grade: '70%', industries: ['cosmetics-home-care'] },
  { slug: 'mea', name: 'Monoethanolamine (MEA)', industries: ['cosmetics-home-care', 'automotive'] },
  { slug: 'lactic-acid', name: 'Lactic Acid', grade: '85%', industries: ['cosmetics-home-care'] },

  // Water treatment
  { slug: 'sdic', name: 'SDIC (Sodium Dichloroisocyanurate)', grade: '56%', industries: ['water-treatment'] },
  { slug: 'phosphoric-acid', name: 'Phosphoric Acid', grade: '85%', industries: ['water-treatment'] },
  { slug: 'stpp', name: 'STPP (Sodium Tripolyphosphate)', industries: ['water-treatment'] },

  // Resins & plasticizers
  { slug: 'thermoplastic-resins', name: 'Thermoplastic Resins', grade: 'PP, PE, PVC and PET', industries: ['plastics'] },
  { slug: 'plasticizers', name: 'Plasticizers', industries: ['plastics'] },
]

export function productsForIndustry(slug: string) {
  return products.filter((product) => product.industries.includes(slug))
}
