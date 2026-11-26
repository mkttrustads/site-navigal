#!/usr/bin/env node
// Valida as traduções PT-BR e ES contra o conteúdo-fonte em inglês.
//   npm run check:i18n        (roda também no `prebuild` e no CI: .github/workflows/ci.yml)
//
// O TypeScript já garante que as chaves existem. Este script cobre o que o tipo não enxerga:
//  1. IDs estáveis: todo item de lista tem `id` único, e cada idioma traz exatamente os mesmos
//     ids (nenhum a menos, nenhum a mais), com todos os campos de texto preenchidos;
//  2. paridade de estrutura: o conteúdo RENDERIZADO (`localizeContent`) de PT e ES tem exatamente
//     a mesma forma que o de EN (mesmas listas, mesmo nº de itens, mesmos ícones/imagens/links);
//  3. prosa em ordem (endereço, parágrafos), slugs de setores/produtos, fichas técnicas, opções
//     de formulário e {placeholders} das chaves de UI;
//  4. textos traduzidos IDÊNTICOS ao inglês (esquecimento clássico), exceto marcas/siglas (KEEP);
//  5. chaves de React instáveis nos componentes (texto traduzido ou índice como `key` em lista
//     animada), que faziam cards sumirem na troca de idioma;
//  6. autoteste do fallback: uma tradução propositalmente incompleta continua gerando a mesma
//     estrutura (nada some).
// Sai com código 1 se achar algo.

process.env.NODE_ENV = 'production' // silencia os avisos de fallback do modo dev

const path = require('path')
const ts = require('typescript')
const fs = require('fs')

// Carrega .ts sem build: transpila no require e resolve imports sem extensão.
require.extensions['.ts'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  })
  module._compile(outputText, filename)
}
const root = path.resolve(__dirname, '..')
const load = (file) => require(path.join(root, file))

const { ui, pageMeta } = load('content/i18n/en.ts')
const en = {
  site: load('content/site.ts'),
  about: load('content/about.ts'),
  credibility: load('content/credibility.ts'),
  solutions: load('content/solutions.ts'),
  industries: load('content/industries.ts'),
  products: load('content/products.ts'),
  forms: load('content/forms.ts'),
}
const { localizeContent, localizeTranslation } = load('lib/i18n/localize.ts')
const translations = { pt: load('content/i18n/pt.ts').pt, es: load('content/i18n/es.ts').es }
const LOCALES = Object.keys(translations)

