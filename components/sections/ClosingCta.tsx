"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/shared/GoldButton";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  const t = useTranslations("closingCta");

  return (
    <section
      className="relative flex min-h-[56vh] items-center justify-center overflow-hidden py-20 md:py-28"
      data-od-id="closing-cta"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl px-4 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55">
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
      </motion.div>
    </section>
  );
}
