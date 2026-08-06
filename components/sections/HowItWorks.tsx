"use client";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  return (
    <section
      className="border-y border-foreground/[0.06] bg-foreground/[0.02] py-14 md:py-24"
      data-od-id="how-it-works"
    >
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Process
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            Three stages from your first evaluation to scaled rewards.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex flex-col min-h-[240px] md:min-h-[260px] overflow-hidden rounded-2xl md:rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 md:p-7 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
              data-od-id={`how-step-${i + 1}`}
            >
              {/* Step number */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/30">
                <span className="font-mono text-sm font-bold text-primary">0{i + 1}</span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">
                {step.phase}
              </span>
              <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-foreground/50 leading-relaxed flex-1">
                {step.description}
              </p>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                {step.step}
                {i < 2 && <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />}
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[#d4af37]/5 to-transparent" />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
