'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StatCounter } from '@/components/StatCounter'
import { CountdownTimer } from '@/components/CountdownTimer'
import { LogoMarquee } from '@/components/LogoMarquee'
import { CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#231E00] to-[#000000]" />
        <div className="absolute inset-0 bg-radial-gradient opacity-20" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(216, 173, 0, 0.15) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          {/* Eyebrow */}
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
              CK CAPITAL
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-white mb-6 text-balance">
            Transforming Traders into{' '}
            <span className="gradient-text">Winners</span> Globally
          </h1>

          {/* Stat Chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
            {[
              'Up to 100% Profit Split',
              'Up to $1.2M Funding Accounts',
              'Flexible Payout Cycles',
              'No Time Limit',
            ].map((stat, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-full bg-card border border-border text-foreground text-sm font-medium"
              >
                {stat}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="https://app.ckcapital.co.uk/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Start Your Trading Journey
            </Link>
            <Link
              href="#start-challenge"
              className="button-secondary"
            >
              View Trading Objectives
            </Link>
          </div>

          {/* Trustpilot Widget */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>
              <span>Rated 4.9/5 on Trustpilot</span>
              <a
                href="https://uk.trustpilot.com/review/ckcapital.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors ml-2"
              >
                View Reviews →
              </a>
            </div>
          </div>

          {/* Count-up Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StatCounter target={100} label="Max Profit Split" suffix="%" />
            <StatCounter target={1200000} label="Max Simulated Capital" suffix="$" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-muted-foreground mt-2">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: RECENT CERTIFICATES MARQUEE ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-black mb-8">Recent Trader Payouts</h2>
          <LogoMarquee
            items={[
              'Alex K. - $45,230',
              'Jordan M. - $67,890',
              'Sam L. - $34,560',
              'Casey R. - $78,920',
              'Morgan T. - $52,340',
            ]}
            duration={20}
          />
        </div>
      </section>

      {/* ===== SECTION 3: INSTANT FUNDING ANNOUNCEMENT ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="glow-card border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold">
                  Newly Launched
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Instant Funding</h3>
                <p className="text-foreground max-w-md">
                  Skip the challenge - get a funded simulated account instantly from $20. No waiting, no complex rules. Start trading immediately.
                </p>
              </div>
              <Link
                href="/instant"
                className="button-primary whitespace-nowrap"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WHY CHOOSE CK CAPITAL ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-balance text-center">
            Why Choose <span className="gradient-text">CK Capital?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'News Trading Allowed',
                description: 'Profit from high-impact news events with no restrictions on news trading strategies.'
              },
              {
                title: 'Flexible Payouts',
                description: 'Get paid on your schedule with withdrawals available whenever you want.'
              },
              {
                title: '100% Profit Split',
                description: 'Keep up to 100% of your simulated profits. No hidden commissions or fees.'
              },
              {
                title: 'Reset & Top-Up',
                description: 'Get back on track with reset options regardless of rule violations.'
              },
              {
                title: 'Competitive Spreads',
                description: 'Trade with ultra-low spreads starting from 0.0 pips on major pairs.'
              },
              {
                title: '24/7 Support',
                description: 'Expert support team available Mon-Fri to help you succeed in your journey.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glow-card group">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PAYMENT PROVIDERS ===== */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-white mb-8">Trusted Payment Partners</h2>
          <LogoMarquee
            items={[
              'Stripe',
              'PayPal',
              'Visa',
              'Mastercard',
              'Apple Pay',
              'Google Pay',
              'USDT',
              'Skrill',
            ]}
            duration={25}
          />
        </div>
      </section>

      {/* ===== SECTION 6: LIMITED-TIME OFFER ===== */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="glow-card border-2 border-primary/60 shadow-glow">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Your First Challenge<br className="hidden md:block" /> - Up to 85% Off
              </h3>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-white font-bold">
                  <span className="line-through text-muted-foreground">$88</span> → $13
                </div>
                <div className="px-4 py-2 rounded-full bg-card border border-border text-white font-semibold">
                  Code: LAUNCH2025
                </div>
              </div>

              <div className="mb-8">
                <CountdownTimer hours={2} minutes={15} seconds={30} />
              </div>

              <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">For new traders only</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">Valid until end of month</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">Applies to all account sizes</span>
                </div>
              </div>

              <Link
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                Claim Your Discount
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: PRICING / TRADING OBJECTIVES ===== */}
      <section id="start-challenge" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">
            Trading <span className="gradient-text">Objectives</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '1-Step Challenge',
                price: '$13',
                oldPrice: '$88',
                features: [
                  'Trading Period: Unlimited',
                  'Profit Target: $500 → $250',
                  'Max Daily Loss: $200',
                  'Max Loss: $400',
                  'Min Trading Days: 1',
                  'Consistency: None',
                ],
              },
              {
                name: '2-Step Challenge',
                badge: 'Most Popular',
                price: '$20',
                oldPrice: '$150',
                features: [
                  'Trading Period: Unlimited',
                  'Profit Target: $500 → $250',
                  'Max Daily Loss: $200',
                  'Max Loss: $400',
                  'Min Trading Days: 1',
                  'Consistency: 40%',
                ],
              },
              {
                name: 'Instant Funding',
                price: '$20',
                oldPrice: '$180',
                features: [
                  'Trading Period: Unlimited',
                  'Profit Target: Unlimited',
                  'Max Daily Loss: $750',
                  'Max Loss: $1,250',
                  'Min Trading Days: 1',
                  'Consistency: 20%',
                ],
              },
            ].map((plan, idx) => (
              <div key={idx} className="glow-card relative">
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{plan.oldPrice}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary w-full text-center"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: TRADER REVIEWS ===== */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">
            Our Traders <span className="gradient-text">Love Us</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Their service and response towards their users is so great, if I\'m to choose again I\'d still choose CK Capital.',
              'You can have fun playing games like Friday Night Rumble on their Discord server and win challenge accounts.',
              'I must confess that CK has one of the most responsive and vibrant customer care services.',
              'I recently joined CK, and they\'re wonderful and great with fast support. Their community looks healthy and friendly.',
              'Amazing service, support, and plans. Great job guys!',
              'The best prop firm I\'ve used. The team is incredibly responsive and helpful. Highly recommend!',
            ].map((review, idx) => (
              <div key={idx} className="glow-card">
                <div className="flex gap-1 mb-3 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed italic">
                  &ldquo;{review}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: TRADER JOURNEY / PHASE STEPPER ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">
            Your Path to <span className="gradient-text">Success</span>
          </h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Evaluation Stage',
                description: 'Display your competency by following consistency-driven trading objectives in the evaluation phase.',
              },
              {
                step: 2,
                title: 'Verification',
                description: 'Simplified objectives to verify your skills in a demo environment with simulated accounts up to $100K. Get a chance to reset if needed.',
              },
              {
                step: 3,
                title: 'Qualified Analyst',
                description: 'Earn up to 100% of your simulated profits with flexible payouts. Access total accounts up to $1.2M simulated capital.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-black font-bold text-lg">
                  {item.step}
                </div>
                {idx < 2 && (
                  <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent my-2" />
                )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: FEATURED TRADERS ===== */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">
            Featured <span className="gradient-text">Traders</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Isaac Tekeste',
                description: 'Audited verified track record over 12 years. Trading since 2008 with consistent profitability.',
              },
              {
                name: 'Komey Tetteh',
                description: '10-year audited track record. Built 2,000+ algorithmic trading bots with proven success.',
              },
            ].map((trader, idx) => (
              <div key={idx} className="glow-card flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{trader.name}</h3>
                  <p className="text-foreground mb-6">{trader.description}</p>
                </div>
                <Link
                  href="#"
                  className="button-secondary text-center"
                >
                  Watch Full Podcast →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 11: SUPPORT SECTION ===== */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title text-white mb-6 text-balance">
            Excellent Customer <span className="gradient-text">Support</span>
          </h2>

          <p className="text-lg text-foreground mb-8 leading-relaxed">
            CK Capital has been a game changer for customer support in the prop firm industry. Traders are welcomed like family and are rewarded for their skills in our competitive demo environments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Professional Discord Support',
              'Community Game Nights',
              'Comprehensive Online FAQ',
            ].map((item, idx) => (
              <div key={idx} className="glow-card">
                <p className="text-white font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 12: FINAL CTA ===== */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title text-white mb-4 text-balance">
            Let&apos;s Win Together
          </h2>
          <p className="text-lg text-foreground mb-12">
            Join thousands of traders who are already earning with CK Capital
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/ckcapital"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary flex items-center justify-center gap-2"
            >
              Join Discord
            </Link>
            <Link
              href="https://app.ckcapital.co.uk/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary flex items-center justify-center gap-2"
            >
              Start Trading Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
