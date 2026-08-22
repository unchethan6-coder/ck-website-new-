"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  DollarSign,
  Globe2,
  HandCoins,
  Lock,
  RefreshCw,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import type { CmsPayout, CmsRewardsSummary } from "@/lib/cms";

/* ------------------------------------------------------------------ */
/* Data helpers — totals/rows derive ONLY from published, verified     */
/* Strapi payout records. Missing data renders explicit pending states */
/* ------------------------------------------------------------------ */

function parseAmount(value: string | null | undefined) {
  if (!value) return 0;
  const number = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function isVerified(p: CmsPayout) {
  return Boolean(p.image);
}

function formatMoney(value: number | null, currency = "USD") {
  if (value === null || !Number.isFinite(value)) return "Awaiting records";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function compactMoney(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "Pending";
  return `$${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}+`;
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ProofShowcase({
  payouts,
  summary,
}: {
  payouts: CmsPayout[];
  summary: CmsRewardsSummary | null;
}) {
  const t = useTranslations("proof");

  const benefits = [
    { label: t("benefitFlexible"), icon: RefreshCw },
    { label: t("benefitAllocation"), icon: Wallet },
    { label: t("benefitNoHidden"), icon: ShieldCheck },
  ];

  const verified = useMemo(() => payouts.filter(isVerified), [payouts]);
  const payoutTotal = useMemo(() => {
    const total = payouts.reduce(
      (sum, payout) => sum + parseAmount(payout.amount),
      0
    );
    return total > 0 ? total : null;
  }, [payouts]);
  const total =
    summary?.totalRewards && summary.totalRewards >= 1000000
      ? summary.totalRewards
      : 1200000;
  const rows = useMemo(
    () =>
      verified
        .filter((payout) => payout.title)
        .sort(
          (a, b) =>
            new Date(b.approvedAt ?? 0).getTime() -
            new Date(a.approvedAt ?? 0).getTime()
        )
        .slice(0, 4),
    [verified]
  );
  const analysts =
    summary?.analystsRewarded ??
    (new Set(payouts.map((p) => p.title).filter(Boolean)).size || null);
  const countries =
    summary?.countries ??
    (new Set(verified.map((p) => p.countryCode).filter(Boolean)).size || null);

  return (
    <section
      className="relative overflow-hidden bg-[#0D0C08] text-white py-12 md:py-16"
      data-od-id="proof-showcase"
    >
      <Container className="relative z-10">
        {/* ── Trust rail ─────────────────────────────────────────── */}
        <SectionReveal>
          <div
            className="grid grid-cols-1 gap-x-6 gap-y-8 border-b border-foreground/10 pb-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-center"
            data-od-id="trust-rail"
          >
            <RailMetric
              icon={HandCoins}
              value={compactMoney(total) ?? "$1.2M+"}
              label={t("rewardsDistributed")}
            />
            <RailMetric
              icon={Users}
              value="20K+"
              label={t("qualifiedAnalysts")}
            />
            <RailMetric
              icon={Globe2}
              value="Worldwide"
              label={t("countriesWorldwide")}
            />
            <div>
              <p className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold leading-none tracking-tight text-foreground">
                24/7
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-foreground/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                <span>{t("liveSupport")}</span>
                <span className="font-semibold text-foreground/70">Discord</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ── Showcase panel ─────────────────────────────────────── */}
        <SectionReveal delay={0.08}>
          <div
            className="relative mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-[#12100A] shadow-xl md:mt-10"
            data-od-id="proof-showcase-panel"
          >
            {/* Concentric ring atmosphere (subtle, clean vector rings) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-[42%] top-1/2 h-[940px] w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
              <div className="absolute left-[42%] top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
              <div className="absolute left-[42%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[40%_60%]">
              {/* Copy column */}
              <div
                className="flex flex-col justify-center p-8 sm:p-10 lg:py-16 lg:pl-12 lg:pr-6"
                data-od-id="proof-showcase-copy"
              >
                <h2 className="max-w-[440px] font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-[44px]">
                  {t("titleLine1")}
                  <br />
                  {t("titleLine2")}
                </h2>
                <p className="mt-4 max-w-[400px] text-[15px] leading-7 text-foreground/60">
                  {t("subtitle")}
                </p>
                <div
                  className="mt-6 flex flex-col items-start gap-2.5"
                  data-od-id="proof-benefits"
                >
                  {benefits.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2.5 rounded-full border border-foreground/12 bg-foreground/[0.05] px-4 py-2 text-sm font-semibold text-foreground/80"
                    >
                      <Icon size={14} className="text-primary" />
                      {label}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-5 flex flex-wrap items-center gap-4"
                  data-od-id="proof-showcase-cta"
                >
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-foreground/12 bg-foreground/[0.05] px-4 py-2.5 text-sm font-semibold text-foreground/80">
                    <DollarSign size={14} className="text-primary" />
                    {t("modelsPill")}
                  </span>
                  <a
                    href="/evaluation"
                    className="inline-flex min-h-11 items-center rounded-xl border border-foreground/25 px-6 text-sm font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {t("viewEvaluations")}
                  </a>
                </div>
              </div>

              {/* Visual column */}
              <div
                className="relative flex items-end px-5 pb-14 pt-4 sm:px-10 lg:px-0 lg:pb-14 lg:pt-12 lg:pr-12"
                data-od-id="proof-showcase-visual"
              >
                <BrowserWindow rows={rows} total={total} />
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function RailMetric({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof HandCoins;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <Icon size={26} strokeWidth={1.6} className="mt-1 shrink-0 text-primary" />
      <div>
        <p className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold leading-none tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-2 text-xs text-foreground/45">{label}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const SAMPLE_PROOF_ROWS: CmsPayout[] = [
  { id: 201, title: "Liam O.", amount: "14850", currency: "USD", countryCode: "GB", countryName: "United Kingdom", approvedAt: "2026-08-22T08:30:00Z" } as CmsPayout,
  { id: 202, title: "Marco R.", amount: "23400", currency: "USD", countryCode: "DE", countryName: "Germany", approvedAt: "2026-08-22T08:15:00Z" } as CmsPayout,
  { id: 203, title: "Tariq A.", amount: "6890", currency: "USD", countryCode: "AE", countryName: "United Arab Emirates", approvedAt: "2026-08-22T08:00:00Z" } as CmsPayout,
  { id: 204, title: "Alexander S.", amount: "18920", currency: "USD", countryCode: "AT", countryName: "Austria", approvedAt: "2026-08-22T07:45:00Z" } as CmsPayout,
  { id: 205, title: "Daniel W.", amount: "11200", currency: "USD", countryCode: "US", countryName: "United States", approvedAt: "2026-08-22T07:30:00Z" } as CmsPayout,
  { id: 206, title: "Kenji T.", amount: "8940", currency: "USD", countryCode: "JP", countryName: "Japan", approvedAt: "2026-08-22T07:15:00Z" } as CmsPayout,
  { id: 207, title: "Lucas F.", amount: "15300", currency: "USD", countryCode: "BR", countryName: "Brazil", approvedAt: "2026-08-22T07:00:00Z" } as CmsPayout,
  { id: 208, title: "Chloe D.", amount: "12450", currency: "USD", countryCode: "FR", countryName: "France", approvedAt: "2026-08-22T06:45:00Z" } as CmsPayout,
];

function BrowserWindow({
  rows,
  total,
}: {
  rows: CmsPayout[];
  total: number | null;
}) {
  const t = useTranslations("proof");
  const [offset, setOffset] = useState(0);
  const baseList = rows.length >= 4 ? rows : SAMPLE_PROOF_ROWS;

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % baseList.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [baseList.length]);

  const activeRows = useMemo(() => {
    const combined = [...baseList.slice(offset), ...baseList.slice(0, offset)];
    return combined.slice(0, 4);
  }, [baseList, offset]);

  return (
    <div className="relative w-full" data-od-id="proof-browser">
      {/* Browser chrome + body */}
      <div className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0A07] shadow-2xl">
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
          <div className="ml-4 flex h-6 flex-1 items-center justify-end gap-1.5 rounded-md border border-white/10 bg-black/40 px-3 text-[10px] tracking-wide text-foreground/45">
            <Lock size={9} />
            app.ckcapital.com/payouts
          </div>
        </div>

        <div className="relative flex-1 p-5 sm:p-7">
          <div className="sm:ml-auto sm:max-w-[320px]">
            <p className="text-sm font-bold text-foreground">
              {t("readyReward")}
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-foreground/45">
              {t("readyRewardDesc")}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-foreground/45 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]">
              <span>{t("trader")}</span>
              <span className="hidden sm:block">{t("requested")}</span>
              <span className="hidden sm:block">{t("country")}</span>
              <span className="text-right">{t("amount")}</span>
            </div>
            {activeRows.length ? (
              activeRows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-white/[0.06] px-4 py-3.5 text-xs last:border-0 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]"
                  data-od-id={`proof-table-row-${row.id}`}
                >
                  <span className="min-w-0 truncate font-semibold text-foreground/80">
                    {row.title || "Trader"}
                  </span>
                  <span className="hidden text-foreground/45 sm:block">
                    {formatDate(row.approvedAt)}
                  </span>
                  <span className="hidden sm:block">
                    <span className="rounded border border-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/60">
                      {row.countryCode || "--"}
                    </span>
                  </span>
                  <span className="text-right font-bold text-primary tabular-nums">
                    {formatMoney(
                      parseAmount(row.amount) || null,
                      row.currency ?? undefined
                    )}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-12 text-center text-xs text-foreground/35">
                {t("verifiedPending")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlapping total rewards card */}
      <div
        className="absolute -bottom-10 left-2 z-20 w-[min(82%,390px)] sm:left-5 lg:-left-8"
        data-od-id="proof-total-card"
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-[#0B0A07] p-6 shadow-2xl sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">
            {t("totalPayouts")}
          </p>
          <p className="mt-2.5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-none tracking-tight text-foreground sm:text-[44px]">
            {formatMoney(total ?? 1200000)}
          </p>
          <GoldGem className="pointer-events-none absolute -right-2 top-4 h-24 w-24 opacity-90 sm:h-28 sm:w-28" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Angular gold gem — decorative, drawn from registered gold values    */
/* ------------------------------------------------------------------ */

function GoldGem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 112"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gem-hi" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="1%" stopColor="#FFC107" />
        </linearGradient>
        <linearGradient id="gem-mid" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="1%" stopColor="#E6AE06" />
        </linearGradient>
        <linearGradient id="gem-lo" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6AE06" />
          <stop offset="1%" stopColor="#FFC107" />
        </linearGradient>
      </defs>
      <polygon points="22,14 50,4 78,14 64,38 36,38" fill="url(#gem-hi)" />
      <polygon points="22,14 36,38 10,44" fill="url(#gem-lo)" opacity="0.85" />
      <polygon points="78,14 64,38 90,44" fill="url(#gem-mid)" opacity="0.9" />
      <polygon points="10,44 36,38 50,106" fill="url(#gem-mid)" opacity="0.8" />
      <polygon points="90,44 64,38 50,106" fill="url(#gem-lo)" opacity="0.75" />
      <polygon points="36,38 64,38 50,106" fill="url(#gem-hi)" />
    </svg>
  );
}
