import { RewardsPageClient } from "@/components/sections/RewardsPageClient";
import { getFirmReviews, getPayouts, getRewardsSummary, getVideoReviews } from "@/lib/cms";

export const revalidate = 300;

export default async function PayoutsPage() {
  const [payouts, videos, reviews, summary] = await Promise.all([
    getPayouts(),
    getVideoReviews(),
    getFirmReviews(),
    getRewardsSummary(),
  ]);

  return <RewardsPageClient payouts={payouts} videos={videos} reviews={reviews} summary={summary} />;
}
