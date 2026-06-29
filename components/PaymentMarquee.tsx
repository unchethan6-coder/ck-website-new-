'use client'

const METHODS = [
  { name: 'Stripe', slug: 'stripe' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Visa', slug: 'visa' },
  { name: 'Mastercard', slug: 'mastercard' },
  { name: 'Apple Pay', slug: 'applepay' },
  { name: 'Google Pay', slug: 'googlepay' },
  { name: 'USDT', slug: 'tether' },
]

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  const loop = [...METHODS, ...METHODS, ...METHODS, ...METHODS]

  return (
    <div className="relative w-full overflow-hidden py-3">
      <div className={`flex w-max items-center gap-4 ${reverse ? 'pay-marquee-reverse' : 'pay-marquee'}`}>
        {loop.map((m, i) => (
          <div
            key={`${m.name}-${i}-${reverse ? 'reverse' : 'forward'}`}
            className="flex h-16 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-sm"
          >
            <img
              src={`https://cdn.simpleicons.org/${m.slug}`}
              alt={m.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const n = e.currentTarget.nextElementSibling as HTMLElement | null
                if (n) n.style.display = 'block'
              }}
              className="h-7 w-auto max-w-[78%] object-contain"
            />
            <span style={{ display: 'none' }} className="text-base font-bold text-foreground">
              {m.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PaymentMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      <style>{`
        @keyframes pay-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pay-marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .pay-marquee { animation: pay-marquee 36s linear infinite; will-change: transform; }
        .pay-marquee-reverse { animation: pay-marquee-reverse 42s linear infinite; will-change: transform; }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

      <LogoRow />
      <LogoRow reverse />
    </div>
  )
}
