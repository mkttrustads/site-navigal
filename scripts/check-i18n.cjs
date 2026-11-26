#!/usr/bin/env node
// Confere as traduções PT-BR e ES contra o conteúdo-fonte em inglês.
//   npm run check:i18n
//
// O TypeScript já garante que as chaves existem. Este script cobre o resto:
//  1. paridade de estrutura que o tipo não enxerga (tamanho de listas, slugs de
//     setores e produtos, fichas técnicas, opções de formulário, {placeholders});
//  2. textos traduzidos IDÊNTICOS ao inglês (esquecimento clássico), exceto os
//     que são nome de marca/sigla/termo técnico, listados em KEEP abaixo.
// Sai com código 1 se achar algo, para poder rodar no CI.

const path = require('path')
const ts = require('typescript')
const fs = require('fs')
const Module = require('module')

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

const { ui } = load('content/i18n/en.ts')
const en = {
  site: load('content/site.ts'),
  about: load('content/about.ts'),
  credibility: load('content/credibility.ts'),
  solutions: load('content/solutions.ts'),
  industries: load('content/industries.ts'),
  products: load('content/products.ts'),
  forms: load('content/forms.ts'),
}
const { pageMeta } = load('content/i18n/en.ts')
const { localizeContent } = load('lib/i18n/localize.ts')
const translations = { pt: load('content/i18n/pt.ts').pt, es: load('content/i18n/es.ts').es }

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
      'EDTA', 'Trust Group', 'Trust Group',
    ].join('|') +
    ')$'
)
// Campos que não são texto traduzível (dados, ids, links, números).
const SKIP_KEYS = new Set(['icon', 'slug', 'href', 'value', 'display', 'founded', 'email', 'legalName', 'name:company', 'ncm', 'formula', 'type', 'required', 'wide', 'image'])

let problems = 0
const fail = (locale, message) => {
  problems++
  console.log(`  ✗ [${locale}] ${message}`)
}

// Identificadores estruturais (não são texto exibido): slugs de setor dentro de produtos e `name` dos campos de formulário.
const SKIP_PATHS = [/^products\[\d+\]\.industries\[/, /^formFields\.\w+\[\d+\]\.name$/]

function flatten(value, prefix = '', out = {}) {
  if (typeof value === 'string') {
    if (!SKIP_PATHS.some((re) => re.test(prefix))) out[prefix] = value
  }
  else if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${prefix}[${i}]`, out))
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === 'function' || SKIP_KEYS.has(k)) continue
      flatten(v, prefix ? `${prefix}.${k}` : k, out)
    }
  }
  return out
}

function checkLength(locale, label, source, translated) {
  if (!Array.isArray(translated) || translated.length !== source.length) {
    fail(locale, `${label}: esperado ${source.length} item(ns), veio ${Array.isArray(translated) ? translated.length : 'nada'}`)
  }
}

for (const locale of ['pt', 'es']) {
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

  // --- Listas por posição ---
  const { site, about, credibility, solutions, industries, products, forms } = en
  checkLength(locale, 'site.nav', site.primaryNav, tr.site.nav)
  checkLength(locale, 'site.trustGroupFacts', site.trustGroupFacts, tr.site.trustGroupFacts)
  checkLength(locale, 'site.trustGroupLines.items', site.trustGroupLines.items, tr.site.trustGroupLines.items)
  checkLength(locale, 'site.addressLines', site.company.address.lines, tr.site.addressLines)
  checkLength(locale, 'about.milestones', about.milestones, tr.about.milestones)
  checkLength(locale, 'about.story.paragraphs', about.story.paragraphs, tr.about.story.paragraphs)
  checkLength(locale, 'about.principles', about.principles, tr.about.principles)
  checkLength(locale, 'about.values', about.values, tr.about.values)
  checkLength(locale, 'about.offices', about.offices, tr.about.offices)
  checkLength(locale, 'credibility.certifications', credibility.certifications, tr.credibility.certifications)
  checkLength(locale, 'credibility.taglog.hubs', credibility.taglog.hubs, tr.credibility.taglog.hubs)
  checkLength(locale, 'credibility.commitment', credibility.commitment, tr.credibility.commitment)
  checkLength(locale, 'solutions.solutions', solutions.solutions, tr.solutions.solutions)
  checkLength(locale, 'solutions.accessoryServices', solutions.accessoryServices, tr.solutions.accessoryServices)
  checkLength(locale, 'solutions.processSteps', solutions.processSteps, tr.solutions.processSteps)
  checkLength(locale, 'solutions.riskPillars', solutions.riskPillars, tr.solutions.riskPillars)
  checkLength(locale, 'solutions.lookingFor', solutions.lookingFor, tr.solutions.lookingFor)
  for (const key of ['buyers', 'suppliers']) {
    checkLength(locale, `solutions.audiences.${key}.items`, solutions.audiences[key].items, tr.solutions.audiences[key].items)
  }

  // --- Slugs ---
  for (const { slug } of industries.industries) if (!tr.industries[slug]) fail(locale, `industries: falta o setor "${slug}"`)
  for (const slug of Object.keys(tr.industries)) if (!industries.industries.some((i) => i.slug === slug)) fail(locale, `industries: setor "${slug}" não existe`)
  for (const product of products.products) {
    const text = tr.products[product.slug]
    if (!text) { fail(locale, `products: falta o produto "${product.slug}"`); continue }
    if (!!product.datasheet !== !!text.datasheet) fail(locale, `products "${product.slug}": ficha técnica ${product.datasheet ? 'faltando' : 'sobrando'}`)
    if (product.grade && !text.grade && /[A-Za-z]{4,}/.test(product.grade.replace(/mesh|powder|granular/g, '')) && !KEEP.test(product.grade)) {
      // grade só com números/siglas pode ficar igual; com palavras, precisa de tradução.
      if (/\b(or|and|powder|granular|cationic|anionic)\b/i.test(product.grade)) fail(locale, `products "${product.slug}": grade "${product.grade}" sem tradução`)
    }
    if (product.datasheet && text.datasheet) {
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

console.log(problems ? `\n${problems} problema(s) nas traduções.` : '\nTraduções completas: PT-BR e ES cobrem todo o conteúdo.')
process.exit(problems ? 1 : 0)
