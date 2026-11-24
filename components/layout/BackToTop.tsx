'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'

/** Rolagem (px) a partir da qual o botão aparece. */
const SHOW_AFTER = 300

/**
 * Botão flutuante "voltar ao topo", no canto inferior esquerdo. Fica no layout
 * global, então vale para todas as páginas e idiomas (o rótulo vem de
 * `a11y.backToTop`). Aparece depois de ~300px de rolagem e some ao voltar ao
 * topo, com fade + leve deslocamento. Escondido, fica `invisible`: sai da ordem
 * de tabulação e do leitor de tela. Com movimento reduzido, não anima e a
 * rolagem é imediata.
 */
export default function BackToTop() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('a11y.backToTop')}
      title={t('a11y.backToTop')}
      className={cn(
        // z-40: abaixo do cabeçalho (z-50) e do menu mobile; respeita a área segura de iPhones.
        'fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-[max(1.5rem,env(safe-area-inset-left))]',
        'flex h-11 w-11 items-center justify-center rounded-full bg-cobalto text-white shadow-lg ring-1 ring-white/25',
        'transition-[opacity,transform,visibility,background-color] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:bg-cobalto-escuro active:translate-y-0',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0 motion-reduce:translate-y-0'
      )}
    >
      <ArrowUp aria-hidden="true" strokeWidth={2} className="h-5 w-5" />
    </button>
  )
}
