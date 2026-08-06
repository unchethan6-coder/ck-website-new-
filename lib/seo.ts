import type { Metadata } from "next";

export const SITE_URL = "https://ckcapital.co.uk";
export const SITE_NAME = "CK Capital";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "CK Capital — Premium Prop Trading Firm. Funded accounts up to $1.2M with up to 100% profit split.",
};

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: Metadata["openGraph"] extends infer _T ? { url: string; width?: number; height?: number; alt?: string }[] : never;
}

/** Build a per-page Metadata object with canonical URL, OG and Twitter cards. */
export function pageSeo({ title, description, path, type = "website", images }: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImages = images && images.length ? images : [DEFAULT_OG_IMAGE];
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}
