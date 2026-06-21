'use client'

const DESKTOP_CANDLE_BG = 'https://i.postimg.cc/hG05XdPm/' + 'Chat-GPT-Image-Jun-21-2026-04-25-14-PM.png'
const MOBILE_CANDLE_BG = 'https://i.postimg.cc/VkkxXgpj/' + 'Chat-GPT-Image-Jun-21-2026-04-30-52-PM.png'

export function CandlestickBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
      <picture>
        <source media="(max-width: 767px)" srcSet={MOBILE_CANDLE_BG} />
        <source media="(min-width: 768px)" srcSet={DESKTOP_CANDLE_BG} />
        <img
          src={DESKTOP_CANDLE_BG}
          alt="Premium gold candlestick chart background"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  )
}
