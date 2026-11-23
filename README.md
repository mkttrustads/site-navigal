# Site Navigal

Novo site da Navigal Trading Solutions Limited. Mesmo stack e estrutura do site Trust Group
(Next.js 14, Tailwind, Framer Motion), com a identidade do Brand Persona da Navigal:
Azul Marítimo `#2B5EA7` como única cor de destaque sobre preto `#0D0D0D` e off-white `#F7F9F8`,
Figtree em todo o site com títulos em negrito, textos em inglês.

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

Conteúdo editável fica em `content/` (textos, produtos, setores, números, credibilidade). O site é só em inglês; as traduções PT-BR/ES dos textos do alinhamento à apresentação v4 estão em `docs/alinhamento-v4.md`.

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
- **Números:** alinhados à apresentação para fornecedores v4 (ver `docs/alinhamento-v4.md`); "14M+ investido em tecnologia" não publicado (moeda indefinida).
- **Fichas técnicas corrigidas** em relação ao Book de serviços (ver comentário no topo de `content/products.ts`):
  ácido acético (vinha com dados do ácido cítrico), creatina (fórmula), TDI 80/20 (CAS) e poliacrilamida (fórmula).
- **Lista de produtos:** baseada na lista atual do site Trust Group + fichas do Book. MSG, Potassium Sorbate, TiO₂ e HF entraram com a v4. Itens antigos das
  apresentações (MAP, DAP, acetato de vinila, lactonas, têxtil etc.) ficaram de fora.
- **Fotos:** vindas das apresentações e do site Trust Group. Faltam imagens próprias para alguns setores
  (automotivo, tratamento de água, cosméticos).
- **Política de privacidade e LinkedIn:** não encontrados nos materiais; rodapé ainda sem esses links.
