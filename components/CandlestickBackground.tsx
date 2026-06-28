'use client'

export function CandlestickBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F4F7FA]" suppressHydrationWarning>
      <div
        className="absolute inset-0 opacity-[0.72]"
        style={{
          background:
            'linear-gradient(120deg, rgba(255,255,255,0.92) 0%, rgba(244,247,250,0.86) 48%, rgba(230,238,244,0.78) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-full opacity-70"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 560C120 520 188 585 294 520C402 454 476 330 596 382C718 434 762 604 912 524C1060 445 1118 238 1284 300C1360 329 1402 394 1440 426"
          stroke="url(#chartLine)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M0 638C152 590 244 640 370 580C496 520 586 480 710 552C834 624 948 676 1076 590C1204 504 1306 438 1440 476"
          stroke="rgba(20,184,166,0.22)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {[
          [168, 456, 92, 146],
          [270, 394, 122, 194],
          [420, 430, 78, 160],
          [612, 358, 130, 212],
          [784, 502, 82, 154],
          [968, 392, 110, 190],
          [1160, 294, 138, 218],
          [1298, 350, 84, 166],
        ].map(([x, y, body, wick]) => (
          <g key={`${x}-${y}`} opacity="0.6">
            <line x1={x} x2={x} y1={y - wick / 2} y2={y + wick / 2} stroke="rgba(15,23,42,0.24)" strokeWidth="3" />
            <rect x={x - 9} y={y - body / 2} width="18" height={body} rx="6" fill="rgba(212,175,55,0.34)" />
          </g>
        ))}
        <defs>
          <linearGradient id="chartLine" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F766E" stopOpacity="0.18" />
            <stop offset="0.45" stopColor="#D4AF37" stopOpacity="0.62" />
            <stop offset="1" stopColor="#0F766E" stopOpacity="0.24" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(244,247,250,0.98) 0%, rgba(244,247,250,0.84) 34%, rgba(244,247,250,0.28) 74%, rgba(244,247,250,0.72) 100%)',
        }}
      />
    </div>
  )
}
