'use client'

import { useState } from 'react'
import Link from 'next/link'

const SIZES = [
  { label: '$2.5K', p1: '$200', p2: '$125', maxLoss: '$200', daily: '$80', minDays: '1 day', split: 'Up to 100%' },
  { label: '$5K', p1: '$400', p2: '$250', maxLoss: '$400', daily: '$200', minDays: '1 day', split: 'Up to 100%' },
  { label: '$10K', p1: '$1,000', p2: '$500', maxLoss: '$800', daily: '$400', minDays: '1 day', split: 'Up to 100%' },
  { label: '$25K', p1: '$2,500', p2: '$1,250', maxLoss: '$2,000', daily: '$1,000', minDays: '1 day', split: 'Up to 100%' },
  { label: '$50K', p1: '$5,000', p2: '$2,500', maxLoss: '$4,000', daily: '$2,000', minDays: '1 day', split: 'Up to 100%' },
  { label: '$100K', p1: '$10,000', p2: '$5,000', maxLoss: '$8,000', daily: '$4,000', minDays: '1 day', split: 'Up to 100%' },
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
  const s = SIZES[i]

  const cellFor = (key: string) => {
    switch (key) {
      case 'profit': return { p1: s.p1, p2: s.p2, funded: '—' }
      case 'maxLoss': return { p1: s.maxLoss, p2: s.maxLoss, funded: s.maxLoss }
      case 'daily': return { p1: s.daily, p2: s.daily, funded: s.daily }
      case 'minDays': return { p1: s.minDays, p2: s.minDays, funded: '—' }
      case 'split': return { p1: '—', p2: '—', funded: s.split }
      default: return { p1: '—', p2: '—', funded: '—' }
    }
  }

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Account size pills */}
      <div className='flex flex-wrap gap-2 justify-center mb-8'>
        {SIZES.map((sz, idx) => (
          <button
            key={sz.label}
            onClick={() => setI(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${idx === i ? 'bg-black text-white border-black' : 'bg-black/5 text-black border-black/10 hover:border-black/30'}`}
          >
            {sz.label}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className='overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0'>
        <div className='min-w-[600px] rounded-2xl border border-black/10 overflow-hidden shadow-sm'>
          {/* Header */}
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

          {/* Rows */}
          {ROWS.map((r, ri) => {
            const c = cellFor(r.key)
            return (
              <div key={r.key} className={`grid grid-cols-4 border-t border-black/5 ${ri % 2 ? 'bg-black/[0.02]' : 'bg-white'}`}>
                <div className='px-4 py-3 text-sm font-medium text-black/70'>{r.label}</div>
                <div className='px-4 py-3 text-sm text-center text-black border-l border-black/5'>{c.p1}</div>
                <div className='px-4 py-3 text-sm text-center text-black border-l border-black/5'>{c.p2}</div>
                <div className='px-4 py-3 text-sm text-center font-semibold text-white bg-black'>{c.funded}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reward cycles + CTA */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
        <p className='text-sm text-black/60'>Reward cycles: <span className='font-semibold text-black'>Bi-weekly</span> · Up to 100% split</p>
        <Link href='https://app.ckcapital.co.uk/signup' target='_blank' rel='noopener noreferrer' className='button-primary whitespace-nowrap'>
          Buy {s.label} Challenge
        </Link>
      </div>
    </div>
  )
}
