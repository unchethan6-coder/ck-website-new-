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
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.9,
          zIndex: 0,
        }}
      />
    </div>
  )
}
