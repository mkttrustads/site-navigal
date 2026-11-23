import { ui, type UiKey } from '../../content/i18n/en'
import type { Locale } from './config'
import { getTranslation } from './translations'

export type { UiKey }

/**
 * Texto de interface no idioma pedido. Se a chave faltar no PT/ES, cai no
 * inglês em vez de mostrar a chave crua. `{nome}` é substituído por `params.nome`.
 */
export function translate(locale: Locale, key: UiKey, params?: Record<string, string | number>): string {
  const raw = getTranslation(locale)?.ui[key] ?? ui[key]
  if (!params) return raw
  return raw.replace(/\{(\w+)\}/g, (match, name: string) => (name in params ? String(params[name]) : match))
}
