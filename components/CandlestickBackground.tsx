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
<<<<<<< HEAD
          opacity: 1,
          zIndex: 0,
          flexDirection: 'column',
          marginBottom: '0px',
          display: 'block',
          justifyContent: 'flex-start',
          alignItems: 'normal',
          textAlign: 'start',
          textTransform: 'none',
          fontSize: '16px',
          color: 'rgb(229, 229, 229)',
          lineHeight: '1.5em',
          fontFamily: 'Inter, "Inter Fallback"',
          borderWidth: '0px',
          borderStyle: 'solid',
=======
          opacity: 0.9,
          zIndex: 0,
>>>>>>> origin/main
        }}
      />
    </div>
  )
}
