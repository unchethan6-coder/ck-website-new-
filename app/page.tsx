'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PromoBar } from '@/components/PromoBar'
import { MarketTicker } from '@/components/MarketTicker'
import { PromoPopup } from '@/components/PromoPopup'
import { SupportSection } from '@/components/SupportSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <PromoBar />
      <Navbar />
      <PromoPopup />

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-6">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <span className="text-sm text-[#D4AF37] font-semibold">70% OFF - Limited Time</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-[-3px] mb-4">EVERYTHING<br />70% OFF</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">Funded accounts up to $100K. 100% Profit Split. No time limits.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.ckcapital.co.uk/signup" className="px-8 py-4 bg-[#D4AF37] text-black font-extrabold rounded-xl text-lg">Claim 70% OFF →</Link>
            <Link href="#pricing" className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-xl text-lg">See All Plans</Link>
          </div>
        </div>
      </section>

      <MarketTicker />

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold">Choose Your Account Size</h2>
            <p className="text-white/60 mt-3">Start your evaluation today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { size: '$10K', price: '$19', old: '$99' },
              { size: '$25K', price: '$68', old: '$274' },
              { size: '$50K', price: '$98', old: '$394' },
            ].map((plan, i) => (
              <div key={i} className="bg-zinc-950 border border-white/10 rounded-2xl p-8">
                <div className="text-5xl font-extrabold mb-1">{plan.size}</div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-6xl font-extrabold text-[#D4AF37]">{plan.price}</span>
                  <span className="text-white/40 line-through">{plan.old}</span>
                </div>
                <Link href="https://app.ckcapital.co.uk/signup" className="block w-full text-center bg-[#D4AF37] text-black font-extrabold py-3.5 rounded-xl mb-6">Start Challenge</Link>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>✓ Up to 100% Profit Split</li>
                  <li>✓ No Time Limits</li>
                  <li>✓ News Trading Allowed</li>
                  <li>✓ 12H Payouts</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportSection />

      <section className="py-16 bg-[#010015] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4">Ready to start trading?</h3>
          <Link href="https://app.ckcapital.co.uk/signup" className="inline-block px-10 py-3.5 bg-[#D4AF37] text-black font-extrabold rounded-xl">Start Your Evaluation</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
