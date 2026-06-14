'use client'

const CERTS = [
  'https://i.postimg.cc/sDwNLJz6/1.png',
  'https://i.postimg.cc/rFQPH9TZ/2.png',
  'https://i.postimg.cc/rFQPH9TP/3.png',
  'https://i.postimg.cc/ZKVMQLmg/4.png',
  'https://i.postimg.cc/Ghq5fjRf/5.png',
  'https://i.postimg.cc/02cB4Cvh/6.png',
  'https://i.postimg.cc/xTt4ZPQW/7.png',
  'https://i.postimg.cc/HsBhNtHD/8.png',
  'https://i.postimg.cc/g2jTb6ct/9.png',
]

export function FeaturedPayouts() {
  const rows = [
    CERTS,
  ]
  return (
    <section
      className='relative overflow-hidden py-16'
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEA 42%, #FFF2C2 50%, #FFFBEA 58%, #FFFFFF 100%)', paddingBottom: '143px' }}
    >
      <style>{`@keyframes pay-l{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes pay-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}.pay-row-l{animation:pay-l 60s linear infinite}.pay-row-r{animation:pay-r 60s linear infinite}.pay-row-l:hover,.pay-row-r:hover{animation-play-state:paused}`}</style>

      <div className='relative mx-auto mb-12 max-w-7xl px-4 text-center md:px-6'>
        <p className='mb-3 text-xs font-semibold tracking-[0.25em] text-[#B59410]'>PAYOUT CERTIFICATES</p>
        <h2 className='text-3xl md:text-5xl font-bold text-black text-balance'>Real Payouts to <span className='gradient-text'>Real Traders</span></h2>
        <p className='mx-auto mt-3 max-w-2xl text-black/60'>Real performance-fee payout certificates issued to CK Capital traders.</p>
      </div>

      <div className='relative space-y-4 md:space-y-5'>
        {rows.map((row, ri) => {
          const loop = [...row, ...row]
          return (
            <div key={ri} className={`flex w-max gap-4 md:gap-5 ${ri % 2 ? 'pay-row-r' : 'pay-row-l'}`}>
              {loop.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt='CK Capital payout certificate'
                  className='h-52 md:h-72 w-auto flex-shrink-0 rounded-xl border border-[#EADFA0] bg-white shadow-md'
                />
              ))}
            </div>
          )
        })}
        <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24 bg-gradient-to-r from-white to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24 bg-gradient-to-l from-white to-transparent' />
      </div>
    </section>
  )
}
