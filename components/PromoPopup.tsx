'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 46,
  })

  // Show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
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
          // Timer ended, close popup
          setIsOpen(false)
          return { hours: 0, minutes: 0, seconds: 0 }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  const formatTime = (value: number) => String(value).padStart(2, '0')

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto sm:max-h-none sm:overflow-visible">
        <div
          className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-4 shadow-2xl"
          style={{ borderColor: '#FFD700' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Heading */}
          <h2 className="text-center mb-4 sm:mb-6">
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-bold block"
              style={{ color: '#FFD700' }}
            >
              Your First Challenge
            </span>
            <span
              className="text-xl sm:text-2xl md:text-3xl font-bold block"
              style={{ color: '#FFD700' }}
            >
              - Up to 85% Off
            </span>
          </h2>

          {/* Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
            <div
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-black text-xs sm:text-sm"
              style={{ backgroundColor: '#FFD700' }}
            >
              $88 → $13
            </div>
            <div
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-black text-xs sm:text-sm"
              style={{ backgroundColor: '#FFD700' }}
            >
              Code: LAUNCH2026
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#FFD700' }}
              >
                {formatTime(timeLeft.hours)}
              </div>
              <div className="text-xs text-gray-400 mt-1">HH</div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-300">:</div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#FFD700' }}
              >
                {formatTime(timeLeft.minutes)}
              </div>
              <div className="text-xs text-gray-400 mt-1">MM</div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-300">:</div>
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl font-bold"
                style={{ color: '#FFD700' }}
              >
                {formatTime(timeLeft.seconds)}
              </div>
              <div className="text-xs text-gray-400 mt-1">SS</div>
            </div>
          </div>

          {/* Offer Details */}
          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
              <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#FFD700' }} />
              <span>For new traders only</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
              <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#FFD700' }} />
              <span>Valid until end of month</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
              <CheckCircle2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" style={{ color: '#FFD700' }} />
              <span>Applies to all account sizes</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-2.5 sm:py-3 rounded-full font-bold text-black text-base sm:text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#FFD700' }}
          >
            Claim Your Discount
          </Link>
        </div>
      </div>
    </>
  )
}
