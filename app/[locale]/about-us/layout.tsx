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
    title: "About Us \u2013 Meet the CK Capital Team",
    description: "CK Capital is a premium prop trading firm. Learn our story, mission and vision, leadership, and the values behind funded accounts up to $1.2M with 100% profit splits.",
    path: "/about-us",
    locale: resolved,
  });
}
export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
