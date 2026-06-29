'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="hero-title text-foreground mb-6 text-balance">
            Meet The CK Capital <span className="gradient-text">Team</span>
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glow-card mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-foreground leading-relaxed">
              CK Capital was founded with a mission to support aspiring traders by bridging the gap between potential and achievement. Backed by a team of industry experts, we offer trader-friendly systems, in-house technology, and unparalleled support. We believe that with the right environment, education, and opportunity, traders can achieve remarkable results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glow-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-foreground">
                We provide traders with innovative tools, structured guidance, and an evaluation process using simulated capital to develop discipline, skill, and consistent profitability. We're committed to democratizing access to prop trading opportunities for traders worldwide.
              </p>
            </div>
            <div className="glow-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-foreground">
                To empower traders to reach their full potential, redefine personal success, and cultivate a global community of consistently profitable traders. We envision a future where trading skill is rewarded fairly and everyone has equal opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-foreground mb-12 text-center">Our Leadership</h2>
          
          <div className="glow-card">
            <h3 className="text-2xl font-bold text-foreground mb-2">Daniel Cheung - Founder</h3>
            <p className="text-sm text-primary mb-4">Seven-figure trader | FX Brokering Expert | Private Capital Specialist</p>
            <p className="text-foreground leading-relaxed">
              UK-born Daniel Cheung is a seven-figure trader with extensive experience in FX brokering, private capital management, and professional funds. He champions an &apos;us vs us&apos; mindset, emphasizing self-growth and collective improvement. Daniel&apos;s vision for CK Capital is to create an environment where traders are supported like family while being rewarded for their skills.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-foreground mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Integrity',
                description: 'We operate with complete transparency and honesty in all dealings.'
              },
              {
                title: 'Community',
                description: 'We foster a welcoming environment where traders support each other.'
              },
              {
                title: 'Excellence',
                description: 'We deliver best-in-class platforms, support, and trading conditions.'
              },
              {
                title: 'Innovation',
                description: 'We continuously improve our technology and services for traders.',
              },
            ].map((value, idx) => {
              const valueColors = ['#191919', '#202020', '#060606', '#080808'];
              return (
                <div key={idx} className="glow-card">
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ color: valueColors[idx] }}>{value.title}</h3>
                  <p className="text-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { stat: '50,000+', label: 'Active Traders' },
              { stat: '$1.2M', label: 'Max Simulated Capital' },
              { stat: '100%', label: 'Profit Split' },
              { stat: '24/7', label: 'Community Support' },
            ].map((item, idx) => (
              <div key={idx} className="glow-card text-center">
                <p className="text-3xl font-bold gradient-text mb-2">{item.stat}</p>
                <p className="text-sm text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6" style={{ color: '#101820' }}>Join the CK Capital Community</h2>
          <p className="text-lg text-foreground mb-8">
            Be part of a growing global community of successful traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://app.ckcapital.co.uk/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Start Trading
            </Link>
            <Link
              href="https://discord.gg/ckcapital"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
              style={{ color: '#101820', background: 'linear-gradient(to right in oklab, rgb(212, 175, 55) 0%, rgb(240, 230, 140) 100%)' }}
            >
              Join Discord
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
