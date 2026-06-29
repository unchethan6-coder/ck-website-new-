import Link from 'next/link'

const trustItems = [
  { label: 'Evaluations', value: '12K+', text: 'accounts accessed' },
  { label: 'Rewards', value: '$4.8M+', text: 'processed in tracker' },
  { label: 'Countries', value: '28+', text: 'active regions' },
  { label: 'Platforms', value: 'MT5', text: '+ TradeLocker' },
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
  { title: 'Choose Evaluation', text: 'Select your account size and evaluation route.' },
  { title: 'Trade With Rules', text: 'Use a simulated account with clear objectives.' },
  { title: 'Meet Objectives', text: 'Manage risk and complete the required goals.' },
  { title: 'Request Review', text: 'Eligible traders can request reward review.' },
  { title: 'Scale Journey', text: 'Continue improving with scalable program options.' },
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
      <section className="relative overflow-hidden bg-background-secondary py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.22),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 rounded-[32px] border border-primary/20 bg-primary/[0.04] p-4 shadow-[0_26px_90px_rgba(212,175,55,0.12)] backdrop-blur md:grid-cols-4 md:p-5">
            {trustItems.map((item) => (
              <div key={item.label} className="rounded-3xl border border-primary/20 bg-card p-5 text-center transition-transform duration-300 hover:-translate-y-1">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-muted-foreground/60">{item.label}</p>
                <p className="mt-2 bg-[linear-gradient(to_right_in_oklab,rgb(168,123,11)_0%,rgb(212,175,55)_50%,rgb(168,123,11)_100%)] bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background-secondary py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,243,247,0.3)_0%,rgba(224,235,245,0.3)_50%,rgba(238,243,247,0.3)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-primary">Why CK Capital</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl">Premium evaluation experience built for clarity.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">A focused prop-firm style journey with fewer distractions, stronger trust signals, and clear action paths.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article key={feature.title} className="group rounded-3xl border border-primary/20 bg-card/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_70px_rgba(212,175,55,0.12)]">
                <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-foreground">0{index + 1}</div>
                <h3 className="text-xl font-extrabold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-primary">How It Works</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl">Five simple steps from visitor to evaluation.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">A clear, conversion-focused journey built for mobile and desktop users.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article key={step.title} className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 text-foreground transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute right-4 top-4 text-6xl font-black text-foreground/[0.035]">0{index + 1}</div>
                <div className="relative z-10 mb-8 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-foreground">{index + 1}</div>
                <h3 className="relative z-10 text-lg font-extrabold">{step.title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-primary">FAQ</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-foreground md:text-5xl">Questions before you start?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-black/10 bg-[#FAFAF7] p-5 transition-colors hover:bg-[#F7F4EA]">
                <summary className="cursor-pointer list-none text-base font-extrabold text-black md:text-lg">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-4 py-14 md:px-6 md:py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.26),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl rounded-[32px] border border-[#D4AF37]/20 bg-white/[0.04] p-8 text-center text-foreground md:p-12">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#D4AF37]">Start CK Capital</p>
          <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Ready to start your evaluation?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">Choose a simulated trading evaluation, follow the rules, and track your progress with CK Capital.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="button-primary inline-flex min-h-12 items-center justify-center px-8 font-extrabold">Start Evaluation</Link>
            <Link href="#start-challenge" className="button-secondary inline-flex min-h-12 items-center justify-center px-8">Compare Plans</Link>
          </div>
          <p className="mt-5 text-xs text-foreground/40">Demo accounts with fictitious funds. Simulated trading only. Terms apply.</p>
        </div>
      </section>
    </>
  )
}
