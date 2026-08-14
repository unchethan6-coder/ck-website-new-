"use client";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Aurora } from "@/components/fx/Aurora";
import { fadeUp, stagger } from "@/components/fx/reveal";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-foreground/[0.06] bg-foreground/[0.02] py-14 md:py-24"
      data-od-id="how-it-works"
    >
      <Aurora variant="section" />
      <Container>
        <SectionReveal className="text-center mb-12 md:mb-16">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Process
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Three stages from evaluation to funded
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            Pass the objectives, earn rewards, then scale — on your own timetable.
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
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex items-start gap-5 sm:gap-8"
                data-od-id={`how-step-${i + 1}`}
              >
                <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-background">
                  <span className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-primary tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background" />
                </div>
                <div className="pt-1.5">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary/60">
                    {step.phase}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-foreground/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
