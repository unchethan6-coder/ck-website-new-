'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PromoBar } from '@/components/PromoBar'
import { StatCounter } from '@/components/StatCounter'
import { PaymentMarquee } from '@/components/PaymentMarquee'
import { PromoPopup } from '@/components/PromoPopup'
import { FeaturedPayouts } from '@/components/FeaturedPayouts'
import { InstantFundingBanner } from '@/components/InstantFundingBanner'
import { HomeDashboardPreview } from '@/components/home/HomeDashboardPreview'
import { MobilePricingSelector } from '@/components/home/MobilePricingSelector'

const ObjectivesTable = dynamic(() => import('@/components/ObjectivesTable').then(mod => ({ default: mod.ObjectivesTable })), { ssr: false })
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials').then(mod => ({ default: mod.VideoTestimonials })), { ssr: false })

type ChallengeType = 'standard' | 'middleweight' | 'lightweight' | '1step' | 'instant'
type PricingView = 'cards' | 'table'

const CHALLENGE_TABS: { id: ChallengeType; label: string; note: string }[] = [
  { id: 'standard', label: 'Standard', note: 'Classic 2-step route' },
  { id: 'middleweight', label: 'Middleweight', note: 'Balanced objectives' },
  { id: 'lightweight', label: 'Lightweight', note: 'Lower target route' },
  { id: '1step', label: '1 Step', note: 'Direct access model' },
  { id: 'instant', label: 'Instant', note: 'Instant route' },
]

const SPLIT: Record<ChallengeType, string> = { standard: 'Up to 100%', middleweight: 'Up to 100%', lightweight: 'Up to 100%', '1step': 'Up to 100%', instant: 'Bi-weekly 50%' }

const CHALLENGE_DATA: Record<ChallengeType, Record<string, string[]>> = {
  standard: { '$2.5K': ['$250', '$125', '$80', '$200', 'N/A'], '$5K': ['$500', '$250', '$200', '$400', 'N/A'], '$10K': ['$1,000', '$500', '$400', '$800', 'N/A'], '$25K': ['$2,500', '$1,250', '$1,000', '$2,000', 'N/A'], '$50K': ['$5,000', '$2,500', '$2,000', '$4,000', 'N/A'], '$100K': ['$10,000', '$5,000', '$4,000', '$8,000', 'N/A'] },
  middleweight: { '$2.5K': ['$200', '$125', '$80', '$300', '30%'], '$5K': ['$400', '$250', '$200', '$600', '30%'], '$10K': ['$800', '$500', '$400', '$1,200', '30%'], '$25K': ['$2,000', '$1,250', '$1,000', '$3,000', '30%'], '$50K': ['$4,000', '$2,500', '$2,000', '$6,000', '30%'], '$100K': ['$8,000', '$5,000', '$4,000', '$12,000', '30%'] },
  lightweight: { '$2.5K': ['$150', '$150', '$80', '$200', '50%'], '$5K': ['$300', '$300', '$200', '$400', '50%'], '$10K': ['$600', '$600', '$400', '$800', '50%'], '$25K': ['$1,500', '$1,500', '$1,000', '$2,000', '50%'], '$50K': ['$3,000', '$3,000', '$2,000', '$4,000', '50%'], '$100K': ['$6,000', '$6,000', '$4,000', '$8,000', '50%'] },
  '1step': { '$2.5K': ['$250', '$0', '$80', '$150', 'N/A'], '$5K': ['$500', '$0', '$200', '$300', 'N/A'], '$10K': ['$1,000', '$0', '$400', '$600', 'N/A'], '$25K': ['$2,500', '$0', '$1,000', '$1,500', 'N/A'], '$50K': ['$5,000', '$0', '$2,000', '$3,000', 'N/A'], '$100K': ['$10,000', '$0', '$4,000', '$6,000', 'N/A'] },
  instant: { '$5K': ['$0', '$0', '$150', '$250', '20%'], '$10K': ['$0', '$0', '$300', '$500', '20%'], '$25K': ['$0', '$0', '$750', '$1,250', '20%'], '$50K': ['$0', '$0', '$1,500', '$2,500', '20%'] },
}

