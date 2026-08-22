"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/shared/GoldButton";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  const t = useTranslations("closingCta");

  return (
    <section
      className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-[#F6F7F9] text-[#111827] py-20 md:py-28"
      data-od-id="closing-cta"
    >
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D99B00]">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-inter-tight)] text-4xl font-black leading-[1.05] tracking-tight text-[#0A0A0C] sm:text-5xl md:text-6xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-[#4B5563]">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <a
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            data-od-id="closing-cta-primary"
          >
            <GoldButton size="lg" className="!px-8">
              {t("button")} <ArrowRight size={16} />
            </GoldButton>
          </a>
        </div>
      </div>
    </section>
  );
}
