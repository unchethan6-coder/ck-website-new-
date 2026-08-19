import { RewardsPageClient } from "@/components/sections/RewardsPageClient";
import { getFirmReviews, getPayouts, getRewardsSummary, getVideoReviews } from "@/lib/cms";
import { trustpilotReviewCards } from "@/components/sections/TraderReviews";
import type { CmsFirmReview } from "@/lib/cms";

export const revalidate = 300;

export default async function PayoutsPage() {
  const [payouts, videos, cmsReviews, summary] = await Promise.all([
    getPayouts(),
    getVideoReviews(),
    getFirmReviews(),
    getRewardsSummary(),
  ]);

  // Use CMS reviews with real author names, or fall back to Trustpilot reviews
  const realCmsReviews = cmsReviews.filter(
    (r) => r.authorName && r.authorName.trim().length > 0 && !/^verified trader$/i.test(r.authorName.trim())
  );
  const reviews: CmsFirmReview[] = realCmsReviews.length > 0
    ? realCmsReviews
    : trustpilotReviewCards.map((r, i) => ({
        id: i,
        summary: r.text,
        rating: r.rating,
        body: [],
        publishedAt: new Date().toISOString(),
        authorName: r.name,
        countryName: r.location,
        countryCode: null,
        source: r.source,
        verified: undefined,
      }));

  return <RewardsPageClient payouts={payouts} videos={videos} reviews={reviews} summary={summary} />;
}
