'use client'

import Link from 'next/link'

const SIGNUP = 'https://app.ckcapital.co.uk/signup'

export function InstantFundingHighlight() {
  return (
    <section className="relative py-14 md:py-20 px-4 md:px-6 bg-background">
      <style>{`
        @keyframes ifo-glow {
          0%   { transform: translate(-8%, -8%) scale(1); }
          50%  { transform: translate(16%, 10%) scale(1.18); }
          100% { transform: translate(-8%, -8%) scale(1); }
        }
        @keyframes ifo-glow2 {
          0%   { transform: translate(10%, 20%) scale(1.1); opacity: .5; }
          50%  { transform: translate(-12%, -6%) scale(1); opacity: .8; }
          100% { transform: translate(10%, 20%) scale(1.1); opacity: .5; }
        }
        @keyframes ifo-sweep {
          0%       { left: -45%; }
          55%,100% { left: 130%; }
        }
        @keyframes ifo-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          70%  { box-shadow: 0 0 0 9px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }
        @keyframes ifo-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ifo-card  { animation: ifo-rise .7s ease-out both; }
        .ifo-glow  { animation: ifo-glow 9s ease-in-out infinite; }
        .ifo-glow2 { animation: ifo-glow2 11s ease-in-out infinite; }
        .ifo-sweep { animation: ifo-sweep 6.5s ease-in-out infinite; }
        .ifo-badge { animation: ifo-pulse 2.6s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ifo-card,.ifo-glow,.ifo-glow2,.ifo-sweep,.ifo-badge { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div
          className="ifo-card relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
          style={{ background: 'linear-gradient(135deg,#0b0f1f 0%,#12162d 55%,#0b0f1f 100%)' }}
        >
          {/* Animated purple glows */}
          <div
            className="ifo-glow pointer-events-none absolute -top-1/3 -left-1/5 h-[170%] w-[55%]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,255,0.50) 0%, rgba(124,92,255,0.14) 42%, transparent 70%)' }}
          />
          <div
            className="ifo-glow2 pointer-events-none absolute -bottom-1/2 right-0 h-[150%] w-[45%]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(56,120,255,0.30) 0%, rgba(56,120,255,0.08) 45%, transparent 72%)' }}
          />
          {/* Shimmer sweep */}
          <div
            className="ifo-sweep pointer-events-none absolute top-0 h-full w-1/3 -skew-x-12"
            style={{ background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.07), transparent)' }}
          />

          <div className="relative p-7 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <span
                  className="ifo-badge inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(16,61,46,0.85)', color: 'var(--foreground)'d399', border: '1px solid rgba(52,211,153,0.4)' }}
                >
                  Newly Launched
                </span>
                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                  Instant Funding
                </h2>
              </div>

              <Link
                href={SIGNUP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 self-start md:self-center rounded-full px-7 py-3 font-semibold transition-transform hover:scale-105"
                style={{ background: 'rgba(15,42,34,0.9)', color: 'var(--foreground)'d399', border: '1px solid rgba(52,211,153,0.5)' }}
              >
                Start Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="my-6 border-t border-white/10" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <p className="max-w-2xl text-sm md:text-base text-foreground/60 leading-relaxed">
                Skip the challenge — get a funded simulated account instantly from $20. No waiting,
                no complex rules. Start trading immediately.
              </p>
              <p className="text-xs text-foreground/40 md:whitespace-nowrap">
                No Challenge &middot; Instant Access &middot; From $20
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
