'use client'

const TRADELOCKER_LOGO = 'data:image/webp;base64,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'

const CARD_BG = 'linear-gradient(165deg, #FFFFFF 0%, #FFF8DF 46%, #F9E7A9 100%)'
const DARK_BG = 'linear-gradient(155deg, #090909 0%, #171204 52%, #2A2108 100%)'

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/75 p-4 shadow-sm backdrop-blur">
      <p className="text-2xl font-extrabold text-[#111111]">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B6A00]">{label}</p>
    </div>
  )
}

function GoldOrb({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-extrabold text-white shadow-xl ${className}`}
      style={{
        background: 'radial-gradient(circle at 32% 24%, #FFF6C7 0%, #F8CC4E 42%, #B98105 100%)',
        boxShadow: '0 18px 36px rgba(180,140,20,0.35), inset 0 2px 5px rgba(255,255,255,0.75)',
        textShadow: '0 1px 2px rgba(120,90,10,0.55)',
      }}
    >
      {children}
    </div>
  )
}

function PlatformCard({ name, sub, children, dark = false }: { name: string; sub: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 ${dark ? 'border-[#D4AF37]/30 bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]' : 'border-black/5 bg-white/70 text-black shadow-sm'}`}>
      <div className="flex h-28 items-center justify-center rounded-2xl border border-current/10 bg-current/[0.03]">
        {children}
      </div>
      <h4 className="mt-4 text-xl font-extrabold">{name}</h4>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-black/55'}`}>{sub}</p>
    </div>
  )
}

function InstrumentsArt() {
  const ring = ['$', 'Ξ', '₿', '€', '¥', '£']
  return (
    <div className="relative h-[190px] w-[220px]">
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/25 bg-white/45" />
      {ring.map((symbol, index) => {
        const angle = (index / ring.length) * Math.PI * 2 - Math.PI / 2
        const x = 110 + Math.cos(angle) * 70
        const y = 95 + Math.sin(angle) * 58
        return (
          <GoldOrb key={symbol} className="absolute h-14 w-14 text-xl" style={{ left: x - 28, top: y - 28 } as React.CSSProperties}>
            {symbol}
          </GoldOrb>
        )
      })}
    </div>
  )
}

export function TradingPlatformsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(212,175,55,0.14),transparent_32%),radial-gradient(circle_at_80%_45%,rgba(212,175,55,0.10),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#B59410]">CK CAPITAL EXPERIENCE</p>
            <h2 className="max-w-3xl text-4xl font-extrabold tracking-[-1px] text-[#111111] md:text-6xl md:tracking-[-1.8px]">
              Built for flexible simulated trading.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
              Access supported platforms, clear trading objectives, reward cycle options, and account tools designed for a smoother evaluation journey.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Metric label="Platforms" value="2" />
            <Metric label="Instruments" value="300+" />
            <Metric label="Support" value="24/7" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-5 lg:row-span-2" style={{ background: CARD_BG }}>
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Reward access</p>
                <h3 className="mt-3 text-3xl font-extrabold text-[#111111]">Crypto Reward Options</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">
                  Eligible reward requests can be processed through supported crypto options according to CK Capital program rules and account eligibility.
                </p>
              </div>
              <div className="relative mx-auto mt-10 h-56 w-full max-w-[360px]">
                <GoldOrb className="absolute left-8 top-20 h-24 w-24 text-4xl">Ξ</GoldOrb>
                <GoldOrb className="absolute left-1/2 top-5 h-28 w-28 -translate-x-1/2 text-5xl">Ł</GoldOrb>
                <GoldOrb className="absolute right-8 top-20 h-28 w-28 text-5xl">₿</GoldOrb>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 p-7 shadow-sm lg:col-span-7" style={{ background: DARK_BG }}>
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="relative z-10 grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#D4AF37]">Platform access</p>
                <h3 className="mt-3 text-3xl font-extrabold text-white">Trade on MT5 & TradeLocker</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Choose from supported platform options built for evaluation tracking, flexible access, and a clean simulated trading workflow.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <PlatformCard name="MT5 Platform" sub="Familiar charting and market access." dark>
                  <img src="/mt5.png" alt="MetaTrader 5" className="h-16 w-16 object-contain" />
                </PlatformCard>
                <PlatformCard name="TradeLocker" sub="Modern interface for active traders." dark>
                  <img src={TRADELOCKER_LOGO} alt="TradeLocker" className="max-h-14 max-w-[190px] object-contain" />
                </PlatformCard>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-4" style={{ background: CARD_BG }}>
            <h3 className="text-2xl font-extrabold text-[#111111]">300+ Instruments</h3>
            <p className="mt-2 text-sm leading-relaxed text-black/60">Access a broad simulated market environment across supported instruments.</p>
            <div className="mt-5 flex justify-center">
              <InstrumentsArt />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-3" style={{ background: CARD_BG }}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Reward timing</p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#111111]">Flexible Reward Cycles</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              Reward requests are reviewed based on the selected evaluation model, account status, and program eligibility.
            </p>
            <div className="mt-6 rounded-2xl border border-[#D4AF37]/25 bg-white/60 p-4 text-sm font-bold text-[#806000]">
              Bi-weekly and other approved program options
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-5" style={{ background: CARD_BG }}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Clear rules</p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#111111]">Built around evaluation clarity</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Trading objectives', 'Risk limits', 'Program eligibility', 'Reward request status'].map((item) => (
                <div key={item} className="rounded-2xl border border-black/5 bg-white/65 px-4 py-3 text-sm font-bold text-black/70">
                  <span className="mr-2 text-[#B59410]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
