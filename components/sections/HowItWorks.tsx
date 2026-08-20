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
    "NO CONSISTENCY RULES",
    "NEWS TRADING ALLOWED",
    "NO TIME PRESSURE",
    "UP TO 100% PROFIT SPLIT",
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-14 md:py-24"
      data-od-id="how-it-works"
    >
      <Container>
        <SectionReveal className="text-center mb-12 md:mb-16">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Process
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Connecting hairline */}
          <div
            aria-hidden="true"
            className="absolute left-[34px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent"
          />
          <div className="space-y-10 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative flex items-start gap-5 sm:gap-8"
                data-od-id={`how-step-${i + 1}`}
              >
                <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-background shadow-lg shadow-primary/5">
                  <span className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-primary tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="pt-1.5 flex-1 min-w-0">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary/60">
                    {step.phase}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-foreground/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Highlights Strip & CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-14 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-foreground/[0.02] to-primary/[0.04] p-6 backdrop-blur-sm shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
            data-od-id="how-it-works-features"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2.5 text-center">
              {features.map((feature, idx) => (
                <div key={feature} className="flex items-center gap-2">
                  {idx > 0 && (
                    <span className="text-primary/40 text-xs hidden sm:inline" aria-hidden="true">
                      •
                    </span>
                  )}
                  <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-sm font-semibold text-foreground/80">
                Ready to get funded? <span className="text-primary font-bold">Start your journey today.</span>
              </p>
              <a
                href="/#start-challenge"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110 transition-all shrink-0"
                data-od-id="how-it-works-cta"
              >
                <span>Start Challenge</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
