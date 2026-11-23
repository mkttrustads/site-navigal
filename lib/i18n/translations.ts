import type { Locale } from './config'
import type { Translation } from '../../content/i18n/types'
import { pt } from '../../content/i18n/pt'
import { es } from '../../content/i18n/es'

/** Inglês é o idioma-fonte (content/*.ts + content/i18n/en.ts), por isso não tem entrada aqui. */
export const translations: Record<Exclude<Locale, 'en'>, Translation> = { pt, es }

export function getTranslation(locale: Locale): Translation | undefined {
  return locale === 'en' ? undefined : translations[locale]
}
