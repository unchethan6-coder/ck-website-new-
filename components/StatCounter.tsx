'use client'

import { useEffect, useState } from 'react'

interface CounterProps {
  target: number
  label: string
  suffix?: string
}

export function StatCounter({ target, label, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [target])

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  )
}
