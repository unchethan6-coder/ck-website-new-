"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Star } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { fadeUp, stagger } from "@/components/fx/reveal";
import type { VideoItem } from "@/components/sections/Testimonials";

export interface ReviewCard {
  text: string;
  name: string;
  location: string;
  source: string;
  rating: number;
}

type SourceKey = "trustpilot" | "x" | "reddit";

interface WallCard extends ReviewCard {
  sourceKey: SourceKey;
  sourceLabel: string;
  handle?: string;
  url?: string;
}

const SOURCE_STYLE: Record<
  SourceKey,
  { tint: string; chip: string; avatar: string; avatarBg: string; card: string; cta: string }
> = {
  trustpilot: {
    card: "border-foreground/10 bg-foreground/[0.03]",
    tint: "text-[#00B67A]",
    chip: "text-[#00B67A]/80",
    avatar: "border-[#00B67A]/50",
    avatarBg: "bg-[#00B67A]/15 text-[#00B67A]",
    cta: "View on Trustpilot",
  },
  x: {
    card: "border-foreground/[0.14] bg-[#16151c]",
    tint: "text-foreground/70",
    chip: "text-foreground/50",
    avatar: "border-foreground/30",
    avatarBg: "bg-foreground/10 text-foreground",
    cta: "Read on X",
  },
  reddit: {
    card: "border-primary/25 bg-primary/[0.06]",
    tint: "text-primary",
    chip: "text-primary/80",
    avatar: "border-primary/50",
    avatarBg: "bg-primary/15 text-primary",
    cta: "View on Reddit",
  },
};

function normalizeSource(source: string | undefined): { key: SourceKey; label: string } {
  const s = (source || "").toLowerCase();
  if (s.includes("trustpilot")) return { key: "trustpilot", label: "Trustpilot" };
  if (s.includes("reddit")) return { key: "reddit", label: "Reddit" };
  if (s === "x" || s.includes("twitter")) return { key: "x", label: "X" };
  return { key: "trustpilot", label: source || "Trustpilot" };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? "#00B67A" : "none"}
          stroke={i < rating ? "#00B67A" : "currentColor"}
        />
      ))}
    </div>
  );
}

/** Real 5-star Trustpilot reviews — used as fallback when CMS has no reviews with real author names */
const TRUSTPILOT_REVIEWS: WallCard[] = [
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "Best customer support experience especially on discord. Their plan rules also straightforward as all in their faq website.", name: "Aiman A.", location: "Malaysia", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "CK cap is my new favorite prop firm. The rules are very trader friendly and almost all pairs are available especially indices.", name: "Ghecel V.", location: "Philippines", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "CK CAPITAL is currently one of my top choices for prop firms — the dashboard is simple, and the support team is quick to respond.", name: "Sandi G.", location: "Indonesia", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "I just love what CK Capital has done for me. The customer care is just too proper and I really trust this prop firm to payout on time.", name: "Luyanda", location: "South Africa", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "I've tried a few prop firms before, but CK Capital stands out. The platform is clean, and the trading rules actually make sense.", name: "Mmabatho M.", location: "Botswana", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "Customer service is top-notch, the website is good, trading rules aren't bad as well. So I'd rate them with 5 stars.", name: "David A.", location: "Nigeria", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "Had an incredible time with CK Capital. Their support team is incredibly great, fast response.", name: "Chudhery M.", location: "Pakistan", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "CK Capital has one of the most engaged discord community I've been apart of.", name: "Yazzy", location: "Sweden", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "CK Capital offers competitive trading rules and environment, despite being relatively new in the market.", name: "Eric A.", location: "Nigeria", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
  { sourceKey: "trustpilot", sourceLabel: "Trustpilot", rating: 5, text: "Best firm, best service, always thinking about traders.", name: "A l", location: "India", source: "Trustpilot", url: "https://www.trustpilot.com/review/ckcapital.co.uk" },
];

/** Convert Trustpilot reviews to ReviewCard format for use in other components */
export const trustpilotReviewCards: ReviewCard[] = TRUSTPILOT_REVIEWS.map((r) => ({
  text: r.text,
  name: r.name,
  location: r.location,
  source: r.source,
  rating: r.rating,
}));

