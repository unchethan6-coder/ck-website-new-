import type { Metadata } from "next";
import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { LeadLanding } from "@/components/landing/LeadLanding";
import { COUNTRY_CODES, COUNTRY_OPTIONS } from "@/lib/leads/countries";
import { SITE_URL } from "@/lib/seo";

// Reads the visitor's country to preselect it, so it renders per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Get 80% Off All Challenges | CK PropFirm" },
  description: "Answer a few quick questions to unlock your exclusive CK PropFirm 80% discount.",
  metadataBase: new URL(SITE_URL),
  // A campaign page for paid traffic, not for search results.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Get 80% Off All Challenges | CK PropFirm",
    description: "Answer a few quick questions to unlock your exclusive 80% discount.",
    images: ["/og-image.jpg"],
  },
};

export default async function EightyOffPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const h = await headers();
  const geo = (h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || "").toUpperCase();
  return <LeadLanding countries={COUNTRY_OPTIONS} defaultCountry={COUNTRY_CODES.includes(geo) ? geo : null} />;
}
