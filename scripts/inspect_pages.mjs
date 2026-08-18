import { chromium } from '@playwright/test';

async function inspect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  const navText = await page.locator('[data-od-id="nav-links"]').textContent();
  console.log('EN Nav text:', navText);
  
  await page.goto('http://localhost:3000/es', { waitUntil: 'networkidle' });
  const navTextEs = await page.locator('[data-od-id="nav-links"]').textContent();
  console.log('ES Nav text:', navTextEs);

  await page.goto('http://localhost:3000/en/about-us', { waitUntil: 'networkidle' });
  const h1Text = await page.locator('h1').textContent();
  console.log('EN About-us H1:', h1Text);

  await page.goto('http://localhost:3000/es/about-us', { waitUntil: 'networkidle' });
  const h1TextEs = await page.locator('h1').textContent();
  console.log('ES About-us H1:', h1TextEs);

  await page.goto('http://localhost:3000/es/trading-objectives', { waitUntil: 'networkidle' });
  const h1TextTradingEs = await page.locator('h1').textContent();
  console.log('ES Trading Objectives H1:', h1TextTradingEs);

  await browser.close();
}

inspect();
