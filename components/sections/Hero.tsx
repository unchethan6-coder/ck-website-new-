"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/shared/GoldButton";
import { MarketTicker } from "@/components/sections/MarketTicker";
import { PRICING_PLANS } from "@/lib/content";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function useCountdown() {
  // Initial state deliberately uses the FULL 24h window with no `Date.now()`
  // or `localStorage` read. Both server and client's first render produce
  // "24 : 00 : 00" — identical strings, so hydration matches. The real target
  // is resolved inside useEffect (client only), which then triggers a
  // re-render with the correct remaining time.
  const [diff, setDiff] = useState<number>(86_400_000);

  useEffect(() => {
    const resolveTarget = (): number => {
      try {
        const stored = localStorage.getItem("ck-countdown");
        if (stored) {
          const t = parseInt(stored, 10);
          if (!Number.isNaN(t) && t > Date.now()) return t;
        }
      } catch {
        // localStorage may throw in private mode — fall through to a fresh target
      }
      const target = Date.now() + 86_400_000;
      try {
        localStorage.setItem("ck-countdown", String(target));
      } catch {}
      return target;
    };

    const target = resolveTarget();
    setDiff(Math.max(0, target - Date.now()));
    const id = setInterval(
      () => setDiff(Math.max(0, target - Date.now())),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return { h, m, s };
}

function CountdownTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-primary/25 bg-foreground/[0.04] flex items-center justify-center">
        <span className="font-mono text-xl sm:text-2xl font-bold text-primary tabular-nums leading-none">
          {value}
        </span>
      </div>
      <span className="text-[9px] text-foreground/35 mt-1.5 uppercase tracking-[0.14em]">
        {label}
      </span>
    </div>
  );
}

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
          ? "border-primary bg-gradient-to-b dark-panel from-[#1a1508] to-[#0d0b06] shadow-[0_0_25px_rgba(212,175,55,0.25)]"
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
  const { h, m, s } = useCountdown();

  return (
    <section
      // Hero + ticker together fit within the initial viewport. The 112px
      // offset accounts for the announcement bar (~40px) and nav pill flow
      // (~72px) that precede this section, so `min-h-[calc(100dvh-112px)]`
      // makes the ticker land at the bottom edge of the 100vh fold.
      className="relative flex flex-col min-h-[calc(100dvh-112px)]"
      data-od-id="hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 75% 10%, rgba(212,175,55,0.22), transparent 45%), radial-gradient(circle at 10% 90%, rgba(212,175,55,0.10), transparent 40%)",
        }}
      />
      <div className="relative w-full flex-1 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* ─────────────── LEFT COLUMN — copy ─────────────── */}
          <div className="lg:col-span-7 xl:col-span-6 min-w-0">
            {/* Promo pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-bold text-primary tracking-[0.16em] uppercase">
                <Sparkles size={11} className="text-primary" />
                Summer Sale
                <span className="text-primary/40">·</span>
                Biggest Drop of the Year
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground text-[clamp(38px,7vw,44px)] sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]"
              data-od-id="hero-headline"
            >
              Trade up to <span className="shimmer-text whitespace-nowrap">$100K.</span>
              <br />
              Keep up to <span className="shimmer-text whitespace-nowrap">100%.</span>
            </motion.h1>

            {/* Gold sub-line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-base sm:text-lg font-bold text-primary tracking-tight"
            >
              70% OFF all evaluations
            </motion.p>

            {/* Subcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-3 max-w-xl text-[14px] sm:text-[15px] text-foreground/55 leading-relaxed"
            >
              Prove your skills in a simulated environment on MT5 &amp; TradeLocker.
              No time limits, news trading allowed, transparent rules, and no hidden
              fees.
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-7"
            >
              <p className="text-[10.5px] text-foreground/40 uppercase tracking-[0.2em] font-semibold mb-3">
                Offer Ends In
              </p>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CountdownTile value={h} label="hrs" />
                <span className="text-foreground/25 font-bold text-lg sm:text-xl -mt-4">:</span>
                <CountdownTile value={m} label="min" />
                <span className="text-foreground/25 font-bold text-lg sm:text-xl -mt-4">:</span>
                <CountdownTile value={s} label="sec" />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoldButton size="lg" data-od-id="hero-cta-primary">
                  Claim 70% OFF <ArrowRight size={16} />
                </GoldButton>
              </a>
              <a
                href="#start-challenge"
                data-od-id="hero-cta-secondary"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-foreground/15 text-[14px] font-semibold text-foreground/85 hover:text-foreground hover:border-foreground/25 hover:bg-foreground/[0.04] transition-all"
              >
                Compare Plans
              </a>
            </motion.div>

            {/* Feature bullets */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
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
          {/*
            Mobile/tablet (<lg): full-width, sm+ shows 3-across
            lg (1024–1279): stack vertically to give each card breathing room
            xl (1280+): 3-across again inside the 5/12 sidebar column
          */}
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
