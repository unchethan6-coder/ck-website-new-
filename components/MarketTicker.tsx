'use client'

import React from 'react'

interface MarketItem {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  isPositive: boolean
  tradingViewUrl: string
  icon?: string
}

const marketData: MarketItem[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    price: '7,448.03',
    change: '+15.10',
    changePercent: '+0.20%',
    isPositive: true,
    tradingViewUrl: 'https://www.tradingview.com/symbols/SPX/',
    icon: '📈'
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    price: '29,804.7',
    change: '+94.20',
    changePercent: '+0.32%',
    isPositive: true,
    tradingViewUrl: 'https://www.tradingview.com/symbols/NASDAQ/',
    icon: '📈'
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: '0.07256',
    change: '-0.00',
    changePercent: '-1.20%',
    isPositive: false,
    tradingViewUrl: 'https://www.tradingview.com/symbols/DOGEUSDT/',
    icon: '🐕'
  },
  {
    symbol: 'XAUUSD',
    name: 'Gold',
    price: '4,021.39',
    change: '+4.78',
    changePercent: '+0.12%',
    isPositive: true,
    tradingViewUrl: 'https://www.tradingview.com/symbols/XAUUSD/',
    icon: '🥇'
  },
  {
    symbol: 'XAGUSD',
    name: 'Silver',
    price: '58.712',
    change: '+0.46',
    changePercent: '+0.79%',
    isPositive: true,
    tradingViewUrl: 'https://www.tradingview.com/symbols/XAGUSD/',
    icon: '🥈'
  }
]

export function MarketTicker() {
  return (
    <div className="bg-[#0a0a0a] border-b border-white/10 py-2.5 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 text-xs font-semibold text-white/60 tracking-wider">
          MARKET
        </div>
        
        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden">
          <div className="marquee flex items-center gap-8 whitespace-nowrap">
            {[...marketData, ...marketData].map((item, index) => (
              <a
                key={`${item.symbol}-${index}`}
                href={item.tradingViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:bg-white/5 px-3 py-1 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-base">{item.icon}</span>}
                  <span className="font-semibold text-white text-sm">{item.name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-white">{item.price}</span>
                  
                  <span className={`${item.isPositive ? 'text-emerald-400' : 'text-red-400'} flex items-center gap-1`}>
                    {item.change} 
                    <span className="text-xs">({item.changePercent})</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 35s linear infinite;
        }
        
        .marquee:hover {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
