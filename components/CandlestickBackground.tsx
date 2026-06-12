'use client'

export function CandlestickBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle golden glow layer for fintech aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-yellow-300/3 to-yellow-200/2" />
      
      {/* Animated golden light accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse" />
      
      {/* Animated candlestick container with floating effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Back candlestick - slower movement */}
        <div 
          className="absolute w-20 h-56 opacity-60"
          style={{
            right: '32%',
            animation: 'float-candlestick-back 8s ease-in-out infinite, drift-left 6s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 100 300" className="w-full h-full drop-shadow-lg filter blur-sm">
            <defs>
              <linearGradient id="candleGradientBack" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FFF44F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFA500" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Candlestick bottle shape */}
            <path
              d="M 25 80 L 25 200 Q 25 250 50 260 Q 75 250 75 200 L 75 80 Q 75 60 60 50 L 40 50 Q 25 60 25 80"
              fill="url(#candleGradientBack)"
              style={{
                animation: 'stretch-body 5s ease-in-out infinite',
              }}
            />
            
            {/* Glass highlights */}
            <ellipse cx="35" cy="100" rx="6" ry="12" fill="white" opacity="0.2" />
            
            {/* Wick */}
            <line
              x1="50"
              y1="40"
              x2="50"
              y2="15"
              stroke="#FFD700"
              strokeWidth="1.5"
              style={{
                animation: 'wick-flicker 3s ease-in-out infinite',
              }}
            />
          </svg>
        </div>

        {/* Front candlestick - faster, parallax movement */}
        <div 
          className="absolute w-24 h-64 opacity-75"
          style={{
            left: '32%',
            animation: 'float-candlestick-front 8s ease-in-out infinite, drift-right 6s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 100 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="candleGradientFront" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" stopColor="#FFE55C" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#FFEB3B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            
            {/* Candlestick bottle shape */}
            <path
              d="M 20 70 L 20 220 Q 20 270 50 280 Q 80 270 80 220 L 80 70 Q 80 50 65 40 L 35 40 Q 20 50 20 70"
              fill="url(#candleGradientFront)"
              style={{
                animation: 'stretch-body-secondary 5.5s ease-in-out infinite',
              }}
            />
            
            {/* Glass highlights and reflections */}
            <ellipse cx="32" cy="90" rx="8" ry="14" fill="white" opacity="0.25" />
            <circle cx="60" cy="150" r="5" fill="white" opacity="0.15" />
            
            {/* Wick with more pronounced animation */}
            <line
              x1="50"
              y1="32"
              x2="50"
              y2="5"
              stroke="#FFD700"
              strokeWidth="2"
              style={{
                animation: 'wick-flicker-primary 2.5s ease-in-out infinite',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Subtle light wave reflection */}
      <div 
        className="absolute bottom-32 left-0 right-0 h-24 bg-gradient-to-t from-yellow-500/10 via-yellow-400/5 to-transparent"
        style={{
          animation: 'light-wave 6s ease-in-out infinite',
        }}
      />

      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
            style={{
              left: `${25 + i * 20}%`,
              top: `${40 + i * 8}%`,
              animation: `float-particle ${5 + i * 0.5}s ease-in-out infinite`,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-candlestick-front {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        @keyframes float-candlestick-back {
          0% { transform: translateY(8px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(8px); }
        }

        @keyframes drift-left {
          0% { transform: translateX(0px); }
          50% { transform: translateX(-12px); }
          100% { transform: translateX(0px); }
        }

        @keyframes drift-right {
          0% { transform: translateX(0px); }
          50% { transform: translateX(12px); }
          100% { transform: translateX(0px); }
        }

        @keyframes stretch-body {
          0% { transform: scaleY(0.95); }
          50% { transform: scaleY(1.05); }
          100% { transform: scaleY(0.95); }
        }

        @keyframes stretch-body-secondary {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(1.08); }
          100% { transform: scaleY(1); }
        }

        @keyframes wick-flicker {
          0% { opacity: 0.8; transform: scaleY(0.9); }
          50% { opacity: 0.6; transform: scaleY(1.1); }
          100% { opacity: 0.8; transform: scaleY(0.9); }
        }

        @keyframes wick-flicker-primary {
          0% { opacity: 0.9; transform: scaleY(1); }
          25% { opacity: 0.6; transform: scaleY(0.95); }
          50% { opacity: 1; transform: scaleY(1.05); }
          75% { opacity: 0.7; transform: scaleY(0.98); }
          100% { opacity: 0.9; transform: scaleY(1); }
        }

        @keyframes light-wave {
          0% { opacity: 0.1; transform: translateX(-100%); }
          50% { opacity: 0.4; transform: translateX(100%); }
          100% { opacity: 0.1; transform: translateX(-100%); }
        }

        @keyframes float-particle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-35px) translateX(8px); opacity: 0.3; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
        }
      `}</style>
    </div>
  )
}

