import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { TradingPlatforms } from "@/components/sections/TradingPlatforms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProofShowcase } from "@/components/sections/ProofShowcase";
import { TraderStories } from "@/components/sections/TraderStories";
import { BlogCategories } from "@/components/sections/BlogCategories";
import { CustomerSupportSection } from "@/components/sections/CustomerSupportSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  getVideoReviews,
  getChallengeConfig,
  getPayouts,
  getRewardsSummary,
  getArticles,
} from "@/lib/cms";
import type { VideoItem } from "@/components/sections/Testimonials";
import { activeHeroVideo } from "@/lib/heroTakeover";
import { FUNDING_PLAN_RAW_DATA } from "@/lib/content";
import { discountPlans } from "@/lib/vipOffer";

/**
 * The homepage. Also rendered, re-priced, by the private 90% OFF copy
 * (app/[locale]/vip-offer), so both stay the same page apart from price.
 */
export async function HomePage({ vip = false }: { vip?: boolean }) {
  const [videos, challengeConfig, payouts, rewardsSummary, articles] =
    await Promise.all([
      getVideoReviews(),
      getChallengeConfig(),
      getPayouts(),
      getRewardsSummary(),
      getArticles(),
    ]);

  // The VIP copy prices every plan at 90% off its list price.
  const config = vip
    ? challengeConfig
      ? { ...challengeConfig, fundingPlans: discountPlans(challengeConfig.fundingPlans ?? FUNDING_PLAN_RAW_DATA) }
      : null
    : challengeConfig;
  const vipPlans = vip && !challengeConfig ? discountPlans(FUNDING_PLAN_RAW_DATA) : null;

  const videoItems: VideoItem[] | undefined = videos.length
    ? videos.map((v) => ({
        id: v.youtubeVideoId,
        title: v.title,
        thumbnail: v.thumbnail?.url,
        reward: v.reward,
        desc: v.description,
      }))
    : undefined;

  return (
    <main className="home-purple-theme min-h-screen">
      {/* S1 — Hero: Light */}
      <Hero video={activeHeroVideo()} />

      {/* S2 — Stats Strip: Light (was Jet Black) */}
      <StatsStrip />

      {/* S3 — Challenge Selector (evals) */}
      <ChallengeComparison config={config} fundingPlans={vipPlans} />

      {/* S4 — Trade with Peace of Mind (proof): sits below the challenges */}
      <ProofShowcase payouts={payouts} summary={rewardsSummary} />

      {/* S5 — Trading Platforms: Light (was Jet Black) */}
      <TradingPlatforms />

      {/* S6 — Feature Strip: Light (was Jet Black) */}
      <FeatureStrip />

      {/* S7 — Trader Stories: Light */}
      <TraderStories videos={videoItems} />

      {/* S8 — Blog Categories: Light */}
      <BlogCategories articles={articles} />

      {/* S9 — Customer Support: Light */}
      <CustomerSupportSection />

      {/* S10 — How It Works (moved down — traders know this, keep for new users): Light */}
      <HowItWorks />

      {/* S11 — FAQ: Light (was Jet Black) */}
      <FaqAccordion />

      {/* S12 — Closing CTA: Light + warm glow */}
      <ClosingCta />
    </main>
  );
}
