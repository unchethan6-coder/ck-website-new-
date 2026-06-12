'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function AffiliatesPage() {
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
          <h1 className="hero-title text-white mb-6 text-balance">
            Become a CK Capital <span className="gradient-text">Affiliate</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Earn generous commissions by referring traders to CK Capital.
          </p>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">Commission Tiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Starter',
                commission: '20%',
                referrals: '0-10',
                features: ['Affiliate dashboard', 'Marketing materials', 'Email support']
              },
              {
                tier: 'Professional',
                commission: '25%',
                referrals: '11-50',
                features: ['Everything in Starter', 'Dedicated manager', 'Custom links']
              },
              {
                tier: 'Elite',
                commission: '30%',
                referrals: '50+',
                features: ['Everything in Professional', 'Priority support', 'Co-marketing']
              },
            ].map((plan, idx) => (
              <div key={idx} className="glow-card relative">
                <h3 className="text-xl font-bold text-white mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <p className="text-3xl font-bold text-primary">{plan.commission}</p>
                  <p className="text-sm text-muted-foreground">per referral</p>
                </div>
                <p className="text-sm text-foreground mb-6">First {plan.referrals} referrals</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">How It Works</h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Sign Up',
                description: 'Apply to become an affiliate and get approved within 24 hours.'
              },
              {
                step: 2,
                title: 'Get Your Links',
                description: 'Receive unique referral links and marketing materials.'
              },
              {
                step: 3,
                title: 'Share & Earn',
                description: 'Share your links and earn commissions on every successful referral.'
              },
              {
                step: 4,
                title: 'Withdraw Anytime',
                description: 'Withdraw your earnings monthly with no minimum threshold.'
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-[#7C5CFF] flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  {idx < 3 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-lg text-foreground mb-8">
            Join our affiliate program and start earning commissions today.
          </p>
          <Link
            href="https://app.ckcapital.co.uk/affiliates"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
