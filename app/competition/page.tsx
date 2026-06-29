'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CountdownTimer } from '@/components/CountdownTimer'
import Link from 'next/link'

export default function CompetitionPage() {
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
          <h1 className="hero-title text-foreground mb-6 text-balance">
            Trading <span className="gradient-text">Competition</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Compete with traders worldwide for amazing prizes. Limited spots available.
          </p>
        </div>
      </section>

      {/* Prize Pool */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground mb-2">TOTAL PRIZE POOL</p>
            <h2 className="text-5xl font-bold gradient-text">$50,000</h2>
          </div>

          {/* Countdown */}
          <div className="flex justify-center mb-16">
            <div className="glow-card">
              <p className="text-center text-sm text-muted-foreground mb-4">Competition Ends In</p>
              <CountdownTimer hours={24} minutes={0} seconds={0} />
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                position: '🥇 1st Place',
                prize: '$25,000',
                criteria: 'Highest simulated profit'
              },
              {
                position: '🥈 2nd Place',
                prize: '$15,000',
                criteria: 'Second highest profit'
              },
              {
                position: '🥉 3rd Place',
                prize: '$10,000',
                criteria: 'Third highest profit'
              },
            ].map((award, idx) => (
              <div key={idx} className={`glow-card text-center ${idx === 0 ? 'md:scale-105' : ''}`}>
                <p className="text-2xl mb-2">{award.position}</p>
                <p className="text-4xl font-bold text-primary mb-4">{award.prize}</p>
                <p className="text-sm text-foreground">{award.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Current Standings</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Trader</th>
                  <th className="text-right py-3 px-4 text-foreground font-semibold">Profit</th>
                  <th className="text-center py-3 px-4 text-foreground font-semibold">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Alex T.', profit: '+$8,450', wr: '72%' },
                  { rank: 2, name: 'Jordan M.', profit: '+$7,890', wr: '68%' },
                  { rank: 3, name: 'Sam P.', profit: '+$6,750', wr: '71%' },
                  { rank: 4, name: 'Casey R.', profit: '+$5,230', wr: '65%' },
                  { rank: 5, name: 'Riley K.', profit: '+$4,560', wr: '69%' },
                ].map((trader, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="py-3 px-4 text-primary font-bold">#{trader.rank}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">{trader.name}</td>
                    <td className="py-3 px-4 text-right text-[#00B67A] font-bold">{trader.profit}</td>
                    <td className="py-3 px-4 text-center text-foreground">{trader.wr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Competition Rules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'All trading must follow account rules',
              'No proprietary bots or algorithms',
              'Simulated trading environment only',
              'Winners verified and announced weekly',
              'Rankings update in real-time',
              'Prizes paid via verified withdrawal methods',
            ].map((rule, idx) => (
              <div key={idx} className="glow-card flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <p className="text-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Compete?</h2>
          <p className="text-lg text-foreground mb-8">
            Join the competition and start competing for prizes today.
          </p>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Enter Competition
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
