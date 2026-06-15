'use client'

function Coin({
  symbol,
  className = '',
  size = 84,
}: {
  symbol: string
  className?: string
  size?: number
}) {
  return (
    <div
      className={`absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg ${className}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(150deg, #FDE68A 0%, #F2C84B 45%, #C99700 100%)',
        boxShadow: '0 10px 24px rgba(180,140,20,0.35), inset 0 2px 4px rgba(255,255,255,0.6)',
        fontSize: size * 0.42,
      }}
    >
      <span style={{ textShadow: '0 1px 2px rgba(120,90,10,0.5)' }}>{symbol}</span>
    </div>
  )
}

function CryptoArt() {
  return (
    <div className="relative mx-auto" style={{ width: 240, height: 200 }}>
      <Coin symbol="Ξ" size={92} className="left-2 top-16" />
      <Coin symbol="Ł" size={104} className="left-16 top-4" />
      <Coin symbol="₿" size={110} className="right-2 top-14" />
    </div>
  )
}

function CalendarArt() {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 150, height: 150 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-2 top-6 bottom-2 rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, #FFFFFF 0%, #FDF2C4 100%)',
          boxShadow: '0 14px 30px rgba(180,140,20,0.28), inset 0 2px 3px rgba(255,255,255,0.7)',
          border: '1px solid #F2E2A0',
        }}
      >
        <div
          className="h-9 rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #F2C84B, #E0B33A)' }}
        />
      </div>
      <div
        className="absolute rounded-full"
        style={{ width: 16, height: 28, left: 36, top: 0, background: '#E0B33A' }}
      />
      <div
        className="absolute rounded-full"
        style={{ width: 16, height: 28, right: 36, top: 0, background: '#E0B33A' }}
      />
    </div>
  )
}

function InstrumentsArt() {
  const ring = ['$', 'Ξ', '₿', 'Ł', '€', '¥']
  return (
    <div className="relative mx-auto" style={{ width: 200, height: 170 }}>
      {ring.map((s, i) => {
        const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2
        const x = 100 + Math.cos(angle) * 60
        const y = 85 + Math.sin(angle) * 52
        return (
          <div
            key={s}
            className="absolute rounded-full flex items-center justify-center text-white font-bold"
            style={{
              width: 56,
              height: 56,
              left: x - 28,
              top: y - 28,
              background: 'linear-gradient(150deg, #FDE68A 0%, #F2C84B 45%, #C99700 100%)',
              boxShadow: '0 8px 18px rgba(180,140,20,0.3), inset 0 2px 3px rgba(255,255,255,0.6)',
              fontSize: 22,
              textShadow: '0 1px 2px rgba(120,90,10,0.5)',
            }}
          >
            {s}
          </div>
        )
      })}
    </div>
  )
}

const CARD_BG =
  'linear-gradient(165deg, #FFFFFF 0%, #FEFAE8 55%, #FBF0C4 100%)'

export function TradingPlatformsSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
          Why Traders Love CK Capital?
        </h2>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-[#5b5b5b] leading-relaxed">
          Explore our simulated trading platform to acquire essential trading skills,
          enhance your expertise, and earn rewards based on your performance.
        </p>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5 md:gap-6">
          {/* Crypto Withdrawals — tall left card */}
          <div
            className="md:row-span-2 rounded-3xl border border-black/5 p-7 flex flex-col justify-between min-h-[360px] shadow-sm"
            style={{ background: CARD_BG }}
          >
            <div className="flex-1 flex items-center justify-center py-4">
              <CryptoArt />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#111111]">Crypto Withdrawals</h3>
              <p className="mt-2 text-sm text-[#5b5b5b] leading-relaxed">
                Easily and securely transfer your performance rewards to your chosen crypto
                wallet, featuring lightning-fast processing and exceptional security.
              </p>
            </div>
          </div>

          {/* Fast Payouts — wide top card */}
          <div
            className="md:col-span-2 rounded-3xl border border-black/5 p-7 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
            style={{ background: CARD_BG }}
          >
            <div className="flex-1 order-2 sm:order-1">
              <h3 className="text-2xl font-extrabold text-[#111111]">Fast Payouts</h3>
              <p className="mt-3 text-sm text-[#5b5b5b] leading-relaxed max-w-md">
                Say goodbye to waiting for your rewards! Our streamlined payout process is fast and reliable,
                guaranteeing that you can access your earnings whenever you need them.
              </p>
              <p className="mt-4 text-[11px] text-[#8a8a8a]">
                Actual trader payout. Individual results vary. Trading involves risk.
              </p>
            </div>
            <div className="order-1 sm:order-2 flex-shrink-0">
              <CalendarArt />
            </div>
          </div>

          {/* 300+ Instruments */}
          <div
            className="rounded-3xl border border-black/5 p-7 flex flex-col items-center text-center shadow-sm min-h-[260px]"
            style={{ background: CARD_BG }}
          >
            <h3 className="text-xl font-extrabold text-[#111111]">300+ Instruments</h3>
            <div className="flex-1 flex items-center justify-center mt-2">
              <InstrumentsArt />
            </div>
          </div>

          {/* MT5 Platform */}
          <div
            className="rounded-3xl border border-black/5 p-7 flex flex-col items-center justify-between text-center shadow-sm min-h-[260px]"
            style={{ background: CARD_BG }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 120,
                  height: 120,
                  background: 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #FDF0BF 60%, #F2C84B 100%)',
                  boxShadow: '0 14px 30px rgba(180,140,20,0.28), inset 0 2px 4px rgba(255,255,255,0.7)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/mt5.png" alt="MetaTrader 5" width={70} height={70} className="object-contain" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-[#111111] mt-4">MT5 Platform</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
