'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const metrics = [
  { label: 'Accounts Given Away', target: 12487, prefix: '', suffix: '', compact: false, delta: '+17 live today' },
  { label: 'Rewards Processed', target: 4.82, prefix: '$', suffix: 'M', compact: true, delta: '+$6.4k today' },
  { label: 'Traders Rewarded', target: 3427, prefix: '', suffix: '', compact: false, delta: '+9 today' },
  { label: 'Countries Active', target: 28, prefix: '', suffix: '', compact: false, delta: 'live global feed' },
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

const mapMarkers = [
  { left: '18%', top: '67%', color: '#40F285' },
  { left: '31%', top: '58%', color: '#D8AD00' },
  { left: '52%', top: '67%', color: '#40F285' },
  { left: '64%', top: '58%', color: '#D8AD00' },
  { left: '78%', top: '67%', color: '#40F285' },
]

function AnimatedNumber({ target, prefix = '', suffix = '', compact = false }: { target: number; prefix?: string; suffix?: string; compact?: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 1600
    const startedAt = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])

  const display = compact
    ? value.toFixed(2)
    : Math.round(value).toLocaleString('en-US')

  return <>{prefix}{display}{suffix}</>
}

function MetricCard({ label, target, prefix, suffix, compact, delta }: typeof metrics[number]) {
  return (
    <div className="rounded-lg border border-[#D8AD00]/20 bg-[#0B0B0C] p-2.5 md:p-3">
      <p className="text-[9px] font-bold text-[#969690]">{label}</p>
      <div className="mt-1.5 flex flex-wrap items-end gap-x-2 gap-y-1">
        <p className="text-xl font-extrabold leading-none text-[#D8AD00] md:text-[22px]">
          <AnimatedNumber target={target} prefix={prefix} suffix={suffix} compact={compact} />
        </p>
        <p className="text-[9px] font-extrabold text-[#40F285]">{delta}</p>
      </div>
    </div>
  )
}

