'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'
import Section, { SectionHeading } from '@/components/ui/Section'
import { NETWORK_STEPS, ORIGIN_NAMES, STEP_BAND, STORY_MOBILE_QUERY, STORY_STATIC_QUERY, STORY_STICKY_QUERY } from '@/lib/network-story'

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
 * Seção "Rede Global" inteira: o mapa guiado por scroll é o fundo dela (≥1024px). Uma única variável, `activeStep`
 * (0 = inicial, 1–3 = passo na faixa de leitura), vira o atributo `data-step`;
 * todo o visual do mapa deriva dele em CSS (bloco "Rede Global" de globals.css).
 *
 * O texto dos passos é HTML real (`<ol>`), renderizado no servidor; o mapa
 * (`map`, gerado no servidor) é decorativo e não carrega informação exclusiva.
 */
export default function NetworkStory({ map }: { map: ReactNode }) {
  const { t } = useI18n()
  const rootRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const [observedStep, setObservedStep] = useState(0)
  const [headHeight, setHeadHeight] = useState<number | null>(null)
  const isMobile = useMediaQuery(STORY_MOBILE_QUERY)
  const isStatic = useMediaQuery(STORY_STATIC_QUERY)
  const isSticky = useMediaQuery(STORY_STICKY_QUERY)
  // Sem espaço para o mapa fixo (celular deitado): mapa estático no estado final.
  const activeStep = isStatic ? NETWORK_STEPS.length : observedStep

  // Comprimento das rotas, medido uma vez: alimenta o traçado (stroke-dashoffset).
  useEffect(() => {
    rootRef.current?.querySelectorAll<SVGGeometryElement>('[data-draw]').forEach((path) => {
      path.style.setProperty('--len', String(Math.ceil(path.getTotalLength())))
    })
  }, [])

  // Altura real do cabeçalho (label + título + subtítulo): varia com idioma e largura. Alimenta o CSS do
  // cabeçalho fixo (--ns-head-h): liberação sincronizada com o mapa e folga final dos passos.
  useEffect(() => {
    const head = headRef.current
    if (!head || !isSticky) return
    const measure = () => setHeadHeight(Math.ceil(head.getBoundingClientRect().height))
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(head)
    return () => resizeObserver.disconnect()
  }, [isSticky])

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
    <Section
      tone="muted"
      // overflow-clip (não hidden): o mapa fixo (sticky) não funciona dentro de um contêiner de rolagem.
      // `network-story` + `data-step` ficam na seção inteira, porque o mapa (fundo) é descendente dela.
      className="network-story overflow-clip [container-type:inline-size]"
      containerClassName="lg:pointer-events-none"
      data-step={activeStep}
      style={headHeight !== null && isSticky ? ({ '--ns-head-h': `${headHeight}px` } as CSSProperties) : undefined}
    >
      {/* "Palco" do mapa-fundo: título + passos. A frase de destaque fica abaixo dele, já sem mapa por trás. */}
      <div className="ns-stage relative">
        <div ref={headRef} className="ns-head lg:pointer-events-auto">
          <SectionHeading
            eyebrow={t('home.network.eyebrow')}
            title={t('home.network.title')}
            intro={<p className="font-semibold text-cobalto">{t('home.network.subtitle')}</p>}
          />
        </div>
        <div ref={rootRef} className="ns-grid mt-6 grid">
          <ol className="ns-steps lg:pointer-events-auto lg:relative lg:z-10 lg:max-w-[25rem]">
            {NETWORK_STEPS.map((step, index) => (
              <li
                key={step}
                data-step-index={index}
                data-active={activeStep === index + 1}
                className="group flex items-center gap-5 py-8 max-lg:min-h-[36vh] lg:min-h-[52vh] md:gap-5 xl:gap-7"
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
                  <p className="mt-2 text-base leading-relaxed group-data-[active=true]:text-suave">{t(`home.network.${step}.text` as UiKey)}</p>
                  {index === 0 && (
                    <p className="mt-3 text-sm leading-relaxed tracking-wide">{ORIGIN_NAMES.map((name) => t(`map.place.${name}` as UiKey)).join(' · ')}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {/*
            Mapa. <1024px: vem primeiro e fica fixo no topo (~40vh), com os passos rolando por baixo.
            ≥1024px: `.ns-bg` cobre o palco, em toda a largura da seção (fundo), e o mapa fica fixo (sticky) à direita,
            centralizado na viewport; `.ns-fade` (decorativo, sem eventos) suaviza o mapa sob o texto com a cor do fundo.
          */}
          <div className="ns-bg">
            <div className="ns-sticky">{map}</div>
            <div aria-hidden="true" className="ns-fade" />
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-balance text-2xl font-semibold leading-snug text-preto md:mt-10 md:text-3xl">{t('home.network.highlight')}</p>
    </Section>
  )
}
