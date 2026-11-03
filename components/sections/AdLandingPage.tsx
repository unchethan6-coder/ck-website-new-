import { getTranslations } from "next-intl/server";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
import { TradingPlatforms } from "@/components/sections/TradingPlatforms";
import { CustomerSupportSection } from "@/components/sections/CustomerSupportSection";
import { Link } from "@/i18n/navigation";
import { getChallengeConfig } from "@/lib/cms";

/**
 * The homepage, cut down for paid social traffic (/landingpage).
 *
 * Meta's advertising standards reject landing pages that promise income or
 * guaranteed outcomes, show earnings, or hide that a product is simulated. So
 * this keeps the homepage's product sections and leaves out:
 *
 *   - the "Explore Your Options" challenge cards
 *   - payout totals, live payout feeds and the payouts proof section
 *   - trader success stories and reward amounts
 *   - "Transforming traders into winners", "earn from funded capital" and
 *     the 48-hour payout guarantee
 *   - the FAQ, How It Works and closing banner, which repeat those promises
 *
 * Every remaining mention of funded accounts or profit split says it is
 * simulated, and the page ends on a plain risk disclosure.
 */
export async function AdLandingPage() {
  const [t, challengeConfig] = await Promise.all([getTranslations("adLanding"), getChallengeConfig()]);

  return (
    <main className="home-purple-theme min-h-screen">
      <Hero
        copy={{
          badge: t("badge"),
          headline: [t("headline1"), t("headline2")],
          chips: [
            { value: t("chip1v"), label: t("chip1l") },
            { value: t("chip2v"), label: t("chip2l") },
            { value: t("chip3v"), label: t("chip3l") },
          ],
        }}
      />

      <ChallengeComparison config={challengeConfig} conditions={[t("cond1"), t("cond2"), t("cond3"), t("cond4")]} />

      <TradingPlatforms />

      <CustomerSupportSection />

      {/* Plain-language risk disclosure, then one calm call to action */}
      <section className="bg-[#030A1C] py-14 sm:py-20" data-od-id="ad-landing-risk">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 text-base font-bold text-white">
              <ShieldAlert size={18} aria-hidden className="shrink-0 text-amber-300" />
              {t("riskTitle")}
            </h2>
            <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/65">
              <p>{t("risk1")}</p>
              <p>{t("risk2")}</p>
              <p>{t("risk3")}</p>
            </div>
            <Link href="/risk-disclosure" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#A98BFF] hover:underline">
              {t("riskLink")} <ArrowRight size={14} aria-hidden className="rtl:rotate-180" />
            </Link>
          </div>

          <div className="mt-12 text-center">
            <h2 className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{t("ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">{t("ctaDesc")}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#start-challenge"
                className="brand-gradient-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-[#1A1030]"
              >
                {t("ctaPrimary")} <ArrowRight size={16} aria-hidden className="rtl:rotate-180" />
              </a>
              <Link
                href="/trading-objectives"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6 text-sm font-bold text-white transition-colors hover:border-[#894CEF]"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
