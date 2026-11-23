// Mantém o leitor "no mesmo lugar" quando o idioma muda. Os textos em PT/ES têm
// outro comprimento, então a altura da página muda; sem isso o conteúdo que o
// visitante estava lendo sai da tela (o Safari, por exemplo, não faz o
// scroll anchoring nativo). Captura um elemento visível antes da troca e,
// depois da renderização, compensa o deslocamento dele.

export type ScrollAnchor = { el: Element; top: number }

/** Elemento "folha" sob a linha de leitura (um pouco abaixo do cabeçalho fixo). */
export function captureScrollAnchor(): ScrollAnchor | null {
  if (typeof window === 'undefined' || window.scrollY < 1) return null
  const y = Math.min(160, window.innerHeight / 3)
  let best: Element | null = null
  let bestArea = Infinity
  for (const fraction of [0.25, 0.5, 0.75]) {
    const el = document.elementFromPoint(window.innerWidth * fraction, y)
    if (!el || el.closest('header') || el === document.body || el === document.documentElement) continue
    const rect = el.getBoundingClientRect()
    const area = rect.width * rect.height
    if (area < bestArea) {
      best = el
      bestArea = area
    }
  }
  return best ? { el: best, top: best.getBoundingClientRect().top } : null
}

export function restoreScrollAnchor(anchor: ScrollAnchor) {
  if (!anchor.el.isConnected) return
  const delta = anchor.el.getBoundingClientRect().top - anchor.top
  if (Math.abs(delta) > 1) window.scrollBy({ top: delta, left: 0, behavior: 'instant' })
}
