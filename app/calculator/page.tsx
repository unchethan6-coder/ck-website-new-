'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useState } from 'react'

export default function CalculatorPage() {
  const [profitInput, setProfitInput] = useState('1000')
  const [percentInput, setPercentInput] = useState('50')
  const [riskInput, setRiskInput] = useState('5000')
  const [pipsInput, setPipsInput] = useState('50')

  const profitResult = (parseFloat(profitInput) * parseFloat(percentInput)) / 100
  const riskResult = (parseFloat(riskInput) * parseFloat(percentInput)) / 100
  const pipsRisk = (parseFloat(riskInput) / 10) * parseFloat(pipsInput)

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
            Trading <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Calculate your profits, risk, and position sizing instantly.
          </p>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profit Calculator */}
            <div className="glow-card">
              <h3 className="text-2xl font-bold text-white mb-6">Profit Calculator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">Capital ($)</label>
                  <input
                    type="number"
                    value={profitInput}
                    onChange={(e) => setProfitInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Return (%)</label>
                  <input
                    type="number"
                    value={percentInput}
                    onChange={(e) => setPercentInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="bg-card/50 border border-primary/30 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground mb-1">Profit</p>
                  <p className="text-3xl font-bold gradient-text">
                    ${profitResult.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Risk Calculator */}
            <div className="glow-card">
              <h3 className="text-2xl font-bold text-white mb-6">Risk Calculator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">Account Balance ($)</label>
                  <input
                    type="number"
                    value={riskInput}
                    onChange={(e) => setRiskInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Risk per Trade (%)</label>
                  <input
                    type="number"
                    value={percentInput}
                    onChange={(e) => setPercentInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="bg-card/50 border border-destructive/30 rounded-lg p-4 mt-6">
                  <p className="text-sm text-muted-foreground mb-1">Max Risk per Trade</p>
                  <p className="text-3xl font-bold text-destructive">
                    ${riskResult.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Pip Calculator */}
            <div className="glow-card lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">Pip Value Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-foreground mb-2">Account Size ($)</label>
                  <input
                    type="number"
                    value={riskInput}
                    onChange={(e) => setRiskInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">Pips Moved</label>
                  <input
                    type="number"
                    value={pipsInput}
                    onChange={(e) => setPipsInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="bg-card/50 border border-primary/30 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground mb-1">P&L at {pipsInput} Pips</p>
                <p className={`text-3xl font-bold ${pipsRisk >= 0 ? 'text-[#00B67A]' : 'text-destructive'}`}>
                  {pipsRisk >= 0 ? '+' : ''}${pipsRisk.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Info */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How to Use</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Profit Calculator',
                description: 'Calculate expected profits based on your capital and return percentage.'
              },
              {
                title: 'Risk Calculator',
                description: 'Determine the maximum amount you should risk on a single trade.'
              },
              {
                title: 'Pip Calculator',
                description: 'Calculate profit/loss based on pip movements and account size.'
              },
            ].map((item, idx) => (
              <div key={idx} className="glow-card">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
