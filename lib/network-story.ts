// Constantes compartilhadas entre o mapa (Server Component, gera o SVG) e o
// NetworkStory (Client Component, controla o passo ativo). Sem dependências:
// pode ser importado dos dois lados sem levar `dotted-map` para o bundle do cliente.

/** Origens de suprimento, na ordem em que acendem no passo 1 (nomes = ids de `map.place.*`). */
export const ORIGIN_NAMES = ['China', 'Taiwan', 'Vietnam', 'Malaysia', 'Oman', 'Turkey', 'Italy'] as const

/** Passos da seção (chaves `home.network.<step>.*`). `activeStep` 0 = nenhum passo na faixa ativa. */
export const NETWORK_STEPS = ['step1', 'step2', 'step3'] as const

/**
 * Faixa de leitura (margens do root do IntersectionObserver): desktop = faixa central da viewport;
 * mobile/tablet = faixa abaixo do mapa fixo (~40vh + cabeçalho).
 */
export const STEP_BAND = { desktop: { top: '-40%', bottom: '-40%' }, mobile: { top: '-58%', bottom: '-25%' } } as const

/**
 * Abaixo de 1024px (celular e tablet) o mapa vem acima dos passos, fixo no topo; a partir daí ele é o fundo
 * da seção, com os passos à esquerda (ver bloco "Rede Global" de globals.css: mantenha os dois em sincronia).
 */
export const STORY_MOBILE_QUERY = '(max-width: 1023px)'
/** Tela baixa (celular deitado): o mapa fixo ocuparia a tela toda, então vira estático no estado final. */
export const STORY_STATIC_QUERY = '(max-width: 1023px) and (max-height: 520px)'

/**
 * Cabeçalho da seção (label, título, subtítulo) fixo durante os passos: só em notebooks/monitores, e com altura de
 * tela suficiente para o cabeçalho + um passo caberem juntos. Abaixo disso (tablet, celular, janela baixa) a rolagem
 * é natural. Mantenha em sincronia com o bloco "Cabeçalho fixo" de globals.css.
 */
export const STORY_STICKY_QUERY = '(min-width: 1024px) and (min-height: 700px)'
