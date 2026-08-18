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
    title: "Instant Funding \u2013 Start Trading Immediately | Up to $50K",
    description: "Skip the evaluation process and get funded immediately. Instant Funding accounts from $5K to $50K with up to 100% profit split and 24/7 support.",
    path: "/instant",
    locale: resolved,
  });
}
export default function InstantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
