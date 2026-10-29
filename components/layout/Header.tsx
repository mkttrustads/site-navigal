'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { primaryNav, quoteCta } from '@/content/site'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Mesmo comportamento do cabeçalho do site Trust Group: transparente com
 * gradiente sobre o hero e sólido (preto corporativo) depois de rolar.
 */
export default function Header() {
  const pathname = usePathname()
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
        Skip to content
      </a>

      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-6">
        <Link href="/" className="shrink-0" aria-label="Navigal home">
          <Image
            src="/brand/navigal-logo-white.png"
            alt="Navigal Trading Solutions Limited"
            width={809}
            height={520}
            priority
            className={cn('w-auto transition-all duration-300', solid ? 'h-11' : 'h-14')}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
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
          {/* Versões em português e espanhol ainda não publicadas. */}
          <div className="flex items-center gap-1 text-sm font-semibold" aria-label="Language">
            <span className="text-white" aria-current="true">
              EN
            </span>
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            <span className="cursor-not-allowed text-white/45" title="Coming soon">
              PT
            </span>
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            <span className="cursor-not-allowed text-white/45" title="Coming soon">
              ES
            </span>
          </div>
          <Button href={quoteCta.href} className="px-5 py-2.5 text-sm">
            {quoteCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="text-white xl:hidden"
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-3 max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-preto px-6 pb-8 pt-2 xl:hidden">
          <nav aria-label="Main" className="flex flex-col">
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
          <Button href={quoteCta.href} className="mt-6 w-full">
            {quoteCta.label}
          </Button>
        </div>
      )}
    </header>
  )
}
