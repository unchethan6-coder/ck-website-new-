'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { StatCounter } from '@/components/StatCounter'
import { CountdownTimer } from '@/components/CountdownTimer'
import { LogoMarquee } from '@/components/LogoMarquee'
import { CandlestickBackground } from '@/components/CandlestickBackground'
import { PromoPopup } from '@/components/PromoPopup'
import { TradingPlatformsSection } from '@/components/TradingPlatformsSection'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [selectedChallengeType, setSelectedChallengeType] = useState('all')
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PromoPopup />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12">
        {/* Candlestick animated background */}
        <CandlestickBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          {/* Main Heading */}
          <h1 className="hero-title text-[#111111] mb-6 text-balance">
            Traders Transforming Into Winners
          </h1>

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
              className="button-secondary-dark"
            >
              View Trading Objectives
            </Link>
          </div>

          {/* Trustpilot Widget */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[#4B5563]">
              <div className="flex gap-0.5 text-[#00B67A]">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span>Rated 4.9/5 on Trustpilot</span>
              <a
                href="https://uk.trustpilot.com/review/ckcapital.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00B67A] font-medium hover:underline"
              >
                View Reviews →
              </a>
            </div>
          </div>

          {/* Count-up Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
            <StatCounter target={100} label="Max Profit Split" format="percent" />
            <StatCounter target={1200000} label="Max Simulated Capital" format="currency" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-[#4B5563] mt-2">Support Available</div>
            </div>
          </div>

          {/* Additional Stats Bar */}
          <div className="py-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-black">$262M+</div>
                <div className="text-xs md:text-sm text-[#4B5563]">Rewards Distributed</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-black">3M+</div>
                <div className="text-xs md:text-sm text-black/70 mt-2">Traders Worldwide</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-black">195+</div>
                <div className="text-xs md:text-sm text-black/70 mt-2">Countries Serviced</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: INSTANT FUNDING ANNOUNCEMENT ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div 
            className="glow-card border-primary/30 p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-block mb-3 md:mb-4 px-3 py-1 rounded-full bg-black/10 border border-black/20 text-black text-xs md:text-sm font-semibold">
                  Newly Launched
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-black mb-2">Instant Funding</h3>
                <p className="text-sm md:text-base text-black/70 max-w-md">
                  Skip the challenge - get a funded simulated account instantly from $20. No waiting, no complex rules. Start trading immediately.
                </p>
              </div>
              <Link
                href="/instant"
                className="button-primary whitespace-nowrap w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WHY CHOOSE CK CAPITAL ===== */}
      <section className="py-12 md:py-16 bg-white">
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
                <p className="text-black/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PAYMENT PROVIDERS ===== */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-xl md:text-2xl font-bold text-black mb-8">Trusted Payment Partners</h2>
        </div>
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
      </section>

      {/* ===== SECTION 5.5: TRADING PLATFORMS WITH LAPTOP ===== */}
      <TradingPlatformsSection />

      {/* ===== SECTION 6: LIMITED-TIME OFFER ===== */}
      <section className="py-12 md:py-16 bg-white">
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
                  Code: LAUNCH2026
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
      <section id="start-challenge" className="py-16 md:py-20 scroll-mt-20 bg-white">
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

          {/* Account Size Cards Grid - Horizontal Scrollable */}
          <div className="overflow-x-auto pb-4 mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="flex gap-4 md:gap-6 min-w-max pb-4">
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
                  className={`glow-card relative flex-shrink-0 w-72 sm:w-80 transition-all ${
                    card.badge
                      ? 'ring-2 ring-primary md:scale-105'
                      : ''
                  } ${selectedChallengeType === 'all' || selectedChallengeType === card.type ? 'block' : 'hidden'}`}
                  style={{
                    background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                    backgroundImage: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)',
                  }}
                >
                  {card.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold">
                      {card.badge}
                    </div>
                  )}
                  <div className="text-xs text-black/50 uppercase tracking-wide mb-2">Account Size</div>
                  <h3 className="text-3xl font-bold text-black mb-1">{card.size}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl font-bold text-[#A87B0B]">{card.price}</span>
                    <span className="text-xs text-black/40 line-through">{card.oldPrice}</span>
                  </div>
                  
                  <Link
                    href="https://app.ckcapital.co.uk/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary block w-full text-center mb-6"
                    aria-label={`Buy ${card.size} challenge for ${card.price}`}
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
                      <span className="font-semibold text-[#A87B0B]">{card.features.profitSplit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consistency Rule</span>
                      <span className="font-semibold text-black">{card.features.consistency}</span>
                    </div>
                    
                    {/* Copy Code Badge */}
                    <div 
                      className="mt-4 px-3 py-2 rounded-lg border-2 border-dashed flex items-center gap-2 cursor-pointer hover:bg-opacity-80 transition-all justify-center"
                      style={{
                        backgroundColor: '#1a4d2e',
                        borderColor: '#4CAF50',
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(`NEW25-${card.size.replace('$', '').replace('K', '')}`);
                      }}
                      title="Click to copy code"
                    >
                      <span className="text-white font-bold text-sm">{`NEW25-${card.size.replace('$', '').replace('K', '')}`}</span>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-sm text-black/60 mt-12">
            All challenges include live market trading on real instruments during simulated evaluation periods.
          </p>

          {/* Pricing Table */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Starter',
                  price: '$99',
                  period: 'one-time',
                  features: ['Up to $50K Account', '80% Profit Split', 'Basic Support', 'Educational Resources'],
                  highlighted: false,
                },
                {
                  title: 'Professional',
                  price: '$199',
                  period: 'one-time',
                  features: ['Up to $100K Account', '85% Profit Split', 'Priority Support', 'Advanced Tools', 'Consultation'],
                  highlighted: true,
                },
                {
                  title: 'Elite',
                  price: '$299',
                  period: 'one-time',
                  features: ['Up to $250K Account', '90% Profit Split', '24/7 VIP Support', 'Premium Tools', 'Dedicated Manager'],
                  highlighted: false,
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`p-6 md:p-8 rounded-lg border-2 transition-all ${
                    plan.highlighted
                      ? 'border-[#D4AF37] bg-gradient-to-br from-[#FFF8E7] to-[#FFFBF0] shadow-lg md:scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="text-center mb-4 text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.title}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-black">{plan.price}</span>
                    <span className="text-gray-600 ml-2">({plan.period})</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <span className="text-[#D4AF37]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-[#D4AF37] text-black hover:bg-[#C4A02D]'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="mt-16 flex justify-center">
            <div 
              className="px-6 py-4 rounded-lg border-2 border-dashed flex items-center gap-3 cursor-pointer hover:bg-opacity-80 transition-all"
              style={{
                backgroundColor: '#1a4d2e',
                borderColor: '#4CAF50',
              }}
              onClick={() => {
                navigator.clipboard.writeText('NEW25');
              }}
            >
              <span className="text-white font-bold text-lg">NEW25</span>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: TRADER REVIEWS ===== */}
      <section className="py-12 md:py-16 bg-white">
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
      <section className="py-12 md:py-16 bg-white">
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

      {/* ===== SECTION 10A: TOP TRADERS LEADERBOARD ===== */}
      <section className="py-12 md:py-16 bg-[#070708]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Rewarding our best traders
          </h2>

          {/* Auto Scrolling Traders */}
          <div className="mb-12 md:mb-16 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="auto-scroll">
              {[
                { name: 'Kyros Sofokleious', flag: '🇨🇾', earnings: '$16886.17', time: '15 hours' },
                { name: 'Nicolai Ortving Madsen', flag: '🇩🇰', earnings: '$16428.81', time: '10 hours' },
                { name: 'Malak Reiad', flag: '🇪🇬', earnings: '$16377.16', time: '7 hours' },
                { name: 'Samuel Dickson', flag: '🇬🇧', earnings: '$16022.32', time: '7 hours' },
                { name: 'Constantinos Kapelonis', flag: '🇬🇷', earnings: '$16000', time: '14 hours' },
                { name: 'Adil Mohammed', flag: '🇺🇿', earnings: '$15397.12', time: '8 hours' },
                { name: 'Dmitri Volkov', flag: '🇷🇺', earnings: '$15876.45', time: '12 hours' },
                { name: 'Sofia Chen', flag: '🇨🇳', earnings: '$15654.33', time: '6 hours' },
              ].map((trader, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-[#FFD700]/20 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 backdrop-blur-sm hover:from-[#FFD700]/20 hover:to-[#FFA500]/20 transition-all flex-shrink-0 w-72 md:w-80"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    <span className="text-black font-bold text-base md:text-lg">
                      {trader.name.charAt(0)}
                    </span>
                  </div>

                  {/* Trader Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-xs md:text-sm truncate">
                      {trader.name} {trader.flag}
                    </p>
                  </div>

                  {/* Earnings */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="text-[#FFD700] font-bold text-xs md:text-sm">{trader.earnings}</p>
                    <span className="px-2 py-0.5 md:py-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-semibold shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                      {trader.time}
                    </span>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { name: 'Kyros Sofokleious', flag: '🇨🇾', earnings: '$16886.17', time: '15 hours' },
                { name: 'Nicolai Ortving Madsen', flag: '🇩🇰', earnings: '$16428.81', time: '10 hours' },
                { name: 'Malak Reiad', flag: '🇪🇬', earnings: '$16377.16', time: '7 hours' },
                { name: 'Samuel Dickson', flag: '🇬🇧', earnings: '$16022.32', time: '7 hours' },
                { name: 'Constantinos Kapelonis', flag: '🇬🇷', earnings: '$16000', time: '14 hours' },
                { name: 'Adil Mohammed', flag: '🇺🇿', earnings: '$15397.12', time: '8 hours' },
                { name: 'Dmitri Volkov', flag: '🇷🇺', earnings: '$15876.45', time: '12 hours' },
                { name: 'Sofia Chen', flag: '🇨🇳', earnings: '$15654.33', time: '6 hours' },
              ].map((trader, idx) => (
                <div
                  key={`duplicate-${idx}`}
                  className="flex items-center gap-3 px-3 py-2 md:gap-4 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-[#FFD700]/20 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 backdrop-blur-sm hover:from-[#FFD700]/20 hover:to-[#FFA500]/20 transition-all flex-shrink-0 w-72 md:w-80"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    <span className="text-black font-bold text-base md:text-lg">
                      {trader.name.charAt(0)}
                    </span>
                  </div>

                  {/* Trader Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-xs md:text-sm truncate">
                      {trader.name} {trader.flag}
                    </p>
                  </div>

                  {/* Earnings */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <p className="text-[#FFD700] font-bold text-xs md:text-sm">{trader.earnings}</p>
                    <span className="px-2 py-0.5 md:py-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-semibold shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                      {trader.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics - Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-2">500.9K+</p>
              <p className="text-sm text-white/60">CK Capital Accounts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-2">122.8K+</p>
              <p className="text-sm text-white/60">Rewarded Traders</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-2">$100.1M+</p>
              <p className="text-sm text-white/60">Total Rewarded</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 10: FEATURED TRADERS ===== */}
      <section className="py-12 md:py-16 bg-white">
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

      {/* ===== SECTION 11: YOUTUBE TESTIMONIALS ===== */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-balance">
              Hear It From <span className="gradient-text">Our Traders</span>
            </h2>
            <p className="text-base md:text-lg text-black/70 max-w-2xl mx-auto text-pretty">
              Watch real traders share their experiences and success stories with CK Capital
            </p>
          </div>

          {/* YouTube Videos with Right-to-Left Animation */}
          <div className="relative overflow-hidden">
            <style>{`
              @keyframes float-rtl {
                0% {
                  transform: translateX(100%);
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  transform: translateX(-100%);
                  opacity: 0;
                }
              }
              .float-video {
                animation: float-rtl 12s linear infinite;
              }
            `}</style>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  id: '5RjtGHPcuMM',
                  title: 'Trader Success Story #1',
                  url: 'https://youtu.be/5RjtGHPcuMM?si=nJfDDjZwX1XTg0Ym'
                },
                {
                  id: 'LNXpq8_PwxU',
                  title: 'Trader Success Story #2',
                  url: 'https://youtu.be/LNXpq8_PwxU?si=mxjhNZAH3pUSNeGF'
                },
                {
                  id: 'bZq8jtD9acY',
                  title: 'Trader Success Story #3',
                  url: 'https://youtu.be/bZq8jtD9acY?si=KjqVmedBEM3XW44_'
                },
                {
                  id: '8NQAWtlh_ws',
                  title: 'Trader Success Story #4',
                  url: 'https://youtu.be/8NQAWtlh_ws?si=NevnGKjihokzXjQU'
                }
              ].map((video, idx) => (
                <div 
                  key={idx}
                  className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Floating animation container */}
                  <div className="relative w-full aspect-video bg-black/90 flex items-center justify-center">
                    {/* YouTube Embed */}
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold">{video.title}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors text-sm mt-2 inline-block"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center mt-12">
              <p className="text-black/70 mb-6">
                Want to share your success story? Join our community of successful traders
              </p>
              <Link
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary inline-flex items-center justify-center gap-2"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 12: SUPPORT SECTION ===== */}
      <section className="py-12 md:py-16 bg-white">
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
      <section className="py-12 md:py-16 bg-card/20" style={{ backgroundColor: '#010015' }}>
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
