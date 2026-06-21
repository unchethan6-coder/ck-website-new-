import Link from 'next/link'

const promoItems = Array.from({ length: 10 }, (_, index) => index)

export function PromoBar() {
  return (
    <>
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

          .ck-mobile-sticky-cta {
            display: none;
          }

          @media (max-width: 767px) {
            body > div > section:first-of-type {
              min-height: 78vh !important;
              padding-top: 3.75rem !important;
              padding-bottom: 6rem !important;
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

            .ck-mobile-sticky-cta {
              position: fixed;
              left: 12px;
              right: 12px;
              bottom: 14px;
              z-index: 80;
              display: flex;
              min-height: 54px;
              align-items: center;
              justify-content: center;
              border-radius: 999px;
              background: linear-gradient(135deg, #fff0a0 0%, #d8ad00 48%, #8a6b00 100%);
              color: #050505;
              font-size: 14px;
              font-weight: 900;
              box-shadow: 0 18px 50px rgba(0,0,0,0.28), 0 0 28px rgba(216,173,0,0.35);
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

      <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="ck-mobile-sticky-cta">
        Start Evaluation
      </Link>
    </>
  )
}
