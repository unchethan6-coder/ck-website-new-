'use client'

import { useEffect } from 'react'

const promoItems = Array.from({ length: 10 }, (_, index) => index)

export function PromoBar() {
  useEffect(() => {
    const handleCopyCode = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest('button') as HTMLButtonElement | null
      if (!button) return

      const label = button.textContent?.trim() || ''
      if (!label.startsWith('Copy Code:')) return

      event.preventDefault()
      event.stopPropagation()

      const code = label.replace('Copy Code:', '').replace('Copied:', '').trim()
      const original = button.textContent || `Copy Code: ${code}`

      try {
        await navigator.clipboard.writeText(code)
        button.textContent = `Copied: ${code}`
        button.classList.add('ck-code-copied')
        window.setTimeout(() => {
          button.textContent = original
          button.classList.remove('ck-code-copied')
        }, 1400)
      } catch {
        button.textContent = `Copy failed`
        window.setTimeout(() => {
          button.textContent = original
        }, 1400)
      }
    }

    document.addEventListener('click', handleCopyCode, true)
    return () => document.removeEventListener('click', handleCopyCode, true)
  }, [])

  return (
    <div className="relative z-[60] w-full overflow-hidden bg-gradient-to-r from-[#f4c430] via-[#f0e68c] to-[#f4c430] py-1.5 text-sm font-semibold text-black shadow-sm md:py-2 md:text-base">
      <style jsx global>{`
        @keyframes top-promo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .top-promo-marquee-track {
          animation: top-promo-marquee 26s linear infinite;
          will-change: transform;
        }

        button:has(> *),
        button {
          -webkit-tap-highlight-color: transparent;
        }

        button[type='button'] {
          cursor: pointer;
        }

        button[type='button']:not([aria-haspopup='menu']) {
          position: relative;
        }

        button[type='button']:not([aria-haspopup='menu']):has-text {
          background: #f9e8a6;
        }

        #start-challenge button[type='button'] {
          background: linear-gradient(180deg, #f9e8a6 0%, #f0d968 100%) !important;
          border: 1px dashed rgba(168, 123, 11, 0.45) !important;
          color: #5a3f00 !important;
          box-shadow: inset 0 1px 0 rgba(250,248,245,0.7), 0 8px 24px rgba(168,123,11,0.12);
        }

        #start-challenge button[type='button']:hover {
          background: linear-gradient(180deg, #fbed9f 0%, #f3d76e 100%) !important;
          border-color: rgba(168, 123, 11, 0.7) !important;
          color: #1a1a1a !important;
        }

        #start-challenge button.ck-code-copied {
          background: linear-gradient(180deg, #e8fff2 0%, #bff7d4 100%) !important;
          border-color: rgba(64, 242, 133, 0.65) !important;
          color: #0b6b35 !important;
        }

        body > div > section:first-of-type {
          min-height: 86vh !important;
          align-items: center !important;
          justify-content: flex-start !important;
          padding-top: 5.25rem !important;
        }

        body > div > section:first-of-type > div.relative.z-10 {
          text-align: left !important;
        }

        body > div > section:first-of-type h1 {
          max-width: 760px;
          margin-left: 0 !important;
          margin-right: auto !important;
          line-height: 0.96 !important;
        }

        body > div > section:first-of-type p {
          margin-left: 0 !important;
          margin-right: auto !important;
        }

        body > div > section:first-of-type .button-primary,
        body > div > section:first-of-type .button-secondary-dark {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        body > div > section:first-of-type .button-primary {
          box-shadow: 0 16px 44px rgba(212, 175, 55, 0.32);
        }

        body > div > section:first-of-type .flex.justify-center {
          justify-content: flex-start !important;
        }

        body > div > section:first-of-type .grid.max-w-3xl {
          margin-left: 0 !important;
          margin-right: auto !important;
        }

        body > div > section:first-of-type .mx-auto.mb-5 {
          margin-left: 0 !important;
          margin-right: auto !important;
        }

        body > div > section:first-of-type a[href='https://app.ckcapital.co.uk/signup'] {
          position: relative;
          z-index: 5;
        }

        @media (max-width: 767px) {
          body > div > section:first-of-type {
            min-height: 78vh !important;
            padding-top: 3.75rem !important;
            padding-bottom: 3rem !important;
          }

          body > div > section:first-of-type > div.relative.z-10 {
            text-align: center !important;
          }

          body > div > section:first-of-type h1 {
            max-width: 360px;
            margin-left: auto !important;
            margin-right: auto !important;
            font-size: clamp(2rem, 9vw, 3rem) !important;
            line-height: 1.02 !important;
          }

          body > div > section:first-of-type p {
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 350px;
          }

          body > div > section:first-of-type .flex.justify-center {
            justify-content: center !important;
          }

          body > div > section:first-of-type .button-primary,
          body > div > section:first-of-type .button-secondary-dark {
            min-height: 52px;
            width: 100%;
            max-width: 330px;
          }

          body > div > section:first-of-type .grid.max-w-3xl {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>

      <div className="top-promo-marquee-track flex w-max items-center whitespace-nowrap">
        {[...promoItems, ...promoItems].map((item, index) => (
          <div key={`${item}-${index}`} className="mx-10 flex items-center gap-2 md:mx-14">
            <span>🏆</span>
            <span>Join Now &amp; Get JUN70 Code for 70% Off</span>
          </div>
        ))}
      </div>
    </div>
  )
}
