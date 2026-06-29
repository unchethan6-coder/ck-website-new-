'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type ChallengeType = 'standard' | 'middleweight' | 'lightweight' | '1step' | 'instant'

type Props = {
  selectedChallengeType: ChallengeType
}

const SPLIT: Record<ChallengeType, string> = {
  standard: 'Up to 100%',
  middleweight: 'Up to 100%',
  lightweight: 'Up to 100%',
  '1step': 'Up to 100%',
  instant: 'Bi-weekly 50%',
}

const CHALLENGE_DATA: Record<ChallengeType, Record<string, string[]>> = {
  standard: {
    '$2.5K': ['$250', '$125', '$80', '$200', 'N/A'],
    '$5K': ['$500', '$250', '$200', '$400', 'N/A'],
    '$10K': ['$1,000', '$500', '$400', '$800', 'N/A'],
    '$25K': ['$2,500', '$1,250', '$1,000', '$2,000', 'N/A'],
    '$50K': ['$5,000', '$2,500', '$2,000', '$4,000', 'N/A'],
    '$100K': ['$10,000', '$5,000', '$4,000', '$8,000', 'N/A'],
  },
  middleweight: {
    '$2.5K': ['$200', '$125', '$80', '$300', '30%'],
    '$5K': ['$400', '$250', '$200', '$600', '30%'],
    '$10K': ['$800', '$500', '$400', '$1,200', '30%'],
    '$25K': ['$2,000', '$1,250', '$1,000', '$3,000', '30%'],
    '$50K': ['$4,000', '$2,500', '$2,000', '$6,000', '30%'],
    '$100K': ['$8,000', '$5,000', '$4,000', '$12,000', '30%'],
  },
  lightweight: {
    '$2.5K': ['$150', '$150', '$80', '$200', '50%'],
    '$5K': ['$300', '$300', '$200', '$400', '50%'],
    '$10K': ['$600', '$600', '$400', '$800', '50%'],
    '$25K': ['$1,500', '$1,500', '$1,000', '$2,000', '50%'],
    '$50K': ['$3,000', '$3,000', '$2,000', '$4,000', '50%'],
    '$100K': ['$6,000', '$6,000', '$4,000', '$8,000', '50%'],
  },
  '1step': {
    '$2.5K': ['$250', '$0', '$80', '$150', 'N/A'],
    '$5K': ['$500', '$0', '$200', '$300', 'N/A'],
    '$10K': ['$1,000', '$0', '$400', '$600', 'N/A'],
    '$25K': ['$2,500', '$0', '$1,000', '$1,500', 'N/A'],
    '$50K': ['$5,000', '$0', '$2,000', '$3,000', 'N/A'],
    '$100K': ['$10,000', '$0', '$4,000', '$6,000', 'N/A'],
  },
  instant: {
    '$5K': ['$0', '$0', '$150', '$250', '20%'],
    '$10K': ['$0', '$0', '$300', '$500', '20%'],
    '$25K': ['$0', '$0', '$750', '$1,250', '20%'],
    '$50K': ['$0', '$0', '$1,500', '$2,500', '20%'],
  },
}

const BASE_CARDS = [
  { size: '$2.5K', price: '$9', oldPrice: '$99', badge: null },
  { size: '$5K', price: '$13', oldPrice: '$99', badge: null },
  { size: '$10K', price: '$19', oldPrice: '$99', badge: 'MOST POPULAR' },
  { size: '$25K', price: '$68.40', oldPrice: '$274.50', badge: null },
  { size: '$50K', price: '$98.40', oldPrice: '$394.00', badge: null },
  { size: '$100K', price: '$176.40', oldPrice: '$705.60', badge: null },
]

