'use client'

import { useState, useEffect } from 'react'

export function CenteredImagePopup() {
  const [isOpen, setIsOpen] = useState(false)

  // Show popup once per session after page load
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('imagPopupSeen')) return

    const timer = setTimeout(() => {
      setIsOpen(true)
      if (typeof window !== 'undefined') sessionStorage.setItem('imagPopupSeen', '1')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
        style={{ display: isOpen ? 'block' : 'none' }}
      />

      {/* Centered Popup Container */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white rounded-xl shadow-2xl overflow-visible"
        style={{
          display: isOpen ? 'block' : 'none',
          width: 'auto',
          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3.5 right-3.5 bg-white border-none rounded-full w-9 h-9 p-0 text-2xl font-bold cursor-pointer flex items-center justify-center shadow-md hover:bg-yellow-400 transition-colors z-[10000]"
          style={{ lineHeight: '1' }}
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Popup Image Link */}
        <a
          href="https://app.ckcapital.co.uk/signin"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src="https://ckcapital.co.uk/wp-content/uploads/2026/06/popup-ck.png"
            alt="CK Capital Popup Banner"
            loading="lazy"
            className="block w-auto h-auto rounded-xl"
            style={{
              width: '650px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              height: 'auto',
            }}
          />
        </a>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 767px) {
          div[style*='max-width: 90vw'] {
            max-width: 95vw !important;
            max-height: 90vh !important;
          }
        }
      `}</style>
    </>
  )
}
