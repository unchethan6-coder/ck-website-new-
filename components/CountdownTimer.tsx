'use client'

import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  hours?: number
  minutes?: number
  seconds?: number
}

export function CountdownTimer({ hours = 0, minutes = 30, seconds = 0 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours,
    minutes,
    seconds,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          clearInterval(timer)
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const pad = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">{pad(timeLeft.hours)}</div>
        <div className="text-xs text-muted-foreground">HH</div>
      </div>
      <div className="text-2xl font-bold text-primary">:</div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">{pad(timeLeft.minutes)}</div>
        <div className="text-xs text-muted-foreground">MM</div>
      </div>
      <div className="text-2xl font-bold text-primary">:</div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary">{pad(timeLeft.seconds)}</div>
        <div className="text-xs text-muted-foreground">SS</div>
      </div>
    </div>
  )
}
