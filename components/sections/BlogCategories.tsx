"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import type { CmsArticle } from "@/lib/cms";
import { cn } from "@/lib/utils";

/**
 * "Built by traders, for traders" — exact clone of FundingPips media showcase,
 * re-themed to CK Capital (light #FFFFFF, matching ProofShowcase / ChallengeComparison / TraderStories).
 * Stock trader photos as placeholders + 3.5s auto-scroll, pause on hover, resume 5s after click.
 */

const CATEGORIES: {
  key: CmsArticle["category"];
  labelKey: "catNews" | "catTips" | "catEducation";
}[] = [
  { key: "news", labelKey: "catNews" },
  { key: "trading-tips", labelKey: "catTips" },
  { key: "education", labelKey: "catEducation" },
];

const FALLBACK_IMAGES: Record<CmsArticle["category"], string> = {
  news: "/images/blog/stock-news.jpg",
  "trading-tips": "/images/testimonials/hqdefault-ae10a042fa.jpg",
  education: "/images/testimonials/hqdefault-9c0405cb37.jpg",
};

export function BlogCategories({ articles }: { articles: CmsArticle[] }) {
  const t = useTranslations("insights");
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [pausedByClick, setPausedByClick] = useState(false);

  const latestByCategory = useMemo(() => {
    const map: Record<string, CmsArticle | null> = {};
    for (const cat of CATEGORIES) {
      map[cat.key] =
        articles
          .filter((a) => a.category === cat.key)
          .sort(
            (a, b) =>
              new Date(b.publishedAt ?? 0).getTime() -
              new Date(a.publishedAt ?? 0).getTime()
          )[0] ?? null;
    }
    return map;
  }, [articles]);

  const active = CATEGORIES[activeIdx];
  const activeArticle = latestByCategory[active.key];
  const cover = activeArticle?.coverImage?.url ?? FALLBACK_IMAGES[active.key];

  // Auto-scroll: 3.5s interval, pause on hover, respect reduced-motion, resume 5s after manual click
  // Use refs so hover pause doesn't teardown the interval (more reliable than effect deps)
  const hoveredRef = useRef(isHovered);
  const pausedRef = useRef(pausedByClick);
  useEffect(() => { hoveredRef.current = isHovered; }, [isHovered]);
  useEffect(() => { pausedRef.current = pausedByClick; }, [pausedByClick]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (hoveredRef.current || pausedRef.current) return;
      setActiveIdx((i) => (i + 1) % CATEGORIES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const selectIdx = (i: number) => {
    setActiveIdx(i);
    setPausedByClick(true);
    window.setTimeout(() => setPausedByClick(false), 5000);
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-16 text-[#0A0A0C] md:py-24"
      data-od-id="blog-categories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <Container>
        {/* Header — centered, tight, matching ProofShowcase / ChallengeComparison / TraderStories */}
        <SectionReveal className="text-center">
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.02em] text-[#0A0A0C] sm:text-4xl md:text-5xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-gray-500">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Featured panel — lightened (was dark bg-[#0A0A0C]) */}
        <SectionReveal delay={0.08} className="mt-8 sm:mt-10">
          <div
            className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.12)]"
            data-od-id="blog-featured"
          >
            {/* Fixed heights to match reference (not tall aspect) */}
            <div className="relative h-[360px] sm:h-[420px] lg:h-[480px]">
              <Image
                key={active.key}
                src={cover}
                alt={activeArticle?.title ?? t(active.labelKey)}
                fill
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1100px"
                priority={false}
              />
              {/* Subtle overlay — photo stays crisp, text gets contrast via scrim */}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {/* Centered content — white on photo via contrast scrim */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-xs">
                  {t(active.labelKey)}
                </p>
                <h3 className="max-w-3xl text-balance font-[family-name:var(--font-inter-tight)] text-[22px] font-bold leading-[1.15] text-white sm:text-[28px] md:text-[30px] [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
                  {activeArticle ? activeArticle.title : t("comingSoon")}
                </h3>
                {activeArticle ? (
                  <Link
                    href={`/blog/${activeArticle.slug}`}
                    className="mt-2 inline-flex min-h-[38px] items-center justify-center rounded-full border border-white/70 bg-white/10 px-5 text-[13px] font-semibold text-white backdrop-blur-[6px] transition-colors hover:border-white hover:bg-white hover:text-[#0A0A0C]"
                    data-od-id="blog-featured-cta"
                  >
                    {t("readLatest")}
                  </Link>
                ) : (
                  <Link
                    href="/blog"
                    className="mt-2 inline-flex min-h-[38px] items-center justify-center rounded-full border border-white/70 bg-white/10 px-5 text-[13px] font-semibold text-white backdrop-blur-[6px] transition-colors hover:border-white hover:bg-white hover:text-[#0A0A0C]"
                    data-od-id="blog-featured-cta"
                  >
                    {t("visitBlog")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Category selector cards — lightened (was dark overlay) */}
        <div className="relative z-10 mx-auto -mt-[52px] grid max-w-[980px] grid-cols-1 gap-3 px-2 sm:-mt-[68px] sm:grid-cols-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const article = latestByCategory[cat.key];
            const cardCover = article?.coverImage?.url ?? FALLBACK_IMAGES[cat.key];
            const isActive = i === activeIdx;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => selectIdx(i)}
                aria-pressed={isActive}
                data-od-id={`blog-cat-${cat.key}`}
                className={cn(
                  "group relative h-[148px] w-full overflow-hidden rounded-2xl border bg-white text-left shadow-[0_12px_28px_-16px_rgba(15,23,42,0.12)] transition-all sm:h-[164px]",
                  isActive
                    ? "border-[#FFC107] ring-2 ring-[#FFC107] ring-offset-2 ring-offset-white"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                )}
              >
                <Image
                  src={cardCover}
                  alt={t(cat.labelKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="312px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 pr-[88px] sm:p-4 sm:pr-20">
                  <p className="font-[family-name:var(--font-inter-tight)] text-[13.5px] font-bold leading-none text-white">
                    {t(cat.labelKey)}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[11.5px] font-medium leading-[1.45] text-white/75">
                    {article ? article.title : t("comingSoon")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Slide indicators — tiny centered dashes like reference */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => selectIdx(i)}
              aria-label={`${t(cat.labelKey)} slide`}
              className={cn(
                "h-1 rounded-full transition-all",
                i === activeIdx ? "w-7 bg-[#0A0A0C]" : "w-3.5 bg-[#E5E7EB] hover:bg-[#D1D5DB]"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
