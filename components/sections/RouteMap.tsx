import DottedMap from 'dotted-map'
import Flag, { type FlagCode } from '@/components/ui/Flags'
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
// Variante para fundo cinza-claro (Home, mesmo off-white de "O que fazemos"): pontos em cinza médio.
const baseSvgLight = map.getSVG({ radius: 0.24, color: '#9AA1AB', shape: 'circle', backgroundColor: 'transparent' })
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

// Bandeiras (Home): cada ponto ganha uma etiqueta HTML com bandeira + nome, posicionada em % sobre o
// mapa mas com tamanho fixo em px, para continuar legível no mobile (o texto do SVG encolhe com o mapa).
// `placement` é o lado do ponto onde a etiqueta fica; `compact` esconde o nome abaixo de `sm`, onde só a
// bandeira cabe sem colisão (o nome segue disponível para leitores de tela).
type Placement = 'top' | 'bottom' | 'left' | 'right'
const flagChips: Record<string, { flag: FlagCode; label: UiKey; placement: Placement; compact?: boolean; strong?: boolean }> = {
  Navigal: { flag: 'AE', label: 'map.place.NavigalHub', placement: 'top', strong: true },
  Miami: { flag: 'US', label: 'map.place.Miami', placement: 'top' },
  Brazil: { flag: 'BR', label: 'map.place.BrazilLatam', placement: 'right', strong: true },
  Italy: { flag: 'IT', label: 'map.place.Italy', placement: 'left', compact: true },
  Turkey: { flag: 'TR', label: 'map.place.Turkey', placement: 'top', compact: true },
  Oman: { flag: 'OM', label: 'map.place.Oman', placement: 'bottom', compact: true },
  China: { flag: 'CN', label: 'map.place.China', placement: 'top', compact: true },
  Taiwan: { flag: 'TW', label: 'map.place.Taiwan', placement: 'right', compact: true },
  Vietnam: { flag: 'VN', label: 'map.place.Vietnam', placement: 'right', compact: true },
  Malaysia: { flag: 'MY', label: 'map.place.Malaysia', placement: 'right', compact: true },
}

const placementTransform: Record<Placement, string> = {
  top: 'translate(-50%, calc(-100% - 9px))',
  bottom: 'translate(-50%, 9px)',
  left: 'translate(calc(-100% - 10px), -50%)',
  right: 'translate(10px, -50%)',
}

type RouteMapProps = {
  className?: string
  /** Etiquetas com bandeira nos pontos do mapa (somente `tone="light"`). */
  flags?: boolean
  /** `dark`: fundo preto (Suppliers). `light`: fundo cinza-claro (Home), rotas e escritórios em azul institucional. */
  tone?: 'dark' | 'light'
}

