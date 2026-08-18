"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CountUp } from "@/components/fx/CountUp";

export function StatsStrip() {
  const t = useTranslations("stats");

  const stats = [
    { value: "12H", label: t("payoutTime") },
    { value: "100%", label: t("rewardSplit") },
    { value: "$100K", label: t("accountSize") },
    { value: "24/7", label: t("support") },
  ];

  return (
    <section
      className="py-10 md:py-12"
      data-od-id="stats-strip"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-foreground/[0.06] gap-y-2 md:gap-y-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-3 sm:py-4 text-center"
            >
              <CountUp
                value={stat.value}
                className="font-[family-name:var(--font-inter-tight)] text-2xl md:text-3xl font-extrabold text-primary tabular-nums"
              />
              <span className="text-[11px] sm:text-xs text-foreground/45 leading-snug">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
