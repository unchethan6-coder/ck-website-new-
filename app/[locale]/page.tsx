import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { EvaluationPrograms } from "@/components/sections/EvaluationPrograms";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { TradingPlatforms } from "@/components/sections/TradingPlatforms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveRewards } from "@/components/sections/LiveRewards";
import { ProofShowcase } from "@/components/sections/ProofShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { TraderReviews } from "@/components/sections/TraderReviews";
import { SupportSection } from "@/components/sections/SupportSection";
import { CustomerSupportSection } from "@/components/sections/CustomerSupportSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  getActivePromo,
  getFirmReviews,
  getVideoReviews,
  getChallengeConfig,
  getPayouts,
  getRewardsSummary,
} from "@/lib/cms";
import type { VideoItem } from "@/components/sections/Testimonials";
import type { ReviewCard } from "@/components/sections/TraderReviews";

export const revalidate = 300;

export default async function Home() {
  const [promo, reviews, videos, challengeConfig, payouts, rewardsSummary] =
    await Promise.all([
      getActivePromo(),
      getFirmReviews(),
      getVideoReviews(),
      getChallengeConfig(),
      getPayouts(),
      getRewardsSummary(),
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
      {/* S1 — Hero: Light Canvas */}
      <Hero />

      {/* S2 — Trust & Stats Band: Jet Black */}
      <StatsStrip />

      {/* S3 — Evaluation Programs: Light Canvas */}
      <EvaluationPrograms />

      {/* S4 — Value Propositions Strip: Jet Black */}
      <FeatureStrip />

      {/* S5 — Live Rewards: Light Canvas */}
      <LiveRewards payouts={payouts} />

      {/* S6 — Proof Showcase: Jet Black */}
      <ProofShowcase payouts={payouts} summary={rewardsSummary} />

      {/* S7 — How It Works: Light Canvas */}
      <HowItWorks />

      {/* S8 — Trading Platforms: Jet Black */}
      <TradingPlatforms />

      {/* S9 — Trader Reviews (Trustpilot): Light Canvas */}
      <TraderReviews reviews={reviewCards} />

      {/* S10 — Testimonials (Video Reviews): Jet Black */}
      <Testimonials videos={videoItems} />

      {/* S11 — Support & FAQ: Light Canvas */}
      <CustomerSupportSection />
      <FaqAccordion />

      {/* S12 — Closing CTA: Jet Black */}
      <ClosingCta />
    </main>
  );
}
