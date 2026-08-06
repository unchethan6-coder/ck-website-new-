import { Suspense } from "react";
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

const HERO_FEATURES = [
  "12H Payouts",
  "100% Profit Split",
  "No Time Limits",
  "News Trading Allowed",
];

const STEPS = [
  {
    step: "01",
    icon: "target" as const,
    title: "Evaluation Stage",
    description:
      "Complete the initial evaluation to demonstrate your trading competency. Meet profit targets while respecting clear risk rules.",
  },
  {
    step: "02",
    icon: "shield" as const,
    title: "Verification",
    description:
      "Move to verification with simplified objectives. Prove consistency in a simulated environment up to $100K capital.",
  },
  {
    step: "03",
    icon: "award" as const,
    title: "Qualified Analyst",
    description:
      "Become a qualified trader and earn up to 100% profit share on funded simulated accounts up to $1.2M.",
  },
];

const EVALUATION_FAQS = [
  {
    q: "How long do I have to complete the evaluation?",
    a: "You have unlimited time to complete the evaluation phases. Trade at your own pace with no deadline pressure.",
  },
  {
    q: "What happens if I lose my trading capital?",
    a: "You can reset your account and start over. We offer reset and top-up options to give you another chance.",
  },
  {
    q: "Can I withdraw my profits?",
    a: "Yes, once you reach qualified analyst status you can withdraw up to 100% of your simulated profits on your schedule.",
  },
  {
    q: "Are there restrictions on trading styles?",
    a: "No restrictions. You can scalp, swing trade, use algorithms, or trade the news. All trading styles are welcome.",
  },
];

export default async function EvaluationPage() {
  const [promo, challengeConfig] = await Promise.all([getActivePromo(), getChallengeConfig()]);

  return (
    <div className="min-h-screen bg-background" data-od-id="evaluation-page">
      <EvaluationIntro features={HERO_FEATURES} steps={STEPS} />

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
                    Reset &amp; Top-Up Options
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                    Breached a rule or want to grow faster? Reset your account or top up
                    to a larger challenge for a discounted fee and get back to trading.
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
                  Get Back in the Game <ArrowRight size={16} />
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
              FAQ
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Evaluation Questions
            </h2>
          </SectionReveal>

          <div className="mx-auto max-w-3xl">
            <SectionReveal delay={0.1}>
              <Accordion multiple={false} className="space-y-2">
                {EVALUATION_FAQS.map((item, i) => (
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
