"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart2,
  Wallet,
  Users,
  Download,
  User,
  HelpCircle,
  Check,
  ChevronDown,
} from "lucide-react";

export function LaptopMockup() {
  // Live Trading Simulation State
  const [liveData, setLiveData] = useState({
    balance: 52845.0,
    profit: 5214.75,
    equity: 58059.75,
    balancePercent: 7.28,
    profitPercent: 12.43,
    totalTrades: 128,
    winRate: 67.2,
    lastTrade: 1214.75,
    lastY: 48,
    isUpTick: true,
  });

  useEffect(() => {
    // Start live trading simulation after line draw entrance completes
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setLiveData((prev) => {
          // Generate a realistic tick change
          const isUp = Math.random() > 0.35; // 65% upward drift
          const delta = isUp
            ? Math.round((Math.random() * 85 + 15) * 100) / 100
            : -Math.round((Math.random() * 45 + 10) * 100) / 100;

          const newBalance = Math.round((prev.balance + delta) * 100) / 100;
          const newProfit = Math.round((prev.profit + delta) * 100) / 100;
          const newEquity = Math.round((prev.equity + delta) * 100) / 100;

          const newBalancePct = (
            ((newBalance - 50000) / 50000) *
            100
          ).toFixed(2);
          const newProfitPct = (((newProfit - 4500) / 4500) * 100).toFixed(2);

          // Map delta to chart Y coordinate (inverted: higher balance = lower Y in SVG)
          const yShift = (delta / 85) * -3;
          const newY = Math.max(36, Math.min(58, prev.lastY + yShift));

          // Occasionally add a completed trade
          const tradeIncrement = Math.random() > 0.85 ? 1 : 0;

          return {
            balance: newBalance,
            profit: newProfit,
            equity: newEquity,
            balancePercent: parseFloat(newBalancePct),
            profitPercent: parseFloat(newProfitPct),
            totalTrades: prev.totalTrades + tradeIncrement,
            winRate: prev.winRate,
            lastTrade: isUp && delta > 50 ? delta * 12 : prev.lastTrade,
            lastY: newY,
            isUpTick: isUp,
          };
        });
      }, 1800);

      return () => clearInterval(interval);
    }, 1800);

    return () => clearTimeout(startTimer);
  }, []);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);

  return (
    <div
      className="relative w-full max-w-[800px] select-none"
      style={{ perspective: "1100px" }}
    >
      {/* Static Ground Shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-[2%] h-16 w-[96%] rounded-full bg-black/50 blur-2xl"
      />

      {/* 3D Perspective Wrapper - Static 3/4 Side View Angle */}
      <div
        className="preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          transform: "rotateY(-22deg) rotateX(9deg) rotateZ(-1.5deg)",
        }}
      >
        {/* Laptop Display Chassis */}
        <div className="relative overflow-hidden rounded-[20px] border-[11px] border-[#18181B] bg-[#09090B] shadow-[0_40px_120px_rgba(0,0,0,0.8),0_10px_40px_rgba(255,193,7,0.14)]">
          {/* Top Bezel Camera Dot */}
          <div className="absolute left-1/2 top-1.5 -translate-x-1/2 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>

          {/* Screen Content - Dashboard UI */}
          <div className="mt-2.5 flex h-[440px] w-full text-white">
            {/* Sidebar */}
            <aside className="flex w-[148px] shrink-0 flex-col justify-between border-r border-white/[0.07] bg-[#0D0D10] p-3">
              <div>
                {/* Logo */}
                <div className="mb-4 flex items-center gap-1.5 px-1">
                  <div className="flex items-center text-[#FFC107]">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFC107"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="11 18 5 12 11 6" />
                      <polyline points="19 18 13 12 19 6" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black tracking-wider text-white">
                    CK CAPITAL
                  </span>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 rounded-lg bg-[#FFC107] px-2.5 py-1.5 font-black text-black shadow-sm">
                    <LayoutDashboard size={13} />
                    <span>Overview</span>
                  </div>
                  {[
                    { icon: TrendingUp, label: "Trading" },
                    { icon: BarChart2, label: "Statistics" },
                    { icon: Wallet, label: "Payouts" },
                    { icon: Users, label: "Partners" },
                    { icon: Download, label: "Downloads" },
                    { icon: User, label: "Profile" },
                    { icon: HelpCircle, label: "Help Center" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-white/55 transition-colors hover:text-white"
                    >
                      <item.icon size={13} />
                      <span className="text-[10.5px]">{item.label}</span>
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content View */}
            <main className="flex flex-1 flex-col overflow-hidden bg-[#0A0A0C] p-3.5">
              {/* Top 4 Metrics Cards with Live Ticking Numbers */}
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {/* Account Balance */}
                <div className="rounded-lg border border-white/[0.06] bg-[#121216] p-2">
                  <span className="text-[9px] text-white/50 block">Account Balance</span>
                  <div className="text-[12px] font-bold text-white mt-0.5 tabular-nums transition-colors duration-300">
                    {formatCurrency(liveData.balance)}
                  </div>
                  <span
                    className={`text-[8px] font-semibold tabular-nums transition-colors ${
                      liveData.balancePercent >= 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {liveData.balancePercent >= 0 ? "+" : ""}
                    {liveData.balancePercent}%
                  </span>
                </div>

                {/* Profit */}
                <div className="rounded-lg border border-white/[0.06] bg-[#121216] p-2">
                  <span className="text-[9px] text-white/50 block">Profit</span>
                  <div className="text-[12px] font-bold text-white mt-0.5 tabular-nums transition-colors duration-300">
                    {formatCurrency(liveData.profit)}
                  </div>
                  <span
                    className={`text-[8px] font-semibold tabular-nums transition-colors ${
                      liveData.profitPercent >= 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {liveData.profitPercent >= 0 ? "+" : ""}
                    {liveData.profitPercent}%
                  </span>
                </div>

                {/* Equity */}
                <div className="rounded-lg border border-white/[0.06] bg-[#121216] p-2">
                  <span className="text-[9px] text-white/50 block">Equity</span>
                  <div className="text-[12px] font-bold text-white mt-0.5 tabular-nums transition-colors duration-300">
                    {formatCurrency(liveData.equity)}
                  </div>
                </div>

                {/* Profit Split */}
                <div className="rounded-lg border border-white/[0.06] bg-[#121216] p-2">
                  <span className="text-[9px] text-white/50 block">Profit Split</span>
                  <div className="text-[12px] font-bold text-white mt-0.5">100%</div>
                  <span className="text-[8px] text-white/45">Your Share</span>
                </div>
              </div>

              {/* Middle Section: Live Chart & Trading Objectives */}
              <div className="grid grid-cols-12 gap-2 flex-1 min-h-0 mb-2.5">
                {/* Account Growth Chart (8 cols) */}
                <div className="col-span-8 flex flex-col rounded-lg border border-white/[0.06] bg-[#121216] p-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-white">Account Growth</span>
                    <span className="flex items-center gap-1 text-[8.5px] text-white/60 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/5">
                      Last 30 Days <ChevronDown size={9} />
                    </span>
                  </div>

                  <div className="relative flex-1 w-full">
                    {/* SVG Chart */}
                    <svg
                      viewBox="0 0 320 120"
                      className="h-full w-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFC107" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#FFC107" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="320" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                      {/* Animated Area Fill */}
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        d={`M 0 95 C 30 92, 50 82, 70 85 C 90 88, 110 72, 130 68 C 150 64, 170 78, 190 70 C 210 62, 230 65, 250 ${liveData.lastY} C 270 52, 290 38, 320 32 L 320 120 L 0 120 Z`}
                        fill="url(#chartGradient)"
                      />

                      {/* Smooth Animated Line Draw */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        d={`M 0 95 C 30 92, 50 82, 70 85 C 90 88, 110 72, 130 68 C 150 64, 170 78, 190 70 C 210 62, 230 65, 250 ${liveData.lastY} C 270 52, 290 38, 320 32`}
                        fill="none"
                        stroke="#FFC107"
                        strokeWidth="2.2"
                      />

                      {/* Tooltip marker vertical line */}
                      <line
                        x1="250"
                        y1="20"
                        x2="250"
                        y2="110"
                        stroke="#FFC107"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        opacity="0.6"
                      />

                      {/* Solid Clean Apex Circle (No shooting ping) */}
                      <circle
                        cx="250"
                        cy={liveData.lastY}
                        r="3.5"
                        fill="#FFC107"
                        stroke="#000"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    </svg>

                    {/* Live Tooltip Card tracking live market value */}
                    <div className="absolute top-1 right-10 rounded border border-[#FFC107]/40 bg-[#1A1A20] px-2 py-1 shadow-lg text-center transition-all duration-300">
                      <div className="text-[9px] font-bold text-[#FFC107] tabular-nums">
                        {formatCurrency(liveData.balance)}
                      </div>
                      <div className="text-[7.5px] text-white/50">May 14</div>
                    </div>
                  </div>

                  {/* Date labels */}
                  <div className="flex justify-between text-[7.5px] text-white/40 pt-1">
                    <span>Apr 16</span>
                    <span>Apr 23</span>
                    <span>Apr 30</span>
                    <span>May 7</span>
                    <span>May 14</span>
                  </div>
                </div>

                {/* Trading Objectives (4 cols) */}
                <div className="col-span-4 flex flex-col justify-start rounded-lg border border-white/[0.06] bg-[#121216] p-2.5">
                  <div className="text-[10px] font-bold text-white mb-2">Trading Objectives</div>

                  <div className="space-y-2.5 text-[8.5px]">
                    <div>
                      <div className="flex items-center justify-between text-white/80 mb-0.5">
                        <span>Profit Target</span>
                        <span className="flex items-center gap-0.5 text-white font-bold">
                          $10,000 <Check size={9} className="text-emerald-400" />
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#FFC107]"
                        />
                      </div>
                      <span className="text-[7px] text-white/40 text-right block mt-0.5">$10,000 (100%)</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-white/80 mb-0.5">
                        <span>Max Daily Loss</span>
                        <span className="flex items-center gap-0.5 text-white font-bold">
                          $2,500 <Check size={9} className="text-emerald-400" />
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "49%" }}
                          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#FFC107]"
                        />
                      </div>
                      <span className="text-[7px] text-white/40 text-right block mt-0.5">$1,240 (49%)</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-white/80 mb-0.5">
                        <span>Max Loss</span>
                        <span className="flex items-center gap-0.5 text-white font-bold">
                          $5,000 <Check size={9} className="text-emerald-400" />
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "63%" }}
                          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
                          className="h-full rounded-full bg-[#FFC107]"
                        />
                      </div>
                      <span className="text-[7px] text-white/40 text-right block mt-0.5">$3,180 (63%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Summary Metrics Row */}
              <div className="grid grid-cols-4 gap-2 border-t border-white/[0.06] pt-2 text-[9px]">
                <div>
                  <span className="text-white/40 block text-[7.5px]">Total Trades</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">
                    {liveData.totalTrades}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[7.5px]">Win Rate</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">
                    {liveData.winRate}%
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[7.5px]">Best Trade</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">
                    {formatCurrency(liveData.lastTrade)}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block text-[7.5px]">Avg. R:R</span>
                  <span className="text-[11px] font-bold text-white">1.82</span>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Laptop Bottom Aluminum Base & Keyboard Deck Lip */}
        <div className="relative -mt-1 mx-auto h-3.5 w-[105%] -translate-x-[2.5%] rounded-b-xl border-t border-white/20 bg-[#1E1E22] shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          {/* Center Thumb Notch */}
          <div className="mx-auto h-1.5 w-16 rounded-b-md bg-[#0F0F12]" />
        </div>
      </div>
    </div>
  );
}
