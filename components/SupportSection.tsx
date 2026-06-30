'use client'

import Link from 'next/link'

export function SupportSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-24 border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_50%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-4 py-1.5 mb-6">
              <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-sm font-semibold tracking-[0.5px] text-[#D4AF37]">24/7 TRADER SUPPORT</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold tracking-[-2.5px] text-white leading-none mb-6">
              Support Built for<br />Serious Traders
            </h2>
            
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-md">
              Our team is available 24/7 to help traders with evaluation access, platform questions, account support, and payout-related guidance. Fast replies, clear answers, and trader-first service.
            </p>

            {/* Languages */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[1px] text-white/50 mb-3">LANGUAGES SPOKEN</p>
              <div className="flex flex-wrap gap-2">
                {['🇬🇧', '🇦🇪', '🇮🇳', '🇵🇰', '🇪🇸', '🇫🇷', '🇩🇪', '+ more'].map((flag, i) => (
                  <div key={i} className="flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3.5 text-sm font-medium text-white/80">
                    {flag}
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="https://discord.gg/ckcapital" 
                target="_blank"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5C542] px-8 text-sm font-extrabold text-black transition-all hover:brightness-105 active:scale-[0.985]"
              >
                Get Support
              </Link>
              <Link 
                href="/faq" 
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Read FAQs
              </Link>
            </div>
          </div>

          {/* Right Side - Premium Glassmorphism Card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.035] to-white/[0.015] p-8 backdrop-blur-2xl shadow-2xl">
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#6B46C1]/10" />
              
              <div className="relative z-10">
                {/* Header with image placeholder */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.3),transparent)]" />
                    <div className="flex h-full items-center justify-center text-4xl">🎧</div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">CK Capital Support</div>
                    <div className="text-sm text-[#D4AF37]">Always online • Trader-first</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-4xl font-extrabold tracking-tighter text-white">95%</div>
                    <div className="mt-1 text-xs font-medium text-white/60">Trader Satisfaction</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-4xl font-extrabold tracking-tighter text-white">60s</div>
                    <div className="mt-1 text-xs font-medium text-white/60">Avg Response Time</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <div className="text-4xl font-extrabold tracking-tighter text-white">24/7</div>
                    <div className="mt-1 text-xs font-medium text-white/60">Support Available</div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
                  <div className="h-px flex-1 bg-white/10" />
                  <span>Real traders. Real answers. Real fast.</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 rounded-2xl border border-[#D4AF37]/30 bg-[#0a0a0a] px-4 py-2 text-xs font-semibold text-[#D4AF37] shadow-xl">
              Avg reply under 60 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
