'use client'

const CARD_BG = 'linear-gradient(165deg, #FFFFFF 0%, #FFF9E8 48%, #F8E7AB 100%)'
const DARK_BG = 'linear-gradient(155deg, #080808 0%, #171204 55%, #2B2208 100%)'

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/75 p-4 shadow-sm backdrop-blur">
      <p className="text-2xl font-extrabold text-[#111111]">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B6A00]">{label}</p>
    </div>
  )
}

function GoldIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold text-black shadow-md"
      style={{ background: 'linear-gradient(135deg, #FFF2B8 0%, #D4AF37 55%, #B88700 100%)' }}
    >
      {children}
    </div>
  )
}

function PlatformBadge({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50">
      <div className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-black/35">
        {children}
      </div>
      <h4 className="mt-4 text-xl font-extrabold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-foreground/55">{subtitle}</p>
    </div>
  )
}

function InstrumentsVisual() {
  const items = ['FX', 'CFD', 'IDX', 'CRYPTO', 'METALS', 'ENERGY']
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-[#D4AF37]/20 bg-white/70 px-4 py-4 text-center shadow-sm">
          <p className="text-lg font-extrabold text-[#111111]">{item}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B7500]">Supported</p>
        </div>
      ))}
    </div>
  )
}

export function TradingPlatformsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_86%_38%,rgba(212,175,55,0.12),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#B59410]">CK CAPITAL EXPERIENCE</p>
            <h2 className="max-w-3xl text-4xl font-extrabold tracking-[-1px] text-[#111111] md:text-6xl md:tracking-[-1.8px]">
              Built for a smoother evaluation journey.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
              Trade through supported platforms, track clear objectives, and use flexible program tools designed for simulated trading evaluations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Metric label="Platforms" value="2" />
            <Metric label="Markets" value="300+" />
            <Metric label="Support" value="24/7" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 p-7 shadow-sm lg:col-span-8" style={{ background: DARK_BG }}>
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
            <div className="relative z-10 grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#D4AF37]">Platform access</p>
                <h3 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">MT5 and TradeLocker access</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                  Give traders a choice between familiar charting and modern platform access inside a simulated evaluation workflow.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <PlatformBadge title="MT5 Platform" subtitle="Familiar charts, tools, and market access.">
                  <img src="/mt5.png" alt="MetaTrader 5" className="h-16 w-16 object-contain" />
                </PlatformBadge>

                <PlatformBadge title="TradeLocker" subtitle="Modern platform experience for active traders.">
                  <div className="flex h-16 w-full items-center justify-center rounded-xl bg-black px-4">
                    <span className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">TRADE<span className="text-[#D4AF37]">LOCKER</span></span>
                  </div>
                </PlatformBadge>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-4" style={{ background: CARD_BG }}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Markets</p>
            <h3 className="mt-3 text-3xl font-extrabold text-[#111111]">300+ Instruments</h3>
            <p className="mt-3 text-sm leading-relaxed text-black/60">
              Access a broad simulated market environment across supported instruments and account models.
            </p>
            <div className="mt-6">
              <InstrumentsVisual />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-4" style={{ background: CARD_BG }}>
            <div className="flex items-start gap-4">
              <GoldIcon>↻</GoldIcon>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Reward timing</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[#111111]">Flexible Reward Cycles</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-black/60">
              Reward requests are reviewed based on the selected evaluation model, account status, and program eligibility.
            </p>
            <div className="mt-6 rounded-2xl border border-[#D4AF37]/25 bg-white/65 p-4 text-sm font-bold text-[#806000]">
              Bi-weekly and other approved program options
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-4" style={{ background: CARD_BG }}>
            <div className="flex items-start gap-4">
              <GoldIcon>✓</GoldIcon>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Clear rules</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[#111111]">Evaluation Clarity</h3>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {['Trading objectives', 'Risk limits', 'Program eligibility', 'Reward request status'].map((item) => (
                <div key={item} className="rounded-2xl border border-black/5 bg-white/65 px-4 py-3 text-sm font-bold text-black/70">
                  <span className="mr-2 text-[#B59410]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 p-7 shadow-sm lg:col-span-4" style={{ background: CARD_BG }}>
            <div className="flex items-start gap-4">
              <GoldIcon>⚡</GoldIcon>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B59410]">Trader support</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[#111111]">Support When Needed</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-black/60">
              Access support for platform, rules, account, and evaluation questions during your simulated trading journey.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/65 p-4 text-center text-sm font-extrabold text-black">Discord</div>
              <div className="rounded-2xl bg-white/65 p-4 text-center text-sm font-extrabold text-black">Help Desk</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
