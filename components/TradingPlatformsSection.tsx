'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'

export function TradingPlatformsSection() {
  const platforms = [
    { name: 'MT5', label: 'MT5' },
    { name: 'MT4', label: 'MT4' },
    { name: 'cTrader', label: 'cTrader' },
  ]

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
          {/* Left Column - Cards (40% on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guaranteed Rewards Card */}
            <div
              className="rounded-[28px] p-8 overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #f5f1e8 0%, #ede9de 50%, #e8e3d2 100%)',
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#15161a' }}>
                    Guaranteed<br />Rewards
                  </h3>
                </div>
                {/* 3D Shield Icon */}
                <div className="w-24 h-24 flex-shrink-0 relative"></div>
              </div>

              <p className="text-base" style={{ color: '#15161a' }}>
                Get rewarded in 24 hours or we pay $1,000 extra.
              </p>

              {/* Yellow Pill Button */}
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#f4c430' }}>
                <Clock size={16} style={{ color: '#15161a' }} />
                <span className="text-xs font-bold" style={{ color: '#15161a' }}>
                  AVG. DISBURSEMENT TIME - 5HRS
                </span>
              </div>
            </div>

            {/* Best Trading Conditions Card */}
            <div
              className="rounded-[28px] p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#15161a' }}>
                    Best Trading<br />Conditions
                  </h3>
                </div>
                {/* Clapping Hands Icon */}
                <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center text-5xl">
                  👏
                </div>
              </div>

              <p className="text-base" style={{ color: '#15161a' }}>
                Transforming trading journeys globally through industry-leading resources.
              </p>
            </div>
          </div>

          {/* Right Column - Main Card (60% on desktop) */}
          <div className="lg:col-span-3">
            <div
              className="rounded-[28px] p-8 md:p-10 overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #f5f1e8 0%, #ede9de 50%, #e8e3d2 100%)',
              }}
            >
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#15161a' }}>
                  Best Trading Platforms
                </h2>
                <div
                  className="w-12 h-1 mt-3 mb-6"
                  style={{
                    background: `linear-gradient(90deg, #f4c430 0%, #f4c430 100%)`,
                  }}
                />
                <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#15161a' }}>
                  Trade on our main label MT4, MT5, cTrader & Match-Trader
                </h3>
                <p className="text-base" style={{ color: '#666' }}>
                  Our MQ licenses and advanced in-house technology ensure enhanced experience, security, and efficiency.
                </p>
              </div>

              {/* MacBook Display */}
              <div className="relative mb-8 -mx-8 -mb-8 md:-mr-10">
                <div className="relative">
                  {/* Laptop Container */}
                  <div className="relative max-w-lg ml-auto">
                    {/* Screen */}
                    <div
                      className="rounded-t-2xl p-2 shadow-2xl"
                      style={{
                        backgroundColor: '#1a1a1d',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {/* Screen Content */}
                      <div className="rounded-t-lg bg-gradient-to-br from-gray-900 to-black aspect-video flex items-center justify-center overflow-hidden relative">
                        {/* Candlestick Chart */}
                        <div className="absolute inset-0 flex items-end justify-around p-6 gap-1">
                          {[40, 55, 45, 65, 50, 70, 48, 62, 52, 68, 55, 60].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm"
                              style={{
                                background: i % 3 === 0 ? '#ef4444' : '#22c55e',
                                height: `${height}%`,
                                animation: `pulse 3s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                              }}
                            />
                          ))}
                        </div>

                        {/* Grid Overlay */}
                        <div className="absolute inset-0 opacity-10">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={`h-${i}`}
                              className="absolute w-full border-t border-gray-400"
                              style={{ top: `${i * 20}%` }}
                            />
                          ))}
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={`v-${i}`}
                              className="absolute h-full border-l border-gray-400"
                              style={{ left: `${i * 16.66}%` }}
                            />
                          ))}
                        </div>

                        {/* Chart Labels/Info */}
                        <div className="absolute top-4 left-4 text-white text-xs opacity-60">
                          <div>EURUSD</div>
                          <div>H1</div>
                        </div>
                      </div>
                    </div>

                    {/* Keyboard */}
                    <div
                      className="bg-gray-800 rounded-b-2xl h-6 flex items-center justify-center"
                      style={{ backgroundColor: '#2a2a2e' }}
                    >
                      <div className="w-3/5 h-3 bg-gray-700 rounded-b-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Badges */}
              <div className="grid grid-cols-4 gap-4 mt-12">
                {platforms.map((platform, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-md border-2"
                      style={{
                        backgroundColor: 'white',
                        borderColor: '#f4c430',
                      }}
                    >
                      <img
                        src={`/${platform.name.toLowerCase().replace('-', '')}.png`}
                        alt={platform.label}
                        className="w-10 h-10 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) fallback.style.display = 'block'
                        }}
                      />
                      <span
                        className="text-2xl font-bold hidden"
                        style={{ color: '#15161a' }}
                      >
                        {platform.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-center" style={{ color: '#15161a' }}>
                      {platform.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
