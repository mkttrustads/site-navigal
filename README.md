# Site Navigal

Novo site da Navigal Trading Solutions Limited. Mesmo stack e estrutura do site Trust Group
(Next.js 16, Tailwind, Framer Motion), com a identidade do Brand Persona da Navigal:
Azul Marítimo `#2B5EA7` como única cor de destaque sobre preto `#0D0D0D` e off-white `#F7F9F8`,
Figtree em todo o site com títulos em negrito. Site em EN (padrão), PT-BR e ES.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, história ("Born from the chemical industry"), soluções, setores, mapa de rotas, públicos, Trust Group, CTA |
| `/about` | História e linha do tempo, missão, princípios, valores, presença global, Trust Group, compromisso, certificações |
| `/solutions` | 6 soluções, processo em 5 etapas, gestão de risco |
| `/products` | Portfólio de produtos com seletor dos 11 setores (incl. Ceramic Coating), busca e fichas técnicas. `/industries` redireciona para cá (308 permanente) |
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
| Conferência | `npm run check:i18n` (roda no `prebuild` e no CI) |
| Teste de navegador | `npm run test:e2e:i18n` (Playwright; ver abaixo) |

### Como as traduções se encaixam (leia antes de editar)

- **A estrutura vem do inglês; a tradução só traz texto.** Quais cards existem, a ordem, ícones, imagens, selos e links ficam em `content/*.ts` e valem para os três idiomas. `pt.ts`/`es.ts` nunca criam nem removem itens.
- **Todo item de lista tem um `id` estável** (`certifications`, `commitment`, `solutions`, `milestones`, `offices`, `taglog.hubs`, `lookingFor`, itens de público...). As traduções são objetos indexados por esse `id`, não arrays por posição: inserir ou reordenar um item não desloca o texto dos outros. O `id` também é a `key` do React.
- **Nunca use texto traduzido (nem o índice) como `key`** em lista renderizada com `RevealItem`. O check acusa isso.
- **Fallback seguro:** texto ausente ou vazio cai, campo a campo, no inglês (`lib/i18n/localize.ts`), então um card nunca some por tradução incompleta. Em desenvolvimento o fallback avisa no console (`[i18n] tradução ausente...`). Fallback é rede de segurança, não solução: o `check:i18n` falha se faltar qualquer id/campo.

Para **editar um texto**: altere o EN na fonte e as duas traduções. Para **adicionar um card/item**: crie no `content/*.ts` com um `id` novo (e inclua o id no tipo `...Id`); o `tsc` e o `check:i18n` apontam onde falta a tradução em `pt.ts` e `es.ts`. Para **adicionar produto/setor**: crie no `content/*.ts` e traduza em `pt.ts` e `es.ts` pelo `slug`. Marcas, siglas regulatórias, CAS, NCM e fórmulas não se traduzem. Os valores dos selects dos formulários seguem em inglês no envio, para o e-mail ao comercial manter o formato.

O `check:i18n` confere: ids do conteúdo-fonte únicos; mesmos ids e campos preenchidos em PT/ES; estrutura renderizada de PT/ES idêntica à do EN; chaves de UI e `{placeholders}`; textos iguais ao inglês; autoteste do fallback; e chaves de React instáveis nos componentes.

O **teste de navegador** (`scripts/e2e-i18n.cjs`) troca o idioma ao vivo em todas as páginas (6 pares: EN↔PT, PT↔ES, EN↔ES), em desktop e mobile, e falha se algum elemento ficar invisível, se a estrutura da página divergir de um carregamento limpo no idioma de destino ou se houver erro de JavaScript; também valida refresh e navegação entre páginas. Requer `playwright` com Chromium (não é dependência do projeto): `npm run build && npm start` e, em outro terminal, `BASE_URL=http://localhost:3000 npm run test:e2e:i18n`.

Limitação conhecida: o HTML do servidor, o JSON-LD e o sitemap são em inglês (a URL é a mesma para os três idiomas); o `<title>` e a meta description são trocados no cliente. Se o SEO em PT/ES virar prioridade, o caminho é rotas por idioma (`/pt`, `/es`), o que muda URLs e não faz parte desta correção.

## Botão flutuante "Fale conosco"

`components/layout/ContactFab.tsx` (montado em `app/layout.tsx`, ao lado do `BackToTop`): botão fixo no canto inferior direito, em todas as páginas exceto `/contact`. Abre um painel com os dois perfis; cada opção é um `<Link>` para `/contact?type=supplier#contact-form` (fornecedor) ou `/contact?type=quote#contact-form` (indústria/distribuidor). O `?type=` é o mesmo parâmetro que `ContactTabs` já lia; a âncora `#contact-form` está no cartão dos formulários em `ContactPage`. Os formulários não foram alterados. Textos em `contactFab.*` (`en.ts`/`pt.ts`/`es.ts`). Teste de navegador: `BASE_URL=http://localhost:3000 node scripts/e2e-contact-fab.cjs` (mesmos requisitos do e2e de idioma).

## Rodar

```
npm install
npm run dev
```

Requer Node 20.9+. Lint: `npm run lint` (ESLint direto; o `next lint` foi removido no Next 16).

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
