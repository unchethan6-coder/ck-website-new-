'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Compass, Lightbulb, ShieldCheck, Sparkles, Star, Target, Users } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GoldButton } from '@/components/shared/GoldButton'

const MISSION_VISION = [
  {
    icon: Compass,
    title: 'Our Mission',
    description:
      "We provide traders with innovative tools, structured guidance, and an evaluation process using simulated capital to develop discipline, skill, and consistent profitability. We're committed to democratizing access to prop trading opportunities for traders worldwide.",
  },
  {
    icon: Target,
    title: 'Our Vision',
    description:
      'To empower traders to reach their full potential, redefine personal success, and cultivate a global community of consistently profitable traders. We envision a future where trading skill is rewarded fairly and everyone has equal opportunity.',
  },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We operate with complete transparency and honesty in all dealings.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We foster a welcoming environment where traders support each other.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'We deliver best-in-class platforms, support, and trading conditions.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously improve our technology and services for traders.',
  },
]

const ABOUT_STATS = [
  { stat: '50,000+', label: 'Active Traders' },
  { stat: '$1.2M', label: 'Max Simulated Capital' },
  { stat: '100%', label: 'Profit Split' },
  { stat: '24/7', label: 'Community Support' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" data-od-id="about-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="about-hero">
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
                Who We Are
                <span className="text-primary/40">·</span>
                Premium Prop Trading
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="about-hero-title"
            >
              Meet The CK Capital <span className="shimmer-text">Team</span>
            </motion.h1>
          </div>
        </Container>
      </section>

      {/* ─────────────── Our Story ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="about-story">
        <Container>
          <SectionReveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Our Story
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Built to Close the Gap
            </h2>
            <p className="mt-6 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 text-left text-[15px] leading-relaxed text-foreground/70 sm:p-8 md:text-base">
              CK Capital was founded with a mission to support aspiring traders by bridging
              the gap between potential and achievement. Backed by a team of industry
              experts, we offer trader-friendly systems, in-house technology, and
              unparalleled support. We believe that with the right environment, education,
              and opportunity, traders can achieve remarkable results.
            </p>
          </SectionReveal>
        </Container>
      </section>

      {/* ─────────────── Mission & Vision ─────────────── */}
      <section className="bg-muted py-16 md:py-24" data-od-id="about-mission-vision">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {MISSION_VISION.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-7 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05] sm:p-8"
                  data-od-id={`about-${item.title.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─────────────── Leadership ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="about-leadership">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Leadership
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Our Leadership
            </h2>
          </SectionReveal>

          <SectionReveal
            delay={0.1}
            className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br dark-panel from-[#1a1508] to-[#0d0b06] p-7 sm:p-10"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
              <img
                src="/images/about/dan.jpg"
                alt="Daniel Cheung, Founder of CK Capital"
                className="h-20 w-20 shrink-0 rounded-2xl border border-primary/30 object-cover"
                data-od-id="about-founder-photo"
              />
              <div>
                <h3 className="font-[family-name:var(--font-inter-tight)] text-xl font-bold text-foreground">
                  Daniel Cheung — Founder
                </h3>
                <p className="mt-1 text-sm font-semibold text-primary">
                  Seven-figure trader | FX Brokering Expert | Private Capital Specialist
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/60">
                  UK-born Daniel Cheung is a seven-figure trader with extensive experience
                  in FX brokering, private capital management, and professional funds. He
                  champions an &apos;us vs us&apos; mindset, emphasizing self-growth and
                  collective improvement. Daniel&apos;s vision for CK Capital is to create
                  an environment where traders are supported like family while being
                  rewarded for their skills.
                </p>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* ─────────────── Core Values ─────────────── */}
      <section className="bg-muted py-16 md:py-24" data-od-id="about-values">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              What We Stand For
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Our Values
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
                  data-od-id={`about-value-${item.title.toLowerCase()}`}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground">
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

      {/* ─────────────── Stats band ─────────────── */}
      <section className="border-y border-foreground/10 bg-foreground/[0.03] py-10 md:py-12" data-od-id="about-stats">
        <Container>
          <div className="grid grid-cols-2 gap-y-2 md:grid-cols-4 md:divide-x md:divide-foreground/[0.06]">
            {ABOUT_STATS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center gap-1 px-3 py-3 text-center sm:px-4 sm:py-4"
              >
                <span className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-primary md:text-3xl">
                  {item.stat}
                </span>
                <span className="text-[11px] leading-snug text-foreground/45 sm:text-xs">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="about-cta">
        <Container>
          <SectionReveal
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-8 text-center sm:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.10),_transparent_60%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <BadgeCheck size={28} className="text-primary" />
              </div>
              <h2 className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">
                Join the CK Capital Community
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/55">
                Be part of a growing global community of successful traders.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoldButton size="lg" data-od-id="about-cta-primary">
                    Start Trading <ArrowRight size={16} />
                  </GoldButton>
                </a>
                <a
                  href="https://discord.gg/ckcapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-od-id="about-cta-secondary"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/15 px-5 py-2.5 text-[14px] font-semibold text-foreground/85 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </div>
  )
}
