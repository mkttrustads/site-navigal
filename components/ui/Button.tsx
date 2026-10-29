import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type BaseProps = {
  children: ReactNode
  /** primary: cobalto sólido (CTA). outline: borda na cor do texto, para foto ou fundo escuro. dark: preto corporativo. */
  variant?: 'primary' | 'outline' | 'dark' | 'link'
  arrow?: boolean
  className?: string
}

type ButtonAsLink = BaseProps & { href: string; onClick?: never }
type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonProps = ButtonAsLink | ButtonAsButton

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'bg-cobalto text-white hover:bg-cobalto-escuro',
  outline: 'border border-current bg-transparent hover:bg-white/10',
  dark: 'bg-preto text-white hover:bg-cobalto',
  link: '!px-0 !py-0 text-cobalto underline-offset-4 hover:underline',
}

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-card px-7 py-3.5 font-body text-base font-semibold transition-colors duration-200'

export default function Button({ children, variant = 'primary', arrow, className, href, ...rest }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className)
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  )

  if (href) {
    const isExternal = /^https?:\/\//.test(href)
    return (
      <Link href={href} className={classes} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
