'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function InstantPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070A18] via-[#0C1024] to-[#070A18]" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(110, 84, 255, 0.1) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
            NEWLY LAUNCHED
          </div>
          <h1 className="hero-title text-white mb-6 text-balance">
            No Challenge.<br />Start <span className="gradient-text">Instantly</span>.
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Skip the evaluation process and get funded immediately. Start trading right away with accounts from $5K to $50K.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Why Choose Instant Funding?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: 'No Evaluation',
                description: 'Skip the challenge. Get funded in minutes, not days.'
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: 'Immediate Access',
                description: 'Start trading right away. No waiting, no delays.'
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: 'Flexible Funding',
                description: 'Choose account size from $5K to $50K. Scale up with performance.'
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: 'Generous Rules',
                description: 'Relaxed profit targets and daily loss limits. Room to grow.'
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: 'Lower Consistency',
                description: 'Only 20% consistency requirement. Build your track record fast.'
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: '100% Profit Share',
                description: 'Keep up to 100% of your simulated profits. No hidden fees.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glow-card flex flex-col items-start">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Pricing */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Instant Funding Prices</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { amount: '$5K', price: '$20' },
              { amount: '$10K', price: '$40' },
              { amount: '$25K', price: '$100' },
              { amount: '$50K', price: '$200' },
              { amount: 'Custom', price: 'Contact' },
            ].map((item, idx) => (
              <div key={idx} className="glow-card text-center">
                <p className="text-2xl font-bold text-primary mb-2">{item.amount}</p>
                <p className="text-foreground text-sm mb-4">From {item.price}</p>
                <Link
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs hover:text-[#7C5CFF] transition-colors"
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison vs Challenge */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Instant vs Challenge</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-white font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 text-primary font-semibold">Instant Funding</th>
                  <th className="text-center py-3 px-4 text-foreground font-semibold">1-Step Challenge</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Evaluation Required', instant: 'No', challenge: 'Yes' },
                  { feature: 'Time to Trade', instant: 'Minutes', challenge: 'After Evaluation' },
                  { feature: 'Max Daily Loss', instant: '$750', challenge: '$200' },
                  { feature: 'Max Loss', instant: '$1,250', challenge: '$400' },
                  { feature: 'Consistency', instant: '20%', challenge: 'None' },
                  { feature: 'Profit Share', instant: '100%', challenge: '100%' },
                  { feature: 'Price', instant: '$20+', challenge: '$13' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border/50">
                    <td className="py-3 px-4 text-foreground">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-primary font-semibold">{row.instant}</td>
                    <td className="py-3 px-4 text-center text-foreground">{row.challenge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">FAQ</h2>

          <div className="space-y-4">
            {[
              {
                q: 'How quickly can I start trading?',
                a: 'You can be trading within minutes of purchase. Instant Funding accounts are activated immediately.'
              },
              {
                q: 'What are the rules for Instant Funding?',
                a: 'Max Daily Loss: $750, Max Loss: $1,250, Consistency: 20%. Much more relaxed than challenge evaluations.'
              },
              {
                q: 'Can I upgrade my account size?',
                a: 'Yes. As you prove profitability, you can upgrade to larger account sizes up to $1.2M simulated capital.'
              },
              {
                q: 'What if I lose my account?',
                a: 'You can reset and try again. We offer reset options to give you another opportunity to succeed.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glow-card">
                <h3 className="font-bold text-white mb-2">{item.q}</h3>
                <p className="text-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
