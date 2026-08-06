import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Affiliate Program – Earn Up to 25% Commission",
  description:
    "Partner with CK Capital and earn up to 25% recurring commissions plus $250 per qualified referral. Ideal for trading creators and communities. Transparent terms.",
  path: "/affiliates",
});

export default function AffiliatesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
