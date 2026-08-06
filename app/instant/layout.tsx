import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Instant Funding – Start Trading Immediately | Up to $50K",
  description:
    "Skip the evaluation process and get funded immediately. Instant Funding accounts from $5K to $50K with up to 100% profit split and 24/7 support.",
  path: "/instant",
});

export default function InstantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
