'use client'

interface LogoMarqueeProps {
  items: string[]
  duration?: number
}

export function LogoMarquee({ items, duration = 30 }: LogoMarqueeProps) {
  return (
    <div 
      className="relative w-full overflow-hidden py-8"
      style={{
        background: 'linear-gradient(90deg, #D89A2E 0%, #E8BE4C 25%, #FCE17B 50%, #E8BE4C 75%, #D79930 100%)',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        display: 'flex',
        fontWeight: '700',
        lineHeight: '1.6em',
        color: '#8a8a8a',
        borderRadius: '0px',
      }}
    >
      <div className="flex animate-marquee" style={{ '--duration': `${duration}s` } as React.CSSProperties}>
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center px-8 md:px-12 min-w-max text-black/70 font-medium text-sm md:text-base"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
