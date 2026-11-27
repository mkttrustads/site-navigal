import type { CSSProperties, ReactNode } from 'react'

// Bandeiras circulares das origens do mapa da Home, em SVG próprio (sem CDN nem imagem extra: zero requisições,
// nítidas em qualquer densidade de tela). Desenhadas num quadrado 24×24 e recortadas em círculo pelo CSS
// (`.ns-flag`), então os detalhes ficam longe das bordas. Simplificadas de propósito: o marcador é pequeno
// (14–20px), emblemas minúsculos só virariam ruído.

export type FlagCountry = 'China' | 'Taiwan' | 'Vietnam' | 'Malaysia' | 'Oman' | 'Turkey' | 'Italy'

/** Polígono de estrela com `points` pontas; `angle` em graus (0 = ponta à direita, -90 = para cima). */
function star(cx: number, cy: number, outer: number, inner: number, points: number, angle = -90) {
  const step = Math.PI / points
  const start = (angle * Math.PI) / 180
  return Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outer : inner
    const theta = start + i * step
    return `${(cx + radius * Math.cos(theta)).toFixed(2)},${(cy + radius * Math.sin(theta)).toFixed(2)}`
  }).join(' ')
}

const STAR5 = 0.382 // razão raio interno/externo da estrela de 5 pontas

function chinaFlag() {
  const big = { x: 7.2, y: 8.2 }
  // Estrelas menores com uma ponta voltada para a grande, como na bandeira.
  const small = [
    { x: 13.6, y: 3.8 },
    { x: 15.8, y: 6.6 },
    { x: 15.8, y: 10 },
    { x: 13.6, y: 12.8 },
  ]
  return (
    <>
      <rect width="24" height="24" fill="#DE2910" />
      <polygon points={star(big.x, big.y, 4.2, 4.2 * STAR5, 5)} fill="#FFDE00" />
      {small.map(({ x, y }) => (
        <polygon key={`${x}-${y}`} points={star(x, y, 1.3, 1.3 * STAR5, 5, (Math.atan2(big.y - y, big.x - x) * 180) / Math.PI)} fill="#FFDE00" />
      ))}
    </>
  )
}

function taiwanFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#FE0000" />
      <rect width="13" height="13" fill="#000095" />
      <polygon points={star(6.5, 6.5, 3.7, 2.8, 12)} fill="#FFFFFF" />
      <circle cx="6.5" cy="6.5" r="2.1" fill="#000095" />
      <circle cx="6.5" cy="6.5" r="1.6" fill="#FFFFFF" />
    </>
  )
}

function vietnamFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#DA251D" />
      <polygon points={star(12, 12.7, 6.4, 6.4 * STAR5, 5)} fill="#FFE000" />
    </>
  )
}

function malaysiaFlag() {
  const stripe = 24 / 7
  return (
    <>
      <rect width="24" height="24" fill="#FFFFFF" />
      {[0, 2, 4, 6].map((i) => (
        <rect key={i} y={i * stripe} width="24" height={stripe} fill="#D80027" />
      ))}
      <rect width="14" height={stripe * 4} fill="#0052B4" />
      <circle cx="6.1" cy="6.9" r="3.9" fill="#FFDA44" />
      <circle cx="7.3" cy="6.9" r="3.3" fill="#0052B4" />
      <polygon points={star(9.7, 6.9, 2.3, 1.3, 14)} fill="#FFDA44" />
    </>
  )
}

function omanFlag() {
  return (
    <>
      <rect width="24" height="8" fill="#F3F3F3" />
      <rect y="8" width="24" height="8" fill="#D80027" />
      <rect y="16" width="24" height="8" fill="#5FA03C" />
      <rect width="8.5" height="24" fill="#D80027" />
      {/* Emblema reduzido ao essencial: duas lâminas cruzadas sobre um escudo. */}
      <path d="M2 2.2 L6.4 6.6 M6.4 2.2 L2 6.6" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="4.2" cy="4.4" r="1.3" fill="#D80027" stroke="#FFFFFF" strokeWidth="0.7" />
    </>
  )
}

function turkeyFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#D80027" />
      <circle cx="10.4" cy="12" r="6.3" fill="#FFFFFF" />
      <circle cx="12.2" cy="12" r="5.1" fill="#D80027" />
      <polygon points={star(15.6, 12, 3.1, 3.1 * STAR5, 5, 180)} fill="#FFFFFF" />
    </>
  )
}

function italyFlag() {
  return (
    <>
      <rect width="8" height="24" fill="#009246" />
      <rect x="8" width="8" height="24" fill="#FFFFFF" />
      <rect x="16" width="8" height="24" fill="#CE2B37" />
    </>
  )
}

const flags: Record<FlagCountry, () => ReactNode> = {
  China: chinaFlag,
  Taiwan: taiwanFlag,
  Vietnam: vietnamFlag,
  Malaysia: malaysiaFlag,
  Oman: omanFlag,
  Turkey: turkeyFlag,
  Italy: italyFlag,
}

export function hasFlag(name: string): name is FlagCountry {
  return name in flags
}

/** Bandeira circular decorativa: o nome do país vem sempre em texto ao lado (rótulo ou lista do passo 1). */
export default function Flag({ country, className, style }: { country: FlagCountry; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} style={style}>
      {flags[country]()}
    </svg>
  )
}
