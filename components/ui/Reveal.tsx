'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { revealUp, revealViewport, staggerContainer, staticReveal } from '@/lib/motion-variants'

/**
 * Container que revela os filhos `RevealItem` em sequência ao entrar na tela.
 *
 * O estado "revelado" é DERIVADO de um booleano (`inView`) e passado como `animate`,
 * em vez de depender do `whileInView` do framer-motion. Motivo: com `whileInView`, a
 * propagação do rótulo `visible` para os filhos só acontece no instante em que o
 * container entra na tela. Um `RevealItem` que monta DEPOIS disso (por exemplo, quando
 * a lista é re-renderizada na troca de idioma, ou chega por dados assíncronos) nascia
 * em `hidden` (opacity 0) e nunca recebia o `visible`: o card sumia. Com `animate`
 * controlado, todo filho que monta herda o rótulo atual do pai e anima até ele.
 */
export function Reveal({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, revealViewport)
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer(stagger)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Filho de `Reveal`. Use sempre uma `key` ESTÁVEL (id do item, nunca o texto traduzido):
 * trocar o idioma então só atualiza o texto no lugar, sem remontar nem reanimar o card.
 */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div variants={reduce ? staticReveal : revealUp} className={className}>
      {children}
    </motion.div>
  )
}
