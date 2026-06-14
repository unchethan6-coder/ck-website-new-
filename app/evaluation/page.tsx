'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function EvaluationPage() {
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
            Trading <span className="gradient-text">Evaluations</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto" style={{ color: '#000000' }}>
            Prove your trading skills and unlock access to funded simulated accounts with profit-sharing opportunities up to 100%.
          </p>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Your Path to Success</h2>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Evaluation Stage',
                description: 'Complete the initial evaluation to demonstrate your trading competency. Meet profit targets while respecting risk rules.',
              },
              {
                step: 2,
                title: 'Verification',
                description: 'Move to verification with simplified objectives. Prove consistency in a demo environment up to $100K capital.',
              },
              {
                step: 3,
                title: 'Qualified Analyst',
                description: 'Become a qualified trader and earn up to 100% profit share on accounts up to $1.2M simulated capital.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-[#7C5CFF] flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  {idx < 2 && (
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

      {/* Rules Grid */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Trading Rules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Profit Target', value: '$500 → $250' },
              { label: 'Max Daily Loss', value: '$200' },
              { label: 'Max Loss', value: '$400' },
              { label: 'Min Trading Days', value: '1 day' },
              { label: 'Consistency', value: 'None for 1-Step' },
              { label: 'News Trading', value: 'Allowed' },
            ].map((rule, idx) => (
              <div key={idx} className="glow-card text-center">
                <p className="text-sm text-muted-foreground mb-2">{rule.label}</p>
                <p className="text-2xl font-bold text-primary">{rule.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Evaluation Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '1-Step Challenge',
                price: '$13',
                oldPrice: '$88',
              },
              {
                name: '2-Step Challenge',
                price: '$20',
                oldPrice: '$150',
              },
              {
                name: 'Reset & Top-Up',
                price: '$10-$30',
                oldPrice: 'Varies',
              },
            ].map((plan, idx) => (
              <div key={idx} className="glow-card text-center">
                <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">{plan.oldPrice}</span>
                </div>
                <Link
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary block w-full text-center"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-card/20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-white mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'How long do I have to complete the evaluation?',
                a: 'You have unlimited time to complete the evaluation phases. Trade at your own pace with no deadline pressure.'
              },
              {
                q: 'What happens if I lose my trading capital?',
                a: 'You can reset your account and start over. We offer reset and top-up options to give you another chance.'
              },
              {
                q: 'Can I withdraw my profits?',
                a: 'Yes, once you reach the qualified analyst status, you can withdraw up to 100% of your simulated profits on your schedule.'
              },
              {
                q: 'Are there restrictions on trading styles?',
                a: 'No restrictions. You can scalp, swing trade, use algorithms, or trade news. All trading styles are welcome.'
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