// Textos que DEVEM ficar iguais ao inglês (marca, empresa do grupo, sigla, norma, nome próprio, termo técnico).
const KEEP = new RegExp(
  '^(' +
    [
      'Navigal', 'Trust Group', 'Trust Tech', 'Taglog', 'Instituto Trust', 'Trust Comércio Exterior',
      'Navigal Trading Solutions Limited', 'TRADING SOLUTIONS LIMITED', 'Global Brands Management',
      'Top 35\\*', 'NCM', 'EDTA', 'DOTP, DOP, DINP', 'WhatsApp', 'Trader', 'Miami', 'China', 'Total:',
      'Error 404', 'sales@navigal-ts\\.com', 'Al Hamra Industrial Zone FZ',
      'RAKEZ Amenity Center, Al Hamra Industrial Zone FZ, Ras Al Khaimah',
      'Garuva, SC', 'Sumaré, SP', 'Cabo de Santo Agostinho, PE', 'ISO 9001', 'SASSMAQ e ISO 9001',
      'PP, PE, PVC (e|y) PET', '200 mesh', 'Brazil', 'Taiwan', 'Vietnam', 'Taglog Logística Integrada.*',
    ].join('|') +
    ')$'
)
// Campos que não são texto traduzível (dados, ids, links, números, imagens).
const SKIP_KEYS = new Set(['id', 'icon', 'slug', 'href', 'value', 'display', 'founded', 'email', 'legalName', 'ncm', 'formula', 'type', 'required', 'wide', 'image', 'badge'])
// Identificadores estruturais (não são texto exibido): slugs de setor dentro de produtos e `name` dos campos de formulário.
const SKIP_PATHS = [/^products\[\d+\]\.industries\[/, /^formFields\.\w+\[\d+\]\.name$/, /^formFields\.\w+\[\d+\]\.options\[\d+\]\.value$/]

let problems = 0
const fail = (locale, message) => {
  problems++
  console.log(`  ✗ [${locale}] ${message}`)
}

function flatten(value, prefix = '', out = {}) {
  if (typeof value === 'string') {
    if (!SKIP_PATHS.some((re) => re.test(prefix))) out[prefix] = value
  } else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${prefix}[${i}]`, out))
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === 'function' || SKIP_KEYS.has(k)) continue
      flatten(v, prefix ? `${prefix}.${k}` : k, out)
    }
  }
  return out
}

/** Compara a FORMA de duas árvores: mesmas chaves, mesmo tamanho de lista, mesmos valores nos campos não textuais. */
function diffShape(a, b, where, report, key = '') {
  if (typeof a === 'function' || typeof b === 'function') return
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return report(`${where}: um lado é lista e o outro não`)
    if (a.length !== b.length) return report(`${where}: ${a.length} item(ns) no inglês, ${b.length} aqui`)
    a.forEach((item, i) => diffShape(item, b[i], `${where}[${item && item.id ? item.id : i}]`, report, key))
    return
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return report(`${where}: objeto ausente`)
    const ka = Object.keys(a).filter((k) => typeof a[k] !== 'function')
    const kb = Object.keys(b).filter((k) => typeof b[k] !== 'function')
    for (const k of ka) if (!kb.includes(k)) report(`${where}.${k}: campo ausente`)
    for (const k of kb) if (!ka.includes(k)) report(`${where}.${k}: campo sobrando`)
    for (const k of ka) if (kb.includes(k)) diffShape(a[k], b[k], `${where}.${k}`, report, k)
    return
  }
  if (typeof a !== typeof b) return report(`${where}: tipo ${typeof a} no inglês, ${typeof b} aqui`)
  if (SKIP_KEYS.has(key) && a !== b) report(`${where}: campo estrutural "${key}" diverge ("${a}" ≠ "${b}")`)
  if (typeof b === 'string' && b.trim() === '' && typeof a === 'string' && a.trim() !== '') report(`${where}: texto vazio`)
}

// --- Listas com `id` estável: [rótulo, itens-fonte, texto traduzido por id, campos obrigatórios] ---
const idLists = (tr) => [
  ['site.nav', en.site.primaryNav, tr.site.nav, null],
  ['site.trustGroupFacts', en.site.trustGroupFacts, tr.site.trustGroupFacts, null],
  ['site.trustGroupLines.items', en.site.trustGroupLines.items, tr.site.trustGroupLines.items, ['name', 'description']],
  ['about.milestones', en.about.milestones, tr.about.milestones, ['label', 'title', 'description']],
  ['about.principles', en.about.principles, tr.about.principles, ['title', 'description']],
  ['about.values', en.about.values, tr.about.values, ['title', 'description']],
  ['about.offices', en.about.offices, tr.about.offices, ['country', 'role', 'detail']],
  ['credibility.certifications', en.credibility.certifications, tr.credibility.certifications, ['title', 'holder', 'description']],
  ['credibility.taglog.hubs', en.credibility.taglog.hubs, tr.credibility.taglog.hubs, ['site', 'area', 'pallets', 'access']],
  ['credibility.commitment', en.credibility.commitment, tr.credibility.commitment, ['title']],
  ['credibility.seals', en.credibility.commitmentSeals, tr.credibility.seals, ['alt']],
  ['solutions.solutions', en.solutions.solutions, tr.solutions.solutions, ['title', 'description']],
  ['solutions.accessoryServices', en.solutions.accessoryServices, tr.solutions.accessoryServices, null],
  ['solutions.processSteps', en.solutions.processSteps, tr.solutions.processSteps, ['title', 'description']],
  ['solutions.riskPillars', en.solutions.riskPillars, tr.solutions.riskPillars, ['title', 'description']],
  ['solutions.lookingFor', en.solutions.lookingFor, tr.solutions.lookingFor, ['title', 'description']],
  ['solutions.audiences.buyers.items', en.solutions.audiences.buyers.items, tr.solutions.audiences.buyers.items, null],
  ['solutions.audiences.suppliers.items', en.solutions.audiences.suppliers.items, tr.solutions.audiences.suppliers.items, null],
]

// --- 1. IDs do conteúdo-fonte ---
console.log('Conteúdo-fonte (EN)')
for (const [label, items] of idLists(translations.pt)) {
  const ids = items.map((item) => item.id)
  ids.forEach((id, i) => {
    if (!id || typeof id !== 'string') fail('en', `${label}[${i}]: item sem \`id\``)
  })
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dup.length) fail('en', `${label}: ids duplicados (${[...new Set(dup)].join(', ')})`)
}
for (const [label, list] of [['industries', en.industries.industries], ['products', en.products.products]]) {
  const slugs = list.map((item) => item.slug)
  const dup = slugs.filter((slug, i) => slugs.indexOf(slug) !== i)
  if (dup.length) fail('en', `${label}: slugs duplicados (${[...new Set(dup)].join(', ')})`)
}

