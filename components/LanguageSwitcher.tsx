'use client'

import { useEffect, useRef, useState } from 'react'

type Lang = { code: string; label: string; flag: string }

const LANGS: Lang[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pt', label: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
]

function readLang(): string {
  if (typeof document === 'undefined') return 'en'
  const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/)
  return m ? m[1] : 'en'
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { setLang(readLang()) }, [])

  useEffect(() => {
    if (document.getElementById('google-translate-script')) return
    ;(window as any).googleTranslateElementInit = () => {
      try {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: LANGS.map((l) => l.code).join(','), autoDisplay: false },
          'google_translate_element'
        )
      } catch (e) {}
    }
    const s = document.createElement('script')
    s.id = 'google-translate-script'
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    s.async = true
    document.body.appendChild(s)
  }, [])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const choose = (code: string) => {
    const base = location.hostname.replace(/^www\./, '')
    document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + base
    if (code !== 'en') {
      const val = '/en/' + code
      document.cookie = 'googtrans=' + val + ';path=/'
      document.cookie = 'googtrans=' + val + ';path=/;domain=.' + base
    }
    location.reload()
  }

  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  return (
    <div ref={ref} className="relative" translate="no">
      <div id="google_translate_element" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#0E0B06]/90 px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-[#D4AF37]"
        aria-label="Select language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="uppercase">{current.code}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 z-[60] mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-2xl border border-[#D4AF37]/25 bg-[#13100A] p-1.5 shadow-sm">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => choose(l.code)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${l.code === current.code ? 'bg-[#D4AF37]/15 font-semibold text-white' : 'text-white/80 hover:bg-white/[0.06]'}`}
            >
              <span className="text-lg leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
      <style>{`
        .goog-te-banner-frame, .skiptranslate { display: none !important; }
        body { top: 0 !important; }
        #google_translate_element { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
      `}</style>
    </div>
  )
}
