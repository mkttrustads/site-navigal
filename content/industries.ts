// Setores atendidos. Consolida os segmentos do Portfólio Winner Mix (2023),
// do site atual e da página Trading Internacional do site Trust Group.
// `icon` é o nome de um ícone do lucide-react (ver components/ui/Icon.tsx).

export type Industry = {
  slug: string
  name: string
  icon: string
  description: string
}

export const industries: Industry[] = [
  {
    slug: 'agribusiness',
    name: 'Agribusiness & Animal Nutrition',
    icon: 'sprout',
    description: 'Fertilizers and inputs for high-performance agriculture, and ingredients for the animal feed industry.',
  },
  {
    slug: 'cosmetics-home-care',
    name: 'Cosmetics & Home Care',
    icon: 'sparkles',
    description: 'Surfactants, acids and specialty chemicals for personal care, cleaning and home care formulations.',
  },
  {
    slug: 'water-treatment',
    name: 'Water Treatment & Sanitation',
    icon: 'droplets',
    description: 'Disinfectants, flocculants and phosphates for water treatment and sanitizing products.',
  },
  {
    slug: 'food-pharma',
    name: 'Food, Supplements & Pharma',
    icon: 'pill',
    description: 'Acidulants, preservatives and actives with the purity and consistency food and pharmaceutical manufacturing demands.',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    icon: 'car',
    description: 'Automotive-grade urea for AdBlue / ARLA 32 production and inputs for the automotive supply chain.',
  },
  {
    slug: 'polyurethanes',
    name: 'Polyurethanes & Upholstery',
    icon: 'sofa',
    description: 'Isocyanates and solvents for flexible foams, mattresses, automotive seating and coatings.',
  },
  {
    slug: 'paints-coatings',
    name: 'Paints, Varnishes & Coatings',
    icon: 'paintbrush',
    description: 'Solvents for paints, varnishes and lacquers that require durability, resistance and a consistent finish.',
  },
  {
    slug: 'textile',
    name: 'Textile & Fibers',
    icon: 'shirt',
    description: 'Solvents and process chemicals for fiber synthesis, dyeing and textile finishing.',
  },
  {
    slug: 'plastics',
    name: 'Resins & Plasticizers',
    icon: 'package',
    description: 'Thermoplastic resins and plasticizers for the plastics converting chain.',
  },
  {
    slug: 'industrial-chemicals',
    name: 'Glass & Industrial Chemicals',
    icon: 'factory',
    description: 'Soda ash, sulfur and base chemicals for glassmaking, chemical synthesis and general industry.',
  },
]

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug)
}
