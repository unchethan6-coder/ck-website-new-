import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PaymentsMarquee } from "@/components/sections/PaymentsMarquee";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
import { TradingPlatforms } from "@/components/sections/TradingPlatforms";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PayoutCarousel } from "@/components/sections/PayoutCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { CommunityGrid } from "@/components/sections/CommunityGrid";
import { TraderReviews } from "@/components/sections/TraderReviews";
import { SupportSection } from "@/components/sections/SupportSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  getActivePromo,
  getFirmReviews,
  getVideoReviews,
  getPayouts,
  getChallengeConfig,
} from "@/lib/cms";
import type { ReviewCard } from "@/components/sections/TraderReviews";
import type { VideoItem } from "@/components/sections/Testimonials";
import type { PayoutItem } from "@/components/sections/PayoutCarousel";

export const revalidate = 300;

export default async function Home() {
  const [promo, reviews, videos, payouts, challengeConfig] = await Promise.all([
    getActivePromo(),
    getFirmReviews(),
    getVideoReviews(),
    getPayouts(),
    getChallengeConfig(),
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

  const payoutItems: PayoutItem[] | undefined = payouts.length
    ? payouts.map((p) => ({ src: p.image!.url, title: p.title, amount: p.amount }))
    : undefined;

  return (
    <main className="min-h-screen">
      {/* S1 — Hero (aurora, live pill, border-spin pricing, slides under nav) */}
      <Hero />
      {/* S2 — Stat band */}
      <StatsStrip />
      {/* Trusted payment partners */}
      <PaymentsMarquee />
      {/* S3 — Why CK bento (count-up + live chart) */}
      <WhyChooseUs />
      {/* S4 — Three steps */}
      <HowItWorks />
      {/* S5 — Choose Your Challenge */}
      <Suspense fallback={null}>
        <ChallengeComparison config={challengeConfig} promoCode={promo?.code} />
      </Suspense>
      {/* Trading platforms (MT5 / TradeLocker) */}
      <TradingPlatforms />
      {/* S6 — Real Payouts */}
      <PayoutCarousel payouts={payoutItems} />
      {/* S7 — Testimonials */}
      <Testimonials videos={videoItems} />
      {/* S8 — Community + algo terminal */}
      <CommunityGrid />
      {/* S9 — Trader reviews */}
      <TraderReviews reviews={reviewCards} />
      {/* Support */}
      <SupportSection />
      <FaqAccordion />
      {/* S10 — Closing CTA */}
      <ClosingCta />
    </main>
  );
}
