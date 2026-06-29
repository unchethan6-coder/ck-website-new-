'use client'

import { useState } from 'react'
import Link from 'next/link'

const SIZES = [
  { size: 2500, p1: 200, p2: 125, maxLoss: 200, daily: 80, split: 'Up to 100%' },
  { size: 5000, p1: 400, p2: 250, maxLoss: 400, daily: 200, split: 'Up to 100%' },
  { size: 10000, p1: 1000, p2: 500, maxLoss: 800, daily: 400, split: 'Up to 100%' },
  { size: 25000, p1: 2500, p2: 1250, maxLoss: 2000, daily: 1000, split: 'Up to 100%' },
  { size: 50000, p1: 5000, p2: 2500, maxLoss: 4000, daily: 2000, split: 'Up to 100%' },
  { size: 100000, p1: 10000, p2: 5000, maxLoss: 8000, daily: 4000, split: 'Up to 100%' },
]

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'INR', symbol: '₹', rate: 83 },
]

const ROWS = [
  { label: 'Profit Target', key: 'profit' },
  { label: 'Max Loss', key: 'maxLoss' },
  { label: 'Daily Loss', key: 'daily' },
  { label: 'Min Trading Days', key: 'minDays' },
  { label: 'Profit Split', key: 'split' },
]

export function ObjectivesTable() {
  const [i, setI] = useState(5)
  const [ci, setCi] = useState(0)
  const s = SIZES[i]
  const cur = CURRENCIES[ci]

  const money = (v: number) => cur.symbol + Math.round(v * cur.rate).toLocaleString('en-US')
  const sizeLabel = (sz: number) => {
    const total = sz * cur.rate
    if (total >= 1000000) {
      const m = total / 1000000
      return cur.symbol + (m >= 10 ? Math.round(m) : Math.round(m * 10) / 10) + 'M'
    }
    const v = total / 1000
    const num = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10
    return cur.symbol + num + 'K'
  }

  const cellFor = (key: string) => {
    switch (key) {
      case 'profit': return { p1: money(s.p1), p2: money(s.p2), funded: '—' }
      case 'maxLoss': return { p1: money(s.maxLoss), p2: money(s.maxLoss), funded: money(s.maxLoss) }
      case 'daily': return { p1: money(s.daily), p2: money(s.daily), funded: money(s.daily) }
      case 'minDays': return { p1: '1 day', p2: '1 day', funded: '—' }
      case 'split': return { p1: '—', p2: '—', funded: s.split }
      default: return { p1: '—', p2: '—', funded: '—' }
    }
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Currency selector */}
      <div className='flex justify-center mb-4'>
        <div className='inline-flex rounded-full border border-black/10 bg-black/5 p-1'>
          {CURRENCIES.map((c, idx) => (
            <button
              key={c.code}
              onClick={() => setCi(idx)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${idx === ci ? 'bg-black text-foreground' : 'text-black/70'}`}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Account size pills */}
      <div className='flex flex-wrap gap-2 justify-center mb-8'>
        {SIZES.map((sz, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${idx === i ? 'bg-black text-foreground border-black' : 'bg-black/5 text-black border-black/10 hover:border-black/30'}`}
          >
            {sizeLabel(sz.size)}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
        <div className='min-w-[600px] rounded-2xl border border-black/10 overflow-hidden shadow-sm'>
          <div className='grid grid-cols-4'>
            <div className='bg-white px-4 py-5' />
            <div className='bg-white px-4 py-5 text-center border-l border-black/5'>
              <p className='text-[11px] uppercase tracking-wide text-black/40'>Evaluation</p>
              <p className='font-bold text-black'>Phase 1</p>
            </div>
            <div className='bg-white px-4 py-5 text-center border-l border-black/5'>
              <p className='text-[11px] uppercase tracking-wide text-black/40'>Evaluation</p>
              <p className='font-bold text-black'>Phase 2</p>
            </div>
            <div className='bg-black px-4 py-5 text-center'>
              <p className='text-[11px] uppercase tracking-wide text-[#D4AF37]'>Funded</p>
              <p className='font-bold gradient-text'>Master</p>
            </div>
          </div>

          {ROWS.map((r, ri) => {
            const c = cellFor(r.key)
            return (
              <div key={r.key} className={`grid grid-cols-4 border-t border-black/5 ${ri % 2 ? 'bg-black/[0.02]' : 'bg-white'}`}>
                <div className='px-4 py-3 text-sm font-medium text-black/70'>{r.label}</div>
                <div className='px-4 py-3 text-sm text-center text-black border-l border-black/5'>{c.p1}</div>
                <div className='px-4 py-3 text-sm text-center text-black border-l border-black/5'>{c.p2}</div>
                <div className='px-4 py-3 text-sm text-center font-semibold text-foreground bg-black'>{c.funded}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reward cycles + CTA */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
        <p className='text-sm text-black/60'>Reward cycles: <span className='font-semibold text-black'>Bi-weekly</span> · Up to 100% split</p>
        <Link href='https://app.ckcapital.co.uk/signup' target='_blank' rel='noopener noreferrer' className='button-primary whitespace-nowrap'>
          Buy {sizeLabel(s.size)} Challenge
        </Link>
      </div>
    </div>
  )
}
