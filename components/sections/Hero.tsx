"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, MotionConfig, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { GoldButton } from "@/components/shared/GoldButton";
import { MarketTicker } from "@/components/sections/MarketTicker";
import { Aurora } from "@/components/fx/Aurora";
import { LivePayoutPill } from "@/components/fx/LivePayoutPill";
import { MagneticWrapper } from "@/components/fx/MagneticWrapper";
import { EASE } from "@/components/fx/reveal";
import { PRICING_PLANS } from "@/lib/content";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Three.js gold column skyline — lazy-loaded chunk (kept out of the main bundle).
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

/* ── Entrance choreography (§3 of hero-cinematics-plan) ───────────────
 * Each block's `show` transition delay encodes its place in the staged
 * timeline. Delays are absolute seconds from mount.
 */
const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

const wordUp: Variants = {
  hidden: { y: "115%" },
  show: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
};

const chipUp: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.96 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE, delay },
  }),
};

const H1_LINES: { words: { text: string; gold?: boolean }[] }[] = [
  { words: [{ text: "Trade" }, { text: "up" }, { text: "to" }, { text: "$100K.", gold: true }] },
  { words: [{ text: "Keep" }, { text: "up" }, { text: "to" }, { text: "100%.", gold: true }] },
];

function HeroPricingCard({
  plan,
  index,
}: {
  plan: (typeof PRICING_PLANS)[number];
  index: number;
}) {
  const tc = useTranslations("challenge");

  return (
    <motion.article
      data-od-id={`hero-pricing-${plan.id}`}
      variants={fadeUp}
      custom={1.25 + index * 0.12}
      className={cn(
        "relative flex flex-col rounded-2xl border p-5 sm:p-6 min-w-0 backdrop-blur-md",
        plan.popular
          ? "fx-border-spin border-primary bg-gradient-to-b dark-panel from-[#1a1508] to-[#0d0b06] shadow-[0_0_25px_rgba(212,175,55,0.25)]"
          : "border-foreground/10 bg-[color-mix(in_oklab,var(--background-secondary)_72%,transparent)]"
      )}
    >
      {/* Badge above card */}
      {plan.popular ? (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[image:var(--ck-gold-gradient)] px-3.5 py-1 text-[10px] font-bold text-black tracking-[0.14em]">
          {tc("mostPopular")}
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
          { label: tc("profitTarget"), value: plan.profitTarget },
          { label: tc("maxDailyLoss"), value: plan.maxDailyLoss },
          { label: tc("maxLoss"), value: plan.maxLoss },
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
            {tc("startNow")}
          </GoldButton>
        </a>
      </div>
    </motion.article>
  );
}

export function Hero() {
  const tHero = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const heroFeatures = (tHero.raw("features") as string[]) ?? HERO_FEATURES;

  const line1 = tHero("headlineLine1") || "Trade up to $100K.";
  const line2 = tHero("headlineLine2") || "Keep up to 100%.";
  const line1Words = line1.split(" ");
  const line2Words = line2.split(" ");
  const dynamicH1Lines = [
    { words: line1Words.map((text, i) => ({ text, gold: i === line1Words.length - 1 })) },
    { words: line2Words.map((text, i) => ({ text, gold: i === line2Words.length - 1 })) },
  ];

  // Scroll hand-off (parallax-fade, Option A). progress = 0 at hero top in
  // view; 1 when the hero bottom reaches the viewport top.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const webglY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const tickerOpacity = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        /* Slides under the transparent nav pill (mirrors upcomers' -mt-[--nav-h]) */
        className="relative -mt-[72px] md:-mt-[76px] flex flex-col min-h-[calc(100dvh-44px)]"
        data-od-id="hero"
      >
        {/* Large CSS gold radial glows — fill the hero; parallax slower than copy */}
        <motion.div
          aria-hidden="true"
          style={{ y: glowY, opacity: glowOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
        >
          <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] rounded-full opacity-70 fx-hero-glow-1" />
          <div className="absolute top-[15%] -left-[10%] w-[60%] h-[70%] rounded-full opacity-60 fx-hero-glow-2" />
          <div className="absolute top-[20%] -right-[10%] w-[55%] h-[65%] rounded-full opacity-55 fx-hero-glow-3" />
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full opacity-40 fx-hero-glow-4" />
        </motion.div>

        {/* WebGL gold column skyline (animated layer — detail on top of CSS glows) */}
        <motion.div style={{ y: webglY }} className="absolute inset-0 z-[2] pointer-events-none">
          <HeroField className="absolute inset-0" />
        </motion.div>

        {/* CSS aurora: dot grid overlay — parallax mid-rate */}
        <motion.div style={{ y: dotsY }} className="absolute inset-0 z-[3] pointer-events-none">
          <Aurora variant="hero" grid className="absolute inset-0" />
        </motion.div>

        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-10 w-full flex-1 flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-10"
        >
          {/* Copy scrim (§5.1) — travels with the copy column at the same rate,
              so text and scrim move as one layer and can never detach. */}
          <motion.div
            aria-hidden="true"
            className="fx-copy-scrim pointer-events-none absolute -inset-x-4 -inset-y-10 sm:-inset-x-10 lg:-inset-x-14"
          />
          <motion.div
            initial="hidden"
            animate="show"
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center"
          >
            {/* ─────────────── LEFT COLUMN — copy ─────────────── */}
            <div className="lg:col-span-7 xl:col-span-6 min-w-0">
              {/* Live payout pill (0.30s) */}
              <motion.div variants={fadeDown} custom={0.3}>
                <LivePayoutPill />
              </motion.div>

              {/* Headline — word-mask reveal, line 1 at 0.45s, line 2 at 0.62s */}
              <motion.h1
                variants={{ hidden: {}, show: {} }}
                className="fx-copy-shadow mt-6 font-[family-name:var(--font-inter-tight)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground text-[clamp(38px,7vw,44px)] sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]"
                data-od-id="hero-headline"
              >
                {dynamicH1Lines.map((line, li) => (
                  <span key={li} className="block">
                    {line.words.map((w, wi) => {
                      const delay = (li === 0 ? 0.45 : 0.62) + wi * 0.04;
                      return (
                        <span
                          key={wi}
                          className="inline-block overflow-hidden align-bottom"
                          aria-hidden={w.gold ? undefined : true}
                        >
                          <motion.span
                            variants={wordUp}
                            custom={delay}
                            className={cn("inline-block", w.gold && "shimmer-text whitespace-nowrap")}
                          >
                            {w.text}
                          </motion.span>
                        </span>
                      );
                    })}
                    {li === 0 && <span aria-hidden="true">{"\u00A0"}</span>}
                  </span>
                ))}
              </motion.h1>

              {/* Subcopy (0.85s) */}
              <motion.p
                variants={fadeUp}
                custom={0.85}
                className="fx-copy-shadow mt-5 max-w-xl text-[14px] sm:text-[15px] text-foreground/55 leading-relaxed"
              >
                {tHero("subcopy")}
              </motion.p>

              {/* CTAs — one primary, one text link (1.00s) */}
              <motion.div
                variants={fadeUp}
                custom={1.0}
                className="mt-7 flex flex-wrap items-center gap-4"
              >
                <MagneticWrapper>
                  <a
                    href="https://app.ckcapital.co.uk/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fx-cta-plate block"
                  >
                    <GoldButton
                      size="lg"
                      data-od-id="hero-cta-primary"
                      className="fx-sheen fx-sheen-hover"
                    >
                      {tHero("startChallenge")} <ArrowRight size={16} />
                    </GoldButton>
                  </a>
                </MagneticWrapper>
                <a
                  href="#how-it-works"
                  data-od-id="hero-cta-secondary"
                  className="inline-flex items-center gap-1.5 px-2 py-3 text-[14px] font-semibold text-foreground/75 hover:text-foreground transition-colors"
                >
                  {tHero("exploreObjectives")}
                  <span aria-hidden="true" className="text-primary">↓</span>
                </a>
              </motion.div>

              {/* Feature bullets (1.15s + stagger) */}
              <motion.ul
                variants={{ hidden: {}, show: {} }}
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                {heroFeatures.map((f, i) => (
                  <motion.li
                    key={f}
                    variants={chipUp}
                    custom={1.15 + i * 0.05}
                    className="flex items-center gap-1.5 text-[12.5px] text-foreground/60"
                  >
                    <Check size={12} className="text-primary shrink-0" strokeWidth={3} />
                    {f}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* ─────────────── RIGHT COLUMN — pricing cards (1.25s + stagger) ─────────────── */}
            <div
              className="lg:col-span-5 xl:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 min-w-0"
              data-od-id="hero-pricing"
            >
              {PRICING_PLANS.map((plan, i) => (
                <HeroPricingCard key={plan.id} plan={plan} index={i} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Live market ticker — pinned to the bottom of the 100vh hero (1.70s) */}
        <motion.div style={{ opacity: tickerOpacity }}>
          <MarketTicker revealDelay={1.7} />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
