import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Rewards Program – Earn More As You Trade",
  description:
    "Earn more as you trade with CK Capital. Keep up to 100% of your simulated profits with flexible payouts, loyalty perks, and milestone bonuses. Full details are on the way.",
  path: "/rewards",
});

export default function RewardsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
