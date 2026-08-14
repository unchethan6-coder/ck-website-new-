"use client";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { CountUp } from "@/components/fx/CountUp";
import { LiveChart, TickerPrice } from "@/components/fx/LiveChart";
import { chipIn, fadeUp, stagger } from "@/components/fx/reveal";
import {
  Newspaper, Zap, TrendingUp, RefreshCw, Activity, Headphones,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  newspaper: Newspaper,
  zap: Zap,
  "trending-up": TrendingUp,
  "refresh-cw": RefreshCw,
  activity: Activity,
  headphones: Headphones,
};

const BY_KEY = Object.fromEntries(WHY_CHOOSE_US.map((i) => [i.icon, i]));

const SPLIT_CHIPS = ["No commissions", "No hidden fees", "On-demand payouts"];

export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-24 bg-background" data-od-id="why-choose-us">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Advantages
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Everything you need to trade funded
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            Built for serious traders who want real rules, real payouts, and real support.
          </p>
        </SectionReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5"
        >
          {/* Large — 100% split with count-up */}
          <motion.div
            variants={fadeUp}
            className="glow-card relative overflow-hidden flex flex-col md:col-span-2 lg:col-span-4"
            data-od-id="feature-card-split"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70 mb-2">
                  Up to
                </p>
                <CountUp
                  value="100%"
                  className="font-[family-name:var(--font-inter-tight)] text-5xl md:text-6xl font-extrabold text-primary tabular-nums"
                />
                <p className="mt-2 text-[13px] font-semibold text-foreground/60">
                  Reward Split
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                <TrendingUp size={22} className="text-primary" />
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-foreground/50 leading-relaxed">
              {BY_KEY["trending-up"].description}
            </p>
            <motion.div variants={stagger} className="mt-6 flex flex-wrap gap-2">
              {SPLIT_CHIPS.map((chip) => (
                <motion.span
                  key={chip}
                  variants={chipIn}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-primary"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Small — News trading */}
          <BentoCard
            icon="newspaper"
            title={BY_KEY["newspaper"].title}
            desc={BY_KEY["newspaper"].description}
            className="lg:col-span-2"
          />

          {/* Large — Trading conditions with live chart */}
          <motion.div
            variants={fadeUp}
            className="glow-card relative overflow-hidden flex flex-col md:col-span-2 lg:col-span-4"
            data-od-id="feature-card-conditions"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                  <Activity size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-foreground">
                    {BY_KEY["activity"].title}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-mono text-foreground/40">
                    NQ · <TickerPrice base={21529} decimals={0} prefix="$" />
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 text-[10.5px] font-bold text-teal-400">
                +1.37%
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-foreground/50 leading-relaxed">
              {BY_KEY["activity"].description}
            </p>
            <div className="mt-5 flex-1 min-h-[120px] overflow-hidden">
              <LiveChart />
            </div>
          </motion.div>

          {/* Small — Reset & top-up */}
          <BentoCard
            icon="refresh-cw"
            title={BY_KEY["refresh-cw"].title}
            desc={BY_KEY["refresh-cw"].description}
            className="lg:col-span-2"
          />

          {/* Small — Flexible payouts */}
          <BentoCard
            icon="zap"
            title={BY_KEY["zap"].title}
            desc={BY_KEY["zap"].description}
            className="lg:col-span-3"
          />

          {/* Small — 24/7 support */}
          <BentoCard
            icon="headphones"
            title={BY_KEY["headphones"].title}
            desc={BY_KEY["headphones"].description}
            className="lg:col-span-3"
          />
        </motion.div>
      </Container>
    </section>
  );
}

function BentoCard({
  icon,
  title,
  desc,
  className,
}: {
  icon: string;
  title: string;
  desc: string;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05] ${className ?? ""}`}
      data-od-id={`feature-card-${icon}`}
    >
      <div className="mb-4 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
        {Icon && <Icon size={18} className="text-primary" />}
      </div>
      <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-foreground/50 leading-relaxed">{desc}</p>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#d4af37]/5 to-transparent" />
    </motion.div>
  );
}
