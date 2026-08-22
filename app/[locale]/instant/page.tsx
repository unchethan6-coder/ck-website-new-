'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Check, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldButton } from '@/components/shared/GoldButton'
import { Aurora } from '@/components/fx/Aurora'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { InstantFundingVisual } from '@/components/shared/InstantFundingVisual'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function InstantPage() {
  const t = useTranslations('instant')
  const tFaq = useTranslations('faq')

  const benefits = [
    { title: 'No Evaluation', description: 'Skip the multi-phase challenge. Access your simulated account in minutes.' },
    { title: 'Immediate Access', description: 'Start executing trading strategies right away with zero waiting periods.' },
    { title: 'Flexible Funding', description: 'Choose account sizes from $5K up to $50K with instant account setup.' },
    { title: 'Generous Rules', description: 'Balanced profit parameters and realistic loss limits designed for long-term consistency.' },
    { title: 'Lower Consistency', description: 'Only 20% consistency requirement to build your simulated track record quickly.' },
    { title: 'Up to 100% Profit Split', description: 'Eligible Qualified Analysts keep up to 100% of eligible simulated profits.' },
  ]

  const pricing = [
    { amount: '$5K', price: '$20' },
    { amount: '$10K', price: '$40' },
    { amount: '$25K', price: '$100' },
    { amount: '$50K', price: '$200' },
    { amount: '$100K', price: 'Custom' },
  ]

  const comparison = [
    { feature: 'Evaluation Required', instant: 'No Phase 1/2', challenge: '1 or 2 Steps' },
    { feature: 'Time to Trade', instant: 'Immediate', challenge: 'After Evaluation' },
    { feature: 'Max Daily Loss', instant: '3%', challenge: '4%' },
    { feature: 'Max Overall Loss', instant: '5%', challenge: '8%' },
    { feature: 'Consistency', instant: '20%', challenge: 'Rule-based' },
    { feature: 'Simulated Profit Share', instant: 'Up to 100%', challenge: 'Up to 100%' },
  ]

  const instantFaqs = [
    {
      q: tFaq('items.instantPayouts.q'),
      a: tFaq('items.instantPayouts.a'),
    },
    {
      q: tFaq('items.timeLimit.q'),
      a: tFaq('items.timeLimit.a'),
    },
    {
      q: tFaq('items.profitSplit.q'),
      a: tFaq('items.profitSplit.a'),
    },
    {
      q: tFaq('items.platforms.q'),
      a: tFaq('items.platforms.a'),
    },
  ]

  return (
    <div className="min-h-screen bg-background" data-od-id="instant-page">

      {/* ─────────────── Hero (DARK) ─────────────── */}
      <section className="relative isolate -mt-[72px] md:-mt-[76px] flex min-h-[calc(100dvh-44px)] flex-col overflow-hidden border-b border-foreground/[0.07] bg-[#070709]" data-od-id="instant-hero">
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] rounded-full opacity-70 fx-hero-glow-1" />
          <div className="absolute top-[15%] -left-[10%] w-[60%] h-[70%] rounded-full opacity-60 fx-hero-glow-2" />
          <div className="absolute top-[20%] -right-[10%] w-[55%] h-[65%] rounded-full opacity-55 fx-hero-glow-3" />
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full opacity-40 fx-hero-glow-4" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[2]">
          <Aurora variant="hero" grid className="absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 pt-20 sm:px-6 md:pb-10 md:pt-24 lg:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            <div className="lg:col-span-7 xl:col-span-6 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  <Sparkles size={12} /> {t('badge')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-[clamp(38px,7vw,44px)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[68px]"
                data-od-id="instant-hero-title"
              >
                {t('title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-5 max-w-xl text-[14px] leading-relaxed text-white/60 sm:text-[15px]"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <a href="#instant-pricing" data-od-id="instant-hero-primary">
                  <GoldButton size="lg">
                    {t('getStarted')} <ArrowRight size={16} />
                  </GoldButton>
                </a>
                <a
                  href="#instant-comparison"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                >
                  {t('comparisonTitle')} <ArrowRight size={15} />
                </a>
              </motion.div>

              <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                <span className="inline-flex items-center gap-2"><Zap size={14} className="text-primary" /> Instant Activation</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-secondary" /> Direct Simulated Funding</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 xl:col-span-6 min-w-0"
              data-od-id="instant-hero-dashboard"
            >
              <InstantFundingVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Benefits Grid (LIGHT) ─────────────── */}
      <section className="bg-[#F6F7F9] border-b border-[#E5E7EB] py-16 md:py-24 text-[#0A0A0C]" data-od-id="instant-benefits">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              PROGRAM ADVANTAGES
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-[#0A0A0C] md:text-5xl">
              {t('whyTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Zap size={20} />
                </div>
                <h3 className="font-[family-name:var(--font-inter-tight)] text-lg font-bold text-[#0A0A0C] mb-2">{item.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── Instant Pricing (DARK) ─────────────── */}
      <section id="instant-pricing" className="scroll-mt-24 bg-[#0D0C08] py-16 md:py-24 text-white" data-od-id="instant-pricing">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              ACCOUNT TIERS
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-white md:text-5xl">
              {t('pricesTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pricing.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12100A] p-6 text-center shadow-lg hover:border-primary/40 transition-all hover:-translate-y-1"
              >
                <div>
                  <p className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-primary mb-2">{item.amount}</p>
                  <p className="text-white/60 text-sm mb-6">From {item.price}</p>
                </div>
                <a
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary/20 transition-colors"
                >
                  {t('getStarted')} <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── Comparison Table (LIGHT) ─────────────── */}
      <section id="instant-comparison" className="scroll-mt-24 bg-[#F6F7F9] border-y border-[#E5E7EB] py-16 md:py-24 text-[#0A0A0C]" data-od-id="instant-comparison">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              HEAD-TO-HEAD
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-[#0A0A0C] md:text-5xl">
              {t('comparisonTitle')}
            </h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F6F7F9] text-[11px] font-bold uppercase tracking-[0.16em]">
                  <th className="text-left py-4 px-6 text-[#6B7280] font-semibold">{t('feature')}</th>
                  <th className="text-center py-4 px-6 text-[#D4AF37] font-bold">{t('instantCol')}</th>
                  <th className="text-center py-4 px-6 text-[#0A0A0C] font-semibold">{t('challengeCol')}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F6F7F9]/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#0A0A0C]">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-[#D4AF37] font-bold">{row.instant}</td>
                    <td className="py-4 px-6 text-center text-[#4B5563]">{row.challenge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ─────────────── FAQ (DARK) ─────────────── */}
      <section className="bg-[#0D0C08] py-16 md:py-24 text-white" data-od-id="instant-faq">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              QUESTIONS & ANSWERS
            </p>
            <h2 className="font-[family-name:var(--font-inter-tight)] text-3xl font-extrabold text-white md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion multiple={false} className="space-y-3">
              {instantFaqs.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={String(idx)}
                  className="rounded-2xl border border-white/10 bg-[#12100A] px-6 transition-all data-[open]:border-primary/40"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold text-white hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-white/60">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* ─────────────── Final CTA (LIGHT) ─────────────── */}
      <section className="relative overflow-hidden bg-[#F6F7F9] border-t border-[#E5E7EB] py-20 md:py-28 text-[#111827]" data-od-id="instant-closing-cta">
        <Container className="relative text-center">
          <SectionReveal>
            <Zap className="mx-auto text-[#D4AF37]" size={32} />
            <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold tracking-[-0.05em] text-[#0A0A0C] md:text-6xl">
              Ready for Instant Simulated Funding?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#4B5563]">
              Skip the evaluation targets and trade with an active simulated account today.
            </p>
            <div className="mt-8">
              <a href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer">
                <GoldButton size="lg">
                  Get Instant Account <ArrowRight size={16} />
                </GoldButton>
              </a>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </div>
  )
}
