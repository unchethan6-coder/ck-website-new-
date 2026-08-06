import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllArticleSlugs } from "@/lib/cms";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/evaluation", priority: 0.9, changeFrequency: "weekly" },
  { path: "/instant", priority: 0.9, changeFrequency: "weekly" },
  { path: "/affiliates", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/rewards", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-conditions", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/risk-disclosure", priority: 0.2, changeFrequency: "yearly" },
  { path: "/return-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries = routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: r.priority,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllArticleSlugs();
    articleEntries = slugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // CMS unreachable — static routes only
  }

  return [...staticEntries, ...articleEntries];
}
