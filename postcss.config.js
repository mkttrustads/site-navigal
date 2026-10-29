const path = require('path')

// Config explícita: o servidor de preview roda a partir da pasta Projetos, e
// sem o caminho absoluto o Tailwind procuraria a config no diretório errado.
module.exports = {
  plugins: {
    tailwindcss: { config: path.join(__dirname, 'tailwind.config.ts') },
    autoprefixer: {},
  },
}
