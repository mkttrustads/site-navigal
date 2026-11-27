import type { CSSProperties } from 'react'
import DottedMap from 'dotted-map'
import { LocalizedSvg, T } from '@/components/ui/LocalizedText'
import type { UiKey } from '@/lib/i18n/translate'
import Flag, { hasFlag } from '@/components/ui/Flag'
import { ORIGIN_NAMES } from '@/lib/network-story'
import { GLOBE_BANDS, GLOBE_VIEWBOX } from '@/lib/globeBands'

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

// ---------------------------------------------------------------------------
// Variante "story" (Home): mesmo mapa e mesmas coordenadas, mas com grupos
// nomeados (`data-group`) para o NetworkStory acender cada um conforme o passo
// ativo. O CSS fica em globals.css (bloco "Rede Global"); aqui só há estrutura.
// ---------------------------------------------------------------------------

// Rótulos só com o nome (as origens ganham a bandeira como marcador, ver `Flag`), em HTML sobre o mapa: posição em % do mapa, tamanho
// fixo em px, para continuar legível no mobile (o texto do SVG encolhe junto com o mapa).
// `compact` esconde o nome abaixo de `sm`, onde as origens da Ásia colidiriam; os nomes seguem listados
// em texto no passo 1.
type Placement = 'top' | 'bottom' | 'left' | 'right'
const storyLabels: Record<string, { label: UiKey; placement: Placement; compact?: boolean }> = {
  Navigal: { label: 'map.place.NavigalHub', placement: 'top' },
  Miami: { label: 'map.place.Miami', placement: 'top' },
  Brazil: { label: 'map.place.BrazilLatam', placement: 'right' },
  Italy: { label: 'map.place.Italy', placement: 'left', compact: true },
  Turkey: { label: 'map.place.Turkey', placement: 'top', compact: true },
  Oman: { label: 'map.place.Oman', placement: 'bottom', compact: true },
  China: { label: 'map.place.China', placement: 'top', compact: true },
  Taiwan: { label: 'map.place.Taiwan', placement: 'right', compact: true },
  Vietnam: { label: 'map.place.Vietnam', placement: 'right', compact: true },
  Malaysia: { label: 'map.place.Malaysia', placement: 'right', compact: true },
}

// `--ns-gap` (só nas origens) = raio da bandeira + respiro; sem ele, valem os 8–9px dos escritórios.
const placementTransform: Record<Placement, string> = {
  top: 'translate(-50%, calc(-100% - var(--ns-gap, 8px)))',
  bottom: 'translate(-50%, var(--ns-gap, 8px))',
  left: 'translate(calc(-100% - var(--ns-gap, 9px)), -50%)',
  right: 'translate(var(--ns-gap, 9px), -50%)',
}
// Ponto do rótulo mais próximo do marcador: âncora do contra-zoom (o rótulo não cresce junto com o mapa).
const placementOrigin: Record<Placement, string> = { top: '50% 100%', bottom: '50% 0', left: '100% 50%', right: '0 50%' }

// Leque curto a partir do Brasil: raios sem nome nem rótulo (deslocamentos em unidades do mapa, sobre a
// América do Sul). Não representam países nem coordenadas reais, só "daqui a venda se abre pela região".
const latamFan: { dx: number; dy: number; bend: number }[] = [
  { dx: -1.5, dy: -9, bend: 0.1 },
  { dx: -7, dy: -7, bend: 0.1 },
  { dx: -8.5, dy: -1.5, bend: 0.1 },
  { dx: -6, dy: 5.5, bend: 0.1 },
]

// Só no celular (<640px), onde o mapa é pequeno: China e Taiwan ficam a ~12px e as bandeiras se tocariam;
// afasta as duas alguns px na vertical (o halo e a rota seguem no ponto real). Ver `.ns-flag` em globals.css.
const flagNudge: Partial<Record<string, Record<string, string>>> = {
  China: { '--ny': '-3px' },
  Taiwan: { '--ny': '3px' },
  // Omã está a ~9 unidades do hub: abaixo de 1024px o selo da Navigal encostaria na bandeira.
  Oman: { '--ox': '-5px', '--oy': '5px' },
}

const css = (vars: Record<string, string | number>) => vars as CSSProperties
const pct = (value: number, total: number) => `${(value / total) * 100}%`

type RouteMapProps = {
  className?: string
  /** `dark`: fundo preto (Suppliers). `light`: fundo cinza-claro (Home), rotas e escritórios em azul institucional. */
  tone?: 'dark' | 'light'
}

export default function RouteMap({ className, tone = 'dark' }: RouteMapProps) {
  const hub = points[HUB.name]
  const destination = points[DESTINATION.name]
  const light = tone === 'light'
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
              </g>
            )
          })}
        </LocalizedSvg>
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

