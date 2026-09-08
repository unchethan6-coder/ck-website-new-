"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Play, BarChart2, Coins, Zap } from "lucide-react";
import { LaptopMockup } from "@/components/fx/LaptopMockup";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative isolate overflow-hidden bg-[#030A1C] text-[#F8FAFC] pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20"
      data-od-id="hero"
    >
      {/* Background Aurora & Dots Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="fx-aurora-a absolute inset-0" />
        <div className="fx-aurora-b absolute inset-0" />
        <div className="fx-aurora-core absolute inset-0" />
        <div className="fx-aurora-dots absolute inset-0 opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Left Column: Copy & Actions */}
          <div className="relative z-10 lg:col-span-5 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full mb-3 sm:mb-4 px-3 py-1 bg-white/[0.04] border border-white/10"
            >
              <span className="h-2 w-2 rounded-full bg-[#894CEF] shadow-[0_0_8px_#894CEF]" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#999BA3]">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-[family-name:var(--font-inter-tight)] text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-black uppercase leading-[1.08] tracking-tight text-white"
            >
              {t("headlineLine1")}
              <br />
              <span className="text-white">{t("headlineLine2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-3.5 sm:mt-4 text-sm sm:text-base font-medium leading-relaxed text-[#999BA3] max-w-lg"
            >
              {t("subcopy")}
            </motion.p>

            {/* 3 Key Feature Chips */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3"
            >
              {/* Feature 1 */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#080E24]/80 pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 shadow-sm hover:border-[#894CEF]/40 hover:shadow-[0_0_16px_rgba(1,162,239,0.15)] transition-all duration-200 cursor-default"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#894CEF]/15 text-[#894CEF] group-hover:bg-[#894CEF] group-hover:text-black transition-colors duration-200">
                  <BarChart2 size={15} strokeWidth={2.5} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[11px] sm:text-[12px] font-extrabold text-white">
                    Up to 100%
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-medium text-[#999BA3]">
                    Profit Split
                  </span>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#080E24]/80 pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 shadow-sm hover:border-[#894CEF]/40 hover:shadow-[0_0_16px_rgba(1,162,239,0.15)] transition-all duration-200 cursor-default"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#894CEF]/15 text-[#894CEF] group-hover:bg-[#894CEF] group-hover:text-black transition-colors duration-200">
                  <Coins size={15} strokeWidth={2.5} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[11px] sm:text-[12px] font-extrabold text-white">
                    Up to $1.2M
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-medium text-[#999BA3]">
                    Funding Accounts
                  </span>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#080E24]/80 pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 shadow-sm hover:border-[#894CEF]/40 hover:shadow-[0_0_16px_rgba(1,162,239,0.15)] transition-all duration-200 cursor-default"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#894CEF]/15 text-[#894CEF] group-hover:bg-[#894CEF] group-hover:text-black transition-colors duration-200">
                  <Zap size={15} strokeWidth={2.5} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[11px] sm:text-[12px] font-extrabold text-white">
                    Flexible
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-medium text-[#999BA3]">
                    Payouts
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Standardized CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/#start-challenge"
                className="group inline-flex items-center justify-center gap-2 rounded-xl brand-gradient-btn px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 text-center shadow-lg hover:shadow-cyan-500/25"
              >
                <span>{t("startChallenge")}</span>
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <a
                href="#how-it-works"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm sm:text-base font-extrabold text-white hover:border-[#894CEF] hover:bg-white/[0.08] hover:text-white active:translate-y-0 active:scale-[0.98] transition-all duration-200 shadow-sm text-center"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80 text-white group-hover:border-[#894CEF] group-hover:bg-[#894CEF] group-hover:text-black transition-all duration-200 shrink-0">
                  <Play size={11} className="ml-0.5 fill-current" />
                </div>
                <span>{t("exploreObjectives")}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Laptop Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative isolate z-0 mt-8 sm:mt-10 lg:mt-0 flex w-full max-w-full justify-center lg:col-span-7 xl:col-span-7 lg:justify-end overflow-visible"
          >
            <LaptopMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
