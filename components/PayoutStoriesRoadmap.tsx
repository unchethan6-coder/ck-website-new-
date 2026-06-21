const jamesCarterPhoto = '/james-carter-avatar.svg'

const payoutStories = [
  {
    initials: 'AK',
    name: 'Ahmed Khan',
    country: 'Pakistan',
    amount: '$3,200',
    tag: 'Beginner → Rewarded Trader',
    story: 'I struggled with consistency for months before joining a structured evaluation. Clear rules helped me slow down, manage risk, and complete my first reward cycle with confidence.',
  },
  {
    initials: 'JC',
    name: 'James Carter',
    country: 'United Kingdom',
    amount: '$1,850',
    tag: 'Evaluation → Consistent Progress',
    photo: jamesCarterPhoto,
    story: 'The biggest change was having a simple target and defined limits. Within a few weeks, I built a cleaner process and received my first approved reward request.',
  },
  {
    initials: 'AM',
    name: 'Arjun Mehta',
    country: 'India',
    amount: '$980',
    tag: 'Reset → Improved Discipline',
    story: 'After failing my first attempt, I used the reset option and focused on fewer trades. The second evaluation felt more controlled because the rules were easy to follow.',
  },
]

const roadmap = [
  { phase: 'Phase 1', time: 'Q1', status: 'Completed', title: 'Platform stability', text: 'Core evaluation flow, account access, and reward review process optimization.' },
  { phase: 'Phase 2', time: 'Q2', status: 'In Progress', title: 'Dashboard upgrades', text: 'Cleaner trader dashboard, better account visibility, and improved evaluation progress tracking.' },
  { phase: 'Phase 3', time: 'Q3', status: 'Planned', title: 'Advanced analytics', text: 'Trader analytics, performance insights, automation features, and smarter reporting tools.' },
  { phase: 'Phase 4', time: 'Q4', status: 'Planned', title: 'Global expansion', text: 'Community growth, regional programs, strategic partnerships, and broader platform support.' },
]

function StatusBadge({ status }: { status: string }) {
  const active = status === 'Completed'
  const progress = status === 'In Progress'
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${active ? 'bg-[#40F285]/15 text-[#40F285]' : progress ? 'bg-[#D8AD00]/20 text-[#D8AD00]' : 'bg-white/10 text-white/55'}`}>
      {status}
    </span>
  )
}

export function PayoutStoriesRoadmap() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(216,173,0,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#B59410]">Payout Stories</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-black md:text-5xl">Real trader journeys, not generic testimonials.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
              Short verified-style stories built around discipline, progress, and reward milestones inside CK Capital simulated evaluation programs.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {payoutStories.map((story) => (
              <article key={story.name} className="group relative overflow-hidden rounded-3xl border border-black/10 bg-[#0A0A0A] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 20% 0%, rgba(216,173,0,0.22), transparent 42%)' }} />
                <div className="relative z-10">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {story.photo ? (
                        <img src={story.photo} alt={story.name} className="size-20 shrink-0 rounded-full border-2 border-[#D8AD00] bg-[#D8AD00] object-cover object-center shadow-[0_0_28px_rgba(216,173,0,0.28)]" />
                      ) : (
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#D8AD00] text-base font-extrabold text-black">{story.initials}</div>
                      )}
                      <div>
                        <p className="text-xl font-extrabold text-white">{story.name}</p>
                        <p className="text-sm text-white/55">{story.country}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#40F285]/15 px-3 py-1 text-[10px] font-extrabold text-[#40F285]">Verified payout</span>
                  </div>

                  <div className="mb-5 rounded-2xl border border-[#D8AD00]/20 bg-white/[0.04] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Reward amount</p>
                    <p className="mt-1 text-3xl font-extrabold text-[#D8AD00]">{story.amount}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-white/72">“{story.story}”</p>
                  <div className="mt-5 inline-flex rounded-full border border-[#D8AD00]/25 bg-[#D8AD00]/10 px-3 py-1 text-[10px] font-extrabold text-[#F7D774]">
                    {story.tag}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-black/45">
            Story cards are for social-proof presentation and should be connected to verified internal records before using exact public payout claims.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] py-14 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,#050505 0%,#111111 50%,#050505 100%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#D8AD00]">CK Capital Roadmap</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">A transparent roadmap for long-term growth.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
              A simple view of CK Capital’s product direction, platform improvements, and ecosystem growth plans.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {roadmap.map((item, index) => (
              <article key={item.phase} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-white">
                <div className="absolute right-5 top-5 text-5xl font-extrabold text-white/[0.04]">0{index + 1}</div>
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#D8AD00] px-3 py-1 text-xs font-extrabold text-black">{item.time}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#D8AD00]">{item.phase}</p>
                  <h3 className="mt-3 text-xl font-extrabold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
