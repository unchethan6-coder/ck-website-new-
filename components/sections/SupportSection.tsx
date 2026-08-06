"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { Headphones } from "lucide-react";

const FLAGS = ["🇬🇧", "🇦🇪", "🇮🇳", "🇵🇰", "🇪🇸", "🇫🇷", "🇩🇪"];

const STATS = [
  { value: "95%", label: "TRADER\nSATISFACTION" },
  { value: "60s", label: "AVG RESPONSE\nTIME" },
  { value: "24/7", label: "SUPPORT\nAVAILABLE" },
];

export function SupportSection() {
  return (
    <section className="py-14 md:py-24 bg-background" data-od-id="support">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — content */}
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
              <Headphones size={14} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">24/7 Trader Support</span>
            </div>

            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-5xl leading-[1.1] mb-5">
              Support Built for<br />Serious Traders
            </h2>

            <p className="text-foreground/50 leading-relaxed mb-8 max-w-lg">
              Our team is available 24/7 to help traders with evaluation access, platform
              questions, account support, and payout-related guidance. Fast replies, clear
              answers, and trader-first service.
            </p>

            <p className="text-[10px] text-foreground/30 uppercase tracking-widest font-semibold mb-3">
              Languages Spoken
            </p>
            <div className="flex items-center gap-2 mb-8">
              {FLAGS.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="w-9 h-9 rounded-full border border-foreground/10 bg-foreground/[0.03] flex items-center justify-center text-sm"
                >
                  {f}
                </motion.div>
              ))}
              <span className="text-xs text-foreground/30 ml-1">+ more</span>
            </div>

            <div className="flex gap-3">
              <a href="/contact">
                <GoldButton data-od-id="support-cta">Get Support</GoldButton>
              </a>
              <a
                href="#faqs"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-foreground/20 px-8 text-[15px] font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Read FAQs
              </a>
            </div>
          </SectionReveal>

          {/* Right — support card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-foreground/[0.05] border border-foreground/10 flex items-center justify-center">
                <Headphones size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-extrabold text-foreground">
                  CK Capital Support
                </h3>
                <p className="text-xs text-primary">Always online • Trader-first</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3 text-center"
                >
                  <p className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[9px] text-foreground/40 uppercase tracking-wider mt-1 whitespace-pre-line leading-tight">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="text-xs text-foreground/40">Real traders. Real answers. Real fast.</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            {/* Badge */}
            <div className="flex justify-end">
              <span className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1">
                Avg reply under 60 seconds
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
