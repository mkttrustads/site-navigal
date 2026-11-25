import DottedMap from 'dotted-map'
import { LocalizedSvg, T } from '@/components/ui/LocalizedText'
import type { UiKey } from '@/lib/i18n/translate'

// Mapa-múndi pontilhado gerado no servidor (a biblioteca não vai para o
// bundle do cliente) com as rotas em Azul Marítimo: a faixa curva usada como
// "linha de horizonte" para indicar conexões geográficas, como pede o Brand
// Persona.

type Place = { name: string; lat: number; lng: number; kind: 'office' | 'origin' }

// Lógica da apresentação: as origens convergem na base da Navigal (Emirados) e
// dali sai UMA única rota para o Brasil / América Latina. Miami liga ao Brasil.
const HUB: Place = { name: 'Navigal', lat: 25.8, lng: 55.95, kind: 'office' }
const DESTINATION: Place = { name: 'Brazil', lat: -23.55, lng: -46.63, kind: 'office' }
const MIAMI: Place = { name: 'Miami', lat: 25.76, lng: -80.19, kind: 'office' }

const places: Place[] = [
  HUB,
  MIAMI,
  DESTINATION,
  { name: 'Italy', lat: 44.4, lng: 8.9, kind: 'origin' },
  { name: 'Turkey', lat: 40.0, lng: 32.9, kind: 'origin' },
  { name: 'Oman', lat: 17.0, lng: 54.0, kind: 'origin' },
  { name: 'China', lat: 31.2, lng: 121.5, kind: 'origin' },
  { name: 'Taiwan', lat: 24.0, lng: 121.0, kind: 'origin' },
  { name: 'Vietnam', lat: 10.8, lng: 106.7, kind: 'origin' },
  { name: 'Malaysia', lat: 3.1, lng: 101.7, kind: 'origin' },
]

// Origens → Navigal. Curvatura suave, diferente por rota para as curvas não se sobreporem.
const originRoutes: { from: string; bend: number }[] = [
  { from: 'Italy', bend: 0.1 },
  { from: 'Turkey', bend: 0.12 },
  { from: 'Oman', bend: 0.15 },
  { from: 'China', bend: 0.1 },
  { from: 'Taiwan', bend: -0.06 },
  { from: 'Vietnam', bend: -0.1 },
  { from: 'Malaysia', bend: -0.14 },
]

const map = new DottedMap({ height: 64, grid: 'diagonal', region: { lat: { min: -56, max: 72 }, lng: { min: -130, max: 160 } } })
const baseSvg = map.getSVG({ radius: 0.24, color: '#3A3F47', shape: 'circle', backgroundColor: 'transparent' })
// Variante para fundo azul (Home): pontos brancos, atenuados por opacidade no contêiner.
const baseSvgBrand = map.getSVG({ radius: 0.24, color: '#FFFFFF', shape: 'circle', backgroundColor: 'transparent' })
const { width, height } = map.image

const points = Object.fromEntries(places.map((place) => [place.name, { ...place, ...map.getPin(place) }]))

function arc(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const distance = Math.hypot(to.x - from.x, to.y - from.y)
  return `M${from.x} ${from.y} Q${mx} ${my - distance * bend} ${to.x} ${to.y}`
}

// Rótulos posicionados à mão, para não colidirem entre si nem com as rotas.
const labelOffset: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
  Navigal: { dx: 0, dy: -2.6, anchor: 'middle' },
  Miami: { dx: -1.6, dy: 0.2, anchor: 'end' },
  Brazil: { dx: 1.8, dy: 0.6, anchor: 'start' },
  Italy: { dx: 0, dy: -1.8, anchor: 'middle' },
  Turkey: { dx: 0, dy: -1.8, anchor: 'middle' },
  Oman: { dx: 0, dy: 3, anchor: 'middle' },
  China: { dx: 0, dy: -1.8, anchor: 'middle' },
  Taiwan: { dx: 1.2, dy: 0.5, anchor: 'start' },
  Vietnam: { dx: 1.2, dy: 0.5, anchor: 'start' },
  Malaysia: { dx: 1.2, dy: 0.5, anchor: 'start' },
}

