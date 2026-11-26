#!/usr/bin/env node
// Teste de navegador do botão flutuante "Fale conosco" (components/layout/ContactFab.tsx).
//   npm run build && npm start &
//   BASE_URL=http://localhost:3000 node scripts/e2e-contact-fab.cjs
// Requer `playwright` com Chromium (não é dependência do projeto).
// Cobre: textos nos 3 idiomas, abertura/fechamento (X, Esc, clique fora), ausência em /contact,
// redirecionamento para o formulário certo (aba + rolagem) em cada idioma, idioma preservado,
// troca de idioma com o painel aberto, e limites da tela em desktop, tablet e mobile.

const { chromium } = require('playwright')

const BASE = process.env.BASE_URL || 'http://localhost:3000'
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  tablet: { viewport: { width: 820, height: 1180 }, hasTouch: true },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  'mobile-pequeno': { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true },
}
const TEXT = {
  pt: { open: 'Fale conosco', title: 'Como podemos ajudar?', sub: 'Selecione seu perfil para continuar.', supplier: ['Sou fornecedor', 'Quero fornecer meus produtos'], industry: ['Sou indústria ou distribuidor', 'Quero importar insumos'], tabSupplier: 'Seja um fornecedor' },
  en: { open: 'Contact us', title: 'How can we help?', sub: 'Select your profile to continue.', supplier: ['I’m a supplier', 'I want to supply my products'], industry: ['I’m a manufacturer or distributor', 'I want to import raw materials'], tabSupplier: 'Become a supplier' },
  es: { open: 'Contáctenos', title: '¿Cómo podemos ayudarle?', sub: 'Seleccione su perfil para continuar.', supplier: ['Soy proveedor', 'Quiero suministrar mis productos'], industry: ['Soy fabricante o distribuidor', 'Quiero importar materias primas'], tabSupplier: null },
}
const FORM = { supplier: 'supplier', industry: 'quote' }

let failures = 0
const check = (ok, msg) => {
  if (!ok) {
    failures++
    console.log(`    ✗ ${msg}`)
  }
}
const fab = (page) => page.locator('button[aria-controls]', { has: page.locator('svg') }).filter({ hasText: /Contact us|Fale conosco|Contáctenos/ })
const dialog = (page) => page.locator('[role="dialog"]')
const panelOpen = async (page) => (await dialog(page).evaluate((el) => getComputedStyle(el).visibility)) === 'visible'

async function boot(browser, vp, locale, path = '/') {
  const ctx = await browser.newContext(VIEWPORTS[vp])
  await ctx.addInitScript((l) => { if (!localStorage.getItem('navigal-locale')) localStorage.setItem('navigal-locale', l) }, locale)
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  return { ctx, page, errors }
}

