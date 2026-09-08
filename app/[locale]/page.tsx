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

export const revalidate = 300;

export default async function Home() {
  const [videos, challengeConfig, payouts, rewardsSummary, articles] =
    await Promise.all([
      getVideoReviews(),
      getChallengeConfig(),
      getPayouts(),
      getRewardsSummary(),
      getArticles(),
    ]);

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
    <main className="min-h-screen">
      {/* S1 — Hero: Light */}
      <Hero />

      {/* S2 — Stats Strip: Light (was Jet Black) */}
      <StatsStrip />

      {/* S3 — Challenge Selector: keep the primary decision close to the hero */}
      <ChallengeComparison config={challengeConfig} />

      {/* S4 — How It Works */}
      <HowItWorks />

      {/* S5 — Trading Platforms */}
      <TradingPlatforms />

      {/* S6 — Benefits */}
      <FeatureStrip />

      {/* S7 — Verified reward proof */}
      <ProofShowcase payouts={payouts} summary={rewardsSummary} />

      {/* S8 — Trader Stories */}
      <TraderStories videos={videoItems} />

      {/* S9 — Educational content */}
      <BlogCategories articles={articles} />

      {/* S10 — Support */}
      <CustomerSupportSection />

      {/* S11 — FAQ */}
      <FaqAccordion />

      {/* S12 — Closing CTA */}
      <ClosingCta />
    </main>
  );
}
