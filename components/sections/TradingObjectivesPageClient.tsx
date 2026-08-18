"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
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
import { HeroField } from "@/components/fx/HeroField";
import { Aurora } from "@/components/fx/Aurora";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ChallengeConfig, ChallengeSizeRule } from "@/lib/cms";
import { ACCOUNT_SIZES, CHALLENGE_RULES } from "@/lib/content";
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
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  id: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center" data-od-id={id}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
      {children ? <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground/55">{children}</p> : null}
    </div>
  );
}

function PlatformCell({ platform, className }: { platform: Platform; className?: string }) {
  const active = (id: Platform) => (platform === "both" ? "text-foreground" : platform === id ? "text-primary font-bold" : "text-foreground/35");
  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className={active("mt5")}>MT5</span>
      <span className="text-foreground/40"> / </span>
      <span className={active("tradelocker")}>TradeLocker</span>
    </span>
  );
}

function dollarNote(rule: ChallengeSizeRule | undefined, size: string | null, kind: "two" | "one" | "instant" = "two") {
  if (!size) return "Select an account size above to see the per-size objective values.";
  if (!rule) return `Objective values for ${size} pending publication.`;
  const consistency = rule.consistency === "N/A" ? "None" : rule.consistency;
  if (kind === "instant") return `Shown for ${size} — Max Daily ${rule.maxDaily} · Max Loss ${rule.maxLoss} · Consistency ${consistency}.`;
  if (kind === "one") {
    const parts = [`Phase 1 ${rule.phase1}`];
    if (rule.phase2 !== "$0") parts.push(`Phase 2 ${rule.phase2}`);
    parts.push(`Max Daily ${rule.maxDaily}`, `Max Loss ${rule.maxLoss}`, `Consistency ${consistency}`);
    return `Shown for ${size} — ${parts.join(" · ")}.`;
  }
  return `Shown for ${size} — Phase 1 ${rule.phase1} · Phase 2 ${rule.phase2} · Max Daily ${rule.maxDaily} · Max Loss ${rule.maxLoss} · Consistency ${consistency}.`;
}

type CardRow = { label: string; value: React.ReactNode; sub?: string; muted?: boolean };

function withDollar(showDollar: boolean, main: string, dollar: string | undefined): Pick<CardRow, "value" | "sub"> {
  if (showDollar && dollar && dollar !== "$0") return { value: main, sub: dollar };
  return { value: main };
}

function accountRuleValue(showDollar: boolean, dollar: string | undefined, defaultText: string): React.ReactNode {
  return showDollar && dollar ? dollar : defaultText;
}

