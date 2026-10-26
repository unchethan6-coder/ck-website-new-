"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { VIP_OFFER } from "@/lib/vipOffer";

/**
 * The VIP copy's offer panel, in place of the hero mascot: 90% OFF, the
 * account cap, and — only when a real count is available — how many of those
 * accounts are claimed. It polls /api/vip-slots so the count stays current.
 */

const POLL_MS = 60_000;
const nf = new Intl.NumberFormat("en-US");

export function VipOfferPanel() {
  const [claimed, setClaimed] = useState<number | null>(null);

  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const res = await fetch("/api/vip-slots", { cache: "no-store" });
        const data = await res.json();
        if (!stop) setClaimed(typeof data?.claimed === "number" ? data.claimed : null);
      } catch {
        /* keep the last real value; never invent one */
      }
    };
    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  const total = VIP_OFFER.slots;
  const left = claimed === null ? null : Math.max(total - claimed, 0);
  const pct = claimed === null ? 0 : Math.min(100, (claimed / total) * 100);
  const soldOut = left === 0;

  return (
    <div className="relative w-full max-w-[520px] py-6 lg:py-0" data-od-id="vip-offer-panel">
      <div aria-hidden className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[#8B3DFF]/25 blur-[90px]" />
      <div className="rounded-[2rem] bg-gradient-to-b from-[#F5C451]/70 via-[#A98BFF]/40 to-white/5 p-px shadow-[0_40px_120px_-30px_rgba(139,61,255,0.8)]">
        <div className="rounded-[calc(2rem-1px)] bg-[#070B1F]/95 px-6 py-8 text-center backdrop-blur-xl sm:px-10 sm:py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F5C451]/40 bg-[#F5C451]/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-[#F5C451] uppercase">
            <Lock size={12} aria-hidden /> VIP offer
          </p>

          <p className="mt-6 font-[family-name:var(--font-jakarta)] leading-[0.85] font-black tracking-[-0.04em]">
            <span className="block bg-gradient-to-b from-[#FFE7A3] via-[#F5C451] to-[#C98E1E] bg-clip-text text-[7rem] text-transparent drop-shadow-[0_10px_40px_rgba(245,196,81,0.35)] sm:text-[9rem]">
              {VIP_OFFER.discountPct}%
            </span>
            <span className="mt-2 block text-4xl text-white uppercase sm:text-5xl">Off</span>
          </p>
          <p className="mt-3 text-sm font-bold tracking-[0.18em] text-white/70 uppercase">All Challenges</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-white/85">Limited to {nf.format(total)} accounts</p>
              {left !== null && (
                <p className="text-sm font-bold text-[#F5C451] tabular-nums">{soldOut ? "All claimed" : `${nf.format(left)} left`}</p>
              )}
            </div>
            {claimed !== null && (
              <>
                <div
                  className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={claimed}
                  aria-label="Accounts claimed"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#894CEF] to-[#F5C451] transition-[width] duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-white/55 tabular-nums">
                  {nf.format(claimed)} of {nf.format(total)} claimed
                </p>
              </>
            )}
          </div>

          {!soldOut && (
            <a
              href="#start-challenge"
              className="brand-gradient-btn mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-6 text-base font-black tracking-wide text-[#1A1030] uppercase shadow-[0_14px_40px_-12px_rgba(245,196,81,0.65)] transition-transform hover:-translate-y-0.5"
            >
              Claim {VIP_OFFER.discountPct}% Off <ArrowRight size={18} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
