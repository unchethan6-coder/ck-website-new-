"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TRUST_STATS } from "@/lib/content";

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  return <span>{target}{suffix}</span>;
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="border-y border-foreground/10 bg-foreground/[0.03] py-10 md:py-12"
      data-od-id="stats-strip"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-foreground/[0.06] gap-y-2 md:gap-y-0">
          {TRUST_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-3 sm:py-4 text-center"
            >
              <span className="font-[family-name:var(--font-inter-tight)] text-2xl md:text-3xl font-extrabold text-primary">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-foreground/45 leading-snug">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
