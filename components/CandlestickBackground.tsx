'use client'

const DESKTOP_CANDLE_BG = 'https://i.postimg.cc/hG05XdPm/' + 'Chat-GPT-Image-Jun-21-2026-04-25-14-PM.png'
const MOBILE_CANDLE_BG = 'https://i.postimg.cc/VkkxXgpj/' + 'Chat-GPT-Image-Jun-21-2026-04-30-52-PM.png'

export function CandlestickBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fffaf1]" suppressHydrationWarning>
      <img
        src={DESKTOP_CANDLE_BG}
        alt="Premium gold candlestick chart background"
        className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <img
        src={MOBILE_CANDLE_BG}
        alt="Premium gold candlestick chart background"
        className="absolute left-0 top-0 block h-[125%] w-full -translate-y-[18%] object-cover object-center md:hidden"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  )
}
