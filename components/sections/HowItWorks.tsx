"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { fadeUp, stagger } from "@/components/fx/reveal";

import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      phase: t("steps.step1.phase"),
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
    },
    {
      phase: t("steps.step2.phase"),
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      phase: t("steps.step3.phase"),
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
  ];

  const features = [
    t("noConsistency"),
    t("newsAllowed"),
    t("noTimePressure"),
    t("profitSplit"),
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F6F7F9] text-[#111827] py-16 md:py-24"
      data-od-id="how-it-works"
    >
      <Container>
        <SectionReveal className="text-center mb-12 md:mb-16">
          <p className="text-xs text-[#D99B00] uppercase tracking-[0.2em] font-black mb-3">
            {t("badge")}
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-black text-[#0A0A0C] md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-[#4B5563] font-medium max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div
          className="relative mx-auto max-w-3xl"
        >
          {/* Steps list with scoped connecting hairline */}
          <div className="relative space-y-10 md:space-y-12">
            {/* Connecting hairline: perfectly connects the 3 yellow node dots */}
            <div
              aria-hidden="true"
              className="absolute left-[68px] top-[34px] bottom-[34px] w-[2px] -translate-x-1/2 bg-[#FFC107]/40 z-0"
            />
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative flex items-start gap-5 sm:gap-8"
                data-od-id={`how-step-${i + 1}`}
              >
                <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-gray-200/90 bg-white shadow-md">
                  <span className="font-[family-name:var(--font-inter-tight)] text-2xl font-black text-[#0A0A0C] tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#FFC107] ring-4 ring-[#F6F7F9]" />
                </div>
                <div className="pt-1.5 flex-1 min-w-0">
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#D99B00]">
                    {step.phase}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-inter-tight)] text-xl font-black text-[#0A0A0C] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm font-medium text-[#4B5563] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Highlights Strip & CTA */}
          <div
            className="mt-14 overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-md"
            data-od-id="how-it-works-features"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2.5 text-center">
              {features.map((feature, idx) => (
                <div key={feature} className="flex items-center gap-2">
                  {idx > 0 && (
                    <span className="text-gray-300 text-xs hidden sm:inline" aria-hidden="true">
                      •
                    </span>
                  )}
                  <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.14em] text-[#0A0A0C]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-sm font-bold text-[#0A0A0C]">
                {t("readyFunded")} <span className="text-[#D99B00] font-black">{t("startJourney")}</span>
              </p>
              <a
                href="/#start-challenge"
                className="btn-gold-standard inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.12em] shrink-0"
                data-od-id="how-it-works-cta"
              >
                <span>{t("startChallenge")}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
