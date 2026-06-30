'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PromoBar } from '@/components/PromoBar'
import { MarketTicker } from '@/components/MarketTicker'
import { PaymentMarquee } from '@/components/PaymentMarquee'
import { PromoPopup } from '@/components/PromoPopup'
import { FeaturedPayouts } from '@/components/FeaturedPayouts'
import { InstantFundingBanner } from '@/components/InstantFundingBanner'
import { HomeDashboardPreview } from '@/components/home/HomeDashboardPreview'
import { MobilePricingSelector } from '@/components/home/MobilePricingSelector'
import { SupportSection } from '@/components/SupportSection'

const ObjectivesTable = dynamic(() => import('@/components/ObjectivesTable').then(mod => ({ default: mod.ObjectivesTable })), { ssr: false })
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials').then(mod => ({ default: mod.VideoTestimonials })), { ssr: false })

type ChallengeTypeKey = 'standard' | 'middleweight' | 'lightweight' | '1step' | 'instant'

const CHALLENGE_TABS = [
  { id: 'standard', label: 'Standard', note: 'Classic 2-step route' },
  { id: 'middleweight', label: 'Middleweight', note: 'Balanced objectives' },
  { id: 'lightweight', label: 'Lightweight', note: 'Lower target route' },
  { id: '1step', label: '1 Step', note: 'Direct access model' },
  { id: 'instant', label: 'Instant', note: 'Instant route' },
] as const

const SPLIT: Record<ChallengeTypeKey, string> = { 
  standard: 'Up to 100%', middleweight: 'Up to 100%', lightweight: 'Up to 100%', 
  '1step': 'Up to 100%', instant: 'Bi-weekly 50%' 
}

const CHALLENGE_DATA: Record<ChallengeTypeKey, Record<string, string[]>> = {
  standard: { '$2.5K': ['$250', '$125', '$80', '$200', 'N/A'], '$5K': ['$500', '$250', '$200', '$400', 'N/A'], '$10K': ['$1,000', '$500', '$400', '$800', 'N/A'], '$25K': ['$2,500', '$1,250', '$1,000', '$2,000', 'N/A'], '$50K': ['$5,000', '$2,500', '$2,000', '$4,000', 'N/A'], '$100K': ['$10,000', '$5,000', '$4,000', '$8,000', 'N/A'] },
  middleweight: { '$2.5K': ['$200', '$125', '$80', '$300', '30%'], '$5K': ['$400', '$250', '$200', '$600', '30%'], '$10K': ['$800', '$500', '$400', '$1,200', '30%'], '$25K': ['$2,000', '$1,250', '$1,000', '$3,000', '30%'], '$50K': ['$4,000', '$2,500', '$2,000', '$6,000', '30%'], '$100K': ['$8,000', '$5,000', '$4,000', '$12,000', '30%'] },
  lightweight: { '$2.5K': ['$150', '$150', '$80', '$200', '50%'], '$5K': ['$300', '$300', '$200', '$400', '50%'], '$10K': ['$600', '$600', '$400', '$800', '50%'], '$25K': ['$1,500', '$1,500', '$1,000', '$2,000', '50%'], '$50K': ['$3,000', '$3,000', '$2,000', '$4,000', '50%'], '$100K': ['$6,000', '$6,000', '$4,000', '$8,000', '50%'] },
  '1step': { '$2.5K': ['$250', '$0', '$80', '$150', 'N/A'], '$5K': ['$500', '$0', '$200', '$300', 'N/A'], '$10K': ['$1,000', '$0', '$400', '$600', 'N/A'], '$25K': ['$2,500', '$0', '$1,000', '$1,500', 'N/A'], '$50K': ['$5,000', '$0', '$2,000', '$3,000', 'N/A'], '$100K': ['$10,000', '$0', '$4,000', '$6,000', 'N/A'] },
  instant: { '$5K': ['$0', '$0', '$150', '$250', '20%'], '$10K': ['$0', '$0', '$300', '$500', '20%'], '$25K': ['$0', '$0', '$750', '$1,250', '20%'], '$50K': ['$0', '$0', '$1,500', '$2,500', '20%'] },
}

