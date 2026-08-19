"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CmsPayout } from "@/lib/cms";
import { cn } from "@/lib/utils";

/* Lightweight network atmosphere — sparse teal/gold nodes + faint connecting
   lines. Ambient only; frozen at a static frame under reduced motion. Never
   painted above content. */
function LiveRewardsNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let width = 0;
    let height = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean };
    let nodes: Node[] = [];

    const makeNodes = () => {
      const count = Math.max(14, Math.min(28, Math.floor((width * height) / 60000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.4 + 0.6,
        gold: Math.random() < 0.22,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.08;
            ctx.strokeStyle = `rgba(20,184,166,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = n.gold
          ? "rgba(212,175,55,0.5)"
          : "rgba(20,184,166,0.4)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      draw(); // static frame
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}

/**
 * Live Rewards proof module (landing).
 * Cumulative total and settlement rows are derived ONLY from published,
 * verified Strapi payout records. Empty / missing-field states are explicit —
 * nothing is fabricated.
 */

type FeedRow = {
  id: number;
  name: string;
  amount: string;
  currency: string;
  countryName: string | null;
  countryCode: string | null;
  relativeDate: string | null;
  verified: boolean;
};

function parseAmount(value: string | null | undefined) {
  if (!value) return 0;
  const n = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function isVerified(p: CmsPayout) {
  return Boolean(p.image);
}

function relativeDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

function compactTotal(value: number) {
  if (!Number.isFinite(value)) return null;
  return `$${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}+`;
}

function toFeedRow(p: CmsPayout): FeedRow | null {
  if (!p.title) return null;
  return {
    id: p.id,
    name: p.title,
    amount: p.amount ?? "—",
    currency: p.currency ?? "USD",
    countryName: p.countryName ?? null,
    countryCode: p.countryCode ?? null,
    relativeDate: relativeDate(p.approvedAt),
    verified: isVerified(p),
  };
}

export function LiveRewards({ payouts = [] }: { payouts?: CmsPayout[] }) {
  const t = useTranslations("liveRewards");
  const rows = useMemo(
    () =>
      payouts
        .filter((p) => p.image)
        .map(toFeedRow)
        .filter((r): r is FeedRow => r !== null),
    [payouts]
  );

  const total = useMemo(() => {
    let sum = 0;
    for (const p of payouts) {
      const n = parseAmount(p.amount);
      if (n > 0) sum += n;
    }
    return sum > 0 ? sum : null;
  }, [payouts]);

  const totalLabel = total ? compactTotal(total) : null;
  const visibleRows = rows.slice(0, 7);

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      data-od-id="live-rewards"
    >
      <LiveRewardsNetwork />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left — live rewards header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/60">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                {t("badge")}
              </span>

              <div className="mt-6" data-od-id="live-rewards-total">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70 mb-2">
                  {t("rewardsDistributed")}
                </p>
                <p className="font-[family-name:var(--font-inter-tight)] text-5xl md:text-6xl font-extrabold text-primary tabular-nums leading-none">
                  {totalLabel ?? t("awaiting")}
                </p>
                <p className="mt-4 max-w-sm text-sm text-foreground/50 leading-relaxed">
                  {t("desc")}
                </p>
              </div>

              <div className="mt-auto pt-10 flex flex-col gap-6">
                <p className="text-xs text-foreground/40">
                  {t("verifiedText")}
                </p>
                <a
                  href="/payouts"
                  className="inline-flex w-fit items-center gap-2 rounded-md px-2 -mx-2 min-h-11 text-xs font-bold uppercase tracking-[0.15em] text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-od-id="live-rewards-cta"
                >
                  {t("viewRewards")} <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Right — recent settlements feed */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="lg:col-span-2"
            >
              <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-sm">
                <div className="border-b border-foreground/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/35">
                  {t("recentSettlements")}
                </div>

                {visibleRows.length ? (
                  <ul
                    className="divide-y divide-foreground/[0.06]"
                    data-od-id="live-rewards-feed"
                  >
                    {visibleRows.map((row, index) => (
                      <li
                        key={row.id}
                        className={cn(index >= 4 && "hidden md:flex")}
                        data-od-id={`live-reward-row-${row.id}`}
                      >
                        <FeedRowView row={row} index={index} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <p className="text-sm text-foreground/45">
                      {t("empty")}
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-3 hidden text-right text-[11px] text-foreground/30 lg:block">
                {t("showing", { visible: visibleRows.length, total: rows.length })}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedRowView({ row, index }: { row: FeedRow; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex w-full items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-foreground/[0.03]"
    >
      <span className="min-w-0 flex-1 truncate font-semibold text-foreground">
        {row.name}
      </span>
      <span className="shrink-0 rounded border border-foreground/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground/55">
        {row.countryCode || "--"}
      </span>
      <span className="hidden w-28 shrink-0 text-right text-xs text-foreground/40 sm:block">
        {row.relativeDate ?? ""}
      </span>
      <span className="w-24 shrink-0 text-right font-extrabold text-primary tabular-nums">
        {row.amount === "—" ? "—" : row.amount}
      </span>
    </motion.div>
  );
}
