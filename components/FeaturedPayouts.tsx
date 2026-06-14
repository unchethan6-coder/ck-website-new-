'use client'

type Payout = { name: string; amount: string; date: string }

const PAYOUTS: Payout[] = [
  { name: 'Pedro Angustia Perez', amount: '$3,763', date: '04/11/2025' },
  { name: 'Danaipat Chamai', amount: '$6,726', date: '03/11/2025' },
  { name: 'John Enweya', amount: '$11,405', date: '15/09/2025' },
  { name: 'Jens Franzen', amount: '$7,469', date: '24/09/2025' },
  { name: 'galanonim007', amount: '$40,216', date: '11/12/2025' },
  { name: 'sky', amount: '$5,027', date: '27/01/2026' },
  { name: 'Kyros Sofokleious', amount: '$16,886', date: '18/12/2025' },
  { name: 'Malak Reiad', amount: '$9,540', date: '02/01/2026' },
  { name: 'Sofia Chen', amount: '$12,330', date: '21/11/2025' },
  { name: 'Adil Mohammed', amount: '$8,210', date: '09/10/2025' },
  { name: 'Samuel Dickson', amount: '$14,980', date: '30/12/2025' },
  { name: 'Nicolai Madsen', amount: '$10,450', date: '05/12/2025' },
]

function PayoutCard({ p }: { p: Payout }) {
  return (
    <div className='w-60 flex-shrink-0 rounded-xl border border-[#EADFA0] bg-white p-4 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5'>
          <span className='flex h-5 w-5 items-center justify-center rounded bg-black text-[9px] font-bold text-[#FFD700]'>CK</span>
          <span className='text-[11px] font-bold tracking-wide text-black'>CK CAPITAL</span>
        </div>
        <span className='rounded-full bg-[#FFF3BF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#8a6d00]'>Payout</span>
      </div>
      <p className='mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#B59410]'>Performance Fee</p>
      <p className='text-2xl font-extrabold text-black'>{p.amount}<span className='text-sm font-bold'>.00</span></p>
      <div className='mt-3 flex items-end justify-between border-t border-[#EADFA0] pt-2'>
        <p className='truncate text-sm font-semibold text-black'>{p.name}</p>
        <p className='whitespace-nowrap pl-2 text-[11px] text-gray-400'>{p.date}</p>
      </div>
    </div>
  )
}

export function FeaturedPayouts() {
  const rows = [PAYOUTS.slice(0, 8), PAYOUTS.slice(4, 12), PAYOUTS.slice(2, 10)]
  return (
    <section
      className='relative overflow-hidden py-16 md:py-24'
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBEA 42%, #FFF2C2 50%, #FFFBEA 58%, #FFFFFF 100%)' }}
    >
      <style>{`@keyframes pay-l{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes pay-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}.pay-row-l{animation:pay-l 45s linear infinite}.pay-row-r{animation:pay-r 45s linear infinite}.pay-row-l:hover,.pay-row-r:hover{animation-play-state:paused}`}</style>

      <div className='relative mx-auto mb-12 max-w-7xl px-4 text-center md:px-6'>
        <p className='mb-3 text-xs font-semibold tracking-[0.25em] text-[#B59410]'>PAYOUT CERTIFICATES</p>
        <h2 className='text-3xl md:text-5xl font-bold text-black text-balance'>Real Payouts to <span className='gradient-text'>Real Traders</span></h2>
        <p className='mx-auto mt-3 max-w-2xl text-black/60'>Every certificate is a real performance-fee payout sent to a CK Capital trader.</p>
      </div>

      <div className='relative space-y-4'>
        {rows.map((row, ri) => {
          const loop = [...row, ...row]
          return (
            <div key={ri} className={`flex w-max gap-4 ${ri % 2 ? 'pay-row-r' : 'pay-row-l'}`}>
              {loop.map((p, i) => (
                <PayoutCard key={i} p={p} />
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
