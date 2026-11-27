'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { UiKey } from '@/lib/i18n/translate'

/**
 * Hero da Home — "editorial industrial": tipografia grande, respiro, linhas finas como divisores.
 *
 * Ordem: eyebrow → H1 (o modelo em uma frase) → subtítulo → dois CTAs de mesmo peso (fornecedor / comprador)
 * → faixa de prova na base. Sem animação de entrada nem parallax: o texto pinta junto com a imagem (LCP) e
 * não há deslocamento de layout. Todo texto vem de `home.hero.*` (content/i18n/{en,pt,es}.ts).
 *
 * Os números da faixa NÃO são digitados aqui: vêm de `bigNumbers` (content/site.ts), a mesma fonte da
 * página About, então não divergem. Só os rótulos curtos são específicos do hero.
 */

// id em `bigNumbers` → rótulo curto do hero. A ordem aqui é a ordem na tela.
const PROOF: { id: 'ranking' | 'years' | 'warehousing' | 'people'; label: UiKey }[] = [
  { id: 'ranking', label: 'home.hero.proof.ranking' },
  { id: 'years', label: 'home.hero.proof.years' },
  { id: 'warehousing', label: 'home.hero.proof.warehousing' },
  { id: 'people', label: 'home.hero.proof.people' },
]

/*
 * TODO: habilitar após confirmação — números próprios da Navigal. NÃO publicar antes de o Marketing confirmar.
 * (Receita do grupo também fica de fora, por regra.) Para ativar: criar as chaves `home.hero.proof.shipped` e
 * `home.hero.proof.urea` em en/pt/es, somar os dois itens a PROOF (hoje só aceita ids de `bigNumbers`; estes dois
 * precisam de valor próprio) e rever a grade da faixa, que foi desenhada para 4 itens.
 *
 *   { value: '11,000 t', label: 'shipped in 2025' }                 // 11.000 t embarcadas em 2025
 *   { value: 'Top 10',   label: 'automotive urea exporter' }        // Top 10 exportador de ureia automotiva
 */

// Foco visível sobre o fundo azul-marinho: o anel padrão do site (cobalto) tem só ~2,4:1 aqui; branco passa de 12:1.
const focusRing = 'focus-visible:outline-white focus-visible:outline-offset-4'

export default function HomeHero() {
  const {
    t,
    content: { bigNumbers, rankingFootnote },
  } = useI18n()

  const proof = PROOF.flatMap(({ id, label }) => {
    const n = bigNumbers.find((b) => b.id === id)
    return n ? [{ id, value: `${n.prefix}${n.count}${n.suffix}`, label: t(label) }] : []
  })

  return (
    // 80svh de altura mínima no desktop; em celular a seção cresce com o conteúdo (CTAs empilhados + grade 2×2)
    // e o bloco principal fica acima da dobra. `isolate` mantém a imagem e o overlay atrás do texto.
    <section className="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-preto text-white lg:min-h-[80svh]">
      <Image
        src="/images/hero-port-truck.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        // Caminhão, carga (big bags) e portal ficam no centro-direita da foto (≈42–85% da largura). Em telas
        // estreitas o recorte acompanha a carga e a traseira do caminhão; de lg para cima aparece quase toda.
        className="-z-20 object-cover object-[78%_center] md:object-[72%_center] lg:object-center"
      />
      {/* Overlay azul-marinho (#071A33) local do hero: véu uniforme + degradê horizontal (texto à esquerda,
          caminhão à direita) + degradê na base sob a faixa de prova. Calibrado para texto branco ≥ 4,5:1
          (AA) em qualquer ponto sob o texto. Não usa CoverOverlay: aquele é compartilhado e mais claro no topo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#071A33]/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(7,26,51,0.72)_0%,rgba(7,26,51,0.5)_50%,rgba(7,26,51,0.12)_100%)] max-md:bg-none max-md:bg-[#071A33]/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(7,26,51,0.9)_0%,rgba(7,26,51,0.55)_28%,rgba(7,26,51,0)_55%)]"
      />

      <div className="mx-auto flex w-full max-w-site flex-1 flex-col px-6 pt-28 sm:pt-32">
        <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
          <p className="eyebrow text-white/85">{t('home.hero.eyebrow')}</p>

          <h1 className="hero-title-home mt-5 max-w-[16em] text-balance sm:mt-6">{t('home.hero.title')}</h1>

          <p className="mt-6 max-w-[66rem] text-pretty text-base leading-relaxed text-white/90 sm:mt-8 sm:text-lg">
            {t('home.hero.subtitle')}
          </p>

          {/* Mesma altura, mesma largura mínima e mesma borda: um é cheio e o outro vazado, nenhum "maior". */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button
              href="/suppliers"
              data-cta="hero-supplier"
              className={`w-full border border-cobalto sm:w-auto sm:min-w-[14rem] ${focusRing}`}
            >
              {t('home.hero.cta.supplier')}
            </Button>
            <Button
              href="/contact?type=quote#contact-form"
              variant="outline"
              data-cta="hero-import"
              className={`w-full sm:w-auto sm:min-w-[14rem] ${focusRing}`}
            >
              {t('home.hero.cta.import')}
            </Button>
          </div>
        </div>

        {/* Faixa de prova: linha fina acima, 4 números (2×2 no celular), "Backed by" à direita (abaixo no celular). */}
        <div className="border-t border-white/25 pb-10 pt-8 sm:pb-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <ul
              aria-label={t('home.hero.proof.label')}
              className="grid grid-cols-2 gap-x-6 gap-y-8 lg:flex lg:gap-x-0"
            >
              {proof.map((item) => (
                <li key={item.id} className="border-l border-white/25 pl-5 lg:pr-10">
                  <span className="block text-3xl font-semibold leading-none tracking-tight tabular-nums sm:text-4xl lg:text-[2.5rem]">
                    {item.value}
                  </span>
                  <span className="mt-3 block max-w-[13rem] text-sm leading-snug text-white/85">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 lg:items-end">
              <p className="text-sm text-white/85">{t('home.about.backedBy')}</p>
              <Image
                src="/brand/trust-group-horizontal-white.png"
                alt="Trust Group"
                width={1135}
                height={294}
                // Exibida com ~144px de largura: `sizes` evita servir/pré-carregar a versão de 1200–3840px.
                sizes="144px"
                loading="eager"
                className="h-8 w-auto self-start sm:h-9 lg:self-end"
              />
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/75">{rankingFootnote}</p>
        </div>
      </div>
    </section>
  )
}
