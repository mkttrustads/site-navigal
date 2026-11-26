// Constantes compartilhadas entre o mapa (Server Component, gera o SVG) e o
// NetworkStory (Client Component, controla o passo ativo). Sem dependências:
// pode ser importado dos dois lados sem levar `dotted-map` para o bundle do cliente.

/** Origens de suprimento, na ordem em que acendem no passo 1 (nomes = ids de `map.place.*`). */
export const ORIGIN_NAMES = ['China', 'Taiwan', 'Vietnam', 'Malaysia', 'Oman', 'Turkey', 'Italy'] as const

/** Passos da seção (chaves `home.network.<step>.*`). `activeStep` 0 = nenhum passo na faixa ativa. */
export const NETWORK_STEPS = ['step1', 'step2', 'step3'] as const

/**
 * Faixa de leitura (margens do root do IntersectionObserver): desktop = faixa central da viewport;
 * mobile = faixa abaixo do mapa fixo (~40vh + cabeçalho).
 */
export const STEP_BAND = { desktop: { top: '-40%', bottom: '-40%' }, mobile: { top: '-58%', bottom: '-25%' } } as const

/** Mobile baixo (celular deitado): o mapa fixo ocuparia a tela toda, então vira estático no estado final. */
export const STORY_STATIC_QUERY = '(max-width: 767px) and (max-height: 520px)'
export const STORY_MOBILE_QUERY = '(max-width: 767px)'
