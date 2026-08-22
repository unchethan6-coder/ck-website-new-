"use client";
import { useTranslations } from "next-intl";
import { FAQ_ITEMS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

export function FaqAccordion() {
  const t = useTranslations("faq");

  const faqKeys = [
    "payoutTime",
    "timeLimit",
    "platforms",
    "profitSplit",
    "drawdown",
    "newsTrading",
    "consistency",
    "cryptoFunding",
    "refundPolicy",
    "expertAdvisors",
  ] as const;

  return (
    <section id="faqs" className="bg-[#0D0C08] text-white py-16 md:py-24" data-od-id="faq">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/55 font-medium max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div className="max-w-3xl mx-auto">
          <SectionReveal delay={0.06}>
            <Accordion multiple={false} className="space-y-3">
              {faqKeys.map((key, i) => (
                <AccordionItem
                  key={key}
                  value={String(i)}
                  className="rounded-2xl border border-white/10 bg-[#12100A] px-6 shadow-sm data-[open]:border-primary/50 data-[open]:bg-[#16140D] transition-all"
                >
                  <AccordionTrigger className="text-left text-sm font-bold text-white hover:text-primary hover:no-underline py-4">
                    {t(`items.${key}.q` as any)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-medium text-white/60 pb-4 leading-relaxed">
                    {t(`items.${key}.a` as any)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>

          {/* Still have questions CTA */}
          <SectionReveal delay={0.1} className="mt-10 md:mt-12 rounded-2xl border border-white/10 bg-[#12100A] p-6 sm:p-8 text-center shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <MessageCircle size={20} className="text-primary" />
              </div>
            </div>
            <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-white mb-2">
              {t("stillQuestions")}
            </h3>
            <p className="text-sm text-white/50 mb-5">
              {t("supportAvailable")}
            </p>
            <a href="https://intercom.help/ck-capital/en/" target="_blank" rel="noopener noreferrer">
              <GoldButton size="md" data-od-id="faq-support-cta">
                {t("chatSupport")}
              </GoldButton>
            </a>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
