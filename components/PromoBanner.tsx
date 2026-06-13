'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'

export function PromoBanner() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card: Guaranteed Rewards */}
          <div
            className="glow-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FEF8E7 0%, #FCF5D0 100%)',
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Guaranteed<br />Rewards
              </h3>
              <p className="text-black/70 text-sm md:text-base mb-6">
                Get rewarded in 24 hours or we pay $1,000 extra.
              </p>
              <div
                className="inline-block px-4 py-2 rounded-lg font-bold text-black text-xs md:text-sm"
                style={{
                  background: '#FFE66D',
                  border: '2px solid #D4A024',
                }}
              >
                ⏱ AVG. DISBURSEMENT TIME - 5HRS
              </div>
            </div>

            {/* Shield Icon - Decorative */}
            <div className="absolute top-6 right-6 w-20 h-20 opacity-30">
              <div className="w-full h-full rounded-full bg-yellow-300 flex items-center justify-center text-3xl">
                ✓
              </div>
            </div>
          </div>

          {/* Middle Card: Best Trading Conditions */}
          <div
            className="glow-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FEF8E7 0%, #FCF5D0 100%)',
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Best Trading<br />Conditions
              </h3>
              <p className="text-black/70 text-sm md:text-base">
                Transforming trading journeys globally through industry-leading resources.
              </p>
            </div>

            {/* Hands Icon - Decorative */}
            <div className="absolute bottom-6 right-6 w-24 h-24 opacity-20 text-yellow-400">
              <div className="text-5xl">👏</div>
            </div>
          </div>

          {/* Right Card: Best Trading Platforms */}
          <div
            className="glow-card rounded-2xl p-6 md:p-8 md:col-span-1 col-span-1 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FEF8E7 0%, #FCF5D0 100%)',
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                Best Trading<br />Platforms
              </h3>
              <p className="text-black/70 text-sm md:text-base mb-4">
                Trade on our main label MT4, MT5, cTrader & Match-Trader
              </p>
              <p className="text-black/60 text-xs md:text-sm">
                Our MQ licenses and advanced in-house technology ensure enhanced experience, security, and efficiency.
              </p>

              {/* Platform Icons Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { name: 'MT5', icon: '📊' },
                  { name: 'MT4', icon: '📈' },
                  { name: 'cTrader', icon: '🔴' },
                  { name: 'Match-Trader', icon: '⚙️' },
                ].map((platform, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg border border-yellow-300 mb-2">
                      {platform.icon}
                    </div>
                    <span className="text-xs font-semibold text-black">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <p className="text-black/70 text-sm md:text-base mb-4">
            Ready to transform your trading?
          </p>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-flex items-center gap-2"
          >
            <Zap size={18} />
            Start Trading Now
          </Link>
        </div>
      </div>
    </section>
  )
}
