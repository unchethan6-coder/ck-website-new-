"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  HandCoins,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { GoldButton } from "@/components/shared/GoldButton";
import { HeroField } from "@/components/fx/HeroField";
import { Aurora } from "@/components/fx/Aurora";

const TIERS = [
  { name: "STARTER", rate: null, requirement: "Current starter requirements pending publication." },
  { name: "GROWTH", rate: null, requirement: "Current growth requirements pending publication." },
  { name: "PRO", rate: null, requirement: "Current pro requirements pending publication." },
  { name: "ELITE", rate: 0.25, requirement: "Current elite requirements pending publication." },
];

function SectionHeading({ eyebrow, title, children, id }: { eyebrow: string; title: string; children?: React.ReactNode; id: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-od-id={id}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
      {children ? <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-foreground/55">{children}</p> : null}
    </div>
  );
}

function PendingValue() {
  return <span className="text-sm font-medium tracking-normal text-foreground/35">Current data pending</span>;
}

function CommissionCalculator() {
  const t = useTranslations("affiliates");
  const [referrals, setReferrals] = useState(20);
  const [orderValue, setOrderValue] = useState(100);
  const [tier, setTier] = useState("example");
  const rate = tier === "example" ? 0.2 : TIERS.find((item) => item.name === tier)?.rate ?? null;
  const monthly = useMemo(() => (rate === null ? null : referrals * orderValue * rate), [orderValue, rate, referrals]);
  const yearly = monthly === null ? null : monthly * 12;
  const money = (value: number | null) => value === null ? "—" : `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-xl border border-primary/20 bg-foreground/[0.035]" data-od-id="affiliate-calculator">
      <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("yourNumbers")}</p>
          <div className="mt-7 space-y-7">
            <label className="block" data-od-id="affiliate-referrals-control">
              <span className="flex items-center justify-between gap-4 text-sm font-semibold text-foreground"><span>{t("referralsLabel")}</span><output className="text-primary">{referrals}</output></span>
              <input type="range" min="1" max="100" value={referrals} onChange={(event) => setReferrals(Number(event.target.value))} className="mt-4 w-full accent-[var(--primary)]" aria-label="New Qualified Referrals per Month" />
              <span className="mt-2 flex justify-between text-[10px] text-foreground/35"><span>1</span><span>100</span></span>
            </label>
            <label className="block" data-od-id="affiliate-order-control">
              <span className="flex items-center justify-between gap-4 text-sm font-semibold text-foreground"><span>{t("orderValueLabel")}</span><output className="text-primary">${orderValue}</output></span>
              <input type="range" min="10" max="1000" step="10" value={orderValue} onChange={(event) => setOrderValue(Number(event.target.value))} className="mt-4 w-full accent-[var(--primary)]" aria-label="Average Order Value" />
              <span className="mt-2 flex justify-between text-[10px] text-foreground/35"><span>$10</span><span>$1,000+</span></span>
            </label>
            <label className="block" data-od-id="affiliate-tier-control"><span className="text-sm font-semibold text-foreground">{t("tierLabel")}</span><select value={tier} onChange={(event) => setTier(event.target.value)} className="mt-3 h-11 w-full rounded-lg border border-foreground/15 bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="example">Illustrative example — 20%</option>{TIERS.map((item) => <option key={item.name} value={item.name} disabled={item.rate === null}>{item.name} — {item.rate === null ? "Current rate pending" : `${item.rate * 100}%`}</option>)}</select></label>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-primary/20 bg-primary/[0.045] p-6 md:p-8">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("estimatedMonthly")}</p><p className="mt-4 font-[family-name:var(--font-inter-tight)] text-5xl font-extrabold tracking-[-0.05em] text-primary md:text-6xl">{money(monthly)}</p><p className="mt-2 text-xs text-foreground/40">Estimated based on the selected inputs.</p><div className="mt-8 border-t border-foreground/10 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">{t("estimatedAnnual")}</p><p className="mt-2 text-2xl font-extrabold text-foreground">{money(yearly)}</p></div></div>
          <div className="mt-8 rounded-lg border border-foreground/10 bg-background/40 p-4 text-sm text-foreground/60"><p className="font-semibold text-foreground">Example</p><p className="mt-3 leading-7">{referrals} qualified referrals<br />× ${orderValue} average qualifying purchase<br />× {rate === null ? "current tier rate" : `${rate * 100}% affiliate commission`}<br />= <strong className="text-primary">{money(monthly)} Estimated Commission</strong></p></div>
        </div>
      </div>
      <p className="border-t border-foreground/10 px-6 py-4 text-xs leading-6 text-foreground/40 md:px-8">{t("calculatorDisclaimer")}</p>
    </div>
  );
}

export function AffiliatePageClient() {
  const t = useTranslations("affiliates");

  const benefits = (t.raw("benefits") as Array<{ value: string; title: string; desc: string }>) ?? [];
  const contentTopics = (t.raw("contentTopics") as Array<{ title: string; desc: string }>) ?? [];
  const communityList = (t.raw("communityList") as string[]) ?? [];
  const ctaStats = (t.raw("ctaStats") as Array<{ value: string; label: string }>) ?? [];

  return (
    <div data-od-id="affiliates-page">
      <section className="relative isolate -mt-[72px] md:-mt-[76px] flex min-h-[calc(100dvh-44px)] flex-col overflow-hidden border-b border-foreground/[0.07]" data-od-id="affiliates-hero">
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
          <div className="w-full max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Sparkles size={12} /> {t("badge")}</div><h1 className="mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-[clamp(38px,7vw,44px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]" data-od-id="affiliates-hero-title">{t("title")}</h1><p className="mt-5 max-w-xl text-[14px] leading-relaxed text-foreground/55 sm:text-[15px]">{t("subtitle")}</p><div className="mt-9 flex flex-wrap items-center gap-5"><a href="/contact" data-od-id="affiliates-hero-cta"><GoldButton size="lg">{t("becomeAffiliate")} <ArrowRight size={16} /></GoldButton></a><a href="#affiliate-how-it-works" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t("seeHowItWorks")} <ArrowRight size={15} /></a></div></div>
        </div>
      </section>

      <section className="border-b border-foreground/[0.07] py-12 md:py-16" data-od-id="affiliate-highlights"><Container><div className="grid grid-cols-2 divide-x divide-y divide-foreground/[0.08] border-y border-foreground/[0.08] md:grid-cols-4 md:divide-y-0">{[["UP TO 25%", t("commissionHighlight")], ["$250", t("minPayoutHighlight")], ["GLOBAL", t("globalHighlight")], ["PERFORMANCE-BASED", t("tiersHighlight")]].map(([value, label]) => <div key={label} className="min-h-32 px-4 py-7 first:pl-0 md:px-7"><p className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold tracking-[-0.04em] text-primary md:text-3xl">{value}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55">{label}</p></div>)}</div></Container></section>

      <section id="affiliate-how-it-works" className="py-20 md:py-28" data-od-id="affiliate-how-it-works"><Container><SectionHeading id="affiliate-how-heading" eyebrow={t("howEyebrow")} title={t("howTitle")}>{t("howSubtitle")}</SectionHeading><div className="mx-auto mt-12 max-w-5xl divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">{[["01", t("step1Title"), t("step1Desc")], ["02", t("step2Title"), t("step2Desc")], ["03", t("step3Title"), t("step3Desc")], ["04", t("step4Title"), t("step4Desc")]].map(([number, title, copy]) => <div key={number} className="grid gap-4 py-7 md:grid-cols-[72px_0.65fr_1.35fr] md:items-center md:gap-8"><span className="font-mono text-sm font-bold text-primary">{number}</span><h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">{title}</h3><p className="text-sm leading-6 text-foreground/50">{copy}</p></div>)}</div><div className="mt-8 text-center"><a href="/contact"><GoldButton size="lg">{t("applyNow")} <ArrowRight size={16} /></GoldButton></a></div></Container></section>

      <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="affiliate-benefits"><Container><SectionHeading id="affiliate-benefits-heading" eyebrow={t("benefitsEyebrow")} title={t("benefitsTitle")} /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{benefits.map((item) => <article key={item.title} className="rounded-xl border border-foreground/10 bg-foreground/[0.035] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{item.value}</p><h3 className="mt-10 font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-6 text-foreground/50">{item.desc}</p></article>)}</div></Container></section>

      <section className="py-20 md:py-28" data-od-id="affiliate-content"><Container><SectionHeading id="affiliate-content-heading" eyebrow={t("contentEyebrow")} title={t("contentTitle")}>{t("contentSubtitle")}</SectionHeading><div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">{contentTopics.map((item) => <article key={item.title} className="rounded-xl border border-foreground/10 p-5"><p className="font-semibold text-foreground">{item.title}</p><p className="mt-2 text-sm leading-6 text-foreground/45">{item.desc}</p></article>)}</div></Container></section>

      <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-16 md:py-20" data-od-id="affiliate-channels"><Container><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("channelsEyebrow")}</p><h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground">{t("channelsTitle")}</h2></div><div><p className="text-sm leading-7 text-foreground/55">{t("channelsDesc")}</p><div className="mt-5 flex flex-wrap gap-2">{["YouTube", "Instagram", "TikTok", "X", "Facebook", "Websites", "Blogs", "Trading Communities", "Email Audiences"].map((channel) => <span key={channel} className="rounded-full border border-foreground/10 px-3 py-2 text-xs text-foreground/60">{channel}</span>)}</div><p className="mt-5 text-xs leading-6 text-foreground/35">{t("channelsDisclaimer")}</p></div></div></Container></section>

      <section className="py-16 md:py-20" data-od-id="affiliate-compliance"><Container><div className="mx-auto max-w-3xl rounded-xl border border-secondary/25 bg-secondary/[0.045] p-7 md:p-9"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-secondary" size={22} /><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{t("complianceEyebrow")}</p><h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-2xl font-bold text-foreground">{t("complianceTitle")}</h2><p className="mt-4 text-sm leading-7 text-foreground/55">{t("complianceDesc")}</p></div></div></div></Container></section>

      <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-16 md:py-20" data-od-id="affiliate-payouts"><Container><div className="flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("payoutsEyebrow")}</p><h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground">{t("payoutsTitle")}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/50">{t("payoutsDesc")}</p></div><a href="/terms-conditions" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:text-foreground">{t("viewAffiliateTerms")} <ArrowRight size={14} /></a></div></Container></section>

      <section className="py-20 md:py-28" data-od-id="affiliate-stories"><Container><SectionHeading id="affiliate-stories-heading" eyebrow={t("storiesEyebrow")} title={t("storiesTitle")} /><div className="mt-10 rounded-xl border border-dashed border-foreground/15 px-6 py-16 text-center"><Users className="mx-auto mb-4 text-foreground/20" size={30} /><p className="text-sm text-foreground/40">{t("storiesEmpty")}</p></div></Container></section>

      <section className="border-y border-foreground/[0.07] bg-foreground/[0.018] py-20 md:py-28" data-od-id="affiliate-community"><Container><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("communityEyebrow")}</p><h2 className="mt-3 font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-5xl">{t("communityTitle")}</h2><p className="mt-5 text-sm leading-7 text-foreground/50">{t("communityDesc")}</p></div><div className="grid gap-3 sm:grid-cols-2">{communityList.map((item) => <div key={item} className="flex items-start gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4 text-sm text-foreground/65"><Check size={15} className="mt-0.5 shrink-0 text-secondary" />{item}</div>)}</div></div></Container></section>

      <section className="relative overflow-hidden border-t border-primary/20 py-20 md:py-28" data-od-id="affiliate-final-cta"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_55%)]" /><Container className="relative text-center"><HandCoins className="mx-auto text-primary" size={30} /><h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold tracking-[-0.05em] text-foreground md:text-6xl">{t("readyTitle")}</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-foreground/55">{t("readySubtitle")}</p><div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-4">{ctaStats.map((item) => <div key={item.label} className="rounded-xl border border-foreground/10 bg-foreground/[0.035] p-4"><p className="text-xs font-bold tracking-[0.14em] text-primary">{item.value}</p><p className="mt-2 text-xs text-foreground/45">{item.label}</p></div>)}</div><div className="mt-8 flex flex-wrap items-center justify-center gap-5"><a href="/contact"><GoldButton size="lg">{t("becomeAffiliate")} <ArrowRight size={16} /></GoldButton></a><a href="https://app.ckcapital.co.uk/signin" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/65 hover:text-primary">{t("login")} <ArrowRight size={14} /></a></div></Container></section>

      <section className="border-t border-foreground/[0.08] bg-background-secondary/50 py-10" data-od-id="affiliate-disclaimer"><Container><div className="flex items-start gap-4"><Mail className="mt-1 shrink-0 text-primary" size={18} /><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/55">{t("disclaimerTitle")}</p><p className="mt-3 max-w-4xl text-xs leading-6 text-foreground/40">{t("disclaimerDesc")}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-primary"><a href="/terms-conditions" className="hover:text-foreground">{t("linkTerms")}</a><a href="/terms-conditions" className="hover:text-foreground">{t("linkGeneralTerms")}</a><a href="/risk-disclosure" className="hover:text-foreground">{t("linkDisclaimer")}</a><a href="/privacy-policy" className="hover:text-foreground">{t("linkPrivacy")}</a></div></div></div></Container></section>
    </div>
  );
}
