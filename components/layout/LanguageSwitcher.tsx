'use client'

import { Fragment } from 'react'
import { localeLabels, locales, htmlLang } from '@/lib/i18n/config'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'

/**
 * Seletor EN / PT / ES do cabeçalho. Mesmo visual de antes (idioma ativo em
 * branco, os outros esmaecidos, separados por "/"); agora cada idioma é um
 * botão que troca o idioma no lugar, sem navegar. `touch` aumenta a área de
 * toque no menu mobile.
 */
export default function LanguageSwitcher({ touch = false, className }: { touch?: boolean; className?: string }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div role="group" aria-label={t('a11y.language')} className={cn('flex items-center gap-1 text-sm font-semibold', className)}>
      {locales.map((code, index) => {
        const active = code === locale
        const { short, name } = localeLabels[code]
        return (
          <Fragment key={code}>
            {index > 0 && (
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
            )}
            <button
              type="button"
              lang={htmlLang[code]}
              onClick={() => setLocale(code)}
              aria-pressed={active}
              aria-label={`${short} · ${name}`}
              title={name}
              className={cn(
                'relative transition-colors after:absolute after:content-[""]',
                // Área de toque maior sem mexer no espaçamento visual.
                touch ? 'px-2 py-2.5 after:-inset-1' : 'after:-inset-x-1 after:-inset-y-2',
                active ? 'text-white' : 'text-white/45 hover:text-white'
              )}
            >
              {short}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
