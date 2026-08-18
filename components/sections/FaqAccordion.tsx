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

  return (
    <section id="faqs" className="py-14 md:py-24" data-od-id="faq">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div className="max-w-3xl mx-auto">
          <SectionReveal delay={0.1}>
            <Accordion multiple={false} className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={i}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-5 data-[open]:border-primary/30 data-[open]:bg-foreground/[0.05] transition-all"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/55 pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>

          {/* Still have questions CTA */}
          <SectionReveal delay={0.2} className="mt-10 md:mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <MessageCircle size={20} className="text-primary" />
              </div>
            </div>
            <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground mb-2">
              {t("stillQuestions")}
            </h3>
            <p className="text-sm text-foreground/50 mb-5">
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
