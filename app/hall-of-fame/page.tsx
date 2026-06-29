'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function HallOfFamePage() {
  const topTraders = [
    { rank: 1, name: 'Alex Thompson', payout: '$345,670', days: '187', winRate: '73%' },
    { rank: 2, name: 'Jordan Chen', payout: '$298,450', days: '154', winRate: '68%' },
    { rank: 3, name: 'Sam Patel', payout: '$267,890', days: '142', winRate: '71%' },
    { rank: 4, name: 'Casey Morgan', payout: '$245,230', days: '128', winRate: '65%' },
    { rank: 5, name: 'Riley Kim', payout: '$189,560', days: '105', winRate: '69%' },
    { rank: 6, name: 'Taylor Jackson', payout: '$178,340', days: '96', winRate: '67%' },
  ]

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
            Hall of <span className="gradient-text">Fame</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto" style={{ color: '#fbfbfe' }}>
            Celebrating our most successful traders who have achieved remarkable results.
          </p>
        </div>
      </section>

      {/* Top Traders Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-12 text-center" style={{ color: '#101820' }}>Top Performers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {topTraders.slice(0, 3).map((trader, idx) => {
              const nameColors = ['#0f0e0e', '#100f0f', '#0c0b0b'];
              const dayColors = ['#121212', '#0c0b0b', '#0e0d0d'];
              const winRateColors = ['#100f0f', '#100f0f', '#2e2929'];
              return (
                <div key={idx} className={`glow-card relative ${idx === 0 ? 'md:scale-105' : ''}`} style={{ color: '#101820' }}>
                  <div className="absolute -top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-[#D4AF37] flex items-center justify-center text-foreground font-bold text-lg">
                    #{trader.rank}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 mt-4" style={{ color: nameColors[idx] }}>{trader.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Simulated Payout</p>
                      <p className="text-3xl font-bold text-primary">{trader.payout}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Trading Days</p>
                        <p className="text-lg font-bold text-foreground" style={{ color: dayColors[idx] }}>{trader.days}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                        <p className="text-lg font-bold text-foreground" style={{ color: winRateColors[idx] }}>{trader.winRate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center" style={{ color: '#101820' }}>Full Leaderboard</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold" style={{ color: '#101820' }}>Rank</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Trader</th>
                  <th className="text-right py-3 px-4 text-foreground font-semibold" style={{ color: '#101820' }}>Simulated Payout</th>
                  <th className="text-center py-3 px-4 text-foreground font-semibold" style={{ color: '#101820' }}>Days Trading</th>
                  <th className="text-center py-3 px-4 text-foreground font-semibold" style={{ color: '#101820' }}>Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {topTraders.map((trader, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold">
                        {trader.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground font-semibold">{trader.name}</td>
                    <td className="py-3 px-4 text-right text-primary font-bold">{trader.payout}</td>
                    <td className="py-3 px-4 text-center text-foreground">{trader.days}</td>
                    <td className="py-3 px-4 text-center text-foreground">{trader.winRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
