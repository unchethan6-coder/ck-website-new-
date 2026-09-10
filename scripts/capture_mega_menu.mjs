import { chromium } from '@playwright/test';
import path from 'path';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 1. Capture Programs Mega Menu
  const programsTrigger = page.locator('[data-od-id="desktop-nav-tradingObjectives"]');
  await programsTrigger.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(process.cwd(), 'qaqc-screenshots/07_mega_menu_programs.png') });
  console.log('Saved 07_mega_menu_programs.png');

  // 2. Capture Company Mega Menu
  const companyTrigger = page.locator('[data-od-id="desktop-nav-company"]');
  await companyTrigger.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(process.cwd(), 'qaqc-screenshots/08_mega_menu_company.png') });
  console.log('Saved 08_mega_menu_company.png');

  // 3. Capture Mobile Accordion
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(400);

  const menuBtn = mobilePage.locator('button[aria-label="Menu"]');
  await menuBtn.click();
  await mobilePage.waitForTimeout(300);

  const progAccordion = mobilePage.locator('[data-od-id="mobile-accordion-tradingObjectives"]');
  await progAccordion.click();
  await mobilePage.waitForTimeout(300);

  await mobilePage.screenshot({ path: path.join(process.cwd(), 'qaqc-screenshots/09_mobile_drawer_accordions.png') });
  console.log('Saved 09_mobile_drawer_accordions.png');

  await browser.close();
}

capture();
