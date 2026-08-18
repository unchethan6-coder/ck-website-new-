import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  return pageSeo({
    title: "Prop Trading Evaluations \u2013 Funded Accounts Up to $1.2M",
    description: "Pass our 1-Step or 2-Step prop trading evaluation to unlock a funded CK Account. Clear objectives, no time limits, up to 100% profit split, and payouts every 14 days.",
    path: "/evaluation",
    locale: resolved,
  });
}
export default function EvaluationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
