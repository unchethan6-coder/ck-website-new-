import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
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
      {/* S1 — Hero (aurora, live pill, border-spin pricing, slides under nav) */}
      <Hero />
      {/* S2 — Stat band */}
      <StatsStrip />
      {/* S3 — Live rewards proof (verified payout total + recent settlements) */}
      <LiveRewards payouts={payouts} />
      {/* S3.5 — Proof showcase (trust rail + confidence panel + dashboard visual) */}
      <ProofShowcase payouts={payouts} summary={rewardsSummary} />
      {/* S4 — Three steps */}
      <HowItWorks />
      {/* S5 — Choose Your Challenge */}
      <Suspense fallback={null}>
        <ChallengeComparison config={challengeConfig} promoCode={promo?.code} />
      </Suspense>
      {/* Trading platforms (MT5 / TradeLocker) */}
      <TradingPlatforms />
      {/* S7 — Testimonials */}
      <Testimonials videos={videoItems} />
      {/* S8 — Trader reviews / trusted choice */}
      <TraderReviews reviews={reviewCards} video={videoItems?.[0]} />
      {/* Support */}
      <SupportSection />
      <CustomerSupportSection />
      <FaqAccordion />
      {/* S10 — Closing CTA */}
      <ClosingCta />
    </main>
  );
}
