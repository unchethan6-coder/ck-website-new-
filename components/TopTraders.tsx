'use client'

type Trader = { name: string; flag: string; earnings: string; time: string }

const TRADERS: Trader[] = [
  { name: 'Kyros Sofokleious', flag: '🇨🇾', earnings: '$16,886', time: '15h ago' },
  { name: 'Nicolai O. Madsen', flag: '🇩🇰', earnings: '$16,428', time: '10h ago' },
  { name: 'Malak Reiad', flag: '🇪🇬', earnings: '$16,377', time: '7h ago' },
  { name: 'Samuel Dickson', flag: '🇬🇧', earnings: '$16,022', time: '7h ago' },
  { name: 'Constantinos K.', flag: '🇬🇷', earnings: '$16,000', time: '14h ago' },
  { name: 'Adil Mohammed', flag: '🇺🇿', earnings: '$15,876', time: '12h ago' },
  { name: 'Dmitri Volkov', flag: '🇷🇺', earnings: '$15,654', time: '8h ago' },
  { name: 'Sofia Chen', flag: '🇨🇳', earnings: '$15,397', time: '6h ago' },
]

const STATS = [
  { value: '500.9K+', label: 'CK Capital Accounts' },
  { value: '122.8K+', label: 'Rewarded Traders' },
  { value: '$100.1M+', label: 'Total Rewarded' },
]

function rankStyle(rank: number) {
  if (rank === 1) return 'linear-gradient(135deg, #FCE17B 0%, #D4AF37 100%)'
  if (rank === 2) return 'linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)'
  return 'linear-gradient(135deg, #E8B07A 0%, #B45309 100%)'
}

export function TopTraders() {
  const top3 = TRADERS.slice(0, 3)
  const podium = [
    { ...top3[1], rank: 2 },
    { ...top3[0], rank: 1 },
    { ...top3[2], rank: 3 },
  ]
  const rest = TRADERS.slice(3)
  const loop = [...rest, ...rest]

  return (
    <section className='relative overflow-hidden bg-[#070708]' style={{ paddingTop: '28px', paddingBottom: '22px' }}>
      <style>{`@keyframes top-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.top-marquee{animation:top-marquee 32s linear infinite}.top-marquee:hover{animation-play-state:paused}`}</style>
      <div className='pointer-events-none absolute inset-0' style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.13), transparent 70%)' }} />

      <div className='relative max-w-7xl mx-auto px-4 md:px-6'>
        {/* Heading */}
        <div className='text-center mb-12 md:mb-16'>
          <p className='text-xs font-semibold tracking-[0.25em] text-[#D4AF37] mb-3'>LEADERBOARD</p>
          <h2 className='text-3xl md:text-5xl font-bold text-white text-balance'>
            Rewarding Our <span className='gradient-text'>Best Traders</span>
          </h2>
          <p className='text-white/60 mt-3 max-w-2xl mx-auto'>Real payouts to real traders — every single day.</p>
        </div>

        {/* Podium (top 3) */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto items-end mb-14'>
          {podium.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 pt-8 pb-6 text-center ${t.rank === 1 ? 'order-first md:order-none md:-translate-y-5 ring-2 ring-[#D4AF37]/40 shadow-[0_0_45px_rgba(212,175,55,0.25)]' : ''}`}
            >
              <div className='absolute -top-4 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-black shadow-lg' style={{ background: rankStyle(t.rank) }}>
                {t.rank}
              </div>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-black shadow-md' style={{ background: rankStyle(t.rank) }}>
                {t.name.charAt(0)}
              </div>
              <p className='mt-4 font-semibold text-white'>{t.name} <span className='ml-1'>{t.flag}</span></p>
              <p className='mt-2 text-2xl md:text-3xl font-bold gradient-text'>{t.earnings}</p>
              <p className='mt-1 text-xs text-white/45'>Reward · {t.time}</p>
              {t.rank === 1 && (
                <div className='mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-black' style={{ background: rankStyle(1) }}>Top Earner</div>
              )}
            </div>
          ))}
        </div>

        {/* Live ticker of more winners */}
        <div className='relative overflow-hidden mb-16'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070708] to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070708] to-transparent' />
          <div className='flex w-max gap-3 top-marquee'>
            {loop.map((t, i) => (
              <div key={i} className='flex flex-shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FCE17B] to-[#D4AF37] text-sm font-bold text-black'>{t.name.charAt(0)}</div>
                <div className='text-left'>
                  <p className='text-sm font-medium text-white'>{t.name} <span>{t.flag}</span></p>
                  <p className='text-xs font-semibold text-[#FFD700]'>{t.earnings} · {t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto'>
          {STATS.map((s) => (
            <div key={s.label} className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm py-7 text-center'>
              <p className='mb-1 text-3xl md:text-4xl font-bold gradient-text'>{s.value}</p>
              <p className='text-sm text-white/55'>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
