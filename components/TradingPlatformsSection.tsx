'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Platform {
  name: string
  icon: string
  color: string
}

const platforms: Platform[] = [
  { name: 'MT5', icon: '📊', color: 'bg-green-100' },
  { name: 'MT4', icon: '📈', color: 'bg-green-100' },
  { name: 'cTrader', icon: '🔴', color: 'bg-red-100' },
  { name: 'Match-Trader', icon: '💧', color: 'bg-blue-100' },
]

// Generate consistent heights for candlesticks
const generateHeights = () => {
  const heights: number[] = []
  for (let i = 0; i < 12; i++) {
    heights.push(30 + Math.sin(i * 0.5) * 20 + (i % 3) * 15)
  }
  return heights
}

export function TradingPlatformsSection() {
  const laptopRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [candleHeights] = useState(generateHeights())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!laptopRef.current || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) * 0.02
      const rotateY = (centerX - x) * 0.02

      laptopRef.current.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `
    }

    const handleMouseLeave = () => {
      if (laptopRef.current) {
        laptopRef.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)'
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Cards */}
          <div className="space-y-4">
            {/* Guaranteed Rewards Card */}
            <div
              className="rounded-3xl p-6 md:p-8 transition-all hover:shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Guaranteed<br />Rewards
                  </h3>
                  <p className="text-black/70 text-sm md:text-base">
                    Get rewarded in 24<br />hours or<br />we pay $1,000 extra.
                  </p>
                </div>
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-5xl md:text-6xl">
                  🛡️
                </div>
              </div>

              {/* Disbursement Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-yellow-300 px-3 py-2 rounded-full">
                <span className="text-black text-sm font-bold">⏱️</span>
                <span className="text-xs md:text-sm font-bold text-black">AVG. DISBURSEMENT TIME - 5HRS</span>
              </div>
            </div>

            {/* Best Trading Conditions Card */}
            <div
              className="rounded-3xl p-6 md:p-8 transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Best Trading<br />Conditions
                  </h3>
                  <p className="text-black/70 text-sm md:text-base">
                    Transforming trading<br />journeys globally through<br />industry-leading resources.
                  </p>
                </div>
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-5xl md:text-6xl">
                  👏
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Laptop Section */}
          <div className="flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-8 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Best Trading<br />Platforms
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-6" />
              <p className="text-black/70 text-sm md:text-base max-w-md mx-auto">
                Trade on our main label MT4, MT5,<br />cTrader & Match-Trader
              </p>
            </div>

            {/* Laptop Container with 3D Effect */}
            <div
              ref={containerRef}
              className="w-full flex justify-center items-center perspective"
              style={{ perspective: '1200px', minHeight: '300px' }}
            >
              <div
                ref={laptopRef}
                className="transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transformStyle: 'preserve-3d' as any,
                }}
              >
                {/* Laptop Frame */}
                <div className="relative w-full max-w-md">
                  {/* Laptop Screen */}
                  <div className="rounded-t-3xl bg-gray-900 p-3 shadow-2xl" style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}>
                    <div className="rounded-t-2xl bg-gradient-to-br from-gray-800 to-black aspect-video flex items-center justify-center overflow-hidden relative">
                      {/* Screen Content - Trading Chart */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                        {/* Animated candlesticks */}
                        <div className="absolute inset-0 flex items-end justify-center gap-1 p-6">
                          {mounted && [...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-green-500/80 to-green-400/60 rounded-sm transition-all"
                              style={{
                                height: `${candleHeights[i]}%`,
                                animation: `pulse 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>

                        {/* Grid overlay */}
                        <div className="absolute inset-0 opacity-10">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={`h-${i}`}
                              className="absolute w-full h-px bg-gray-400"
                              style={{ top: `${(i + 1) * 20}%` }}
                            />
                          ))}
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={`v-${i}`}
                              className="absolute h-full w-px bg-gray-400"
                              style={{ left: `${(i + 1) * 14.28}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Keyboard/Base */}
                  <div className="bg-gray-800 rounded-b-3xl h-8 flex items-center justify-center">
                    <div className="w-4/5 h-5 bg-gray-700 rounded-b-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Icons */}
            <div className="flex gap-6 md:gap-8 mt-12 w-full justify-center flex-wrap">
              {platforms.map((platform, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-110"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${platform.color} flex items-center justify-center text-2xl md:text-3xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                    {platform.icon}
                  </div>
                  <span className="text-black font-semibold text-sm">{platform.name}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-black/70 text-sm md:text-base text-center mt-8 max-w-md">
              Our MQ licenses and advanced in-house technology ensure enhanced experience, security, and efficiency.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
