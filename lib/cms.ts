// Strapi CMS client — server-only module.
// Import this from server components / route handlers only.
// Every fetcher degrades gracefully: on any error, empty result, or missing
// content type, callers fall back to their static defaults.

import { SITE_META } from "@/lib/content";
import type { ChallengeType } from "@/lib/content";

export const CMS_BRAND_SLUG = "ck-capital";
export const CMS_FIRM_SLUG = "ck-capital";

const BASE_URL = process.env.STRAPI_BASE_URL ?? "https://cms.fundedproptraders.com";
const API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";
const DEFAULT_REVALIDATE = 300;

/* ─────────────────────────────── media ─────────────────────────────── */

export interface CmsMedia {
  id: number;
  documentId: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width?: number; height?: number }>;
}

/** Unwrap flattened, REST `data`, and `attributes` media payloads. */
function unwrapMedia(media: any): any {
  const item = Array.isArray(media) ? media[0] : media;
  return item?.data ? unwrapMedia(item.data) : item?.attributes ?? item;
}

/** Normalise a Strapi v5 media object into a full absolute URL, or null. */
function mediaUrl(media: any): string | null {
  const raw = unwrapMedia(media);
  const url: string | undefined = raw?.url;
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${BASE_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

/** Pick the largest usable format for a media object (for next/image density). */
function mediaFormats(media: any): Record<string, { url: string; width?: number; height?: number }> | undefined {
  const raw = unwrapMedia(media);
  const formats: Record<string, { url: string; width?: number; height?: number }> = raw?.formats;
  if (!formats) return undefined;
  const out: Record<string, { url: string; width?: number; height?: number }> = {};
  for (const [k, v] of Object.entries(formats)) {
    out[k] = { url: mediaUrl(v) ?? "", width: (v as any)?.width, height: (v as any)?.height };
  }
  return out;
}

function toMedia(raw: any): CmsMedia | null {
  const m = unwrapMedia(raw);
  if (!m?.url) return null;
  return {
    id: m.id,
    documentId: m.documentId,
    name: m.name,
    url: mediaUrl(m) as string,
    width: m.width,
    height: m.height,
    formats: mediaFormats(m),
  };
}

/* ─────────────────────────────── core fetch ─────────────────────────────── */

async function cmsFetch<T>(path: string, revalidate = DEFAULT_REVALIDATE): Promise<T | null> {
  if (!API_TOKEN) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${BASE_URL}/api/${path}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
      signal: controller.signal,
      next: { revalidate, tags: ["cms"] },
      cache: undefined,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ─────────────────────────────── articles (blog) ─────────────────────────────── */

export type ArticleCategory = "news" | "trading-tips" | "education";

export interface CmsArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: CmsMedia | null;
  author: string;
  category: ArticleCategory;
  isFeatured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string;
  body: any[]; // Strapi v5 blocks
}

export const ARTICLE_CATEGORIES: { label: string; value: ArticleCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "News", value: "news" },
  { label: "Trading Tips", value: "trading-tips" },
  { label: "Education", value: "education" },
];

function mapArticle(raw: any): CmsArticle | null {
  if (!raw || typeof raw !== "object") return null;
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title ?? "Untitled",
    slug: raw.slug,
    excerpt: raw.excerpt ?? null,
    coverImage: toMedia(raw.cover_image),
    author: raw.author ?? "CK Capital",
    category: raw.category ?? "news",
    isFeatured: Boolean(raw.is_featured),
    seoTitle: raw.seo_title ?? null,
    seoDescription: raw.seo_description ?? null,
    publishedAt: raw.publishedAt,
    body: Array.isArray(raw.body) ? raw.body : [],
  };
}

export interface GetArticlesOptions {
  category?: ArticleCategory | "all";
}

export async function getArticles(opts: GetArticlesOptions = {}): Promise<CmsArticle[]> {
  const params = new URLSearchParams();
  params.set("pagination[pageSize]", "100");
  params.set("filters[brand][slug][$eq]", CMS_BRAND_SLUG);
  if (opts.category && opts.category !== "all") params.set("filters[category][$eq]", opts.category);
  params.set("sort", "publishedAt:desc");
  params.set("populate[cover_image]", "true");
  const res = await cmsFetch<any>(`articles?${params.toString()}`);
  if (!res?.data) return [];
  const articles = res.data
    .map((raw: any) => mapArticle(raw))
    .filter((a: CmsArticle | null): a is CmsArticle => a !== null);
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("filters[brand][slug][$eq]", CMS_BRAND_SLUG);
  params.set("populate[cover_image]", "true");
  params.set("populate[seo_image]", "true");
  const res = await cmsFetch<any>(`articles?${params.toString()}`);
  const raw = res?.data?.[0];
  return raw ? mapArticle(raw) : null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await getArticles();
  return articles.map((a) => a.slug);
}

/* ─────────────────────────────── firm reviews ─────────────────────────────── */

export interface CmsFirmReview {
  id: number;
  summary: string;
  rating: number;
  body: any[];
  publishedAt: string;
  authorName?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
  source?: string | null;
  verified?: boolean;
}

