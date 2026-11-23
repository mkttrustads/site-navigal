'use client'

import type { ComponentProps, ReactNode } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'

/**
 * Para Server Components (como o mapa de rotas, que gera o SVG no servidor):
 * `<T k="map.place.UAE" />` renderiza o texto de interface no idioma atual.
 */
export function T({ k, params }: { k: UiKey; params?: Record<string, string | number> }) {
  const { t } = useI18n()
  return <>{t(k, params)}</>
}

/** <svg role="img"> com aria-label traduzido; o conteúdo continua vindo do servidor. */
export function LocalizedSvg({
  labelKey,
  children,
  ...props
}: { labelKey: UiKey; children: ReactNode } & Omit<ComponentProps<'svg'>, 'aria-label' | 'role'>) {
  const { t } = useI18n()
  return (
    <svg role="img" aria-label={t(labelKey)} {...props}>
      {children}
    </svg>
  )
}