const BASE_CARDS: { size: string; price: string; oldPrice: string; badge: string | null }[] = [
  { size: '$2.5K', price: '$9', oldPrice: '$99', badge: null }, { size: '$5K', price: '$13', oldPrice: '$99', badge: null }, { size: '$10K', price: '$19', oldPrice: '$99', badge: 'MOST POPULAR' }, { size: '$25K', price: '$68.40', oldPrice: '$274.50', badge: null }, { size: '$50K', price: '$98.40', oldPrice: '$394.00', badge: null }, { size: '$100K', price: '$176.40', oldPrice: '$705.60', badge: null },
]

const REVIEW_CARDS = [
  { name: 'CK Trader', country: 'United Kingdom', quote: 'The objectives are clear, support is responsive, and the dashboard makes the evaluation process easy to follow.', source: 'Trustpilot', tone: 'white' as const },
  { name: 'Community Trader', country: 'UAE', quote: 'Fast support and a smooth simulated trading experience. The rules are simple to understand before starting.', source: 'Trustpilot', tone: 'gold' as const },
  { name: 'Discord Member', country: 'India', quote: 'The community is active, friendly, and helpful. CK Capital feels more personal than other evaluation brands.', source: 'Community', tone: 'dark' as const },
  { name: 'Evaluation User', country: 'United States', quote: 'The price options are flexible and the account-size choices make it easier to pick the right starting point.', source: 'Review', tone: 'white' as const },
]

