import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AdLandingPage } from "@/components/sections/AdLandingPage";

/**
 * Landing page for Meta ads: the homepage with the content Meta's advertising
 * standards object to taken out. See components/sections/AdLandingPage.tsx.
 * Kept out of search results and the sitemap; the homepage is the organic page.
 */

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adLanding" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDesc"),
    robots: { index: false, follow: false },
    openGraph: { title: t("metaTitle"), description: t("metaDesc"), images: ["/og-image.jpg"] },
  };
}

export default function LandingPage() {
  return <AdLandingPage />;
}
