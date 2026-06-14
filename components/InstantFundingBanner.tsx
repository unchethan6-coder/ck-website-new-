'use client'

import Link from 'next/link'

const SIGNUP = 'https://app.ckcapital.co.uk/signup'

export function InstantFundingBanner() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <h2 className="text-xl md:text-2xl font-extrabold text-[#111111] mb-4">Newly Launched</h2>

        {/* Tab pill (single active offer, matches the reference design language) */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-sm if-pill">
            Instant Funding • From $20
          </span>
        </div>

        {/* Animated offer card */}
        <div className="if-card relative overflow-hidden rounded-[28px] p-6 md:p-10">
          {/* moving purple glows */}
          <div className="if-glow if-glow-1" aria-hidden="true" />
          <div className="if-glow if-glow-2" aria-hidden="true" />

          {/* content */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 if-rise">
              <span className="inline-block rounded-md bg-[#22c55e]/15 px-2.5 py-1 text-xs font-bold tracking-wide text-[#34d399]">
                NEW
              </span>

              <h3 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-white">
                Instant Funding
              </h3>

              <div className="my-5 h-px w-full bg-white/10" />

              <p className="max-w-2xl text-sm md:text-base leading-relaxed text-white/60">
                Skip the challenge - get a funded simulated account instantly from $20. No waiting, no
                complex rules. Start trading immediately.
              </p>
            </div>

            {/* green CTA (code-button style from the reference) */}
            <div className="flex-shrink-0 if-rise" style={{ animationDelay: '120ms' }}>
              <Link
                href={SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#34d399]/60 bg-[#0f3d2e] px-6 py-3 font-bold text-[#34d399] transition-all hover:bg-[#14543e] hover:shadow-[0_0_24px_rgba(52,211,153,0.35)]"
              >
                Start Trading
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
          background: linear-gradient(90deg, #6d5dfc 0%, #8b5cf6 100%);
        }
        .if-card {
          background:
            radial-gradient(120% 140% at 0% 0%, #1c1840 0%, rgba(28,24,64,0) 55%),
            linear-gradient(135deg, #13112a 0%, #0b0a1b 100%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 60px rgba(10,8,30,0.45);
        }
        .if-glow {
          position: absolute;
          top: -40%;
          width: 60%;
          height: 180%;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.55;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .if-glow-1 {
          left: -10%;
          background: radial-gradient(circle, rgba(124,92,255,0.85) 0%, rgba(124,92,255,0) 70%);
          animation: if-sweep1 9s ease-in-out infinite;
        }
        .if-glow-2 {
          right: -10%;
          background: radial-gradient(circle, rgba(91,63,209,0.7) 0%, rgba(91,63,209,0) 70%);
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
