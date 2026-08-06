'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Coins, Gem, Sparkles, Trophy, Wallet } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GoldButton } from '@/components/shared/GoldButton'

const COMING_PILLARS = [
  { icon: Coins, label: 'Up to 100% Profit Split' },
  { icon: Wallet, label: 'Flexible Payouts' },
  { icon: Gem, label: 'Loyalty Perks' },
  { icon: Trophy, label: 'Milestone Bonuses' },
]

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background" data-od-id="rewards-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="rewards-hero">
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
                Rewards Program
                <span className="text-primary/40">·</span>
                Coming Soon
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="rewards-hero-title"
            >
              Earn more as <span className="shimmer-text">you trade.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Keep up to 100% of your simulated profits with flexible payouts, loyalty
              perks, and milestone bonuses. Full details are on the way.
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
                <GoldButton size="lg" data-od-id="rewards-hero-cta-primary">
                  Get Started <ArrowRight size={16} />
                </GoldButton>
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─────────────── Coming soon panel ─────────────── */}
      <section className="bg-background py-8 md:py-10" data-od-id="rewards-coming-soon">
        <Container>
          <SectionReveal
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-8 text-center sm:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.10),_transparent_60%)]" />
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
              >
                <Trophy size={28} className="text-primary" />
              </motion.div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Coming Soon
              </p>
              <h2 className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">
                Full Program Details Are on the Way
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/55">
                We are putting the finishing touches on our rewards program. Check back
                shortly for the complete payout tiers and bonus structure.
              </p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ─────────────── What's coming — pillars (no invented specifics) ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="rewards-pillars">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              What to Expect
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              The Pillars We're Building
            </h2>
            <p className="mt-3 text-[15px] text-foreground/50">
              These are the cornerstones of the rewards program — specifics to follow.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMING_PILLARS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group flex flex-col rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
                  data-od-id={`rewards-pillar-${i + 1}`}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground">
                    {item.label}
                  </h3>
                  <span className="mt-3 inline-flex w-fit items-center rounded-full border border-foreground/12 bg-foreground/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
                    Details Coming Soon
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  )
}
