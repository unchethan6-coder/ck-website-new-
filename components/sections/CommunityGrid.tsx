"use client";
import { motion } from "framer-motion";
import { COMMUNITY_CARDS } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { GoldButton } from "@/components/shared/GoldButton";
import { TerminalCard } from "@/components/fx/TerminalCard";
import { fadeUp, stagger } from "@/components/fx/reveal";
import { MessageCircle, BarChart2, LifeBuoy, ArrowUpRight } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "message-circle": MessageCircle,
  "bar-chart-2": BarChart2,
  "life-buoy": LifeBuoy,
};

export function CommunityGrid() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-24 border-t border-foreground/10 bg-foreground/[0.03]"
      data-od-id="community"
    >
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch"
        >
          {/* Left — community card */}
          <motion.div
            variants={fadeUp}
            className="glow-card relative overflow-hidden flex flex-col"
            data-od-id="community-card"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70">
              Community
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl md:text-3xl font-extrabold text-foreground">
              Trade Smarter. Together.
            </h3>
            <p className="mt-3 max-w-md text-sm text-foreground/50 leading-relaxed">
              65,000+ traders and counting. Join the community that supports you at every
              step — ideas, strategies, and payout celebrations.
            </p>

            <div className="mt-6 flex flex-col divide-y divide-foreground/[0.06]">
              {COMMUNITY_CARDS.map((card) => {
                const Icon = ICONS[card.icon];
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 py-4 transition-colors"
                    data-od-id={`community-row-${card.icon}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      {Icon && <Icon size={18} className="text-primary" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold text-foreground">{card.title}</p>
                      <p className="mt-0.5 text-[13px] text-foreground/50 leading-snug truncate">
                        {card.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-foreground/30 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-6">
              <a
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                data-od-id="community-cta"
              >
                <GoldButton size="lg" className="w-full justify-center sm:w-auto">
                  Join Discord
                </GoldButton>
              </a>
            </div>
          </motion.div>

          {/* Right — algo terminal */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:p-8 flex flex-col"
            data-od-id="community-terminal"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70">
              Automation
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-inter-tight)] text-2xl md:text-3xl font-extrabold text-foreground">
              Bring your own agent or algo
            </h3>
            <p className="mt-3 max-w-md text-sm text-foreground/50 leading-relaxed">
              Connect your own trading algorithms to your CK Account and let them work while
              you sleep.
            </p>
            <div className="mt-6 flex-1">
              <TerminalCard />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
