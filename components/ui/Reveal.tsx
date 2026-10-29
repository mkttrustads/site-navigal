'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { revealOnView, revealUp, staggerContainer, staticReveal } from '@/lib/motion-variants'

/** Container que revela os filhos `RevealItem` em sequência ao entrar na tela. */
export function Reveal({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div {...revealOnView} variants={staggerContainer(stagger)} className={className}>
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div variants={reduce ? staticReveal : revealUp} className={className}>
      {children}
    </motion.div>
  )
}
