import {
  BadgeCheck,
  Car,
  ClipboardList,
  Clock,
  Droplets,
  Factory,
  Globe,
  Handshake,
  Landmark,
  Network,
  Package,
  Paintbrush,
  Pill,
  Route,
  Scale,
  Search,
  ShieldCheck,
  Shirt,
  Sofa,
  Sparkles,
  Sprout,
  Target,
  Truck,
  type LucideIcon,
} from 'lucide-react'

// Os arquivos de conteúdo (content/*.ts) referenciam ícones por nome, para o
// conteúdo continuar sendo dado puro, sem JSX.
const icons: Record<string, LucideIcon> = {
  badgeCheck: BadgeCheck,
  car: Car,
  clipboard: ClipboardList,
  clock: Clock,
  droplets: Droplets,
  factory: Factory,
  globe: Globe,
  handshake: Handshake,
  landmark: Landmark,
  network: Network,
  package: Package,
  paintbrush: Paintbrush,
  pill: Pill,
  route: Route,
  scale: Scale,
  search: Search,
  shield: ShieldCheck,
  shirt: Shirt,
  sofa: Sofa,
  sparkles: Sparkles,
  sprout: Sprout,
  target: Target,
  truck: Truck,
}

export default function Icon({ name, className }: { name: string; className?: string }) {
  const Component = icons[name] ?? Globe
  return <Component aria-hidden="true" strokeWidth={1.6} className={className} />
}
