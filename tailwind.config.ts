import type { Config } from 'tailwindcss'

// Paleta do Brand Persona da Navigal: o Azul Marítimo é a única cor de
// destaque sobre o preto corporativo e o off-white. Os tons `cobalto-*`
// derivados existem só para estados (hover) e para texto sobre fundo preto,
// onde o cobalto puro não passa de ~2,9:1 de contraste.
const config: Config = {
  // Caminho absoluto (com barras normais, exigidas pelo glob no Windows): o
  // preview roda a partir da pasta Projetos, não da raiz deste projeto.
  content: ['app', 'components'].map((dir) => `${__dirname.replace(/\\/g, '/')}/${dir}/**/*.{ts,tsx}`),
  theme: {
    extend: {
      colors: {
        cobalto: {
          DEFAULT: '#2B5EA7', // CTAs, sinalizadores de dados, indicadores
          escuro: '#214B87', // hover de botão
          claro: '#8FB0E0', // texto de destaque sobre preto (~8:1)
        },
        preto: '#0D0D0D', // fundos escuros, textos, linhas-guia
        grafite: '#16181C', // segundo tom escuro, para alternar blocos
        'off-white': '#F7F9F8', // fundos de leitura alternados
        linha: '#E2E6EA', // bordas e divisórias sobre fundo claro
        suave: '#4B5058', // texto de apoio sobre branco (~8:1)
      },
      fontFamily: {
        body: ['var(--font-figtree)', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        // "Cantos levemente arredondados ou cortes retos e robustos"
        card: '6px',
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
}

export default config
