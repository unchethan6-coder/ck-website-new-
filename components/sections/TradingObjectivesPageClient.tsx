"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Coins,
  Gauge,
  Infinity,
  Percent,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { GoldButton } from "@/components/shared/GoldButton";
import { ObjectivesHUDVisual } from "@/components/shared/ObjectivesHUDVisual";
import { Aurora } from "@/components/fx/Aurora";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ChallengeConfig, ChallengeSizeRule } from "@/lib/cms";
import {
  ACCOUNT_SIZES,
  CHALLENGE_PRICES,
  CHALLENGE_RULES,
  CHALLENGE_SPLITS,
  type ChallengeType,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type Path = "1step" | "2step" | "instant";
type EvalType = "standard" | "middle" | "pro";
type Platform = "both" | "mt5" | "tradelocker";

export interface TradingObjectivesInitial {
  path: Path;
  evalType: EvalType;
  platform: Platform;
  size: string | null;
}

function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  id: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-od-id={id}>
      <p
        className={`mb-3 text-xs font-black uppercase tracking-[0.22em] ${
          dark ? "text-[#FFC107]" : "text-[#9A6B00]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-[family-name:var(--font-inter-tight)] text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl ${
          dark ? "text-white" : "text-[#0A0A0C]"
        }`}
      >
        {title}
      </h2>
      {children ? (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm sm:text-base font-medium leading-relaxed ${
            dark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

function PlatformCell({
  platform,
  className,
}: {
  platform: Platform;
  className?: string;
}) {
  const active = (id: Platform) =>
    platform === "both"
      ? "text-gray-900 font-bold"
      : platform === id
      ? "text-[#8A5A00] font-black"
      : "text-gray-400";
  return (
    <span className={cn("whitespace-nowrap font-mono text-xs", className)}>
      <span className={active("mt5")}>MT5</span>
      <span className="text-gray-400"> / </span>
      <span className={active("tradelocker")}>TradeLocker</span>
    </span>
  );
}

function dollarNote(
  rule: ChallengeSizeRule | undefined,
  size: string | null,
  kind: "two" | "one" | "instant" = "two"
) {
  if (!size) return "Select an account size to calculate exact currency objectives.";
  if (!rule) return `Objective values for ${size} pending publication.`;
  const consistency = rule.consistency === "N/A" ? "None" : rule.consistency;
  if (kind === "instant")
    return `Calculated for ${size}: Max Daily Loss ${rule.maxDaily} · Max Total Drawdown ${rule.maxLoss} · Consistency ${consistency}.`;
  if (kind === "one") {
    return `Calculated for ${size}: Profit Target ${rule.phase1} · Max Daily Loss ${rule.maxDaily} · Max Total Loss ${rule.maxLoss} · Consistency ${consistency}.`;
  }
  return `Calculated for ${size}: Phase 1 Target ${rule.phase1} · Phase 2 Target ${rule.phase2} · Max Daily Loss ${rule.maxDaily} · Max Total Loss ${rule.maxLoss} · Consistency ${consistency}.`;
}

type CardRow = { label: string; value: React.ReactNode; sub?: string; muted?: boolean };

function withDollar(
  showDollar: boolean,
  main: string,
  dollar: string | undefined
): Pick<CardRow, "value" | "sub"> {
  if (showDollar && dollar && dollar !== "$0") return { value: main, sub: dollar };
  return { value: main };
}

function accountRuleValue(
  showDollar: boolean,
  dollar: string | undefined,
  defaultText: string
): React.ReactNode {
  return showDollar && dollar ? dollar : defaultText;
}

function PhaseCard({
  badge,
  title,
  subtitle,
  rows,
  accent = false,
  footer,
  className,
}: {
  badge: React.ReactNode;
  title: string;
  subtitle?: string;
  rows: CardRow[];
  accent?: boolean;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5",
        accent
          ? "border-[#FFC107] ring-2 ring-[#FFC107]/30 shadow-[0_12px_28px_-8px_rgba(255,193,7,0.2)]"
          : "border-gray-200 hover:border-[#FFC107]/60 hover:shadow-md",
        className
      )}
      data-od-id={`phase-card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b px-6 py-4 sm:px-7 sm:py-5",
          accent
            ? "border-[#FFC107]/20 bg-[#FFFDF5]"
            : "border-gray-100 bg-[#FAFAFA]"
        )}
      >
        <div className="flex items-center gap-3.5">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-bold shadow-sm",
              accent
                ? "border-[#FFC107]/40 bg-[#FFC107] text-[#0A0A0C]"
                : "border-gray-200 bg-white text-[#8A5A00]"
            )}
          >
            {badge}
          </span>
          <div className="min-w-0">
            <h4 className="truncate font-[family-name:var(--font-inter-tight)] text-base sm:text-lg font-black leading-tight text-[#0A0A0C]">
              {title}
            </h4>
            {subtitle ? (
              <p className="mt-0.5 text-xs font-semibold text-gray-600">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {accent && (
          <span className="shrink-0 rounded-full bg-[#FFC107]/25 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#7A4E00]">
            Target Destination
          </span>
        )}
      </div>

      <div className="flex-1 divide-y divide-gray-100 px-6 py-2 sm:px-7">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {row.label}
            </span>
            <span className="text-right">
              <span
                className={cn(
                  "block text-xs sm:text-sm font-black leading-tight",
                  row.muted ? "text-gray-500 font-medium" : "text-[#0A0A0C]"
                )}
              >
                {row.value}
              </span>
              {row.sub ? (
                <span className="mt-0.5 block font-mono text-xs font-black text-[#8A5A00]">
                  {row.sub}
                </span>
              ) : null}
            </span>
          </div>
        ))}
      </div>

      {footer ? (
        <div className="border-t border-gray-100 bg-[#FAFAFA] px-6 py-4 sm:px-7">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function Step2Detail({
  evalType,
  platform,
  size,
  rule,
}: {
  evalType: EvalType;
  platform: Platform;
  size: string | null;
  rule: ChallengeSizeRule | undefined;
}) {
  const t = useTranslations("tradingObjectives");
  const middle = evalType === "middle";
  const showDollar = Boolean(size && rule);

  if (evalType === "pro") {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <AlertCircle className="mb-3 text-[#8A5A00]" size={36} />
        <h4 className="font-[family-name:var(--font-inter-tight)] text-xl font-black text-[#0A0A0C]">
          2-Step Pro Specifications
        </h4>
        <p className="mt-2 max-w-md text-sm font-medium text-gray-600">
          {t("rows.twoStepProPending")}
        </p>
      </div>
    );
  }

  const platformRow: CardRow = {
    label: t("rows.platform"),
    value: <PlatformCell platform={platform} />,
  };
  const profitTarget = (p1: string, p2: string | undefined) =>
    withDollar(showDollar, p1, p2);
  const maxDaily = (main: string) =>
    middle
      ? {
          value: accountRuleValue(
            showDollar,
            rule?.maxDaily,
            t("rows.accordingToRules")
          ),
        }
      : withDollar(showDollar, main, rule?.maxDaily);
  const maxLoss = (main: string) =>
    middle
      ? {
          value: accountRuleValue(
            showDollar,
            rule?.maxLoss,
            t("rows.accordingToRules")
          ),
        }
      : withDollar(showDollar, main, rule?.maxLoss);
  const consistency = middle ? "30%" : t("rows.none");

  const phase1: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    {
      label: t("rows.profitTarget"),
      ...profitTarget(middle ? "8%" : "10%", rule?.phase1),
    },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "1 Day" },
    { label: t("rows.consistency"), value: consistency },
    platformRow,
  ];

  const phase2: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    {
      label: t("rows.profitTarget"),
      ...withDollar(showDollar, "5%", rule?.phase2),
    },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "1 Day" },
    { label: t("rows.consistency"), value: consistency },
    platformRow,
  ];

  const qa: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    { label: t("rows.profitTarget"), value: "None — Live Profit Phase", muted: false },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "None" },
    { label: t("rows.consistency"), value: t("rows.accordingToRules") },
    platformRow,
  ];

  return (
    <div className="space-y-6">
      {/* 2 Evaluation Phase Cards side-by-side with generous room */}
      <div className="grid gap-6 sm:grid-cols-2">
        <PhaseCard
          badge={<Target size={20} />}
          title={t("phaseCards.phase1Title")}
          subtitle={t("phaseCards.phase1Sub")}
          rows={phase1}
        />
        <PhaseCard
          badge={<Gauge size={20} />}
          title={t("phaseCards.phase2Title")}
          subtitle={t("phaseCards.phase2Sub")}
          rows={phase2}
        />
      </div>

      {/* Funded Qualified Analyst Milestone Card */}
      <PhaseCard
        badge={<ShieldCheck size={20} />}
        title={t("phaseCards.qaTitle")}
        subtitle="Simulated live trading account upon passing Phase 1 & 2 review"
        rows={qa}
        accent
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#7A4E00]">
              <Sparkles size={16} className="shrink-0 text-[#8A5A00]" />
              {t("phaseCards.qaFooter")}
            </p>
            <span className="font-mono text-xs font-bold text-gray-600">
              Reward Cycle: Bi-weekly payouts
            </span>
          </div>
        }
      />

      {/* Calculated currency breakdown note */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
        <p className="text-xs sm:text-sm font-bold text-gray-800">
          {dollarNote(rule, size, "two")}
        </p>
      </div>

      {/* Explanatory stage cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          [t("twoStepSection.phase1ExplTitle"), t("twoStepSection.phase1ExplDesc")],
          [t("twoStepSection.phase2ExplTitle"), t("twoStepSection.phase2ExplDesc")],
        ].map(([cardTitle, copy]) => (
          <div
            key={cardTitle}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A5A00]">
              {cardTitle}
            </p>
            <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-gray-700">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step1Detail({
  platform,
  size,
  rule,
}: {
  platform: Platform;
  size: string | null;
  rule: ChallengeSizeRule | undefined;
}) {
  const t = useTranslations("tradingObjectives");
  const showDollar = Boolean(size && rule);
  const rows: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    {
      label: t("rows.profitTarget"),
      ...withDollar(showDollar, "10%", rule?.phase1),
    },
    {
      label: t("rows.maxDailyLoss"),
      ...withDollar(showDollar, "4%", rule?.maxDaily),
    },
    {
      label: t("rows.maxLoss"),
      ...withDollar(showDollar, "6%", rule?.maxLoss),
    },
    { label: t("rows.minTradingDays"), value: "1 Day" },
    {
      label: t("rows.consistency"),
      value: t("rows.consistencyWhereApplicable"),
    },
    { label: t("rows.platform"), value: <PlatformCell platform={platform} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <PhaseCard
          badge={<Target size={20} />}
          title={t("phaseCards.evaluationTitle")}
          subtitle={t("phaseCards.evaluationSub")}
          rows={rows}
          accent
          footer={
            <p className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#7A4E00]">
              <Sparkles size={16} className="shrink-0 text-[#8A5A00]" />
              Progress immediately to Qualified Analyst upon target completion
            </p>
          }
        />
        <div
          className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm"
          data-od-id="objectives-1step-list"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC107]/25 px-3 py-1 text-[10.5px] font-black uppercase tracking-wider text-[#7A4E00]">
              Accelerated Path
            </span>
            <h4 className="mt-4 font-[family-name:var(--font-inter-tight)] text-xl font-black text-[#0A0A0C]">
              {t("phaseCards.afterEvalTitle")}
            </h4>
            <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-gray-700">
              {t("phaseCards.afterEvalDesc")}
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                "Single phase target — no second verification stage",
                "Minimum 1 trading day requirement",
                "Up to 100% simulated profit payouts upon funding",
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] font-bold text-[#0A0A0C]">
                  <CheckCircle2 size={16} className="shrink-0 text-[#8A5A00] mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 border-t border-gray-100 pt-4 text-xs sm:text-sm font-bold text-gray-800">
            {dollarNote(rule, size, "one")}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstantDetail({
  platform,
  size,
  rule,
}: {
  platform: Platform;
  size: string | null;
  rule: ChallengeSizeRule | undefined;
}) {
  const t = useTranslations("tradingObjectives");
  const offered = Boolean(rule);
  const showDollar = Boolean(size && rule);
  const rows: CardRow[] = [
    {
      label: t("rows.maxDailyLoss"),
      value:
        showDollar && rule ? rule.maxDaily : t("rows.accordingToRules"),
    },
    {
      label: t("rows.maxLoss"),
      value:
        showDollar && rule ? rule.maxLoss : t("rows.accordingToRules"),
    },
    {
      label: t("rows.consistencyReq"),
      value:
        showDollar && rule
          ? rule.consistency === "N/A"
            ? t("rows.none")
            : rule.consistency
          : t("rows.accordingToRules"),
    },
    { label: t("rows.tradingConditions"), value: t("rows.accordingToRules") },
    { label: t("rows.accountSize"), value: size ?? t("rows.accordingToRules") },
    { label: t("rows.platform"), value: <PlatformCell platform={platform} /> },
    { label: t("rows.rewardEligibility"), value: t("rows.upToSplit") },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <PhaseCard
          badge={<Zap size={20} />}
          title={t("phaseCards.instantTitle")}
          subtitle={t("phaseCards.instantSub")}
          rows={rows}
          accent
          footer={
            <p className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#7A4E00]">
              <Sparkles size={16} className="shrink-0 text-[#8A5A00]" />
              Instant simulated capital allocation with bi-weekly payout cycles
            </p>
          }
        />
        <div
          className="flex flex-col justify-between rounded-2xl border border-[#FFC107]/40 bg-[#FFFDF5] p-6 sm:p-7 shadow-sm"
          data-od-id="objectives-instant-panel"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC107] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0A0A0C]">
              Direct Funding
            </span>
            <h4 className="mt-4 font-[family-name:var(--font-inter-tight)] text-xl font-black text-[#0A0A0C]">
              {t("phaseCards.beforeStartTitle")}
            </h4>
            <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-gray-700">
              {t("phaseCards.beforeStartDesc")}
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                "Zero evaluation phases — begin under active risk rules",
                "Instant account activation upon checkout",
                "Eligible for regular simulated reward disbursements",
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] font-bold text-[#0A0A0C]">
                  <CheckCircle2 size={16} className="shrink-0 text-[#8A5A00] mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 border-t border-[#FFC107]/20 pt-4 text-xs sm:text-sm font-bold text-gray-800">
            {!size
              ? t("step2SelectPrompt")
              : offered
              ? dollarNote(rule, size, "instant")
              : t("instantSection.notOffered", { size })}
          </p>
        </div>
      </div>
    </div>
  );
}

function CompareModels({
  path,
  size,
  typeParam,
}: {
  path: Path;
  size: string | null;
  typeParam: string;
}) {
  const t = useTranslations("tradingObjectives");
  const activeIndex = path === "1step" ? 0 : path === "2step" ? 1 : 2;

  const compareRows = [
    {
      label: t("compareRows.phases"),
      cells: [
        t("compareRows.phases1"),
        t("compareRows.phases2"),
        t("compareRows.phasesInstant"),
      ],
    },
    {
      label: t("compareRows.period"),
      cells: [
        t("rows.unlimited"),
        t("rows.unlimited"),
        t("rows.accordingToRules"),
      ],
    },
    {
      label: t("compareRows.minDays"),
      cells: [
        t("compareRows.minDays1"),
        t("compareRows.minDays2"),
        t("rows.accordingToRules"),
      ],
    },
    {
      label: t("compareRows.platforms"),
      cells: ["MT5 / TradeLocker", "MT5 / TradeLocker", "MT5 / TradeLocker"],
    },
    {
      label: t("compareRows.reset"),
      cells: [
        t("compareRows.resetAvail"),
        t("compareRows.resetAvail"),
        t("rows.checkConditions"),
      ],
    },
    {
      label: t("compareRows.reward"),
      cells: [t("rows.upToSplit"), t("rows.upToSplit"), t("rows.upToSplit")],
    },
  ];

  return (
    <Container>
      <SectionHeading
        id="compare-models-heading"
        eyebrow={t("compareEyebrow")}
        title={t("compareTitle")}
      >
        Compare evaluation structures side-by-side to choose the exact risk and verification model that matches your strategy.
      </SectionHeading>

      {/* Mobile view: Stacked cards (< sm) */}
      <div className="mt-8 space-y-4 sm:hidden" data-od-id="compare-models-cards-mobile">
        {[
          {
            title: t("paths.oneStep"),
            index: 0,
            badge: path === "1step" ? t("selectedBadge") : null,
          },
          {
            title: t("paths.twoStep"),
            index: 1,
            badge: path === "2step" ? t("selectedBadge") : "Most Popular",
          },
          {
            title: t("paths.instant"),
            index: 2,
            badge: path === "instant" ? t("selectedBadge") : "Direct Funding",
          },
        ].map((m) => {
          const isCurrentActive = m.index === activeIndex;
          return (
            <div
              key={m.title}
              className={cn(
                "rounded-2xl border p-5 transition-all",
                isCurrentActive
                  ? "border-[#FFC107] bg-[#FFFDF5] shadow-md ring-2 ring-[#FFC107]/30"
                  : "border-gray-200 bg-white shadow-sm"
              )}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8A5A00]">
                    Evaluation Model
                  </span>
                  <h4 className="font-[family-name:var(--font-inter-tight)] text-lg font-black text-[#0A0A0C]">
                    {m.title}
                  </h4>
                </div>
                {m.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider",
                      isCurrentActive
                        ? "bg-[#FFC107] text-[#0A0A0C]"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {m.badge}
                  </span>
                )}
              </div>

              <div className="mt-3.5 space-y-2.5 divide-y divide-gray-100/80">
                {compareRows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between pt-2 text-xs"
                  >
                    <span className="font-semibold text-gray-500">{r.label}</span>
                    <span className="font-bold text-[#0A0A0C] text-right">
                      {r.label === t("compareRows.platforms") ? (
                        <PlatformCell platform="both" />
                      ) : (
                        r.cells[m.index]
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet / Desktop view: Horizontal table (sm+) */}
      <div
        className="mx-auto mt-6 sm:mt-10 max-w-5xl hidden sm:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-md"
        data-od-id="compare-models-table"
      >
        <div className="min-w-[620px]">
          <div className="grid grid-cols-4 border-b border-gray-200 bg-[#F8F9FA] text-xs font-black uppercase tracking-[0.14em]">
            <span className="px-6 py-5 text-gray-700">
              {t("compareTableHeader")}
            </span>
            {[t("paths.oneStep"), t("paths.twoStep"), t("paths.instant")].map(
              (label, i) => (
                <span
                  key={label}
                  className={cn(
                    "flex items-center gap-2 px-6 py-5",
                    i === activeIndex
                      ? "bg-[#FFFDF5] text-[#7A4E00] font-black border-x border-[#FFC107]/40"
                      : "text-[#0A0A0C]"
                  )}
                >
                  {label}
                  {i === activeIndex && (
                    <span className="rounded bg-[#FFC107] px-2 py-0.5 text-[9px] font-black tracking-wider text-[#0A0A0C]">
                      {t("selectedBadge")}
                    </span>
                  )}
                </span>
              )
            )}
          </div>
          {compareRows.map((row, rowIdx) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-4 border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50",
                rowIdx % 2 === 1 && "bg-[#FAFAFA]"
              )}
            >
              <span className="px-6 py-4 text-xs sm:text-sm font-black text-[#0A0A0C]">
                {row.label}
              </span>
              {row.cells.map((cell, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-6 py-4 text-xs sm:text-sm",
                    i === activeIndex
                      ? "bg-[#FFFDF5] font-black text-[#0A0A0C] border-x border-[#FFC107]/20"
                      : "font-semibold text-gray-800"
                  )}
                >
                  {row.label === t("compareRows.platforms") ? (
                    <PlatformCell platform="both" />
                  ) : (
                    cell
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href={
            size
              ? `https://app.ckcapital.co.uk/signup`
              : `https://app.ckcapital.co.uk/signup`
          }
          data-od-id="compare-models-cta"
          className="w-full sm:w-auto"
        >
          <GoldButton size="lg" className="w-full sm:min-w-64 shadow-md">
            {t("chooseEvaluation")} <ArrowRight size={16} />
          </GoldButton>
        </a>
      </div>
    </Container>
  );
}

function ObjectiveFaq() {
  const t = useTranslations("tradingObjectives");
  const faqs = (t.raw("faqs") as Array<{ q: string; a: string }>) ?? [];

  return (
    <Container>
      <SectionHeading
        id="objectives-faq-heading"
        eyebrow={t("faqEyebrow")}
        title={t("faqTitle")}
        dark
      >
        Everything you need to know about our evaluation phases, drawdown rules, and verification process.
      </SectionHeading>
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion multiple={false} className="space-y-3.5">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={String(i)}
              className="rounded-2xl border border-white/15 bg-[#12100A] px-6 transition-all data-[open]:border-[#FFC107]/50 data-[open]:bg-[#18140B]"
            >
              <AccordionTrigger className="py-5 text-left text-sm sm:text-base font-bold text-white hover:text-[#FFC107] hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm sm:text-[14.5px] font-medium leading-relaxed text-gray-200">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}

function pathToType(path: Path, evalType: EvalType): ChallengeType {
  if (path === "1step") return "one-step";
  if (path === "2step") return evalType === "middle" ? "middleweight" : "standard";
  return "instant";
}

export function TradingObjectivesPageClient({
  config,
  initial,
}: {
  config: ChallengeConfig | null;
  initial: TradingObjectivesInitial;
}) {
  const t = useTranslations("tradingObjectives");
  const sizes = config?.sizes?.length ? config.sizes : ACCOUNT_SIZES;
  const rules = config?.rules ?? CHALLENGE_RULES;

  const [path, setPath] = useState<Path>(initial.path);
  const [evalType, setEvalType] = useState<EvalType>(initial.evalType);
  const [platform, setPlatform] = useState<Platform>(initial.platform);
  const [size, setSize] = useState<string | null>(initial.size ?? "$100K");

  const pathsList: { id: Path; label: string; sub: string; badge: string }[] = [
    {
      id: "2step",
      label: t("paths.twoStep"),
      sub: t("paths.twoStepSub"),
      badge: "Most Popular",
    },
    {
      id: "1step",
      label: t("paths.oneStep"),
      sub: t("paths.oneStepSub"),
      badge: "Fast Track",
    },
    {
      id: "instant",
      label: t("paths.instant"),
      sub: t("paths.instantSub"),
      badge: "No Evaluation",
    },
  ];

  const evalTypesList: { id: EvalType; label: string }[] = [
    { id: "standard", label: t("evalTypes.standard") },
    { id: "middle", label: t("evalTypes.middle") },
    { id: "pro", label: t("evalTypes.pro") },
  ];

  const platformsList: {
    id: Platform;
    label: string;
    tagline: string;
    logo: string;
    desc: string;
  }[] = [
    {
      id: "mt5",
      label: t("platforms.mt5.label"),
      tagline: t("platforms.mt5.tagline"),
      logo: "/images/logos/mt5.png",
      desc: t("platforms.mt5.desc"),
    },
    {
      id: "tradelocker",
      label: t("platforms.tradelocker.label"),
      tagline: t("platforms.tradelocker.tagline"),
      logo: "/images/logos/tradelocker.jpeg",
      desc: t("platforms.tradelocker.desc"),
    },
  ];

  const glossaryIcons = [Target, Gauge, ShieldCheck, CalendarDays, Percent];
  const rawGlossary =
    (t.raw("glossary") as Array<{ title: string; desc: string }>) ?? [];
  const glossary = rawGlossary.map((item, i) => ({
    icon: glossaryIcons[i] || Target,
    title: item.title,
    desc: item.desc,
  }));

  const rawProgression =
    (t.raw("progression") as Array<{
      step: string;
      title: string;
      desc: string;
    }>) ?? [];
  const qaBenefits = (t.raw("qaBenefits") as string[]) ?? [];

  const syncUrl = (next: {
    path?: Path;
    evalType?: EvalType;
    platform?: Platform;
    size?: string | null;
  }) => {
    const params = new URLSearchParams();
    const p = next.path ?? path;
    const e = next.evalType ?? evalType;
    const pl = next.platform ?? platform;
    const s = next.size ?? size;
    params.set("path", p);
    params.set("evalType", e);
    params.set("platform", pl);
    if (s) params.set("size", s);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const selectPath = (id: Path) => {
    setPath(id);
    if (id !== "2step" && evalType !== "standard") setEvalType("standard");
    const type = pathToType(id, id !== "2step" ? "standard" : evalType);
    const nextSize = size && !rules[type]?.[size] ? "$100K" : size;
    if (nextSize !== size) setSize(nextSize);
    syncUrl({
      path: id,
      ...(id !== "2step" ? { evalType: "standard" } : {}),
      ...(nextSize !== size ? { size: nextSize } : {}),
    });
  };

  const selectEvalType = (id: EvalType) => {
    setEvalType(id);
    syncUrl({ evalType: id });
  };

  const selectPlatform = (id: Platform) => {
    const next = platform === id ? "both" : id;
    setPlatform(next);
    syncUrl({ platform: next });
  };

  const selectSize = (id: string) => {
    setSize(id);
    syncUrl({ size: id });
  };

  const modelKey = evalType === "middle" ? "middleweight" : "standard";
  const step2Rule = size ? rules[modelKey]?.[size] : undefined;
  const step1Rule = size ? rules["one-step"]?.[size] : undefined;
  const instantRule = size ? rules["instant"]?.[size] : undefined;
  const typeParam = pathToType(path, evalType);

  // Dynamic pricing calculation for sticky summary
  const priceData = size ? CHALLENGE_PRICES[typeParam]?.[size] : undefined;
  const activePrice = priceData ? priceData.price : "$19.20";
  const activeOldPrice = priceData ? priceData.oldPrice : "$64.00";
  const activeRule =
    path === "2step" ? step2Rule : path === "1step" ? step1Rule : instantRule;

  return (
    <div data-od-id="trading-objectives-page">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* S1. HERO SECTION (DARK)                                     */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        className="relative isolate -mt-[72px] md:-mt-[76px] flex min-h-[calc(100dvh-44px)] flex-col overflow-hidden border-b border-foreground/[0.07] bg-[#070709]"
        data-od-id="objectives-hero"
      >
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] rounded-full opacity-70 fx-hero-glow-1" />
          <div className="absolute top-[15%] -left-[10%] w-[60%] h-[70%] rounded-full opacity-60 fx-hero-glow-2" />
          <div className="absolute top-[20%] -right-[10%] w-[55%] h-[65%] rounded-full opacity-55 fx-hero-glow-3" />
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full opacity-40 fx-hero-glow-4" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[2]">
          <Aurora variant="hero" grid className="absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            <div className="lg:col-span-7 xl:col-span-6 min-w-0">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-[#FFC107]/40 bg-[#FFC107]/15 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]"
                data-od-id="objectives-hero-eyebrow"
              >
                <Sparkles size={13} /> {t("heroBadge")}
              </div>

              <h1
                className="mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-4xl font-black uppercase leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px]"
                data-od-id="objectives-hero-title"
              >
                {t("heroTitlePrefix")}{" "}
                <span className="shimmer-text">{t("heroTitleShimmer")}</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                {t("heroDesc")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#evaluation-selector" data-od-id="objectives-hero-primary">
                  <GoldButton size="lg" className="px-8 shadow-[0_0_24px_rgba(255,193,7,0.35)]">
                    {t("chooseEvaluation")} <ArrowRight size={16} />
                  </GoldButton>
                </a>
                <a
                  href="#the-journey"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-bold text-white hover:border-[#FFC107]/60 hover:bg-[#FFC107]/15 hover:text-[#FFC107] transition-all duration-200 shadow-sm"
                  data-od-id="objectives-hero-secondary"
                >
                  Explore Roadmap <ArrowRight size={15} />
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-300">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#FFC107]" />
                  {t("badgeSimulated")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Target size={16} className="text-[#FFC107]" />
                  {t("badgeProgression")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Infinity size={16} className="text-[#FFC107]" />
                  Zero Time Pressure
                </span>
              </div>
            </div>

            <div
              className="lg:col-span-5 xl:col-span-6 min-w-0"
              data-od-id="objectives-hero-dashboard"
            >
              <ObjectivesHUDVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S2. THE PROGRESSION JOURNEY (DARK)                          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="the-journey"
        className="relative bg-[#0D0C08] py-20 md:py-28 text-white border-b border-white/10 scroll-mt-20"
        data-od-id="progression"
      >
        <Container>
          <SectionHeading
            id="progression-heading"
            eyebrow={t("progressionEyebrow")}
            title={t("progressionTitle")}
            dark
          >
            A transparent 3-stage milestone path from evaluation to professional funded trader status.
          </SectionHeading>

          <div className="mx-auto mt-14 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {rawProgression.map((item, i) => (
                <div
                  key={item.step}
                  className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#12100A] p-7 shadow-md transition-all duration-200 hover:border-[#FFC107]/50 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/15 font-mono text-sm font-black text-[#FFC107]">
                        0{i + 1}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mt-6 font-[family-name:var(--font-inter-tight)] text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-gray-200">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* QA Benefits Strip */}
            <div className="mt-10 rounded-2xl border border-[#FFC107]/40 bg-[#15120B] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]">
                    {t("qaBenefitsTitle")}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-gray-300 font-medium">
                    Verified benefits unlocked once you complete evaluation criteria
                  </p>
                </div>
                <span className="self-start md:self-auto rounded-full bg-[#FFC107]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#FFC107]">
                  Target Destination
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {qaBenefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white"
                  >
                    <Check size={14} className="text-[#FFC107]" strokeWidth={3} />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S3. INTERACTIVE OBJECTIVES & CALCULATOR (LIGHT)             */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="evaluation-selector"
        className="scroll-mt-24 bg-[#F4F5F7] border-b border-gray-200 py-16 md:py-24 text-[#0A0A0C]"
        data-od-id="evaluation-selector"
      >
        <Container>
          <SectionHeading
            id="evaluation-calculator-heading"
            eyebrow="EVALUATION CALCULATOR"
            title="Interactive Trading Objectives"
          >
            Select your preferred challenge model and account size to calculate exact profit targets, drawdown thresholds, and parameters in real time.
          </SectionHeading>

          {/* Master Dashboard Grid */}
          <div className="mx-auto mt-12 max-w-6xl">
            {/* Top Control Bar: Challenge Model Tabs */}
            <div
              className="grid gap-3 sm:grid-cols-3"
              role="tablist"
              aria-label="Evaluation model"
              data-od-id="selector-path-tabs"
            >
              {pathsList.map((tab) => {
                const isSelected = path === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => selectPath(tab.id)}
                    className={cn(
                      "group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-6 text-left transition-all duration-200 hover:-translate-y-0.5",
                      isSelected
                        ? "border-[#FFC107] bg-white shadow-md ring-2 ring-[#FFC107]/30"
                        : "border-gray-200 bg-white hover:border-[#FFC107]/60"
                    )}
                    data-od-id={`selector-path-${tab.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-[family-name:var(--font-inter-tight)] text-base sm:text-lg font-black uppercase tracking-wide",
                          isSelected ? "text-[#0A0A0C]" : "text-gray-900"
                        )}
                      >
                        {tab.label}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider",
                          isSelected
                            ? "bg-[#FFC107] text-[#0A0A0C]"
                            : "bg-gray-200 text-gray-800 group-hover:bg-[#FFC107]/30 group-hover:text-[#7A4E00]"
                        )}
                      >
                        {tab.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-600">
                      {tab.sub}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* 2-Step Sub-Type Selector (if 2step active) */}
            {path === "2step" && (
              <div
                className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm"
                data-od-id="selector-evaltype"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8A5A00]">
                    2-Step Mode:
                  </span>
                  <span className="text-xs sm:text-sm text-gray-700 font-semibold">
                    Select your risk parameter profile
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {evalTypesList.map((tItem) => {
                    const isSelected = evalType === tItem.id;
                    return (
                      <button
                        key={tItem.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => selectEvalType(tItem.id)}
                        className={cn(
                          "rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-150",
                          isSelected
                            ? "bg-[#FFC107] text-[#0A0A0C] shadow-sm font-black ring-1 ring-[#FFC107]/40"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                        data-od-id={`selector-evaltype-${tItem.id}`}
                      >
                        {tItem.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Account Size Selector Pills */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8A5A00]">
                  Select Account Size
                </span>
                {size && (
                  <span className="text-xs sm:text-sm font-bold text-gray-600">
                    Active Capital: <strong className="text-[#0A0A0C] font-black">{size}</strong>
                  </span>
                )}
              </div>

              <div
                className="flex flex-wrap gap-2.5 sm:gap-3"
                role="group"
                aria-label="Account size"
                data-od-id="selector-size"
              >
                {sizes.map((s) => {
                  const isSelected = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectSize(s)}
                      className={cn(
                        "group relative flex flex-1 min-w-[76px] sm:min-w-[100px] flex-col items-center justify-center rounded-xl border py-3.5 px-3 text-center transition-all duration-200 hover:-translate-y-0.5",
                        isSelected
                          ? "border-[#FFC107] bg-[#FFC107] text-[#0A0A0C] shadow-md ring-2 ring-[#FFC107]/30 font-black"
                          : "border-gray-200 bg-white text-gray-900 hover:border-[#FFC107]/60 hover:shadow-sm font-bold"
                      )}
                      data-od-id={`selector-size-${s.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                    >
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase tracking-wider",
                          isSelected ? "text-[#0A0A0C]/80" : "text-gray-500"
                        )}
                      >
                        {t("accountLabel")}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-black whitespace-nowrap text-[#0A0A0C]"
                        )}
                      >
                        {s}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform Selection Strip */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8A5A00]">
                  Select Platform Preference
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {t("bothPlatformsNote")}
                </span>
              </div>

              <div
                className="grid gap-4 sm:grid-cols-2"
                role="group"
                aria-label="Platform"
                data-od-id="selector-platform"
              >
                {platformsList.map((p) => {
                  const active = platform === "both" || platform === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectPlatform(p.id)}
                      className={cn(
                        "relative flex items-center gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all duration-200 hover:-translate-y-0.5 bg-white",
                        active
                          ? "border-[#FFC107] ring-2 ring-[#FFC107]/30 shadow-sm"
                          : "border-gray-200 hover:border-[#FFC107]/50"
                      )}
                      data-od-id={`selector-platform-${p.id}`}
                    >
                      <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                        <img
                          src={p.logo}
                          alt={`${p.label} logo`}
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block font-[family-name:var(--font-inter-tight)] text-base sm:text-lg font-black text-[#0A0A0C]">
                          {p.label}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          {p.desc}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
                          active
                            ? "border-[#FFC107] bg-[#FFC107] text-[#0A0A0C]"
                            : "border-gray-300 text-transparent"
                        )}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Content: Detailed Rule Cards + Sticky Order Summary */}
            <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Phase Rule Detail */}
              <div className="lg:col-span-8 space-y-6" data-od-id="wizard-detail">
                {path === "2step" ? (
                  <Step2Detail
                    evalType={evalType}
                    platform={platform}
                    size={size}
                    rule={step2Rule}
                  />
                ) : path === "1step" ? (
                  <Step1Detail
                    platform={platform}
                    size={size}
                    rule={step1Rule}
                  />
                ) : (
                  <InstantDetail
                    platform={platform}
                    size={size}
                    rule={instantRule}
                  />
                )}
              </div>

              {/* Right Column: Sticky Action & Order Summary Box */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <div
                  className="rounded-2xl border-2 border-[#FFC107] bg-white p-6 sm:p-7 shadow-xl shadow-[#FFC107]/15"
                  data-od-id="objectives-order-summary"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <span className="rounded-md bg-[#FFC107] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0A0A0C]">
                      Selected Plan
                    </span>
                    <span className="font-mono text-xs font-black text-gray-700">
                      {path.toUpperCase()} · {size || "$100K"}
                    </span>
                  </div>

                  {/* Summary Metric Rows */}
                  <div className="mt-5 space-y-3.5 text-xs sm:text-[13.5px]">
                    <div className="flex justify-between font-semibold text-gray-700">
                      <span>Account Size</span>
                      <span className="font-black text-[#0A0A0C]">{size || "$100K"}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-700">
                      <span>Evaluation Type</span>
                      <span className="font-black text-[#0A0A0C]">
                        {path === "2step"
                          ? `2-Step ${evalType.toUpperCase()}`
                          : path === "1step"
                          ? "1-Step Challenge"
                          : "Instant Funding"}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-700">
                      <span>Profit Split</span>
                      <span className="font-black text-[#8A5A00]">
                        {CHALLENGE_SPLITS[typeParam] || "Up to 100%"}
                      </span>
                    </div>
                    {activeRule && (
                      <>
                        <div className="flex justify-between font-semibold text-gray-700">
                          <span>Max Daily Loss</span>
                          <span className="font-black text-[#0A0A0C]">
                            {activeRule.maxDaily}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold text-gray-700">
                          <span>Max Total Loss</span>
                          <span className="font-black text-[#0A0A0C]">
                            {activeRule.maxLoss}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Pricing Box */}
                  <div className="mt-6 rounded-xl border border-gray-100 bg-[#FFFDF5] p-4 text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-sm font-bold text-gray-500 line-through">
                        {activeOldPrice}
                      </span>
                      <span className="font-[family-name:var(--font-inter-tight)] text-3xl font-black text-[#0A0A0C]">
                        {activePrice}
                      </span>
                      <span className="rounded bg-[#FFC107] px-2 py-0.5 text-[10.5px] font-black text-[#0A0A0C]">
                        70% OFF
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs font-black text-[#8A5A00]">
                      One-time fee · Zero monthly subscriptions
                    </p>
                  </div>

                  {/* Direct Buy CTA Button */}
                  <div className="mt-6 space-y-3">
                    <a
                      href={`https://app.ckcapital.co.uk/signup`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFC107] py-4 px-4 text-sm font-black text-[#0A0A0C] shadow-md hover:bg-[#E6AE06] hover:shadow-[0_0_24px_rgba(255,193,7,0.35)] transition-all duration-200"
                      data-od-id="summary-direct-checkout"
                    >
                      <span>Start {size || "$100K"} Challenge</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>

                    <p className="text-center text-xs font-medium text-gray-600">
                      ⚡ Instant MT5 & TradeLocker credentials sent via email
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S4. SIDE-BY-SIDE MODEL COMPARISON (LIGHT)                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="compare-models"
        className="scroll-mt-24 bg-white border-b border-gray-200 py-20 md:py-28 text-[#0A0A0C]"
        data-od-id="compare-models"
      >
        <CompareModels path={path} size={size} typeParam={typeParam} />
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S5. KEY TRADING BENEFITS & CONDITIONS (DARK BENTO)          */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="unlimited-trading-period"
        className="scroll-mt-24 bg-[#0D0C08] py-20 md:py-28 text-white border-b border-white/10"
        data-od-id="unlimited-trading-period"
      >
        <Container>
          <SectionHeading
            id="benefits-bento-heading"
            eyebrow="PROPRIETARY TRADING ADVANTAGES"
            title="Designed for Trader Longevity"
            dark
          >
            Our rules are built around risk management fundamentals, not arbitrary trick constraints.
          </SectionHeading>

          <div className="mx-auto mt-14 max-w-5xl grid gap-6 md:grid-cols-2">
            {/* Card 1: Unlimited Trading Period */}
            <div className="rounded-2xl border border-white/15 bg-[#12100A] p-7 sm:p-8 shadow-md transition-all duration-200 hover:border-[#FFC107]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/15 text-[#FFC107]">
                <Infinity size={24} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]">
                {t("unlimitedEyebrow")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl font-black text-white">
                {t("unlimitedTitle")}
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                {t("unlimitedDesc")}
              </p>
            </div>

            {/* Card 2: Reset & Top-Up */}
            <div className="rounded-2xl border border-white/15 bg-[#12100A] p-7 sm:p-8 shadow-md transition-all duration-200 hover:border-[#FFC107]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/15 text-[#FFC107]">
                <RefreshCw size={24} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]">
                {t("resetEyebrow")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl font-black text-white">
                {t("resetTitle")}
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                {t("resetDesc")}
              </p>
              <a
                href="/terms-conditions"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFC107] hover:underline"
              >
                {t("viewTerms")} <ArrowRight size={13} />
              </a>
            </div>

            {/* Card 3: News Trading & Weekend Holding */}
            <div className="rounded-2xl border border-white/15 bg-[#12100A] p-7 sm:p-8 shadow-md transition-all duration-200 hover:border-[#FFC107]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/15 text-[#FFC107]">
                <Zap size={24} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]">
                TRADING FREEDOM
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl font-black text-white">
                News Trading & Overnight Holding
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                Trade high-impact macroeconomic releases and hold positions over the weekend without restrictive execution bans.
              </p>
            </div>

            {/* Card 4: Verified Fast Payouts */}
            <div className="rounded-2xl border border-white/15 bg-[#12100A] p-7 sm:p-8 shadow-md transition-all duration-200 hover:border-[#FFC107]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FFC107]/40 bg-[#FFC107]/15 text-[#FFC107]">
                <Coins size={24} />
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#FFC107]">
                REWARD DISBURSEMENT
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl font-black text-white">
                Fast Payouts in Crypto & Fiat
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-gray-200">
                Receive simulated trading profit disbursements processed in under 12 hours via Crypto (USDT) or direct Bank Wire.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S6. UNDERSTAND OBJECTIVES GLOSSARY (LIGHT)                   */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="understand-objectives"
        className="scroll-mt-24 bg-[#F4F5F7] py-20 md:py-28 text-[#0A0A0C] border-b border-gray-200"
        data-od-id="understand-objectives"
      >
        <Container>
          <SectionHeading
            id="understand-objectives-heading"
            eyebrow={t("glossaryHeadingEyebrow")}
            title={t("glossaryHeadingTitle")}
          >
            Clear definitions of every rule metric to ensure complete transparency before you place your first trade.
          </SectionHeading>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {glossary.map((item, i) => {
              const Component = item.icon;
              return (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#FFC107]/60",
                    i === 0 && "lg:col-span-2"
                  )}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#8A5A00]/20 bg-[#FFF3CD] text-[#7A4E00]">
                    <Component size={20} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-inter-tight)] text-xl font-black text-[#0A0A0C]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-gray-700">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S7. FAQ (DARK)                                              */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        id="objectives-faq"
        className="scroll-mt-24 bg-[#0D0C08] py-20 md:py-28 text-white border-b border-white/10"
        data-od-id="objectives-faq"
      >
        <ObjectiveFaq />
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S8. FINAL CLOSING CTA (LIGHT)                               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#F4F5F7] py-20 md:py-28 text-[#111827]"
        data-od-id="objectives-final-cta"
      >
        <Container className="relative text-center">
          <SectionReveal>
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFC107] bg-[#FFF3CD] text-[#7A4E00] shadow-md">
              <Target size={28} />
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-3xl font-black uppercase tracking-tight text-[#0A0A0C] sm:text-4xl md:text-5xl">
              {t("finalCtaTitle")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-gray-700">
              {t("finalCtaDesc")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://app.ckcapital.co.uk/signup`}
                data-od-id="objectives-final-cta-primary"
              >
                <GoldButton size="lg" className="px-8 shadow-lg shadow-[#FFC107]/25">
                  {t("finalCtaBtn")} <ArrowRight size={16} />
                </GoldButton>
              </a>
              <a
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 text-sm font-bold text-[#0A0A0C] shadow-sm hover:border-[#FFC107] hover:bg-[#FFFDF5] transition-all duration-200"
              >
                Join Trader Discord <ArrowUpRight size={15} />
              </a>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* S9. LEGAL / REGULATORY DISCLAIMER (DARK)                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <section
        className="border-t border-white/10 bg-[#070709] py-10 text-white/70"
        data-od-id="objectives-legal"
      >
        <Container>
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 shrink-0 text-[#FFC107]" size={20} />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white">
                {t("legalEyebrow")}
              </p>
              <p className="mt-2.5 max-w-4xl text-xs sm:text-sm font-medium leading-relaxed text-gray-300">
                {t("legalDesc")}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-[#FFC107]">
                <a
                  href="/terms-conditions"
                  className="hover:text-white transition-colors"
                >
                  {t("viewTermsConditions")} <ArrowRight size={13} className="inline" />
                </a>
                <a
                  href="/risk-disclosure"
                  className="hover:text-white transition-colors"
                >
                  {t("viewDisclaimer")} <ArrowRight size={13} className="inline" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
