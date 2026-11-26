import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Bandeiras simplificadas em SVG inline (proporção 3:2): sem dependência nem
// requisição extra, nítidas em qualquer tamanho. Usadas no mapa da Home.

export type FlagCode = 'IT' | 'TR' | 'CN' | 'TW' | 'VN' | 'MY' | 'OM' | 'BR' | 'AE' | 'US'

/** Estrela de 5 pontas centrada em (cx, cy), com raio externo r. */
function star(cx: number, cy: number, r: number, fill: string, rotate = 0) {
  const inner = r * 0.382
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : inner
    const angle = (Math.PI / 5) * i - Math.PI / 2 + (rotate * Math.PI) / 180
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
  })
  return <polygon points={points.join(' ')} fill={fill} />
}

const stripes = (colors: string[], height: number, width = 30) =>
  colors.map((fill, i) => <rect key={i} x={0} y={i * height} width={width} height={height} fill={fill} />)

const art: Record<FlagCode, ReactNode> = {
  IT: (
    <>
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </>
  ),
  TR: (
    <>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="5.2" fill="#FFFFFF" />
      <circle cx="12.5" cy="10" r="4.2" fill="#E30A17" />
      {star(17.2, 10, 2.4, '#FFFFFF', 18)}
    </>
  ),
  CN: (
    <>
      <rect width="30" height="20" fill="#DE2910" />
      {star(6, 6, 3.6, '#FFDE00')}
      {star(12, 2.6, 1.1, '#FFDE00', 20)}
      {star(14.2, 5, 1.1, '#FFDE00', 40)}
      {star(14.2, 8, 1.1, '#FFDE00', 20)}
      {star(12, 10.4, 1.1, '#FFDE00')}
    </>
  ),
  TW: (
    <>
      <rect width="30" height="20" fill="#FE0000" />
      <rect width="15" height="10" fill="#000095" />
      <circle cx="7.5" cy="5" r="3.2" fill="#FFFFFF" />
      <circle cx="7.5" cy="5" r="2.5" fill="#000095" />
      <circle cx="7.5" cy="5" r="1.9" fill="#FFFFFF" />
    </>
  ),
  VN: (
    <>
      <rect width="30" height="20" fill="#DA251D" />
      {star(15, 10.6, 6.2, '#FFFF00')}
    </>
  ),
  MY: (
    <>
      {stripes(['#CC0001', '#FFFFFF', '#CC0001', '#FFFFFF', '#CC0001', '#FFFFFF', '#CC0001'], 20 / 7)}
      <rect width="15" height="11.4" fill="#010066" />
      <circle cx="5.6" cy="5.7" r="3.4" fill="#FFCC00" />
      <circle cx="6.7" cy="5.7" r="2.8" fill="#010066" />
      {star(10.4, 5.7, 2.4, '#FFCC00')}
    </>
  ),
  OM: (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect y="6.67" width="30" height="6.67" fill="#DB161B" />
      <rect y="13.33" width="30" height="6.67" fill="#008000" />
      <rect width="8" height="20" fill="#DB161B" />
    </>
  ),
  BR: (
    <>
      <rect width="30" height="20" fill="#009B3A" />
      <polygon points="15,2 27.5,10 15,18 2.5,10" fill="#FEDF00" />
      <circle cx="15" cy="10" r="4.6" fill="#002776" />
      <path d="M10.7 9.2 Q15 7.6 19.3 11" stroke="#FFFFFF" strokeWidth="0.9" fill="none" />
    </>
  ),
  AE: (
    <>
      <rect width="30" height="6.67" fill="#00732F" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.33" width="30" height="6.67" fill="#000000" />
      <rect width="8" height="20" fill="#FF0000" />
    </>
  ),
  US: (
    <>
      {stripes(['#B22234', '#FFFFFF', '#B22234', '#FFFFFF', '#B22234', '#FFFFFF', '#B22234'], 20 / 7)}
      <rect width="13" height="11.4" fill="#3C3B6E" />
      {[2.6, 6.5, 10.4].flatMap((x) => [2.4, 5.7, 9].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" fill="#FFFFFF" />))}
    </>
  ),
}

/** Bandeira decorativa: o nome do país vem sempre ao lado, em texto. */
export default function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 30 20"
      className={cn('block shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(13,13,13,0.18)]', className)}
    >
      {art[code]}
    </svg>
  )
}