const BASE_CARDS = [
  { size: '$2.5K', price: '$9', oldPrice: '$99', badge: null as string | null },
  { size: '$5K', price: '$13', oldPrice: '$99', badge: null },
  { size: '$10K', price: '$19', oldPrice: '$99', badge: 'MOST POPULAR' },
  { size: '$25K', price: '$68.40', oldPrice: '$274.50', badge: null },
  { size: '$50K', price: '$98.40', oldPrice: '$394.00', badge: null },
  { size: '$100K', price: '$176.40', oldPrice: '$705.60', badge: null },
]

const REVIEW_CARDS = [
  { name: 'CK Trader', country: 'United Kingdom', quote: 'The objectives are clear, support is responsive, and the dashboard makes the evaluation process easy to follow.', source: 'Trustpilot' },
  { name: 'Community Trader', country: 'UAE', quote: 'Fast support and a smooth simulated trading experience. The rules are simple to understand before starting.', source: 'Trustpilot' },
  { name: 'Discord Member', country: 'India', quote: 'The community is active, friendly, and helpful. CK Capital feels more personal than other evaluation brands.', source: 'Community' },
  { name: 'Evaluation User', country: 'United States', quote: 'The price options are flexible and the account-size choices make it easier to pick the right starting point.', source: 'Review' },
]