function PhaseCard({
  badge,
  title,
  subtitle,
  rows,
  accent = false,
  footer,
}: {
  badge: React.ReactNode;
  title: string;
  subtitle?: string;
  rows: CardRow[];
  accent?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border bg-foreground/[0.03]", accent && "border-primary/30 bg-primary/[0.05] shadow-[0_0_24px_rgba(212,175,55,0.08)]")} data-od-id={`phase-card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
      <div className="flex items-center gap-3 border-b border-foreground/[0.07] px-5 py-4 md:px-6">
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border", accent ? "border-primary/30 bg-primary/10 text-primary" : "border-foreground/10 bg-foreground/[0.05] text-primary")}>{badge}</span>
        <div className="min-w-0">
          <h4 className="truncate font-[family-name:var(--font-inter-tight)] text-[15px] font-bold leading-tight text-foreground">{title}</h4>
          {subtitle ? <p className="mt-0.5 text-[11px] leading-4 text-foreground/45">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex-1 px-5 py-2 md:px-6">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 border-b border-foreground/[0.06] py-3 last:border-0">
            <span className="text-[12.5px] leading-5 text-foreground/55">{row.label}</span>
            <span className="text-right">
              <span className={cn("block text-[13px] font-semibold leading-5", row.muted ? "text-foreground/40" : "text-foreground")}>{row.value}</span>
              {row.sub ? <span className="mt-0.5 block text-[11px] leading-4 text-foreground/40">{row.sub}</span> : null}
            </span>
          </div>
        ))}
      </div>
      {footer ? <div className="border-t border-foreground/[0.07] px-5 py-4 md:px-6">{footer}</div> : null}
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
  const title = evalType === "middle" ? "2 STEP MIDDLE" : evalType === "pro" ? "2 STEP PRO" : "2 STEP STANDARD";
  const middle = evalType === "middle";
  const showDollar = Boolean(size && rule);

  if (evalType === "pro") {
    return (
      <div className="mx-auto flex min-h-64 max-w-2xl flex-col items-center justify-center rounded-xl border border-dashed border-foreground/15 px-6 py-16 text-center">
        <AlertCircle className="mb-4 text-foreground/20" size={30} />
        <p className="text-sm text-foreground/40">{t("rows.twoStepProPending")}</p>
      </div>
    );
  }

  const platformRow: CardRow = { label: t("rows.platform"), value: <PlatformCell platform={platform} /> };
  const profitTarget = (p1: string, p2: string | undefined) => withDollar(showDollar, p1, p2);
  const maxDaily = (main: string) => (middle ? { value: accountRuleValue(showDollar, rule?.maxDaily, t("rows.accordingToRules")) } : withDollar(showDollar, main, rule?.maxDaily));
  const maxLoss = (main: string) => (middle ? { value: accountRuleValue(showDollar, rule?.maxLoss, t("rows.accordingToRules")) } : withDollar(showDollar, main, rule?.maxLoss));
  const consistency = middle ? "30%" : t("rows.none");

  const phase1: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    { label: t("rows.profitTarget"), ...profitTarget(middle ? "8%" : "10%", rule?.phase1) },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "1" },
    { label: t("rows.consistency"), value: consistency },
    platformRow,
  ];
  const phase2: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    { label: t("rows.profitTarget"), ...withDollar(showDollar, "5%", rule?.phase2) },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "1" },
    { label: t("rows.consistency"), value: consistency },
    platformRow,
  ];
  const qa: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    { label: t("rows.profitTarget"), value: "—", muted: true },
    { label: t("rows.maxDailyLoss"), ...maxDaily("4%") },
    { label: t("rows.maxLoss"), ...maxLoss("8%") },
    { label: t("rows.minTradingDays"), value: "—", muted: true },
    { label: t("rows.consistency"), value: t("rows.accordingToRules") },
    platformRow,
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{title}</p>
        <h3 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">{t("twoStepSection.title")}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/55">{t("twoStepSection.desc")}</p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <PhaseCard badge={<Target size={18} />} title={t("phaseCards.phase1Title")} subtitle={t("phaseCards.phase1Sub")} rows={phase1} />
        <PhaseCard badge={<Gauge size={18} />} title={t("phaseCards.phase2Title")} subtitle={t("phaseCards.phase2Sub")} rows={phase2} />
        <PhaseCard
          badge={<ShieldCheck size={18} />}
          title={t("phaseCards.qaTitle")}
          subtitle={t("phaseCards.qaSub")}
          rows={qa}
          accent
          footer={<p className="text-[11px] font-semibold leading-5 text-primary">{t("phaseCards.qaFooter")}</p>}
        />
      </div>

      <p className="mt-4 text-center text-xs leading-6 text-foreground/35">{dollarNote(rule, size)}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          [t("twoStepSection.phase1ExplTitle"), t("twoStepSection.phase1ExplDesc")],
          [t("twoStepSection.phase2ExplTitle"), t("twoStepSection.phase2ExplDesc")],
        ].map(([cardTitle, copy]) => (
          <div key={cardTitle} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{cardTitle}</p>
            <p className="mt-3 text-sm leading-7 text-foreground/55">{copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step1Detail({ platform, size, rule }: { platform: Platform; size: string | null; rule: ChallengeSizeRule | undefined }) {
  const t = useTranslations("tradingObjectives");
  const showDollar = Boolean(size && rule);
  const rows: CardRow[] = [
    { label: t("rows.tradingPeriod"), value: t("rows.unlimited") },
    { label: t("rows.profitTarget"), ...withDollar(showDollar, "10%", rule?.phase1) },
    { label: t("rows.maxDailyLoss"), ...withDollar(showDollar, "4%", rule?.maxDaily) },
    { label: t("rows.maxLoss"), ...withDollar(showDollar, "8%", rule?.maxLoss) },
    { label: t("rows.minTradingDays"), value: "1" },
    { label: t("rows.consistency"), value: t("rows.consistencyWhereApplicable") },
    { label: t("rows.platform"), value: <PlatformCell platform={platform} /> },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{t("paths.oneStep")}</p>
        <h3 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">{t("oneStepSection.title")}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/55">{t("oneStepSection.desc")}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <PhaseCard badge={<Target size={18} />} title={t("phaseCards.evaluationTitle")} subtitle={t("phaseCards.evaluationSub")} rows={rows} accent />
        <div className="flex flex-col justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 md:p-7" data-od-id="objectives-1step-list">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("phaseCards.afterEvalTitle")}</p>
          <p className="mt-3 text-sm leading-7 text-foreground/55">{t("phaseCards.afterEvalDesc")}</p>
          <p className="mt-4 border-t border-foreground/[0.08] pt-4 text-xs leading-6 text-foreground/35">{dollarNote(rule, size, "one")}</p>
        </div>
      </div>
    </div>
  );
}

function InstantDetail({ platform, size, rule }: { platform: Platform; size: string | null; rule: ChallengeSizeRule | undefined }) {
  const t = useTranslations("tradingObjectives");
  const offered = Boolean(rule);
  const showDollar = Boolean(size && rule);
  const rows: CardRow[] = [
    { label: t("rows.maxDailyLoss"), value: showDollar && rule ? rule.maxDaily : t("rows.accordingToRules") },
    { label: t("rows.maxLoss"), value: showDollar && rule ? rule.maxLoss : t("rows.accordingToRules") },
    { label: t("rows.consistencyReq"), value: showDollar && rule ? (rule.consistency === "N/A" ? t("rows.none") : rule.consistency) : t("rows.accordingToRules") },
    { label: t("rows.tradingConditions"), value: t("rows.accordingToRules") },
    { label: t("rows.accountSize"), value: size ?? t("rows.accordingToRules") },
    { label: t("rows.platform"), value: <PlatformCell platform={platform} /> },
    { label: t("rows.rewardEligibility"), value: t("rows.upToSplit") },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{t("paths.instant")}</p>
        <h3 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">{t("instantSection.title")}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/55">{t("instantSection.desc")}</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <PhaseCard badge={<Zap size={18} />} title={t("phaseCards.instantTitle")} subtitle={t("phaseCards.instantSub")} rows={rows} accent />
        <div className="flex flex-col justify-center rounded-xl border border-primary/20 bg-primary/[0.04] p-6 md:p-7" data-od-id="objectives-instant-panel">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("phaseCards.beforeStartTitle")}</p>
          <p className="mt-3 text-sm leading-7 text-foreground/55">{t("phaseCards.beforeStartDesc")}</p>
          <p className="mt-4 border-t border-foreground/[0.08] pt-4 text-xs leading-6 text-foreground/35">{!size ? t("step2SelectPrompt") : offered ? dollarNote(rule, size, "instant") : t("instantSection.notOffered", { size })}</p>
        </div>
      </div>
    </div>
  );
}

function CompareModels({ path }: { path: Path }) {
  const t = useTranslations("tradingObjectives");
  const activeIndex = path === "1step" ? 0 : path === "2step" ? 1 : 2;

  const compareRows = [
    { label: t("compareRows.phases"), cells: [t("compareRows.phases1"), t("compareRows.phases2"), t("compareRows.phasesInstant")] },
    { label: t("compareRows.period"), cells: [t("rows.unlimited"), t("rows.unlimited"), t("rows.accordingToRules")] },
    { label: t("compareRows.minDays"), cells: [t("compareRows.minDays1"), t("compareRows.minDays2"), t("rows.accordingToRules")] },
    { label: t("compareRows.platforms"), cells: ["MT5 / TradeLocker", "MT5 / TradeLocker", "MT5 / TradeLocker"] },
    { label: t("compareRows.reset"), cells: [t("compareRows.resetAvail"), t("compareRows.resetAvail"), t("rows.checkConditions")] },
    { label: t("compareRows.reward"), cells: [t("rows.upToSplit"), t("rows.upToSplit"), t("rows.upToSplit")] },
  ];

  return (
    <Container>
      <SectionHeading id="compare-models-heading" eyebrow={t("compareEyebrow")} title={t("compareTitle")} />
      <div className="mt-8 text-center sm:hidden">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          ↔ Swipe horizontally to compare
        </span>
      </div>
      <div className="mx-auto mt-4 sm:mt-12 max-w-5xl overflow-x-auto smooth-touch-scroll rounded-xl border border-foreground/10 pb-1" data-od-id="compare-models-table">
        <div className="min-w-[580px]">
          <div className="grid grid-cols-4 border-b border-foreground/10 bg-foreground/[0.035] text-[10px] font-bold uppercase tracking-[0.16em]">
            <span className="px-4 py-3 text-foreground/35">{t("compareTableHeader")}</span>
            {[t("paths.oneStep"), t("paths.twoStep"), t("paths.instant")].map((label, i) => (
              <span key={label} className={cn("px-4 py-3", i === activeIndex ? "text-primary" : "text-foreground/45")}>
                {label}
                {i === activeIndex ? <span className="ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-primary">{t("selectedBadge")}</span> : null}
              </span>
            ))}
          </div>
          {compareRows.map((row) => (
            <div key={row.label} className="grid grid-cols-4 border-b border-foreground/[0.08] last:border-0">
              <span className="px-4 py-3.5 text-[13px] font-semibold text-foreground">{row.label}</span>
              {row.cells.map((cell, i) => (
                <span key={i} className={cn("px-4 py-3.5 text-[13px]", i === activeIndex ? "font-semibold text-foreground" : "text-foreground/50")}>
                  {row.label === t("compareRows.platforms") ? <PlatformCell platform="both" /> : cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <a href="/#start-challenge" data-od-id="compare-models-cta"><GoldButton size="lg">{t("chooseEvaluation")} <ArrowRight size={16} /></GoldButton></a>
      </div>
    </Container>
  );
}

function ObjectiveFaq() {
  const t = useTranslations("tradingObjectives");
  const faqs = (t.raw("faqs") as Array<{ q: string; a: string }>) ?? [];

  return (
    <Container>
      <SectionHeading id="objectives-faq-heading" eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
      <div className="mx-auto mt-10 max-w-3xl">
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={String(i)} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-5 transition-all data-[open]:border-primary/30 data-[open]:bg-foreground/[0.05]">
              <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-foreground/55">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}

function pathToType(path: Path, evalType: EvalType) {
  if (path === "1step") return "one-step";
  if (path === "2step") return evalType === "middle" ? "middleweight" : "standard";
  return "instant";
}

export function TradingObjectivesPageClient({ config, initial }: { config: ChallengeConfig | null; initial: TradingObjectivesInitial }) {
  const t = useTranslations("tradingObjectives");
  const sizes = config?.sizes?.length ? config.sizes : ACCOUNT_SIZES;
  const rules = config?.rules ?? CHALLENGE_RULES;

  const [path, setPath] = useState<Path>(initial.path);
  const [evalType, setEvalType] = useState<EvalType>(initial.evalType);
  const [platform, setPlatform] = useState<Platform>(initial.platform);
  const [size, setSize] = useState<string | null>(initial.size);

  const pathsList: { id: Path; label: string; sub: string }[] = [
    { id: "1step", label: t("paths.oneStep"), sub: t("paths.oneStepSub") },
    { id: "2step", label: t("paths.twoStep"), sub: t("paths.twoStepSub") },
    { id: "instant", label: t("paths.instant"), sub: t("paths.instantSub") },
  ];

  const evalTypesList: { id: EvalType; label: string }[] = [
    { id: "standard", label: t("evalTypes.standard") },
    { id: "middle", label: t("evalTypes.middle") },
    { id: "pro", label: t("evalTypes.pro") },
  ];

  const platformsList: { id: Platform; label: string; tagline: string; logo: string; desc: string }[] = [
    { id: "mt5", label: t("platforms.mt5.label"), tagline: t("platforms.mt5.tagline"), logo: "/images/logos/mt5.png", desc: t("platforms.mt5.desc") },
    { id: "tradelocker", label: t("platforms.tradelocker.label"), tagline: t("platforms.tradelocker.tagline"), logo: "/images/logos/tradelocker.jpeg", desc: t("platforms.tradelocker.desc") },
  ];

  const glossaryIcons = [Target, Gauge, ShieldCheck, CalendarDays, Percent];
  const rawGlossary = (t.raw("glossary") as Array<{ title: string; desc: string }>) ?? [];
  const glossary = rawGlossary.map((item, i) => ({
    icon: glossaryIcons[i] || Target,
    title: item.title,
    desc: item.desc,
  }));

  const rawProgression = (t.raw("progression") as Array<{ step: string; title: string; desc: string }>) ?? [];
  const qaBenefits = (t.raw("qaBenefits") as string[]) ?? [];

  const syncUrl = (next: { path?: Path; evalType?: EvalType; platform?: Platform; size?: string | null }) => {
    const params = new URLSearchParams();
    const p = next.path ?? path;
    const e = next.evalType ?? evalType;
    const pl = next.platform ?? platform;
    const s = next.size ?? size;
    params.set("path", p);
    params.set("evalType", e);
    params.set("platform", pl);
    if (s) params.set("size", s);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  };

  const selectPath = (id: Path) => {
    setPath(id);
    if (id !== "2step" && evalType !== "standard") setEvalType("standard");
    const type = pathToType(id, id !== "2step" ? "standard" : evalType);
    const nextSize = size && !rules[type]?.[size] ? null : size;
    if (nextSize !== size) setSize(nextSize);
    syncUrl({ path: id, ...(id !== "2step" ? { evalType: "standard" } : {}), ...(nextSize !== size ? { size: nextSize } : {}) });
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

  const pill = (active: boolean) =>
    cn(
      "min-h-11 rounded-lg border px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      active ? "border-primary/60 bg-primary/12 text-primary shadow-[0_0_16px_rgba(212,175,55,0.15)]" : "border-foreground/10 text-foreground/50 hover:border-primary/35 hover:text-foreground"
    );

  return (
    <div data-od-id="trading-objectives-page">
      <section className="relative isolate -mt-[72px] md:-mt-[76px] flex min-h-[calc(100dvh-44px)] flex-col overflow-hidden border-b border-foreground/[0.07]" data-od-id="objectives-hero">
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
          <div className="w-full max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary" data-od-id="objectives-hero-eyebrow"><Sparkles size={12} /> {t("heroBadge")}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-[clamp(38px,7vw,44px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]" data-od-id="objectives-hero-title">{t("heroTitlePrefix")} <span className="shimmer-text">{t("heroTitleShimmer")}</span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-5 max-w-xl text-[14px] leading-relaxed text-foreground/55 sm:text-[15px]">{t("heroDesc")}</motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }} className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#evaluation-selector" data-od-id="objectives-hero-primary"><GoldButton size="lg">{t("chooseEvaluation")} <ArrowRight size={16} /></GoldButton></a>
              <a href="#understand-objectives" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-od-id="objectives-hero-secondary">{t("understandObjectives")} <ArrowRight size={15} /></a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-14 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35"><span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-secondary" /> {t("badgeSimulated")}</span><span className="inline-flex items-center gap-2"><Target size={14} className="text-primary" /> {t("badgeProgression")}</span></motion.div>
          </div>
        </div>
      </section>

      <section id="evaluation-selector" className="scroll-mt-28 border-b border-foreground/[0.07] py-16 md:py-20" data-od-id="evaluation-selector">
        <Container>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
            <div className="p-6 sm:p-8 md:p-10">
              <div data-od-id="wizard-model-step">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">STEP 1</p>
                <h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">{t("step1Title")}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/50">{t("step1Subtitle")}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Evaluation model" data-od-id="selector-path-tabs">
                  {pathsList.map((tab) => (
                    <button key={tab.id} type="button" role="tab" aria-selected={path === tab.id} onClick={() => selectPath(tab.id)} className={cn("min-h-[4.5rem] rounded-xl border px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", path === tab.id ? "border-primary/60 bg-primary/12 text-primary shadow-[0_0_20px_rgba(212,175,55,0.14)]" : "border-foreground/10 text-foreground/55 hover:border-primary/35 hover:text-foreground")} data-od-id={`selector-path-${tab.id}`}>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.16em]">{tab.label}</span>
                      <span className="mt-1.5 block text-xs leading-5 text-foreground/40">{tab.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 border-t border-foreground/[0.08] pt-12" data-od-id="wizard-rules">
                <div data-od-id="wizard-size-step">
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">STEP 2</p>
                      <h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">{t("step2Title")}</h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/50">{t("step2Subtitle")}</p>
                    </div>
                    {size ? (
                      <p className="text-xs text-foreground/35">{t("step2Showing", { size })}</p>
                    ) : (
                      <p className="text-xs text-foreground/35">{t("step2SelectPrompt")}</p>
                    )}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" role="group" aria-label="Account size" data-od-id="selector-size">
                    {sizes.map((s) => (
                      <button key={s} type="button" aria-pressed={size === s} onClick={() => selectSize(s)} className={cn(pill(size === s), "min-h-14 text-left")} data-od-id={`selector-size-${s.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}>
                        <span className="block text-[10px] text-foreground/35">{t("accountLabel")}</span>
                        <span className="mt-1 block text-sm">{s}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-12 border-t border-foreground/[0.08] pt-12" data-od-id="wizard-review-step">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">STEP 3</p>
                  <h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold tracking-[-0.03em] text-foreground md:text-3xl">{t("step3Title")}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-foreground/50">{t("step3Subtitle")}</p>

                  <div className="mt-8 space-y-8" data-od-id="selector-secondary">
                  {path === "2step" ? (
                    <div data-od-id="selector-evaltype">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">{t("evalTypeLabel")}</p>
                      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Evaluation type">
                        {evalTypesList.map((tItem) => (
                          <button key={tItem.id} type="button" aria-pressed={evalType === tItem.id} onClick={() => selectEvalType(tItem.id)} className={pill(evalType === tItem.id)} data-od-id={`selector-evaltype-${tItem.id}`}>{tItem.label}</button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  <div data-od-id="selector-platform">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">{t("platformLabel")} <span className="text-foreground/25">· {t("optional")}</span></p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2" role="group" aria-label="Platform">
                      {platformsList.map((p) => {
                        const active = platform === "both" || platform === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => selectPlatform(p.id)}
                            className={cn(
                              "relative flex flex-col items-start gap-4 rounded-xl border p-5 text-left backdrop-blur-[14px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              "bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.12),transparent_45%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
                              active ? "border-primary/60 bg-primary/10 shadow-[0_0_28px_rgba(212,175,55,0.16)]" : "border-foreground/10 shadow-[0_14px_40px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
                            )}
                            data-od-id={`selector-platform-${p.id}`}
                          >
                            <span className="flex w-full items-center gap-4">
                              <span className={cn("block h-14 w-14 shrink-0 overflow-hidden rounded-2xl border", active ? "border-primary/30" : "border-foreground/10")}>
                                <img src={p.logo} alt={`${p.label} logo`} className="h-full w-full object-cover" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block font-[family-name:var(--font-inter-tight)] text-lg font-extrabold leading-tight text-foreground">{p.label}</span>
                                <span className="mt-0.5 block text-xs text-foreground/45">{p.tagline}</span>
                              </span>
                              <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition", active ? "border-primary bg-primary text-background" : "border-foreground/20 text-transparent")}>
                                <Check size={13} strokeWidth={3} />
                              </span>
                            </span>
                            <p className="text-[13px] leading-6 text-foreground/50">{p.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-[11px] leading-5 text-foreground/35">{t("bothPlatformsNote")}</p>
                  </div>
                </div>

                  <div className="mt-8" data-od-id="wizard-detail">
                    {path === "2step" ? (
                      <Step2Detail evalType={evalType} platform={platform} size={size} rule={step2Rule} />
                    ) : path === "1step" ? (
                      <Step1Detail platform={platform} size={size} rule={step1Rule} />
                    ) : (
                      <InstantDetail platform={platform} size={size} rule={instantRule} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="understand-objectives" className="scroll-mt-24 border-b border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="understand-objectives">
        <Container>
          <SectionHeading id="understand-objectives-heading" eyebrow={t("glossaryHeadingEyebrow")} title={t("glossaryHeadingTitle")} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {glossary.map((item, i) => {
              const Component = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={cn("rounded-xl border border-foreground/10 bg-foreground/[0.035] p-6", i === 0 && "lg:col-span-2")}>
                  <Component size={22} className="text-primary" />
                  <h3 className="mt-10 font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-foreground/50">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/[0.07] py-16 md:py-20" data-od-id="unlimited-trading-period">
        <Container>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.04]">
            <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <Infinity size={26} className="text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("unlimitedEyebrow")}</p>
                <h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">{t("unlimitedTitle")}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/55">{t("unlimitedDesc")}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/[0.07] py-16 md:py-20" data-od-id="reset-topup">
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:flex-row sm:items-center md:p-9">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/[0.06]">
              <RefreshCw size={24} className="text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("resetEyebrow")}</p>
              <h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground">{t("resetTitle")}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/55">{t("resetDesc")}</p>
            </div>
            <a href="/terms-conditions" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t("viewTerms")} <ArrowRight size={14} /></a>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="progression">
        <Container>
          <SectionHeading id="progression-heading" eyebrow={t("progressionEyebrow")} title={t("progressionTitle")} />
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid gap-10 md:grid-cols-3 md:gap-6">
              {rawProgression.map((item, i) => (
                <div key={item.step} className="relative">
                  {i < rawProgression.length - 1 ? <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-primary/40 to-foreground/10 md:block" aria-hidden="true" /> : null}
                  <div className="relative">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-sm font-bold text-primary shadow-[0_0_20px_rgba(212,175,55,0.15)]">{item.step}</span>
                    <h3 className="mt-6 font-[family-name:var(--font-inter-tight)] text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("qaBenefitsTitle")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {qaBenefits.map((benefit) => (
                  <span key={benefit} className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/40 px-3.5 py-2 text-xs text-foreground/70"><Check size={13} className="text-secondary" strokeWidth={3} /> {benefit}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/[0.07] py-20 md:py-28" data-od-id="compare-models">
        <CompareModels path={path} />
      </section>

      <section className="border-b border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="objectives-faq">
        <ObjectiveFaq />
      </section>

      <section className="relative overflow-hidden border-b border-foreground/[0.07] py-20 md:py-28" data-od-id="objectives-final-cta">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]" />
        <Container className="relative text-center">
          <Target className="mx-auto text-primary" size={30} />
          <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold tracking-[-0.05em] text-foreground md:text-6xl">{t("finalCtaTitle")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/55">{t("finalCtaDesc")}</p>
          <div className="mt-8">
            <a href={size ? `/#start-challenge?type=${typeParam}&size=${size}` : `/#start-challenge?type=${typeParam}`} data-od-id="objectives-final-cta-primary"><GoldButton size="lg">{t("finalCtaBtn")} <ArrowRight size={16} /></GoldButton></a>
          </div>
        </Container>
      </section>

      <section className="border-t border-foreground/[0.08] bg-background-secondary/50 py-10" data-od-id="objectives-legal">
        <Container>
          <div className="flex items-start gap-4">
            <ShieldCheck className="mt-1 shrink-0 text-primary" size={18} />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/55">{t("legalEyebrow")}</p>
              <p className="mt-3 max-w-4xl text-xs leading-6 text-foreground/40">{t("legalDesc")}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-primary">
                <a href="/terms-conditions" className="hover:text-foreground">{t("viewTermsConditions")} <ArrowRight size={12} className="inline" /></a>
                <a href="/risk-disclosure" className="hover:text-foreground">{t("viewDisclaimer")} <ArrowRight size={12} className="inline" /></a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
