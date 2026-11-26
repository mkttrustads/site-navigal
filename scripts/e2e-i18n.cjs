#!/usr/bin/env node
// Teste de navegador da troca de idioma (EN/PT/ES) em todas as páginas, desktop e mobile.
//   npm run build && npm start &            (ou: npm run dev)
//   BASE_URL=http://localhost:3000 node scripts/e2e-i18n.cjs
// Filtros opcionais: ONLY_PAGES=/about,/suppliers  ONLY_VIEWPORT=desktop|mobile  SKIP_FLOW=1
//
// Requer o pacote `playwright` com Chromium instalado (não é dependência do projeto).
// Para cada página e cada par de idiomas (A→B), carrega a página em A, troca para B SEM
// recarregar, rola a página inteira e confere:
//   1. nenhum erro de JavaScript / console.error;
//   2. nenhum elemento com texto ficou invisível (opacity efetiva 0) — o sintoma do bug original;
//   3. a "impressão digital" estrutural (nº de h2/h3/li/img/a/button) é igual à de um carregamento
//      limpo no idioma B — ou seja, a troca ao vivo gera a mesma página que o refresh.
// Também valida: refresh mantém o idioma, navegação entre páginas mantém o idioma e troca de
// idioma depois de navegar (sem recarregar) funciona.

const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const PAGES = process.env.ONLY_PAGES ? process.env.ONLY_PAGES.split(',') : ['/', '/about', '/solutions', '/products', '/suppliers', '/contact']
const LOCALES = ['en', 'pt', 'es']
const PAIRS = LOCALES.flatMap((a) => LOCALES.filter((b) => b !== a).map((b) => [a, b]))
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
}

let failures = 0
const fail = (msg) => {
  failures++
  console.log(`    ✗ ${msg}`)
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.5))
    const total = document.documentElement.scrollHeight
    for (let y = 0; y < total + step; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 900))
  })
}

/** Elementos com texto (ou imagem) cuja opacidade efetiva é ~0 depois de rolar tudo. */
function findInvisible(page) {
  return page.evaluate(() => {
    const out = []
    const effectiveOpacity = (el) => {
      let o = 1
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity)
      return o
    }
    for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main img, main dt, main dd, h1, h2, h3')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue
      if (el.closest('[aria-hidden="true"]') || el.closest('.sr-only')) continue
      if (effectiveOpacity(el) < 0.05) out.push((el.tagName + ': ' + (el.textContent || el.getAttribute('alt') || '').trim()).slice(0, 70))
    }
    return out
  })
}

const fingerprint = (page) =>
  page.evaluate(() => {
    // Só o conteúdo (main + footer): o menu mobile do cabeçalho pode estar aberto numa troca ao vivo.
    const count = (s) => document.querySelectorAll(`main ${s}, footer ${s}`).length
    return {
      h2: count('h2'), h3: count('h3'), li: count('li'), img: count('img'), a: count('a[href]'),
      button: count('button'), svg: count('svg'), input: count('input, select, textarea'),
    }
  })

async function setLocale(page, locale) {
  const button = page.locator(`button[aria-label^="${locale.toUpperCase()} ·"]:visible`)
  if ((await button.count()) === 0) {
    // Mobile: o seletor fica dentro do menu.
    await page.locator('header button[aria-expanded="false"]').click()
  }
  await button.first().click()
  await page.waitForFunction((l) => document.documentElement.lang.startsWith(l), locale === 'pt' ? 'pt' : locale)
  await page.waitForTimeout(300)
}

async function newPage(browser, vp, locale) {
  const context = await browser.newContext({ ...VIEWPORTS[vp], reducedMotion: 'no-preference' })
  await context.addInitScript((l) => {
    try { if (!sessionStorage.getItem('__seeded')) { localStorage.setItem('navigal-locale', l); sessionStorage.setItem('__seeded', '1') } } catch {}
  }, locale)
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|Failed to load resource/.test(m.text())) errors.push('console.error: ' + m.text().slice(0, 160)) })
  return { context, page, errors }
}

