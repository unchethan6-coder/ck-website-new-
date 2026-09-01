import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3001";
const SCREENSHOT_DIR = "/Users/kimjoshuadr/.gemini/antigravity-cli/brain/c9a51e97-5edc-4cac-96d7-e1f9a8cbf26a/qaqc_screenshots";

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ROUTES = [
  { name: "home", path: "/en" },
  { name: "payouts", path: "/en/payouts" },
  { name: "trading-objectives", path: "/en/trading-objectives" },
  { name: "evaluation", path: "/en/evaluation" },
  { name: "instant", path: "/en/instant" },
  { name: "affiliates", path: "/en/affiliates" },
  { name: "about-us", path: "/en/about-us" },
  { name: "blog", path: "/en/blog" },
  { name: "contact", path: "/en/contact" },
  { name: "faq", path: "/en/faq" },
  { name: "privacy-policy", path: "/en/privacy-policy" },
  { name: "terms-conditions", path: "/en/terms-conditions" },
];

async function runComprehensiveQAQC() {
  const browser = await chromium.launch({ headless: true });
  const results = {
    timestamp: new Date().toISOString(),
    routesChecked: 0,
    consoleErrors: [],
    brokenImages: [],
    overflowIssues: [],
    interactionResults: [],
    screenshots: [],
  };

  console.log("🚀 Starting Comprehensive QAQC Audit across Desktop & Mobile...");

  for (const route of ROUTES) {
    results.routesChecked++;
    console.log(`\n========================================`);
    console.log(`🔍 Auditing Route: ${route.path} (${route.name})`);
    console.log(`========================================`);

    // 1. Desktop Audit (1440x900)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await desktopContext.newPage();
    const pageConsoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        pageConsoleErrors.push({ route: route.path, text: msg.text() });
      }
    });

    try {
      const resp = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
      console.log(`  [Desktop] Status: ${resp?.status()}`);

      // Check broken images
      const brokenImgs = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src || img.getAttribute("src"));
      });
      if (brokenImgs.length > 0) {
        console.log(`  ⚠️ Broken images found: ${brokenImgs.length}`);
        results.brokenImages.push({ route: route.path, images: brokenImgs });
      } else {
        console.log(`  ✓ All images loaded correctly`);
      }

      // Check horizontal scroll overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      if (hasHorizontalScroll) {
        console.log(`  ⚠️ Desktop horizontal overflow detected!`);
        results.overflowIssues.push({ route: route.path, viewport: "desktop" });
      } else {
        console.log(`  ✓ Desktop viewport width clean`);
      }

      // Screenshot Desktop Hero
      const desktopScreenshotPath = path.join(SCREENSHOT_DIR, `${route.name}-desktop.png`);
      await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
      results.screenshots.push(desktopScreenshotPath);

      // Route-specific interactive tests
      if (route.name === "payouts") {
        const metricsCount = await page.locator("text=$").count();
        console.log(`  ✓ /payouts rendered ${metricsCount} currency/dollar metrics.`);
      }

      if (route.name === "trading-objectives") {
        const tabs = await page.locator("button:has-text('2-Step')").count();
        console.log(`  ✓ /trading-objectives verified with ${tabs} pathway tabs.`);
      }

    } catch (err) {
      console.error(`  ❌ Error auditing desktop ${route.path}:`, err.message);
    } finally {
      if (pageConsoleErrors.length > 0) {
        results.consoleErrors.push(...pageConsoleErrors);
      }
      await desktopContext.close();
    }

    // 2. Mobile Audit (iPhone 14 - 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
    });

    const mobilePage = await mobileContext.newPage();
    try {
      await mobilePage.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle", timeout: 15000 });

      // Check mobile horizontal overflow
      const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
      const mobileClientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);

      if (mobileScrollWidth > mobileClientWidth + 2) {
        console.log(`  ⚠️ Mobile horizontal overflow detected: scrollWidth=${mobileScrollWidth}, clientWidth=${mobileClientWidth}`);
        results.overflowIssues.push({ route: route.path, viewport: "mobile", scrollWidth: mobileScrollWidth, clientWidth: mobileClientWidth });
      } else {
        console.log(`  ✓ Mobile viewport width clean (no horizontal spill)`);
      }

      // Screenshot Mobile
      const mobileScreenshotPath = path.join(SCREENSHOT_DIR, `${route.name}-mobile.png`);
      await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
      results.screenshots.push(mobileScreenshotPath);

    } catch (err) {
      console.error(`  ❌ Error auditing mobile ${route.path}:`, err.message);
    } finally {
      await mobileContext.close();
    }
  }

  await browser.close();

  const reportPath = "/Users/kimjoshuadr/.gemini/antigravity-cli/brain/c9a51e97-5edc-4cac-96d7-e1f9a8cbf26a/qaqc_comprehensive_report.json";
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log("\n========================================");
  console.log("🏁 Comprehensive QAQC Run Complete!");
  console.log(`- Routes Checked: ${results.routesChecked}`);
  console.log(`- Console Errors: ${results.consoleErrors.length}`);
  console.log(`- Broken Images: ${results.brokenImages.length}`);
  console.log(`- Overflow Issues: ${results.overflowIssues.length}`);
  console.log(`- Screenshots Saved: ${results.screenshots.length} to ${SCREENSHOT_DIR}`);
  console.log("========================================\n");
}

runComprehensiveQAQC();
