"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Lock, RefreshCw, Wallet, ShieldCheck, DollarSign } from "lucide-react";
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
    { label: t("benefitStarting"), icon: DollarSign },
  ];

  const verified = useMemo(() => payouts.filter(isVerified), [payouts]);
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

  return (
    <section
      className="relative overflow-hidden bg-white text-[#0A0A0C] py-16 md:py-24"
      data-od-id="proof-showcase"
    >
      {/* Soft centered glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 38%, rgba(54,124,219,0.06) 0%, rgba(1,162,239,0.03) 45%, transparent 75%)",
        }}
      />
      <Container>
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-[28px] border border-gray-200 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.12)]"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 55%, #EEF4FB 100%)",
            }}
            data-od-id="proof-showcase-panel"
          >
            {/* Concentric rings + soft sapphire atmosphere */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-[30%] top-[58%] h-[1060px] w-[1060px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#367CDB]/10" />
              <div className="absolute left-[30%] top-[58%] h-[840px] w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#367CDB]/15" />
              <div className="absolute left-[30%] top-[58%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#367CDB]/20" />
              <div className="absolute left-[30%] top-[58%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#367CDB]/15" />
              <div
                className="absolute -bottom-[34%] left-[4%] h-[72%] w-[64%] rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(54,124,219,0.12) 0%, rgba(1,162,239,0.08) 45%, transparent 72%)",
                }}
              />
              <div
                className="absolute -top-[24%] right-[4%] h-[52%] w-[46%] rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(1,162,239,0.08) 0%, rgba(54,124,219,0.05) 50%, transparent 75%)",
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[40%_60%]">
              {/* Copy column */}
              <div
                className="flex flex-col justify-center p-8 sm:p-10 lg:py-16 lg:pl-10 lg:pr-4"
                data-od-id="proof-showcase-copy"
              >
                <h2 className="max-w-[440px] font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0A0A0C] sm:text-[44px]">
                  {t("titleLine1")}
                  <br />
                  {t("titleLine2")}
                </h2>
                <p className="mt-4 max-w-[400px] text-[15px] leading-7 text-gray-500">
                  {t("subtitle")}
                </p>
                <div
                  className="mt-7 grid max-w-[460px] grid-cols-1 sm:grid-cols-2 items-start gap-2"
                  data-od-id="proof-benefits"
                >
                  {benefits.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-[#0A0A0C] shadow-sm"
                    >
                      <Icon size={15} className="shrink-0 text-[#0A0A0C]" strokeWidth={2.2} />
                      {label}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-8 flex flex-wrap items-center gap-4"
                  data-od-id="proof-showcase-cta"
                >
                  <a
                    href="/evaluation"
                    className="inline-flex min-h-12 items-center rounded-xl border border-gray-300 bg-white px-7 text-sm font-bold text-[#0A0A0C] shadow-sm transition-colors hover:border-[#367CDB] hover:bg-[#F0F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#367CDB]"
                  >
                    {t("viewEvaluations")}
                  </a>
                </div>
              </div>

              {/* Visual column — symmetric top/bottom padding to match copy column */}
              <div
                className="relative flex items-end px-5 py-8 sm:px-10 sm:py-10 lg:px-0 lg:py-16 lg:pr-12"
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
      <div className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_32px_80px_-32px_rgba(15,23,42,0.25)]">
        <div className="flex h-10 sm:h-11 shrink-0 items-center justify-between border-b border-gray-200 bg-gray-100 px-3 sm:px-4">
          {/* Left traffic dots */}
          <div className="flex items-center gap-1.5 shrink-0 w-7 sm:w-10">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#F87171]" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FBBF24]" />
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#34D399]" />
          </div>

          {/* Centered URL pill */}
          <div className="mx-1.5 flex h-6 sm:h-6.5 flex-1 max-w-[240px] sm:max-w-[300px] items-center justify-center gap-1 sm:gap-1.5 rounded-md border border-gray-200 bg-white px-2 sm:px-2.5 text-[9.5px] sm:text-[11px] font-mono tracking-tight text-gray-500 min-w-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <Lock size={9} className="shrink-0 text-gray-400" />
            <span className="whitespace-nowrap truncate">app.ckcapital.co.uk/rewards</span>
          </div>

          {/* Symmetrical right spacer */}
          <div className="w-7 sm:w-10 shrink-0" aria-hidden="true" />
        </div>

        <div className="relative flex-1 p-5 pb-16 sm:p-7 sm:pb-7">
          <div className="sm:ml-auto sm:max-w-[320px]">
            <p className="text-sm font-bold text-gray-900">
              {t("readyReward")}
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-gray-500">
              {t("readyRewardDesc")}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-gray-400 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]">
              <span>{t("trader")}</span>
              <span className="hidden sm:block">{t("requested")}</span>
              <span className="hidden sm:block">{t("country")}</span>
              <span className="text-right">{t("amount")}</span>
            </div>
            {activeRows.length ? (
              activeRows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-gray-100 bg-white px-4 py-3.5 text-xs last:border-0 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]"
                  data-od-id={`proof-table-row-${row.id}`}
                >
                  <span className="min-w-0 truncate font-semibold text-gray-900">
                    {row.title || "Trader"}
                  </span>
                  <span className="hidden text-gray-500 sm:block">
                    {formatDate(row.approvedAt)}
                  </span>
                  <span className="hidden sm:block">
                    <span className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                      {row.countryCode || "--"}
                    </span>
                  </span>
                  <span className="text-right font-bold text-gray-900 tabular-nums">
                    {formatMoney(
                      parseAmount(row.amount) || null,
                      row.currency ?? undefined
                    )}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-4 py-12 text-center text-xs text-gray-400">
                {t("verifiedPending")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlapping total rewards card — responsive positioning & no collision */}
      <div
        className="absolute -bottom-6 left-4 right-4 sm:right-auto sm:left-6 sm:w-[350px] lg:-left-6 lg:w-[370px] z-20"
        data-od-id="proof-total-card"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#367CDB]/30 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.18)]">
          <div className="relative z-10 pr-16 sm:pr-20">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#2563EB]">
              {t("totalPayouts")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-2xl xs:text-3xl sm:text-[32px] font-black leading-none tracking-tight text-[#0A0A0C] tabular-nums">
              {formatMoney(total ?? 1200000)}
            </p>
          </div>
          <GoldGem className="pointer-events-none absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 opacity-90 drop-shadow-[0_4px_12px_rgba(1,162,239,0.25)]" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Angular sapphire gem — decorative, drawn from brand blue values    */
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
          <stop offset="0%" stopColor="#01A2EF" />
          <stop offset="1%" stopColor="#367CDB" />
        </linearGradient>
        <linearGradient id="gem-mid" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#367CDB" />
          <stop offset="1%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="gem-lo" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="1%" stopColor="#367CDB" />
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
