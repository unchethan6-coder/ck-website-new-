'use client'

const VIDEOS = [
  { id: '5RjtGHPcuMM', title: 'MY PERCEPTION ABOUT TRADING WAS WRONG...', reward: '$15,995', subtitle: 'Trading Gold & Nasdaq to a funded payout' },
  { id: 'LNXpq8_PwxU', title: 'THIS IS HOW ALGO TRADING CHANGED IT ALL', reward: '$22,400', subtitle: 'From challenge to funded: a CK success story' },
  { id: 'bZq8jtD9acY', title: 'I DROPPED OUT OF COLLEGE FOR TRADING', reward: '$38,200', subtitle: 'More than rewards — how CK changed my trading' },
  { id: '8NQAWtlh_ws', title: 'BEST PROP? I TRUST CK CAPITAL', reward: '$84,120', subtitle: 'Trusting the process paid off big time' },
]

export function VideoTestimonials() {
  const loop = [...VIDEOS, ...VIDEOS]

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-1.5px] text-white mb-4">
          Real Traders, Real Rewards, <span className="text-[#D4AF37]">Real Impact</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Hear it directly from traders who passed their challenge and received their reward — real stories from people whose lives changed with every payout.
        </p>
      </div>

      {/* Video Cards - Horizontal Scroll with reduced motion support */}
      <div className="relative">
        <div className="flex gap-5 w-max animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused] px-6 motion-reduce:animate-none motion-reduce:transform-none">
          {loop.map((video, index) => (
            <a
              key={index}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch testimonial: ${video.title} — Reward ${video.reward}`}
              className="group relative flex-shrink-0 w-[295px] md:w-[310px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition-all active:scale-[0.985]"
            >
              <div className="relative aspect-video bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111111" className="ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-3.5 py-1 rounded-lg bg-[#D4AF37] text-black text-[11px] font-extrabold tracking-[0.3px] shadow-md">
                  Reward: {video.reward}
                </div>
              </div>

              <div className="p-5">
                <p className="font-bold text-white text-[15px] leading-tight line-clamp-2 mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {video.title}
                </p>
                <p className="text-xs text-white/55 line-clamp-1">
                  {video.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <a 
          href="https://discord.gg/ckcapital" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] hover:bg-[#F5C542] active:bg-[#E8B923] transition-all px-9 h-12 text-sm font-extrabold text-black tracking-[0.3px]"
        >
          Join Our Community
        </a>
      </div>
    </section>
  )
}
