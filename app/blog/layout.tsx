import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Blog – Trading Insights & Market Analysis",
  description:
    "Trading insights, market analysis, risk management tips, and success stories from the CK Capital community.",
  path: "/blog",
});

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
