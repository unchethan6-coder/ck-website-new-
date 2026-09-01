import { chromium } from "playwright";
import fs from "fs";

const BASE_URL = "http://localhost:3001";
const ROUTES = [
  "/en",
  "/en/evaluation",
  "/en/instant",
  "/en/payouts",
  "/en/trading-objectives",
  "/en/faq",
  "/en/about-us",
  "/en/affiliates",
  "/en/blog",
  "/en/contact",
  "/en/privacy-policy",
  "/en/terms-conditions",
  "/en/cookie-policy",
  "/en/risk-disclosure",
  "/en/return-policy",
];

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrast(rgb1, rgb2) {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const results = {};

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`Auditing: ${route}`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1500);

      const pageAudit = await page.evaluate(() => {
        function parseRgb(colorStr) {
          if (!colorStr) return null;
          const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!m) return null;
          return {
            r: parseInt(m[1], 10),
            g: parseInt(m[2], 10),
            b: parseInt(m[3], 10),
            a: m[4] !== undefined ? parseFloat(m[4]) : 1,
          };
        }

        function isYellowish(rgb) {
          if (!rgb) return false;
          return rgb.r > 160 && rgb.g > 120 && rgb.b < 140;
        }

        function getEffectiveBg(el) {
          let curr = el;
          while (curr && curr !== document.documentElement) {
            const bg = window.getComputedStyle(curr).backgroundColor;
            const parsed = parseRgb(bg);
            if (parsed && parsed.a >= 0.7) {
              return { rgb: parsed, raw: bg, tag: curr.tagName, className: typeof curr.className === 'string' ? curr.className : '' };
            }
            curr = curr.parentElement;
          }
          const bodyBg = window.getComputedStyle(document.body).backgroundColor;
          const parsedBodyBg = parseRgb(bodyBg);
          if (parsedBodyBg && parsedBodyBg.a >= 0.7) {
            return { rgb: parsedBodyBg, raw: bodyBg, tag: "BODY", className: document.body.className };
          }
          return { rgb: { r: 255, g: 255, b: 255, a: 1 }, raw: "rgb(255, 255, 255) [white fallback]", tag: "BODY", className: "" };
        }

        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map((c) => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }

        function getContrast(rgb1, rgb2) {
          const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
          const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }

        const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, button, li, th, td, blockquote, label");
        const issues = [];
        const yellowTexts = [];
        const lowContrast = [];

        elements.forEach((el) => {
          const text = el.innerText?.trim();
          if (!text || text.length === 0) return;
          if (el.children.length > 3) return;
          if (el.tagName === "A" && el.querySelector("button, [class*='btn'], [class*='gold']")) return;

          const style = window.getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return;

          const colorRgb = parseRgb(style.color);
          const bgInfo = getEffectiveBg(el);
          const fontSize = parseFloat(style.fontSize);
          const fontWeight = parseInt(style.fontWeight, 10) || 400;
          const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && fontWeight >= 700);

          if (colorRgb) {
            const hasGoldClass = typeof el.className === "string" && (/(^|\s)gold-gradient-btn($|\s)/.test(el.className) || /(^|\s)bg-\[#FFC107\]($|\s)/.test(el.className) || /(^|\s)btn-gold($|\s)/.test(el.className));
            const effectiveBgRgb = hasGoldClass ? { r: 255, g: 193, b: 7, a: 1 } : bgInfo.rgb;

            const contrast = getContrast(colorRgb, effectiveBgRgb);
            const reqContrast = isLargeText ? 3.0 : 4.5;
            const isYellow = isYellowish(colorRgb);
            const bgLum = getLuminance(effectiveBgRgb.r, effectiveBgRgb.g, effectiveBgRgb.b);
            const isLightBg = bgLum >= 0.35;

            const item = {
              tag: el.tagName,
              text: text.slice(0, 80),
              color: style.color,
              rgb: colorRgb,
              bg: hasGoldClass ? "rgb(255, 193, 7) [gold]" : bgInfo.raw,
              bgTag: bgInfo.tag,
              bgClass: bgInfo.className.slice(0, 60),
              contrast: parseFloat(contrast.toFixed(2)),
              reqContrast,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              className: (typeof el.className === "string" ? el.className : "").slice(0, 80),
            };

            if (isYellow) {
              yellowTexts.push(item);
            }

            if (contrast < reqContrast) {
              lowContrast.push(item);
            }

            if (isLightBg && isYellow && contrast < 4.5) {
              issues.push({
                type: "YELLOW_ON_LIGHT_BG (Unreadable)",
                ...item,
              });
            } else if (isLightBg && colorRgb.r > 180 && colorRgb.g > 180 && colorRgb.b > 180 && contrast < 3.0) {
              issues.push({
                type: "WHITE_OR_PALE_ON_LIGHT_BG (Invisible)",
                ...item,
              });
            } else if (!isLightBg && colorRgb.r < 80 && colorRgb.g < 80 && colorRgb.b < 80 && contrast < 3.0) {
              issues.push({
                type: "DARK_ON_DARK_BG (Invisible)",
                ...item,
              });
            }
          }
        });

        return {
          totalChecked: elements.length,
          issuesCount: issues.length,
          lowContrastCount: lowContrast.length,
          yellowCount: yellowTexts.length,
          criticalIssues: issues.slice(0, 50),
          lowContrastSample: lowContrast.slice(0, 25),
          yellowSample: yellowTexts.slice(0, 25),
        };
      });

      results[route] = pageAudit;
      console.log(`  -> Checked: ${pageAudit.totalChecked}, Critical: ${pageAudit.issuesCount}, LowContrast: ${pageAudit.lowContrastCount}, YellowTexts: ${pageAudit.yellowCount}`);
    } catch (err) {
      console.error(`Error on ${route}:`, err.message);
      results[route] = { error: err.message };
    }
  }

  await browser.close();

  fs.writeFileSync("scripts/audit-report.json", JSON.stringify(results, null, 2));
  console.log("Audit complete! Report saved to scripts/audit-report.json");
}

audit();
