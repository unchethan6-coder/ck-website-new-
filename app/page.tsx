'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StatCounter } from '@/components/StatCounter'
import { CountdownTimer } from '@/components/CountdownTimer'
import { LogoMarquee } from '@/components/LogoMarquee'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [selectedChallengeType, setSelectedChallengeType] = useState('all')
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
        {/* Background gradient - Unified dark theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]" />
        <div className="absolute inset-0" style={{
          background: '#ffffff',
          opacity: 0.08,
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
            <StatCounter target={100} label="Max Profit Split" format="percent" />
            <StatCounter target={1200000} label="Max Simulated Capital" format="currency" />
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div 
            className="glow-card border-primary/30 p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-black/10 border border-black/20 text-black text-sm font-semibold">
                  Newly Launched
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">Instant Funding</h3>
                <p className="text-black/70 max-w-md">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-black mb-12 text-balance text-center">
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
              <div 
                key={idx} 
                className="glow-card group"
                style={{
                  background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                }}
              >
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-primary transition-colors">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-black mb-8">Trusted Payment Partners</h2>
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div 
            className="glow-card border-2 border-primary/60 shadow-glow"
            style={{
              background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
              backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
            }}
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Your First Challenge<br className="hidden md:block" /> - Up to 85% Off
              </h3>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div 
                  className="px-4 py-2 rounded-full border border-transparent text-black font-bold"
                  style={{
                    background: 'linear-gradient(90deg, #D89A2E 0%, #E8BE4C 25%, #FCE17B 50%, #E8BE4C 75%, #D79930 100%)',
                  }}
                >
                  <span className="line-through text-black/50">$88</span> → $13
                </div>
                <div 
                  className="px-4 py-2 rounded-full border border-transparent text-black font-semibold"
                  style={{
                    background: 'linear-gradient(90deg, #D89A2E 0%, #E8BE4C 25%, #FCE17B 50%, #E8BE4C 75%, #D79930 100%)',
                  }}
                >
                  Code: LAUNCH2025
                </div>
              </div>

              <div className="mb-8">
                <CountdownTimer hours={2} minutes={15} seconds={30} />
              </div>

              <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 text-sm">For new traders only</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 text-sm">Valid until end of month</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-black/70 text-sm">Applies to all account sizes</span>
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
      <section id="start-challenge" className="py-16 scroll-mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-black mb-2">
              Buckle Up, Your <span className="gradient-text">Journey Starts Here!</span>
            </h2>
            <p className="text-black/70 mb-8">
              1-Step, 2-Step, or Zero. Multiple routes to match your trading style and budget.
            </p>

            {/* Tab Bar */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { id: 'standard', label: 'Standard' },
                { id: 'middleweight', label: 'Middleweight' },
                { id: 'lightweight', label: 'Lightweight' },
                { id: '1step', label: '1 Step' },
                { id: 'instant', label: 'Instant Funding' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedChallengeType(tab.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedChallengeType === tab.id
                      ? 'bg-black text-white border-2 border-black'
                      : 'bg-black/5 text-black border-2 border-black/10 hover:border-black/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Account Size Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                size: '$2.5K',
                price: '$9',
                oldPrice: '$99',
                badge: null,
                type: 'standard',
                features: {
                  phase1: '$200',
                  phase2: '$125',
                  maxDaily: '$80',
                  maxLoss: '$200',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '30%',
                },
              },
              {
                size: '$5K',
                price: '$13',
                oldPrice: '$99',
                badge: null,
                type: 'standard',
                features: {
                  phase1: '$400',
                  phase2: '$250',
                  maxDaily: '$200',
                  maxLoss: '$400',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '30%',
                },
              },
              {
                size: '$10K',
                price: '$19',
                oldPrice: '$99',
                badge: 'MOST POPULAR',
                type: 'middleweight',
                features: {
                  phase1: '$1,000',
                  phase2: '$500',
                  maxDaily: '$400',
                  maxLoss: '$800',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '30%',
                },
              },
              {
                size: '$25K',
                price: '$68.40',
                oldPrice: '$274.50',
                badge: null,
                type: 'lightweight',
                features: {
                  phase1: '$2,500',
                  phase2: '$1,250',
                  maxDaily: '$1,000',
                  maxLoss: '$2,000',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '30%',
                },
              },
              {
                size: '$50K',
                price: '$98.40',
                oldPrice: '$394.00',
                badge: null,
                type: 'lightweight',
                features: {
                  phase1: '$5,000',
                  phase2: '$2,500',
                  maxDaily: '$2,000',
                  maxLoss: '$4,000',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '30%',
                },
              },
              {
                size: '$100K',
                price: '$176.40',
                oldPrice: '$705.60',
                badge: null,
                type: '1step',
                features: {
                  phase1: '$10,000',
                  phase2: '$5,000',
                  maxDaily: '$4,000',
                  maxLoss: '$8,000',
                  period: 'Unlimited',
                  minDays: '1',
                  profitSplit: 'Up to 100%',
                  consistency: '20%',
                },
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`glow-card relative transition-all ${
                  card.badge
                    ? 'md:scale-105 ring-2 ring-primary'
                    : ''
                } ${selectedChallengeType === 'all' || selectedChallengeType === card.type ? 'block' : 'hidden'}`}
                style={idx !== 2 ? {
                  background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                } : undefined}
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold">
                    {card.badge}
                  </div>
                )}
                <div className="text-xs text-black/50 uppercase tracking-wide mb-2">Account Size</div>
                <h3 className="text-3xl font-bold text-black mb-1">{card.size}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-bold text-primary">${card.price}</span>
                  <span className="text-xs text-black/40 line-through">${card.oldPrice}</span>
                </div>
                
                <Link
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary w-full text-center mb-6"
                >
                  Buy Challenge
                </Link>

                <div className="space-y-2 text-sm text-black/70">
                  <div className="flex justify-between">
                    <span>Phase 1 Target</span>
                    <span className="font-semibold text-black">{card.features.phase1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phase 2 Target</span>
                    <span className="font-semibold text-black">{card.features.phase2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Daily Loss</span>
                    <span className="font-semibold text-black">{card.features.maxDaily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Loss</span>
                    <span className="font-semibold text-black">{card.features.maxLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trading Period</span>
                    <span className="font-semibold text-black">{card.features.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min Trading Days</span>
                    <span className="font-semibold text-black">{card.features.minDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit Split</span>
                    <span className="font-semibold text-primary">{card.features.profitSplit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consistency Rule</span>
                    <span className="font-semibold text-black">{card.features.consistency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <p className="text-center text-sm text-black/60 mt-12">
            All challenges include live market trading on real instruments during simulated evaluation periods.
          </p>
        </div>
      </section>

      {/* ===== SECTION 8: TRADER REVIEWS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-black mb-12 text-center">
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
              <div 
                key={idx} 
                className="glow-card"
                style={{
                  background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                }}
              >
                <div className="flex gap-1 mb-3 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-black/70 text-sm leading-relaxed italic">
                  &ldquo;{review}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: TRADER JOURNEY / PHASE STEPPER ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-black mb-12 text-center">
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
                  <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-black/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: FEATURED TRADERS ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-black mb-12 text-center">
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
              <div 
                key={idx} 
                className="glow-card flex flex-col"
                style={{
                  background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                }}
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-2">{trader.name}</h3>
                  <p className="text-black/70 mb-6">{trader.description}</p>
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="section-title text-black mb-6 text-balance">
            Excellent Customer <span className="gradient-text">Support</span>
          </h2>

          <p className="text-lg text-black/70 mb-8 leading-relaxed">
            CK Capital has been a game changer for customer support in the prop firm industry. Traders are welcomed like family and are rewarded for their skills in our competitive demo environments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              'Professional Discord Support',
              'Community Game Nights',
              'Comprehensive Online FAQ',
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="glow-card"
                style={{
                  background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                }}
              >
                <p className="text-black font-semibold">{item}</p>
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