export function MobilePricingSelector({ selectedChallengeType }: Props) {
  const availableCards = useMemo(() => {
    return BASE_CARDS.filter((card) => CHALLENGE_DATA[selectedChallengeType][card.size]).map((card) => {
      const features = CHALLENGE_DATA[selectedChallengeType][card.size]
      return {
        ...card,
        features: {
          phase1: features[0],
          phase2: features[1],
          maxDaily: features[2],
          maxLoss: features[3],
          period: 'Unlimited',
          minDays: '1',
          rewardSplit: SPLIT[selectedChallengeType],
          consistency: features[4],
        },
      }
    })
  }, [selectedChallengeType])

  const [selectedSize, setSelectedSize] = useState('$10K')

  useEffect(() => {
    if (!availableCards.some((card) => card.size === selectedSize)) {
      setSelectedSize(availableCards[0]?.size || '$5K')
    }
  }, [availableCards, selectedSize])

  const card = availableCards.find((item) => item.size === selectedSize) || availableCards[0]

  if (!card) return null

  return (
    <div className="md:hidden">
      <div className="mb-5 -mx-4 overflow-x-auto px-4 pb-2">
        <div className="flex w-max gap-2">
          {availableCards.map((item) => (
            <button
              key={item.size}
              type="button"
              onClick={() => setSelectedSize(item.size)}
              className={`rounded-full border px-4 py-2 text-sm font-extrabold transition-all ${
                item.size === card.size
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                  : 'border-white/10 bg-white/[0.06] text-foreground/70'
              }`}
            >
              {item.size}
            </button>
          ))}
        </div>
      </div>

      <article className={`relative mx-auto flex min-h-[540px] w-full max-w-[360px] flex-col overflow-hidden rounded-3xl border p-5 transition-all duration-300 ${card.badge ? 'border-[#D4AF37] bg-white text-black shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_30px_80px_rgba(212,175,55,0.22)]' : 'border-white/10 bg-white/[0.06] text-foreground'}`}>
        {card.badge && (
          <div className="absolute right-4 top-4 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-extrabold tracking-wide text-black">
            {card.badge}
          </div>
        )}

        <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${card.badge ? 'text-black/45' : 'text-foreground/45'}`}>Account Size</p>
        <h3 key={`${selectedChallengeType}-${card.size}`} className="mb-4 animate-fade-up text-5xl font-extrabold tracking-tight">
          {card.size}
        </h3>

        <div className={`mb-5 overflow-hidden rounded-2xl border p-4 ${card.badge ? 'border-black/10 bg-black/[0.03]' : 'border-white/10 bg-white/[0.05]'}`}>
          <div key={`${selectedChallengeType}-${card.price}`} className="animate-fade-up">
            <span className="block max-w-full truncate text-[42px] font-extrabold leading-none text-[#D4AF37]">{card.price}</span>
            <span className={`mt-2 block max-w-full truncate text-xs line-through ${card.badge ? 'text-black/40' : 'text-foreground/40'}`}>{card.oldPrice}</span>
          </div>
          <p className={`mt-2 text-xs ${card.badge ? 'text-black/55' : 'text-foreground/55'}`}>Limited promotional pricing</p>
        </div>

        <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className={`mb-5 flex h-12 w-full items-center justify-center rounded-xl text-sm font-extrabold transition-all ${card.badge ? 'bg-black text-foreground hover:bg-black/85' : 'bg-[#D4AF37] text-black hover:bg-[#F7D774]'}`}>
          Start Challenge
        </Link>

        <div key={`${selectedChallengeType}-${card.size}-details`} className="animate-fade-up grid grid-cols-1 gap-3 text-sm">
          {[
            ['Phase 1 Target', card.features.phase1],
            ['Phase 2 Target', card.features.phase2],
            ['Max Daily Loss', card.features.maxDaily],
            ['Max Loss', card.features.maxLoss],
            ['Trading Period', card.features.period],
            ['Min Trading Days', card.features.minDays],
            ['Reward Split', card.features.rewardSplit],
            ['Consistency Rule', card.features.consistency],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-current/10 pb-2 last:border-0">
              <span className={card.badge ? 'text-black/55' : 'text-foreground/55'}>{label}</span>
              <span className="text-right font-bold">{value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(`JUN70-${card.size.replace('$', '').replace('K', '')}`)}
          className={`mt-auto rounded-xl border border-dashed px-3 py-3 text-xs font-extrabold transition-all ${card.badge ? 'border-black/20 bg-black/[0.04] text-black hover:bg-black/[0.08]' : 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F7D774] hover:bg-[#D4AF37]/20'}`}
        >
          Copy Code: JUN70-{card.size.replace('$', '').replace('K', '')}
        </button>
      </article>
    </div>
  )
}
