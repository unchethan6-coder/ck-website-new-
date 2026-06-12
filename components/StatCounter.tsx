'use client'

import { useEffect, useState, useRef } from 'react'

interface CounterProps {
  target: number
  label: string
  format?: 'percent' | 'currency' | 'default'
}

export function StatCounter({ target, label, format = 'default' }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        const duration = 2000
        const steps = 30
        const increment = target / steps
        let current = 0
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOutProgress = 1 - Math.pow(1 - progress, 3)
          current = target * easeOutProgress

          setCount(Math.floor(current))
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCount(target)
          }
        }
        animate()
      }
    }, { threshold: 0.1 })

    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [target, hasAnimated])

  const formatValue = () => {
    switch (format) {
      case 'percent':
        return `${count}%`
      case 'currency':
        if (count >= 1000000) {
          return `$${(count / 1000000).toFixed(1)}M`
        }
        return `$${count.toLocaleString()}`
      default:
        return count.toLocaleString()
    }
  }

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">
        {formatValue()}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  )
}
