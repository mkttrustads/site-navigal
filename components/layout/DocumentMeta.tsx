'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageMeta, TITLE_SUFFIX } from '@/content/i18n/en'
import { useI18n } from '@/lib/i18n/I18nProvider'

// Todas as tags que carregam a descrição da página (SEO, Open Graph e Twitter).
const DESCRIPTION_SELECTORS = ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']

/**
 * O <title> e as descrições (meta, og:description e twitter:description) vêm do
 * servidor (sempre em inglês). Este componente acompanha o idioma e a rota:
 * troca tudo no cliente e reaplica caso o Next reescreva as tags numa
 * navegação. Não renderiza nada.
 */
export default function DocumentMeta() {
  const pathname = usePathname()
  const { content } = useI18n()

  useEffect(() => {
    const known = content.pageMeta[pathname as keyof typeof content.pageMeta]
    // Rota sem metadados próprios (a 404) mostra o título padrão do site; só o
    // traduzimos enquanto o Next ainda estiver com esse padrão.
    const fallback = !known
    const meta = known ?? content.pageMeta['/']
    const title = pathname === '/' || fallback ? meta.title : `${meta.title}${TITLE_SUFFIX}`
    const isSiteDefault = (value: string) => value === pageMeta['/'].title || value === title

    function apply() {
      if (fallback && !isSiteDefault(document.title)) return
      if (document.title !== title) document.title = title
      // Ao trocar o conteúdo de uma tag que o React gerencia, ele pode inserir
      // outra (em inglês) ao lado dela, deixando a descrição duplicada no
      // <head>. Em cada tag de descrição fica só a última (a mais recente), as
      // demais são removidas.
      for (const selector of DESCRIPTION_SELECTORS) {
        const tags = Array.from(document.head.querySelectorAll(selector))
        const tag = tags[tags.length - 1]
        tags.slice(0, -1).forEach((duplicate) => duplicate.remove())
        if (tag && tag.getAttribute('content') !== meta.description) {
          tag.setAttribute('content', meta.description)
        }
      }
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['content'] })
    return () => observer.disconnect()
  }, [content, pathname])

  return null
}
