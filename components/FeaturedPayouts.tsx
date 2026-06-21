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
  const rows = [CERTS, CERTS]

  return (
    <section
      className="relative overflow-hidden py-16"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEA 36%, #FFF2C2 50%, #FFFBEA 64%, #FFFFFF 100%)',
        paddingBottom: '143px',
      }}
    >
      <style>{`
        @keyframes payout-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes payout-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .payout-row-left {
          animation: payout-left 62s linear infinite;
          will-change: transform;
        }
        .payout-row-right {
          animation: payout-right 68s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="relative mx-auto mb-12 max-w-7xl px-4 text-center md:px-6">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#B59410]">PAYOUT CERTIFICATES</p>
        <h2 className="text-3xl md:text-5xl font-bold text-black text-balance">
          Real Payouts to <span className="gradient-text">Real Traders</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-black/60">
          Real performance-fee payout certificates issued to CK Capital traders.
        </p>
      </div>

      <div className="relative space-y-4 md:space-y-6">
        {rows.map((row, rowIndex) => {
          const loop = [...row, ...row, ...row]
          return (
            <div
              key={rowIndex}
              className={`flex w-max gap-4 md:gap-5 ${rowIndex % 2 === 0 ? 'payout-row-left' : 'payout-row-right'}`}
            >
              {loop.map((src, imageIndex) => (
                <img
                  key={`${rowIndex}-${imageIndex}`}
                  src={src}
                  alt="CK Capital payout certificate"
                  className="h-52 w-auto flex-shrink-0 rounded-xl border border-[#EADFA0] bg-white shadow-md md:h-72"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          )
        })}

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#FFFBEA] via-[#FFFBEA]/90 to-transparent blur-[1px] md:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#FFFBEA] via-[#FFFBEA]/90 to-transparent blur-[1px] md:w-36" />
      </div>
    </section>
  )
}
