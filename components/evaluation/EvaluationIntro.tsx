"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Award, ShieldCheck, Target } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { GoldButton } from "@/components/shared/GoldButton";

export interface EvaluationStep {
  step: string;
  icon: "target" | "shield" | "award";
  title: string;
  description: string;
}

const ICONS = { target: Target, shield: ShieldCheck, award: Award } as const;

export default function EvaluationIntro({
  features,
  steps,
}: {
  features: string[];
  steps: EvaluationStep[];
}) {
  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="evaluation-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(212,175,55,0.20), transparent 45%), radial-gradient(circle at 5% 100%, rgba(212,175,55,0.08), transparent 40%)',
          }}
        />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                <Sparkles size={11} className="text-primary" />
                Summer Sale
                <span className="text-primary/40">·</span>
                70% Off All Evaluations
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="evaluation-hero-title"
            >
              Trading <span className="shimmer-text">Evaluations</span>
              <br className="hidden sm:block" /> built for serious traders.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Prove your skills in a simulated environment, unlock funded accounts up to
              $1.2M, and keep up to 100% of your profits. Transparent rules, no hidden
              fees, no time limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoldButton size="lg" data-od-id="evaluation-hero-cta-primary">
                  Claim 70% OFF <ArrowRight size={16} />
                </GoldButton>
              </a>
              <a
                href="#start-challenge"
                data-od-id="evaluation-hero-cta-secondary"
                className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 px-5 py-2.5 text-[14px] font-semibold text-foreground/85 transition-all hover:border-foreground/25 hover:bg-foreground/[0.04] hover:text-foreground"
              >
                Compare Challenges
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 text-[12.5px] text-foreground/60"
                >
                  <Check size={12} className="shrink-0 text-primary" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* ─────────────── Your Path to Success ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="evaluation-steps">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              How It Works
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Your Path to Success
            </h2>
            <p className="mt-3 text-[15px] text-foreground/50">
              Three clear stages between you and your funded CK Account.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
                  data-od-id={`evaluation-step-${i + 1}`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:bg-primary/15">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <span className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground/10">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