export default function RouteMap({ className, tone = 'dark', flags = false }: RouteMapProps) {
  const hub = points[HUB.name]
  const destination = points[DESTINATION.name]
  const light = tone === 'light'
  const showFlags = flags && light
  // No claro, o cobalto institucional serve de base e o cobalto-escuro do fluxo animado garante contraste.
  const routeBase = '#2B5EA7'
  const routeFlow = light ? '#214B87' : '#8FB0E0'
  return (
    <div className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="[&>svg]:h-auto [&>svg]:w-full"
          // SVG gerado pela própria aplicação no build, sem entrada do usuário.
          dangerouslySetInnerHTML={{ __html: light ? baseSvgLight : baseSvg }}
        />
        <LocalizedSvg labelKey="map.aria" viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
          {/* Miami → Brasil: tracejada e discreta, sem animação. */}
          <path
            d={`M${points.Miami.x} ${points.Miami.y} L${destination.x} ${destination.y}`}
            fill="none"
            stroke={light ? '#2B5EA7' : '#FFFFFF'}
            strokeOpacity={light ? 0.7 : 0.45}
            strokeWidth={0.3}
            strokeDasharray="1 1.1"
          />
          {originRoutes.map(({ from, bend }) => (
            <g key={from}>
              <path d={arc(points[from], hub, bend)} fill="none" stroke={routeBase} strokeOpacity={light ? 0.4 : 0.35} strokeWidth={0.5} />
              <path d={arc(points[from], hub, bend)} fill="none" stroke={routeFlow} strokeWidth={0.5} strokeLinecap="round" className="route-flow" />
            </g>
          ))}
          {/* Navigal → Brasil: a única rota que sai da base, em destaque. */}
          <g>
            <path d={arc(hub, destination, 0.16)} fill="none" stroke={routeBase} strokeOpacity={light ? 0.55 : 1} strokeWidth={0.9} strokeLinecap="round" />
            <path d={arc(hub, destination, 0.16)} fill="none" stroke={routeFlow} strokeWidth={0.5} strokeLinecap="round" className="route-flow" />
          </g>
          {Object.values(points).map((point) => {
            const offset = labelOffset[point.name]
            const office = point.kind === 'office'
            return (
              <g key={point.name}>
                {office && <circle cx={point.x} cy={point.y} r={point.name === HUB.name ? 2.4 : 1.6} fill="#2B5EA7" fillOpacity={light ? 0.2 : 0.3} />}
                <circle cx={point.x} cy={point.y} r={point.name === HUB.name ? 1.15 : office ? 0.8 : 0.6} fill={office ? '#2B5EA7' : light ? '#4B5058' : '#FFFFFF'} stroke="#FFFFFF" strokeWidth={office ? 0.25 : 0} />
                {!showFlags && (
                  <text
                    x={point.x + offset.dx}
                    y={point.y + offset.dy}
                    textAnchor={offset.anchor}
                    className={light ? 'fill-suave font-body' : 'fill-white/80 font-body'}
                    // Halo off-white nos rótulos: mantém a leitura sobre os pontos do mapa.
                    style={{ fontSize: 1.5, fontWeight: 600, ...(light && { paintOrder: 'stroke', stroke: '#F7F9F8', strokeWidth: 0.5, strokeLinejoin: 'round' }) }}
                  >
                    <T k={`map.place.${point.name}` as UiKey} />
                  </text>
                )}
              </g>
            )
          })}
        </LocalizedSvg>
        {showFlags && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {Object.values(points).map((point) => {
              const chip = flagChips[point.name]
              return (
                <span
                  key={point.name}
                  className="absolute"
                  style={{ left: `${(point.x / width) * 100}%`, top: `${(point.y / height) * 100}%`, transform: placementTransform[chip.placement] }}
                >
                  <span
                    className={`flex items-center gap-1 whitespace-nowrap rounded bg-white/90 px-1 py-0.5 text-[10px] leading-none shadow-sm ring-1 ring-linha sm:gap-1.5 sm:px-1.5 sm:py-1 sm:text-xs ${
                      chip.strong ? 'font-bold text-cobalto-escuro' : 'font-semibold text-suave'
                    }`}
                  >
                    <Flag code={chip.flag} className="h-2.5 w-[15px] sm:h-3.5 sm:w-5" />
                    <span className={chip.compact ? 'sr-only sm:not-sr-only' : undefined}>
                      <T k={chip.label} />
                    </span>
                  </span>
                </span>
              )
            })}
          </div>
        )}
      </div>
      <ul className={`mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm ${light ? 'text-suave' : 'text-white/70'}`}>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-3 w-3 rounded-full border-2 bg-cobalto ${light ? 'border-white ring-1 ring-cobalto/30' : 'border-white'}`} />
          <T k="map.legend.offices" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${light ? 'bg-suave' : 'bg-white'}`} />
          <T k="map.legend.origins" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-0.5 w-6 ${light ? 'bg-cobalto' : 'bg-cobalto-claro'}`} />
          <T k="map.legend.routes" />
        </li>
      </ul>
    </div>
  )
}
