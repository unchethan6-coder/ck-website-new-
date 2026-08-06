import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Prop Trading Evaluations – Funded Accounts Up to $1.2M",
  description:
    "Pass our 1-Step or 2-Step prop trading evaluation to unlock a funded CK Account. Clear objectives, no time limits, up to 100% profit split, and payouts every 14 days.",
  path: "/evaluation",
});

export default function EvaluationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
