import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'className' | 'children'> & {
  children: ReactNode
  tone?: 'light' | 'muted' | 'dark' | 'brand'
  className?: string
  id?: string
  background?: ReactNode
  /** Classes extras do contêiner interno (largura/padding do conteúdo). */
  containerClassName?: string
}

const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  light: 'bg-white text-preto',
  muted: 'bg-off-white text-preto',
  dark: 'bg-preto text-white',
  // Azul institucional da Navigal (cobalto) como fundo sólido.
  brand: 'bg-cobalto text-white',
}

/** Mesmo ritmo vertical do site Trust Group, com container um pouco mais largo. */
export default function Section({ children, tone = 'light', className, id, background, containerClassName, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn('relative overflow-hidden py-20 sm:py-28', toneClasses[tone], className)} {...rest}>
      {background}
      <div className={cn('relative z-10 mx-auto max-w-site px-6', containerClassName)}>{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark' | 'brand'
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', tone = 'light', className }: SectionHeadingProps) {
  const dark = tone === 'dark'
  const brand = tone === 'brand'
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-4',
            // Sobre o fundo azul o cobalto-claro não contrasta (~2,6:1): label em branco.
            brand ? 'text-white' : dark ? 'text-cobalto-claro' : 'text-cobalto'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-[clamp(2rem,3.4vw,3rem)]">{title}</h2>
      {intro && (
        <div
          className={cn(
            'mt-5 text-pretty text-lg leading-relaxed',
            brand ? 'text-white/90' : dark ? 'text-white/75' : 'text-suave'
          )}
        >
          {intro}
        </div>
      )}
    </div>
  )
}
