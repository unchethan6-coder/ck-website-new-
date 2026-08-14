"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { GoldButton } from "@/components/shared/GoldButton";
import { MarketTicker } from "@/components/sections/MarketTicker";
import { Aurora } from "@/components/fx/Aurora";
import { LivePayoutPill } from "@/components/fx/LivePayoutPill";
import { PRICING_PLANS } from "@/lib/content";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Three.js gold aurora field — lazy-loaded chunk (kept out of the main bundle).
const HeroField = dynamic(
  () => import("@/components/fx/HeroField").then((m) => m.HeroField),
  { ssr: false }
);

const HERO_FEATURES = [
  "12H Payouts",
  "100% Profit Split",
  "$100K Capital",
  "No Time Limits",
];

function HeroPricingCard({
  plan,
}: {
  plan: (typeof PRICING_PLANS)[number];
}) {
  return (
    <article
      data-od-id={`hero-pricing-${plan.id}`}
      className={cn(
        "relative flex flex-col rounded-2xl border p-5 sm:p-6 min-w-0",
        plan.popular
          ? "fx-border-spin border-primary bg-gradient-to-b dark-panel from-[#1a1508] to-[#0d0b06] shadow-[0_0_25px_rgba(212,175,55,0.25)]"
          : "border-foreground/10 bg-foreground/[0.03]"
      )}
    >
      {/* Badge above card */}
      {plan.popular ? (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[image:var(--ck-gold-gradient)] px-3.5 py-1 text-[10px] font-bold text-black tracking-[0.14em]">
          MOST POPULAR
        </span>
      ) : (
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80 mb-2">
          {plan.label}
        </span>
      )}

      <h3 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground leading-none">
        {plan.accountSize}
      </h3>
      <p className="text-[11px] font-semibold text-foreground/40 mt-1.5 tracking-[0.14em] uppercase">
        {plan.type}
      </p>

      <div className="mt-4 space-y-2 text-[12.5px] flex-1">
        {[
          { label: "Profit Target",   value: plan.profitTarget },
          { label: "Max Daily Loss",  value: plan.maxDailyLoss },
          { label: "Max Loss",        value: plan.maxLoss },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2 border-b border-foreground/[0.06] pb-1.5"
          >
            <span className="text-foreground/50 truncate">{row.label}</span>
            <span className="font-semibold text-foreground tabular-nums shrink-0">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-foreground/[0.08]">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-mono text-xl font-extrabold text-foreground">
            ${plan.priceUSD.toFixed(2)}
          </span>
          <span className="text-[11px] text-foreground/30 line-through">
            ${plan.originalPriceUSD.toFixed(2)}
          </span>
          <span className="ml-auto text-[11px] font-bold text-primary">
            {plan.discount}
          </span>
        </div>
        <a
          href="https://app.ckcapital.co.uk/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <GoldButton
            className="mt-3.5 w-full justify-center !py-2.5 !text-[13px]"
            variant={plan.popular ? "gold" : "outline"}
            size="md"
          >
            Start Now
          </GoldButton>
        </a>
      </div>
    </article>
  );
}

export function Hero() {
  return (
    <section
      /* Slides under the transparent nav pill (mirrors upcomers' -mt-[--nav-h]) */
      className="relative -mt-[72px] md:-mt-[76px] flex flex-col min-h-[calc(100dvh-44px)]"
      data-od-id="hero"
    >
      {/* Large CSS gold radial glows — fill the hero like upcomers' aurora image */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top center glow — broad, dominant */}
        <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] rounded-full opacity-70"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.28) 0%, rgba(138,100,16,0.12) 40%, transparent 70%)" }} />
        {/* Center-left glow */}
        <div className="absolute top-[15%] -left-[10%] w-[60%] h-[70%] rounded-full opacity-60"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.22) 0%, rgba(138,100,16,0.08) 45%, transparent 70%)" }} />
        {/* Center-right glow */}
        <div className="absolute top-[20%] -right-[10%] w-[55%] h-[65%] rounded-full opacity-55"
          style={{ background: "radial-gradient(ellipse at center, rgba(245,213,112,0.18) 0%, rgba(212,175,55,0.08) 40%, transparent 65%)" }} />
        {/* Bottom fill */}
        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full opacity-40"
          style={{ background: "radial-gradient(ellipse at center, rgba(138,100,16,0.2) 0%, transparent 65%)" }} />
      </div>
      {/* WebGL gold aurora (animated layer — detail on top of CSS glows) */}
      <HeroField className="absolute inset-0 z-[2] pointer-events-none" />
      {/* CSS aurora: dot grid overlay */}
      <Aurora variant="hero" grid className="inset-x-0 -top-1 bottom-0 z-[3] pointer-events-none" />

      <div className="relative z-10 w-full flex-1 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* ─────────────── LEFT COLUMN — copy ─────────────── */}
          <div className="lg:col-span-7 xl:col-span-6 min-w-0">
            {/* Live payout pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LivePayoutPill />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-[family-name:var(--font-inter-tight)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground text-[clamp(38px,7vw,44px)] sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]"
              data-od-id="hero-headline"
            >
              Trade up to <span className="shimmer-text whitespace-nowrap">$100K.</span>
              <br />
              Keep up to <span className="shimmer-text whitespace-nowrap">100%.</span>
            </motion.h1>

            {/* Subcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[14px] sm:text-[15px] text-foreground/55 leading-relaxed"
            >
              Prove your skills in a simulated environment on MT5 &amp; TradeLocker.
              No time limits, news trading allowed, transparent rules, and no hidden
              fees.
            </motion.p>

            {/* CTAs — one primary, one text link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoldButton size="lg" data-od-id="hero-cta-primary">
                  Start Your Challenge <ArrowRight size={16} />
                </GoldButton>
              </a>
              <a
                href="#how-it-works"
                data-od-id="hero-cta-secondary"
                className="inline-flex items-center gap-1.5 px-2 py-3 text-[14px] font-semibold text-foreground/75 hover:text-foreground transition-colors"
              >
                See how it works
                <span aria-hidden="true" className="text-primary">↓</span>
              </a>
            </motion.div>

            {/* Feature bullets */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {HERO_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 text-[12.5px] text-foreground/60"
                >
                  <Check size={12} className="text-primary shrink-0" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ─────────────── RIGHT COLUMN — pricing cards ─────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 min-w-0"
            data-od-id="hero-pricing"
          >
            {PRICING_PLANS.map((plan) => (
              <HeroPricingCard key={plan.id} plan={plan} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Live market ticker — pinned to the bottom of the 100vh hero */}
      <MarketTicker />
    </section>
  );
}
