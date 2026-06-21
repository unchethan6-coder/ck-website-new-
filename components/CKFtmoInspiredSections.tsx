import Link from 'next/link'

const trustItems = [
  { label: 'Trustpilot', value: '4.5 rating' },
  { label: 'Active Regions', value: '28+ countries' },
  { label: 'Platforms', value: 'MT5 + TradeLocker' },
  { label: 'Support', value: '24/7 available' },
]

const features = [
  { title: 'Clear Trading Objectives', text: 'Simple rules, transparent limits, and structured simulated evaluation stages.' },
  { title: 'Flexible Reward Process', text: 'Reward requests are reviewed based on eligibility, account status, and program terms.' },
  { title: 'Reset & Top-Up Options', text: 'Continue your evaluation journey with flexible reset and top-up access.' },
  { title: 'MT5 + TradeLocker', text: 'Access supported platforms built for a smooth simulated trading workflow.' },
  { title: 'News Trading Allowed', text: 'Trade around market events according to CK Capital program rules.' },
  { title: 'Premium Support', text: 'Get help with account access, rules, and platform questions when needed.' },
]

const steps = [
  'Choose Evaluation',
  'Trade With Rules',
  'Meet Objectives',
  'Request Reward Review',
  'Scale Your Journey',
]

const faqs = [
  { q: 'How does CK Capital work?', a: 'CK Capital provides simulated trading evaluation programs with clear objectives, account rules, and reward review eligibility.' },
  { q: 'Is this live trading?', a: 'No. CK Capital programs use demo accounts with fictitious funds for simulated trading evaluation only.' },
  { q: 'Which platforms are supported?', a: 'CK Capital supports MT5 and TradeLocker access where available for eligible programs.' },
  { q: 'Can I trade news?', a: 'News trading is allowed according to the applicable program rules and risk limits.' },
]

export function CKFtmoInspiredSections() {
  return (
    <>
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-3 rounded-[28px] border border-black/10 bg-[#FAFAF7] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.08)] md:grid-cols-4 md:p-5">
            {trustItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-black/5 bg-white p-4 text-center">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/45">{item.label}</p>
                <p className="mt-2 text-lg font-extrabold text-black md:text-xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#A87B0B]">Why CK Capital</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-black md:text-5xl">Built for clear rules and trader progress.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">A simple, premium structure for simulated trading evaluations, platform access, support, and reward review clarity.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article key={feature.title} className="group rounded-3xl border border-black/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F4EA_100%)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(to_right_in_oklab,rgb(168,123,11)_0%,rgb(212,175,55)_50%,rgb(168,123,11)_100%)] text-sm font-extrabold text-black">0{index + 1}</div>
                <h3 className="text-xl font-extrabold text-black">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/65">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.20),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#D4AF37]">How It Works</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">Start simple. Follow the process.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">A clean FTMO-style flow adapted for CK Capital simulated evaluation programs.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-white">
                <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-[linear-gradient(to_right_in_oklab,rgb(168,123,11)_0%,rgb(212,175,55)_50%,rgb(168,123,11)_100%)] text-lg font-extrabold text-black">{index + 1}</div>
                <h3 className="text-lg font-extrabold">{step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{index === 0 ? 'Select the account size and model that fits your style.' : index === 1 ? 'Trade inside a simulated account with clear objectives.' : index === 2 ? 'Manage risk and complete the required evaluation goals.' : index === 3 ? 'Eligible traders can request reward review under program terms.' : 'Continue improving with scalable program options.'}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#A87B0B]">FAQ</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-black md:text-5xl">Questions before you start?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-black/10 bg-[#FAFAF7] p-5">
                <summary className="cursor-pointer list-none text-base font-extrabold text-black md:text-lg">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-4 py-14 md:px-6 md:py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.26),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl rounded-[32px] border border-[#D4AF37]/20 bg-white/[0.04] p-8 text-center text-white md:p-12">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#D4AF37]">Start CK Capital</p>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Ready to start your evaluation?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">Choose a simulated trading evaluation, follow the rules, and track your progress with CK Capital.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="button-primary inline-flex min-h-12 items-center justify-center px-8 font-extrabold">Start Evaluation</Link>
            <Link href="#start-challenge" className="button-secondary inline-flex min-h-12 items-center justify-center px-8">Compare Plans</Link>
          </div>
          <p className="mt-5 text-xs text-white/40">Demo accounts with fictitious funds. Simulated trading only. Terms apply.</p>
        </div>
      </section>
    </>
  )
}
