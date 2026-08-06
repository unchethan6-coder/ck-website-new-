import type { Metadata } from "next";
import { Inter, Inter_Tight, Manrope, Sora } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { TopNav } from "@/components/sections/TopNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getActiveBanners } from "@/lib/cms";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CK Capital – Premium Prop Trading Firm | Funded Accounts Up to $1.2M | 100% Profit Split",
    template: "%s | CK Capital",
  },
  description:
    "Join CK Capital, a leading prop trading firm offering instant funded simulated accounts up to $1.2M with 100% profit splits, flexible payouts, and 24/7 support. Trade Forex, Crypto, and Commodities with no restrictions.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
    title: "CK Capital – Premium Prop Trading Firm | Funded Accounts Up to $1.2M",
    description:
      "Funded accounts up to $1.2M with up to 100% profit split. Trade Forex, Crypto, and Commodities with no restrictions.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "CK Capital – Premium Prop Trading Firm | Funded Accounts Up to $1.2M",
    description:
      "Funded accounts up to $1.2M with up to 100% profit split. Trade Forex, Crypto, and Commodities with no restrictions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data — Organization + WebSite
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-192x192.png`,
      },
      description:
        "CK Capital is a premium proprietary trading firm offering funded simulated accounts up to $1.2M with up to 100% profit split.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

// Runs before React hydrates → applies the saved (or system-preferred) theme
// synchronously to <html> so there is no light→dark flash on first paint.
const themeBootScript = `
(function () {
  try {
    // Read cookie first (matches what the server rendered), then localStorage.
    var t = null;
    var m = document.cookie.match(/(?:^|; )ck-theme=(dark|light)/);
    if (m) t = m[1];
    if (!t) t = localStorage.getItem('ck-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    var el = document.documentElement;
    el.classList.remove('light', 'dark');
    el.classList.add(t);
    el.style.colorScheme = t;
    // Sync localStorage from cookie if cookie was the source
    if (m) try { localStorage.setItem('ck-theme', t); } catch(e) {}
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the theme cookie server-side so the HTML is rendered with the correct
  // class from the start — no flash when navigating between pages.
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("ck-theme");
  const serverTheme = themeCookie?.value === "light" ? "light" : "dark";

  // Active announcement banners from the CMS (falls back to the default copy).
  const banners = await getActiveBanners();
  const bannerTexts = banners.length ? banners.map((b) => b.text) : undefined;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${manrope.variable} ${sora.variable} h-full antialiased ${serverTheme}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/*
          Runs before hydration and before other scripts so the saved theme
          class is applied to <html> at first paint (no light→dark flash).
          Using next/script with `beforeInteractive` avoids React 19's
          "Encountered a script tag while rendering React component" warning
          that inline <script> tags now produce.
        */}
        <Script id="ck-theme-boot" strategy="beforeInteractive">
          {themeBootScript}
        </Script>
        <ThemeProvider>
          <AnnouncementBar banners={bannerTexts} />
          <TopNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