export default function Home() {
  const [selectedChallengeType, setSelectedChallengeType] = useState<ChallengeTypeKey>('standard')

  const cards = BASE_CARDS.filter((baseCard) => CHALLENGE_DATA[selectedChallengeType][baseCard.size]).map((baseCard) => {
    const features = CHALLENGE_DATA[selectedChallengeType][baseCard.size]
    return { ...baseCard, features: { phase1: features[0], phase2: features[1], maxDaily: features[2], maxLoss: features[3], period: 'Unlimited', minDays: '1', rewardSplit: SPLIT[selectedChallengeType], consistency: features[4] } }
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PromoBar /><Navbar /><PromoPopup />
      
      {/* HERO */}
      <section id="ck70">
        <div className="hero">
          <div className="hero-left">
            <div className="badge"><span></span>70% sale 2026 · Biggest drop of the Year</div>
            <h1>EVERYTHING</h1>
            <div className="discount">70% OFF</div>
            <div className="sub">ACROSS ALL PLANS</div>
            <p className="text">Funded accounts up to $100K. Earn up to a 100% Profit Split. No time limits. Trade on MT5 & TradeLocker with news trading allowed.</p>
            <div className="timer"><div className="clock"></div><div><h2>ENDING SOON</h2><p>MORE TIME. BECAUSE YOU EARNED IT.</p></div></div>
            <a href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="btn">Claim 70% OFF →</a>
            <div className="features"><div><span></span>12H Payouts</div><div><span></span>100% Profit Split</div><div><span></span>$100K Capital</div><div><span></span>No Time Limits</div></div>
          </div>
          
          <div className="cards">
            {cards.slice(0,3).map((card, idx) => (
              <div key={idx} className={`card ${card.badge ? 'popular' : ''}`}>
                <div className="img"><img src={idx === 1 ? 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202320_d80ee793-51ba-4e14-8c99-28e4c4538058.png' : idx === 2 ? 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202322_befbd61e-9682-404d-8f70-dabb9c3d9160.png' : 'https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202310_585889c9-e3b8-46b5-a4a7-31baca4be8fd.png'} alt={card.size} /></div>
                <div className="content">
                  <div className="tag">{card.badge || (idx === 0 ? 'LOWEST PRICE' : 'FASTEST PAYOUTS')}</div>
                  <div className="name">Standard <small>{card.size}</small></div>
                  <div className="type">2-STEP CHALLENGE</div>
                  <div className="row">MAX DAILY LOSS <b>{card.features.maxDaily}</b></div>
                  <div className="row">MAX LOSS <b>{card.features.maxLoss}</b></div>
                  <div className="row">PROFIT TARGET <b>{card.features.phase1}</b></div>
                  <div className="price"><div className="old">{card.oldPrice}</div><div className="new">{card.price}</div><div className="off">-70%</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketTicker />
      <InstantFundingBanner />

      {/* PRICING - ULTRA SIMPLE */}
      <section id="start-challenge" className="relative overflow-hidden py-16 md:py-24 scroll-mt-20 bg-[#0a0a0a]">
        <div className="max-w-[1680px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.28em] text-[#D4AF37] mb-3">CK CAPITAL EVALUATIONS</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-1px] text-white">Choose your account size</h2>
          </div>

          <MobilePricingSelector selectedChallengeType={selectedChallengeType} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {cards.map((card, idx) => (
              <div key={idx} className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white/50 text-xs">Account Size</p>
                    <h3 className="text-3xl font-extrabold text-white">{card.size}</h3>
                  </div>
                  {card.badge && <div className="bg-[#D4AF37] text-black text-[10px] font-extrabold px-3 py-1 rounded-full">{card.badge}</div>}
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-[#D4AF37]">{card.price}</span>
                  <span className="text-white/40 line-through ml-2">{card.oldPrice}</span>
                </div>

                <Link href="https://app.ckcapital.co.uk/signup" className="block w-full text-center bg-[#D4AF37] hover:bg-[#F5C542] text-black font-extrabold py-3 rounded-xl mb-6 transition-all">
                  Start Challenge
                </Link>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/60">Phase 1 Target</span><span className="font-bold">{card.features.phase1}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Phase 2 Target</span><span className="font-bold">{card.features.phase2}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Max Daily Loss</span><span className="font-bold">{card.features.maxDaily}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Max Loss</span><span className="font-bold">{card.features.maxLoss}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Reward Split</span><span className="font-bold">{card.features.rewardSplit}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

      {/* REVIEWS */}
      <section className="bg-[#0a0a0a] py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
            <p className="text-xs font-bold tracking-[0.28em] text-[#D4AF37]">TRADER REVIEWS</p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-1.5px] text-white">The trusted choice for CK traders</h2>
            <a href="https://uk.trustpilot.com/review/ckcapital.co.uk" target="_blank" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#D4AF37] px-8 text-sm font-extrabold text-black">Read All Reviews on Trustpilot ↗</a>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {REVIEW_CARDS.map((review, idx) => (
              <article key={idx} className="flex min-h-[240px] flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950 p-5">
                <div>
                  <div className="flex">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#00B67A]">★</span>)}</div>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">&ldquo;{review.quote}&rdquo;</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-white">{review.name}</p>
                    <p className="text-xs text-white/55">{review.country}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">{review.source}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Why Choose <span className="text-[#D4AF37]">CK Capital?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'News Trading Allowed', description: 'Trade around high-impact market events according to CK Capital program rules.' },
              { title: 'Flexible Reward Process', description: 'Reward requests are reviewed based on eligibility and program terms.' },
              { title: 'Up to 100% Reward Split', description: 'Eligible traders can receive up to 100% reward split.' },
              { title: 'Reset & Top-Up', description: 'Flexible reset and top-up options to continue your journey.' },
              { title: 'Competitive Trading Conditions', description: 'Access supported platforms and instruments.' },
              { title: '24/7 Support', description: 'Support access is available for account, rules, and evaluation questions.' }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-[#D4AF37]/40 transition-colors">
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedPayouts />
      <VideoTestimonials />
      <HomeDashboardPreview />
      <SupportSection />

      <section className="py-12 md:py-16 bg-[#010015] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Start Your Evaluation Journey</h2>
          <p className="text-white/70 mb-8">Choose your plan, follow the rules, and track your progress with CK Capital.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://discord.gg/ckcapital" className="button-secondary">Join Discord</Link>
            <Link href="https://app.ckcapital.co.uk/signup" className="button-primary">Start Evaluation</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
