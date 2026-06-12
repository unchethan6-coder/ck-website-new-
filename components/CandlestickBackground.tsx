'use client'

export function CandlestickBackground() {
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background Reference Image - Premium candlestick render */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/candlestick-reference-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9,
          zIndex: 0,
        }}
      />
    </div>
  )
}
