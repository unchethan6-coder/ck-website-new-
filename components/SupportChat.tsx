'use client'

import { useState } from 'react'

type Faq = { q: string; a: string }

const FAQS: Faq[] = [
  { q: 'How do I start a challenge?', a: "Choose an account size on our Evaluations page, complete checkout, and your login details arrive by email. Open the Products menu to begin." },
  { q: 'What is the profit split?', a: "You keep up to 100% of your simulated profits, with flexible payouts on your own schedule." },
  { q: 'Which platforms can I trade on?', a: "We support MetaTrader 5 (MT5), MetaTrader 4 (MT4) and cTrader." },
  { q: 'How do payouts work?', a: "Once funded, you can request a withdrawal whenever you like. Payouts are processed on a flexible schedule." },
  { q: 'Do you allow news trading?', a: "Yes. News trading is allowed with no restrictions on high-impact events." },
  { q: 'How do I reach a human?', a: "Our team is available 24/7. Use the Contact page or your dashboard and we will get back to you quickly." },
]

export function SupportChat() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close support chat' : 'Open support chat'}
        className="fixed bottom-5 right-5 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-black text-white shadow-lg hover:bg-black/90 transition-colors"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" /></svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-black/10 bg-white shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: '70vh' }}
        >
          <div className="bg-black text-white px-4 py-3">
            <p className="font-semibold text-sm">CK Capital Support</p>
            <p className="text-xs text-white/70">We usually reply within a few minutes</p>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            {active === null ? (
              <>
                <p className="text-sm text-black/70 mb-3">Hi there! How can we help? Pick a question below.</p>
                <div className="space-y-2">
                  {FAQS.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-black/10 text-black hover:border-black/30 hover:bg-black/5 transition-colors"
                    >
                      {f.q}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-black mb-2">{FAQS[active].q}</p>
                <p className="text-sm text-black/70 mb-4 leading-relaxed">{FAQS[active].a}</p>
                <button onClick={() => setActive(null)} className="text-sm font-medium text-[#A87B0B] hover:underline">
                  Back to questions
                </button>
              </>
            )}
          </div>

          <div className="border-t border-black/10 p-3">
            <a href="/contact" className="button-primary block w-full text-center">Contact our team</a>
          </div>
        </div>
      )}
    </>
  )
}
