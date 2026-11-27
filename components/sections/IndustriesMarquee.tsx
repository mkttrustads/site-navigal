'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useI18n } from '@/lib/i18n/I18nProvider'

const ARROW_CLASS =
  'flex h-10 w-10 items-center justify-center rounded-card border border-preto/15 text-preto transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto'

/** Velocidade da faixa em px/s: lenta e constante (~1 card a cada 6 s). */
const AUTO_SPEED = 40
/** Tempo (ms) para a faixa recuperar a velocidade depois de uma pausa (sem reiniciar do zero). */
const RESUME_MS = 450
/** Distância (px) a partir da qual um toque/arrasto deixa de ser clique no card. */
const DRAG_SLOP = 6

/**
 * Setores da Home em faixa contínua (marquee infinito), de ponta a ponta da tela.
 *
 * Os mesmos cards do antigo grid/carrossel (cores, borda, ícone, tipografia, contagem de produtos, hover e
 * link para `/products?industry=`), todos com a mesma largura e altura.
 *
 * Como funciona:
 * - A lista é repetida `copies` vezes dentro de uma faixa que só se move por `transform` (sem `scrollLeft`, então
 *   não há rolagem horizontal na página nem saltos de arredondamento). O deslocamento `pos` vive num ref e é
 *   normalizado em [0, largura de uma lista): ao passar do fim, volta o valor de uma lista inteira, o que é
 *   visualmente idêntico (loop sem emenda).
 * - Um único laço `requestAnimationFrame` avança `pos` com base no tempo real (`dt`), então a velocidade não
 *   depende do refresh do monitor. Pausa imediata com o mouse em cima (ou foco dentro); ao sair, a velocidade
 *   volta em ~450 ms a partir de onde parou.
 * - Setas: animam `pos` até um alvo com ease exponencial (instantâneo com `prefers-reduced-motion`).
 * - Toque/arrasto: pointer events no sentido horizontal (`touch-action: pan-y` preserva a rolagem vertical da
 *   página), com inércia ao soltar. O clique que encerra um arrasto é cancelado para não abrir o card.
 * - `prefers-reduced-motion`: sem movimento automático; setas e arrasto continuam funcionando.
 * - Acessibilidade: só a 1ª cópia é lida e focável; as demais são `aria-hidden` e fora da ordem de tabulação.
 */
