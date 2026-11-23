// Configuração única de idiomas. Usada pelo provider, pelo seletor do cabeçalho
// e pelo script inline do layout (que restaura o idioma antes da hidratação).

export const locales = ['en', 'pt', 'es'] as const
export type Locale = (typeof locales)[number]

/** Idioma de quem nunca escolheu nenhum (e do HTML renderizado no servidor). */
export const defaultLocale: Locale = 'en'

/** Chave da preferência salva no `localStorage`. */
export const STORAGE_KEY = 'navigal-locale'

/** Atributo no <html> enquanto o idioma salvo ainda não foi aplicado (evita o "flash" em inglês). */
export const PENDING_ATTR = 'data-i18n-pending'

/** Valor do atributo `lang` do <html> para cada idioma. */
export const htmlLang: Record<Locale, string> = { en: 'en', pt: 'pt-BR', es: 'es' }

/** `short` é o que aparece no seletor; `name` é o nome do idioma no próprio idioma. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: 'EN', name: 'English' },
  pt: { short: 'PT', name: 'Português (Brasil)' },
  es: { short: 'ES', name: 'Español' },
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/**
 * Script inline (roda antes da hidratação). Se há idioma salvo diferente do
 * padrão, ajusta o `lang` e esconde a página até o provider aplicar o idioma,
 * para o visitante não ver o inglês piscando. Um timeout garante que a página
 * nunca fique escondida se o JavaScript falhar.
 */
export const bootScript = `(function(){try{var l=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var m=${JSON.stringify(
  htmlLang
)};if(l&&l!==${JSON.stringify(defaultLocale)}&&m[l]){var d=document.documentElement;d.lang=m[l];d.setAttribute(${JSON.stringify(
  PENDING_ATTR
)},"");setTimeout(function(){d.removeAttribute(${JSON.stringify(PENDING_ATTR)})},3000)}}catch(e){}})()`
