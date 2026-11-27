/**
 * Overlay azul-escuro (#071A33) das capas do site — fonte única do tratamento visual.
 *
 * Reproduz a capa da Home: véu uniforme leve + gradiente na base (título, subtítulo e faixa de
 * descrição/CTAs) + gradiente lateral no canto do texto. O topo e o miolo ficam quase limpos para
 * preservar a foto. Use dentro de uma `<section className="relative isolate">`, logo após a imagem
 * e antes do conteúdo. Para ajustar tons ou opacidades em todas as capas, altere só este arquivo.
 *
 * Variantes:
 * - `default` (padrão): tratamento original — usado pela Home e pelos banners de CTA (`CtaBand`).
 * - `text`: capas das páginas internas (`PageHero`). Mesmo azul (#071A33), mas com degradê horizontal
 *   ancorado no bloco de texto (breadcrumb, título e descrição) e foto mais livre no restante. As
 *   opacidades ficam em `.cover-overlay-text` (app/globals.css).
 * - `band`: banners de CTA com foto (`CtaBand`). Mesmo azul (#071A33), porém cobrindo a seção inteira:
 *   véu azul uniforme (a foto continua legível, tingida de azul) + degradê horizontal mais fechado sob
 *   o bloco de texto (esquerda), onde ficam título, parágrafo e botões.
 */
export default function CoverOverlay({ variant = 'default' }: { variant?: 'default' | 'text' | 'band' }) {
  if (variant === 'band') {
    return (
      <>
        <div aria-hidden="true" className="absolute inset-0 bg-[#071A33]/70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,51,0.3)_0%,rgba(7,26,51,0.15)_55%,rgba(7,26,51,0)_100%)] max-sm:bg-[#071A33]/20"
        />
      </>
    )
  }
  if (variant === 'text') {
    return <div aria-hidden="true" className="cover-overlay-text absolute inset-0" />
  }
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-[#071A33]/10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,26,51,0.84)_0%,rgba(7,26,51,0.6)_34%,rgba(7,26,51,0.36)_62%,rgba(7,26,51,0.1)_86%,rgba(7,26,51,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,51,0.5)_0%,rgba(7,26,51,0.2)_45%,rgba(7,26,51,0)_75%)]"
      />
    </>
  )
}