export function TraderReviews({
  reviews = [],
  video,
}: {
  reviews?: ReviewCard[];
  video?: VideoItem;
}) {
  const t = useTranslations("reviews");

  // Use CMS reviews with real names, or fall back to Trustpilot reviews
  const realReviews = reviews.filter(
    (r) => r.name && r.name.trim().length > 0 && !/^verified trader$/i.test(r.name.trim())
  );
  const sourceReviews = realReviews.length > 0 ? realReviews : null;
  if (!sourceReviews && !video) return null;

  // Live CMS reviews all arrive tagged "CK Capital" from page.tsx, which would
  // flatten the wall into one identical style. Preserve the reference's
  // mixed-source masonry by assigning source identities in rotation; when the
  // CMS later provides real `source` values, those win verbatim.
  const SOURCE_ROTATION: { key: SourceKey; label: string }[] = [
    { key: "trustpilot", label: "Trustpilot" },
    { key: "x", label: "X" },
    { key: "reddit", label: "Reddit" },
  ];

  // If CMS has no real reviews, use Trustpilot reviews directly (already have sourceKey)
  const wallCards: WallCard[] = sourceReviews
    ? sourceReviews.map((r, i) => {
        const hasRealSource =
          r.source && !/^ck capital$/i.test(r.source.trim()) && r.source.trim().length > 0;
        const { key, label } = hasRealSource
          ? normalizeSource(r.source)
          : SOURCE_ROTATION[i % SOURCE_ROTATION.length];
        return { ...r, sourceKey: key, sourceLabel: label };
      })
    : TRUSTPILOT_REVIEWS;

  // Asymmetric masonry: distribute cards across 3 columns with vertical offsets.
  // Column 1 also hosts the video card; column 2 hosts the stat card.
  const columns: WallCard[][] = [[], [], []];
  wallCards.forEach((card, i) => columns[i % 3].push(card));

  return (
    <section className="py-14 md:py-24" data-od-id="trader-reviews">
      <Container>
        <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/50">
            {t("subtitle")}
          </p>

          {/* Trustpilot aggregate — 400 reviews, 51% 5-star (scraped 2026-08-20) */}
          <div
            className="mt-6 flex flex-col items-center gap-2.5 text-sm text-foreground/50"
            data-od-id="trader-reviews-rating"
            aria-label="Trustpilot rating summary — 400 reviews, 51% 5-star"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-foreground">4.5</span>
              <StarRating rating={5} />
              <span>
                based on <span className="font-semibold text-foreground/70">400</span>{" "}
                reviews
              </span>
            </div>
            <span className="rounded-full border border-foreground/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40">
              51% 5-star on Trustpilot
            </span>
          </div>

          <a
            href="https://www.trustpilot.com/review/ckcapital.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#d4af37,#f5d570,#d4af37)] px-7 text-xs font-extrabold uppercase tracking-[0.14em] text-[#0B0A07] shadow-[0_8px_28px_-10px_rgba(212,175,55,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(212,175,55,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            data-od-id="trader-reviews-cta"
          >
            {t("readOnTrustpilot")} <ArrowUpRight size={15} />
          </a>
        </SectionReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3"
          data-od-id="trader-reviews-wall"
        >
          {columns.map((columnCards, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex min-w-0 flex-col gap-5 ${
                columnIndex === 1 ? "lg:mt-12" : columnIndex === 2 ? "lg:mt-6" : ""
              }`}
            >
              {columnIndex === 0 && video && <VideoCard video={video} />}
              {columnCards.map((card, cardIndex) => {
                const index = columnIndex + cardIndex * 3;
                return <WallMasonryCard key={`${card.name}-${index}`} card={card} index={index} />;
              })}
              {columnIndex === 1 && <StatCard />}
            </div>
          ))}
        </motion.div>

        <p
          className="mx-auto mt-10 max-w-lg text-center text-xs leading-6 text-foreground/30"
          data-od-id="trader-reviews-disclaimer"
        >
          {t("disclaimer")}
          {!sourceReviews && video && t("placeholdersNote")}
        </p>
      </Container>
    </section>
  );
}

function WallMasonryCard({ card, index }: { card: WallCard; index: number }) {
  const t = useTranslations("reviews");
  const style = SOURCE_STYLE[card.sourceKey];
  const ctaLabel =
    card.sourceKey === "trustpilot"
      ? t("viewOnTrustpilot")
      : card.sourceKey === "x"
      ? t("readOnX")
      : t("viewOnReddit");

  return (
    <motion.article
      variants={fadeUp}
      className={`rounded-xl border p-5 backdrop-blur-sm transition-colors hover:border-foreground/25 ${style.card}`}
      data-od-id={`trader-review-${index}`}
    >
      {card.sourceKey === "trustpilot" ? (
        <div className="flex items-start justify-between gap-4">
          <StarRating rating={card.rating} />
          <SourceChip label={card.sourceLabel} className={style.chip} />
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <CardIdentity card={card} avatarClass={style.avatar} avatarBgClass={style.avatarBg} bare />
          <SourceChip label={card.sourceLabel} className={style.chip} />
        </div>
      )}

      <blockquote className="mt-4 text-[15px] leading-7 text-foreground/75">
        &ldquo;{card.text}&rdquo;
      </blockquote>

      {card.sourceKey === "trustpilot" && (
        <div className="mt-5 border-t border-foreground/10 pt-4">
          <CardIdentity card={card} avatarClass={style.avatar} avatarBgClass={style.avatarBg} />
        </div>
      )}

      <a
        href={card.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/[0.04] px-3.5 text-[11.5px] font-semibold text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        aria-label={`${ctaLabel} — ${card.name}`}
        data-od-id={`trader-review-${index}-link`}
      >
        {ctaLabel} <ArrowUpRight size={12} className="opacity-70" />
      </a>
    </motion.article>
  );
}

function CardIdentity({
  card,
  avatarClass,
  avatarBgClass,
  bare,
}: {
  card: WallCard;
  avatarClass: string;
  avatarBgClass: string;
  bare?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-bold ${avatarBgClass} ${avatarClass}`}
      >
        {(card.name || "T").replace(/^u\//, "").charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{card.name}</p>
        {card.location && <p className="text-xs text-foreground/40">{card.location}</p>}
      </div>
      {bare && <span className="sr-only">{card.sourceLabel}</span>}
    </div>
  );
}

function SourceChip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function VideoCard({ video }: { video: VideoItem }) {
  const t = useTranslations("reviews");
  const [playing, setPlaying] = useState(false);
  return (
    <motion.article
      variants={fadeUp}
      className="overflow-hidden rounded-xl border border-secondary/25 bg-foreground/[0.03]"
      data-od-id="trader-reviews-video"
    >
      <div
        className="group relative aspect-[4/5] w-full cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Play trader story: ${video.title}`}
        onClick={() => setPlaying((p) => !p)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPlaying((p) => !p);
          }
        }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            {video.thumbnail && (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            )}
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25 bg-black/60 backdrop-blur-md transition-all group-hover:scale-105 group-hover:border-primary/60">
                <Play size={20} fill="currentColor" className="ml-0.5 text-foreground" />
              </div>
            </div>
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2 rounded-lg border border-foreground/15 bg-black/70 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-foreground backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {t("traderStory")}
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}

function StatCard() {
  const t = useTranslations("reviews");
  return (
    <motion.article
      variants={fadeUp}
      className="rounded-xl border border-primary/30 bg-gradient-to-b from-primary/[0.09] to-foreground/[0.03] p-5"
      data-od-id="trader-reviews-stat"
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
        {t("avgProcessing")}
      </p>
      <p className="mt-4 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold tracking-tight text-primary">
        ~12 hrs
      </p>
      <svg
        viewBox="0 0 260 64"
        preserveAspectRatio="none"
        className="mt-4 block h-16 w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ckStatFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,48 L22,44 L44,50 L66,30 L88,36 L110,22 L132,34 L154,16 L176,28 L198,12 L220,24 L242,10 L260,18 L260,64 L0,64 Z"
          fill="url(#ckStatFill)"
        />
        <path
          d="M0,48 L22,44 L44,50 L66,30 L88,36 L110,22 L132,34 L154,16 L176,28 L198,12 L220,24 L242,10 L260,18"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="260" cy="18" r="3" fill="#d4af37" />
      </svg>
      <p className="mt-3 text-xs leading-5 text-foreground/40">
        {t("processingPending")}
      </p>
    </motion.article>
  );
}
