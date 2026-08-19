"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  Globe2,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { GoldButton } from "@/components/shared/GoldButton";
import { HeroField } from "@/components/fx/HeroField";
import { Aurora } from "@/components/fx/Aurora";
import { Testimonials } from "@/components/sections/Testimonials";
import type {
  CmsFirmReview,
  CmsPayout,
  CmsRewardsSummary,
  CmsVideoReview,
} from "@/lib/cms";

type Filter = "all" | "latest" | "highest" | "country";
type AmountBand = "all" | "5k" | "10k" | "25k" | "50k" | "100k" | "200k" | "300k";

function parseAmount(value: string | null | undefined) {
  if (!value) return 0;
  const number = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value: number | null, currency = "USD") {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactMoney(value: number | null) {
  if (value === null || !Number.isFinite(value)) return null;
  return `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)}+`;
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function initials(name?: string | null) {
  return (name || "CK").slice(0, 2).toUpperCase();
}

function SectionHeading({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  id: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center" data-od-id={id}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-5xl">
        {title}
      </h2>
      {children ? <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground/55">{children}</p> : null}
    </div>
  );
}

function Unavailable({ label = "Awaiting verified CMS data" }: { label?: string }) {
  return <span className="inline-block max-w-full whitespace-normal break-words text-sm font-medium leading-5 tracking-normal text-foreground/35">{label}</span>;
}

function CertificateCard({
  payout,
  onOpen,
  index,
}: {
  payout: CmsPayout;
  onOpen: (payout: CmsPayout) => void;
  index: number;
}) {
  const amount = payout.amount ? payout.amount : null;
  const date = formatDate(payout.approvedAt);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      className="group overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.035] transition-colors hover:border-primary/35"
      data-od-id={`reward-certificate-${payout.id}`}
    >
      <button type="button" onClick={() => onOpen(payout)} className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
        <div className="relative aspect-[1.34] overflow-hidden bg-background-secondary">
          {payout.image?.url ? (
            <Image src={payout.image.url} alt={payout.title || "CK Capital reward certificate"} fill className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 92vw, 25vw" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-primary/70">
              <FileCheck2 size={28} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Certificate file</span>
            </div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-[family-name:var(--font-inter-tight)] text-sm font-bold text-foreground">{payout.title || "Trader"}</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-foreground/40"><span className="rounded border border-foreground/15 px-1.5 py-0.5 text-[9px] font-bold text-foreground/55">{payout.countryCode || "--"}</span>{payout.countryName || "Country not published"}</p>
            </div>
            <p className="shrink-0 text-lg font-extrabold tracking-[-0.03em] text-primary">{amount || "—"}</p>
          </div>
          <div className="flex items-center justify-between border-t border-foreground/[0.08] pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/35">
            <span>{date || "Date not published"}</span>
            <span className="inline-flex items-center gap-1 text-primary/80">View reward certificate <ArrowRight size={12} /></span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

function CertificateModal({ payout, onClose }: { payout: CmsPayout | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!payout) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [payout, onClose]);

  if (!payout) return null;
  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Reward certificate">
      <button type="button" aria-label="Close certificate" onClick={onClose} className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div className="relative z-10 h-full w-full overflow-hidden bg-background/95">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between bg-gradient-to-b from-background via-background/75 to-transparent px-5 pb-16 pt-5 sm:px-8 sm:pt-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Reward certificate</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{payout.title || "Trader"}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-lg border border-foreground/15 bg-background/60 text-foreground/70 backdrop-blur transition hover:bg-foreground/[0.1] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close certificate"><X size={20} /></button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4 pt-24 pb-16 sm:p-8 sm:pt-28 sm:pb-20">
          {payout.image?.url ? <div className="relative h-full w-full"><Image src={payout.image.url} alt={payout.title || "Reward certificate"} fill sizes="100vw" className="object-contain" priority /></div> : <div className="flex min-h-64 w-full items-center justify-center rounded-lg border border-dashed border-foreground/15 text-center"><Unavailable label="The certificate image is not published yet" /></div>}
        </div>
        {payout.certificateUrl ? <a href={payout.certificateUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-5 left-1/2 z-20 inline-flex min-h-11 -translate-x-1/2 items-center justify-center gap-2 rounded-lg border border-primary/35 bg-background/75 px-4 text-xs font-bold uppercase tracking-[0.14em] text-primary backdrop-blur hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open source certificate <ExternalLink size={14} /></a> : null}
      </div>
    </div>
  );
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🏳️";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e6 - 65 + c.charCodeAt(0))
  );
}

/** Positions for flag dots arranged around the globe in a pleasing arc layout */
const FLAG_POSITIONS = [
  { left: "22%", top: "18%" },
  { left: "52%", top: "12%" },
  { left: "76%", top: "22%" },
  { left: "14%", top: "48%" },
  { left: "82%", top: "45%" },
  { left: "24%", top: "72%" },
  { left: "54%", top: "78%" },
  { left: "74%", top: "68%" },
  { left: "38%", top: "35%" },
  { left: "62%", top: "55%" },
];

function CountryAtlas({ payouts }: { payouts: CmsPayout[] }) {
  const countries = useMemo(() => {
    const grouped = new Map<string, { name: string; code: string; count: number; total: number }>();
    payouts.forEach((payout) => {
      if (!payout.countryName) return;
      const key = payout.countryCode || payout.countryName;
      const current = grouped.get(key) || { name: payout.countryName, code: payout.countryCode || "--", count: 0, total: 0 };
      current.count += 1;
      current.total += parseAmount(payout.amount);
      grouped.set(key, current);
    });
    return [...grouped.values()].sort((a, b) => b.total - a.total);
  }, [payouts]);
  const [selected, setSelected] = useState<string | null>(countries[0]?.code || null);
  const active = countries.find((country) => country.code === selected) || countries[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="relative min-h-[310px] overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.025] p-6 sm:min-h-[390px]" data-od-id="rewards-world-map">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative flex h-full min-h-[258px] items-center justify-center">
          {/* Globe with slow rotation */}
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.04] shadow-[0_0_90px_color-mix(in_oklab,var(--primary)_14%,transparent)] sm:h-64 sm:w-64 animate-[globe-spin_60s_linear_infinite]">
            {/* Orbital rings */}
            <div className="absolute inset-5 rounded-full border border-primary/15 animate-[orbit-pulse_8s_ease-in-out_infinite]" />
            <div className="absolute inset-12 rounded-full border border-teal/20 animate-[orbit-pulse_8s_ease-in-out_infinite_2s]" />
            {/* Globe icon with gentle float */}
            <Globe2 className="text-primary/60 animate-[globe-float_6s_ease-in-out_infinite]" size={72} strokeWidth={0.8} />
            {/* Country flag dots */}
            {countries.slice(0, 10).map((country, index) => {
              const pos = FLAG_POSITIONS[index % FLAG_POSITIONS.length];
              const isSelected = country.code === selected;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => setSelected(country.code)}
                  className={`absolute text-lg transition-all duration-300 hover:scale-150 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isSelected
                      ? "scale-150 drop-shadow-[0_0_12px_var(--primary)] z-10"
                      : "hover:drop-shadow-[0_0_8px_var(--primary)]"
                  }`}
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animation: `flag-float-${index % 4} ${5 + (index % 3)}s ease-in-out infinite ${index * 0.3}s`,
                  }}
                  aria-label={`Show ${country.name} rewards`}
                >
                  {countryCodeToFlag(country.code)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-5 left-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/35"><span className="text-sm">🏳️</span> Published country data</div>
        <style jsx global>{`
          @keyframes globe-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes globe-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-4px) scale(1.02); }
          }
          @keyframes orbit-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.02); }
          }
          @keyframes flag-float-0 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes flag-float-1 {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-4px) rotate(3deg); }
            66% { transform: translateY(2px) rotate(-2deg); }
          }
          @keyframes flag-float-2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes flag-float-3 {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(2px, -4px); }
            75% { transform: translate(-2px, 2px); }
          }
        `}</style>
      </div>
      <div className="rounded-xl border border-primary/20 bg-primary/[0.045] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Selected country</p><Globe2 size={16} className="text-primary/70" /></div>
        {active ? <>
          <div className="mt-7 flex items-center gap-3">
            <span className="text-4xl">{countryCodeToFlag(active.code)}</span>
            <h3 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground">{active.name}</h3>
          </div>
          <div className="mt-8 space-y-5">
            <div><p className="text-xs text-foreground/40">Published reward records</p><p className="mt-1 text-2xl font-extrabold text-primary">{active.count}</p></div>
            <div><p className="text-xs text-foreground/40">Published reward value</p><p className="mt-1 text-2xl font-extrabold text-primary">{formatMoney(active.total)}</p></div>
          </div>
          <button type="button" onClick={() => document.getElementById("reward-certificates")?.focus()} className="mt-8 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View country records <ArrowRight size={14} /></button>
        </> : <div className="flex min-h-64 flex-col items-center justify-center text-center"><Globe2 className="mb-4 text-foreground/20" size={34} /><Unavailable label="Country aggregation will appear when published records include country data" /></div>}
      </div>
    </div>
  );
}

export function RewardsPageClient({
  payouts,
  videos,
  reviews,
  summary,
}: {
  payouts: CmsPayout[];
  videos: CmsVideoReview[];
  reviews: CmsFirmReview[];
  summary: CmsRewardsSummary | null;
}) {
  const t = useTranslations("liveRewards");
  const tChallenge = useTranslations("challenge");
  const [filter, setFilter] = useState<Filter>("all");
  const [amountBand, setAmountBand] = useState<AmountBand>("all");
  const [certificate, setCertificate] = useState<CmsPayout | null>(null);
  const [reviewCount, setReviewCount] = useState(3);
  const [recentCount, setRecentCount] = useState(4);
  const [certPageSize, setCertPageSize] = useState(10);
  const handleFilterChange = (f: Filter) => { setFilter(f); setCertPageSize(10); };
  const handleAmountBandChange = (a: AmountBand) => { setAmountBand(a); setCertPageSize(10); };
  const testimonialVideos = videos.map((video) => ({
    id: video.youtubeVideoId,
    title: video.title,
    reward: video.reward,
    desc: video.description,
  }));
  const filteredPayouts = useMemo(() => {
    const list = payouts.filter((p) => p.image);
    let withCountry = filter === "country" ? list.filter((payout) => payout.countryName) : list;
    if (filter === "highest") withCountry = withCountry.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));
    if (filter === "latest") withCountry = withCountry.sort((a, b) => (b.approvedAt || "").localeCompare(a.approvedAt || ""));
    if (amountBand === "all") return withCountry;
    const threshold = Number(amountBand.replace("k", "000"));
    return withCountry.filter((payout) => parseAmount(payout.amount) >= threshold);
  }, [amountBand, filter, payouts]);

  const visiblePayouts = useMemo(() => filteredPayouts.slice(0, certPageSize), [filteredPayouts, certPageSize]);
  const hasMorePayouts = certPageSize < filteredPayouts.length;

  const highlights = useMemo(() => {
    const allTotal = payouts.reduce((s, p) => s + parseAmount(p.amount), 0);
    const analysts = new Set(payouts.map((p) => p.title).filter(Boolean)).size;
    const countries = new Set(payouts.map((p) => p.countryCode).filter(Boolean)).size;
    return [
      { value: allTotal > 0 ? formatCompactMoney(allTotal) : null, label: t("rewardsDistributed"), note: t("verifiedText") },
      { value: analysts > 0 ? `${analysts.toLocaleString()}+` : null, label: t("analystsRewarded"), note: t("verifiedText") },
      { value: countries > 0 ? `${countries}+` : null, label: t("countriesWorldwide"), note: t("verifiedText") },
      { value: summary?.maxRewardPercent == null ? null : `UP TO ${summary.maxRewardPercent}%`, label: t("simulatedRewards"), note: t("subjectToTerms") },
    ];
  }, [payouts, summary]);

  return (
    <div data-od-id="rewards-page">
      <section className="relative isolate -mt-[72px] md:-mt-[76px] flex min-h-[calc(100dvh-44px)] flex-col overflow-hidden border-b border-foreground/[0.07]" data-od-id="rewards-hero">
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] rounded-full opacity-70 fx-hero-glow-1" />
          <div className="absolute top-[15%] -left-[10%] w-[60%] h-[70%] rounded-full opacity-60 fx-hero-glow-2" />
          <div className="absolute top-[20%] -right-[10%] w-[55%] h-[65%] rounded-full opacity-55 fx-hero-glow-3" />
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full opacity-40 fx-hero-glow-4" />
        </div>
        <HeroField className="pointer-events-none absolute inset-0 z-[2]" />
        <div className="pointer-events-none absolute inset-0 z-[3]">
          <Aurora variant="hero" grid className="absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 pt-20 sm:px-6 md:pb-10 md:pt-24 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary" data-od-id="rewards-hero-eyebrow"><Sparkles size={12} /> {t("badge")}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-[clamp(38px,7vw,44px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]" data-od-id="rewards-hero-title">{t("heroTitlePrefix")} <span className="shimmer-text">{t("heroTitleShimmer")}</span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-5 max-w-xl text-[14px] leading-relaxed text-foreground/55 sm:text-[15px]">{t("desc")}</motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }} className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#reward-certificates" data-od-id="rewards-hero-primary"><GoldButton size="lg">{t("viewRewards")} <ArrowRight size={16} /></GoldButton></a>
              <a href="/#start-challenge" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-od-id="rewards-hero-secondary">{tChallenge("startNow")} <ArrowRight size={15} /></a>
            </motion.div>
            <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35"><span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-secondary" /> {t("verifiedText")}</span><span className="inline-flex items-center gap-2"><FileCheck2 size={14} className="text-primary" /> {t("certificateProof")}</span></div>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.07] py-12 md:py-16" data-od-id="reward-highlights">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-y divide-foreground/[0.08] border-y border-foreground/[0.08] md:grid-cols-4 md:divide-y-0">
            {highlights.map((metric) => <div key={metric.label} className="min-h-36 px-4 py-7 first:pl-0 md:px-7 md:first:pl-0"><p className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.04em] text-primary md:text-4xl">{metric.value ?? <Unavailable />}</p><p className="mt-2 max-w-[12rem] text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">{metric.label}</p><p className="mt-3 text-[10px] text-foreground/30">{metric.note}</p></div>)}
          </div>
        </Container>
      </section>

      <section id="reward-certificates" tabIndex={-1} className="scroll-mt-24 py-20 md:py-28" data-od-id="reward-certificates">
        <Container>
          <SectionHeading id="reward-certificates-heading" eyebrow={t("provenEyebrow")} title={t("provenTitle")}>{t("provenSubtitle")}</SectionHeading>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="toolbar" aria-label="Filter rewards" data-od-id="reward-filters">
            {(["all", "latest", "highest", "country"] as Filter[]).map((value) => <button key={value} type="button" onClick={() => handleFilterChange(value)} aria-pressed={filter === value} className={`min-h-11 rounded-lg border px-4 text-[11px] font-bold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${filter === value ? "border-primary/50 bg-primary/12 text-primary" : "border-foreground/10 text-foreground/45 hover:border-primary/30 hover:text-foreground"}`} data-od-id={`reward-filter-${value}`}>{value.charAt(0).toUpperCase() + value.slice(1)}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2" aria-label="Optional reward amount filter"><span className="mr-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/30">{t("amountLabel")}</span>{(["all", "5k", "10k", "25k", "50k", "100k", "200k", "300k"] as AmountBand[]).map((value) => <button key={value} type="button" onClick={() => handleAmountBandChange(value)} aria-pressed={amountBand === value} className={`min-h-9 rounded-md border px-3 text-[10px] font-bold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${amountBand === value ? "border-primary/40 bg-primary/[0.08] text-primary" : "border-foreground/10 text-foreground/35 hover:text-foreground"}`}>{value === "all" ? "All" : `$${value.toUpperCase()}`}</button>)}</div>
          {filteredPayouts.length ? (
            <>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visiblePayouts.map((payout, index) => <CertificateCard key={payout.id} payout={payout} index={index} onOpen={setCertificate} />)}</div>
              {hasMorePayouts && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setCertPageSize((prev) => prev + 10)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/35 px-6 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Load more ({filteredPayouts.length - certPageSize} remaining) <ChevronDown size={15} />
                  </button>
                </div>
              )}
            </>
          ) : <div className="mt-10 rounded-xl border border-dashed border-foreground/15 px-6 py-16 text-center"><FileCheck2 className="mx-auto mb-4 text-foreground/20" size={32} /><Unavailable label={t("certificatesEmpty")} /></div>}
        </Container>
      </section>

      {false && <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="reward-stories">
        <Container>
          <SectionHeading id="reward-stories-heading" eyebrow="FROM PERFORMANCE TO REWARD" title="They completed the journey. Now hear their story.">Watch CK Capital Qualified Analysts share their experience—from completing their evaluation to receiving an eligible simulated profit reward.</SectionHeading>
          {videos.length ? <><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{videos.slice(0, 8).map((video, index) => <motion.a key={video.id} href={`https://www.youtube.com/watch?v=${video.youtubeVideoId}`} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group overflow-hidden rounded-xl border border-foreground/10 bg-background/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-od-id={`reward-story-${video.id}`}><div className="relative aspect-video overflow-hidden bg-background-secondary">{video.thumbnail?.url ? <Image src={video.thumbnail.url} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 24vw" /> : <Image src={`https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`} alt={video.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 92vw, 24vw" />}<div className="absolute inset-0 bg-background/35 transition group-hover:bg-background/20" /><div className="absolute inset-0 flex items-center justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition group-hover:scale-110"><Play size={17} fill="currentColor" className="ml-0.5" /></span></div></div><div className="p-4"><p className="line-clamp-2 font-[family-name:var(--font-inter-tight)] text-sm font-bold text-foreground">{video.title}</p><div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.13em] text-foreground/35"><span>{video.authorName || "Trader"}</span><span>{video.countryName || video.countryCode || "Country not published"}</span></div><span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">WATCH STORY <ArrowRight size={12} /></span></div></motion.a>)}</div><a href={`https://www.youtube.com/watch?v=${videos[0].youtubeVideoId}`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">WATCH MORE ON YOUTUBE <ArrowRight size={14} /></a></> : <div className="mt-10 rounded-xl border border-dashed border-foreground/15 px-6 py-16 text-center"><Play className="mx-auto mb-4 text-foreground/20" size={30} /><Unavailable label="Verified trader stories will appear here from Strapi" /></div>}
        </Container>
      </section>}
      <Testimonials videos={testimonialVideos.length ? testimonialVideos : undefined} />

      <section className="py-20 md:py-28" data-od-id="reward-benefits">
        <Container>
          <SectionHeading id="reward-benefits-heading" eyebrow={t("benefitsEyebrow")} title={t("benefitsTitle")}>{t("benefitsSubtitle")}</SectionHeading>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
            ["UP TO 100%", "Simulated Profit Rewards", "Keep up to the applicable percentage of eligible simulated profits according to your CK Capital account terms."],
            ["FLEXIBLE", "Reward Cycles", "Eligible Qualified Analysts can request rewards according to the payout conditions applicable to their selected account."],
            ["UP TO $1.2M", "Total Simulated Account Allocation", "Progress within the CK Capital programme and access larger simulated account allocations subject to applicable programme rules."],
            ["NEWS TRADING", "More Trading Flexibility", "Trade around news events where permitted under the rules of your selected account."],
          ].map(([value, title, copy], index) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="min-h-56 rounded-xl border border-foreground/10 bg-foreground/[0.035] p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{value}</p><h3 className="mt-12 font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-foreground/50">{copy}</p></motion.div>)}</div>
        </Container>
      </section>

      <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="reward-process">
        <Container>
          <SectionHeading id="reward-process-heading" eyebrow={t("processEyebrow")} title={t("processTitle")}>{t("processSubtitle")}</SectionHeading>
          <div className="mx-auto mt-12 max-w-4xl">{[
            ["01", "Complete Your Evaluation", "Meet the objectives of your selected CK Capital evaluation while respecting the applicable risk parameters."],
            ["02", "Become a Qualified Analyst", "After successfully completing the required evaluation stages and account review, eligible traders progress to a CK Capital Qualified Analyst Account."],
            ["03", "Demonstrate Your Performance", "Continue trading within the applicable account rules and requirements."],
            ["04", "Request Your Reward", "Once eligible, submit your reward request through your CK Capital dashboard."],
            ["05", "Celebrate Your Achievement", "Approved rewards are processed according to the terms applicable to your account."],
          ].map(([number, title, copy], index) => <div key={number} className="group grid grid-cols-[52px_1fr] gap-5 border-b border-foreground/[0.08] py-6 first:border-t md:grid-cols-[80px_0.8fr_1.2fr] md:items-center md:gap-8"><span className="font-mono text-sm font-bold text-primary">{number}</span><h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-foreground">{title}</h3><p className="col-start-2 text-sm leading-6 text-foreground/45 md:col-start-auto">{copy}</p></div>)}</div>
        </Container>
      </section>

      {false && <section className="py-20 md:py-28" data-od-id="recent-rewards">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div className="text-left"><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">RECENT CK CAPITAL REWARDS</p><h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-5xl">The latest published records.</h2></div><p className="max-w-sm text-sm leading-6 text-foreground/45">Ordered from the approved reward records currently published in Strapi.</p></div>
          {payouts.length ? <><div className="mt-10 overflow-hidden rounded-xl border border-foreground/10"><div className="hidden grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr] border-b border-foreground/10 bg-foreground/[0.035] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35 sm:grid"><span>Analyst</span><span>Country</span><span>Reward</span><span>Certificate</span></div>{payouts.slice(0, recentCount).map((payout) => <button key={payout.id} type="button" onClick={() => setCertificate(payout)} className="grid w-full grid-cols-[1fr_auto] gap-3 border-b border-foreground/[0.08] px-5 py-4 text-left last:border-0 hover:bg-foreground/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:grid-cols-[1.2fr_0.8fr_0.8fr_0.7fr]"><span className="font-semibold text-foreground">{payout.title || "Qualified Analyst"}<small className="mt-1 block text-xs font-normal text-foreground/35 sm:hidden">{payout.countryName || "Country not published"}</small></span><span className="hidden text-sm text-foreground/50 sm:block">{payout.countryName || "—"}</span><span className="text-right font-bold text-primary sm:text-left">{payout.amount || "—"}</span><span className="hidden text-sm text-foreground/40 sm:block">VIEW CERTIFICATE <ArrowRight size={12} className="inline" /></span></button>)}</div>{recentCount < payouts.length ? <button type="button" onClick={() => setRecentCount((count) => Math.min(count + 4, payouts.length))} className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary/35 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">LOAD MORE REWARDS <ChevronDown size={15} /></button> : null}</> : <div className="mt-10 rounded-xl border border-dashed border-foreground/15 px-6 py-16 text-center"><Unavailable label="Recent reward records will appear here from Strapi" /></div>}
        </Container>
       </section>}

       <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="reward-world">
        <Container><SectionHeading id="reward-world-heading" eyebrow={t("worldEyebrow")} title={t("worldTitle")}>{t("worldSubtitle")}</SectionHeading><div className="mt-12"><CountryAtlas payouts={payouts} /></div></Container>
        </section>

        {(() => {
          const realReviews = reviews.filter((r) => r.authorName && r.authorName.trim().length > 0 && !/^verified trader$/i.test(r.authorName));
          return realReviews.length > 0 ? (
            <section className="py-20 md:py-28" data-od-id="reward-reviews">
              <Container>
                <SectionHeading id="reward-reviews-heading" eyebrow={t("reviewsEyebrow")} title={t("reviewsTitle")}>{t("reviewsSubtitle")}</SectionHeading>
                <div className="mt-12 grid gap-4 md:grid-cols-3">{realReviews.slice(0, reviewCount).map((review) => <article key={review.id} className="flex min-h-56 flex-col justify-between rounded-xl border border-foreground/10 bg-foreground/[0.035] p-6" data-od-id={`reward-review-${review.id}`}><div><div className="flex items-center justify-between"><div className="flex items-center gap-0.5" aria-label={`${review.rating || 5} out of 5 stars`}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill={i < (review.rating || 5) ? "#00B67A" : "none"} stroke={i < (review.rating || 5) ? "#00B67A" : "currentColor"} />)}</div>{review.source && <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/40"><span className="h-1.5 w-1.5 rounded-full bg-current" />{review.source}</span>}</div><blockquote className="mt-4 text-sm leading-7 text-foreground/70">"{review.summary}"</blockquote></div><div className="mt-6 flex items-center gap-3 border-t border-foreground/[0.08] pt-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{initials(review.authorName)}</span><div><p className="text-sm font-semibold text-foreground">{review.authorName}</p><p className="text-xs text-foreground/35">{review.countryName || ""}</p></div></div></article>)}</div>{reviewCount < realReviews.length ? <div className="mt-8 text-center"><button type="button" onClick={() => setReviewCount((count) => Math.min(count + 3, realReviews.length))} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/35 px-5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Read more reviews <ChevronDown size={15} /></button></div> : null}
              </Container>
            </section>
          ) : null;
        })()}

      <section className="relative overflow-hidden border-t border-primary/20 py-20 md:py-28" data-od-id="reward-cta">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]" />
        <Container className="relative text-center"><Trophy className="mx-auto text-primary" size={30} strokeWidth={1.4} /><h2 className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold tracking-[-0.04em] text-foreground md:text-6xl">{t("readyTitle")}</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/55">{t("readySubtitle")}</p><div className="mx-auto mt-9 grid max-w-2xl gap-3 text-left sm:grid-cols-3">{[["1 STEP", "One-stage evaluation.", "/?type=one-step&size=$100K#start-challenge"], ["2 STEP", "Evaluation + Verification.", "/?type=standard&size=$100K#start-challenge"], ["INSTANT", "Alternative account structure subject to its applicable rules.", "/?type=instant&size=$100K#start-challenge"]].map(([label, copy, href]) => <a key={label} href={href} className="rounded-xl border border-foreground/10 bg-foreground/[0.035] p-4 transition hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><p className="text-xs font-bold tracking-[0.16em] text-primary">{label}</p><p className="mt-2 text-xs leading-5 text-foreground/50">{copy}</p></a>)}</div><div className="mt-8"><a href="/#start-challenge" data-od-id="rewards-cta-primary"><GoldButton size="lg">{t("exploreEvaluations")} <ArrowRight size={16} /></GoldButton></a></div></Container>
      </section>

      <section className="border-t border-foreground/[0.08] bg-background-secondary/50 py-10" data-od-id="reward-legal"><Container><div className="flex items-start gap-4"><ArrowDownRight className="mt-1 shrink-0 text-primary" size={18} /><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/55">{t("importantInfo")}</p><p className="mt-3 max-w-4xl text-xs leading-6 text-foreground/40">{t("legalDisclaimer")}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-primary"><a href="/terms-conditions" className="hover:text-foreground">{t("viewTerms")} <ExternalLink size={12} className="inline" /></a><a href="/risk-disclosure" className="hover:text-foreground">{t("viewRisk")} <ExternalLink size={12} className="inline" /></a></div></div></div></Container></section>
      <CertificateModal payout={certificate} onClose={() => setCertificate(null)} />
    </div>
  );
}
