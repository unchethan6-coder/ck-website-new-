"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Clock,
  Coins,
  CreditCard,
  DollarSign,
  Lock,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PayoutDashboardVisualProps {
  className?: string;
  compact?: boolean;
}

const PAYOUT_SCENARIOS = [
  {
    accountId: "CK-98241",
    accountTier: "$100K MASTER",
    profit: "$14,850.00",
    profitPct: "+14.85% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: true,
    method: "USDT / Crypto",
    methodSub: "TRC20 / ERC20",
    amount: "14,850.00",
    address: "TQn9Y2...98xKp (Verified)",
    settlementAmount: "$12,450.00",
    settlementTime: "processed in 4.2 hours",
    countryFlag: "🇬🇧",
    countryName: "United Kingdom",
    speedText: "12H Guaranteed",
  },
  {
    accountId: "CK-67104",
    accountTier: "$200K MASTER",
    profit: "$23,400.00",
    profitPct: "+11.70% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: false,
    method: "Bank Wire / Rise",
    methodSub: "Direct Wire Clearing",
    amount: "23,400.00",
    address: "GB82 BARC...4491 (Verified)",
    settlementAmount: "$18,920.00",
    settlementTime: "processed in 2.8 hours",
    countryFlag: "🇩🇪",
    countryName: "Germany",
    speedText: "Priority Fast-Track",
  },
  {
    accountId: "CK-41982",
    accountTier: "$50K MASTER",
    profit: "$6,890.00",
    profitPct: "+13.78% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: true,
    method: "USDC / Crypto",
    methodSub: "Solana / Arbitrum",
    amount: "6,890.00",
    address: "8FmQ8...3k9P (Verified)",
    settlementAmount: "$6,890.00",
    settlementTime: "processed in 1.5 hours",
    countryFlag: "🇦🇪",
    countryName: "United Arab Emirates",
    speedText: "Instant Auto-Release",
  },
  {
    accountId: "CK-11459",
    accountTier: "$100K MASTER",
    profit: "$11,200.00",
    profitPct: "+11.20% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: true,
    method: "USDT / Crypto",
    methodSub: "TRC20 Network",
    amount: "11,200.00",
    address: "TLv8P...92mZ (Verified)",
    settlementAmount: "$9,750.00",
    settlementTime: "processed in 3.1 hours",
    countryFlag: "🇺🇸",
    countryName: "United States",
    speedText: "12H Guaranteed",
  },
  {
    accountId: "CK-83021",
    accountTier: "$150K MASTER",
    profit: "$19,650.00",
    profitPct: "+13.10% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: false,
    method: "Direct Wire / Rise",
    methodSub: "Swift Clearing Node",
    amount: "19,650.00",
    address: "CH93 0076...8820 (Verified)",
    settlementAmount: "$15,300.00",
    settlementTime: "processed in 5.0 hours",
    countryFlag: "🇸🇬",
    countryName: "Singapore",
    speedText: "Priority Settlement",
  },
  {
    accountId: "CK-55230",
    accountTier: "$100K MASTER",
    profit: "$8,940.00",
    profitPct: "+8.94% Profit",
    splitRate: "100% Payout Rate",
    isCrypto: true,
    method: "USDT / Crypto",
    methodSub: "TRC20 Network",
    amount: "8,940.00",
    address: "TXw4K...11nL (Verified)",
    settlementAmount: "$8,940.00",
    settlementTime: "processed in 2.1 hours",
    countryFlag: "🇦🇺",
    countryName: "Australia",
    speedText: "12H Guaranteed",
  },
];

