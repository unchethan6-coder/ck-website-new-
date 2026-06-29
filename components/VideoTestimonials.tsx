'use client'

const VIDEOS = [
  { id: '5RjtGHPcuMM', title: 'Trading Gold & Nasdaq to a funded payout', reward: '$15,995' },
  { id: 'LNXpq8_PwxU', title: 'From challenge to funded: a CK success story', reward: '$22,400' },
  { id: 'bZq8jtD9acY', title: 'More than rewards: how CK changed my trading', reward: '$38,200' },
  { id: '8NQAWtlh_ws', title: 'Trusting the process paid off', reward: '$84,120' },
]

export function VideoTestimonials() {
  const loop = [...VIDEOS, ...VIDEOS]
  return (
    <section className='pt-7 pb-[22px] bg-[#070708] overflow-hidden'>
      <style>{`@keyframes ck-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.ck-marquee{animation:ck-marquee 45s linear infinite}.ck-marquee:hover{animation-play-state:paused}`}</style>

      <div className='max-w-7xl mx-auto px-4 md:px-6 text-center mb-12'>
        <h2 className='text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance'>
          Real Traders, Real Rewards, <span className='gradient-text'>Real Impact</span>
        </h2>
        <p className='text-foreground/60 max-w-2xl mx-auto text-pretty'>
          Hear it directly from traders who passed their challenge and received their reward — real stories from people whose lives changed with every payout.
        </p>
      </div>

      <div className='relative w-full'>
        <div className='flex gap-5 w-max ck-marquee px-4'>
          {loop.map((v, i) => (
            <a
              key={i}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative flex-shrink-0 w-72 md:w-80 aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black'
            >
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
                className='absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='#070708'><path d='M8 5v14l11-7z' /></svg>
                </div>
              </div>
              <div className='absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F0E68C] text-black text-xs font-bold'>
                Reward: {v.reward}
              </div>
              <p className='absolute bottom-3 left-3 right-3 text-foreground text-sm font-semibold leading-snug'>
                {v.title}
              </p>
            </a>
          ))}
        </div>
      </div>

      <div className='text-center mt-12'>
        <a href='https://discord.gg/ckcapital' target='_blank' rel='noopener noreferrer' className='button-primary inline-flex'>
          Join Our Community
        </a>
      </div>
    </section>
  )
}
