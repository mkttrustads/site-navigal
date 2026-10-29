import type { Variants } from 'framer-motion'

// Variants compartilhados entre as páginas de serviço, para não reimplementar
// o mesmo stagger/fade em cada seção. Curva própria (não `ease`/`linear`) e
// só `opacity`/`transform` — nunca `width`/`height`/`top`/`left`, que forçam
// reflow e não são baratas de animar.
const EASE = [0.22, 1, 0.36, 1] as const

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/**
 * Props prontas para `motion.div` em uma seção que revela com stagger ao
 * entrar na viewport. `once: true` — a seção não re-anima ao rolar de volta.
 */
export const revealOnView = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  // `amount: 'some'` (não uma fração): com 25% exigido, uma grade alta empilhada no
  // mobile nunca chegava a 25% visível e ficava
  // invisível. A margem negativa só adia o gatilho até o bloco entrar de fato.
  viewport: { once: true, amount: 'some' as const, margin: '0px 0px -80px 0px' },
}

/**
 * `prefers-reduced-motion`: mantém a variant, mas com transição instantânea e
 * sem deslocamento — o elemento aparece, não desliza. Usar como
 * `shouldReduceMotion ? staticReveal : revealUp`.
 */
export const staticReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}
