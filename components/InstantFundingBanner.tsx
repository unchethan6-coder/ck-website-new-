'use client'

import Link from 'next/link'

const SIGNUP = 'https://app.ckcapital.co.uk/signup'

export function InstantFundingBanner() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-2xl font-extrabold text-foreground mb-4" style={{ fontSize: '30px' }}>
          Available Offers
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="rounded-full px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm if-pill">
            start challenge • From $9
          </span>
        </div>

        <div className="if-card relative overflow-hidden rounded-[28px] p-6 md:p-10">
          <div className="if-glow if-glow-1" aria-hidden="true" />
          <div className="if-glow if-glow-2" aria-hidden="true" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 if-rise">
              <span
                className="inline-block rounded-md px-2.5 py-1 text-xs font-bold tracking-wide text-black"
                style={{ background: 'linear-gradient(90deg, #FDE68A 0%, #D4AF37 55%, #A87B0B 100%)' }}
              >
                hot offer
              </span>

              <h3 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Your First Challenge, 70% Off
              </h3>

              <div className="my-5 h-px w-full bg-primary/40" />

              <p className="max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground">
                Enjoy 70% off selected evaluation models up to $100K account sizes. New users only. Terms apply.
              </p>
            </div>

            <div className="flex-shrink-0 if-rise" style={{ animationDelay: '120ms' }}>
              <Link
                href={SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/60 px-6 py-3 font-bold text-foreground transition-all text-lg shadow-[0_0_32px_rgba(212,175,55,0.35)]"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FDE68A 0%, #D4AF37 55%, #A87B0B 100%)',
                  fontSize: '18px',
                }}
              >
                USE CODE: JUN70
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .if-pill {
          background: linear-gradient(90deg, #FDE68A 0%, #D4AF37 55%, #A87B0B 100%);
        }
        .if-card {
          background:
            radial-gradient(90% 120% at 8% 0%, rgba(212,175,55,0.36) 0%, rgba(212,175,55,0) 55%),
            radial-gradient(90% 120% at 100% 40%, rgba(253,230,138,0.18) 0%, rgba(253,230,138,0) 62%),
            linear-gradient(135deg, #FFFDF7 0%, #FFF7E6 100%);
          border: 1px solid rgba(212,175,55,0.28);
          box-shadow: 0 24px 60px rgba(212,175,55,0.16);
        }
        .if-glow {
          position: absolute;
          top: -40%;
          width: 60%;
          height: 180%;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.48;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .if-glow-1 {
          left: -10%;
          background: radial-gradient(circle, rgba(212,175,55,0.95) 0%, rgba(212,175,55,0) 70%);
          animation: if-sweep1 9s ease-in-out infinite;
        }
        .if-glow-2 {
          right: -10%;
          background: radial-gradient(circle, rgba(253,230,138,0.55) 0%, rgba(253,230,138,0) 70%);
          animation: if-sweep2 11s ease-in-out infinite;
        }
        @keyframes if-sweep1 {
          0%   { transform: translateX(-20%) scale(1);   opacity: 0.35; }
          50%  { transform: translateX(120%) scale(1.25); opacity: 0.65; }
          100% { transform: translateX(-20%) scale(1);   opacity: 0.35; }
        }
        @keyframes if-sweep2 {
          0%   { transform: translateX(20%) scale(1.1);  opacity: 0.5; }
          50%  { transform: translateX(-120%) scale(0.9); opacity: 0.3; }
          100% { transform: translateX(20%) scale(1.1);  opacity: 0.5; }
        }
        .if-rise {
          opacity: 0;
          animation: if-rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes if-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .if-glow, .if-rise { animation: none !important; opacity: 1; }
        }
      `}</style>
    </section>
  )
}
