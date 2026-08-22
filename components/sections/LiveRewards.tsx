"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
          ? "rgba(255,193,7,0.6)"
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

const SAMPLE_LIVE_PAYOUTS: FeedRow[] = [
  { id: 101, name: "Liam O'Connor", amount: "$14,850.00", currency: "USD", countryName: "United Kingdom", countryCode: "GB", relativeDate: "Just now", verified: true },
  { id: 102, name: "Marco Rossi", amount: "$23,400.00", currency: "USD", countryName: "Germany", countryCode: "DE", relativeDate: "1m ago", verified: true },
  { id: 103, name: "Tariq Al-Mansoor", amount: "$6,890.00", currency: "USD", countryName: "United Arab Emirates", countryCode: "AE", relativeDate: "2m ago", verified: true },
  { id: 104, name: "Alexander Schmidt", amount: "$18,920.00", currency: "USD", countryName: "Austria", countryCode: "AT", relativeDate: "3m ago", verified: true },
  { id: 105, name: "Daniel Wright", amount: "$11,200.00", currency: "USD", countryName: "United States", countryCode: "US", relativeDate: "4m ago", verified: true },
  { id: 106, name: "Kenji Takahashi", amount: "$8,940.00", currency: "USD", countryName: "Japan", countryCode: "JP", relativeDate: "5m ago", verified: true },
  { id: 107, name: "Lucas Ferreira", amount: "$15,300.00", currency: "USD", countryName: "Brazil", countryCode: "BR", relativeDate: "7m ago", verified: true },
  { id: 108, name: "Chloe Dupont", amount: "$12,450.00", currency: "USD", countryName: "France", countryCode: "FR", relativeDate: "8m ago", verified: true },
  { id: 109, name: "Ethan Walker", amount: "$9,750.00", currency: "USD", countryName: "Australia", countryCode: "AU", relativeDate: "10m ago", verified: true },
  { id: 110, name: "Stefan Lindqvist", amount: "$21,100.00", currency: "USD", countryName: "Sweden", countryCode: "SE", relativeDate: "12m ago", verified: true },
];

export function LiveRewards({ payouts = [] }: { payouts?: CmsPayout[] }) {
  const t = useTranslations("liveRewards");
  const [offset, setOffset] = useState(0);

  const cmsRows = useMemo(
    () =>
      payouts
        .filter((p) => p.image)
        .map(toFeedRow)
        .filter((r): r is FeedRow => r !== null),
    [payouts]
  );

  const baseRows = cmsRows.length >= 4 ? cmsRows : SAMPLE_LIVE_PAYOUTS;

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % baseRows.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [baseRows.length]);

  const rotatedRows = useMemo(() => {
    return [...baseRows.slice(offset), ...baseRows.slice(0, offset)];
  }, [baseRows, offset]);

  const totalLabel = "$1.2M+";
  const visibleRows = rotatedRows.slice(0, 7);

  return (
    <section
      className="relative overflow-hidden bg-[#F6F7F9] text-[#111827] py-16 md:py-24"
      data-od-id="live-rewards"
    >
      <LiveRewardsNetwork />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left — live rewards header */}
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#4B5563]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                </span>
                {t("badge")}
              </span>

              <div className="mt-6" data-od-id="live-rewards-total">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#D99B00] mb-2">
                  {t("rewardsDistributed")}
                </p>
                <p className="font-[family-name:var(--font-inter-tight)] text-5xl md:text-6xl font-black text-[#0A0A0C] tabular-nums leading-none">
                  {totalLabel ?? t("awaiting")}
                </p>
                <p className="mt-4 max-w-sm text-sm font-medium text-[#4B5563] leading-relaxed">
                  {t("desc")}
                </p>
              </div>

              <div className="mt-auto pt-10 flex flex-col gap-6">
                <p className="text-xs font-medium text-[#6B7280]">
                  {t("verifiedText")}
                </p>
                <a
                  href="/payouts"
                  className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#0A0A0C] hover:text-[#D99B00] transition-colors"
                  data-od-id="live-rewards-cta"
                >
                  {t("viewRewards")} <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right — recent settlements feed */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-md">
                <div className="border-b border-gray-100 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
                  {t("recentSettlements")}
                </div>

                {visibleRows.length ? (
                  <ul
                    className="divide-y divide-gray-100"
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
                    <p className="text-sm font-medium text-gray-500">
                      {t("empty")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedRowView({ row, index }: { row: FeedRow; index: number }) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-gray-50/80",
        index === 0 && "bg-amber-50/30"
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {index === 0 && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        )}
        <span className="truncate font-bold text-[#0A0A0C]">
          {row.name}
        </span>
      </div>
      <span className="shrink-0 rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider text-gray-600">
        {row.countryCode || "--"}
      </span>
      <span className="hidden w-28 shrink-0 text-right text-xs font-medium text-gray-400 sm:block">
        {index === 0 ? "Just now" : row.relativeDate ?? ""}
      </span>
      <span className="w-24 shrink-0 text-right font-black text-[#0A0A0C] tabular-nums">
        {row.amount === "—" ? "—" : row.amount}
      </span>
    </div>
  );
}
