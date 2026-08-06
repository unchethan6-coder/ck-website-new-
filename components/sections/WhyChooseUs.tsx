"use client";
import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "@/lib/content";
import { Container } from "@/components/shared/Container";
import { SectionReveal } from "@/components/shared/SectionReveal";
import {
  Newspaper, Zap, TrendingUp, RefreshCw, Activity, Headphones,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  newspaper: Newspaper,
  zap: Zap,
  "trending-up": TrendingUp,
  "refresh-cw": RefreshCw,
  activity: Activity,
  headphones: Headphones,
};

export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-24 bg-background" data-od-id="why-choose-us">
      <Container>
        <SectionReveal className="text-center mb-10 md:mb-14">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
            Advantages
          </p>
          <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
            Why Choose CK Capital?
          </h2>
          <p className="mt-3 text-foreground/50 max-w-xl mx-auto">
            Built for serious traders who want real rules, real payouts, and real support.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 hover:border-primary/30 hover:bg-foreground/[0.05] transition-all duration-300"
                data-od-id={`feature-card-${item.icon}`}
              >
                <div className="mb-4 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  {Icon && <Icon size={18} className="text-primary" />}
                </div>
                <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
