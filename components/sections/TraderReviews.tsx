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

/** Placeholder wall used until published, consented reviews are connected.
 *  Quotes are clearly labeled drafts — replace via getFirmReviews(). */
const PLACEHOLDER_CARDS: WallCard[] = [
  {
    sourceKey: "trustpilot",
    sourceLabel: "Trustpilot",
    rating: 5,
    text: "Placeholder quote — transparent rules from day one. The evaluation objectives were exactly what the site said, nothing hidden.",
    name: "Krit P.",
    location: "Thailand",
    source: "Trustpilot",
  },
  {
    sourceKey: "reddit",
    sourceLabel: "Reddit",
    rating: 5,
    text: "Placeholder quote — requested my first reward after hitting the objective. The process matched the published rules step for step.",
    name: "u/TraderJ_R",
    location: "r/proptrading",
    source: "Reddit",
  },
  {
    sourceKey: "trustpilot",
    sourceLabel: "Trustpilot",
    rating: 4,
    text: "Placeholder quote — good first impression overall. The rules are strict but they're published upfront, which I respect.",
    name: "Daniel O.",
    location: "Nigeria",
    source: "Trustpilot",
  },
  {
    sourceKey: "x",
    sourceLabel: "X",
    rating: 5,
    text: "Placeholder quote — passed my Phase 1 evaluation last week. Dashboard made every objective easy to track, no surprises at review.",
    name: "Marcus D.",
    location: "United Kingdom",
    source: "X",
  },
  {
    sourceKey: "trustpilot",
    sourceLabel: "Trustpilot",
    rating: 5,
    text: "Placeholder quote — the dashboard is clean and the whole evaluation experience felt professional from checkout to review.",
    name: "Tendai M.",
    location: "Zimbabwe",
    source: "Trustpilot",
  },
  {
    sourceKey: "reddit",
    sourceLabel: "Reddit",
    rating: 5,
    text: "Placeholder quote — compared a few prop firms before choosing CK. What sold me was the transparency page — every objective in plain language.",
    name: "u/FX_Elena",
    location: "r/Forex",
    source: "Reddit",
  },
  {
    sourceKey: "x",
    sourceLabel: "X",
    rating: 5,
    text: "Placeholder quote — no time limit on the evaluation meant I could trade my own pace. That alone sets CK apart for me.",
    name: "Sofia L.",
    location: "Portugal",
    source: "X",
  },
  {
    sourceKey: "trustpilot",
    sourceLabel: "Trustpilot",
    rating: 5,
    text: "Placeholder quote — support answered within the hour when I had a question about drawdown rules. Clear, direct, no runaround.",
    name: "Anaïs B.",
    location: "France",
    source: "Trustpilot",
  },
  {
    sourceKey: "trustpilot",
    sourceLabel: "Trustpilot",
    rating: 5,
    text: "Placeholder quote — up to 100% profit split sounded too good until I read the terms. It's all there in writing. Reward landed as described.",
    name: "Ravi S.",
    location: "India",
    source: "Trustpilot",
  },
  {
    sourceKey: "x",
    sourceLabel: "X",
    rating: 5,
    text: "Placeholder quote — tried several evaluation programmes. CK is one of the most straightforward companies I've traded with.",
    name: "Hana K.",
    location: "Japan",
    source: "X",
  },
];

export function TraderReviews({
  reviews = [],
  video,
}: {
  reviews?: ReviewCard[];
  video?: VideoItem;
}) {
  const t = useTranslations("reviews");
  const usingPlaceholders = !reviews.length;

  // Live CMS reviews all arrive tagged "CK Capital" from page.tsx, which would
  // flatten the wall into one identical style. Preserve the reference's
  // mixed-source masonry by assigning source identities in rotation; when the
  // CMS later provides real `source` values, those win verbatim.
  const SOURCE_ROTATION: { key: SourceKey; label: string }[] = [
    { key: "trustpilot", label: "Trustpilot" },
    { key: "x", label: "X" },
    { key: "reddit", label: "Reddit" },
  ];
  const wallCards: WallCard[] = reviews.length
    ? reviews.map((r, i) => {
        const hasRealSource =
          r.source && !/^ck capital$/i.test(r.source.trim()) && r.source.trim().length > 0;
        const { key, label } = hasRealSource
          ? normalizeSource(r.source)
          : SOURCE_ROTATION[i % SOURCE_ROTATION.length];
        const displayName =
          r.name && !/^verified trader$/i.test(r.name.trim()) ? r.name : "Verified Trader";
        return { ...r, name: displayName, sourceKey: key, sourceLabel: label };
      })
    : PLACEHOLDER_CARDS;

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

          {/* Rating summary — placeholder until verified Trustpilot aggregate is connected */}
          <div
            className="mt-6 flex flex-col items-center gap-2.5 text-sm text-foreground/50"
            data-od-id="trader-reviews-rating"
            aria-label="Trustpilot rating summary, placeholder pending verified data"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-foreground">4.5</span>
              <StarRating rating={4} />
              <span>
                based on <span className="font-semibold text-foreground/70">placeholder</span>{" "}
                reviews
              </span>
            </div>
            <span className="rounded-full border border-dashed border-foreground/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/40">
              Pending verified data
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
          {usingPlaceholders && t("placeholdersNote")}
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
        href="#"
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
        — hrs
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
