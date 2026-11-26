'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// useLayoutEffect avisa no SSR; no servidor usamos useEffect (o efeito só roda no cliente de qualquer forma).
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Número que conta de 0 até `to` quando entra na área visível (uma vez só).
 *
 * - O HTML do servidor e o estado inicial já trazem o valor FINAL: sem JavaScript, com
 *   `prefers-reduced-motion` ou em leitores de tela o número correto está sempre na página.
 * - No cliente, antes da primeira pintura o texto volta a 0 e só então espera o gatilho de
 *   visibilidade (useLayoutEffect evita o "piscar" do valor final).
 * - Só o miolo numérico é animado; `prefix`/`suffix` (ex.: "US$ " e "M+") ficam fixos, então a
 *   largura quase não muda e a troca de idioma não reinicia a contagem (nada depende do idioma).
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 'some' })
  const [value, setValue] = useState(to)
  const [armed, setArmed] = useState(false)

  // Arma a animação (zera o contador) antes da primeira pintura, exceto com movimento reduzido.
  useIsoLayoutEffect(() => {
    if (reduce) return
    setValue(0)
    setArmed(true)
  }, [reduce])

  useEffect(() => {
    if (!armed || !inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.33, 1, 0.68, 1], // ease-out cúbico: desacelera no fim sem concentrar a contagem no início
      onUpdate: (latest) => setValue(Math.round(latest)),
      onComplete: () => setValue(to),
    })
    return () => controls.stop()
  }, [armed, inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {/* Leitores de tela recebem o valor final, não os passos intermediários da contagem. */}
      <span className="sr-only">{`${prefix}${to}${suffix}`}</span>
      <span aria-hidden="true">{`${prefix}${value}${suffix}`}</span>
    </span>
  )
}
