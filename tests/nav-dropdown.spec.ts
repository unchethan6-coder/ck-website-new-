import { test, expect } from "@playwright/test";

test.describe("TopNav Mega Menu & Navigation QAQC", () => {
  test.describe("Desktop Viewport (1280x800)", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("desktop nav displays main links and indicators", async ({ page }) => {
      await page.goto("/en");
      const navLinks = page.locator('[data-od-id="nav-links"]');
      await expect(navLinks).toBeVisible();

      await expect(page.locator('[data-od-id="desktop-nav-tradingObjectives"]')).toBeVisible();
      await expect(page.locator('[data-od-id="desktop-nav-company"]')).toBeVisible();
      await expect(page.locator('[data-od-id="desktop-nav-payouts"]')).toBeVisible();
      await expect(page.locator('[data-od-id="desktop-nav-affiliates"]')).toBeVisible();
      await expect(page.locator('[data-od-id="desktop-nav-faq"]')).toBeVisible();
    });

    test("hovering Objectives reveals mega menu with sub-links and featured CTA", async ({ page }) => {
      await page.goto("/en");
      const objectivesTrigger = page.locator('[data-od-id="desktop-nav-tradingObjectives"]');
      
      // Hover over Objectives
      await objectivesTrigger.hover();
      await page.waitForTimeout(300);

      // Verify dropdown container and content
      const dropdown = page.locator('[data-od-id="desktop-dropdown-tradingObjectives"]');
      await expect(dropdown).toBeVisible();

      const evalLink = page.locator('[data-od-id="desktop-subitem-evaluation"]');
      const instantLink = page.locator('[data-od-id="desktop-subitem-instantFunding"]');
      const featuredCta = page.locator('[data-od-id="desktop-featured-cta-tradingObjectives"]');

      await expect(evalLink).toBeVisible();
      await expect(instantLink).toBeVisible();
      await expect(featuredCta).toBeVisible();

      // Click sub-link to navigate to evaluation page
      await evalLink.click();
      await expect(page).toHaveURL(/\/en\/evaluation/);
    });

    test("hovering Company reveals dropdown with About Us, Blog, Contact", async ({ page }) => {
      await page.goto("/en");
      const companyTrigger = page.locator('[data-od-id="desktop-nav-company"]');
      
      // Hover over Company
      await companyTrigger.hover();
      await page.waitForTimeout(300);

      const dropdown = page.locator('[data-od-id="desktop-dropdown-company"]');
      await expect(dropdown).toBeVisible();

      const aboutLink = page.locator('[data-od-id="desktop-subitem-aboutUs"]');
      const blogLink = page.locator('[data-od-id="desktop-subitem-blog"]');
      const contactLink = page.locator('[data-od-id="desktop-subitem-contact"]');

      await expect(aboutLink).toBeVisible();
      await expect(blogLink).toBeVisible();
      await expect(contactLink).toBeVisible();

      // Click About Us
      await aboutLink.click();
      await expect(page).toHaveURL(/\/en\/about-us/);
    });
  });

  test.describe("Mobile Viewport (390x844 - iPhone 14)", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test("mobile drawer opens and accordion expands Objectives sub-links", async ({ page }) => {
      await page.goto("/en");

      // Open mobile hamburger menu
      const menuBtn = page.locator('button[aria-label="Menu"]');
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();
      await page.waitForTimeout(300);

      const mobileDrawer = page.locator('[data-od-id="mobile-drawer"]');
      await expect(mobileDrawer).toBeVisible();

      // Objectives accordion button
      const objectivesAccordionBtn = page.locator('[data-od-id="mobile-accordion-tradingObjectives"]');
      await expect(objectivesAccordionBtn).toBeVisible();

      // Expand Objectives accordion
      await objectivesAccordionBtn.click();
      await page.waitForTimeout(200);

      // Sub-links should be visible inside mobile drawer
      const evaluationMobileLink = page.locator('[data-od-id="mobile-subitem-evaluation"]');
      const instantMobileLink = page.locator('[data-od-id="mobile-subitem-instantFunding"]');
      await expect(evaluationMobileLink).toBeVisible();
      await expect(instantMobileLink).toBeVisible();

      // Click evaluation to navigate
      await evaluationMobileLink.click();
      await expect(page).toHaveURL(/\/en\/evaluation/);
    });

    test("mobile drawer expands Company accordion", async ({ page }) => {
      await page.goto("/en");

      const menuBtn = page.locator('button[aria-label="Menu"]');
      await menuBtn.click();
      await page.waitForTimeout(300);

      const companyAccordionBtn = page.locator('[data-od-id="mobile-accordion-company"]');
      await expect(companyAccordionBtn).toBeVisible();
      await companyAccordionBtn.click();
      await page.waitForTimeout(200);

      const aboutLink = page.locator('[data-od-id="mobile-subitem-aboutUs"]');
      const blogLink = page.locator('[data-od-id="mobile-subitem-blog"]');
      const contactLink = page.locator('[data-od-id="mobile-subitem-contact"]');

      await expect(aboutLink).toBeVisible();
      await expect(blogLink).toBeVisible();
      await expect(contactLink).toBeVisible();

      await aboutLink.click();
      await expect(page).toHaveURL(/\/en\/about-us/);
    });
  });

  test.describe("Multilingual QAQC", () => {
    const locales = ["en", "es", "pt", "de", "fr", "ar", "hi"];

    for (const locale of locales) {
      test(`locale [${locale}] loads cleanly with localized nav`, async ({ page }) => {
        const response = await page.goto(`/${locale}`);
        expect(response?.status()).toBe(200);

        const nav = page.locator('[data-od-id="top-nav"]');
        await expect(nav).toBeVisible();

        const searchTrigger = page.locator('[data-od-id="nav-search-trigger"]');
        await expect(searchTrigger).toBeVisible();
      });
    }
  });
});
