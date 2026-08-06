'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { GoldButton } from '@/components/shared/GoldButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const LIST_ITEM_CLASSES = 'ml-5 list-disc space-y-2 text-sm leading-relaxed text-foreground/55'
const ORDERED_LIST_CLASSES = 'ml-5 list-decimal space-y-2 text-sm leading-relaxed text-foreground/55'

const FAQ_ITEMS = [
  {
    q: 'What is CK Capital?',
    a: (
      <p>
        CK Capital is a leading proprietary trading firm offering instant funded trading
        accounts to qualified traders worldwide. We provide challenge evaluations where
        traders can demonstrate their skills, then upgrade to verified CK Trader accounts
        with real trading capital up to $1.2M. Our traders enjoy up to 100% profit splits,
        flexible payouts, and access to 50+ trading instruments including Forex,
        Cryptocurrencies, Commodities, and Indices.
      </p>
    ),
  },
  {
    q: 'How do prop trading accounts work?',
    a: (
      <>
        <p>Our funded trading accounts follow a simple three-step process:</p>
        <ol className={ORDERED_LIST_CLASSES}>
          <li>
            <strong className="font-semibold text-foreground">Step 1 - Challenge:</strong>{' '}
            Pay a challenge fee ($13-$88) to begin evaluating your trading skills in our
            simulated environment.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Step 2 - Verification:</strong>{' '}
            Demonstrate consistency and meet profit targets in the second phase.
          </li>
          <li>
            <strong className="font-semibold text-foreground">Step 3 - Funded Account:</strong>{' '}
            Pass verification and become a CK Trader with verified real capital to trade
            live markets.
          </li>
        </ol>
      </>
    ),
  },
  {
    q: 'What profit splits do you offer?',
    a: (
      <p>
        CK Capital offers up to 100% profit splits for verified traders on funded
        accounts. This means you keep 100% of your trading profits—no commissions, no
        hidden fees. Your only costs are the initial challenge fee during evaluation. This
        competitive profit-sharing model is among the best in the prop trading industry.
      </p>
    ),
  },
  {
    q: 'How much does it cost to start?',
    a: (
      <p>
        Challenge fees range from $13 to $88 depending on your selected account size and
        challenge type. This is a one-time fee to begin your evaluation in our simulated
        trading environment. Once you become a CK Trader with a funded account, there are
        no additional fees—you simply keep your profits (up to 100%).
      </p>
    ),
  },
  {
    q: 'What account sizes are available?',
    a: (
      <>
        <p>We offer flexible account sizes to match your trading style:</p>
        <ul className={LIST_ITEM_CLASSES}>
          <li>$2,500 funded account with lower risk parameters</li>
          <li>$5,000 standard funded account</li>
          <li>$10,000 professional account</li>
          <li>$25,000 advanced account</li>
          <li>$50,000 premium account</li>
          <li>$100,000+ institutional accounts</li>
          <li>Scale up to $1.2M with consistent performance</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What platforms do you support?',
    a: (
      <p>
        CK Capital supports both industry-leading trading platforms: MetaTrader 5 (MT5)
        and TradeLocker. Both platforms offer advanced charting, technical analysis tools,
        and institutional-grade trading features. You can choose your preferred platform
        when starting your challenge.
      </p>
    ),
  },
  {
    q: 'What can I trade?',
    a: (
      <>
        <p>CK Capital traders have access to 50+ trading instruments:</p>
        <ul className={LIST_ITEM_CLASSES}>
          <li>Forex pairs (major, minor, and exotic pairs)</li>
          <li>Cryptocurrencies (Bitcoin, Ethereum, Litecoin, and more)</li>
          <li>Commodities (gold, oil, natural gas)</li>
          <li>Indices (US 500, UK 100, Germany 40)</li>
          <li>CFDs on various equities</li>
        </ul>
      </>
    ),
  },
  {
    q: 'Can I trade the news?',
    a: (
      <p>
        Yes! News trading is allowed on CK Capital funded accounts. We encourage traders
        to capitalize on market-moving news events with proper risk management. High-impact
        economic releases and central bank announcements present significant trading
        opportunities for skilled traders.
      </p>
    ),
  },
  {
    q: 'How do withdrawals work?',
    a: (
      <p>
        Withdrawals are flexible and straightforward. Once you're a verified CK Trader,
        you can withdraw your profits on your schedule with no withdrawal restrictions.
        There are no minimum holding periods or quarterly limits. The withdrawal process
        typically completes within 3-5 business days.
      </p>
    ),
  },
  {
    q: 'What are the daily loss limits?',
    a: (
      <p>
        Daily loss limits vary by account size but typically range from 5% during
        challenge phase to 10% for CK Trader accounts. These limits protect your capital
        and enforce disciplined risk management. If you hit your daily loss limit, trading
        stops for that day automatically.
      </p>
    ),
  },
  {
    q: 'How long is the evaluation process?',
    a: (
      <p>
        The evaluation timeline depends on your trading activity. Most traders complete
        the 1-step challenge within 2-4 weeks, though faster traders can finish in days.
        The 2-step challenge typically takes 4-8 weeks. There's no maximum time limit—you
        trade at your own pace while maintaining your profit targets.
      </p>
    ),
  },
  {
    q: 'Is there customer support?',
    a: (
      <p>
        Yes! CK Capital provides 24/7 customer support Monday through Friday. Our support
        team is available via email, live chat, and Discord. We also have an active trading
        community where traders share insights, trading setups, and market analysis.
      </p>
    ),
  },
  {
    q: 'What trading experience do I need?',
    a: (
      <p>
        While beginners can apply, we recommend at least some trading experience or
        education. Most successful CK Traders have 1-3 years of active trading background.
        If you're new to trading, we recommend starting with educational resources and
        paper trading before evaluating for funded accounts.
      </p>
    ),
  },
  {
    q: 'Are there geographic restrictions?',
    a: (
      <p>
        CK Capital accepts traders from most countries worldwide. However, certain
        jurisdictions may have restrictions due to regulatory requirements. During account
        registration, you'll be informed of any restrictions applicable to your location.
      </p>
    ),
  },
  {
    q: 'What are the different challenge types?',
    a: (
      <>
        <p>We offer multiple challenge types to suit different trading goals:</p>
        <ul className={LIST_ITEM_CLASSES}>
          <li>
            <strong className="font-semibold text-foreground">1-Step Challenge:</strong>{' '}
            Fast-track evaluation with single profit target
          </li>
          <li>
            <strong className="font-semibold text-foreground">2-Step Challenge:</strong>{' '}
            Two-phase verification for stricter performance testing
          </li>
          <li>
            <strong className="font-semibold text-foreground">Instant Funding:</strong>{' '}
            Quick approval for qualified traders wanting rapid account access
          </li>
        </ul>
      </>
    ),
  },
]

export function FaqContent() {
  return (
    <div className="min-h-screen bg-background" data-od-id="faq-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="faq-hero">
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
                FAQ
                <span className="text-primary/40">·</span>
                Everything You Need to Know
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="faq-hero-title"
            >
              Frequently Asked <span className="shimmer-text">Questions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Get answers to common questions about CK Capital prop trading.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─────────────── Accordion ─────────────── */}
      <section className="bg-muted py-16 md:py-24" data-od-id="faq-accordion">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionReveal>
              <Accordion multiple={false} className="space-y-2">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={String(i)}
                    className="rounded-xl border border-foreground/10 bg-foreground/[0.03] px-5 transition-all data-[open]:border-primary/30 data-[open]:bg-foreground/[0.05]"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:text-primary hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-foreground/55">
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
      <section className="bg-background py-16 md:py-24" data-od-id="faq-cta">
        <Container>
          <SectionReveal className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r dark-panel from-[#1a1508] to-[#0d0b06] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.10),_transparent_60%)]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <MessageCircle size={28} className="text-primary" />
              </div>
              <h2 className="font-[family-name:var(--font-inter-tight)] text-2xl font-extrabold text-foreground md:text-3xl">
                Ready to Start Your Prop Trading Journey?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/55">
                Getting started with CK Capital is simple. Choose your challenge type,
                select your account size, and begin evaluating your trading skills. Once
                you demonstrate consistency and meet profit targets, you'll be upgraded to
                a verified CK Trader account with real capital.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoldButton size="lg" data-od-id="faq-cta-primary">
                    Start Your Challenge <ArrowRight size={16} />
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
