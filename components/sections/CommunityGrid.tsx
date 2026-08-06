"use client";
import { motion } from "framer-motion";
import { COMMUNITY_CARDS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { MessageCircle, BarChart2, LifeBuoy } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "message-circle": MessageCircle,
  "bar-chart-2": BarChart2,
  "life-buoy": LifeBuoy,
};

export function CommunityGrid() {
  return (
    <section className="py-14 md:py-24 border-t border-foreground/10 bg-foreground/[0.03]" data-od-id="community">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Community
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Trade Smarter. Together.
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            65,000+ traders and counting. Join the community that supports you at every step.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {COMMUNITY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 md:p-7 flex flex-col gap-5 hover:border-primary/30 transition-all"
                data-od-id={`community-card-${i}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(ellipse at top left, ${card.gradient.replace("from-[", "").replace("]/20 to-transparent", "")}15, transparent 60%)` }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {Icon && <Icon size={20} className="text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/50 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="relative z-10 self-start"
                >
                  <GoldButton variant="outline" size="sm">
                    {card.cta}
                  </GoldButton>
                </a>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
