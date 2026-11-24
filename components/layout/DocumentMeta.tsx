'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageMeta, TITLE_SUFFIX } from '@/content/i18n/en'
import { useI18n } from '@/lib/i18n/I18nProvider'

/**
 * O <title> e a meta description vêm do servidor (sempre em inglês). Este
 * componente acompanha o idioma e a rota: troca os dois no cliente e os
 * reaplica caso o Next os reescreva numa navegação. Não renderiza nada.
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
      // outra (em inglês) ao lado dela, deixando duas meta descriptions no
      // <head>. Fica só a última (a mais recente) e as demais são removidas.
      const descriptions = Array.from(document.head.querySelectorAll('meta[name="description"]'))
      const description = descriptions[descriptions.length - 1]
      descriptions.slice(0, -1).forEach((duplicate) => duplicate.remove())
      if (description && description.getAttribute('content') !== meta.description) {
        description.setAttribute('content', meta.description)
      }
    }

    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['content'] })
    return () => observer.disconnect()
  }, [content, pathname])

  return null
}
