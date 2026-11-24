'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CarouselProps = {
  /** Nome acessível do carrossel (leitores de tela). */
  label: string
  slides: ReactNode[]
  /** Textos de interface já traduzidos. */
  labels: {
    prev: string
    next: string
    slide: (current: number, total: number) => string
    goTo: (n: number) => string
  }
  className?: string
}

const SWIPE_THRESHOLD = 48

/**
 * Carrossel de conteúdo, controlado pelo usuário (sem autoplay).
 *
 * - Todos os slides ocupam a mesma célula de um grid: a altura do bloco é a do
 *   maior slide e não muda ao navegar (não "pula" o layout da página).
 * - Slides inativos ficam `inert` e `aria-hidden`: não recebem foco nem são lidos.
 * - Teclado: ← → (e Home/End) com o foco dentro do carrossel. Setas e indicadores
 *   são botões reais. Toque: arrastar na horizontal troca de slide.
 * - A transição é só opacity/transform e some com `prefers-reduced-motion`.
 */
export default function Carousel({ label, slides, labels, className }: CarouselProps) {
  const total = slides.length
  const [index, setIndex] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const goTo = (next: number) => setIndex(((next % total) + total) % total)

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    // Não rouba as setas de campos de texto, caso um slide venha a ter um.
    if ((event.target as HTMLElement).closest('input, textarea, select')) return
    if (event.key === 'ArrowRight') goTo(index + 1)
    else if (event.key === 'ArrowLeft') goTo(index - 1)
    else if (event.key === 'Home') goTo(0)
    else if (event.key === 'End') goTo(total - 1)
    else return
    event.preventDefault()
  }

  function onTouchStart(event: TouchEvent) {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(index + (dx < 0 ? 1 : -1))
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('flex flex-col', className)}
    >
      <div
        className="grid"
        aria-live="polite"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={labels.slide(i + 1, total)}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                'col-start-1 row-start-1 transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none',
                active
                  ? 'visible translate-x-0 opacity-100'
                  : cn('invisible opacity-0 motion-reduce:translate-x-0', i < index ? '-translate-x-4' : 'translate-x-4')
              )}
            >
              {slide}
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-preto/10 pt-5">
        <div className="flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={labels.goTo(i + 1)}
              aria-current={i === index ? 'true' : undefined}
              className="group flex h-8 w-6 items-center justify-center rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none',
                  i === index ? 'w-6 bg-cobalto' : 'w-1.5 bg-preto/25 group-hover:bg-preto/50'
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={labels.prev}
            className="flex h-10 w-10 items-center justify-center rounded-card border border-preto/15 text-preto transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={labels.next}
            className="flex h-10 w-10 items-center justify-center rounded-card border border-preto/15 text-preto transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
