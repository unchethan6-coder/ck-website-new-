'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

const SIGNUP = 'https://app.ckcapital.co.uk/signup'

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Show once per session, after a short delay
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('promoSeen')) return
    const timer = setTimeout(() => {
      setIsOpen(true)
      if (typeof window !== 'undefined') sessionStorage.setItem('promoSeen', '1')
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl max-h-[92vh] overflow-y-auto">
        <div className="pp-banner">
          <button className="pp-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <X size={18} />
          </button>

          <div className="pp-geo-bg" />
          <div className="pp-geo-lines">
            <svg viewBox="0 0 900 420" preserveAspectRatio="none">
              <line x1="0" y1="420" x2="420" y2="0" stroke="#C8A020" strokeWidth="1" />
              <line x1="120" y1="420" x2="540" y2="0" stroke="#C8A020" strokeWidth="1" />
              <line x1="700" y1="0" x2="700" y2="420" stroke="#C8A020" strokeWidth="1" />
              <circle cx="450" cy="210" r="180" fill="none" stroke="#C8A020" strokeWidth="1" />
              <circle cx="450" cy="210" r="260" fill="none" stroke="#C8A020" strokeWidth=".5" />
            </svg>
          </div>

          <div className="pp-inner">
            {/* LEFT */}
            <div className="pp-left">
              <div className="pp-sec-label">Limited time offer</div>
              <div className="pp-offer-tag">
                <span className="pp-dot" />
                June deal — live now
              </div>
              <div className="pp-hero">
                <span className="pp-hero-num">40</span>
                <span className="pp-hero-sup">
                  <span className="pp-hero-pct">%</span>
                  <span className="pp-hero-off">OFF</span>
                </span>
              </div>
              <div className="pp-free-wrap">
                <div className="pp-free">
                  <span className="pp-free-plus">+</span>
                  <span className="pp-free-text">Free Reset</span>
                </div>
              </div>
              <div className="pp-urgency">
                <span style={{ fontSize: 18 }}>🔥</span>
                <span className="pp-urgency-text">Limited spots remaining</span>
              </div>
            </div>

            <div className="pp-divider" />

            {/* RIGHT */}
            <div className="pp-right">
              <div className="pp-sec-label">What you get</div>
              <div className="pp-feat-grid">
                {[
                  { t: 'No consistency rule', s: 'Trade freely, no restrictions' },
                  { t: 'News trading allowed', s: 'Trade all major events' },
                  { t: 'Zero restrictions', s: 'Copy trading, EAs welcome' },
                  { t: '24–48hr payouts', s: 'Zero payout denials' },
                ].map((f) => (
                  <div className="pp-feat" key={f.t}>
                    <div className="pp-ficon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="pp-ftext">
                      <span className="pp-ftitle">{f.t}</span>
                      <span className="pp-fsub">{f.s}</span>
                    </div>
                    <div className="pp-fcheck">
                      <svg viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pp-feel">
                <span className="pp-feel-text">✦ &nbsp;Feel free to trade with us</span>
              </div>
            </div>
          </div>

          {/* CODE + EMAIL CLAIM BAR */}
          <div className="pp-codebar">
            <div className="pp-code-left">
              <span className="pp-code-eyebrow">Promo code</span>
              <div className="pp-code-row">
                <span className="pp-code-label">CODE :</span>
                <span className="pp-code-value">JUN40R</span>
              </div>
            </div>

            <div className="pp-claim">
              <input
                id="promo-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to claim"
                className="pp-email"
              />
              <Link href={SIGNUP} target="_blank" rel="noopener noreferrer" className="pp-cta">
                Claim Your Discount
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pp-banner {
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
          background: #0E0B06;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          width: 100%;
          color: #fff;
          box-shadow: 0 30px 80px rgba(0,0,0,0.55);
        }
        .pp-close {
          position: absolute; top: 14px; right: 14px; z-index: 6;
          width: 32px; height: 32px; border-radius: 50%; border: none; cursor: pointer;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center; transition: all .2s;
        }
        .pp-close:hover { background: rgba(255,255,255,0.16); color: #fff; }
        .pp-geo-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 60% at 28% 50%, rgba(200,140,0,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 80% 50%, rgba(160,110,0,0.10) 0%, transparent 70%),
            radial-gradient(circle at 50% 0%, rgba(255,180,0,0.07) 0%, transparent 50%);
        }
        .pp-geo-lines { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .pp-geo-lines svg { width: 100%; height: 100%; opacity: 0.07; }
        .pp-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1px 1fr; }
        .pp-sec-label {
          font-size: 9px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(200,150,0,0.55); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
        }
        .pp-sec-label::after { content: ''; flex: 1; height: 1px; background: rgba(200,150,0,0.2); }
        .pp-left { padding: 38px 38px 42px; display: flex; flex-direction: column; justify-content: center; }
        .pp-offer-tag {
          display: inline-flex; align-items: center; gap: 6px; width: fit-content;
          background: rgba(200,140,0,0.12); border: 1px solid rgba(200,140,0,0.3); border-radius: 4px;
          padding: 5px 12px; font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
          color: #C8A020; margin-bottom: 18px;
        }
        .pp-dot { width: 6px; height: 6px; border-radius: 50%; background: #C8A020; animation: pp-pulse 1.4s ease-in-out infinite; }
        @keyframes pp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        .pp-hero { display: flex; align-items: flex-start; line-height: 1; }
        .pp-hero-num {
          font-size: clamp(82px, 17vw, 140px); font-weight: 900; color: #F5A800;
          letter-spacing: -7px; line-height: .85; text-shadow: 0 0 50px rgba(245,168,0,0.45), 0 0 100px rgba(245,168,0,0.15);
        }
        .pp-hero-sup { display: flex; flex-direction: column; margin-top: 12px; margin-left: 2px; }
        .pp-hero-pct { font-size: clamp(40px, 9vw, 68px); font-weight: 900; color: #F5A800; line-height: .95; letter-spacing: -2px; text-shadow: 0 0 30px rgba(245,168,0,0.35); }
        .pp-hero-off { font-size: clamp(26px, 6vw, 40px); font-weight: 900; color: #fff; letter-spacing: 5px; line-height: 1.1; }
        .pp-free-wrap { margin: 16px 0 26px; }
        .pp-free {
          display: inline-flex; align-items: center; gap: 10px; position: relative; overflow: hidden;
          background: linear-gradient(90deg,#C88A00 0%,#F5A800 50%,#FFD240 100%); padding: 12px 24px 12px 18px; border-radius: 6px;
        }
        .pp-free::before { content: ''; position: absolute; top: 0; left: -60px; width: 40px; height: 100%; background: rgba(255,255,255,0.2); transform: skewX(-20deg); animation: pp-shine 2.8s ease-in-out infinite; }
        @keyframes pp-shine { 0%,100%{left:-60px} 50%{left:200px} }
        .pp-free-plus { font-size: 22px; font-weight: 900; color: #6B4200; }
        .pp-free-text { font-size: 17px; font-weight: 900; color: #3D2200; letter-spacing: 1.5px; text-transform: uppercase; }
        .pp-urgency { display: flex; align-items: center; gap: 10px; }
        .pp-urgency-text { font-size: 11px; font-weight: 700; color: #C8A020; letter-spacing: .5px; text-transform: uppercase; }
        .pp-divider { background: linear-gradient(180deg,transparent 0%,rgba(200,140,0,0.25) 20%,rgba(200,140,0,0.25) 80%,transparent 100%); }
        .pp-right { padding: 38px 38px 42px; display: flex; flex-direction: column; justify-content: center; }
        .pp-feat-grid { display: flex; flex-direction: column; }
        .pp-feat { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .pp-feat:last-child { border-bottom: none; }
        .pp-ficon { width: 40px; height: 40px; border-radius: 8px; background: rgba(200,140,0,0.08); border: 1px solid rgba(200,140,0,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pp-ficon svg { width: 20px; height: 20px; stroke: #C8A020; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .pp-ftext { display: flex; flex-direction: column; gap: 2px; }
        .pp-ftitle { font-size: 14px; font-weight: 700; color: #fff; }
        .pp-fsub { font-size: 11px; font-weight: 500; color: rgba(200,160,50,0.55); }
        .pp-fcheck { margin-left: auto; width: 20px; height: 20px; border-radius: 50%; background: rgba(200,140,0,0.15); border: 1px solid rgba(200,140,0,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pp-fcheck svg { width: 11px; height: 11px; stroke: #C8A020; stroke-width: 2.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
        .pp-feel { margin-top: 16px; padding: 12px 16px; background: rgba(200,140,0,0.06); border-left: 2px solid #C8A020; border-radius: 0 6px 6px 0; }
        .pp-feel-text { font-size: 13px; font-weight: 700; color: #C8A020; }
        .pp-codebar { position: relative; z-index: 2; background: rgba(200,140,0,0.07); border-top: 1px solid rgba(200,140,0,0.18); display: flex; align-items: center; justify-content: space-between; gap: 22px; padding: 16px 38px; }
        .pp-code-left { display: flex; flex-direction: column; gap: 3px; }
        .pp-code-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; color: rgba(200,160,50,0.5); text-transform: uppercase; }
        .pp-code-row { display: flex; align-items: baseline; gap: 12px; }
        .pp-code-label { font-size: 13px; font-weight: 700; color: rgba(200,160,50,0.7); letter-spacing: 1px; }
        .pp-code-value { font-size: clamp(24px, 6vw, 32px); font-weight: 900; color: #F5A800; letter-spacing: 4px; text-shadow: 0 0 20px rgba(245,168,0,0.35); }
        .pp-claim { display: flex; flex-direction: column; gap: 8px; min-width: 240px; }
        .pp-email { padding: 11px 16px; border-radius: 8px; border: 1px solid rgba(200,140,0,0.4); background: rgba(255,255,255,0.06); color: #fff; font-size: 13px; outline: none; width: 100%; }
        .pp-email::placeholder { color: rgba(200,160,80,0.5); }
        .pp-email:focus { border-color: #F5A800; }
        .pp-cta { display: block; text-align: center; padding: 12px 22px; border-radius: 8px; background: linear-gradient(90deg,#C88A00 0%,#F5A800 50%,#FFD240 100%); color: #3D2200; font-weight: 900; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; transition: filter .2s; }
        .pp-cta:hover { filter: brightness(1.07); }
        @media (max-width: 640px) {
          .pp-inner { grid-template-columns: 1fr; }
          .pp-divider { display: none; }
          .pp-left, .pp-right { padding: 26px 22px; }
          .pp-right { border-top: 1px solid rgba(255,255,255,0.06); }
          .pp-codebar { flex-direction: column; align-items: stretch; gap: 14px; padding: 18px 22px; }
          .pp-claim { min-width: 0; }
          .pp-code-row { justify-content: space-between; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pp-dot, .pp-free::before { animation: none; }
        }
      `}</style>
    </>
  )
}
