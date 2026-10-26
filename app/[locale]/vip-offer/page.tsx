import type { Metadata } from "next";
import { HomePage } from "@/components/sections/HomePage";

/**
 * The private 90% OFF copy of the homepage, for marketing links. See
 * lib/vipOffer.ts. Hidden from search, absent from the sitemap and unlinked.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function VipOfferPage() {
  return <HomePage vip />;
}