function TrustStars({ compact = false }: { compact?: boolean }) {
  return <span role="img" aria-label="Rated 5 out of 5" className="inline-flex items-center gap-[2px]">{[...Array(5)].map((_, index) => <span key={index} className={`${compact ? 'size-4' : 'size-5'} relative inline-flex items-center justify-center overflow-hidden rounded-[3px] bg-[#00B67A] text-foreground`}><svg width={compact ? 11 : 14} height={compact ? 11 : 14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.39 7.36H22l-6.18 4.49L18.18 21 12 16.27 5.82 21l2.36-7.15L2 9.36h7.61L12 2z" /></svg></span>)}</span>
}

export default function Home() {
  const [selectedChallengeType, setSelectedChallengeType] = useState<ChallengeType>('standard')
  const [pricingView, setPricingView] = useState<PricingView>('cards')
  const cards = BASE_CARDS.filter((baseCard) => CHALLENGE_DATA[selectedChallengeType][baseCard.size]).map((baseCard) => {
    const features = CHALLENGE_DATA[selectedChallengeType][baseCard.size]
    return { ...baseCard, features: { phase1: features[0], phase2: features[1], maxDaily: features[2], maxLoss: features[3], period: 'Unlimited', minDays: '1', rewardSplit: SPLIT[selectedChallengeType], consistency: features[4] } }
  })

  return (
    <div className="min-h-screen bg-white">
      <PromoBar /><Navbar /><PromoPopup />
      <section id="ck70">
        <div className="hero">
          <div>
            <div className="badge"><span></span>70% sale 2026 · Biggest drop of the Year</div>
            <h1>EVERYTHING</h1>
            <div className="discount">70% OFF</div>
            <div className="sub">ACROSS ALL PLANS</div>
            <p className="text">Funded accounts up to $100K. Earn up to a 100% Profit Split. No time limits. Trade on MT5 & TradeLocker with news trading allowed. Start your evaluation today and secure the latest CK Capital offer before it ends. Transparent rules, competitive spreads, and no hidden fees.</p>
            <div className="timer"><div className="clock"></div><div><h2>ENDING SOON</h2><p>MORE TIME. BECAUSE YOU EARNED IT.</p></div></div>
            <a href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="btn">Claim 70% OFF →</a>
            <div className="features"><div><span></span>12H Payouts</div><div><span></span>100% Profit Split</div><div><span></span>$100K Capital</div><div><span></span>No Time Limits</div></div>
          </div>
          <div className="cards">
            <div className="card">
              <div className="img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202310_585889c9-e3b8-46b5-a4a7-31baca4be8fd.png" alt="$2.5K challenge" /></div>
              <div className="content">
                <div className="tag">LOWEST PRICE</div>
                <div className="name">Standard <small>$2.5K</small></div>
                <div className="type">2-STEP CHALLENGE</div>
                <div className="row">MAX DAILY LOSS <b>$80</b></div>
                <div className="row">MAX LOSS <b>$200</b></div>
                <div className="row">PROFIT TARGET <b>$250</b></div>
                <div className="price"><div className="old">$99</div><div className="new">$9</div><div className="off">-70%</div></div>
              </div>
            </div>
            <div className="card popular">
              <div className="img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202320_d80ee793-51ba-4e14-8c99-28e4c4538058.png" alt="$10K challenge" /></div>
              <div className="content">
                <div className="tag">MOST POPULAR</div>
                <div className="name">Standard <small>$10K</small></div>
                <div className="type">2-STEP CHALLENGE</div>
                <div className="row">MAX DAILY LOSS <b>$400</b></div>
                <div className="row">MAX LOSS <b>$800</b></div>
                <div className="row">PROFIT TARGET <b>$1,000</b></div>
                <div className="price"><div className="old">$99</div><div className="new">$19</div><div className="off">-70%</div></div>
              </div>
            </div>
            <div className="card">
              <div className="img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="https://d8j0ntlcm91z4.cloudfront.net/user_3DDBO5ZLldZQZLxxyVBdiTQXCB0/hf_20260629_202322_befbd61e-9682-404d-8f70-dabb9c3d9160.png" alt="$100K challenge" /></div>
              <div className="content">
                <div className="tag">FASTEST PAYOUTS</div>
                <div className="name">Standard <small>$100K</small></div>
                <div className="type">2-STEP CHALLENGE</div>
                <div className="row">MAX DAILY LOSS <b>$4,000</b></div>
                <div className="row">MAX LOSS <b>$8,000</b></div>
                <div className="row">PROFIT TARGET <b>$10,000</b></div>
                <div className="price"><div className="old">$705.60</div><div className="new">$176.40</div><div className="off">-70%</div></div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          #ck70{ --ck-gold:#f5c542; --ck-gold2:#ffdf7a; --ck-muted:#b8b8b8; font-family:Arial,Helvetica,sans-serif; color:#ffffff; display:block; }
          #ck70 *{ box-sizing:border-box; margin:0; padding:0; }
          #ck70 .hero{ min-height:100vh; padding:55px 9%; display:grid; grid-template-columns:1fr 1.25fr; gap:70px; background: radial-gradient(circle at 70% 15%,rgba(245,197,66,.18),transparent 30%), linear-gradient(180deg,#111111,#050505); align-items:center; }
          #ck70 .badge{ display:inline-flex; align-items:center; gap:12px; border:1px solid var(--ck-gold); color:var(--ck-gold2); padding:10px 22px; border-radius:30px; font-size:15px; margin-bottom:20px; }
          #ck70 .badge span{ width:12px; height:12px; background:var(--ck-gold); border-radius:50%; box-shadow:0 0 14px var(--ck-gold); }
          #ck70 h1{ font-size:56px; line-height:.95; font-weight:900; letter-spacing:-2px; }
          #ck70 .discount{ font-size:110px; font-weight:900; color:var(--ck-gold); margin:12px 0; text-shadow:0 0 30px rgba(245,197,66,.35); }
          #ck70 .sub{ font-size:38px; font-weight:900; margin-bottom:25px; }
          #ck70 .text{ max-width:600px; color:var(--ck-muted); font-size:18px; line-height:1.5; margin-bottom:55px; }
          #ck70 .timer{ display:flex; align-items:center; gap:24px; margin-bottom:60px; }
          #ck70 .clock{ width:54px; height:54px; border:4px solid var(--ck-gold); border-radius:50%; position:relative; box-shadow:0 0 18px rgba(245,197,66,.35); }
          #ck70 .clock:before{ content:""; position:absolute; width:4px; height:16px; background:var(--ck-gold); top:11px; left:23px; }
          #ck70 .clock:after{ content:""; position:absolute; width:17px; height:4px; background:var(--ck-gold); top:25px; left:23px; }
          #ck70 .timer h2{ font-size:42px; font-weight:900; }
          #ck70 .timer p{ font-size:18px; margin-top:10px; font-weight:700; color:#eeeeee; }
          #ck70 .btn{ display:inline-flex; align-items:center; gap:18px; background:linear-gradient(135deg,#b88718,#f5c542,#ffdf7a); color:#050505; border:none; padding:22px 34px; border-radius:14px; font-size:20px; font-weight:900; text-decoration:none; box-shadow:0 0 35px rgba(245,197,66,.45); }
          #ck70 .features{ display:flex; gap:35px; margin-top:35px; flex-wrap:wrap; color:#d6d6d6; }
          #ck70 .features > div{ display:flex; align-items:center; gap:10px; font-size:14px; }
          #ck70 .features span{ width:12px; height:12px; background:var(--ck-gold); border-radius:50%; box-shadow:0 0 12px var(--ck-gold); }
          #ck70 .cards{ display:flex; align-items:center; gap:24px; justify-content:center; flex-wrap: wrap; }
          #ck70 .card{ width:100%; max-width: 320px; min-height:500px; border:1px solid rgba(245,197,66,.25); border-radius:18px; overflow:hidden; background:linear-gradient(180deg,#151515,#070707); box-shadow:0 20px 50px rgba(0,0,0,.5); }
          #ck70 .card.popular{ max-width: 340px; min-height:540px; border-color:var(--ck-gold); box-shadow:0 0 28px rgba(245,197,66,.35); }
          #ck70 .img{ height:172px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; font-size:52px; letter-spacing:-1px; font-weight:900; color:var(--ck-gold); text-shadow:0 0 26px rgba(245,197,66,.5); border-bottom:1px solid rgba(245,197,66,.18); background: radial-gradient(circle at 50% 44%,rgba(245,197,66,.30),transparent 62%), linear-gradient(180deg,#2a210b,#090909); }
          #ck70 .img img{ width:100%; height:100%; object-fit:cover; display:block; }
          #ck70 .card.popular .img{ background: radial-gradient(circle,rgba(255,223,122,.45),transparent 35%), linear-gradient(180deg,#30250c,#090909); }
          #ck70 .content{ padding:24px; }
          #ck70 .tag{ display:inline-block; border:1px solid var(--ck-gold); color:var(--ck-gold); padding:6px 10px; border-radius:5px; font-size:11px; font-weight:800; margin-bottom:14px; }
          #ck70 .name{ font-size:28px; font-weight:900; }
          #ck70 .name small{ font-size:16px; color:#8c8c8c; }
          #ck70 .type{ color:#8c8c8c; font-size:13px; letter-spacing:2px; margin:10px 0 22px; }
          #ck70 .row{ display:flex; justify-content:space-between; border-top:1px solid rgba(255,255,255,.08); padding:13px 0; color:#8c8c8c; font-weight:800; font-size:13px; }
          #ck70 .row b{ color:#eeeeee; }
          #ck70 .price{ display:flex; align-items:center; gap:12px; margin-top:20px; }
          #ck70 .old{ color:#777; text-decoration:line-through; font-size:18px; }
          #ck70 .new{ color:var(--ck-gold); font-size:36px; font-weight:900; }
          #ck70 .off{ margin-left:auto; background:linear-gradient(135deg,#b88718,#f5c542); color:#050505; padding:10px; border-radius:7px; font-weight:900; }
          @media(max-width:1100px){ 
            #ck70 .hero{ grid-template-columns:1fr; padding:35px 5%; gap:40px; } 
            #ck70 .cards{ flex-direction: column; align-items: center; } 
            #ck70 .card, #ck70 .card.popular { width: 100%; max-width: 340px; }
            #ck70 h1{ font-size:42px; } 
            #ck70 .discount{ font-size:72px; } 
          }
          @media(max-width:640px){ 
            #ck70 .hero{ padding:25px 4%; }
            #ck70 .card { min-height: auto; }
          }
        `}</style>
      </section>
      <InstantFundingBanner /><section className="py-12 md:py-16 bg-white"><div className="max-w-7xl mx-auto px-4 md:px-6"><h2 className="text-center text-xl md:text-2xl font-bold text-black mb-8">Trusted Payment Partners</h2></div><PaymentMarquee /></section>
      <section id="start-challenge" className="relative overflow-hidden py-16 md:py-24 scroll-mt-20 bg-white"><div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.20), transparent 42%)' }} /><div className="relative z-10 mx-auto max-w-[1680px] px-4 md:px-8"><div className="mx-auto mb-8 max-w-3xl text-center md:mb-10"><p className="mb-3 text-xs font-bold tracking-[0.28em] text-[#D4AF37]">CK CAPITAL EVALUATIONS</p><h2 className="text-3xl font-extrabold tracking-[-1px] text-black text-balance md:text-5xl lg:text-6xl">Choose your account size. Start your evaluation.</h2><p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-black/65">Full-width, flexible pricing cards inspired by the FundingPips layout, using CK Capital account sizes and rules.</p></div><div className="mb-8 flex justify-center overflow-x-auto pb-2"><div className="flex w-max gap-2 rounded-2xl border border-black/10 bg-black/[0.03] p-2 backdrop-blur md:flex-wrap md:justify-center">{CHALLENGE_TABS.map((tab) => <button key={tab.id} onClick={() => setSelectedChallengeType(tab.id)} className={`min-w-[132px] rounded-xl px-4 py-3 text-left transition-all ${selectedChallengeType === tab.id ? 'bg-white text-black shadow-[0_12px_35px_rgba(212,175,55,0.25)]' : 'text-black/70 hover:bg-white/10 hover:text-black'}`}><span className="block text-sm font-bold">{tab.label}</span><span className="block text-[11px] opacity-70">{tab.note}</span></button>)}</div></div><div className="mb-10 flex justify-center"><div className="inline-flex rounded-full border border-black/10 bg-white p-1"><button onClick={() => setPricingView('cards')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${pricingView === 'cards' ? 'bg-[#D4AF37] text-black' : 'text-black/70'}`}>Cards</button><button onClick={() => setPricingView('table')} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${pricingView === 'table' ? 'bg-[#D4AF37] text-black' : 'text-black/70'}`}>Table</button></div></div>
      {pricingView === 'cards' && <><MobilePricingSelector selectedChallengeType={selectedChallengeType} /><div className="hidden md:block mx-auto pb-6"><div className="flex flex-wrap justify-center gap-6 xl:flex-nowrap xl:gap-4 2xl:gap-5">{cards.map((card) => <article key={card.size} className={`relative flex min-h-[500px] w-full max-w-[300px] flex-[1_1_260px] flex-col overflow-hidden rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 xl:max-w-[250px] xl:flex-[1_1_0] xl:p-4 2xl:max-w-[270px] 2xl:p-5 ${card.badge ? 'border-[#D4AF37] bg-white text-black shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_30px_80px_rgba(212,175,55,0.22)]' : 'border-black/10 bg-white text-black hover:border-[#D4AF37]/60'}`}>{card.badge && <div className="absolute right-4 top-4 rounded-full bg-[#D4AF37] px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-black">{card.badge}</div>}<p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${card.badge ? 'text-black/45' : 'text-black/45'}`}>Account Size</p><h3 className="mb-4 text-4xl font-extrabold tracking-tight xl:text-3xl 2xl:text-4xl">{card.size}</h3><div className={`mb-5 overflow-hidden rounded-2xl border p-4 xl:p-3 2xl:p-4 ${card.badge ? 'border-black/10 bg-black/[0.03]' : 'border-black/10 bg-black/[0.03]'}`}><div className="flex min-w-0 flex-col items-start"><span className="max-w-full truncate text-[38px] font-extrabold leading-none text-[#D4AF37] xl:text-[30px] 2xl:text-[36px]">{card.price}</span><span className={`mt-2 block max-w-full truncate text-xs line-through ${card.badge ? 'text-black/40' : 'text-black/40'}`}>{card.oldPrice}</span></div><p className={`mt-2 text-xs ${card.badge ? 'text-black/55' : 'text-black/55'}`}>Limited promotional pricing</p></div><Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className={`mb-5 flex h-12 w-full items-center justify-center rounded-xl text-sm font-extrabold transition-all ${card.badge ? 'bg-[#A87B0B] text-foreground hover:bg-[#8a6309]' : 'bg-[#D4AF37] text-black hover:bg-[#F7D774]'}`}>Start Challenge</Link><div className="grid grid-cols-1 gap-3 text-sm xl:text-xs 2xl:text-sm">{[['Phase 1 Target', card.features.phase1], ['Phase 2 Target', card.features.phase2], ['Max Daily Loss', card.features.maxDaily], ['Max Loss', card.features.maxLoss], ['Trading Period', card.features.period], ['Min Trading Days', card.features.minDays], ['Reward Split', card.features.rewardSplit], ['Consistency Rule', card.features.consistency]].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-current/10 pb-2 last:border-0"><span className={card.badge ? 'text-black/55' : 'text-black/55'}>{label}</span><span className="text-right font-bold">{value}</span></div>)}</div><button type="button" onClick={() => navigator.clipboard.writeText(`JUN70-${card.size.replace('$', '').replace('K', '')}`)} className={`mt-auto rounded-xl border border-dashed px-3 py-3 text-xs font-extrabold transition-all xl:px-2 xl:text-[11px] 2xl:text-xs ${card.badge ? 'border-black/20 bg-black/[0.04] text-black hover:bg-black/[0.08]' : 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F7D774] hover:bg-[#D4AF37]/20'}`}>Copy Code: JUN70-{card.size.replace('$', '').replace('K', '')}</button></article>)}</div></div></>}
      {pricingView === 'table' && <div className="rounded-3xl bg-white p-4 md:p-6"><ObjectivesTable /></div>}<p className="mx-auto mt-8 max-w-3xl text-center text-xs md:text-sm text-black/45">CK Capital programs use demo accounts with fictitious funds for simulated trading evaluation only. Program terms, rules, and eligibility apply.</p></div></section>
      <section className="relative overflow-hidden bg-white py-16 md:py-24"><div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #fffaf1 0%, #fffaf1 45%, #fffaf1 100%)' }} /><div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6"><div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center"><p className="text-xs font-bold tracking-[0.28em] text-[#D4AF37]">TRADER REVIEWS</p><h2 className="text-4xl md:text-6xl font-extrabold tracking-[-1.5px] text-black text-balance">The trusted choice for CK traders</h2><div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-black/70"><span>4.9 based on Trustpilot reviews</span><TrustStars /></div><a href="https://uk.trustpilot.com/review/ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#D4AF37] px-6 text-sm font-extrabold text-black transition-colors hover:bg-[#F7D774] md:h-14 md:px-10">Read All Reviews on Trustpilot ↗</a></div>
      
      {/* Reviews Grid - Fixed Syntax */}
      <div className="mt-14 grid gap-4 md:grid-cols-4">
        {/* Video Story Card */}
        <div className="group relative min-h-[410px] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.04] md:col-span-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.55),transparent_45%),linear-gradient(180deg,#fffaf1,#fffaf1)]" />
          <div className="relative z-10 flex h-full flex-col justify-end p-5">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Video Story</p>
              <p className="mt-2 text-lg font-bold text-black">Trader experience preview</p>
              <p className="mt-1 text-sm text-black/60">Add CK testimonial video here when approved.</p>
            </div>
          </div>
        </div>

        {/* 24/7 Support Card */}
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37] p-5 text-black md:col-span-1">
          <p className="text-5xl font-extrabold">24/7</p>
          <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-black/60">Support Available</p>
          <div className="mt-8 h-24 rounded-xl bg-black/10 p-3">
            <div className="h-3 w-3/4 rounded-full bg-black/20" />
            <div className="mt-3 h-3 w-1/2 rounded-full bg-black/20" />
            <div className="mt-3 h-3 w-5/6 rounded-full bg-black/20" />
          </div>
        </div>

        {/* Review Cards */}
        {REVIEW_CARDS.map((review) => (
          <article
            key={review.quote}
            className={`flex min-h-[240px] flex-col justify-between rounded-2xl border p-5 ${
              review.tone === 'dark' 
                ? 'border-black/10 bg-[#fffaf1] text-black' 
                : review.tone === 'gold' 
                  ? 'border-[#D4AF37]/30 bg-[#F7D774] text-black' 
                  : 'border-black/10 bg-white text-black'
            }`}
          >
            <div>
              <TrustStars compact />
              <p className={`mt-4 text-sm leading-relaxed ${review.tone === 'dark' ? 'text-black/70' : 'text-black/75'}`}>
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#D4AF37]">
                  {review.name[0]}
                </span>
                <div>
                  <p className="text-sm font-extrabold">{review.name}</p>
                  <p className={`text-xs ${review.tone === 'dark' ? 'text-black/55' : 'text-black/55'}`}>{review.country}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${review.tone === 'dark' ? 'bg-black/[0.04] text-black/70' : 'bg-black/10 text-black/65'}`}>
                {review.source}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-black/45">Reviews reflect individual experiences and do not guarantee future results. CK Capital provides simulated trading evaluations only.</p>
      </div></section>
      <section className="py-12 md:py-16 bg-white"><div className="max-w-7xl mx-auto px-4 md:px-6"><h2 className="section-title text-black mb-12 text-balance text-center">Why Choose <span className="gradient-text">CK Capital?</span></h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[{ title: 'News Trading Allowed', description: 'Trade around high-impact market events according to CK Capital program rules.' }, { title: 'Flexible Reward Process', description: 'Reward requests are reviewed based on eligibility, account status, and program terms.' }, { title: 'Up to 100% Reward Split', description: 'Eligible traders can receive up to 100% reward split in supported evaluation models.' }, { title: 'Reset & Top-Up', description: 'Flexible reset and top-up options helps traders continue their evaluation journey.' }, { title: 'Competitive Trading Conditions', description: 'Access supported trading platforms and market instruments inside a simulated environment.' }, { title: '24/7 Support', description: 'Support access is available for account, rules, and evaluation questions.' }].map((item) => <div key={item.title} className="glow-card group" style={{ background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)' }}><h3 className="text-lg font-bold text-black mb-2 group-hover:text-primary transition-colors">{item.title}</h3><p className="text-black/80 text-sm leading-relaxed">{item.description}</p></div>]}</div></div></section>
      <section className="py-12 md:py-16 bg-white"><div className="max-w-4xl mx-auto px-4 md:px-6"><h2 className="section-title text-black mb-12 text-center">Your Path to <span className="gradient-text">Progress</span></h2><div className="space-y-8">{[{ step: 1, title: 'Choose Evaluation', description: 'Select the account size and evaluation model that fits your trading style.' }, { step: 2, title: 'Trade in a Simulated Environment', description: 'Use demo accounts with fictitious funds and clear trading objectives.' }, { step: 3, title: 'Meet the Objectives', description: 'Follow the rules, manage risk, and complete the required evaluation stages.' }, { step: 4, title: 'Request Rewards', description: 'Eligible traders can request rewards according to CK Capital program terms.' }].map((item, idx, arr) => <div key={item.step} className="flex gap-6"><div className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-black font-bold text-lg">{item.step}</div>{idx < arr.length - 1 && <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent my-2" />}</div><div className="pb-8"><h3 className="text-xl font-bold text-black mb-2">{item.title}</h3><p className="text-black/70">{item.description}</p></div></div>)}</div></div></section>
      <FeaturedPayouts /><VideoTestimonials /><HomeDashboardPreview />
      <section className="py-12 md:py-16 bg-white"><div className="max-w-4xl mx-auto px-4 md:px-6 text-center"><h2 className="section-title text-black mb-6 text-balance">Excellent Customer <span className="gradient-text">Support</span></h2><p className="text-lg text-black/70 mb-8 leading-relaxed">CK Capital support helps traders understand account access, evaluation rules, and platform questions throughout their simulated trading journey.</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{['Professional Discord Support', 'Community Game Nights', 'Comprehensive Online FAQ'].map((item) => <div key={item} className="glow-card" style={{ background: 'linear-gradient(180deg, #FCFCFC 0%, #F6F7F9 40%, #F5F6F8 100%)' }}><p className="text-black font-semibold">{item}</p></div>)}</div></div></section>
      <section className="py-12 md:py-16 bg-card/20" style={{ backgroundColor: '#010015' }}><div className="max-w-4xl mx-auto px-4 md:px-6 text-center"><h2 className="section-title text-foreground mb-4 text-balance">Start Your Evaluation Journey</h2><p className="text-lg mb-12" style={{ color: 'var(--foreground)' }}>Choose your plan, follow the rules, and track your progress with CK Capital.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="button-secondary flex items-center justify-center gap-2">Join Discord</Link><Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="button-primary flex items-center justify-center gap-2">Start Evaluation</Link></div></div></section>
      <Footer />
    </div>
  )
}
