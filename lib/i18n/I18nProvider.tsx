'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { defaultLocale, htmlLang, isLocale, PENDING_ATTR, STORAGE_KEY, type Locale } from './config'
import { localizeContent, type LocalizedContent } from './localize'
import { captureScrollAnchor, restoreScrollAnchor, type ScrollAnchor } from './scroll-anchor'
import { translate, type UiKey } from './translate'

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Texto de interface (content/i18n/en.ts) no idioma atual. */
  t: (key: UiKey, params?: Record<string, string | number>) => string
  /** Conteúdo do site (content/*.ts) já no idioma atual, com o mesmo formato do original. */
  content: LocalizedContent
}

const I18nContext = createContext<I18nValue | null>(null)

// useLayoutEffect avisa no servidor; lá não há nada para sincronizar.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function readSavedLocale(): Locale | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return isLocale(saved) ? saved : null
  } catch {
    // localStorage pode estar bloqueado (aba anônima, política do navegador).
    return null
  }
}

/**
 * Guarda o idioma da página inteira. Fica no layout, então sobrevive à
 * navegação entre páginas (nenhum redirecionamento nem recarga): trocar de
 * idioma só re-renderiza os textos no lugar. O HTML do servidor é sempre em
 * inglês; o idioma salvo é aplicado logo após a hidratação, antes da pintura
 * (o script inline do layout esconde a página nesse intervalo).
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const initialized = useRef(false)
  const anchor = useRef<ScrollAnchor | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const saved = readSavedLocale()
      if (saved && saved !== locale) {
        // Aplica o idioma salvo e deixa para a próxima passada (locale mudou) liberar a página.
        setLocaleState(saved)
        return
      }
    }
    const root = document.documentElement
    root.lang = htmlLang[locale]
    root.removeAttribute(PENDING_ATTR)
    if (anchor.current) {
      restoreScrollAnchor(anchor.current)
      anchor.current = null
    }
  }, [locale])

  // Mantém várias abas sincronizadas.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return
      setLocaleState(isLocale(event.newValue) ? event.newValue : defaultLocale)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return
    anchor.current = captureScrollAnchor()
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem persistência, o idioma continua valendo até a próxima recarga.
    }
    setLocaleState(next)
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
      content: localizeContent(locale),
    }),
    [locale, setLocale]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n precisa estar dentro de <I18nProvider> (app/layout.tsx).')
  return value
}
