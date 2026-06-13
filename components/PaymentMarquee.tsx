'use client'

const METHODS = [
  { name: 'Stripe', slug: 'stripe' },
  { name: 'PayPal', slug: 'paypal' },
  { name: 'Visa', slug: 'visa' },
  { name: 'Mastercard', slug: 'mastercard' },
  { name: 'Apple Pay', slug: 'applepay' },
  { name: 'Google Pay', slug: 'googlepay' },
  { name: 'USDT', slug: 'tether' },
  { name: 'Skrill', slug: 'skrill' },
]

export function PaymentMarquee() {
  const loop = [...METHODS, ...METHODS]
  return (
    <div className='relative w-full overflow-hidden py-4'>
      <style>{`@keyframes pay-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.pay-marquee{animation:pay-marquee 28s linear infinite}.pay-marquee:hover{animation-play-state:paused}`}</style>

      <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent' />

      <div className='flex w-max items-center gap-4 pay-marquee'>
        {loop.map((m, i) => (
          <div
            key={i}
            className='flex h-16 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm'
          >
            <img
              src={`https://cdn.simpleicons.org/${m.slug}`}
              alt={m.name}
              loading='lazy'
              className='h-7 w-auto max-w-[78%] object-contain'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