async function main() {
  const browser = await chromium.launch()
  for (const vp of Object.keys(VIEWPORTS).filter((v) => !process.env.ONLY_VIEWPORT || v === process.env.ONLY_VIEWPORT)) {
    // Referência: carregamento limpo em cada idioma.
    const reference = {}
    for (const path of PAGES) for (const l of LOCALES) {
      const { context, page, errors } = await newPage(browser, vp, l)
      await page.goto(BASE + path, { waitUntil: 'networkidle' })
      await page.waitForFunction((x) => document.documentElement.lang.startsWith(x), l === 'pt' ? 'pt' : l)
      await scrollThrough(page)
      reference[`${path}|${l}`] = await fingerprint(page)
      const hidden = await findInvisible(page)
      console.log(`[${vp}] carga limpa ${path} ${l}: ${JSON.stringify(reference[`${path}|${l}`])}`)
      if (hidden.length) fail(`[${vp}] carga limpa ${path} ${l}: invisíveis → ${hidden.join(' | ')}`)
      if (errors.length) fail(`[${vp}] carga limpa ${path} ${l}: ${errors.join(' | ')}`)
      await context.close()
    }
    for (const path of PAGES) {
      const base = reference[`${path}|en`]
      for (const l of ['pt', 'es']) {
        const r = reference[`${path}|${l}`]
        for (const k of Object.keys(base)) if (base[k] !== r[k]) fail(`[${vp}] ${path}: ${k} difere entre EN (${base[k]}) e ${l.toUpperCase()} (${r[k]})`)
      }
    }
    // Troca ao vivo A→B, sem recarregar.
    for (const path of PAGES) {
      for (const [a, b] of PAIRS) {
        const { context, page, errors } = await newPage(browser, vp, a)
        await page.goto(BASE + path, { waitUntil: 'networkidle' })
        await page.waitForFunction((x) => document.documentElement.lang.startsWith(x), a === 'pt' ? 'pt' : a)
        await scrollThrough(page) // deixa tudo já "revelado" no idioma A (caso do bug)
        await setLocale(page, b)
        await scrollThrough(page)
        const hidden = await findInvisible(page)
        const fp = await fingerprint(page)
        const label = `[${vp}] ${path} ${a.toUpperCase()}→${b.toUpperCase()}`
        const ok = !hidden.length && !errors.length && JSON.stringify(fp) === JSON.stringify(reference[`${path}|${b}`])
        if (hidden.length) fail(`${label}: invisíveis → ${hidden.join(' | ')}`)
        if (errors.length) fail(`${label}: ${errors.join(' | ')}`)
        if (JSON.stringify(fp) !== JSON.stringify(reference[`${path}|${b}`])) fail(`${label}: estrutura ${JSON.stringify(fp)} ≠ referência ${JSON.stringify(reference[`${path}|${b}`])}`)
        if (ok) console.log(`    ✓ ${label}`)
        await context.close()
      }
    }
    // Refresh + navegação entre páginas + troca depois de navegar.
    for (const l of process.env.SKIP_FLOW ? [] : LOCALES) {
      const { context, page, errors } = await newPage(browser, vp, 'en')
      await page.goto(BASE + '/about', { waitUntil: 'networkidle' })
      await setLocale(page, l)
      await page.reload({ waitUntil: 'networkidle' })
      await page.waitForFunction((x) => document.documentElement.lang.startsWith(x), l === 'pt' ? 'pt' : l)
      if (!(await page.evaluate(() => localStorage.getItem('navigal-locale'))) === l) fail(`[${vp}] refresh perdeu o idioma ${l}`)
      for (const path of ['/solutions', '/products', '/suppliers', '/contact', '/']) {
        await page.evaluate((p) => { const a = document.querySelector(`a[href="${p}"]`); a && a.click() }, path)
        await page.waitForURL((u) => u.pathname === path)
        await scrollThrough(page)
        if (!(await page.evaluate((x) => document.documentElement.lang.startsWith(x), l === 'pt' ? 'pt' : l))) fail(`[${vp}] navegação para ${path} perdeu o idioma ${l}`)
        const hidden = await findInvisible(page)
        if (hidden.length) fail(`[${vp}] navegação ${path} (${l}): invisíveis → ${hidden.join(' | ')}`)
        const next = LOCALES[(LOCALES.indexOf(l) + 1) % 3]
        await setLocale(page, next)
        await scrollThrough(page)
        const fp = await fingerprint(page)
        const hidden2 = await findInvisible(page)
        if (hidden2.length) fail(`[${vp}] navegação ${path} ${l}→${next}: invisíveis → ${hidden2.join(' | ')}`)
        if (JSON.stringify(fp) !== JSON.stringify(reference[`${path}|${next}`])) fail(`[${vp}] navegação ${path} ${l}→${next}: estrutura difere da referência`)
        await setLocale(page, l)
      }
      if (errors.length) fail(`[${vp}] fluxo de navegação (${l}): ${errors.join(' | ')}`)
      console.log(`    ✓ [${vp}] refresh + navegação + troca sem recarregar (${l})`)
      await context.close()
    }
  }
  await browser.close()
  console.log(failures ? `\n${failures} falha(s).` : '\nTodos os testes de navegador passaram.')
  process.exit(failures ? 1 : 0)
}
main().catch((e) => { console.error(e); process.exit(2) })
