'use client'

interface LogoMarqueeProps {
  items: string[]
  duration?: number
}

export function LogoMarquee({ items, duration = 30 }: LogoMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden bg-card/30 backdrop-blur py-8 rounded-2xl">
      <div className="flex animate-marquee" style={{ '--duration': `${duration}s` } as React.CSSProperties}>
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center px-8 md:px-12 min-w-max text-foreground font-medium text-sm md:text-base"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
