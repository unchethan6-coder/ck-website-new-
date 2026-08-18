import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const cmsHostname = (() => {
  try {
    return new URL(process.env.STRAPI_BASE_URL ?? "https://cms.fundedproptraders.com").hostname;
  } catch {
    return "cms.fundedproptraders.com";
  }
})();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: cmsHostname },
    ],
  },
};

export default withNextIntl(nextConfig);
