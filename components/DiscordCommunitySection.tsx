'use client'

import Link from 'next/link'

function DiscordIcon() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#5865F2] shadow-[0_24px_70px_rgba(88,101,242,0.35)] md:h-24 md:w-24">
      <svg viewBox="0 0 245 240" className="h-10 w-10 text-white md:h-16 md:w-16" fill="currentColor" aria-hidden="true">
        <path d="M104.4 104.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1Zm36.2 0c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.3-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1Z" />
        <path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.4 12.8 11.9 12.1 11.2L210 220V40.6c0-11.4-9.2-20.6-20.5-20.6Zm-38.6 130.5s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2Z" />
      </svg>
    </div>
  )
}

function MiniDiscordPreview() {
  const channels = ['# announcements', '# payout-proofs', '# certificates', '# giveaways', '# support-ticket']
  const cards = [
    { title: 'Payout updates', tag: 'live', body: 'Recent reward updates and certificates shared with the community.' },
    { title: 'Support channels', tag: '24/7', body: 'Ask account, platform, and rules questions in one place.' },
    { title: 'Exclusive events', tag: 'new', body: 'Giveaways, announcements, and community activities.' },
  ]

  return (
    <div className="relative h-[430px] w-full max-w-[760px] overflow-hidden rounded-[2rem] border border-white/20 bg-[#1E1F22] shadow-[0_44px_110px_rgba(0,0,0,0.35)] md:h-[500px]">
      <div className="absolute left-0 top-0 hidden h-full w-16 bg-[#1E1F22] p-3 md:block">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`mb-3 h-10 w-10 rounded-2xl ${i === 0 ? 'bg-[#5865F2]' : 'bg-[#313338]'}`} />
        ))}
      </div>
      <div className="absolute left-0 top-0 hidden h-full w-56 bg-[#2B2D31] p-5 text-white md:left-16 md:block">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-extrabold">CK Capital</p>
          <span className="h-2 w-2 rounded-full bg-[#23A559]" />
        </div>
        <div className="space-y-3">
          {channels.map((item, index) => (
            <div key={item} className={`rounded-lg px-3 py-2 text-xs font-semibold ${index === 1 ? 'bg-[#5865F2] text-white' : 'text-[#B5BAC1]'}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 p-4 md:left-72 md:p-6">
        <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#313338] px-4 py-3 text-white">
          <span className="text-sm font-extrabold"># payout-proofs</span>
          <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-extrabold text-black">CK Capital</span>
        </div>
        <div className="grid gap-4">
          {cards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-[#2B2D31] p-4 text-white shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <p className="font-extrabold">{card.title}</p>
                <span className="rounded-full bg-[#5865F2]/20 px-3 py-1 text-xs font-bold text-[#C9D1FF]">{card.tag}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#B5BAC1]">{card.body}</p>
              <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-[#D4AF37]/35 via-[#111111] to-[#5865F2]/25" />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(88,101,242,0.22),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(212,175,55,0.18),transparent_34%)]" />
    </div>
  )
}

export function DiscordCommunitySection() {
  return (
    <section className="relative overflow-hidden bg-[#F2F2F2] px-4 py-16 md:px-6 md:py-24">
      <style jsx global>{`
        body > div > section[style*='#010015'],
        body > div > section[style*='rgb(1, 0, 21)'] {
          display: none !important;
        }
      `}</style>
      <div className="absolute right-[-18%] top-[-32%] h-[760px] w-[760px] rotate-[-18deg] rounded-full bg-[#5865F2]/35 blur-[130px]" />
      <div className="absolute bottom-[-22%] left-[18%] h-[520px] w-[520px] rounded-full bg-[#D4AF37]/18 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-8 flex items-center gap-5">
            <DiscordIcon />
            <h2 className="text-5xl font-extrabold tracking-[-0.04em] text-black md:text-7xl">Discord</h2>
          </div>

          <p className="max-w-xl text-2xl font-bold leading-[1.38] tracking-[0.01em] text-black/50 md:text-[39px]">
            Join the official CK Capital Discord community with support channels, announcements, payout updates, and exclusive events.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {['Support channels', 'Announcements', 'Payout updates', 'Exclusive events'].map((item) => (
              <div key={item} className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm font-bold text-black/65 shadow-sm backdrop-blur">
                <span className="mr-2 text-[#5865F2]">●</span>
                {item}
              </div>
            ))}
          </div>

          <Link
            href="https://discord.gg/ckcapital"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex h-20 items-center justify-center rounded-full bg-white px-12 text-2xl font-extrabold tracking-[-0.035em] text-black/75 shadow-[0_44px_90px_rgba(58,58,58,0.20)] transition-all hover:-translate-y-1 hover:shadow-[0_54px_110px_rgba(58,58,58,0.26)] md:h-24 md:px-20 md:text-[42px]"
          >
            JOIN DISCORD
          </Link>
        </div>

        <div className="relative">
          <MiniDiscordPreview />
        </div>
      </div>
    </section>
  )
}