export async function getFirmReviews(): Promise<CmsFirmReview[]> {
  const params = new URLSearchParams();
  params.set("filters[firmSlug][$eq]", CMS_FIRM_SLUG);
  params.set("pagination[pageSize]", "50");
  params.set("sort", "createdAt:desc");
  const res = await cmsFetch<any>(`firm-reviews?${params.toString()}`);
  if (!res?.data) return [];
  return res.data
    .map((r: any) => ({
      id: r.id,
      summary: r.summary ?? "",
      rating: typeof r.rating === "number" ? r.rating : 0,
      body: Array.isArray(r.body) ? r.body : [],
      publishedAt: r.publishedAt,
      authorName: r.authorName ?? r.author_name ?? null,
      countryName: r.countryName ?? r.country_name ?? null,
      countryCode: r.countryCode ?? r.country_code ?? null,
      source: r.source ?? null,
      verified: r.verified === undefined ? undefined : Boolean(r.verified),
    }))
    .filter((r: CmsFirmReview) => r.summary);
}

/* ─────────────────────────────── video reviews ─────────────────────────────── */

export interface CmsVideoReview {
  id: number;
  youtubeVideoId: string;
  title: string;
  publishedAt: string;
  authorName?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
  qualifiedAnalyst?: boolean;
  reward?: string | null;
  description?: string | null;
  source?: string | null;
  thumbnail?: CmsMedia | null;
}

export async function getVideoReviews(): Promise<CmsVideoReview[]> {
  const params = new URLSearchParams();
  params.set("filters[firmSlug][$eq]", CMS_FIRM_SLUG);
  params.set("pagination[pageSize]", "50");
  params.set("sort", "createdAt:desc");
  params.set("populate[thumbnail]", "true");
  const res = await cmsFetch<any>(`video-reviews?${params.toString()}`);
  if (!res?.data) return [];
  return res.data
    .map((r: any) => ({
      id: r.id,
      youtubeVideoId: r.youtubeVideoId ?? "",
      title: r.title ?? "",
      publishedAt: r.publishedAt,
      authorName: r.authorName ?? r.author_name ?? null,
      countryName: r.countryName ?? r.country_name ?? null,
      countryCode: r.countryCode ?? r.country_code ?? null,
      qualifiedAnalyst:
        r.qualifiedAnalyst === undefined && r.qualified_analyst === undefined
          ? undefined
          : Boolean(r.qualifiedAnalyst ?? r.qualified_analyst),
      reward: r.reward ?? null,
      description: r.description ?? null,
      source: r.source ?? null,
      thumbnail: toMedia(r.thumbnail),
    }))
    .filter((r: CmsVideoReview) => r.youtubeVideoId);
}

/* ─────────────────────────────── promos ─────────────────────────────── */

export interface CmsPromo {
  id: number;
  code: string;
  title: string | null;
  subtitle: string | null;
  ctaLabel: string | null;
  discountLabel: string | null;
}

export async function getActivePromo(): Promise<CmsPromo | null> {
  const params = new URLSearchParams();
  params.set("filters[active][$eq]", "true");
  params.set("pagination[pageSize]", "1");
  params.set("sort", "sortOrder:asc");
  const res = await cmsFetch<any>(`promos?${params.toString()}`);
  const raw = res?.data?.[0];
  if (!raw) return null;
  return {
    id: raw.id,
    code: raw.code ?? SITE_META.promoCode,
    title: raw.title ?? null,
    subtitle: raw.subtitle ?? null,
    ctaLabel: raw.ctaLabel ?? null,
    discountLabel: raw.discountLabel ?? null,
  };
}

/* ─────────────────────────────── banners ─────────────────────────────── */

export interface CmsBanner {
  id: number;
  text: string;
  link: string | null;
}

export async function getActiveBanners(): Promise<CmsBanner[]> {
  const params = new URLSearchParams();
  params.set("filters[active][$eq]", "true");
  params.set("pagination[pageSize]", "20");
  params.set("sort", "createdAt:asc");
  const res = await cmsFetch<any>(`banners?${params.toString()}`);
  if (!res?.data) return [];
  return res.data
    .map((b: any) => ({ id: b.id, text: b.text ?? "", link: b.link ?? null }))
    .filter((b: CmsBanner) => b.text);
}

/* ─────────────────────────────── payouts ─────────────────────────────── */

export interface CmsPayout {
  id: number;
  title: string | null;
  amount: string | null;
  image: CmsMedia | null;
  currency?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
  approvedAt?: string | null;
  verificationStatus?: string | null;
  publicDisplay?: boolean;
  certificateUrl?: string | null;
}

