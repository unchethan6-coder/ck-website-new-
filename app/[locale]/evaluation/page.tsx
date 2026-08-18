import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { ChallengeComparison } from "@/components/sections/ChallengeComparison";
import { StatsStrip } from "@/components/sections/StatsStrip";
import EvaluationIntro from "@/components/evaluation/EvaluationIntro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getActivePromo, getChallengeConfig } from "@/lib/cms";

export const revalidate = 300;

export default async function EvaluationPage() {
  const [promo, challengeConfig, t, tFaq] = await Promise.all([
    getActivePromo(),
    getChallengeConfig(),
    getTranslations("evaluation"),
    getTranslations("faq"),
  ]);

  const evaluationFaqs = [
    {
      q: tFaq("items.timeLimit.q"),
      a: tFaq("items.timeLimit.a"),
    },
    {
      q: tFaq("items.platforms.q"),
      a: tFaq("items.platforms.a"),
    },
    {
      q: tFaq("items.profitSplit.q"),
      a: tFaq("items.profitSplit.a"),
    },
    {
      q: tFaq("items.newsTrading.q"),
      a: tFaq("items.newsTrading.a"),
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-od-id="evaluation-page">
      <EvaluationIntro />

      {/* ─────────────── Trust stats ─────────────── */}
      <StatsStrip />

      {/* ─────────────── Interactive pricing table (homepage standard) ─────────────── */}
      <Suspense fallback={null}>
        <ChallengeComparison config={challengeConfig} promoCode={promo?.code} />
      </Suspense>

      {/* ─────────────── Reset & Top-Up ─────────────── */}
      <section className="bg-background pb-16 md:pb-24" data-od-id="evaluation-reset">
        <Container>
          <SectionReveal delay={0.05} className="rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-6 sm:p-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center md:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                  <RefreshCw size={24} className="text-primary" />
                </div>
                <div className="max-w-md">
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground md:text-2xl">
                    {t("resetTitle")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                    {t("resetDesc")}
                  </p>
                </div>
              </div>
              <a
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <GoldButton size="lg" data-od-id="evaluation-reset-cta">
                  {t("resetBtn")} <ArrowRight size={16} />
                </GoldButton>
              </a>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="bg-muted py-16 md:py-24" data-od-id="evaluation-faq">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              {t("faqEyebrow")}
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              {t("faqTitle")}
            </h2>
          </SectionReveal>

          <div className="mx-auto max-w-3xl">
            <SectionReveal delay={0.1}>
              <Accordion multiple={false} className="space-y-2">
                {evaluationFaqs.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={String(i)}
                    className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-5 transition-all data-[open]:border-primary/30 data-[open]:bg-foreground/[0.05]"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-foreground/55">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SectionReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
