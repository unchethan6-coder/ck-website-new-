"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { INSTRUMENTS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { CountUp } from "@/components/fx/CountUp";
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

const SPLIT_CHIPS = ["No commissions", "No hidden fees", "On-demand payouts"];

/* Real instrument spreads (honest data — the "competitive conditions" claim,
   not a synthetic price chart). Width is proportional to spread in pips. */
const SPREADS = INSTRUMENTS.map((i) => ({
  symbol: i.symbol,
  type: i.type,
  spread: i.spread,
  pips: parseFloat(i.spread),
}));
const MAX_PIPS = Math.max(...SPREADS.map((s) => s.pips));

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const splitChips = (t.raw("splitChips") as string[]) ?? ["No commissions", "No hidden fees", "On-demand payouts"];

  return (
    <section
      className="relative overflow-hidden py-14 md:py-24"
      data-od-id="why-choose-us"
    >

      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            {t("advantages")}
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            {t("subtitle")}
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
                  {t("upTo")}
                </p>
                <CountUp
                  value="100%"
                  className="font-[family-name:var(--font-inter-tight)] text-5xl md:text-6xl font-extrabold text-primary tabular-nums"
                />
                <p className="mt-2 text-[13px] font-semibold text-foreground/60">
                  {t("items.split.title")}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                <TrendingUp size={22} className="text-primary" />
              </div>
            </div>

            {/* You keep vs firm — honest split bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[11.5px] font-semibold mb-2">
                <span className="text-foreground/80">{t("youKeep")}</span>
                <span className="text-primary tabular-nums">100%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-foreground/[0.07]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="h-full rounded-full bg-[image:var(--ck-gold-gradient)]"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-foreground/40">
                <span>{t("firmEarns")}</span>
                <span className="tabular-nums">0%</span>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm text-foreground/50 leading-relaxed">
              {t("items.split.description")}
            </p>
            <motion.div variants={stagger} className="mt-5 flex flex-wrap gap-2">
              {splitChips.map((chip) => (
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
            index="01"
            icon="newspaper"
            title={t("items.news.title")}
            desc={t("items.news.description")}
            className="lg:col-span-2"
          />

          {/* Large — Competitive trading conditions, real spreads */}
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
                    {t("items.conditions.title")}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-mono text-foreground/40">
                    {t("rawSpreadsMT5")}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-foreground/50 leading-relaxed">
              {t("items.conditions.description")}
            </p>

            {/* Spread table — filled data encoding, honest values */}
            <div className="mt-5 space-y-3 flex-1" data-od-id="conditions-spreads">
              {SPREADS.map((s, i) => (
                <motion.div
                  key={s.symbol}
                  variants={fadeUp}
                  custom={0.15 + i * 0.08}
                  className="group"
                >
                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <span className="flex items-center gap-2 font-semibold text-foreground/85">
                      <span className="text-foreground/40 font-mono text-[10.5px] uppercase tracking-wider">
                        {s.type}
                      </span>
                      {s.symbol}
                    </span>
                    <span className="font-mono font-bold text-foreground tabular-nums">
                      {s.spread}
                      <span className="text-foreground/40 font-normal"> {t("pips")}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(6, Math.sqrt(s.pips / MAX_PIPS) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
                      className={`h-full rounded-full ${s.pips <= 0.3 ? "bg-[image:var(--ck-gold-gradient)]" : "bg-primary/50"}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Small — Reset & top-up */}
          <BentoCard
            index="02"
            icon="refresh-cw"
            title={t("items.reset.title")}
            desc={t("items.reset.description")}
            className="lg:col-span-2"
          />

          {/* Small — Flexible payouts */}
          <BentoCard
            index="03"
            icon="zap"
            title={t("items.flexible.title")}
            desc={t("items.flexible.description")}
            className="lg:col-span-3"
          />

          {/* Small — 24/7 support */}
          <BentoCard
            index="04"
            icon="headphones"
            title={t("items.support.title")}
            desc={t("items.support.description")}
            className="lg:col-span-3"
          />
        </motion.div>
      </Container>
    </section>
  );
}

function BentoCard({
  index,
  icon,
  title,
  desc,
  className,
}: {
  index: string;
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
      {/* Index + icon */}
      <div className="mb-4 flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
          {Icon && <Icon size={18} className="text-primary" />}
        </div>
        <span className="font-mono text-[11px] font-bold text-foreground/25 tabular-nums">
          {index}
        </span>
      </div>
      <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-foreground/50 leading-relaxed">{desc}</p>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#d4af37]/5 to-transparent" />
    </motion.div>
  );
}
