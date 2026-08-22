"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Lock,
  Percent,
  ShieldCheck,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ObjectivesHUDVisualProps {
  className?: string;
  compact?: boolean;
}

export function ObjectivesHUDVisual({
  className,
  compact = false,
}: ObjectivesHUDVisualProps) {
  return (
    <div
      className={cn("relative w-full select-none", className)}
      data-od-id="hero-objectives-hud"
    >
      {/* Main Dashboard Window Container */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#12100A] shadow-2xl">
        {/* Top Browser / App Window Chrome */}
        <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <div className="ml-3 hidden sm:flex items-center gap-1.5 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-mono text-foreground/45">
              <Lock size={10} className="text-primary" />
              <span>app.ckcapital.co.uk/matrix/risk-engine</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Objectives Met (6/6)
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 sm:p-6 lg:p-7">
          {/* Header Account Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                  Objectives HUD #CK-RULES
                </p>
                <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                  100% COMPLIANT
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Zero Hidden Rules{" "}
                <span className="text-xs font-semibold text-emerald-400">
                  Fully Transparent
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2">
              <ShieldCheck size={15} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary">
                  Risk Status
                </p>
                <p className="text-sm font-extrabold text-emerald-400">
                  Safe · Unlocked
                </p>
              </div>
            </div>
          </div>

          {/* Objectives Grid */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/75">
                Core Trading Parameters
              </p>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground/45">
                <Activity size={12} className="text-primary" /> Live Compliance Sync
              </span>
            </div>

            {/* Rules Matrix 2x3 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {/* Rule 1 */}
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">Profit Target</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">8% / 5%</p>
                <p className="text-[9px] text-emerald-400 font-semibold">Target Passed</p>
              </div>

              {/* Rule 2 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">Daily Loss</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">5% Max</p>
                <p className="text-[9px] text-foreground/40 font-semibold">0.8% Utilized</p>
              </div>

              {/* Rule 3 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">Max Drawdown</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">10% Max</p>
                <p className="text-[9px] text-foreground/40 font-semibold">Static Shield</p>
              </div>

              {/* Rule 4 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">Min Trading Days</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">0 Days</p>
                <p className="text-[9px] text-primary font-semibold">Pass in 1 Day</p>
              </div>

              {/* Rule 5 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">News Trading</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">Allowed</p>
                <p className="text-[9px] text-foreground/40 font-semibold">No Restrictions</p>
              </div>

              {/* Rule 6 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-foreground/50">Weekend Holds</span>
                  <Check size={12} className="text-emerald-400 stroke-[3]" />
                </div>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">Allowed</p>
                <p className="text-[9px] text-foreground/40 font-semibold">Crypto &amp; FX</p>
              </div>
            </div>

            {/* Compliance Verified Banner */}
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2.5 text-xs">
              <div className="flex items-center gap-2 text-foreground/80">
                <ShieldCheck size={15} className="text-primary shrink-0" />
                <span className="text-[11px] font-semibold">Real-Time Risk Engine Active · Zero IP or Strategy Bans</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Recent Settlement Activity Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-3 text-[11px] text-foreground/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            <span className="font-semibold text-foreground/75">
              Trading Objective Standard:
            </span>
            <span className="text-foreground/90 font-bold">100% Rules Clarity</span>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
            NO TRICK CLAUSES
          </span>
        </div>
      </div>

      {/* Floating Decorative Total Rewards Badge */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -bottom-5 left-2 sm:-bottom-8 sm:-left-6 z-20"
        >
          <div className="flex items-center gap-3.5 rounded-2xl border border-primary/30 bg-[#0D0C08] px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/30">
              <Sliders size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                Objective Model
              </p>
              <p className="font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-extrabold text-foreground">
                Built For Serious Traders
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