type RouteMapProps = {
  className?: string
  /** `dark`: fundo preto (Suppliers). `brand`: fundo azul institucional (Home), tudo em branco para contrastar. */
  tone?: 'dark' | 'brand'
}

export default function RouteMap({ className, tone = 'dark' }: RouteMapProps) {
  const hub = points[HUB.name]
  const destination = points[DESTINATION.name]
  const brand = tone === 'brand'
  // No azul, o cobalto some e o cobalto-claro tem pouco contraste: rotas e marcadores passam a branco.
  const routeBase = brand ? '#FFFFFF' : '#2B5EA7'
  const routeFlow = brand ? '#FFFFFF' : '#8FB0E0'
  return (
    <div className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className={brand ? 'opacity-40 [&>svg]:h-auto [&>svg]:w-full' : '[&>svg]:h-auto [&>svg]:w-full'}
          // SVG gerado pela própria aplicação no build, sem entrada do usuário.
          dangerouslySetInnerHTML={{ __html: brand ? baseSvgBrand : baseSvg }}
        />
        <LocalizedSvg labelKey="map.aria" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
          {/* Miami → Brasil: tracejada e discreta, sem animação. */}
          <path
            d={`M${points.Miami.x} ${points.Miami.y} L${destination.x} ${destination.y}`}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity={brand ? 0.7 : 0.45}
            strokeWidth={0.3}
            strokeDasharray="1 1.1"
          />
          {originRoutes.map(({ from, bend }) => (
            <g key={from}>
              <path d={arc(points[from], hub, bend)} fill="none" stroke={routeBase} strokeOpacity={brand ? 0.45 : 0.35} strokeWidth={0.5} />
              <path d={arc(points[from], hub, bend)} fill="none" stroke={routeFlow} strokeWidth={0.5} strokeLinecap="round" className="route-flow" />
            </g>
          ))}
          {/* Navigal → Brasil: a única rota que sai da base, em destaque. */}
          <g>
            <path d={arc(hub, destination, 0.16)} fill="none" stroke={routeBase} strokeOpacity={brand ? 0.6 : 1} strokeWidth={0.9} strokeLinecap="round" />
            <path d={arc(hub, destination, 0.16)} fill="none" stroke={routeFlow} strokeWidth={0.5} strokeLinecap="round" className="route-flow" />
          </g>
          {Object.values(points).map((point) => {
            const offset = labelOffset[point.name]
            const office = point.kind === 'office'
            return (
              <g key={point.name}>
                {office && <circle cx={point.x} cy={point.y} r={point.name === HUB.name ? 2.4 : 1.6} fill={brand ? '#FFFFFF' : '#2B5EA7'} fillOpacity={brand ? 0.25 : 0.3} />}
                <circle cx={point.x} cy={point.y} r={point.name === HUB.name ? 1.15 : office ? 0.8 : 0.6} fill={office ? '#2B5EA7' : '#FFFFFF'} stroke="#FFFFFF" strokeWidth={office ? 0.25 : 0} />
                <text
                  x={point.x + offset.dx}
                  y={point.y + offset.dy}
                  textAnchor={offset.anchor}
                  className={brand ? 'fill-white font-body' : 'fill-white/80 font-body'}
                  style={{ fontSize: 1.5, fontWeight: 600 }}
                >
                  <T k={`map.place.${point.name}` as UiKey} />
                </text>
              </g>
            )
          })}
        </LocalizedSvg>
      </div>
      <ul className={`mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm ${brand ? 'text-white/90' : 'text-white/70'}`}>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-cobalto" />
          <T k="map.legend.offices" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white" />
          <T k="map.legend.origins" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-0.5 w-6 ${brand ? 'bg-white' : 'bg-cobalto-claro'}`} />
          <T k="map.legend.routes" />
        </li>
      </ul>
    </div>
  )
}
