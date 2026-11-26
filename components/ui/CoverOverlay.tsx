/**
 * Overlay azul-escuro (#071A33) das capas do site — fonte única do tratamento visual.
 *
 * Reproduz a capa da Home: véu uniforme leve + gradiente na base (título, subtítulo e faixa de
 * descrição/CTAs) + gradiente lateral no canto do texto. O topo e o miolo ficam quase limpos para
 * preservar a foto. Use dentro de uma `<section className="relative isolate">`, logo após a imagem
 * e antes do conteúdo. Para ajustar tons ou opacidades em todas as capas, altere só este arquivo.
 */
export default function CoverOverlay() {
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
