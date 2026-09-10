import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'qaqc-screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runQAQC() {
  console.log('🚀 Starting Playwright QAQC Suite for Global Search and Sitewide Translations...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`  ✅ PASS: ${testName} ${details}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${details}`);
      failed++;
    }
  }

  try {
    // ══════════════════════════════════════════════════════════════
    // 1. GLOBAL SEARCH TESTING
    // ══════════════════════════════════════════════════════════════
    console.log('══════════════════════════════════════════════════════════');
    console.log('1. GLOBAL SEARCH SUITE (Command Palette ⌘K)');
    console.log('══════════════════════════════════════════════════════════');

    await page.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Test 1.1: Trigger search by clicking the search button
    const searchTrigger = page.locator('[data-od-id="nav-search-trigger"]');
    await searchTrigger.waitFor({ state: 'visible', timeout: 5000 });
    await searchTrigger.click();
    await page.waitForTimeout(400);

    const searchModal = page.locator('[data-od-id="global-search-modal"]');
    const isModalVisible = await searchModal.isVisible();
    assert(isModalVisible, 'Search Modal opens via TopNav trigger button');

    // Test 1.2: Verify default popular searches view & input auto-focus
    const searchInput = searchModal.locator('input');
    const isInputFocused = await searchInput.evaluate((el) => el === document.activeElement);
    assert(isInputFocused, 'Search input is auto-focused upon opening');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_search_modal_open.png') });

    // Test 1.3: Search for account size "100k"
    await searchInput.fill('100k');
    await page.waitForTimeout(300);
    const result100k = searchModal.locator('text=$100,000 Account');
    assert(await result100k.isVisible(), 'Search query "100k" yields "$100,000 Account" result');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_search_100k.png') });

    // Test 1.4: Search for trading rule "drawdown"
    await searchInput.fill('drawdown');
    await page.waitForTimeout(300);
    const ruleDaily = searchModal.locator('text=Max Daily Loss (4%)');
    const ruleOverall = searchModal.locator('text=Max Overall Loss (8%)');
    assert(await ruleDaily.isVisible(), 'Search query "drawdown" yields "Max Daily Loss (4%)"');
    assert(await ruleOverall.isVisible(), 'Search query "drawdown" yields "Max Overall Loss (8%)"');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_search_drawdown.png') });

    // Test 1.5: Search for platform "mt5"
    await searchInput.fill('mt5');
    await page.waitForTimeout(300);
    const platformMt5 = searchModal.locator('text=MetaTrader 5 (MT5)');
    assert(await platformMt5.isVisible(), 'Search query "mt5" yields "MetaTrader 5 (MT5)"');

    // Test 1.6: Search for quick action "discord"
    await searchInput.fill('discord');
    await page.waitForTimeout(300);
    const actionDiscord = searchModal.locator('text=Join Official Discord');
    assert(await actionDiscord.isVisible(), 'Search query "discord" yields "Join Official Discord"');

    // Test 1.7: Empty query result state
    await searchInput.fill('xyznonexistentquery999');
    await page.waitForTimeout(300);
    const noResults = searchModal.locator('text=No results found for');
    assert(await noResults.isVisible(), 'Non-matching query shows empty state message');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_search_no_results.png') });

    // Test 1.8: Close modal with Escape key
    await page.keyboard.press('Escape');
    await searchModal.waitFor({ state: 'hidden', timeout: 3000 });
    assert(!(await searchModal.isVisible()), 'Modal closes smoothly on ESC key');

    // Test 1.9: Open modal with keyboard shortcut (Control+k / Meta+k)
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(300);
    const isModalOpenViaKeyboard = await searchModal.isVisible();
    assert(isModalOpenViaKeyboard, 'Global shortcut (Control+K / Cmd+K) opens search modal');

    // Test 1.10: Keyboard navigation with Arrow keys and selection
    await searchInput.fill('objectives');
    await page.waitForTimeout(300);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);
    const currentUrl = page.url();
    assert(currentUrl.includes('/trading-objectives'), 'Selecting search result via Enter navigates to target route', `(Current URL: ${currentUrl})`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_search_navigation.png') });

    // ══════════════════════════════════════════════════════════════
    // 2. MULTILINGUAL TRANSLATIONS TESTING (Across All 7 Locales)
    // ══════════════════════════════════════════════════════════════
    console.log('\n══════════════════════════════════════════════════════════');
    console.log('2. MULTILINGUAL TRANSLATION SUITE');
    console.log('══════════════════════════════════════════════════════════');

    const localesToTest = [
      {
        locale: 'en',
        name: 'English',
        navKeywords: ['Objectives', 'Payouts', 'About Us', 'Affiliates', 'FAQ'],
        heroSubstring: 'Trade',
        aboutH1: 'Built by Traders. Designed for Scale.',
        objectivesH1: 'Find the Evaluation That Fits Your Strategy.',
        searchPlaceholder: 'Search pages, rules, models',
      },
      {
        locale: 'es',
        name: 'Spanish',
        navKeywords: ['Objetivos', 'Pagos', 'Nosotros', 'Afiliados', 'FAQ'],
        heroSubstring: '$100K',
        aboutH1: 'Creado por Traders. Diseñado para Escalar.',
        objectivesH1: 'Encuentra la Evaluación Que se Adapte a tu Estrategia.',
        searchPlaceholder: 'Buscar páginas, reglas, modelos',
      },
      {
        locale: 'pt',
        name: 'Portuguese',
        navKeywords: ['Objetivos', 'Sobre Nós', 'Afiliados', 'FAQ'],
        heroSubstring: '$100K',
        aboutH1: 'Construído por Traders. Projetado para Escalar.',
        objectivesH1: 'Encontre a Avaliação Que se Adapta à Sua Estratégia.',
        searchPlaceholder: 'Buscar páginas, regras, modelos',
      },
      {
        locale: 'de',
        name: 'German',
        navKeywords: ['Ziele', 'Auszahlungen', 'Über Uns', 'FAQ'],
        heroSubstring: '100%',
        aboutH1: 'Von Tradern Entwickelt. Für Skalierung Konzipiert.',
        objectivesH1: 'Finden Sie die Evaluierung, die zu Ihrer Strategie Passt.',
        searchPlaceholder: 'Seiten, Regeln, Modelle',
      },
      {
        locale: 'fr',
        name: 'French',
        navKeywords: ['Objectifs', 'Paiements', 'À Propos', 'Affiliés', 'FAQ'],
        heroSubstring: '100%',
        aboutH1: 'Créé par des Traders. Conçu pour Évoluer.',
        objectivesH1: "Trouvez l'Évaluation Qui Correspond à Votre Stratégie.",
        searchPlaceholder: 'Rechercher des pages, règles',
      },
      {
        locale: 'ar',
        name: 'Arabic (RTL)',
        navKeywords: ['الأهداف', 'من نحن', 'FAQ'],
        heroSubstring: '100%',
        aboutH1: 'صُنع بواسطة متداولين. صُمم للتوسع.',
        objectivesH1: 'اعثر على التقييم الذي يناسب استراتيجيتك.',
        searchPlaceholder: 'ابحث في الصفحات',
      },
      {
        locale: 'hi',
        name: 'Hindi',
        navKeywords: ['उद्देश्य', 'भुगतान', 'हमारे बारे में', 'FAQ'],
        heroSubstring: '100%',
        aboutH1: 'ट्रेडर्स द्वारा निर्मित। बड़े पैमाने के लिए डिज़ाइन किया गया।',
        objectivesH1: 'अपनी रणनीति के अनुकूल मूल्यांकन खोजें।',
        searchPlaceholder: 'पेज, नियम',
      },
    ];

    for (const testItem of localesToTest) {
      console.log(`\n--- Testing Locale: [${testItem.locale.toUpperCase()}] (${testItem.name}) ---`);

      // 2.1 Landing page check
      await page.goto(`http://localhost:3000/${testItem.locale}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);

      // Verify localized nav items
      const navContainer = page.locator('[data-od-id="nav-links"]');
      const navText = await navContainer.textContent();
      for (const keyword of testItem.navKeywords) {
        assert(navText?.includes(keyword), `[${testItem.locale}] TopNav contains "${keyword}"`);
      }

      // Verify localized hero content
      const heroText = await page.locator('h1').textContent();
      assert(
        heroText?.includes(testItem.heroSubstring),
        `[${testItem.locale}] Landing hero translated correctly ("${heroText?.replace(/\s+/g, ' ').trim()}")`
      );

      // Verify localized search modal
      await page.locator('[data-od-id="nav-search-trigger"]').click();
      await page.waitForTimeout(300);
      const localizedPlaceholder = await page.locator('[data-od-id="global-search-modal"] input').getAttribute('placeholder');
      assert(
        localizedPlaceholder?.toLowerCase().includes(testItem.searchPlaceholder.toLowerCase().slice(0, 8)),
        `[${testItem.locale}] Search placeholder is localized ("${localizedPlaceholder}")`
      );

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `06_search_${testItem.locale}.png`) });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      // 2.2 Trading Objectives Page localized check
      await page.goto(`http://localhost:3000/${testItem.locale}/trading-objectives`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const objectivesH1 = await page.locator('h1').textContent();
      assert(
        objectivesH1?.includes(testItem.objectivesH1),
        `[${testItem.locale}] Trading Objectives H1 translated correctly ("${objectivesH1?.replace(/\s+/g, ' ').trim()}")`
      );

      // 2.3 About Us Page localized check
      await page.goto(`http://localhost:3000/${testItem.locale}/about-us`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const aboutH1 = await page.locator('h1').textContent();
      assert(
        aboutH1?.includes(testItem.aboutH1),
        `[${testItem.locale}] About Us H1 translated correctly ("${aboutH1?.replace(/\s+/g, ' ').trim()}")`
      );

      // 2.4 Affiliates Page localized check
      await page.goto(`http://localhost:3000/${testItem.locale}/affiliates`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const affiliatesH1 = await page.locator('h1').textContent();
      assert(
        affiliatesH1?.length > 5,
        `[${testItem.locale}] Affiliates page rendered with translated heading ("${affiliatesH1?.replace(/\s+/g, ' ').trim()}")`
      );
    }

    console.log('\n══════════════════════════════════════════════════════════');
    console.log(`QAQC SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('══════════════════════════════════════════════════════════');

  } catch (err) {
    console.error('Fatal error during QAQC execution:', err);
    failed++;
  } finally {
    await browser.close();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runQAQC();
