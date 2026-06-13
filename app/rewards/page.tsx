'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="hero-title text-black mb-6 text-balance">
            <span className="gradient-text">Rewards</span>
          </h1>
          <p className="text-lg text-black/70 mb-10 max-w-2xl mx-auto">
            Earn more as you trade. Keep up to 100% of your simulated profits with
            flexible payouts, loyalty perks, and milestone bonuses. Full details are
            on the way.
          </p>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glow-card text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">Coming Soon</h2>
            <p className="text-black/70">
              We are putting the finishing touches on our rewards program. Check back shortly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
