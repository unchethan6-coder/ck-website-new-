import { chromium, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'qaqc-mobile-screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runMobileTabletQAQC() {
  console.log('📱 Starting Comprehensive Mobile & Tablet Responsive QAQC Suite...\n');

  const browser = await chromium.launch({ headless: true });
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

  const viewports = [
    {
      name: 'iPhone SE (320px)',
      viewport: { width: 320, height: 568 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      prefix: '01_iphone_se',
    },
    {
      name: 'Modern Mobile - iPhone 14 (390px)',
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      prefix: '02_iphone_14',
    },
    {
      name: 'Tablet Portrait - iPad Mini (768px)',
      viewport: { width: 768, height: 1024 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      prefix: '03_ipad_mini',
    },
    {
      name: 'Tablet Landscape / Small Laptop (1024px)',
      viewport: { width: 1024, height: 768 },
      deviceScaleFactor: 2,
      isMobile: false,
      hasTouch: false,
      prefix: '04_tablet_landscape',
    },
  ];

  const routes = [
    { path: '/en', name: 'Landing Page' },
    { path: '/en/trading-objectives', name: 'Trading Objectives' },
    { path: '/en/about-us', name: 'About Us' },
    { path: '/en/affiliates', name: 'Affiliates' },
    { path: '/en/payouts', name: 'Rewards / Payouts' },
  ];

  try {
    for (const vp of viewports) {
      console.log('══════════════════════════════════════════════════════════');
      console.log(`DEVICE: ${vp.name.toUpperCase()}`);
      console.log('══════════════════════════════════════════════════════════');

      const context = await browser.newContext({
        viewport: vp.viewport,
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      });
      const page = await context.newPage();

      for (const route of routes) {
        console.log(`\n--- Testing ${route.name} (${route.path}) on ${vp.name} ---`);
        await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(600);

        // 1. Check for Horizontal Scroll Overflow Bug (document.documentElement.scrollWidth <= window.innerWidth)
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        const hasNoHorizontalOverflow = scrollWidth <= innerWidth + 1; // 1px rounding tolerance
        assert(
          hasNoHorizontalOverflow,
          `[${vp.name}] ${route.name}: No horizontal overflow`,
          `(scrollWidth: ${scrollWidth}px, viewport: ${innerWidth}px)`
        );

        // 2. Take screenshot of page top
        const safeName = route.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `${vp.prefix}_${safeName}.png`),
        });
      }

      // 3. Test Mobile Navigation Drawer & Search Dialog (Mobile & Tablet viewports)
      if (vp.viewport.width < 1024) {
        console.log(`\n--- Testing Mobile Navigation Drawer on ${vp.name} ---`);
        await page.goto('http://localhost:3000/en', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(400);

        // Open drawer menu
        const menuBtn = page.locator('button[aria-label="Menu"], button[aria-label="Menü"]');
        await menuBtn.click();
        await page.waitForTimeout(300);

        const isMenuOpen = await page.locator('[data-od-id="top-nav"] nav').evaluate((el) => {
          return el.classList.contains('rounded-3xl');
        });
        assert(isMenuOpen, `[${vp.name}] Mobile Menu drawer opens smoothly`);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.prefix}_menu_drawer_open.png`) });

        // Close drawer menu
        await menuBtn.click();
        await page.waitForTimeout(200);

        // Open Search from mobile header button
        console.log(`\n--- Testing Mobile Search Trigger on ${vp.name} ---`);
        const searchBtn = page.locator('[data-od-id="mobile-search-trigger"]');
        await searchBtn.click();
        await page.waitForTimeout(300);

        const searchModal = page.locator('[data-od-id="global-search-modal"]');
        assert(await searchModal.isVisible(), `[${vp.name}] Search Modal opens via mobile header trigger`);

        // Check search modal fits within viewport
        const modalBoundingBox = await searchModal.boundingBox();
        if (modalBoundingBox) {
          assert(
            modalBoundingBox.width <= vp.viewport.width,
            `[${vp.name}] Search modal width fits viewport (${Math.round(modalBoundingBox.width)}px <= ${vp.viewport.width}px)`
          );
        }

        // Fill search on mobile
        const searchInput = searchModal.locator('input');
        await searchInput.fill('100k');
        await page.waitForTimeout(300);
        const result100k = searchModal.locator('text=$100,000 Account');
        assert(await result100k.isVisible(), `[${vp.name}] Search query yields filtered results on mobile`);

        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.prefix}_search_modal.png`) });

        // Close search with ESC or close button
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }

      // 4. Test Table horizontal scrollability on Trading Objectives for Mobile
      if (vp.viewport.width < 768) {
        console.log(`\n--- Testing Swipeable Comparison Table on ${vp.name} ---`);
        await page.goto('http://localhost:3000/en/trading-objectives', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(400);

        const compareTable = page.locator('[data-od-id="compare-models-table"]');
        await compareTable.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);

        const isScrollable = await compareTable.evaluate((el) => el.scrollWidth > el.clientWidth);
        assert(isScrollable, `[${vp.name}] Comparison model table is horizontally scrollable without breaking container`);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.prefix}_compare_table_scroll.png`) });
      }

      await context.close();
    }

    console.log('\n══════════════════════════════════════════════════════════');
    console.log(`RESPONSIVE QAQC SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('══════════════════════════════════════════════════════════');

  } catch (err) {
    console.error('Fatal error during Mobile/Tablet QAQC execution:', err);
    failed++;
  } finally {
    await browser.close();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runMobileTabletQAQC();
