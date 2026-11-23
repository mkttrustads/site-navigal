# Site Navigal

Novo site da Navigal Trading Solutions Limited. Mesmo stack e estrutura do site Trust Group
(Next.js 14, Tailwind, Framer Motion), com a identidade do Brand Persona da Navigal:
Azul Marítimo `#2B5EA7` como única cor de destaque sobre preto `#0D0D0D` e off-white `#F7F9F8`,
Figtree em todo o site com títulos em negrito. Site em EN (padrão), PT-BR e ES.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, história ("Born from the chemical industry"), soluções, setores, mapa de rotas, públicos, Trust Group, CTA |
| `/about` | História e linha do tempo, missão, princípios, valores, presença global, Trust Group, compromisso, certificações |
| `/solutions` | 6 soluções, processo em 5 etapas, gestão de risco |
| `/products` | Portfólio de produtos com filtro por setor, busca e fichas técnicas |
| `/industries` | 11 setores (incl. Ceramic Coating) com os produtos de cada um |
| `/suppliers` | Proposta para fornecedores internacionais, logística Taglog, certificações e formulário de cadastro |
| `/contact` | Formulários de cotação e de fornecedor, contatos |

Conteúdo editável fica em `content/` (textos, produtos, setores, números, credibilidade).

## Idiomas (EN / PT-BR / ES)

Seletor no cabeçalho (desktop e menu mobile). A troca é feita no cliente, sem recarregar nem mudar de URL; a escolha fica em `localStorage` (`navigal-locale`) e visitante sem preferência vê inglês.

| O quê | Onde |
| --- | --- |
| Textos-fonte em inglês | `content/*.ts` (conteúdo) e `content/i18n/en.ts` (textos de interface e metadados de página) |
| Traduções | `content/i18n/pt.ts` e `content/i18n/es.ts` (tipadas por `content/i18n/types.ts`: faltou chave, o `tsc` quebra) |
| Provider, hook `useI18n()`, seletor | `lib/i18n/`, `components/layout/LanguageSwitcher.tsx` |
| Conferência | `npm run check:i18n` (estrutura, slugs, textos iguais ao inglês) |

Para **editar um texto**: altere o EN na fonte e as duas traduções. Para **adicionar produto/setor/solução**: crie no `content/*.ts` e inclua a tradução em `pt.ts` e `es.ts` (o `check:i18n` avisa se esquecer). Marcas, siglas regulatórias, CAS, NCM e fórmulas não se traduzem. Os valores dos selects dos formulários seguem em inglês no envio, para o e-mail ao comercial manter o formato.

Limitação conhecida: o HTML do servidor, o JSON-LD e o sitemap são em inglês (a URL é a mesma para os três idiomas); o `<title>` e a meta description são trocados no cliente. Se o SEO em PT/ES virar prioridade, o caminho é rotas por idioma (`/pt`, `/es`), o que muda URLs e não faz parte desta correção.

## Rodar

```
npm install
npm run dev
```

Formulários enviam por Resend: configurar `RESEND_API_KEY` no ambiente (Vercel). Sem a chave,
o envio falha com mensagem e o link de e-mail como alternativa.

## Pendências para validar com o Marketing

- **Idioma:** PT-BR e ES foram adicionados (o Brand Persona pedia só inglês). As traduções não passaram por revisão nativa: validar com o Marketing, em especial slogan, notas regulatórias e termos técnicos.
- **Telefone:** número único +55 (47) 98844-9269, igual em EN/PT/ES.
- **Escritórios:** EAU, Panamá, Miami e Brasil. Miami vem do site Trust Group; o Brand Persona cita Dubai e Panamá.
- **Números:** alinhados à apresentação para fornecedores v4 (ver `docs/alinhamento-v4.md`); "14M+ investido em tecnologia" não publicado (moeda indefinida).
- **Fichas técnicas corrigidas** em relação ao Book de serviços (ver comentário no topo de `content/products.ts`):
  ácido acético (vinha com dados do ácido cítrico), creatina (fórmula), TDI 80/20 (CAS) e poliacrilamida (fórmula).
- **Lista de produtos:** baseada na lista atual do site Trust Group + fichas do Book. MSG, Potassium Sorbate, TiO₂ e HF entraram com a v4. Itens antigos das
  apresentações (MAP, DAP, acetato de vinila, lactonas, têxtil etc.) ficaram de fora.
- **Fotos:** vindas das apresentações e do site Trust Group. Faltam imagens próprias para alguns setores
  (automotivo, tratamento de água, cosméticos).
- **Política de privacidade e LinkedIn:** não encontrados nos materiais; rodapé ainda sem esses links.
