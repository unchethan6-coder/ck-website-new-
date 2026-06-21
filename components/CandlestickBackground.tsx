'use client'

export function CandlestickBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
      <picture>
        <source media="(max-width: 767px)" srcSet="/candlestick-reference-bg-mobile.svg" />
        <source media="(min-width: 768px)" srcSet="/candlestick-reference-bg-desktop.svg" />
        <img
          src="/candlestick-reference-bg-desktop.svg"
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
