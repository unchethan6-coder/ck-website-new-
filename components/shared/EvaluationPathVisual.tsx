"use client";

import { motion } from "framer-motion";
import {
  Award,
  Check,
  CheckCircle2,
  Compass,
  Gauge,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationPathVisualProps {
  className?: string;
  compact?: boolean;
}

export function EvaluationPathVisual({
  className,
  compact = false,
}: EvaluationPathVisualProps) {
  return (
    <div
      className={cn("relative w-full select-none", className)}
      data-od-id="hero-evaluation-path"
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
              <span>app.ckcapital.co.uk/evaluation/phase-1</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Target size={11} className="text-primary" />
              Phase 1 · 80% Complete
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
                  Evaluation Account #CK-EVAL100
                </p>
                <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                  $100K 2-STEP
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                +$6,400.00{" "}
                <span className="text-xs font-semibold text-emerald-400">
                  of $8,000 Target
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2">
              <Trophy size={15} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary">
                  Funded Goal
                </p>
                <p className="text-sm font-extrabold text-foreground">
                  $100,000 Live
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar & Phase Stepper */}
          <div className="mt-5 space-y-4">
            {/* Live Progress Bar */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground/80">Phase 1 Target Progress</span>
                <span className="font-mono font-bold text-primary">80.0% ($6,400 / $8,000)</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary w-[80%] shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-foreground/45">
                <span>Start: $100,000</span>
                <span>Remaining: $1,600 to Pass</span>
              </div>
            </div>

            {/* Stepped Phases Matrix */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {/* Phase 1 */}
              <div className="rounded-xl border border-primary/40 bg-primary/10 p-3 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-primary" />
                <p className="text-[9.5px] font-bold uppercase text-primary">Phase 1</p>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">8% Goal</p>
                <span className="mt-1.5 inline-block rounded bg-primary/20 px-1.5 py-0.5 text-[8.5px] font-bold text-primary">
                  IN PROGRESS
                </span>
              </div>

              {/* Phase 2 */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center relative overflow-hidden opacity-85">
                <p className="text-[9.5px] font-bold uppercase text-foreground/50">Phase 2</p>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground/80">5% Goal</p>
                <span className="mt-1.5 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[8.5px] font-medium text-foreground/50">
                  NEXT STEP
                </span>
              </div>

              {/* Funded Master */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-3 text-center relative overflow-hidden">
                <p className="text-[9.5px] font-bold uppercase text-emerald-400">Master Trader</p>
                <p className="mt-1 font-mono text-sm font-extrabold text-foreground">100% Split</p>
                <span className="mt-1.5 inline-block rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-400">
                  REWARD
                </span>
              </div>
            </div>

            {/* Safety Metrics Shield HUD */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between text-[11px] text-foreground/50">
                  <span>Daily Loss Meter</span>
                  <span className="text-emerald-400 font-bold">1.2% / 5% Max</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[24%]" />
                </div>
                <p className="mt-1 text-[9.5px] text-foreground/40">Healthy safety cushion</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left">
                <div className="flex items-center justify-between text-[11px] text-foreground/50">
                  <span>Max Drawdown</span>
                  <span className="text-emerald-400 font-bold">2.1% / 10% Max</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[21%]" />
                </div>
                <p className="mt-1 text-[9.5px] text-foreground/40">Static drawdown protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Recent Settlement Activity Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-3 text-[11px] text-foreground/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            <span className="font-semibold text-foreground/75">
              Trading Time Limit:
            </span>
            <span className="text-foreground/90 font-bold">Unlimited Days</span>
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
            PASS AT YOUR PACE
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
              <Award size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                Evaluation Pathway
              </p>
              <p className="font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-extrabold text-foreground">
                No Minimum or Max Days
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
