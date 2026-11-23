'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import GlobeMark from '@/components/ui/GlobeMark'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'

/**
 * Mesmo comportamento do cabeçalho do site Trust Group: transparente com
 * gradiente sobre o hero e sólido (preto corporativo) depois de rolar.
 */
export default function Header() {
  const pathname = usePathname()
  const {
    t,
    content: { primaryNav, quoteCta },
  } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const solid = scrolled || mobileOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-preto/95 py-3 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-preto/80 to-transparent py-6'
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-card focus:bg-cobalto focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('a11y.skipToContent')}
      </a>

      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-6">
        {/* Só a esfera, como o monograma no cabeçalho do site Trust Group; a
            logo completa fica na Hero da Home. Vetor, para ficar nítido no
            tamanho pequeno, com a faixa de destaque em Azul Marítimo. */}
        <Link href="/" className="shrink-0" aria-label={t('header.homeLabel')}>
          <GlobeMark tone="dark" className="h-[2.4rem] w-auto sm:h-[2.8rem]" />
        </Link>

        <nav aria-label={t('a11y.mainNav')} className="hidden items-center gap-7 xl:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative whitespace-nowrap text-[0.95rem] font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-cobalto after:transition-all',
                  active ? 'text-white after:w-full' : 'text-white/80 after:w-0 hover:text-white hover:after:w-full'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <LanguageSwitcher />
          <Button href={quoteCta.href} className="px-5 py-2.5 text-sm">
            {quoteCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          aria-expanded={mobileOpen}
          className="text-white xl:hidden"
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-3 max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-preto px-6 pb-8 pt-2 xl:hidden">
          <nav aria-label={t('a11y.mainNav')} className="flex flex-col">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/10 py-4 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher touch className="mt-4 -ml-2" />
          <Button href={quoteCta.href} className="mt-4 w-full">
            {quoteCta.label}
          </Button>
        </div>
      )}
    </header>
  )
}