for (const locale of LOCALES) {
  const tr = translations[locale]
  console.log(`\n${locale.toUpperCase()}`)

  // --- UI ---
  for (const key of Object.keys(ui)) if (!(key in tr.ui)) fail(locale, `ui: falta a chave "${key}"`)
  for (const key of Object.keys(tr.ui)) if (!(key in ui)) fail(locale, `ui: chave "${key}" não existe no inglês`)
  for (const [key, text] of Object.entries(tr.ui)) {
    const wanted = (ui[key] || '').match(/\{\w+\}/g) || []
    const got = text.match(/\{\w+\}/g) || []
    if (wanted.join() !== got.join()) fail(locale, `ui "${key}": placeholders ${JSON.stringify(wanted)} ≠ ${JSON.stringify(got)}`)
    if (!text.trim()) fail(locale, `ui "${key}": vazio`)
  }
  for (const route of Object.keys(pageMeta)) if (!tr.meta[route]) fail(locale, `meta: falta a rota ${route}`)
  for (const route of Object.keys(tr.meta)) if (!pageMeta[route]) fail(locale, `meta: rota "${route}" não existe`)

  // --- Listas por id ---
  for (const [label, items, text, fields] of idLists(tr)) {
    if (!text || typeof text !== 'object' || Array.isArray(text)) { fail(locale, `${label}: deve ser um objeto indexado por id`); continue }
    const sourceIds = items.map((item) => item.id)
    for (const id of sourceIds) if (!(id in text)) fail(locale, `${label}: falta o id "${id}"`)
    for (const id of Object.keys(text)) if (!sourceIds.includes(id)) fail(locale, `${label}: id "${id}" não existe no conteúdo-fonte`)
    for (const id of sourceIds) {
      const entry = text[id]
      if (entry === undefined) continue
      if (fields === null) {
        if (typeof entry !== 'string' || !entry.trim()) fail(locale, `${label}.${id}: texto vazio`)
      } else {
        for (const field of fields) if (typeof entry[field] !== 'string' || !entry[field].trim()) fail(locale, `${label}.${id}.${field}: vazio ou ausente`)
      }
    }
  }
  // Selo da certificação: o alt precisa existir quando há selo.
  for (const cert of en.credibility.certifications) {
    if (cert.badge && !tr.credibility.certifications[cert.id]?.badgeAlt) fail(locale, `credibility.certifications.${cert.id}: falta o badgeAlt (alt do selo)`)
  }

  // --- Prosa em ordem (mesma quantidade de linhas) ---
  const sameLength = (label, source, translated) => {
    if (!Array.isArray(translated) || translated.length !== source.length) fail(locale, `${label}: esperado ${source.length} linha(s), veio ${Array.isArray(translated) ? translated.length : 'nada'}`)
    else translated.forEach((line, i) => { if (!String(line).trim()) fail(locale, `${label}[${i}]: vazio`) })
  }
  sameLength('site.addressLines', en.site.company.address.lines, tr.site.addressLines)
  sameLength('about.story.paragraphs', en.about.story.paragraphs, tr.about.story.paragraphs)
  for (const item of en.credibility.commitment) sameLength(`credibility.commitment.${item.id}.paragraphs`, item.paragraphs, tr.credibility.commitment[item.id]?.paragraphs)

  // --- Slugs ---
  const { industries, products, forms } = en
  for (const { slug } of industries.industries) {
    const t = tr.industries[slug]
    if (!t) fail(locale, `industries: falta o setor "${slug}"`)
    else if (!t.name?.trim() || !t.description?.trim()) fail(locale, `industries "${slug}": nome ou descrição vazio`)
  }
  for (const slug of Object.keys(tr.industries)) if (!industries.industries.some((i) => i.slug === slug)) fail(locale, `industries: setor "${slug}" não existe`)
  for (const product of products.products) {
    const text = tr.products[product.slug]
    if (!text) { fail(locale, `products: falta o produto "${product.slug}"`); continue }
    if (!text.name?.trim()) fail(locale, `products "${product.slug}": nome vazio`)
    if (!!product.datasheet !== !!text.datasheet) fail(locale, `products "${product.slug}": ficha técnica ${product.datasheet ? 'faltando' : 'sobrando'}`)
    if (product.grade && !text.grade && /[A-Za-z]{4,}/.test(product.grade.replace(/mesh|powder|granular/g, '')) && !KEEP.test(product.grade)) {
      // grade só com números/siglas pode ficar igual; com palavras, precisa de tradução.
      if (/\b(or|and|powder|granular|cationic|anionic)\b/i.test(product.grade)) fail(locale, `products "${product.slug}": grade "${product.grade}" sem tradução`)
    }
    if (product.datasheet && text.datasheet) {
      for (const f of ['chemicalName', 'applications', 'buyers']) if (!text.datasheet[f]?.trim()) fail(locale, `products "${product.slug}": datasheet.${f} vazio`)
      if ((product.datasheet.regulatory?.length || 0) !== (text.datasheet.regulatory?.length || 0)) fail(locale, `products "${product.slug}": notas regulatórias ${product.datasheet.regulatory?.length || 0} ≠ ${text.datasheet.regulatory?.length || 0}`)
      if (product.datasheet.documents.length !== text.datasheet.documents.length) fail(locale, `products "${product.slug}": documentos ${product.datasheet.documents.length} ≠ ${text.datasheet.documents.length}`)
      if (!!product.datasheet.description !== !!text.datasheet.description) fail(locale, `products "${product.slug}": description ${product.datasheet.description ? 'faltando' : 'sobrando'}`)
      if (/[a-z]{4,}/i.test(product.datasheet.cas.replace(/^[\d-]+/, '')) && !text.datasheet.cas) fail(locale, `products "${product.slug}": CAS com texto ("${product.datasheet.cas}") sem tradução`)
    }
  }
  for (const slug of Object.keys(tr.products)) if (!products.products.some((p) => p.slug === slug)) fail(locale, `products: produto "${slug}" não existe`)

  // --- Formulários ---
  const options = new Set()
  for (const type of Object.keys(forms.formFields)) {
    for (const field of forms.formFields[type]) {
      if (!tr.forms.fields[type][field.name]?.label) fail(locale, `forms.${type}.${field.name}: falta o rótulo`)
      if (field.placeholder && !tr.forms.fields[type][field.name]?.placeholder) fail(locale, `forms.${type}.${field.name}: falta o placeholder`)
      field.options?.forEach((o) => options.add(o))
    }
  }
  for (const option of options) if (!tr.forms.options[option]) fail(locale, `forms.options: falta "${option}"`)

  // --- Estrutura renderizada idêntica à do inglês ---
  diffShape(localizeContent('en'), localizeContent(locale), 'content', (message) => fail(locale, `estrutura: ${message}`))

  // --- Textos idênticos ao inglês ---
  const base = flatten(localizeContent('en'))
  const local = flatten(localizeContent(locale))
  for (const [key, text] of Object.entries(local)) {
    if (key.startsWith('pageMeta')) continue
    if (text === base[key] && /[A-Za-z]{3,}/.test(text) && !KEEP.test(text) && !text.startsWith('/') && !/^[\d\s.,+/*%()a-zA-Z²-]*$/.test(text.replace(/[A-Za-z]{4,}/g, '#'))) {
      fail(locale, `igual ao inglês: ${key} = "${text.slice(0, 80)}"`)
    }
  }
  for (const [key, text] of Object.entries(tr.ui)) {
    if (text === ui[key] && !KEEP.test(text)) fail(locale, `ui "${key}" igual ao inglês: "${text.slice(0, 80)}"`)
  }
  for (const [route, meta] of Object.entries(tr.meta)) {
    if (meta.title === pageMeta[route].title || meta.description === pageMeta[route].description) fail(locale, `meta ${route}: igual ao inglês`)
  }
}

// --- Autoteste do fallback: tradução propositalmente quebrada não pode tirar nada da tela ---
console.log('\nFallback')
{
  const broken = JSON.parse(JSON.stringify(translations.pt))
  delete broken.credibility.certifications.aeo // item inteiro ausente
  broken.credibility.commitment.ethics.title = '' // campo vazio
  broken.credibility.commitment.ethics.paragraphs = undefined // prosa ausente
  delete broken.credibility.seals.ods // selo sem alt traduzido
  broken.about.values = {} // lista inteira vazia
  broken.about.story.paragraphs = ['só o primeiro'] // prosa incompleta
  broken.solutions.audiences.buyers.items = undefined // lista de textos ausente
  delete broken.site.nav.contact
  const content = localizeTranslation(broken)
  const reference = localizeContent('en')
  diffShape(reference, content, 'content', (message) => fail('fallback', `a tradução quebrada alterou a estrutura: ${message}`))
  const aeo = content.certifications.find((c) => c.id === 'aeo')
  if (!aeo || aeo.title !== reference.certifications[1].title || aeo.badge !== reference.certifications[1].badge) fail('fallback', 'item ausente não caiu no inglês com selo preservado')
  const ethics = content.commitment.find((c) => c.id === 'ethics')
  if (!ethics || ethics.title !== reference.commitment[0].title || ethics.paragraphs.join() !== reference.commitment[0].paragraphs.join()) fail('fallback', 'campo vazio/ausente não caiu no inglês')
  if (content.commitmentSeals.find((x) => x.id === 'ods')?.alt !== reference.commitmentSeals[0].alt) fail('fallback', 'selo sem tradução não caiu no alt em inglês')
  if (content.values.length !== reference.values.length) fail('fallback', 'lista de valores vazia fez cards sumirem')
  if (content.primaryNav.find((n) => n.id === 'contact')?.label !== 'Contact') fail('fallback', 'item de menu ausente não caiu no inglês')
  if (content.certifications[0].title === reference.certifications[0].title) fail('fallback', 'itens traduzidos presentes deveriam continuar em português')
}

// --- Chaves de React instáveis nos componentes ---
console.log('\nChaves de React (components/ e app/)')
{
  const files = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.tsx$/.test(entry.name)) files.push(full)
    }
  }
  walk(path.join(root, 'components'))
  walk(path.join(root, 'app'))
  // Campos de texto traduzível usados como key, ou item/linha/nota (string) usado direto.
  const TEXT_KEY = /\bkey=\{\s*(?:[\w.]+\.(?:title|label|name|eyebrow|description|text|site|country|role|detail|area|pallets|access|holder)|item|line|note|label|text|paragraph)\s*\}/
  // Usos legítimos: `field.name` é o identificador do campo do formulário (não o rótulo) e `point.name`
  // do mapa é o nome em inglês usado só como id (o texto exibido vem de `map.place.*`).
  const KEY_ALLOWED = [
    ['components/forms/ContactForm.tsx', /key=\{field\.name\}/],
    ['components/sections/RouteMap.tsx', /key=\{point\.name\}/],
  ]
  const INDEX_ON_REVEAL = /<RevealItem[^>]*\bkey=\{\s*(?:index|i|idx)\s*\}/
  for (const file of files) {
    fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      const where = `${path.relative(root, file)}:${i + 1}`
      if (TEXT_KEY.test(line) && !KEY_ALLOWED.some(([f, re]) => f === path.relative(root, file) && re.test(line))) fail('keys', `${where}: key baseada em texto traduzível → use o \`id\`/slug estável: ${line.trim().slice(0, 90)}`)
      if (INDEX_ON_REVEAL.test(line)) fail('keys', `${where}: RevealItem com key por índice → use o \`id\` do item: ${line.trim().slice(0, 90)}`)
    })
  }
}

console.log(problems ? `\n${problems} problema(s) nas traduções.` : '\nTraduções completas e consistentes: PT-BR e ES cobrem todo o conteúdo, com a mesma estrutura do inglês.')
process.exit(problems ? 1 : 0)