export function PayoutDashboardVisual({
  className,
  compact = false,
}: PayoutDashboardVisualProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAYOUT_SCENARIOS.length);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  const current = PAYOUT_SCENARIOS[index];

  return (
    <div
      className={cn("relative w-full select-none", className)}
      data-od-id="hero-payout-dashboard"
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
              <span>app.ckcapital.co.uk/dashboard/payouts</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live Settlement Feed
            </span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-5 sm:p-6 lg:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.accountId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* Header Account Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{current.countryFlag}</span>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                      Simulated Account #{current.accountId}
                    </p>
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                      {current.accountTier}
                    </span>
                  </div>
                  <p className="mt-1 font-[family-name:var(--font-inter-tight)] text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {current.profit}{" "}
                    <span className="text-xs font-semibold text-emerald-400">
                      {current.profitPct}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-3.5 py-2">
                  <Sparkles size={15} className="text-primary shrink-0" />
                  <div className="text-left">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-primary">
                      Profit Split
                    </p>
                    <p className="text-sm font-extrabold text-foreground">
                      {current.splitRate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payout Request Main Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/75">
                      Request Payout
                    </p>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground/45">
                    <Clock size={12} className="text-primary" /> ~12 Hours Processing
                  </span>
                </div>

                {/* Payout Methods Selector */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Crypto Option */}
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-xl p-3 text-left transition-all",
                      current.isCrypto
                        ? "border border-primary/50 bg-primary/10"
                        : "border border-white/10 bg-white/[0.02] opacity-70"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          current.isCrypto
                            ? "bg-primary/20 text-primary"
                            : "bg-white/10 text-foreground/70"
                        )}
                      >
                        <Coins size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {current.isCrypto ? current.method : "USDT / Crypto"}
                        </p>
                        <p className="text-[10px] text-foreground/50">
                          {current.isCrypto ? current.methodSub : "TRC20 / ERC20"}
                        </p>
                      </div>
                    </div>
                    {current.isCrypto ? (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-black">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-white/20" />
                    )}
                  </div>

                  {/* Bank Option */}
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-xl p-3 text-left transition-all",
                      !current.isCrypto
                        ? "border border-primary/50 bg-primary/10"
                        : "border border-white/10 bg-white/[0.02] opacity-70"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          !current.isCrypto
                            ? "bg-primary/20 text-primary"
                            : "bg-white/10 text-foreground/70"
                        )}
                      >
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {!current.isCrypto ? current.method : "Bank Transfer"}
                        </p>
                        <p className="text-[10px] text-foreground/50">
                          {!current.isCrypto ? current.methodSub : "Direct Wire / Rise"}
                        </p>
                      </div>
                    </div>
                    {!current.isCrypto ? (
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-black">
                        <Check size={10} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-white/20" />
                    )}
                  </div>
                </div>

                {/* Payout Amount Field Mock */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-foreground/50">
                    <span>Amount to Withdraw</span>
                    <span className="font-semibold text-foreground/70">
                      Available: {current.profit}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-primary font-bold" />
                      <span className="font-mono text-xl sm:text-2xl font-extrabold text-foreground">
                        {current.amount}
                      </span>
                      <span className="text-xs font-bold text-foreground/40">USD</span>
                    </div>
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                      MAX
                    </span>
                  </div>
                </div>

                {/* Wallet Address Field Mock */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="font-mono text-[11px]">
                      {current.address}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Auto-Confirmed
                  </span>
                </div>

                {/* Submit CTA Button Mock */}
                <div className="relative pt-1">
                  <a
                    href="https://app.ckcapital.co.uk/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-standard group relative flex w-full items-center justify-center gap-2 py-3.5 text-xs sm:text-sm"
                  >
                    <Zap size={16} className="fill-black" />
                    <span>Submit Payout Request</span>
                    <span className="ml-1 rounded bg-black/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                      {current.speedText}
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Recent Settlements Activity Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-3 text-[11px] text-foreground/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.settlementAmount}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span className="font-semibold text-foreground/75">
                Latest settlement:
              </span>
              <span className="text-foreground/90 font-bold">
                {current.settlementAmount}
              </span>
              <span className="text-foreground/40 hidden sm:inline">
                {current.settlementTime}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
              100% PROFIT RETAINED
            </span>
          </div>
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
              <Zap size={20} className="fill-primary text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                Speed Guarantee
              </p>
              <p className="font-[family-name:var(--font-inter-tight)] text-sm sm:text-base font-extrabold text-foreground">
                Average 12-Hour Settlement
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