function CountryCard({ flag, country, name, time, value, type }: typeof countryCards[number]) {
  return (
    <div className="country-floating-card grid grid-cols-[24px_1fr_auto] items-center gap-2 rounded-lg border border-[#D8AD00]/20 bg-[#09090A] p-2">
      <span className="text-base md:text-lg">{flag}</span>
      <div>
        <p className="text-[10px] font-extrabold text-[#F7F4EA] md:text-[11px]">{country}</p>
        <p className="mt-0.5 text-[7px] text-[#969690] md:text-[8px]">{name} • {time}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-extrabold text-[#D8AD00] md:text-[11px]">{value}</p>
        <p className="mt-0.5 text-[7px] font-bold text-[#40F285] md:text-[8px]">{type}</p>
      </div>
    </div>
  )
}

function FeedItem({ flag, name, meta, value }: typeof feed[number]) {
  return (
    <div className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-full border border-[#D8AD00]/18 bg-[#080808] px-4 py-2.5 shadow-[inset_0_0_0_1px_rgba(216,173,0,0.04)]">
      <span className="text-base leading-none">{flag}</span>
      <div>
        <p className="text-xs font-extrabold leading-tight text-[#F7F4EA] md:text-sm">{name}</p>
        <p className="mt-0.5 text-[9px] text-[#969690] md:text-[10px]">{meta}</p>
      </div>
      <p className="text-right text-xs font-extrabold text-[#D8AD00] md:text-sm">{value}</p>
    </div>
  )
}

export function LiveGlobalProofDashboard() {
  const scrollingFeed = [...feed, ...feed]

  return (
    <section className="relative overflow-hidden bg-white px-4 py-8 md:px-6 md:py-10">
      <style jsx global>{`
        body > div > section:has(h2.section-title):has(.space-y-8) { display: none !important; }
        @keyframes live-feed-vertical { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes country-soft-float { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -5px, 0); } }
        .live-feed-scroll { animation: live-feed-vertical 18s linear infinite; will-change: transform; }
        .live-feed-scroll:hover { animation-play-state: paused; }
        .country-floating-card { animation: country-soft-float 6s ease-in-out infinite; will-change: transform; }
        .country-floating-card:nth-child(2) { animation-delay: 0.6s; }
        .country-floating-card:nth-child(3) { animation-delay: 1.2s; }
        .country-floating-card:nth-child(4) { animation-delay: 1.8s; }
      `}</style>

      <div className="pointer-events-none absolute left-[-28%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />
      <div className="pointer-events-none absolute right-[-25%] top-[14%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />

      <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[28px] bg-[#040404] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:rounded-[42px] md:p-5 lg:p-6">
        <div className="pointer-events-none absolute left-[5%] top-[-12%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(216,173,0,0.32)_0%,rgba(216,173,0,0.07)_70%,rgba(216,173,0,0)_100%)]" />

        <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="text-sm font-bold tracking-[0.12em] text-[#D8AD00]">CK CAPITAL</span>
            <h2 className="mt-2 max-w-2xl text-xl font-extrabold tracking-[-0.03em] text-[#F7F4EA] md:text-3xl md:leading-tight">Live Global Proof Dashboard</h2>
            <p className="mt-1.5 text-xs text-[#9B9B94] md:text-sm">Track recent reward processing and account giveaway activity in real time.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFF0A0_0%,#D8AD00_45%,#8A6B00_100%)] px-4 text-[10px] font-extrabold text-[#050505]">Join Giveaway</Link>
              <Link href="#payout-certificates" className="inline-flex h-8 items-center justify-center rounded-full border border-[#D8AD00]/50 bg-[#050505] px-4 text-[10px] font-extrabold text-[#D8AD00]">View Live Feed</Link>
            </div>
          </div>

          <div className="inline-flex h-7 w-max items-center gap-2 rounded-full border border-[#40F285]/35 bg-[#0A0A0A] px-3 text-[9px] font-extrabold text-[#40F285]"><span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#40F285] opacity-70" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#40F285]" /></span>LIVE COUNTERS ACTIVE</div>
        </div>

        <div className="relative z-10 mt-5 rounded-xl border border-[#D8AD00]/20 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-2.5 md:p-3">
          <div className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-4">{metrics.map((item) => <MetricCard key={item.label} {...item} />)}</div>
        </div>

        <div className="relative z-10 mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden rounded-xl border border-[#D8AD00]/25 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-3.5 md:p-4">
            <div className="pointer-events-none absolute left-[8%] top-[52%] h-14 w-[70%] rounded-full border border-dashed border-[#D8AD00]/15" />
            <div className="pointer-events-none absolute left-[16%] top-[68%] h-10 w-[55%] rounded-full border border-dashed border-[#D8AD00]/10" />
            {mapMarkers.map((marker) => <span key={`${marker.left}-${marker.top}`} className="absolute h-1.5 w-1.5 rounded-full blur-[2px]" style={{ left: marker.left, top: marker.top, backgroundColor: marker.color }} />)}
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#D8AD00]">Global Activity Map</p>
            <h3 className="mt-1 text-lg font-extrabold text-[#F7F4EA] md:text-xl">Live Country Counter</h3>
            <p className="mt-1 text-[10px] text-[#969690] md:text-xs">Live giveaway and rewards activity from traders worldwide.</p>
            <div className="relative z-10 mt-4 grid gap-2.5 sm:grid-cols-2">{countryCards.map((item) => <CountryCard key={`${item.country}-${item.name}`} {...item} />)}</div>
          </div>

          <div className="rounded-xl border border-[#D8AD00]/25 bg-[linear-gradient(135deg,#111111_0%,#080808_55%,#020202_100%)] p-4 md:p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#D8AD00]">Real-Time Feed</p>
            <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#F7F4EA] md:text-3xl">Live Activity</h3>
            <p className="mt-2 text-sm text-[#969690] md:text-base">Live Rewards & Giveaways</p>
            <div className="relative mt-4 h-[285px] overflow-hidden">
              <div className="live-feed-scroll space-y-3 pb-3">{scrollingFeed.map((item, index) => <FeedItem key={`${item.name}-${item.value}-${index}`} {...item} />)}</div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#111111] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#111111] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
