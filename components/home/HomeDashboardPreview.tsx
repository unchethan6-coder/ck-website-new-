'use client'

const objectives = [
  { label: 'Phase Progress', value: '72%', width: '72%' },
  { label: 'Daily Loss Used', value: '18%', width: '18%' },
  { label: 'Max Loss Used', value: '31%', width: '31%' },
  { label: 'Consistency Score', value: 'Good', width: '64%' },
]

const checklist = [
  'Trading objectives visible',
  'Risk limits monitored',
  'Reward eligibility status',
  'Evaluation calendar preview',
]

export function HomeDashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-16 md:py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 0%, rgba(212,175,55,0.18), transparent 35%), radial-gradient(circle at 80% 20%, rgba(255,217,90,0.10), transparent 30%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.28em] text-[#D4AF37]">DASHBOARD PREVIEW</p>
          <h2 className="text-4xl font-extrabold tracking-[-1px] text-white md:text-6xl md:tracking-[-1.5px]">
            Track every objective before you request rewards.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Give traders a clean visual dashboard for simulated account progress, risk limits, consistency, and reward eligibility.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/78">
                <span className="mr-2 text-[#D4AF37]">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_40px_120px_rgba(212,175,55,0.14)] backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0B0B0B] p-5 md:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">CK Capital</p>
                <h3 className="mt-1 text-xl font-extrabold text-white">Evaluation Dashboard</h3>
              </div>
              <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-extrabold text-black">Preview</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Account Size', '$100K'],
                ['Status', 'In Progress'],
                ['Reward Split', 'Up to 100%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs text-white/45">{label}</p>
                  <p className="mt-1 text-lg font-extrabold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-black/40 p-4">
              {objectives.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-white/65">{item.label}</span>
                    <span className="font-bold text-white">{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD95A]" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-bold text-white">Trading Calendar</p>
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-7 rounded-md ${index % 5 === 0 ? 'bg-[#D4AF37]' : index % 3 === 0 ? 'bg-white/20' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-sm font-bold text-white">Objective Checklist</p>
                <div className="mt-4 space-y-3">
                  {['Phase rules', 'Risk limits', 'Min days', 'Consistency'].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-xl bg-black/35 px-3 py-2 text-sm text-white/70">
                      <span>{item}</span>
                      <span className="text-[#D4AF37]">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/40">
              This is a dashboard preview. CK Capital provides simulated trading evaluations using demo accounts with fictitious funds.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
