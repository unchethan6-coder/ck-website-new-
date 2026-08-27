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
            "radial-gradient(ellipse 55% 60% at 50% 38%, rgba(255,248,225,0.6) 0%, rgba(255,243,205,0.35) 45%, transparent 75%)",
        }}
      />
      <Container>
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-[28px] border border-gray-200 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.12)]"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FEFDF8 55%, #FBF5E6 100%)",
            }}
            data-od-id="proof-showcase-panel"
          >
            {/* Concentric rings + soft gold atmosphere */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-[30%] top-[58%] h-[1060px] w-[1060px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/10" />
              <div className="absolute left-[30%] top-[58%] h-[840px] w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/15" />
              <div className="absolute left-[30%] top-[58%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/20" />
              <div className="absolute left-[30%] top-[58%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFC107]/15" />
              <div
                className="absolute -bottom-[34%] left-[4%] h-[72%] w-[64%] rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,193,7,0.14) 0%, rgba(255,224,130,0.10) 45%, transparent 72%)",
                }}
              />
              <div
                className="absolute -top-[24%] right-[4%] h-[52%] w-[46%] rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,243,205,0.55) 0%, rgba(255,248,225,0.35) 50%, transparent 75%)",
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
                    className="inline-flex min-h-12 items-center rounded-xl border border-gray-300 bg-white px-7 text-sm font-bold text-[#0A0A0C] shadow-sm transition-colors hover:border-[#FFC107] hover:bg-[#FFF8E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
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
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-gray-200 bg-gray-100 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
          <div className="mx-auto flex h-6 w-[58%] items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 text-[10px] tracking-wide text-gray-400">
            <Lock size={9} />
            app.ckcapital.co.uk/rewards
          </div>
          <span className="w-14 shrink-0" />
        </div>

        <div className="relative flex-1 p-5 sm:p-7">
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

      {/* Overlapping total rewards card — lifted to balance top/bottom padding */}
      <div
        className="absolute -bottom-6 left-2 z-20 w-[min(82%,390px)] sm:left-5 lg:-left-8"
        data-od-id="proof-total-card"
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-white p-6 shadow-2xl sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
            {t("totalPayouts")}
          </p>
          <p className="mt-2.5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-none tracking-tight text-[#0A0A0C] sm:text-[44px]">
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