export function IndustriesMarquee() {
  const {
    t,
    content: { industries, productsForIndustry },
  } = useI18n()

  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstSetRef = useRef<HTMLUListElement>(null)
  const [copies, setCopies] = useState(3)

  const motion = useRef({
    pos: 0,
    setWidth: 0,
    step: 0,
    target: null as number | null,
    velocity: 0, // px/ms, inércia depois do arrasto
    speedFactor: 1, // 0 = parado, 1 = velocidade cheia
    hover: false,
    focus: false,
    dragging: false,
    reduced: false,
  })
  const drag = useRef({ id: -1, startX: 0, lastX: 0, lastT: 0, moved: false, velocity: 0 })

  const render = useCallback(() => {
    const m = motion.current
    if (m.setWidth > 0) {
      const wrapped = ((m.pos % m.setWidth) + m.setWidth) % m.setWidth
      // O alvo de uma animação das setas acompanha o salto de uma lista inteira (a distância restante não muda).
      if (m.target !== null) m.target += wrapped - m.pos
      m.pos = wrapped
    }
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-m.pos}px,0,0)`
  }, [])

  // Medidas: largura de uma lista, passo das setas e quantas cópias cobrem a tela (monitores largos).
  useEffect(() => {
    const viewport = viewportRef.current
    const firstSet = firstSetRef.current
    if (!viewport || !firstSet) return
    const m = motion.current
    const measure = () => {
      m.setWidth = firstSet.offsetWidth
      const first = firstSet.children[0] as HTMLElement | undefined
      const second = firstSet.children[1] as HTMLElement | undefined
      const pitch = first && second ? second.offsetLeft - first.offsetLeft : first?.offsetWidth ?? 0
      const visible = pitch ? viewport.clientWidth / pitch : 1
      m.step = pitch * Math.max(1, Math.floor(visible / 2))
      if (m.setWidth > 0) setCopies(Math.max(2, Math.ceil(viewport.clientWidth / m.setWidth) + 1))
      render()
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(firstSet)
    return () => observer.disconnect()
  }, [render, industries.length])

  // Preferência de movimento reduzido (reage a mudanças em tempo real).
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      motion.current.reduced = query.matches
    }
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  // Laço de animação único.
  useEffect(() => {
    const m = motion.current
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) // limita saltos após aba em segundo plano
      last = now
      if (!m.dragging) {
        if (m.target !== null) {
          const diff = m.target - m.pos
          if (m.reduced || Math.abs(diff) < 0.5) {
            m.pos = m.target
            m.target = null
          } else {
            m.pos += diff * (1 - Math.exp(-dt / 120))
          }
        } else if (Math.abs(m.velocity) > 0.02) {
          m.pos += m.velocity * dt
          m.velocity *= Math.exp(-dt / 320)
        } else {
          m.velocity = 0
          const paused = m.hover || m.focus || m.reduced
          m.speedFactor = paused ? 0 : Math.min(1, m.speedFactor + dt / RESUME_MS)
          m.pos += (AUTO_SPEED / 1000) * m.speedFactor * dt
        }
      }
      render()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [render])

  function nudge(direction: 1 | -1) {
    const m = motion.current
    m.velocity = 0
    m.speedFactor = 0
    m.target = (m.target ?? m.pos) + direction * (m.step || 240)
  }

  function onPointerEnter(event: ReactPointerEvent) {
    // Só o mouse "pousa" sobre o carrossel; o toque não deve deixar a faixa presa em pausa.
    if (event.pointerType === 'mouse') motion.current.hover = true
  }

  function onPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType === 'mouse') motion.current.hover = false
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const m = motion.current
    const d = drag.current
    d.id = event.pointerId
    d.startX = d.lastX = event.clientX
    d.lastT = performance.now()
    d.moved = false
    d.velocity = 0
    m.velocity = 0
    m.target = null
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current
    const m = motion.current
    if (d.id !== event.pointerId) return
    if (!d.moved) {
      if (Math.abs(event.clientX - d.startX) < DRAG_SLOP) return
      d.moved = true
      m.dragging = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const now = performance.now()
    const dx = event.clientX - d.lastX
    const dt = Math.max(1, now - d.lastT)
    m.pos -= dx
    d.velocity = d.velocity * 0.6 + (-dx / dt) * 0.4
    d.lastX = event.clientX
    d.lastT = now
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current
    const m = motion.current
    if (d.id !== event.pointerId) return
    d.id = -1
    if (!m.dragging) return
    m.dragging = false
    // Se o dedo parou antes de soltar, não há inércia.
    const idle = performance.now() - d.lastT
    m.velocity = idle > 80 || m.reduced ? 0 : Math.max(-3, Math.min(3, d.velocity))
    m.speedFactor = 0
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <section aria-roledescription="carousel" aria-label={t('home.industries.carouselLabel')}>
      <Reveal>
        <RevealItem>
          <div
            ref={viewportRef}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onFocusCapture={() => {
              motion.current.focus = true
            }}
            onBlurCapture={() => {
              motion.current.focus = false
            }}
            // Cancela o clique que encerra um arrasto (senão o card sob o dedo/mouse seria aberto).
            onClickCapture={(event) => {
              if (drag.current.moved) {
                event.preventDefault()
                event.stopPropagation()
                drag.current.moved = false
              }
            }}
            onDragStart={(event) => event.preventDefault()}
            // `py-1.5`: folga para o contorno de foco não ser cortado pelo overflow. `touch-pan-y`: o gesto
            // horizontal é do carrossel, o vertical continua rolando a página.
            className="w-full touch-pan-y select-none overflow-hidden py-1.5"
          >
            <div ref={trackRef} className="flex w-max will-change-transform">
              {Array.from({ length: copies }, (_, copy) => (
                <ul
                  key={copy}
                  ref={copy === 0 ? firstSetRef : undefined}
                  aria-hidden={copy > 0 ? true : undefined}
                  // `--gap` também vira o padding final de cada lista: a largura de uma cópia é exatamente
                  // n × (card + gap), o que torna a emenda do loop invisível.
                  className="flex shrink-0 gap-3 pr-3 [--gap:0.75rem] xl:gap-4 xl:pr-4"
                >
                  {industries.map((industry, index) => (
                    <li
                      key={industry.slug}
                      role={copy === 0 ? 'group' : undefined}
                      aria-roledescription={copy === 0 ? 'slide' : undefined}
                      aria-label={
                        copy === 0
                          ? t('home.industries.slideLabel', { current: index + 1, total: industries.length })
                          : undefined
                      }
                      className="flex w-48 shrink-0 sm:w-52 lg:w-56"
                    >
                      <Link
                        href={`/products?industry=${industry.slug}`}
                        draggable={false}
                        tabIndex={copy === 0 ? undefined : -1}
                        className="group flex h-full min-h-[11rem] w-full flex-col gap-6 rounded-card border border-linha bg-white p-6 transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto lg:min-h-[12rem] lg:p-4 xl:p-5"
                      >
                        <div className="flex items-start justify-between">
                          <Icon name={industry.icon} className="h-8 w-8 text-cobalto transition-colors group-hover:text-white" />
                          <ArrowUpRight aria-hidden="true" className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <h3 className="flex-1 text-balance text-lg leading-snug lg:text-base xl:text-lg">{industry.name}</h3>
                          <p className="mt-2 text-sm text-suave transition-colors group-hover:text-white/80">
                            {t('common.productCount', { count: productsForIndustry(industry.slug).length })}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </RevealItem>
      </Reveal>

      {/* Link centralizado abaixo dos cards; setas à direita. No mobile as setas vêm primeiro e o link abaixo. */}
      <div className="mx-auto mt-5 flex w-full max-w-site flex-col gap-5 px-6 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
        <div className="flex items-center justify-end gap-2 sm:col-start-3 sm:row-start-1">
          <button type="button" onClick={() => nudge(-1)} aria-label={t('home.industries.prev')} className={ARROW_CLASS}>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label={t('home.industries.next')} className={ARROW_CLASS}>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center sm:col-start-2 sm:row-start-1">
          <Button href="/products" variant="link" arrow>
            {t('home.industries.link')}
          </Button>
        </div>
      </div>
    </section>
  )
}
