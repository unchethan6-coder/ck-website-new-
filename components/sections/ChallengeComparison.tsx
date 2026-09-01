"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown, Check, Percent } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  CURRENCIES,
  FUNDING_CHALLENGE_TYPES,
  FUNDING_PLAN_RAW_DATA,
  type CurrencyOption,
  type FundingChallengeTypeItem,
  type PlanDetails,
} from "@/lib/content";
import type { ChallengeConfig } from "@/lib/cms";
import { cn } from "@/lib/utils";

const accountSizes = ["5K", "10K", "25K", "50K", "100K", "200K", "300K"];

export function ChallengeComparison({
  config,
}: {
  config?: ChallengeConfig | null;
}) {
  const t = useTranslations("challenge");

  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("standard");
  const [selectedSize, setSelectedSize] = useState<string>("100K");
  const [isPercentage, setIsPercentage] = useState<boolean>(false);

  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync URL search params on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const rawType = searchParams.get("type") || searchParams.get("plan");
    if (rawType) {
      const normalizedType = rawType === "one-step" ? "1step" : rawType;
      if (["standard", "1step", "instant", "middleweight"].includes(normalizedType)) {
        setSelectedType(normalizedType);
      }
    }

    const rawSize = searchParams.get("size");
    if (rawSize) {
      const cleanSize = rawSize.replace("$", "").toUpperCase();
      if (accountSizes.includes(cleanSize)) {
        setSelectedSize(cleanSize);
      }
    }

    const rawCurrency = searchParams.get("currency");
    if (rawCurrency) {
      const upperCur = rawCurrency.toUpperCase();
      if (CURRENCIES.some((c) => c.code === upperCur)) {
        setSelectedCurrency(upperCur);
      }
    }
  }, []);

  // Data matrix from CMS or static fallback
  const rawData: Record<string, Record<string, PlanDetails | null>> = useMemo(() => {
    return config?.fundingPlans ?? FUNDING_PLAN_RAW_DATA;
  }, [config]);

  const currencies: CurrencyOption[] = useMemo(() => {
    return config?.currencies ?? CURRENCIES;
  }, [config]);

  const challengeTypes: FundingChallengeTypeItem[] = FUNDING_CHALLENGE_TYPES;

  const activePlan = useMemo(() => {
    return rawData[selectedSize]?.[selectedType] || null;
  }, [rawData, selectedSize, selectedType]);

  const activeTypeName = useMemo(() => {
    return challengeTypes.find((tItem) => tItem.id === selectedType)?.name || "";
  }, [challengeTypes, selectedType]);

  const currency = useMemo(() => {
    return currencies.find((item) => item.code === selectedCurrency) ?? currencies[0];
  }, [currencies, selectedCurrency]);

  const formatMoney = (valStr?: string) => {
    if (!valStr || !valStr.startsWith("$")) return valStr || "-";
    const amount = parseFloat(valStr.replace(/[$,]/g, "")) * currency.rate;
    return `${currency.symbol}${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatValue = (valStr?: string) => {
    if (!valStr) return "-";
    if (!isPercentage || !valStr.startsWith("$")) return valStr;
    const numericVal = parseFloat(valStr.replace(/[$,]/g, ""));
    if (numericVal === 0) return "0%";
    const total = parseInt(selectedSize.replace("K", ""), 10) * 1000;
    const pct = ((numericVal / total) * 100).toFixed(1).replace(/\.0$/, "");
    return `${pct}%`;
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    if (!rawData[selectedSize]?.[typeId]) {
      setSelectedSize("100K");
    }
  };

  const signupUrl = useMemo(() => {
    const params = new URLSearchParams({
      plan: selectedType,
      size: selectedSize,
      currency: selectedCurrency,
    });
    return `https://app.ckcapital.co.uk/signup?${params.toString()}`;
  }, [selectedType, selectedSize, selectedCurrency]);

  return (
    <section
      id="start-challenge"
      className="relative scroll-mt-28 bg-white py-16 text-[#0A0A0C] md:py-24"
      data-od-id="challenge-comparison"
    >
      <Container>
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Header */}
          <SectionReveal className="text-center">
            <h2
              data-od-id="challenge-title"
              className="font-[family-name:var(--font-inter-tight)] text-3xl sm:text-4xl md:text-[46px] lg:text-[48px] font-bold md:leading-[1.15] tracking-tight text-[#0A0A0C] not-italic"
            >
              {t("title") || "Choose your next challenge"}
            </h2>
            <p className="mt-2 text-sm md:text-base font-normal text-gray-500 max-w-xl mx-auto">
              {t("subtitle") || "Select your preferred account size and evaluation model to begin."}
            </p>
          </SectionReveal>

          {/* Currency Toolbar */}
          <SectionReveal delay={0.06}>
            <div className="flex justify-end items-center">
              {/* Currency Dropdown */}
              <div className="relative z-30" ref={currencyDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCurrencyOpen((open) => !open)}
                  aria-expanded={isCurrencyOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-4 py-2 text-sm font-bold text-[#0A0A0C] shadow-sm transition-all hover:border-[#E0B341]"
                >
                  <span aria-hidden="true" className="text-base leading-none">{currency.flag}</span>
                  <span>{currency.code}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-500 transition-transform duration-200",
                      isCurrencyOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                {isCurrencyOpen && (
                  <div
                    role="listbox"
                    aria-label="Choose currency"
                    className="absolute right-0 top-full mt-2 min-w-40 overflow-hidden rounded-xl border border-[#D9D9D9] bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.16)] animate-in fade-in zoom-in-95 duration-150"
                  >
                    {currencies.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        role="option"
                        aria-selected={selectedCurrency === item.code}
                        onClick={() => {
                          setSelectedCurrency(item.code);
                          setIsCurrencyOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-bold text-[#0A0A0C] transition-colors hover:bg-[#F5F5F5]",
                          selectedCurrency === item.code ? "bg-[#FFF9E8] text-[#B98916]" : ""
                        )}
                      >
                        <span aria-hidden="true">{item.flag}</span>
                        <span>{item.code}</span>
                        <span className="text-xs text-gray-400 font-normal">({item.symbol})</span>
                        {selectedCurrency === item.code && (
                          <Check className="ml-auto h-4 w-4 text-[#B98916]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Challenge Types Row */}
          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {challengeTypes.map((tItem) => {
                const isSelected = selectedType === tItem.id;
                return (
                  <div
                    key={tItem.id}
                    onClick={() => handleTypeSelect(tItem.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleTypeSelect(tItem.id);
                      }
                    }}
                    className={cn(
                      "rounded-xl p-4 cursor-pointer transition-all duration-200 border text-left",
                      isSelected
                        ? "border-[#E0B341] bg-[#FFF9E8] shadow-[0_0_16px_rgba(224,179,65,0.25)] ring-1 ring-[#E0B341]"
                        : "border-[#D9D9D9] bg-white hover:bg-[#F9FAFB] hover:border-gray-300"
                    )}
                  >
                    <h3 className="text-sm font-bold text-[#0A0A0C] mb-1">
                      {tItem.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {tItem.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          {/* Account Sizes Row */}
          <SectionReveal delay={0.14}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {accountSizes.map((size) => {
                const data = rawData[size]?.[selectedType];
                const isSelected = size === selectedSize;
                const isDisabled = !data;

                return (
                  <div
                    key={size}
                    onClick={() => !isDisabled && setSelectedSize(size)}
                    role="button"
                    aria-disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : 0}
                    onKeyDown={(e) => {
                      if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                        setSelectedSize(size);
                      }
                    }}
                    data-od-id={`challenge-card-${size}`}
                    className={cn(
                      "bg-white border rounded-xl p-3.5 min-h-28 text-left relative transition-all duration-200",
                      isDisabled
                        ? "opacity-30 cursor-not-allowed pointer-events-none border-[#D9D9D9]"
                        : "cursor-pointer hover:bg-[#F9FAFB]",
                      isSelected
                        ? "gold-card-highlight ring-1 ring-[#E0B341] shadow-sm"
                        : "border-[#D9D9D9]"
                    )}
                  >
                    {size === "100K" && (
                      <span className="absolute -top-2 right-2 bg-[#059669] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {t("popular") || "Popular"}
                      </span>
                    )}
                    <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                      {t("account") || "Account"}
                    </div>
                    <div className="text-lg font-bold text-[#0A0A0C] mb-1.5">
                      ${size}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-[#0A0A0C]">
                        {data ? formatMoney(data.disc) : "N/A"}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through font-normal">
                        {data ? formatMoney(data.orig) : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          {/* Details & Checkout Grid */}
          <SectionReveal delay={0.18}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Rules Panel */}
              <div
                className="lg:col-span-7 bg-white border border-[#D9D9D9] rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-sm"
                data-od-id="challenge-table"
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-[#D9D9D9]">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0A0C]">
                    <Percent className="w-4 h-4 text-[#E0B341]" />
                    <span>{t("showPercentage") || "Show Percentage"}</span>
                    <label className="relative inline-block w-9 h-5 cursor-pointer ml-1">
                      <input
                        type="checkbox"
                        checked={isPercentage}
                        onChange={(e) => setIsPercentage(e.target.checked)}
                        className="sr-only peer"
                      />
                      <span className="absolute inset-0 bg-[#E5E5E5] peer-checked:bg-[#E0B341] rounded-full transition-all duration-300"></span>
                      <span className="absolute bottom-[3px] left-[3px] bg-white w-3.5 h-3.5 rounded-full transition-transform duration-300 peer-checked:translate-x-4 shadow-sm"></span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Column 1: Evaluation Rules */}
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3.5">
                      {t("evaluationRules") || "Evaluation Rules"}
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs">
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("phase1Target") || "Phase 1 Target"}</span>
                        <span className="font-bold text-[#0A0A0C]">{formatValue(activePlan?.p1)}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("phase2Target") || "Phase 2 Target"}</span>
                        <span className="font-bold text-[#0A0A0C]">{formatValue(activePlan?.p2)}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("maxDailyLoss") || "Max Daily Loss"}</span>
                        <span className="font-bold text-[#0A0A0C]">{formatValue(activePlan?.dailyLoss)}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("maxLoss") || "Max Loss"}</span>
                        <span className="font-bold text-[#0A0A0C]">{formatValue(activePlan?.maxLoss)}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("minTradingDays") || "Min. Trading Days"}</span>
                        <span className="font-bold text-[#0A0A0C]">
                          {activePlan?.minDays ? `${activePlan.minDays} ${t("day") || "Day"}` : "-"}
                        </span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 font-normal">{t("consistencyRule") || "Consistency"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.consistency || "-"}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Funded Account Rules */}
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3.5">
                      {t("fundedAccountRules") || "Funded Account Rules"}
                    </h4>
                    <ul className="flex flex-col gap-3 text-xs">
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("tradingPeriod") || "Trading Period"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.period || "-"}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("profitSplit1") || "Profit Split (1–13 Days)"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.split1 || "-"}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("profitSplit2") || "Profit Split (14–30 Days)"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.split2 || "-"}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-normal">{t("profitSplit3") || "Profit Split (31+ Days)"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.split3 || "-"}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-gray-600 font-normal">{t("fundedConsistency") || "Funded Consistency"}</span>
                        <span className="font-bold text-[#0A0A0C]">{activePlan?.fundedConsistency || "-"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Checkout Panel */}
              <div className="lg:col-span-5 bg-white border border-[#D9D9D9] rounded-2xl p-6 flex flex-col justify-between gap-5 shadow-sm">
                <div>
                  <div className="flex justify-between items-baseline pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Selected Plan
                      </span>
                      <div className="text-lg font-extrabold text-[#0A0A0C] mt-0.5">
                        {activeTypeName} ${selectedSize}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0C]">
                        {formatMoney(activePlan?.disc || "$0.00")}
                      </div>
                      <div className="text-xs text-gray-400 line-through font-normal">
                        {formatMoney(activePlan?.orig)}
                      </div>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 py-1 border-b border-gray-50">
                      <span>Access Level</span>
                      <span className="font-bold text-[#0A0A0C]">Direct Evaluation Access</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 py-1 border-b border-gray-50">
                      <span>Scaling Ceiling</span>
                      <span className="font-bold text-[#0A0A0C]">Up to $1,200,000</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 py-1">
                      <span>Fee Refundability</span>
                      <span className="font-bold text-emerald-600">100% Refundable</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* CTA Button */}
                  <a
                    href={signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <button type="button" className="gold-pill-btn w-full gap-2 font-bold">
                      <span>{t("startChallenge") || "Start Challenge"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>

                  {/* Add-ons */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {t("addOnsAvailable") || "Add-Ons Available"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Lifetime Reward 90%", "Reward 95%", "Double Lev", "+4 more"].map(
                        (addon) => (
                          <span
                            key={addon}
                            className="bg-[#F5F5F5] border border-[#D9D9D9] text-gray-800 text-[11px] font-medium px-2.5 py-1 rounded-md"
                          >
                            {addon}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex flex-wrap justify-center items-center gap-2 pt-1 text-[11px] text-gray-500">
                    {["VISA", "Mastercard", "G Pay", "Crypto"].map((pm) => (
                      <span
                        key={pm}
                        className="border border-[#D9D9D9] rounded px-1.5 py-0.5 font-bold text-[10px] text-gray-700 bg-gray-50"
                      >
                        {pm}
                      </span>
                    ))}
                    <span className="text-xs font-medium">+10 more</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Universal Conditions / Disclaimer */}
          <SectionReveal delay={0.22}>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {((t.raw("conditions") as string[]) || [
                "Profit split up to 100%",
                "Leverage 1:100",
                "Payouts in ~12 hours",
              ]).map((c: string) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[12px] font-bold text-gray-700 shadow-sm"
                >
                  <Check size={13} strokeWidth={3} className="shrink-0 text-[#D49F3E]" />
                  {c}
                </span>
              ))}
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-5 text-gray-400">
              {t("disclaimer")}
            </p>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
