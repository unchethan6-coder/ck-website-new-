"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  DollarSign,
  Globe2,
  HandCoins,
  Lock,
  RefreshCw,
  ShieldCheck,
  Star,
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
    summary?.totalRewards && summary.totalRewards > 0
      ? summary.totalRewards
      : payoutTotal;
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
      className="relative overflow-hidden py-12 md:py-16"
      data-od-id="proof-showcase"
    >
      <Container className="relative z-10">
        {/* ── Trust rail ─────────────────────────────────────────── */}
        <SectionReveal>
          <div
            className="grid grid-cols-1 gap-x-6 gap-y-8 border-b border-foreground/10 pb-8 sm:grid-cols-2 lg:grid-cols-5 lg:items-center"
            data-od-id="trust-rail"
          >
            <RailMetric
              icon={HandCoins}
              value={compactMoney(total)}
              label={t("rewardsDistributed")}
            />
            <RailMetric
              icon={Users}
              value={analysts ? `${analysts.toLocaleString()}+` : "Pending"}
              label={t("qualifiedAnalysts")}
            />
            <RailMetric
              icon={Globe2}
              value={countries ? `${countries}+` : "Pending"}
              label={t("countriesWorldwide")}
            />
            <div>
              <p className="font-[family-name:var(--font-inter-tight)] text-[26px] font-extrabold leading-none tracking-tight text-foreground">
                {t("excellentRating")}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-foreground/50">
                <span>{t("ratedScore")}</span>
                <span
                  className="flex gap-0.5 text-[#00B67A]"
                  aria-label="4.9 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="font-semibold text-foreground/70">Trustpilot</span>
              </div>
            </div>
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
            className="relative mt-8 overflow-hidden rounded-[28px] border border-foreground/10 bg-background-secondary/60 shadow-[0_28px_90px_rgba(0,0,0,0.35)] md:mt-10"
            data-od-id="proof-showcase-panel"
          >
            {/* Concentric ring atmosphere */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-[42%] top-1/2 h-[940px] w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.06]" />
              <div className="absolute left-[42%] top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.07]" />
              <div className="absolute left-[42%] top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/[0.08]" />
              <div className="absolute left-[42%] top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.08),transparent_62%)]" />
              <div className="absolute right-[-12%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_66%)] blur-2xl" />
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

function BrowserWindow({
  rows,
  total,
}: {
  rows: CmsPayout[];
  total: number | null;
}) {
  return (
    <div className="relative w-full" data-od-id="proof-browser">
      {/* Browser chrome + body */}
      <div className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-foreground/12 bg-background/80 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-foreground/10 bg-foreground/[0.05] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/30" />
          <div className="ml-4 flex h-6 flex-1 items-center justify-end gap-1.5 rounded-md border border-foreground/10 bg-background/50 px-3 text-[10px] tracking-wide text-foreground/35">
            <Lock size={9} />
            app.ckcapital.com/payouts
          </div>
        </div>

        <div className="relative flex-1 p-5 sm:p-7">
          <div className="sm:ml-auto sm:max-w-[320px]">
            <p className="text-sm font-bold text-foreground">
              Ready to request your reward?
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-foreground/45">
              Open your CK Capital dashboard, click request, then complete the
              required details.
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-foreground/10">
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-foreground/10 bg-foreground/[0.04] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-foreground/35 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]">
              <span>Trader</span>
              <span className="hidden sm:block">Requested</span>
              <span className="hidden sm:block">Country</span>
              <span className="text-right">Amount</span>
            </div>
            {rows.length ? (
              rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="grid grid-cols-[1.2fr_0.8fr] gap-3 border-b border-foreground/[0.06] px-4 py-3.5 text-xs last:border-0 sm:grid-cols-[1.2fr_0.9fr_0.6fr_0.8fr]"
                  data-od-id={`proof-table-row-${row.id}`}
                >
                  <span className="min-w-0 truncate font-semibold text-foreground/75">
                    {row.title || "Trader"}
                  </span>
                  <span className="hidden text-foreground/40 sm:block">
                    {formatDate(row.approvedAt)}
                  </span>
                  <span className="hidden sm:block">
                    <span className="rounded border border-foreground/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/55">
                      {row.countryCode || "--"}
                    </span>
                  </span>
                  <span className="text-right font-bold text-primary tabular-nums">
                    {formatMoney(
                      parseAmount(row.amount) || null,
                      row.currency ?? undefined
                    )}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="px-4 py-12 text-center text-xs text-foreground/35">
                Verified records will appear here as they are published.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlapping total rewards card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-10 left-2 z-20 w-[min(82%,390px)] sm:left-5 lg:-left-8"
        data-od-id="proof-total-card"
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-background p-6 shadow-[0_28px_70px_rgba(0,0,0,0.55)] sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">
            Total Rewards
          </p>
          <p className="mt-2.5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-none tracking-tight text-foreground sm:text-[44px]">
            {formatMoney(total)}
          </p>
          <GoldGem className="pointer-events-none absolute -right-2 top-4 h-24 w-24 opacity-90 sm:h-28 sm:w-28" />
        </div>
      </motion.div>
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
          <stop offset="0" stopColor="#f5d570" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
        <linearGradient id="gem-mid" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#d4af37" />
          <stop offset="1" stopColor="#8a6a12" />
        </linearGradient>
        <linearGradient id="gem-lo" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a12" />
          <stop offset="1" stopColor="#d4af37" />
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
