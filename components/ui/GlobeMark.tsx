import { GLOBE_BANDS, GLOBE_VIEWBOX } from '@/lib/globeBands'
import { cn } from '@/lib/utils'

/**
 * As faixas do globo do logo como grafismo de fundo (marca d'água), conforme
 * o Brand Persona. `tone` define a cor das faixas neutras; a faixa de
 * destaque sai sempre em Azul Marítimo.
 */
export default function GlobeMark({ className, tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <svg
      viewBox={`0 0 ${GLOBE_VIEWBOX.width} ${GLOBE_VIEWBOX.height}`}
      aria-hidden="true"
      focusable="false"
      className={cn('pointer-events-none select-none', className)}
    >
      {GLOBE_BANDS.map((band, index) => (
        <path key={index} d={band.d} fill={band.accent ? '#2B5EA7' : tone === 'dark' ? '#FFFFFF' : '#0D0D0D'} />
      ))}
    </svg>
  )
}