export function RouteMapStory({ className }: { className?: string }) {
  const hub = points[HUB.name]
  const brazil = points[DESTINATION.name]
  const miami = points[MIAMI.name]
  const origins = ORIGIN_NAMES.map((name) => ({ point: points[name], bend: originRoutes.find((route) => route.from === name)?.bend ?? 0.1 }))
  const routeBase = '#2B5EA7'
  const dot = (x: number, y: number) => ({ cx: x, cy: y })
  return (
    <div className={className}>
      {/* Decorativo: os passos ao lado trazem todo o conteúdo em texto. */}
      <div aria-hidden="true" className="ns-frame" style={css({ '--ns-ar': width / height })}>
        <div className="ns-zoom" style={css({ '--hub-x': pct(hub.x, width), '--hub-y': pct(hub.y, height) })}>
          <div
            className="ns-dots [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
            // SVG gerado pela própria aplicação no build, sem entrada do usuário.
            dangerouslySetInnerHTML={{ __html: baseSvgLight }}
          />
          <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
            {/* Miami → Brasil: tracejada e discreta, igual nos 4 estados. */}
            <g data-group="miami">
              <path d={`M${miami.x} ${miami.y} L${brazil.x} ${brazil.y}`} fill="none" stroke={routeBase} strokeOpacity={0.7} strokeWidth={0.18} strokeDasharray="1 1.1" />
              <circle {...dot(miami.x, miami.y)} r={1.6} fill={routeBase} fillOpacity={0.2} />
              <circle {...dot(miami.x, miami.y)} r={0.8} fill={routeBase} stroke="#FFFFFF" strokeWidth={0.25} />
            </g>
            {/* Passo 1: origens de suprimento. */}
            <g data-group="origins">
              {origins.map(({ point }, index) => (
                <g key={point.name} className="ns-origin" style={css({ '--i': index })}>
                  {/* O marcador em si é a bandeira (HTML, camada abaixo); aqui fica só o halo. */}
                  <circle {...dot(point.x, point.y)} r={1.7} className="ns-origin-halo" fill={routeBase} fillOpacity={0.22} />
                </g>
              ))}
            </g>
            {/* Passo 2: as rotas se desenham até a base nos Emirados. */}
            <g data-group="routes-to-hub">
              {origins.map(({ point, bend }, index) => (
                <path key={point.name} d={arc(point, hub, bend)} data-draw className="ns-draw" style={css({ '--i': index })} fill="none" stroke={routeBase} strokeWidth={0.28} strokeLinecap="round" />
              ))}
            </g>
            {/* Passo 3: a rota única da base para o Brasil e o leque pela região. */}
            <g data-group="route-to-br">
              <path d={arc(hub, brazil, 0.16)} data-draw className="ns-draw" fill="none" stroke={routeBase} strokeWidth={0.5} strokeLinecap="round" />
            </g>
            <g data-group="latam-fan">
              {latamFan.map(({ dx, dy, bend }, index) => {
                const end = { x: brazil.x + dx, y: brazil.y + dy }
                return (
                  <g key={index} style={css({ '--i': index })}>
                    <path d={arc(brazil, end, bend)} data-draw className="ns-draw" fill="none" stroke={routeBase} strokeWidth={0.24} strokeLinecap="round" />
                    <circle {...dot(end.x, end.y)} r={0.5} className="ns-fan-end" fill={routeBase} />
                  </g>
                )
              })}
            </g>
            <g data-group="br">
              <circle {...dot(brazil.x, brazil.y)} r={1.6} fill={routeBase} fillOpacity={0.2} />
              <circle {...dot(brazil.x, brazil.y)} r={0.8} fill={routeBase} stroke="#FFFFFF" strokeWidth={0.25} />
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0">
            {/* Bandeiras das origens: marcador de cada país, centrado no ponto (tamanho fixo em px, ver --ns-flag). */}
            {origins.map(({ point }, index) =>
              hasFlag(point.name) ? (
                <span
                  key={point.name}
                  data-group="origins"
                  className="ns-flag-pos absolute"
                  style={css({ left: pct(point.x, width), top: pct(point.y, height) })}
                >
                  <Flag country={point.name} className="ns-flag" style={css({ '--i': index, ...flagNudge[point.name] })} />
                </span>
              ) : null
            )}
            {/* Base da Navigal (UAE): o símbolo da logo substitui o marcador, centrado no ponto (tamanho fixo em px, ver --ns-hub). */}
            <span data-group="hub" className="ns-hub-pos absolute" style={css({ left: pct(hub.x, width), top: pct(hub.y, height) })}>
              <span className="ns-hub-pulse" />
              <span className="ns-hub">
                <svg viewBox={`0 0 ${GLOBE_VIEWBOX.width} ${GLOBE_VIEWBOX.height}`} focusable="false" className="ns-hub-mark">
                  {GLOBE_BANDS.map((band, index) => (
                    <path key={index} d={band.d} fill={band.accent ? routeBase : '#0D0D0D'} />
                  ))}
                </svg>
              </span>
            </span>
            {Object.values(points).map((point) => {
              const chip = storyLabels[point.name]
              const group = point.name === HUB.name ? 'hub' : point.name === DESTINATION.name ? 'br' : point.name === MIAMI.name ? 'miami' : 'origins'
              return (
                <span
                  key={point.name}
                  data-group={group}
                  className="ns-label absolute"
                  style={css({
                    left: pct(point.x, width),
                    top: pct(point.y, height),
                    transform: placementTransform[chip.placement],
                    '--ns-o': placementOrigin[chip.placement],
                    // Origens: o rótulo se afasta do centro da bandeira (raio + respiro), não só do ponto.
                    ...(group === 'origins' && { '--ns-gap': 'calc(var(--ns-flag) / 2 + 5px)' }),
                    ...(group === 'hub' && { '--ns-gap': 'calc(var(--ns-hub) / 2 + 6px)' }),
                  })}
                >
                  <span className={chip.compact ? 'ns-label-text max-sm:hidden' : 'ns-label-text'}>
                    <T k={chip.label} />
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <ul className="ns-legend flex-wrap gap-x-8 gap-y-2 text-sm text-suave">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-3 rounded-full border-2 border-white bg-cobalto ring-1 ring-cobalto/30" />
          <T k="map.legend.offices" />
        </li>
        <li className="flex items-center gap-2">
          {/* Mini badge neutro: mesma moldura da bandeira (anel branco + sombra), sem favorecer nenhum país. */}
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-suave shadow-[0_0_0_1.5px_#FFFFFF,0_1px_3px_rgba(13,13,13,0.3)]" />
          <T k="map.legend.origins" />
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-6 bg-cobalto" />
          <T k="map.legend.routes" />
        </li>
      </ul>
    </div>
  )
}
