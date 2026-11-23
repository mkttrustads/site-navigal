import DottedMap from 'dotted-map'
import { LocalizedSvg, T } from '@/components/ui/LocalizedText'
import type { UiKey } from '@/lib/i18n/translate'

// Mapa-múndi pontilhado gerado no servidor (a biblioteca não vai para o
// bundle do cliente) com as rotas em Azul Marítimo: a faixa curva usada como
// "linha de horizonte" para indicar conexões geográficas, como pede o Brand
// Persona.

type Place = { name: string; lat: number; lng: number; kind: 'office' | 'origin' }

const DESTINATION: Place = { name: 'Brazil', lat: -23.55, lng: -46.63, kind: 'office' }

const places: Place[] = [
  { name: 'UAE', lat: 25.8, lng: 55.95, kind: 'office' },
  { name: 'Panama', lat: 8.98, lng: -79.52, kind: 'office' },
  { name: 'Miami', lat: 25.76, lng: -80.19, kind: 'office' },
  DESTINATION,
  { name: 'China', lat: 31.2, lng: 121.5, kind: 'origin' },
  { name: 'India', lat: 19.07, lng: 72.88, kind: 'origin' },
  { name: 'Europe', lat: 51.92, lng: 4.48, kind: 'origin' },
]

// Duas camadas de rota, no mesmo estilo visual:
// 1) origens → base da Navigal nos Emirados (UAE), onde a carga é negociada;
// 2) rotas comerciais para o Brasil / América Latina (as já existentes).
// A curvatura varia por rota para as curvas não se sobreporem.
const BASE = 'UAE'

const routes: { from: string; to: string; bend: number }[] = [
  { from: 'China', to: BASE, bend: -0.1 },
  { from: 'India', to: BASE, bend: -0.3 },
  { from: 'Europe', to: BASE, bend: 0.12 },
  { from: 'China', to: DESTINATION.name, bend: 0.2 },
  { from: 'India', to: DESTINATION.name, bend: 0.3 },
  { from: 'UAE', to: DESTINATION.name, bend: 0.42 },
  { from: 'Europe', to: DESTINATION.name, bend: 0.3 },
]

const map = new DottedMap({ height: 64, grid: 'diagonal', region: { lat: { min: -56, max: 72 }, lng: { min: -130, max: 160 } } })
const baseSvg = map.getSVG({ radius: 0.24, color: '#3A3F47', shape: 'circle', backgroundColor: 'transparent' })
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
  UAE: { dx: 0.4, dy: -2, anchor: 'middle' },
  Panama: { dx: -1.6, dy: 0.6, anchor: 'end' },
  Miami: { dx: -1.6, dy: 0.2, anchor: 'end' },
  Brazil: { dx: 1.8, dy: 0.6, anchor: 'start' },
  China: { dx: 0, dy: -1.8, anchor: 'middle' },
  India: { dx: 0.4, dy: 3, anchor: 'middle' },
  Europe: { dx: 0, dy: -1.8, anchor: 'middle' },
}

export default function RouteMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="[&>svg]:h-auto [&>svg]:w-full"
          // SVG gerado pela própria aplicação no build, sem entrada do usuário.
          dangerouslySetInnerHTML={{ __html: baseSvg }}
        />
        <LocalizedSvg labelKey="map.aria" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
          {routes.map(({ from, to, bend }) => (
            <g key={`${from}-${to}`}>
              <path d={arc(points[from], points[to], bend)} fill="none" stroke="#2B5EA7" strokeOpacity={0.35} strokeWidth={0.5} />
              <path
                d={arc(points[from], points[to], bend)}
                fill="none"
                stroke="#8FB0E0"
                strokeWidth={0.5}
                strokeLinecap="round"
                className="route-flow"
              />
            </g>
          ))}
          {Object.values(points).map((point) => {
            const offset = labelOffset[point.name]
            const office = point.kind === 'office'
            return (
              <g key={point.name}>
                {office && <circle cx={point.x} cy={point.y} r={1.6} fill="#2B5EA7" fillOpacity={0.3} />}
                <circle cx={point.x} cy={point.y} r={office ? 0.8 : 0.6} fill={office ? '#2B5EA7' : '#FFFFFF'} stroke="#FFFFFF" strokeWidth={office ? 0.25 : 0} />
                <text
                  x={point.x + offset.dx}
                  y={point.y + offset.dy}
                  textAnchor={offset.anchor}
                  className="fill-white/80 font-body"
                  style={{ fontSize: 1.5, fontWeight: 600 }}
                >
                  <T k={`map.place.${point.name}` as UiKey} />
                </text>
              </g>
            )
          })}
        </LocalizedSvg>
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-cobalto" />
          <T k="map.legend.offices" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white" />
          <T k="map.legend.origins" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 bg-cobalto-claro" />
          <T k="map.legend.routes" />
        </li>
      </ul>
    </div>
  )
}
