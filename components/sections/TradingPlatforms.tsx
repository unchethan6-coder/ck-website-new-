"use client";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLATFORMS = [
  {
    id: "mt5",
    name: "MT5",
    fullName: "MetaTrader 5",
    description:
      "The industry-standard platform trusted by professional traders worldwide. Advanced charting, one-click trading, and EA support.",
    features: ["Advanced charting", "Expert Advisors (EA)", "One-click trading", "20+ order types"],
    logo: "/images/logos/tradelocker.jpeg",
  },
  {
    id: "tradelocker",
    name: "TradeLocker",
    fullName: "TradeLocker",
    description:
      "A modern, web-based platform built for speed and simplicity. Clean UI, real-time data, and built-in risk management tools.",
    features: ["Web & mobile native", "Real-time analytics", "Built-in risk tools", "Clean modern UI"],
    logo: "/images/logos/mt5.png",
  },
];

export function TradingPlatforms() {
  return (
    <section
      id="platforms"
      className="scroll-mt-28 py-14 md:py-24 bg-background"
      data-od-id="trading-platforms"
    >
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Platforms
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Trade on the platform that suits you
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            Both MT5 and TradeLocker are available across all CK Capital challenge types.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="rounded-2xl md:rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6 flex flex-col gap-5"
              data-od-id={`platform-${p.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-extrabold text-foreground">
                    {p.name}
                  </h3>
                  <p className="text-xs text-foreground/40">{p.fullName}</p>
                </div>
              </div>

              <p className="text-sm text-foreground/50 leading-relaxed">{p.description}</p>

              <ul className="grid grid-cols-2 gap-1.5 text-xs text-foreground/60">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <Check size={11} className="text-emerald-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start"
              >
                <GoldButton variant="outline" data-od-id={`platform-cta-${p.id}`}>
                  Get {p.name}
                </GoldButton>
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
