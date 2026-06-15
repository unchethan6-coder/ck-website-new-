'use client'

import { useState, useEffect } from 'react'

const SIGNIN = 'https://app.ckcapital.co.uk/signin'

export function PromoPopup() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('promoSeen2')) return
    const t = setTimeout(() => {
      setOpen(true)
      try { sessionStorage.setItem('promoSeen2', '1') } catch (e) {}
    }, 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const copyCode = (e) => {
    e.preventDefault(); e.stopPropagation()
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800) }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('JUN40R').then(done).catch(done)
      else done()
    } catch (err) { done() }
  }

  return (
    <>
      <style>{`.ckpromo-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 9998;
      
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }
#ckpromo {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      
      width: 900px;
      max-width: 94vw;
      background: transparent;
      border-radius: 20px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
      line-height: 1;
      max-height: 92vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
#ckpromo::-webkit-scrollbar {
      width: 4px;
    }
#ckpromo::-webkit-scrollbar-track {
      background: transparent;
    }
#ckpromo::-webkit-scrollbar-thumb {
      background: rgba(231, 162, 27, 0.3);
      border-radius: 10px;
    }
#ckpromo .ckpromo-close {
      position: absolute;
      top: 14px;
      right: 15px;
      background: #fff;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      padding: 0;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
      z-index: 10001;
      transition: all 0.3s ease;
      color: #1a1a1a;
      border: 1px solid rgba(0,0,0,0.08);
      -webkit-tap-highlight-color: transparent;
    }
#ckpromo .ckpromo-close:hover {
      background: #fff359;
      transform: scale(1.05);
    }
#ckpromo .ckpromo-close:active {
      transform: scale(0.95);
    }
#ckpromo .banner {
      font-family: 'Montserrat', sans-serif;
      background: #0E0B06;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      width: 100%;
      color: #fff;
    }
#ckpromo .geo-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 55% 60% at 28% 50%, rgba(231, 162, 27, 0.22) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 50% at 80% 50%, rgba(255, 243, 89, 0.12) 0%, transparent 70%),
                  radial-gradient(circle at 50% 0%, rgba(255, 243, 89, 0.10) 0%, transparent 50%);
      pointer-events: none;
    }
#ckpromo .geo-lines {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
#ckpromo .geo-lines svg {
      width: 100%;
      height: 100%;
      opacity: 0.08;
    }
#ckpromo .inner {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1px 1fr;
      min-height: 400px;
    }
#ckpromo .sec-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: rgba(231, 162, 27, 0.55);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
#ckpromo .sec-label::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(231, 162, 27, 0.2);
    }
#ckpromo .left {
      padding: 40px 42px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
#ckpromo .offer-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(231, 162, 27, 0.12);
      border: 1px solid rgba(231, 162, 27, 0.3);
      border-radius: 4px;
      padding: 5px 12px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: #e7a21b;
      margin-bottom: 20px;
      width: fit-content;
    }
#ckpromo .offer-tag-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e7a21b;
      animation: ckp-pulse 1.4s ease-in-out infinite;
    }
@keyframes ckp-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }
#ckpromo .hero {
      display: flex;
      align-items: flex-start;
      gap: 0;
      line-height: 1;
    }
#ckpromo .hero-num {
      font-size: 140px;
      font-weight: 900;
      color: #fff359;
      letter-spacing: -7px;
      line-height: 0.85;
      text-shadow: 0 0 50px rgba(255, 243, 89, 0.55), 0 0 100px rgba(255, 243, 89, 0.2);
    }
#ckpromo .hero-sup {
      display: flex;
      flex-direction: column;
      margin-top: 14px;
      margin-left: 2px;
    }
#ckpromo .hero-pct {
      font-size: 68px;
      font-weight: 900;
      color: #fff359;
      line-height: 0.95;
      letter-spacing: -2px;
      text-shadow: 0 0 30px rgba(255, 243, 89, 0.45);
    }
#ckpromo .hero-off {
      font-size: 40px;
      font-weight: 900;
      color: #fff;
      letter-spacing: 5px;
      line-height: 1.1;
    }
#ckpromo .free-reset-wrap {
      margin: 20px 0 30px;
    }
#ckpromo .free-reset {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #e7a21b 0%, #fff359 50%, #e7a21b 100%);
      padding: 18px 32px 18px 28px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(231, 162, 27, 0.4), 0 0 60px rgba(255, 243, 89, 0.25);
      border: 2px solid rgba(255, 243, 89, 0.5);
      animation: ckp-glowPulse 2s ease-in-out infinite;
    }
@keyframes ckp-glowPulse {
      0%, 100% { box-shadow: 0 8px 30px rgba(231, 162, 27, 0.4), 0 0 60px rgba(255, 243, 89, 0.25); }
      50% { box-shadow: 0 8px 40px rgba(231, 162, 27, 0.6), 0 0 80px rgba(255, 243, 89, 0.4); }
    }
#ckpromo .free-reset::before {
      content: '';
      position: absolute;
      top: 0;
      left: -60px;
      width: 50px;
      height: 100%;
      background: rgba(255, 255, 255, 0.35);
      transform: skewX(-20deg);
      animation: ckp-shine 2.8s ease-in-out infinite;
    }
@keyframes ckp-shine {
      0%, 100% { left: -60px; }
      50% { left: 200px; }
    }
#ckpromo .free-reset-plus {
      font-size: 28px;
      font-weight: 900;
      color: #1a1a1a;
      text-shadow: 0 0 10px rgba(255, 243, 89, 0.5);
    }
#ckpromo .free-reset-text {
      font-size: 22px;
      font-weight: 900;
      color: #1a1a1a;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 0 8px rgba(255, 243, 89, 0.3);
    }
#ckpromo .urgency {
      display: flex;
      align-items: center;
      gap: 10px;
    }
#ckpromo .urgency-fire {
      font-size: 18px;
    }
#ckpromo .urgency-text {
      font-size: 11px;
      font-weight: 700;
      color: #e7a21b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
#ckpromo .divider {
      background: linear-gradient(180deg, transparent 0%, rgba(231, 162, 27, 0.3) 20%, rgba(231, 162, 27, 0.3) 80%, transparent 100%);
    }
#ckpromo .right {
      padding: 40px 42px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
#ckpromo .feat-grid {
      display: flex;
      flex-direction: column;
    }
#ckpromo .feat {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 13px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
#ckpromo .feat:last-child {
      border-bottom: none;
    }
#ckpromo .ficon {
      width: 42px;
      height: 42px;
      border-radius: 8px;
      background: rgba(231, 162, 27, 0.1);
      border: 1px solid rgba(231, 162, 27, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
#ckpromo .ficon svg {
      width: 21px;
      height: 21px;
      stroke: #e7a21b;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
#ckpromo .ftext {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
#ckpromo .ftitle {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.1px;
    }
#ckpromo .fsub {
      font-size: 11px;
      font-weight: 500;
      color: rgba(255, 243, 89, 0.55);
      letter-spacing: 0.3px;
    }
#ckpromo .fcheck {
      margin-left: auto;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(231, 162, 27, 0.15);
      border: 1px solid rgba(231, 162, 27, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
#ckpromo .fcheck svg {
      width: 11px;
      height: 11px;
      stroke: #e7a21b;
      stroke-width: 2.5;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
#ckpromo .feel-free {
      margin-top: 16px;
      padding: 12px 16px;
      background: rgba(231, 162, 27, 0.08);
      border-left: 2px solid #e7a21b;
      border-radius: 0 6px 6px 0;
    }
#ckpromo .feel-free-text {
      font-size: 13px;
      font-weight: 700;
      color: #e7a21b;
      letter-spacing: 0.3px;
    }
#ckpromo .codebar {
      position: relative;
      z-index: 2;
      background: rgba(231, 162, 27, 0.08);
      border-top: 1px solid rgba(231, 162, 27, 0.2);
      display: flex;
      align-items: center;
      padding: 18px 42px;
    }
#ckpromo .code-left {
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex: 1;
    }
#ckpromo .code-eyebrow {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2.5px;
      color: rgba(255, 243, 89, 0.5);
      text-transform: uppercase;
    }
#ckpromo .code-row {
      display: flex;
      align-items: baseline;
      gap: 14px;
    }
#ckpromo .code-label {
      font-size: 13px;
      font-weight: 700;
      color: rgba(255, 243, 89, 0.7);
      letter-spacing: 1px;
    }
#ckpromo .code-copy-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
#ckpromo .code-value {
      font-size: 32px;
      font-weight: 900;
      color: #fff359;
      letter-spacing: 4px;
      text-shadow: 0 0 20px rgba(255, 243, 89, 0.45);
      transition: all 0.2s ease;
      user-select: all;
    }
#ckpromo .code-copy-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: rgba(231, 162, 27, 0.18);
      border: 1px solid rgba(231, 162, 27, 0.4);
      border-radius: 6px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
#ckpromo .code-copy-icon svg {
      width: 14px;
      height: 14px;
      stroke: #e7a21b;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
#ckpromo .code-copy-wrapper:hover .code-value {
      color: #fff9b0;
      text-shadow: 0 0 35px rgba(255, 243, 89, 0.7);
    }
#ckpromo .code-copy-wrapper:hover .code-copy-icon {
      background: rgba(231, 162, 27, 0.3);
      border-color: rgba(255, 243, 89, 0.6);
    }
#ckpromo .code-copy-wrapper:active .code-value {
      transform: scale(0.97);
    }
#ckpromo .copy-tooltip {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: #fff359;
      color: #0E0B06;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
#ckpromo .copy-tooltip.show {
      opacity: 1;
    }
#ckpromo .code-divider-v {
      width: 1px;
      height: 38px;
      background: rgba(231, 162, 27, 0.25);
      margin: 0 32px;
    }
#ckpromo .code-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
    }
#ckpromo .code-cta {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: rgba(255, 243, 89, 0.5);
      text-transform: uppercase;
    }
#ckpromo .code-savings {
      font-size: 13px;
      font-weight: 800;
      color: #e7a21b;
    }
@media (max-width: 1024px) {
#ckpromo {
        max-width: 90vw;
      }
#ckpromo .hero-num {
        font-size: 110px;
      }
#ckpromo .hero-pct {
        font-size: 54px;
      }
#ckpromo .hero-off {
        font-size: 32px;
        letter-spacing: 4px;
      }
#ckpromo .left, #ckpromo .right {
        padding: 30px 32px 36px;
      }
#ckpromo .codebar {
        padding: 14px 32px;
      }
#ckpromo .free-reset {
        padding: 16px 28px 16px 24px;
      }
#ckpromo .free-reset-text {
        font-size: 20px;
      }

    }
@media (max-width: 767px) {
#ckpromo {
        max-width: 96vw;
        max-height: 90vh;
        border-radius: 16px;
      }
#ckpromo .banner {
        border-radius: 16px;
      }
#ckpromo .inner {
        grid-template-columns: 1fr;
        min-height: auto;
      }
#ckpromo .divider {
        display: none;
      }
#ckpromo .left, #ckpromo .right {
        padding: 24px 22px 20px;
      }
#ckpromo .left {
        padding-bottom: 12px;
      }
#ckpromo .right {
        padding-top: 8px;
      }
#ckpromo .hero-num {
        font-size: 90px;
        letter-spacing: -5px;
      }
#ckpromo .hero-pct {
        font-size: 44px;
      }
#ckpromo .hero-off {
        font-size: 26px;
        letter-spacing: 3px;
      }
#ckpromo .hero-sup {
        margin-top: 10px;
      }
#ckpromo .free-reset {
        padding: 14px 24px 14px 20px;
      }
#ckpromo .free-reset-text {
        font-size: 18px;
        letter-spacing: 1.5px;
      }
#ckpromo .free-reset-plus {
        font-size: 24px;
      }
#ckpromo .offer-tag {
        font-size: 9px;
        letter-spacing: 2px;
        padding: 4px 10px;
      }
#ckpromo .sec-label {
        font-size: 8px;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }
#ckpromo .codebar {
        flex-wrap: wrap;
        padding: 16px 22px;
        gap: 14px;
      }
#ckpromo .code-divider-v {
        display: none;
      }
#ckpromo .code-right {
        align-items: flex-start;
        width: 100%;
      }
#ckpromo .code-value {
        font-size: 24px;
        letter-spacing: 3px;
      }
#ckpromo .code-copy-icon {
        width: 28px;
        height: 28px;
      }
#ckpromo .code-copy-icon svg {
        width: 13px;
        height: 13px;
      }
#ckpromo .code-row {
        gap: 10px;
      }
#ckpromo .ckpromo-close {
        top: 8px;
        right: 10px;
        width: 32px;
        height: 32px;
        font-size: 20px;
      }
#ckpromo .feat {
        gap: 12px;
        padding: 10px 0;
      }
#ckpromo .ficon {
        width: 36px;
        height: 36px;
      }
#ckpromo .ficon svg {
        width: 18px;
        height: 18px;
      }
#ckpromo .ftitle {
        font-size: 13px;
      }
#ckpromo .fsub {
        font-size: 10px;
      }
#ckpromo .feel-free {
        margin-top: 12px;
        padding: 10px 14px;
      }

    }
@media (max-width: 576px) {
#ckpromo .banner {
        border-radius: 14px;
      }
#ckpromo .left, #ckpromo .right {
        padding: 20px 16px 18px;
      }
#ckpromo .left {
        padding-bottom: 8px;
      }
#ckpromo .right {
        padding-top: 4px;
      }
#ckpromo .hero-num {
        font-size: 72px;
        letter-spacing: -4px;
      }
#ckpromo .hero-pct {
        font-size: 36px;
      }
#ckpromo .hero-off {
        font-size: 22px;
        letter-spacing: 2px;
      }
#ckpromo .hero-sup {
        margin-top: 8px;
      }
#ckpromo .free-reset {
        padding: 12px 20px 12px 16px;
        border-radius: 8px;
      }
#ckpromo .free-reset-text {
        font-size: 15px;
        letter-spacing: 1px;
      }
#ckpromo .free-reset-plus {
        font-size: 20px;
      }
#ckpromo .free-reset-wrap {
        margin: 14px 0 22px;
      }
#ckpromo .offer-tag {
        font-size: 8px;
        letter-spacing: 1.5px;
        padding: 3px 8px;
        margin-bottom: 14px;
      }
#ckpromo .urgency-text {
        font-size: 10px;
      }
#ckpromo .urgency-fire {
        font-size: 16px;
      }
#ckpromo .codebar {
        padding: 12px 16px;
        gap: 10px;
      }
#ckpromo .code-value {
        font-size: 20px;
        letter-spacing: 2px;
      }
#ckpromo .code-copy-icon {
        width: 24px;
        height: 24px;
      }
#ckpromo .code-copy-icon svg {
        width: 12px;
        height: 12px;
      }
#ckpromo .code-label {
        font-size: 11px;
      }
#ckpromo .code-eyebrow {
        font-size: 8px;
        letter-spacing: 2px;
      }
#ckpromo .code-savings {
        font-size: 11px;
      }
#ckpromo .code-cta {
        font-size: 9px;
      }
#ckpromo .ckpromo-close {
        top: 6px;
        right: 8px;
        width: 28px;
        height: 28px;
        font-size: 18px;
      }
#ckpromo .feat {
        gap: 10px;
        padding: 8px 0;
      }
#ckpromo .ficon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
      }
#ckpromo .ficon svg {
        width: 16px;
        height: 16px;
      }
#ckpromo .fcheck {
        width: 18px;
        height: 18px;
      }
#ckpromo .fcheck svg {
        width: 10px;
        height: 10px;
      }
#ckpromo .ftitle {
        font-size: 12px;
      }
#ckpromo .fsub {
        font-size: 9px;
      }
#ckpromo .feel-free-text {
        font-size: 11px;
      }
#ckpromo .copy-tooltip {
        font-size: 10px;
        padding: 5px 10px;
        top: -35px;
      }

    }
@media (max-width: 380px) {
#ckpromo .hero-num {
        font-size: 60px;
        letter-spacing: -3px;
      }
#ckpromo .hero-pct {
        font-size: 30px;
      }
#ckpromo .hero-off {
        font-size: 18px;
        letter-spacing: 1px;
      }
#ckpromo .code-value {
        font-size: 18px;
        letter-spacing: 1px;
      }
#ckpromo .code-row {
        gap: 6px;
      }
#ckpromo .left, #ckpromo .right {
        padding: 16px 12px 14px;
      }
#ckpromo .free-reset {
        padding: 10px 16px 10px 12px;
      }
#ckpromo .free-reset-text {
        font-size: 13px;
      }
#ckpromo .codebar {
        padding: 10px 12px;
      }

    }
@media (max-width: 900px) and (orientation: landscape) {
#ckpromo {
        max-height: 85vh;
        max-width: 80vw;
      }
#ckpromo .inner {
        grid-template-columns: 1fr 1px 1fr;
        min-height: 280px;
      }
#ckpromo .divider {
        display: block;
      }
#ckpromo .hero-num {
        font-size: 70px;
      }
#ckpromo .hero-pct {
        font-size: 36px;
      }
#ckpromo .hero-off {
        font-size: 22px;
      }
#ckpromo .left, #ckpromo .right {
        padding: 20px 24px;
      }
#ckpromo .codebar {
        padding: 12px 24px;
      }

    }
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
#ckpromo .ckpromo-close {
        border-width: 0.5px;
      }

    }

  `}</style>
      <div className="ckpromo-overlay" style={{ display: 'block' }} onClick={() => setOpen(false)} />
      <div id="ckpromo" style={{ display: 'block' }}>
        <button className="ckpromo-close" aria-label="Close popup" onClick={() => setOpen(false)}>&times;</button>
        <a href={SIGNIN} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="banner">
            <div className="geo-bg" />
            <div className="geo-lines">
              <svg viewBox="0 0 900 420" preserveAspectRatio="none">
                <line x1="0" y1="420" x2="420" y2="0" stroke="#e7a21b" strokeWidth="1" />
                <line x1="120" y1="420" x2="540" y2="0" stroke="#e7a21b" strokeWidth="1" />
                <line x1="700" y1="0" x2="700" y2="420" stroke="#fff359" strokeWidth="1" />
                <circle cx="450" cy="210" r="180" fill="none" stroke="#e7a21b" strokeWidth="1" />
                <circle cx="450" cy="210" r="260" fill="none" stroke="#fff359" strokeWidth=".5" />
              </svg>
            </div>
            <div className="inner">
              <div className="left">
                <div className="sec-label">Limited time offer</div>
                <div className="offer-tag"><span className="offer-tag-dot" />June deal — live now</div>
                <div className="hero">
                  <span className="hero-num">40</span>
                  <span className="hero-sup"><span className="hero-pct">%</span><span className="hero-off">OFF</span></span>
                </div>
                <div className="free-reset-wrap">
                  <div className="free-reset"><span className="free-reset-plus">+</span><span className="free-reset-text">Free Reset</span></div>
                </div>
                <div className="urgency"><span className="urgency-fire">🔥</span><span className="urgency-text">Limited spots remaining</span></div>
              </div>
              <div className="divider" />
              <div className="right">
                <div className="sec-label">What you get</div>
                <div className="feat-grid">
                  <div className="feat">
                    <div className="ficon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg></div>
                    <div className="ftext"><span className="ftitle">No consistency rule</span><span className="fsub">Trade freely, no restrictions</span></div>
                    <div className="fcheck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" /></svg></div>
                  </div>
                  <div className="feat">
                    <div className="ficon"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h4" /></svg></div>
                    <div className="ftext"><span className="ftitle">News trading allowed</span><span className="fsub">Trade all major events</span></div>
                    <div className="fcheck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" /></svg></div>
                  </div>
                  <div className="feat">
                    <div className="ficon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg></div>
                    <div className="ftext"><span className="ftitle">Zero restrictions</span><span className="fsub">Copy trading, EAs welcome</span></div>
                    <div className="fcheck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" /></svg></div>
                  </div>
                  <div className="feat">
                    <div className="ficon"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" /><path d="M9.5 3h5M12 3v2" /></svg></div>
                    <div className="ftext"><span className="ftitle">Zero Waiting</span><span className="fsub">Instant account access</span></div>
                    <div className="fcheck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" /></svg></div>
                  </div>
                </div>
                <div className="feel-free"><span className="feel-free-text">✦ &nbsp;Feel free to trade with us</span></div>
              </div>
            </div>
            <div className="codebar">
              <div className="code-left">
                <span className="code-eyebrow">Promo code</span>
                <div className="code-row">
                  <span className="code-label">CODE :</span>
                  <div className="code-copy-wrapper" onClick={copyCode} title="Tap to copy code">
                    <span className="code-value">JUN40R</span>
                    <span className="code-copy-icon"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></span>
                    <span className={'copy-tooltip' + (copied ? ' show' : '')}>Copied!</span>
                  </div>
                </div>
              </div>
              <div className="code-divider-v" />
              <div className="code-right"><span className="code-cta">You save</span><span className="code-savings">40% on challenge fee</span></div>
            </div>
          </div>
        </a>
      </div>
    </>
  )
}