async function run() {
  const browser = await chromium.launch()
  for (const vp of Object.keys(VIEWPORTS)) {
    console.log(`\n== ${vp} ==`)
    for (const locale of ['pt', 'en', 'es']) {
      for (const profile of ['supplier', 'industry']) {
        const T = TEXT[locale]
        const { ctx, page, errors } = await boot(browser, vp, locale, '/about')
        const label = `${vp}/${locale}/${profile}`
        const trigger = fab(page)
        check((await trigger.count()) === 1, `${label}: botão presente`)
        check((await trigger.innerText()).trim() === T.open, `${label}: rótulo "${T.open}"`)
        check(!(await panelOpen(page)), `${label}: painel começa fechado`)
        await trigger.click()
        await page.waitForTimeout(350)
        check(await panelOpen(page), `${label}: painel abre`)
        const body = await dialog(page).innerText()
        for (const s of [T.title, T.sub, ...T.supplier, ...T.industry]) check(body.includes(s), `${label}: texto "${s}"`)

        // Limites da tela e sobreposição com o voltar ao topo
        const box = await dialog(page).boundingBox()
        const v = VIEWPORTS[vp].viewport
        check(box.x >= 0 && box.x + box.width <= v.width && box.y >= 0 && box.y + box.height <= v.height, `${label}: painel dentro da tela (${JSON.stringify(box)})`)
        const tb = await trigger.boundingBox()
        check(tb.x + tb.width <= v.width && tb.y + tb.height <= v.height, `${label}: botão dentro da tela`)
        await page.evaluate(() => window.scrollTo(0, 800))
        await page.waitForTimeout(500)
        const top = await page.locator('button[aria-label]').filter({ has: page.locator('svg') }).evaluateAll((els) => els.map((e) => ({ l: e.getAttribute('aria-label'), r: e.getBoundingClientRect() })).filter((x) => /top|topo|arriba/i.test(x.l)))
        const tb2 = await trigger.boundingBox()
        if (top[0]) check(top[0].r.right <= tb2.x, `${label}: não sobrepõe o voltar ao topo`)
        await page.evaluate(() => window.scrollTo(0, 0))

        // Clique na opção
        await page.locator('[role="dialog"] a', { hasText: T[profile][0] }).click()
        await page.waitForURL(/\/contact\?type=/)
        await page.waitForTimeout(1200)
        const url = new URL(page.url())
        check(url.searchParams.get('type') === FORM[profile], `${label}: URL type=${FORM[profile]} (veio ${url.search})`)
        check((await page.evaluate(() => document.documentElement.lang)) === { pt: 'pt-BR', en: 'en', es: 'es' }[locale], `${label}: idioma preservado`)
        const selected = await page.locator('[role="tab"][aria-selected="true"]').getAttribute('id')
        check(selected === `tab-${FORM[profile]}`, `${label}: aba ativa = ${FORM[profile]} (veio ${selected})`)
        const formId = await page.locator('[role="tabpanel"] input').first().getAttribute('id')
        check(formId && formId.startsWith(FORM[profile] + '-'), `${label}: formulário ${FORM[profile]} renderizado (${formId})`)
        const card = await page.locator('#contact-form').boundingBox()
        check(card && card.y >= 0 && card.y < 140, `${label}: rolou até o formulário (card.y=${card && Math.round(card.y)})`)
        check((await page.locator('[role="dialog"]').count()) === 0, `${label}: botão oculto em /contact`)
        check(errors.length === 0, `${label}: sem erros de JS: ${errors.join(' | ')}`)
        await ctx.close()
      }
    }
  }

  // Comportamentos (desktop e mobile)
  for (const vp of ['desktop', 'mobile']) {
    console.log(`\n== comportamento ${vp} ==`)
    const { ctx, page, errors } = await boot(browser, vp, 'en', '/products')
    const trigger = fab(page)
    await trigger.click()
    await page.waitForTimeout(300)
    check(await panelOpen(page), 'abre')
    check((await trigger.getAttribute('aria-expanded')) === 'true', 'aria-expanded=true')
    await page.keyboard.press('Escape')
    await page.waitForTimeout(350)
    check(!(await panelOpen(page)), 'Esc fecha')
    check(await trigger.evaluate((el) => el === document.activeElement), 'Esc devolve o foco ao botão')
    await trigger.click()
    await page.waitForTimeout(300)
    await page.locator('[role="dialog"] button[aria-label="Close"]').click()
    await page.waitForTimeout(350)
    check(!(await panelOpen(page)), 'X fecha')
    await trigger.click()
    await page.waitForTimeout(300)
    await page.mouse.click(10, 300)
    await page.waitForTimeout(350)
    check(!(await panelOpen(page)), 'clique fora fecha')
    await trigger.click()
    await page.waitForTimeout(300)
    await trigger.click()
    await page.waitForTimeout(350)
    check(!(await panelOpen(page)), 'clicar no botão de novo fecha')

    // Troca de idioma com painel aberto
    await trigger.click()
    await page.waitForTimeout(300)
    if (vp === 'desktop') {
      await page.evaluate(() => localStorage.setItem('navigal-locale', 'es'))
      await page.reload({ waitUntil: 'networkidle' })
      await page.waitForTimeout(400)
      check((await fab(page).innerText()).trim() === 'Contáctenos', 'recarregar em ES mantém idioma no botão')
    }
    check(errors.length === 0, `sem erros de JS: ${errors.join(' | ')}`)
    await ctx.close()
  }

  // Troca de idioma ao vivo com painel aberto + navegação entre páginas
  console.log('\n== troca de idioma ao vivo ==')
  {
    const { ctx, page, errors } = await boot(browser, 'desktop', 'en', '/')
    await fab(page).click()
    await page.waitForTimeout(300)
    await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', { key: 'navigal-locale', newValue: 'pt' })))
    await page.waitForTimeout(400)
    check((await dialog(page).innerText()).includes('Sou fornecedor'), 'painel aberto troca para PT ao vivo')
    check((await fab(page).innerText()).trim() === 'Fale conosco', 'rótulo troca para PT ao vivo')
    await page.locator('[role="dialog"] a', { hasText: 'Sou indústria' }).click()
    await page.waitForURL(/type=quote/)
    await page.waitForTimeout(800)
    check((await page.locator('[role="tab"][aria-selected="true"]').innerText()).length > 0 && (await page.locator('#tab-quote').getAttribute('aria-selected')) === 'true', 'PT: aba de indústria ativa')
    // Volta (history) para a home: botão reaparece e painel está fechado
    await page.goBack()
    await page.waitForTimeout(800)
    check((await fab(page).count()) === 1 && !(await panelOpen(page)), 'voltar: botão reaparece com painel fechado')
    check((await fab(page).innerText()).trim() === 'Fale conosco', 'voltar: idioma PT mantido')
    check(errors.length === 0, `sem erros de JS: ${errors.join(' | ')}`)
    await ctx.close()
  }

  // Acesso direto por URL (carregamento a frio) com âncora
  console.log('\n== carregamento direto ==')
  for (const [type, id] of [['supplier', 'tab-supplier'], ['quote', 'tab-quote']]) {
    const { ctx, page, errors } = await boot(browser, 'mobile', 'pt', `/contact?type=${type}#contact-form`)
    await page.waitForTimeout(800)
    check((await page.locator('[role="tab"][aria-selected="true"]').getAttribute('id')) === id, `direto ${type}: aba correta`)
    const y = (await page.locator('#contact-form').boundingBox()).y
    check(y >= 0 && y < 140, `direto ${type}: posicionado no formulário (y=${Math.round(y)})`)
    check(errors.length === 0, `direto ${type}: sem erros de JS: ${errors.join(' | ')}`)
    await ctx.close()
  }

  await browser.close()
  console.log(failures ? `\n${failures} falha(s)` : '\nTudo certo')
  process.exit(failures ? 1 : 0)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
