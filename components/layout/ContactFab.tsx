'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Factory, MessageCircle, PackageCheck, X, type LucideIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'
import type { FormType } from '@/content/forms'
import { cn } from '@/lib/utils'

/** Id do cartão de formulários em ContactPage: destino da âncora (`#contact-form`). */
export const CONTACT_FORM_ANCHOR = 'contact-form'

type Profile = { type: FormType; icon: LucideIcon; title: UiKey; description: UiKey }

/**
 * Perfil -> formulário existente. `type` é o mesmo parâmetro que ContactTabs já lê:
 * `supplier` abre o de fornecedores; `quote` (padrão) o de indústrias e distribuidores.
 */
const profiles: Profile[] = [
  { type: 'supplier', icon: PackageCheck, title: 'contactFab.supplier.title', description: 'contactFab.supplier.description' },
  { type: 'quote', icon: Factory, title: 'contactFab.industry.title', description: 'contactFab.industry.description' },
]

/**
 * Botão flutuante global "Fale conosco" (canto inferior direito) com painel de
 * seleção de perfil. Cada opção leva a /contact com o formulário certo já
 * selecionado e a página rola até ele; o idioma é o do provider (localStorage),
 * que sobrevive à navegação. Fica no layout, então vale para todas as páginas,
 * exceto /contact. O voltar ao topo continua no canto esquerdo (BackToTop).
 */
export default function ContactFab() {
  const { t } = useI18n()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstOptionRef = useRef<HTMLAnchorElement>(null)
  const panelId = useId()
  const titleId = useId()
  const onContact = pathname === '/contact' || pathname.startsWith('/contact/')

  // Fecha ao trocar de rota (o componente persiste no layout).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    // Leva o foco para a primeira opção (teclado e leitor de tela).
    firstOptionRef.current?.focus({ preventScroll: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (onContact) return null

  return (
    <div
      ref={rootRef}
      // z-40, como o BackToTop: abaixo do cabeçalho (z-50) e do menu mobile; respeita a área segura de iPhones.
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 font-body sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]"
    >
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className={cn(
          'absolute bottom-full right-0 mb-3 w-[min(22rem,calc(100vw-2rem))] origin-bottom-right overflow-y-auto rounded-2xl border border-linha bg-white p-5 shadow-[0_12px_40px_-8px_rgba(13,13,13,0.25)]',
          'max-h-[calc(100dvh-9rem)] transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none',
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-2 scale-95 opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p id={titleId} className="text-lg font-semibold leading-snug text-preto">
              {t('contactFab.title')}
            </p>
            <p className="mt-1 text-sm leading-snug text-suave">{t('contactFab.subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              triggerRef.current?.focus()
            }}
            aria-label={t('contactFab.close')}
            title={t('contactFab.close')}
            className="-mr-1.5 -mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-suave transition-colors hover:bg-off-white hover:text-preto"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-4 space-y-2.5">
          {profiles.map((profile, index) => {
            const Icon = profile.icon
            return (
              <li key={profile.type}>
                <Link
                  ref={index === 0 ? firstOptionRef : undefined}
                  href={`/contact?type=${profile.type}#${CONTACT_FORM_ANCHOR}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3.5 rounded-card border border-linha p-3.5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-cobalto hover:bg-off-white hover:shadow-sm focus-visible:border-cobalto"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cobalto/10 text-cobalto transition-colors duration-200 group-hover:bg-cobalto group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold leading-snug text-preto">{t(profile.title)}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-suave">{t(profile.description)}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-cobalto transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className={cn(
          'flex h-11 items-center gap-2 rounded-full bg-cobalto px-4 text-sm font-semibold text-white shadow-lg ring-1 ring-white/25 sm:h-12 sm:px-5 sm:text-base',
          'transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cobalto-escuro active:translate-y-0',
          'motion-reduce:transition-none motion-reduce:hover:translate-y-0'
        )}
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
        <span className="whitespace-nowrap">{t('contactFab.open')}</span>
      </button>
    </div>
  )
}
