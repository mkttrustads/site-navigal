'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'
import { NETWORK_STEPS, ORIGIN_NAMES, STEP_BAND, STORY_MOBILE_QUERY, STORY_STATIC_QUERY } from '@/lib/network-story'

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

/**
 * Rede Global como mapa guiado por scroll. Uma única variável, `activeStep`
 * (0 = inicial, 1–3 = passo na faixa de leitura), vira o atributo `data-step`;
 * todo o visual do mapa deriva dele em CSS (bloco "Rede Global" de globals.css).
 *
 * O texto dos passos é HTML real (`<ol>`), renderizado no servidor; o mapa
 * (`map`, gerado no servidor) é decorativo e não carrega informação exclusiva.
 */
export default function NetworkStory({ map }: { map: ReactNode }) {
  const { t } = useI18n()
  const rootRef = useRef<HTMLDivElement>(null)
  const [observedStep, setObservedStep] = useState(0)
  const isMobile = useMediaQuery(STORY_MOBILE_QUERY)
  const isStatic = useMediaQuery(STORY_STATIC_QUERY)
  // Sem espaço para o mapa fixo (celular deitado): mapa estático no estado final.
  const activeStep = isStatic ? NETWORK_STEPS.length : observedStep

  // Comprimento das rotas, medido uma vez: alimenta o traçado (stroke-dashoffset).
  useEffect(() => {
    rootRef.current?.querySelectorAll<SVGGeometryElement>('[data-draw]').forEach((path) => {
      path.style.setProperty('--len', String(Math.ceil(path.getTotalLength())))
    })
  }, [])

  // Passo ativo = o que ocupa a faixa de leitura (rootMargin), sem listener de scroll.
  // Um 2º observer, sobre o 1º passo, diz se a lista já começou (o passo 1 está acima da base da faixa):
  // isso resolve saltos (tecla End, âncora, recarga rolada), em que nenhum passo chega a cruzar a faixa.
  useEffect(() => {
    const root = rootRef.current
    if (!root || isStatic) return
    const steps = root.querySelectorAll('[data-step-index]')
    const band = isMobile ? STEP_BAND.mobile : STEP_BAND.desktop
    const inBand = new Set<number>()
    let started = false
    const update = () => setObservedStep(inBand.size ? Math.max(...inBand) + 1 : started ? NETWORK_STEPS.length : 0)

    const bandObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.stepIndex)
          if (entry.isIntersecting) inBand.add(index)
          else inBand.delete(index)
        }
        update()
      },
      { rootMargin: `${band.top} 0px ${band.bottom} 0px` }
    )
    const startObserver = new IntersectionObserver(
      ([entry]) => {
        started = entry.isIntersecting
        update()
      },
      // Região: do topo (muito acima) até a base da faixa.
      { rootMargin: `100000px 0px ${band.bottom} 0px` }
    )
    steps.forEach((step) => bandObserver.observe(step))
    startObserver.observe(steps[0])
    return () => {
      bandObserver.disconnect()
      startObserver.disconnect()
    }
  }, [isMobile, isStatic])

  return (
    <div ref={rootRef} data-step={activeStep} className="network-story mt-6 grid gap-x-10 md:-mt-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:-mt-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.5fr)] xl:gap-x-12">
      <ol className="ns-steps md:row-start-1">
        {NETWORK_STEPS.map((step, index) => (
          <li
            key={step}
            data-step-index={index}
            data-active={activeStep === index + 1}
            className="group flex items-center gap-5 py-8 max-md:min-h-[36vh] md:min-h-[52vh] md:gap-5 xl:gap-7"
          >
            <span
              aria-hidden="true"
              className="stat-numeral w-[0.62em] shrink-0 text-[4.5rem] font-normal leading-none text-linha transition-[color,font-weight] duration-300 motion-reduce:transition-none group-data-[active=true]:font-semibold group-data-[active=true]:text-cobalto md:text-[5.5rem] xl:text-[7rem]"
            >
              {index + 1}
            </span>
            {/* Inativo: opacidade 0,6 sobre texto preto (≈5:1 no off-white), acima dos 4,5:1. */}
            <div className="min-w-0 text-preto opacity-60 transition-opacity duration-300 motion-reduce:transition-none group-data-[active=true]:opacity-100">
              <h3 className="text-2xl font-normal leading-tight transition-[font-weight] duration-300 motion-reduce:transition-none group-data-[active=true]:font-semibold md:text-3xl">
                {t(`home.network.${step}.title` as UiKey)}
              </h3>
              <p className="mt-1.5 text-base font-semibold group-data-[active=true]:text-cobalto">{t(`home.network.${step}.role` as UiKey)}</p>
              <p className="mt-2 text-base leading-relaxed group-data-[active=true]:text-suave">{t(`home.network.${step}.text` as UiKey)}</p>
              {index === 0 && (
                <p className="mt-3 text-sm leading-relaxed tracking-wide">{ORIGIN_NAMES.map((name) => t(`map.place.${name}` as UiKey)).join(' · ')}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
      {/* No mobile o mapa vem primeiro e fica fixo no topo (~40vh); no desktop, fixo na coluna da direita. */}
      <div className="ns-sticky max-md:order-first md:col-start-2 md:row-start-1">{map}</div>
    </div>
  )
}
