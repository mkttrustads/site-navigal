# Site Navigal

Novo site da Navigal Trading Solutions Limited. Mesmo stack e estrutura do site Trust Group
(Next.js 14, Tailwind, Framer Motion), com a identidade do Brand Persona da Navigal:
Azul Marítimo `#2B5EA7` como única cor de destaque sobre preto `#0D0D0D` e off-white `#F7F9F8`,
Figtree em todo o site com títulos em negrito, textos em inglês.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, quem somos, soluções, setores, mapa de rotas, públicos, Trust Group, CTA |
| `/about` | História, missão, princípios, valores, presença global |
| `/solutions` | 6 soluções, processo em 5 etapas, gestão de risco |
| `/products` | Portfólio Winner Mix com filtro por setor, busca e fichas técnicas |
| `/industries` | 10 setores com os produtos de cada um |
| `/suppliers` | Proposta para fornecedores internacionais e formulário de cadastro |
| `/contact` | Formulários de cotação e de fornecedor, contatos |

Conteúdo editável fica em `content/` (textos, produtos, setores, números).

## Rodar

```
npm install
npm run dev
```

Formulários enviam por Resend: configurar `RESEND_API_KEY` no ambiente (Vercel). Sem a chave,
o envio falha com mensagem e o link de e-mail como alternativa.

## Pendências para validar com o Marketing

- **Idioma:** só inglês, como pede o Brand Persona. PT/ES aparecem no cabeçalho como "em breve".
- **Telefones:** +1 646 915 1713 (site antigo) e +55 11 93312 5318 (Navigal.pptx). Quais seguem ativos?
- **Escritórios:** EAU, Panamá, Miami e Brasil. Miami vem do site Trust Group; o Brand Persona cita Dubai e Panamá.
- **Números:** "25,000+ contêineres no último ano" sem data-base; números do Trust Group copiados de `content/facts.ts` do site Trust Group.
- **Fichas técnicas corrigidas** em relação ao Book de serviços (ver comentário no topo de `content/products.ts`):
  ácido acético (vinha com dados do ácido cítrico), creatina (fórmula), TDI 80/20 (CAS) e poliacrilamida (fórmula).
- **Lista de produtos:** baseada na lista atual do site Trust Group + fichas do Book. Itens antigos das
  apresentações (MAP, DAP, HF, acetato de vinila, lactonas, têxtil etc.) ficaram de fora.
- **Fotos:** vindas das apresentações e do site Trust Group. Faltam imagens próprias para alguns setores
  (automotivo, tratamento de água, cosméticos).
- **Política de privacidade e LinkedIn:** não encontrados nos materiais; rodapé ainda sem esses links.
