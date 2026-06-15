'use client'

const METHODS = [
  { name: 'Visa', slug: 'visa' },
  { name: 'Mastercard', slug: 'mastercard' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'Apple Pay', slug: 'applepay' },
  { name: 'Google Pay', slug: 'googlepay' },
  { name: 'USDT', slug: 'tether' },
]

function Chip({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="mr-4 flex h-16 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        width={40}
        height={28}
        className="h-7 w-auto opacity-80"
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement
          t.style.display = 'none'
          const sib = t.nextElementSibling as HTMLElement | null
          if (sib) sib.style.display = 'block'
        }}
      />
      <span className="hidden text-sm font-semibold text-black/70">{name}</span>
    </div>
  )
}

export function PaymentMarquee() {
  const loop = [...METHODS, ...METHODS]
  return (
    <div className="pm-wrap relative overflow-hidden">
      <div className="pm-row flex w-max">
        {loop.map((m, i) => (
          <Chip key={'a' + i} {...m} />
        ))}
      </div>
      <div className="pm-row pm-rev mt-4 flex w-max">
        {loop.map((m, i) => (
          <Chip key={'b' + i} {...m} />
        ))}
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

      <style>{`
        .pm-row { animation: pm-scroll 32s linear infinite; will-change: transform; }
        .pm-rev { animation-duration: 38s; animation-direction: reverse; }
        @keyframes pm-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) { .pm-row { animation: none; } }
      `}</style>
    </div>
  )
}
