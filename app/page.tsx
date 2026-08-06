import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { OffersStrip } from "@/components/sections/OffersStrip";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { PaymentsMarquee } from "@/components/sections/PaymentsMarquee";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SupportSection } from "@/components/sections/SupportSection";
import { TradingPlatforms } from "@/components/sections/TradingPlatforms";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PayoutCarousel } from "@/components/sections/PayoutCarousel";
import { CommunityGrid } from "@/components/sections/CommunityGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { TraderReviews } from "@/components/sections/TraderReviews";
import { InstrumentsShowcase } from "@/components/sections/InstrumentsShowcase";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
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
      <Hero />
      {/* Section 2 — Available Offers → Trust stats → Payment partners */}
      <OffersStrip promo={promo} />
      <StatsStrip />
      <PaymentsMarquee />
      <Suspense fallback={null}>
        <ChallengeComparison config={challengeConfig} promoCode={promo?.code} />
      </Suspense>
      <TradingPlatforms />
      <WhyChooseUs />
      <PayoutCarousel payouts={payoutItems} />
      <Testimonials videos={videoItems} />
      <CommunityGrid />
      <TraderReviews reviews={reviewCards} />
      <InstrumentsShowcase />
      <HowItWorks />
      <SupportSection />
      <FaqAccordion />
    </main>
  );
}
