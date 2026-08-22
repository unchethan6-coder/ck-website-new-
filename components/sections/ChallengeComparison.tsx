"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import {
  CHALLENGE_TYPES,
  CHALLENGE_RULES,
  CHALLENGE_PRICES,
  CHALLENGE_SPLITS,
  CHALLENGE_ACCESS,
  CURRENCIES,
  SITE_META,
} from "@/lib/content";
import type { ChallengeType } from "@/lib/content";
import type { ChallengeConfig } from "@/lib/cms";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { chipIn, stagger } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────── helpers */

/** "$10K" → 10000, "$1,000" → 1000 */
function parseMoney(s: string): number {
  return parseFloat(s.replace(/[$,K]/g, "")) * (s.includes("K") ? 1e3 : 1);
}

function fmtMoney(v: number, sym = "$"): string {
  const decimals = v % 1 !== 0 ? 2 : 0;
  return `${sym}${v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/** "$58.00" + USD rate → "£45.82" (or the value unchanged when not a $ string) */
function toCurrency(raw: string, code: string): string {
  if (!raw.startsWith("$")) return raw;
  const c = CURRENCIES.find((x) => x.code === code) ?? CURRENCIES[0];
  return fmtMoney(parseMoney(raw) * c.rate, c.symbol);
}

/** "$1,000" + size 10000 → "10%" */
function toPercent(raw: string, sizeNum: number): string {
  if (!raw.startsWith("$")) return raw;
  return `${((parseMoney(raw) / sizeNum) * 100).toLocaleString("en-US", {
    maximumFractionDigits: 1,
  })}%`;
}

/* ─────────────────────────────────────────────────────────── switch */

function Switch({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex w-8 h-4 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-white/20"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all",
          checked ? "left-[18px]" : "left-0.5"
        )}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────── section */

type View = "phases" | "compare";

export function ChallengeComparison({
  config,
  promoCode,
}: {
  config?: ChallengeConfig | null;
  promoCode?: string;
}) {
  const t = useTranslations("challenge");
  const [activeType, setActiveType] = useState<ChallengeType>("standard");
  const [currency, setCurrency] = useState("USD");
  const [size, setSize] = useState("$10K");
  const [showNumbers, setShowNumbers] = useState(true);
  const [view, setView] = useState<View>("phases");
  const [copied, setCopied] = useState<string | null>(null);

  // CMS-overridable challenge data (falls back to the static content model)
  const rules = config?.rules ?? CHALLENGE_RULES;
  const prices = config?.prices ?? CHALLENGE_PRICES;
  const splits = config?.splits ?? CHALLENGE_SPLITS;
  const access = config?.access ?? CHALLENGE_ACCESS;

  /* Preselect challenge type + account size from URL (?type=&size=),
     used by footer product links (e.g. /?type=one-step&size=$100K#start-challenge) */
  const searchParams = useSearchParams();
  const urlType = searchParams.get("type");
  const urlSize = searchParams.get("size");

  useEffect(() => {
    const validTypes: ChallengeType[] = ["standard", "middleweight", "one-step", "instant"];
    if (urlType && (validTypes as string[]).includes(urlType)) {
      setActiveType(urlType as ChallengeType);
    }
    if (urlSize) {
      const sizes = Object.keys(
        urlType && (validTypes as string[]).includes(urlType)
          ? rules[urlType as ChallengeType]
          : rules.standard
      );
      if (sizes.includes(urlSize)) setSize(urlSize);
    }
  }, [urlType, urlSize]);

  const sizes = Object.keys(rules[activeType]);
  const activeSize = sizes.includes(size) ? size : sizes.includes("$10K") ? "$10K" : sizes[0];
  const X = rules[activeType][activeSize];
  const Y = prices[activeType][activeSize];
  const split = splits[activeType];
  const promo = `${promoCode ?? SITE_META.promoCode}-${activeSize.replace("$", "").replace("K", "")}`;

  const cell = (raw: string) =>
    raw === "$0" ? "—" : showNumbers ? toCurrency(raw, currency) : toPercent(raw, parseMoney(activeSize));

  /* Per-model column layout (matches source): instant = 1 col, 1-step = 2, rest = 3 */
  const columns: {
    key: string;
    title: string;
    subtitle: string;
    target: string;
    maxDaily: string;
    maxLoss: string;
    minDays: string;
    period: string;
    split: string;
    consistency: string;
  }[] = [];
  const funded = {
    key: "funded",
    title: t("ckAccount"),
    subtitle: t("fundedStage"),
    target: "—",
    maxDaily: X.maxDaily,
    maxLoss: X.maxLoss,
    minDays: "—",
    period: activeType === "instant" ? t("unlimited") : "—",
    split,
    consistency: X.consistency,
  };
  const phase1 = {
    key: "p1",
    title: t("phase1"),
    subtitle: t("evaluationStage"),
    target: X.phase1,
    maxDaily: X.maxDaily,
    maxLoss: X.maxLoss,
    minDays: "1",
    period: t("unlimited"),
    split: "—",
    consistency: X.consistency,
  };
  const phase2 = {
    key: "p2",
    title: t("phase2"),
    subtitle: t("verificationStage"),
    target: X.phase2,
    maxDaily: X.maxDaily,
    maxLoss: X.maxLoss,
    minDays: "1",
    period: t("unlimited"),
    split: "—",
    consistency: X.consistency,
  };
  if (activeType === "instant") columns.push(funded);
  else if (activeType === "one-step") columns.push(phase1, funded);
  else columns.push(phase1, phase2, funded);

  const rows: { label: string; key: "target" | "maxDaily" | "maxLoss" | "minDays" | "period" | "split" | "consistency" }[] = [
    { label: t("profitTarget"), key: "target" },
    { label: t("maxDailyLoss"), key: "maxDaily" },
    { label: t("maxLoss"), key: "maxLoss" },
    { label: t("minTradingDays"), key: "minDays" },
    { label: t("tradingPeriod"), key: "period" },
    { label: t("rewardSplit"), key: "split" },
    { label: t("consistencyRule"), key: "consistency" },
  ];

  const copyCode = () => {
    navigator.clipboard
      .writeText(promo)
      .then(() => {
        setCopied(promo);
        setTimeout(() => setCopied((c) => (c === promo ? null : c)), 2000);
      })
      .catch(() => {});
  };

  /* Compare Sizes grid — every size as a column */
  const allSizes = Object.keys(rules[activeType])
    .map((s) => {
      const rule = rules[activeType][s];
      return {
        size: s,
        badge: s === "$100K" ? t("mostPopular") : null,
        phase1: rule.phase1,
        phase2: rule.phase2,
        maxDaily: rule.maxDaily,
        maxLoss: rule.maxLoss,
        minDays: "1",
        period: t("unlimited"),
        split,
        consistency: rule.consistency,
        price: prices[activeType][s].price,
        oldPrice: prices[activeType][s].oldPrice,
      };
    })
    .reverse();

  return (
    <section
      id="start-challenge"
      className="relative scroll-mt-28 overflow-hidden py-16 md:py-24"
      data-od-id="challenge-comparison"
    >
      <Container>
        <div className="relative">
          {/* Title */}
          <SectionReveal className="text-center mb-8 md:mb-10">
            <h2
              data-od-id="challenge-title"
              className="font-[family-name:var(--font-inter-tight)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground"
            >
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-foreground/60">
              {t("subtitle")}
            </p>
          </SectionReveal>

          {/* Challenge-type tabs */}
          <SectionReveal delay={0.06}>
            <div className="mb-6 flex justify-start sm:justify-center overflow-x-auto pb-2 px-1">
              <div className="flex w-max gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-1.5">
                {CHALLENGE_TYPES.map((ct) => {
                  const active = activeType === ct.id;
                  return (
                    <button
                      key={ct.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveType(ct.id)}
                      data-od-id={`challenge-tab-${ct.id}`}
                      className={cn(
                        "min-w-[132px] rounded-xl px-4 py-2.5 text-left transition-all border",
                        active
                          ? "border-primary/60 bg-foreground/[0.08] text-foreground shadow-[0_0_18px_rgba(212,175,55,0.2)]"
                          : "border-transparent text-foreground/55 hover:text-foreground"
                      )}
                    >
                      <span className="block whitespace-nowrap text-sm font-bold">{ct.label}</span>
                      <span className="block whitespace-nowrap text-[11px] opacity-70">{ct.subtitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* Toolbar row */}
          <SectionReveal delay={0.12}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((c) => {
                  const active = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setCurrency(c.code)}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold transition-all border",
                        active
                          ? "border-primary/70 bg-foreground/[0.08] text-foreground shadow-[0_0_14px_rgba(212,175,55,0.25)]"
                          : "border-foreground/15 bg-foreground/[0.04] text-foreground/60 hover:text-foreground"
                      )}
                    >
                      <span aria-hidden="true">{c.flag}</span>
                      {c.code}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowNumbers(!showNumbers)}
                  aria-pressed={showNumbers}
                  className="inline-flex min-h-11 select-none items-center gap-2 whitespace-nowrap rounded-full px-3 text-xs font-bold text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Switch checked={showNumbers} />
                  {t("showNumbers")}
                </button>
                <div className="inline-flex rounded-full border border-foreground/15 bg-foreground/[0.04] p-1">
                  <button
                    onClick={() => setView("phases")}
                    aria-pressed={view === "phases"}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-xs font-bold transition-all min-h-11 flex items-center",
                      view === "phases"
                        ? "bg-primary text-primary-foreground font-extrabold"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {t("showPhases")}
                  </button>
                  <button
                    onClick={() => setView("compare")}
                    aria-pressed={view === "compare"}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-xs font-bold transition-all min-h-11 flex items-center",
                      view === "compare"
                        ? "bg-primary text-primary-foreground font-extrabold"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {t("compareSizes")}
                  </button>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Universal-conditions strip — honest CK values */}
          <div
            className="mb-7 flex flex-wrap justify-center gap-2"
            data-od-id="challenge-conditions"
          >
            {["Profit split up to 100%", "Leverage 1:100", "Payouts in ~12 hours"].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 text-[12.5px] font-semibold text-foreground/85"
              >
                <Check size={13} strokeWidth={3} className="text-primary shrink-0" />
                {c}
              </span>
            ))}
          </div>

          {/* ─────────────── PHASES VIEW ─────────────── */}
          {view === "phases" && (
            <>
              {/* Account size selector */}
              <SectionReveal delay={0.16}>
                <div className="mb-6 flex flex-wrap gap-2">
                  {sizes.map((s) => {
                    const active = s === activeSize;
                    return (
                      <button
                        key={s}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSize(s)}
                        data-od-id={`size-pill-${s.toLowerCase()}`}
                        className={cn(
                          "rounded-lg px-4 py-2 text-sm font-extrabold transition-all min-h-11",
                          active
                            ? "bg-primary text-primary-foreground font-extrabold shadow-sm"
                            : "border border-foreground/15 bg-foreground/[0.04] text-foreground/70 hover:border-primary/50 hover:text-foreground"
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </SectionReveal>

              {/* Comparison table */}
              <SectionReveal delay={0.2}>
                <div
                  data-od-id="challenge-table"
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#12100A] shadow-xl"
                >
                  {/* Mobile: stacked phase cards (< md) */}
                  <div className="md:hidden grid gap-3 p-3">
                    {columns.map((c) => (
                      <div
                        key={c.key}
                        className={cn(
                          "rounded-2xl border p-4",
                          c.key === "funded"
                            ? "border-primary/40 bg-primary/[0.08]"
                            : "border-foreground/10 bg-foreground/[0.03]"
                        )}
                      >
                        <p
                          className={cn(
                            "text-[11px] font-bold uppercase tracking-[0.14em]",
                            c.key === "funded" ? "text-[#F7D774]" : "text-foreground/40"
                          )}
                        >
                          {c.subtitle}
                        </p>
                        <p className="mt-0.5 text-lg font-extrabold text-foreground">{c.title}</p>
                        <div className="mt-3 space-y-2.5 border-t border-foreground/[0.07] pt-3">
                          {rows.map((r) => (
                            <div key={r.key} className="flex items-center justify-between gap-3">
                              <span className="text-[13px] font-semibold text-foreground/60">
                                {r.label}
                              </span>
                              <span
                                className={cn(
                                  "text-sm font-bold tabular-nums",
                                  c.key === "funded" ? "text-[#F7D774]" : "text-foreground"
                                )}
                              >
                                {c[r.key] === "—" ? "—" : cell(c[r.key])}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tablet/desktop: horizontal table (md+) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-sm md:text-[15px]">
                      <thead>
                        <tr className="border-b border-foreground/10">
                          <th
                            scope="col"
                            className="px-5 py-4 text-left text-[12px] font-bold uppercase tracking-[0.14em] text-foreground/45"
                          >
                            {t("tradingObjectives")}
                          </th>
                          {columns.map((c) => (
                            <th
                              key={c.key}
                              scope="col"
                              className={cn(
                                "px-5 py-4 text-left",
                                c.key === "funded" ? "bg-primary/[0.08]" : ""
                              )}
                            >
                              <span
                                className={cn(
                                  "block text-[11px] font-bold uppercase tracking-[0.14em]",
                                  c.key === "funded" ? "text-[#F7D774]" : "text-foreground/40"
                                )}
                              >
                                {c.subtitle}
                              </span>
                              <span className="block text-base font-extrabold text-foreground">
                                {c.title}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.key} className="border-b border-foreground/[0.06] last:border-0">
                            <th
                              scope="row"
                              className="px-5 py-3.5 text-left text-[13px] font-semibold text-foreground/65"
                            >
                              {r.label}
                            </th>
                            {columns.map((c) => {
                              const raw = c[r.key];
                              return (
                                <td
                                  key={c.key}
                                  className={cn(
                                    "px-5 py-3.5 font-bold text-foreground",
                                    c.key === "funded" ? "bg-primary/[0.08] text-[#F7D774]" : ""
                                  )}
                                >
                                  {raw === "—" ? "—" : cell(raw)}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Bottom bar */}
                  <div className="flex flex-col gap-4 border-t border-foreground/10 bg-foreground/[0.03] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                        {t("ckAccount")}
                      </p>
                      <p className="text-2xl font-extrabold text-foreground tabular-nums">
                        {fmtMoney(parseMoney(activeSize))}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={copyCode}
                        className="rounded-lg border border-dashed border-primary/50 bg-primary/10 px-4 py-2.5 text-[13px] font-bold text-[#F7D774] transition-all hover:bg-primary/20 text-center"
                      >
                        {copied === promo ? `✓ ${t("copied")}` : `${t("code")}: ${promo}`}
                      </button>
                      <div className="text-left sm:text-right">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                          {t("price")}
                        </p>
                        <p className="text-2xl font-extrabold text-primary tabular-nums">
                          {toCurrency(Y.price, currency)}{" "}
                          <span className="ml-1 align-middle text-sm font-semibold text-foreground/35 line-through">
                            {toCurrency(Y.oldPrice, currency)}
                          </span>
                        </p>
                      </div>
                      <a
                        href="https://app.ckcapital.co.uk/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-od-id="challenge-cta"
                        className="btn-gold-standard inline-flex h-12 items-center justify-center px-8 text-[15px] font-bold w-full sm:w-auto"
                      >
                        {t("startNow")}
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </>
          )}

          {/* ─────────────── COMPARE SIZES VIEW ─────────────── */}
          {view === "compare" && (
            <SectionReveal delay={0.16}>
              {/* Mobile: stacked size cards (< md) */}
              <div className="md:hidden grid gap-3">
                {allSizes.map((s) => {
                  const r = (raw: string) =>
                    raw === "$0" ? "—" : showNumbers ? toCurrency(raw, currency) : toPercent(raw, parseMoney(s.size));
                  return (
                    <div
                      key={s.size}
                      className={cn(
                        "relative rounded-2xl border p-4 card-hover-standard",
                        s.badge
                          ? "border-primary bg-[#12100A] shadow-xl"
                          : "border-foreground/10 bg-[#12100A]/50"
                      )}
                    >
                      {s.badge && (
                        <div className="absolute -top-3 left-3 flex items-center gap-1.5 whitespace-nowrap">
                          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold text-primary-foreground">
                            {t("bestValue")}
                          </span>
                          <span className="rounded-full bg-[#FFE082] px-2 py-1 text-[10px] font-extrabold text-black">
                            -70%
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/40">
                            {t("account")}
                          </p>
                          <p className="text-2xl font-extrabold text-foreground tabular-nums">
                            {toCurrency(s.size, currency)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/40">
                            {t("price")}
                          </p>
                          <p className="text-xl font-extrabold text-primary tabular-nums">
                            {toCurrency(s.price, currency)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 border-t border-foreground/[0.07] pt-3 text-xs">
                        {rows.map((row) => {
                          const val =
                            row.key === "target"
                              ? `${r(s.phase1)}${s.phase2 !== "$0" ? ` / ${r(s.phase2)}` : ""}`
                              : row.key === "maxDaily"
                              ? r(s.maxDaily)
                              : row.key === "maxLoss"
                              ? r(s.maxLoss)
                              : row.key === "minDays"
                              ? `${s.minDays} ${t("day")}`
                              : row.key === "period"
                              ? s.period
                              : row.key === "split"
                              ? s.split
                              : row.key === "consistency"
                              ? s.consistency
                              : "—";
                          return (
                            <div key={row.key} className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wide text-foreground/45">
                                {row.label}
                              </span>
                              <span className="text-sm font-bold text-foreground tabular-nums">{val}</span>
                            </div>
                          );
                        })}
                      </div>
                      <a
                        href="https://app.ckcapital.co.uk/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold-standard mt-4 inline-flex h-12 w-full items-center justify-center whitespace-nowrap text-sm font-bold"
                      >
                        {t("startNow")}
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Tablet/desktop: label rail + horizontally-scrolling size columns (md+) */}
              <div className="hidden md:flex items-stretch gap-3 pt-5">
                {/* Label rail — fixed, stretches to full card height */}
                <div className="flex w-[180px] shrink-0 flex-col rounded-2xl bg-[#0e0c08] px-5 pt-9 pb-4 text-[13px] font-semibold text-foreground/65">
                  <div className="mb-4 h-[66px]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/40">
                      {t("account")}
                    </p>
                    <p className="text-2xl font-extrabold text-foreground/25">…</p>
                  </div>
                  {rows.map((r) => (
                    <div
                      key={r.key}
                      className={cn(
                        "flex items-center whitespace-nowrap",
                        r.key === "target" ? "min-h-14" : "min-h-10"
                      )}
                    >
                      {r.label}
                    </div>
                  ))}
                  <div className="mt-4 flex h-16 items-start pt-1 text-foreground/50">
                    {t("oneTimeFee")}
                  </div>
                </div>

                {/* Size columns — only this scrolls horizontally */}
                <div className="min-w-0 flex-1 overflow-x-auto pt-4">
                  <div
                    className="flex h-full items-stretch gap-3"
                    style={{ minWidth: `${allSizes.length * 190 + (allSizes.length - 1) * 12}px` }}
                  >
                    {allSizes.map((s) => {
                      const r = (raw: string) =>
                        raw === "$0" ? "—" : showNumbers ? toCurrency(raw, currency) : toPercent(raw, parseMoney(s.size));
                      return (
                        <div
                          key={s.size}
                          className={cn(
                            "relative flex min-w-[190px] flex-1 flex-col rounded-2xl border px-4 pb-4 pt-5 card-hover-standard",
                            s.badge
                              ? "border-primary bg-[#12100A] shadow-xl"
                              : "border-foreground/10 bg-[#12100A]/50 hover:border-primary/40"
                          )}
                        >
                          {s.badge && (
                            <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap">
                              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold text-primary-foreground">
                                {t("bestValue")}
                              </span>
                              <span className="rounded-full bg-[#FFE082] px-2 py-1 text-[10px] font-extrabold text-black">
                                -70%
                              </span>
                            </div>
                          )}
                          <div className="mb-4 h-[66px] text-center">
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/40">
                              {t("account")}
                            </p>
                            <p className="text-2xl font-extrabold text-foreground tabular-nums">
                              {toCurrency(s.size, currency)}
                            </p>
                          </div>

                          <div className="flex min-h-14 flex-col justify-center border-t border-foreground/[0.07] text-xs">
                            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                              <span className="text-[11px] font-bold uppercase tracking-wide text-foreground/45">
                                {t("phase1")}
                              </span>
                              <span className="font-bold text-foreground tabular-nums">{r(s.phase1)}</span>
                            </div>
                            {s.phase2 !== "$0" && (
                              <div className="mt-1 flex items-center justify-between gap-2 whitespace-nowrap">
                                <span className="text-[11px] font-bold uppercase tracking-wide text-foreground/45">
                                  {t("phase2")}
                                </span>
                                <span className="font-bold text-foreground tabular-nums">{r(s.phase2)}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-foreground tabular-nums">
                            {r(s.maxDaily)}
                          </div>
                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-foreground tabular-nums">
                            {r(s.maxLoss)}
                          </div>
                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-foreground tabular-nums">
                            {s.minDays} {t("day")}
                          </div>
                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-foreground">
                            {s.period}
                          </div>
                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-primary">
                            {s.split}
                          </div>
                          <div className="flex min-h-10 items-center whitespace-nowrap border-t border-foreground/[0.07] text-sm font-bold text-foreground">
                            {s.consistency}
                          </div>

                          <div className="mt-4 flex h-16 min-w-0 flex-col items-center justify-center whitespace-nowrap border-t border-foreground/[0.07] text-center">
                            <p className="max-w-full truncate text-lg font-extrabold leading-tight text-primary tabular-nums">
                              {toCurrency(s.price, currency)}
                            </p>
                            <p className="max-w-full truncate text-[11px] font-semibold text-foreground/35 line-through tabular-nums">
                              {toCurrency(s.oldPrice, currency)}
                            </p>
                          </div>
                          <a
                            href="https://app.ckcapital.co.uk/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold-standard mt-1 inline-flex h-10 w-full items-center justify-center whitespace-nowrap text-sm font-bold"
                          >
                            {t("startNow")}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Access list + disclaimer */}
          <SectionReveal delay={0.24}>
            <div className="mt-8 text-center">
              <p className="mb-3 text-[13px] font-semibold text-foreground/55">
                {t("accessTitle")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {access.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-2 rounded-lg border border-foreground/12 bg-foreground/[0.04] px-3.5 py-2 text-[13px] font-semibold text-foreground/75"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="fx-check-draw shrink-0 text-primary"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-foreground/50 md:text-sm">
              {t("disclaimer")}
            </p>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
