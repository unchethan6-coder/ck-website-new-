'use client'

import Link from 'next/link'

const metrics = [
  { label: 'Accounts Given Away', value: '12,487', delta: '+17 live today' },
  { label: 'Rewards Processed', value: '$4.82M', delta: '+$6.4k today' },
  { label: 'Traders Rewarded', value: '3,427', delta: '+9 today' },
  { label: 'Countries Active', value: '28', delta: 'live global feed' },
]

const countryCards = [
  { flag: '🇬🇧', country: 'United Kingdom', name: 'James Carter', time: '2 min ago', value: '+$840', type: 'live reward' },
  { flag: '🇵🇰', country: 'Pakistan', name: 'Ahmed Khan', time: '5 min ago', value: '+$1,250', type: 'live reward' },
  { flag: '🇮🇳', country: 'India', name: 'Arjun Mehta', time: '8 min ago', value: '+1 acc', type: 'giveaway' },
  { flag: '🇨🇦', country: 'Canada', name: 'Noah Wilson', time: '11 min ago', value: '+$680', type: 'live reward' },
]

const feed = [
  { flag: '🇵🇰', name: 'Ahmed Khan', meta: 'Pakistan • reward processed', value: '$1,250' },
  { flag: '🇬🇧', name: 'James Carter', meta: 'UK • reward processed', value: '$840' },
  { flag: '🇦🇺', name: 'Liam Brooks', meta: 'Australia • account giveaway', value: '+1 acc' },
  { flag: '🇮🇳', name: 'Arjun Mehta', meta: 'India • account giveaway', value: '+1 acc' },
  { flag: '🇨🇦', name: 'Noah Wilson', meta: 'Canada • reward processed', value: '$680' },
]

function MetricCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-[#D8AD00]/20 bg-[#0B0B0C] p-5 md:p-6">
      <p className="text-xs font-bold text-[#969690] md:text-sm">{label}</p>
      <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
        <p className="text-3xl font-extrabold leading-none text-[#D8AD00] md:text-4xl">{value}</p>
        <p className="text-xs font-extrabold text-[#40F285] md:text-sm">{delta}</p>
      </div>
    </div>
  )
}

function CountryCard({ flag, country, name, time, value, type }: typeof countryCards[number]) {
  return (
    <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-xl border border-[#D8AD00]/20 bg-[#09090A] p-3 md:p-4">
      <span className="text-2xl md:text-3xl">{flag}</span>
      <div>
        <p className="text-sm font-extrabold text-[#F7F4EA]">{country}</p>
        <p className="mt-1 text-[10px] text-[#969690] md:text-xs">{name} • {time}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-extrabold text-[#D8AD00] md:text-base">{value}</p>
        <p className="mt-1 text-[10px] font-bold text-[#40F285] md:text-xs">{type}</p>
      </div>
    </div>
  )
}

function FeedItem({ flag, name, meta, value }: typeof feed[number]) {
  return (
    <div className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-xl border border-[#D8AD00]/15 bg-[#09090A] px-4 py-3">
      <span className="text-lg">{flag}</span>
      <div>
        <p className="text-sm font-extrabold text-[#F7F4EA]">{name}</p>
        <p className="mt-1 text-[10px] text-[#969690]">{meta}</p>
      </div>
      <p className="text-right text-sm font-extrabold text-[#D8AD00]">{value}</p>
    </div>
  )
}

export function LiveGlobalProofDashboard() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute left-[-28%] top-[10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />
      <div className="pointer-events-none absolute right-[-25%] top-[14%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />

      <div className="relative mx-auto max-w-[1215px] overflow-hidden rounded-[42px] bg-[#040404] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.22)] md:rounded-[72px] md:p-10 lg:p-14">
        <div className="pointer-events-none absolute left-[5%] top-[-12%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#D8AD00]">CK CAPITAL</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.03em] text-[#F7F4EA] md:text-5xl">
              Live Global Proof Dashboard
            </h2>
            <p className="mt-3 text-base text-[#9B9B94] md:text-lg">
              Track recent reward processing and account giveaway activity in real time.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFF0A0_0%,#D8AD00_45%,#8A6B00_100%)] px-7 text-sm font-extrabold text-[#050505]">
                Join Giveaway
              </Link>
              <Link href="#payout-certificates" className="inline-flex h-12 items-center justify-center rounded-full border border-[#D8AD00]/50 bg-[#050505] px-7 text-sm font-extrabold text-[#D8AD00]">
                View Live Feed
              </Link>
            </div>
          </div>

          <div className="inline-flex h-10 w-max items-center gap-3 rounded-full border border-[#40F285]/35 bg-[#0A0A0A] px-5 text-xs font-extrabold text-[#40F285]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#40F285] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#40F285]" />
            </span>
            LIVE COUNTERS ACTIVE
          </div>
        </div>

        <div className="relative z-10 mt-10 rounded-[28px] border border-[#D8AD00]/20 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item) => <MetricCard key={item.label} {...item} />)}
          </div>
        </div>

        <div className="relative z-10 mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[28px] border border-[#D8AD00]/25 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-5 md:p-7">
            <div className="pointer-events-none absolute left-[8%] top-[47%] h-28 w-[70%] rounded-full border-2 border-dashed border-[#D8AD00]/15" />
            <div className="pointer-events-none absolute left-[16%] top-[64%] h-20 w-[55%] rounded-full border-2 border-dashed border-[#D8AD00]/10" />
            {[18, 31, 52, 64, 78].map((left, index) => (
              <span key={left} className={`absolute top-[${index % 2 ? '58%' : '67%'}] h-2.5 w-2.5 rounded-full ${index % 2 ? 'bg-[#D8AD00]' : 'bg-[#40F285]'} blur-[3px]`} style={{ left: `${left}%` }} />
            ))}

            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D8AD00]">Global Activity Map</p>
            <h3 className="mt-2 text-2xl font-extrabold text-[#F7F4EA]">Live Country Counter</h3>
            <p className="mt-2 text-sm text-[#969690]">Live giveaway and rewards activity from traders worldwide.</p>

            <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2">
              {countryCards.map((item) => <CountryCard key={`${item.country}-${item.name}`} {...item} />)}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#D8AD00]/25 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-5 md:p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#D8AD00]">Real-Time Feed</p>
            <h3 className="mt-2 text-2xl font-extrabold text-[#F7F4EA]">Live Activity</h3>
            <p className="mt-2 text-sm text-[#969690]">Live Rewards & Giveaways</p>

            <div className="mt-6 space-y-3">
              {feed.map((item) => <FeedItem key={`${item.name}-${item.value}`} {...item} />)}
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-7 text-center text-xs leading-relaxed text-[#969690]">
          Displayed activity should be connected to verified internal data before using exact live totals publicly.
        </p>
      </div>
    </section>
  )
}
