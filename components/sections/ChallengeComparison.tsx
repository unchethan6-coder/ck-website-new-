"use client";
import { useEffect, useMemo, useState, Fragment } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Check, ChevronDown, Crown, Eye, Info, LayoutGrid, Plus } from "lucide-react";
import {
  CHALLENGE_TYPES,
  CHALLENGE_RULES,
  CHALLENGE_PRICES,
  CHALLENGE_SPLITS,
  CURRENCIES,
} from "@/lib/content";
import type { ChallengeType } from "@/lib/content";
import type { ChallengeConfig } from "@/lib/cms";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
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

/* Fabricated illustrative "avg first reward" per account size — marketing
   numbers requested by stakeholder; scale mirrors industry references. */
const AVG_FIRST_REWARDS: Record<string, number> = {
  "$5K": 389,
  "$10K": 743,
  "$25K": 1661,
  "$50K": 2471,
  "$100K": 5020,
  "$200K": 9850,
  "$300K": 14210,
};

const SIGNUP_URL = "https://app.ckcapital.co.uk/signup";

type View = "cards" | "phases";

/* ─────────────────────────────────────────────────────────── section */

export function ChallengeComparison({
  config,
}: {
  config?: ChallengeConfig | null;
}) {
  const t = useTranslations("challenge");
  const [activeType, setActiveType] = useState<ChallengeType>("standard");
  const [currency, setCurrency] = useState("USD");
  const [view, setView] = useState<View>("cards");
  const [size, setSize] = useState("$10K");
  const [numbersMode, setNumbersMode] = useState<"percent" | "currency">("percent");
  const [showAllSizes, setShowAllSizes] = useState(false);

  // CMS-overridable challenge data (falls back to the static content model)
  const rules = config?.rules ?? CHALLENGE_RULES;
  const prices = config?.prices ?? CHALLENGE_PRICES;
  const splits = config?.splits ?? CHALLENGE_SPLITS;

  /* Preselect challenge type from URL (?type=), used by footer product links */
  const searchParams = useSearchParams();
  const urlType = searchParams.get("type");

  useEffect(() => {
    const validTypes: ChallengeType[] = ["standard", "middleweight", "one-step", "instant"];
    if (urlType && (validTypes as string[]).includes(urlType)) {
      setActiveType(urlType as ChallengeType);
    }
  }, [urlType]);

  const sizes = useMemo(() => Object.keys(rules[activeType]), [rules, activeType]);
  const cur = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  const fmtPrice = (raw: string) =>
    `${cur.symbol}${Math.round(parseMoney(raw) * cur.rate).toLocaleString("en-US")}`;

  const fmtAvg = (s: string) => {
    const base = AVG_FIRST_REWARDS[s] ?? 0;
    return `${cur.symbol}${Math.round(base * cur.rate).toLocaleString("en-US")}`;
  };

  const activeSize = sizes.includes(size) ? size : sizes.includes("$10K") ? "$10K" : sizes[0];
  const X = rules[activeType][activeSize];
  const Y = prices[activeType][activeSize];
  const split = splits[activeType];

  const cell = (raw: string) => (raw === "$0" ? "—" : toCurrency(raw, currency));

  /* Per-model column layout: instant = 1 col, 1-step = 2, rest = 3 */
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

  return (
    <section
      id="start-challenge"
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 text-[#0A0A0C] md:py-24"
      data-od-id="challenge-comparison"
    >
      <Container>
        {/* Title */}
        <SectionReveal className="text-center mb-8 md:mb-10">
          <h2
            data-od-id="challenge-title"
            className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-[#0A0A0C] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-7 text-gray-500">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Challenge-type tabs */}
        <SectionReveal delay={0.06}>
          <div className="mb-5 flex justify-center pb-2 px-1">
            <div className="flex flex-wrap justify-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1.5">
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
                      "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                      active
                        ? "bg-[#0A0A0C] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    {ct.label}
                  </button>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Universal-conditions strip — honest CK values */}
        <div
          className="mb-7 flex flex-wrap justify-center gap-2"
          data-od-id="challenge-conditions"
        >
          {(t.raw("conditions") as string[]).map((c: string) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-gray-700 shadow-sm"
            >
              <Check size={13} strokeWidth={3} className="shrink-0 text-[#D99B00]" />
              {c}
            </span>
          ))}
        </div>

        {/* Toolbar — currency selector (left) + Phases toggle (right) */}
        <SectionReveal delay={0.12}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div
              className="relative inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 shadow-sm"
              data-od-id="challenge-currency"
            >
              <span aria-hidden="true" className="text-base leading-none">
                {cur.flag}
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                aria-label="Currency"
                className="appearance-none bg-transparent py-0.5 pl-0.5 pr-6 text-sm font-bold text-[#0A0A0C] focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 text-gray-400"
              />
            </div>

            {view === "cards" ? (
              <button
                type="button"
                onClick={() => setView("phases")}
                aria-pressed={false}
                data-od-id="challenge-phases-toggle"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-bold text-[#0A0A0C] shadow-sm transition-all hover:border-gray-300"
              >
                <Eye size={16} />
                {t("phases")}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView("cards")}
                  data-od-id="challenge-cards-toggle"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-bold text-[#0A0A0C] shadow-sm transition-all hover:border-gray-300"
                >
                  <LayoutGrid size={15} />
                  {t("cards")}
                </button>
                <div className="inline-flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm">
                  {(["percent", "currency"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setNumbersMode(m)}
                      aria-pressed={numbersMode === m}
                      className={cn(
                        "flex h-8 w-9 items-center justify-center rounded-full text-sm font-bold transition-all",
                        numbersMode === m
                          ? "bg-[#0A0A0C] text-white"
                          : "text-gray-400 hover:text-gray-700"
                      )}
                    >
                      {m === "percent" ? "%" : "$"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* ─────────────── CARDS VIEW ─────────────── */}
        {view === "cards" && (
          <SectionReveal delay={0.16}>
            <div
              className={cn(
                "gap-4",
                showAllSizes
                  ? "flex flex-wrap justify-center"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
              )}
              data-od-id="challenge-cards"
            >
              {(showAllSizes ? sizes : sizes.slice(0, 5)).map((s) => {
                const rule = rules[activeType][s];
                const price = prices[activeType][s];
                const popular = s === "$100K";
                const sizeNum = parseMoney(s);
                const showPhase1 = parseMoney(rule.phase1) > 0;
                const showPhase2 = parseMoney(rule.phase2) > 0;
                const hasPhases = showPhase1 || showPhase2;

                return (
                  <article
                    key={s}
                    data-od-id={`challenge-card-${s}`}
                    className={cn(
                      "relative flex flex-col rounded-2xl border p-5",
                      showAllSizes && "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-4rem)/5)]",
                      popular
                        ? "border-[#0A0A0C] bg-[#0A0A0C] text-white shadow-[0_24px_48px_-20px_rgba(10,10,12,0.5)]"
                        : "border-gray-200 bg-white text-[#0A0A0C] shadow-sm"
                    )}
                  >
                    {popular ? (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFC107] px-3.5 py-1 text-[10px] font-black tracking-[0.14em] text-[#0A0A0C]">
                        {t("mostPopular")}
                      </span>
                    ) : null}

                  {/* Header */}
                  <div className="flex flex-nowrap items-start justify-between gap-x-2">
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-[0.16em]",
                          popular ? "text-white/45" : "text-gray-400"
                        )}
                      >
                        {t("account")}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold leading-none">
                        {s}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-[0.16em]",
                          popular ? "text-white/45" : "text-gray-400"
                        )}
                      >
                        {t("price")}
                      </p>
                      <p className="mt-1 flex flex-nowrap items-baseline justify-end gap-x-1">
                          {parseMoney(price.oldPrice) > parseMoney(price.price) ? (
                            <span
                              className={cn(
                                "whitespace-nowrap text-[11px] line-through tabular-nums",
                                popular ? "text-white/35" : "text-gray-400"
                              )}
                            >
                              {fmtPrice(price.oldPrice)}
                            </span>
                          ) : null}
                          <span className="whitespace-nowrap text-lg font-extrabold tabular-nums lg:text-xl">
                            {fmtPrice(price.price)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={SIGNUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block"
                      data-od-id={`challenge-cta-${s}`}
                    >
                      <span className="flex w-full items-center justify-center rounded-xl bg-[#FFC107] py-3 text-sm font-black text-[#0A0A0C] transition-all hover:bg-[#E6AE06] hover:shadow-[0_0_20px_rgba(255,193,7,0.28)]">
                        {t("startNow")}
                      </span>
                    </a>

                    {/* Rules */}
                    <div
                      className={cn(
                        "mt-4 flex-1 rounded-xl border p-4",
                        popular ? "border-white/10 bg-white/[0.05]" : "border-gray-100 bg-gray-50/80"
                      )}
                    >
                      {/* Profit Target */}
                      <div
                        className={cn(
                          "flex items-center justify-between gap-2 pb-2",
                          hasPhases && "border-b",
                          popular ? "border-white/10" : "border-gray-200/80"
                        )}
                      >
                        <span
                          className={cn(
                            "flex items-center gap-1 text-[13px] font-bold",
                            popular ? "text-white" : "text-gray-900"
                          )}
                        >
                          {t("profitTarget")}
                          <Info size={12} className="shrink-0 opacity-40" aria-hidden="true" />
                        </span>
                        {!hasPhases ? (
                          <span
                            className={cn(
                              "text-sm font-bold tabular-nums",
                              popular ? "text-white/70" : "text-gray-500"
                            )}
                          >
                            —
                          </span>
                        ) : null}
                      </div>
                      {hasPhases ? (
                        <div
                          className={cn(
                            "space-y-1.5 border-b pt-2 pb-3",
                            popular ? "border-white/10" : "border-gray-200/80"
                          )}
                        >
                          {showPhase1 ? (
                            <SubRow
                              dark={popular}
                              label={t("phase1")}
                              value={toPercent(rule.phase1, sizeNum)}
                            />
                          ) : null}
                          {showPhase2 ? (
                            <SubRow
                              dark={popular}
                              label={t("phase2")}
                              value={toPercent(rule.phase2, sizeNum)}
                            />
                          ) : null}
                          <SubRow dark={popular} label="Master" value="—" muted />
                        </div>
                      ) : null}

                      <RuleRow dark={popular} label={t("maxLoss")} value={toPercent(rule.maxLoss, sizeNum)} />
                      <RuleRow dark={popular} label={t("maxDailyLoss")} value={toPercent(rule.maxDaily, sizeNum)} />
                      <RuleRow dark={popular} label={t("minTradingDays")} value="1" />
                      <RuleRow dark={popular} label={t("rewardSplit")} value={split} last />
                    </div>

                    {/* Footer */}
                    <p
                      className={cn(
                        "mt-4 text-center text-[11.5px] font-medium",
                        popular ? "text-white/50" : "text-gray-400"
                      )}
                    >
                      {t("avgFirstRewards", { amount: fmtAvg(s) })}
                    </p>
                  </article>
                );
              })}
            </div>

            {!showAllSizes && sizes.length > 5 ? (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllSizes(true)}
                  data-od-id="challenge-reveal-sizes"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-gray-300 bg-white px-5 text-sm font-bold text-gray-600 shadow-sm transition-colors hover:border-[#FFC107] hover:text-[#0A0A0C]"
                >
                  <Plus size={15} />
                  {t("revealSizes")}
                  <span className="font-semibold text-gray-400">
                    ·&nbsp;&nbsp;{sizes.slice(5).join(" · ")}
                  </span>
                </button>
              </div>
            ) : null}
          </SectionReveal>
        )}

        {/* ─────────────── PHASES VIEW ─────────────── */}
        {view === "phases" && (() => {
          const sizeNum = parseMoney(activeSize);
          const phaseCount = activeType === "instant" ? 0 : activeType === "one-step" ? 1 : 2;
          const ruleVal = (raw: string) =>
            raw === "$0"
              ? "—"
              : numbersMode === "percent"
                ? toPercent(raw, sizeNum)
                : toCurrency(raw, currency);
          const phaseRows: { label: string; value: (p: number | "master") => string }[] = [
            { label: t("profitTarget"), value: (p) => (p === "master" ? "—" : ruleVal(p === 1 ? X.phase1 : X.phase2)) },
            { label: t("maxLoss"), value: () => ruleVal(X.maxLoss) },
            { label: t("maxDailyLoss"), value: () => ruleVal(X.maxDaily) },
            { label: t("minTradingDays"), value: (p) => (p === "master" ? "—" : t("day")) },
          ];
          const gridCols =
            phaseCount > 0
              ? { gridTemplateColumns: `minmax(120px, 26%) repeat(${phaseCount}, 1fr) minmax(170px, 24%)` }
              : { gridTemplateColumns: "minmax(120px, 45%) 1fr" };

          return (
            <>
              {/* Account size selector — centered pill group */}
              <SectionReveal delay={0.16}>
                <div className="mb-6 flex justify-center">
                  <div className="flex flex-wrap justify-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1.5">
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
                            "whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all",
                            active
                              ? "bg-[#0A0A0C] text-white shadow-sm"
                              : "text-gray-500 hover:text-gray-900"
                          )}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SectionReveal>

              {/* Phases table (desktop) */}
              <SectionReveal delay={0.2}>
                <div
                  data-od-id="challenge-table"
                  className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid"
                  style={{ ...gridCols, gridTemplateRows: "auto repeat(4, auto)" }}
                >
                  {/* Header row */}
                  <div className="border-r border-gray-100" aria-hidden="true" />
                  {Array.from({ length: phaseCount }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center pb-5 pt-6">
                      <div className="flex w-full items-center">
                        {i > 0 ? (
                          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                        ) : (
                          <span className="flex-1" aria-hidden="true" />
                        )}
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-extrabold text-gray-600">
                          {i + 1}
                        </span>
                        {i < phaseCount - 1 ? (
                          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                        ) : (
                          <span className="flex-1" aria-hidden="true" />
                        )}
                      </div>
                      <p className="mt-4 text-lg font-extrabold text-[#0A0A0C]">
                        {i === 0 ? t("phase1") : t("phase2")}
                      </p>
                    </div>
                  ))}
                  {/* Master header cell (dark column) */}
                  <div
                    className={cn(
                      "flex flex-col items-center bg-[#0A0A0C] px-4 pb-5 pt-6 text-white",
                      phaseCount === 0 && "my-3 mr-3 rounded-xl"
                    )}
                  >
                    <p className="text-sm font-semibold text-white/55">{t("funded")}</p>
                    <span className="mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC107]">
                      <Crown size={20} className="text-[#0A0A0C]" fill="#0A0A0C" />
                    </span>
                    <p className="mt-4 text-lg font-extrabold">Master</p>
                  </div>

                  {/* Value rows */}
                  {phaseRows.map((r, ri) => (
                    <Fragment key={r.label}>
                      <div
                        className={cn(
                          "flex items-center border-t border-gray-100 px-5 py-5",
                          ri === 0 && "border-t-0"
                        )}
                      >
                        <span className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-400">
                          {r.label}
                          <Info size={13} className="shrink-0 opacity-50" aria-hidden="true" />
                        </span>
                      </div>
                      {Array.from({ length: phaseCount }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center justify-center border-t border-gray-100 px-3 py-5 text-center text-[15px] font-bold text-[#0A0A0C]",
                            ri === 0 && "border-t-0"
                          )}
                        >
                          {r.value(i + 1)}
                        </div>
                      ))}
                      <div
                        className={cn(
                          "flex items-center justify-center bg-[#0A0A0C] px-3 py-5 text-center text-[15px] font-bold text-white",
                          ri === 0 && "border-t-0"
                        )}
                      >
                        {r.value("master")}
                      </div>
                    </Fragment>
                  ))}
                </div>

                {/* Phases table (mobile: stacked) */}
                <div className="grid gap-3 md:hidden" data-od-id="challenge-table-mobile">
                  {(phaseCount > 0
                    ? [
                        ...Array.from({ length: phaseCount }).map((_, i) => ({
                          key: `p${i + 1}`,
                          subtitle: i === 0 ? t("evaluationStage") : t("verificationStage"),
                          title: i === 0 ? t("phase1") : t("phase2"),
                          dark: false,
                        })),
                        { key: "funded", subtitle: t("funded"), title: "Master", dark: true },
                      ]
                    : [{ key: "funded", subtitle: t("funded"), title: "Master", dark: true }]
                  ).map((col) => (
                    <div
                      key={col.key}
                      className={cn(
                        "rounded-2xl border p-4",
                        col.dark
                          ? "border-[#0A0A0C] bg-[#0A0A0C] text-white"
                          : "border-gray-200 bg-gray-50/60 text-[#0A0A0C]"
                      )}
                    >
                      <p
                        className={cn(
                          "text-[11px] font-bold uppercase tracking-[0.14em]",
                          col.dark ? "text-white/50" : "text-gray-400"
                        )}
                      >
                        {col.subtitle}
                      </p>
                      <p className="mt-0.5 text-lg font-extrabold">{col.title}</p>
                      <div className="mt-3 space-y-2.5 border-t pt-3 border-gray-200/80">
                        {phaseRows.map((r) => (
                          <div
                            key={r.label}
                            className="flex items-center justify-between gap-3 text-[13px]"
                          >
                            <span className={col.dark ? "text-white/55" : "text-gray-500"}>
                              {r.label}
                            </span>
                            <span className="font-bold tabular-nums">
                              {r.value(col.key === "funded" ? "master" : col.key === "p2" ? 2 : 1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Bottom bar — outside the table */}
              <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-semibold text-gray-400">{t("account")}</span>
                    <span className="font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold text-[#0A0A0C]">
                      {activeSize}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-semibold text-gray-400">{t("price")}</span>
                    <span className="font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold text-[#0A0A0C] tabular-nums">
                      {toCurrency(Y.price, currency)}
                    </span>
                    <span className="text-lg font-semibold text-gray-500 line-through tabular-nums">
                      {toCurrency(Y.oldPrice, currency)}
                    </span>
                  </div>
                </div>
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-od-id="challenge-cta"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#FFC107] px-8 text-[15px] font-black text-[#0A0A0C] transition-all hover:bg-[#E6AE06] hover:shadow-[0_0_20px_rgba(255,193,7,0.28)] sm:w-auto"
                >
                  {t("startNow")}
                </a>
              </div>
            </>
          );
        })()}

        {/* Disclaimer */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-5 text-gray-400">
          {t("disclaimer")}
        </p>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── rows */

function SubRow({
  label,
  value,
  dark,
  muted,
}: {
  label: string;
  value: string;
  dark: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={cn("text-[12px]", dark ? "text-white/50" : "text-gray-400")}>
        {label}
      </span>
      <span
        className={cn(
          "text-[13px] font-bold tabular-nums",
          muted ? (dark ? "text-white/40" : "text-gray-500") : dark ? "text-white" : "text-gray-900"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function RuleRow({
  label,
  value,
  dark,
  last,
}: {
  label: string;
  value: string;
  dark: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 py-2.5",
        !last && "border-b",
        dark ? "border-white/10" : "border-gray-200/80"
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1 text-[13px] font-bold",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {label}
        <Info size={12} className="shrink-0 opacity-40" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-right text-[13px] font-bold tabular-nums",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {value}
      </span>
    </div>
  );
}
