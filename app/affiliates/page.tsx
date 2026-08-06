'use client'

import { motion } from 'framer-motion'
import { ArrowRight, HandCoins, Sparkles, Users } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GoldButton } from '@/components/shared/GoldButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  { q: 'What is the CK Capital Affiliate Program?', a: 'The affiliate program allows approved creators and traders to earn commissions by referring customers to CK Capital.' },
  { q: 'How do I become an affiliate?', a: 'Apply through the affiliate application process. Each application is reviewed individually.' },
  { q: 'What commission do affiliates earn?', a: 'Approved affiliates can earn up to 25% commission on qualified referrals, subject to their affiliate tier, performance and program terms.' },
  { q: 'When are affiliate payouts processed?', a: 'Affiliate payouts are processed according to our payout schedule. A minimum payout of $250 is required before a payout can be requested or processed.' },
  { q: 'What type of content is not permitted?', a: 'Affiliates must not publish, promote, or distribute any content that is misleading, deceptive, false, offensive, defamatory, unlawful or likely to damage the reputation, brand or interests of the company.' },
  { q: 'Can my affiliate account be reviewed or terminated?', a: 'Yes. All affiliate accounts are subject to ongoing review. CK Capital reserves the right to suspend or terminate any affiliate account or partnership at its sole discretion if it violates program rules, engages in prohibited activity or is no longer aligned with the company objectives.' },
  { q: 'How can I update my affiliate information?', a: 'If you need to update your affiliate information, please contact our support team and provide the required details for verification. Once your identity has been confirmed, our team will review and process the requested changes as soon as possible.' },
  { q: 'What happens if I become inactive?', a: 'Inactive affiliate accounts may be reviewed, suspended or removed from the program.' },
  { q: 'Can CK Capital change the affiliate program terms?', a: 'Yes. CK Capital reserves the right to update affiliate commissions, requirements, benefits and program terms at any time.' },
]

const HIGHLIGHTS = [
  { value: 'Up to 25%', label: 'Commission on qualified referrals' },
  { value: '$250', label: 'Minimum payout threshold' },
  { value: 'Reviewed', label: 'Every application individually' },
]

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-background" data-od-id="affiliates-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="affiliates-hero">
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
                Affiliate Program
                <span className="text-primary/40">·</span>
                Earn on Every Referral
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="affiliates-hero-title"
            >
              Earn With <span className="shimmer-text">CK Capital</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Approved creators and traders can earn commissions by referring customers
              to CK Capital — up to 25% on qualified referrals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="/contact">
                <GoldButton size="lg" data-od-id="affiliates-hero-cta-primary">
                  Become an Affiliate <ArrowRight size={16} />
                </GoldButton>
              </a>
              <a
                href="https://intercom.help/ck-capital/en/collections/19661119-affiliates"
                target="_blank"
                rel="noopener noreferrer"
                data-od-id="affiliates-hero-cta-secondary"
                className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 px-5 py-2.5 text-[14px] font-semibold text-foreground/85 transition-all hover:border-foreground/25 hover:bg-foreground/[0.04] hover:text-foreground"
              >
                Read Full Terms
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─────────────── Highlights band ─────────────── */}
      <section className="border-y border-foreground/10 bg-foreground/[0.03] py-10 md:py-12" data-od-id="affiliates-highlights">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-foreground/[0.06]">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center gap-1 px-3 text-center sm:px-4"
              >
                <span className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-primary md:text-4xl">
                  {item.value}
                </span>
                <span className="text-[11px] leading-snug text-foreground/45 sm:text-xs">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── How it works (why join) ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="affiliates-why">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Why Partner With Us
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Grow With Every Trader You Bring
            </h2>
            <p className="mt-3 text-[15px] text-foreground/50">
              Share CK Capital with your audience and get rewarded for qualified referrals.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: HandCoins,
                title: 'Earn Commissions',
                description:
                  'Earn up to 25% commission on every qualified referral you bring to CK Capital, subject to your affiliate tier and performance.',
              },
              {
                icon: Users,
                title: 'Creators & Traders Welcome',
                description:
                  'The program is open to approved creators and traders. Every application is reviewed individually.',
              },
              {
                icon: Sparkles,
                title: 'Transparent Terms',
                description:
                  'Clear program rules and a defined payout schedule, with a minimum payout of $250 before a payout can be processed.',
              },
            ].map((item, i) => {
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
                  data-od-id={`affiliates-card-${i + 1}`}
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

      {/* ─────────────── Terms & FAQs ─────────────── */}
      <section className="bg-muted py-16 md:py-24" data-od-id="affiliates-faq">
        <Container>
          <SectionReveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Program Details
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-foreground md:text-4xl">
              Terms &amp; FAQs
            </h2>
            <p className="mt-3 text-[15px] text-foreground/50">
              Everything you need to know about the CK Capital Affiliate Program.
            </p>
          </SectionReveal>

          <div className="mx-auto max-w-3xl">
            <SectionReveal delay={0.1}>
              <Accordion multiple={false} className="space-y-2">
                {FAQS.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={String(i)}
                    className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-5 transition-all data-[open]:border-primary/30 data-[open]:bg-foreground/[0.05]"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-foreground/55">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="bg-background py-16 md:py-24" data-od-id="affiliates-cta">
        <Container>
          <SectionReveal
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-8 text-center sm:p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.10),_transparent_60%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <HandCoins size={28} className="text-primary" />
              </div>
              <h2 className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">
                Ready to Partner with CK Capital?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/55">
                Apply to the affiliate program and start earning on every qualified referral.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href="/contact">
                  <GoldButton size="lg" data-od-id="affiliates-cta-primary">
                    Apply Now <ArrowRight size={16} />
                  </GoldButton>
                </a>
              </div>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </div>
  )
}
