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
import { TraderReviews } from "@/components/sections/TraderReviews";
import { SupportSection } from "@/components/sections/SupportSection";
import { CustomerSupportSection } from "@/components/sections/CustomerSupportSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  getFirmReviews,
  getVideoReviews,
  getChallengeConfig,
  getPayouts,
  getRewardsSummary,
  getArticles,
} from "@/lib/cms";
import type { VideoItem } from "@/components/sections/Testimonials";
import type { ReviewCard } from "@/components/sections/TraderReviews";

export const revalidate = 300;

export default async function Home() {
  const [reviews, videos, challengeConfig, payouts, rewardsSummary, articles] =
    await Promise.all([
      getFirmReviews(),
      getVideoReviews(),
      getChallengeConfig(),
      getPayouts(),
      getRewardsSummary(),
      getArticles(),
    ]);

  const reviewCards: ReviewCard[] | undefined = reviews.length
    ? reviews.map((r) => ({
        text: r.summary,
        name: "Verified Trader",
        location: "",
        source: "CK Capital",
        rating: Math.max(1, Math.min(5, Math.round(r.rating))),
      }))
    : undefined;

  const videoItems: VideoItem[] | undefined = videos.length
    ? videos.map((v) => ({ id: v.youtubeVideoId, title: v.title }))
    : undefined;

  return (
    <main className="min-h-screen">
      {/* S1 — Hero: Light */}
      <Hero />

      {/* S2 — Stats Strip: Light (was Jet Black) */}
      <StatsStrip />

      {/* S3 — Trade with Peace of Mind (proof): Light + warm glow */}
      <ProofShowcase payouts={payouts} summary={rewardsSummary} />

      {/* S4 — Challenge Selector (evals): Light */}
      <Suspense fallback={null}>
        <ChallengeComparison config={challengeConfig} />
      </Suspense>

      {/* S5 — Trading Platforms: Light (was Jet Black) */}
      <TradingPlatforms />

      {/* S6 — Feature Strip: Light (was Jet Black) */}
      <FeatureStrip />

      {/* S7 — Trader Stories: Light */}
      <TraderStories videos={videoItems} />

      {/* S8 — Trader Reviews: Light */}
      <TraderReviews reviews={reviewCards} />

      {/* S9 — Blog Categories: Light */}
      <BlogCategories articles={articles} />

      {/* S10 — Customer Support: Light */}
      <CustomerSupportSection />

      {/* S11 — How It Works (moved down — traders know this, keep for new users): Light */}
      <HowItWorks />

      {/* S12 — FAQ: Light (was Jet Black) */}
      <FaqAccordion />

      {/* S13 — Closing CTA: Light + warm glow */}
      <ClosingCta />
    </main>
  );
}