export async function getPayouts(): Promise<CmsPayout[]> {
  const params = new URLSearchParams();
  params.set("pagination[pageSize]", "50");
  params.set("sort", "createdAt:desc");
  params.set("populate[image]", "true");
  const res = await cmsFetch<any>(`payouts?${params.toString()}`);
  if (!res?.data) return [];
  return res.data
    .map((p: any) => ({
      id: p.id,
      title: p.title ?? null,
      amount: p.amount ?? null,
      image: toMedia(p.image),
      currency: p.currency ?? "USD",
      countryName: p.countryName ?? p.country_name ?? null,
      countryCode: p.countryCode ?? p.country_code ?? null,
      approvedAt: p.approvedAt ?? p.approved_at ?? p.publishedAt ?? null,
      verificationStatus: p.verificationStatus ?? p.verification_status ?? null,
      publicDisplay:
        p.publicDisplay === undefined && p.public_display === undefined
          ? undefined
          : Boolean(p.publicDisplay ?? p.public_display),
      certificateUrl: p.certificateUrl ?? p.certificate_url ?? null,
    }))
    .filter((p: CmsPayout) => p.image || p.certificateUrl);
}

export interface CmsRewardsSummary {
  totalRewards: number | null;
  analystsRewarded: number | null;
  countries: number | null;
  maxRewardPercent: number | null;
  asOf: string | null;
}

/** Optional single-type summary. Missing CMS content intentionally returns null. */
export async function getRewardsSummary(): Promise<CmsRewardsSummary | null> {
  const res = await cmsFetch<any>("rewards-summary?populate=*");
  const raw = res?.data?.attributes ?? res?.data;
  if (!raw || typeof raw !== "object") return null;
  const numberOrNull = (value: unknown) =>
    typeof value === "number" && Number.isFinite(value) ? value : null;
  return {
    totalRewards: numberOrNull(raw.totalRewards ?? raw.total_rewards),
    analystsRewarded: numberOrNull(raw.analystsRewarded ?? raw.analysts_rewarded),
    countries: numberOrNull(raw.countries),
    maxRewardPercent: numberOrNull(raw.maxRewardPercent ?? raw.max_reward_percent),
    asOf: typeof raw.asOf === "string" ? raw.asOf : typeof raw.as_of === "string" ? raw.as_of : null,
  };
}

/* ─────────────────────────────── challenge config ─────────────────────────────── */

export interface ChallengeSizeRule {
  phase1: string;
  phase2: string;
  maxDaily: string;
  maxLoss: string;
  consistency: string;
}

export interface ChallengePrice {
  price: string;
  oldPrice: string;
}

export interface ChallengeConfig {
  rules: Record<ChallengeType, Record<string, ChallengeSizeRule>>;
  prices: Record<ChallengeType, Record<string, ChallengePrice>>;
  splits: Record<ChallengeType, string>;
  access: string[];
  sizes: string[];
}

/**
 * Fetch the challenge configuration single-type. The CMS entry is a JSON blob
 * mirroring the static content model; unknown/missing keys fall back to the
 * static defaults so a partial or empty CMS entry can never break the UI.
 */
export async function getChallengeConfig(): Promise<ChallengeConfig | null> {
  const res = await cmsFetch<any>("challenge-config?populate=*");
  const raw = res?.data;
  const cfg = raw?.config ?? raw;
  if (!cfg || typeof cfg !== "object") return null;
  return normalizeChallengeConfig(cfg);
}

// Lazy import of static content to avoid circular import at module scope.
function staticRules(): ChallengeConfig["rules"] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require("@/lib/content");
  return content.CHALLENGE_RULES;
}

function staticPrices(): ChallengeConfig["prices"] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require("@/lib/content");
  return content.CHALLENGE_PRICES;
}

function staticSplits(): ChallengeConfig["splits"] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require("@/lib/content");
  return content.CHALLENGE_SPLITS;
}

function staticAccess(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require("@/lib/content");
  return content.CHALLENGE_ACCESS;
}

function staticSizes(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const content = require("@/lib/content");
  return content.ACCOUNT_SIZES;
}

export function normalizeChallengeConfig(cfg: Record<string, unknown>): ChallengeConfig {
  const rules = staticRules();
  const prices = staticPrices();
  const splits = staticSplits();

  const cRules = (cfg.rules ?? {}) as Record<string, Record<string, ChallengeSizeRule>>;
  const cPrices = (cfg.prices ?? {}) as Record<string, Record<string, ChallengePrice>>;
  const cSplits = (cfg.splits ?? {}) as Record<string, string>;
  const cAccess = Array.isArray(cfg.access) ? cfg.access : null;
  const cSizes = Array.isArray(cfg.sizes) ? cfg.sizes : null;

  const types = Object.keys(rules) as ChallengeType[];

  const outRules = { ...rules };
  const outPrices = { ...prices };
  const outSplits = { ...splits };

  for (const t of types) {
    if (cRules[t]) {
      outRules[t] = { ...rules[t], ...cRules[t] };
    }
    if (cPrices[t]) {
      outPrices[t] = { ...prices[t], ...cPrices[t] };
    }
    if (typeof cSplits[t] === "string") {
      outSplits[t] = cSplits[t];
    }
  }

  return {
    rules: outRules,
    prices: outPrices,
    splits: outSplits,
    access: cAccess?.length ? cAccess : staticAccess(),
    sizes: cSizes?.length ? cSizes : staticSizes(),
  };
}
