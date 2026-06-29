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
      {/* Discord community button */}
      <a
        href="https://discord.gg/ckcapital"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Discord community"
        className="dc-fab fixed bottom-[5.5rem] right-5 z-[55] flex items-center justify-center w-14 h-14 rounded-full"
        style={{ backgroundColor: '#5865F2' }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff" aria-hidden="true">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9461 2.4189-2.1568 2.4189Z" />
        </svg>
      </a>

      <style>{`
        .dc-fab {
          box-shadow: 0 8px 20px rgba(88,101,242,0.45);
          animation: dc-pop 0.5s cubic-bezier(0.22,1,0.36,1) both, dc-glow 2.4s ease-in-out 0.6s infinite;
          transition: transform 0.2s ease;
        }
        .dc-fab:hover { transform: scale(1.08); }
        @keyframes dc-pop {
          from { opacity: 0; transform: scale(0.4) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes dc-glow {
          0%, 100% { box-shadow: 0 8px 20px rgba(88,101,242,0.45), 0 0 0 0 rgba(88,101,242,0.55); }
          50% { box-shadow: 0 8px 26px rgba(88,101,242,0.65), 0 0 0 12px rgba(88,101,242,0); }
        }
        @media (prefers-reduced-motion: reduce) { .dc-fab { animation: none; } }
      `}</style>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close support chat' : 'Open support chat'}
        className="fixed bottom-5 right-5 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-black text-foreground shadow-lg hover:bg-black/90 transition-colors"
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
          <div className="bg-black text-foreground px-4 py-3">
            <p className="font-semibold text-sm">CK Capital Support</p>
            <p className="text-xs text-foreground/70">We usually reply within a few minutes</p>
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
