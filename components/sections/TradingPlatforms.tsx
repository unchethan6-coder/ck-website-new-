"use client";
import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/components/fx/reveal";
import { Check } from "lucide-react";

export function TradingPlatforms() {
  const t = useTranslations("platforms");

  const platforms = [
    {
      id: "mt5",
      name: "MT5",
      fullName: "MetaTrader 5",
      description: t("mt5Desc"),
      features: (t.raw("mt5Features") as string[]) ?? ["Advanced charting", "Expert Advisors (EA)", "One-click trading", "20+ order types"],
      logo: "/images/logos/mt5.png",
    },
    {
      id: "tradelocker",
      name: "TradeLocker",
      fullName: "TradeLocker",
      description: t("tradelockerDesc"),
      features: (t.raw("tradelockerFeatures") as string[]) ?? ["Web & mobile native", "Real-time analytics", "Built-in risk tools", "Clean modern UI"],
      logo: "/images/logos/tradelocker.jpeg",
    },
  ];

  return (
    <section
      id="platforms"
      className="scroll-mt-28 py-14 md:py-24"
      data-od-id="trading-platforms"
    >
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

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {platforms.map((p) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              className="glow-card flex flex-col gap-5"
              data-od-id={`platform-${p.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="w-full h-full object-cover"
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
                  {t("getPlatform", { name: p.name })}
                </GoldButton>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
