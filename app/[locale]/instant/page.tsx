'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Zap } from 'lucide-react'

export default function InstantPage() {
  const t = useTranslations('instant')
  const tFaq = useTranslations('faq')

  const benefits = [
    { icon: <Zap className="w-8 h-8 text-primary" />, title: 'No Evaluation', description: 'Skip the challenge. Get funded in minutes, not days.' },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Immediate Access', description: 'Start trading right away. No waiting, no delays.' },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Flexible Funding', description: 'Choose account size from $5K to $50K. Scale up with performance.' },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Generous Rules', description: 'Relaxed profit targets and daily loss limits. Room to grow.' },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Lower Consistency', description: 'Only 20% consistency requirement. Build your track record fast.' },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: '100% Profit Share', description: 'Keep up to 100% of your simulated profits. No hidden fees.' },
  ]

  const pricing = [
    { amount: '$5K', price: '$20' },
    { amount: '$10K', price: '$40' },
    { amount: '$25K', price: '$100' },
    { amount: '$50K', price: '$200' },
    { amount: 'Custom', price: 'Contact' },
  ]

  const comparison = [
    { feature: 'Evaluation Required', instant: 'No', challenge: 'Yes' },
    { feature: 'Time to Trade', instant: 'Minutes', challenge: 'After Evaluation' },
    { feature: 'Max Daily Loss', instant: '3%', challenge: '4%' },
    { feature: 'Max Loss', instant: '5%', challenge: '8%' },
    { feature: 'Consistency', instant: '20%', challenge: 'None' },
    { feature: 'Profit Share', instant: '100%', challenge: '100%' },
    { feature: 'Price', instant: '$20+', challenge: '$13' },
  ]

  const instantFaqs = [
    {
      q: tFaq('items.instantPayouts.q'),
      a: tFaq('items.instantPayouts.a'),
    },
    {
      q: tFaq('items.timeLimit.q'),
      a: tFaq('items.timeLimit.a'),
    },
    {
      q: tFaq('items.profitSplit.q'),
      a: tFaq('items.profitSplit.a'),
    },
    {
      q: tFaq('items.platforms.q'),
      a: tFaq('items.platforms.a'),
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold">
            {t('badge')}
          </div>
          <h1 className="hero-title text-foreground mb-6 text-balance">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-foreground mb-12 text-center">{t('whyTitle')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="glow-card flex flex-col items-start">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Pricing */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-foreground mb-12 text-center">{t('pricesTitle')}</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pricing.map((item, idx) => (
              <div key={idx} className="glow-card text-center">
                <p className="text-2xl font-bold text-primary mb-2">{item.amount}</p>
                <p className="text-foreground text-sm mb-4">From {item.price}</p>
                <Link
                  href="https://app.ckcapital.co.uk/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs hover:text-primary/70 transition-colors"
                >
                  {t('getStarted')} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-foreground mb-12 text-center">{t('comparisonTitle')}</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">{t('feature')}</th>
                  <th className="text-center py-3 px-4 text-primary font-semibold">{t('instantCol')}</th>
                  <th className="text-center py-3 px-4 text-foreground font-semibold">{t('challengeCol')}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
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
          <h2 className="section-title text-foreground mb-12 text-center">FAQ</h2>

          <div className="space-y-4">
            {instantFaqs.map((item, idx) => (
              <div key={idx} className="glow-card">
                <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                <p className="text-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
