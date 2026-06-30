'use client'

import Link from 'next/link'
import { 
  MessageCircle, 
  Twitter, 
  Instagram, 
  Youtube, 
  Facebook,
  Send
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 mb-12">
          
          {/* Brand & Social */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="font-bold text-xl">CK CAPITAL</div>
            <div className="flex gap-4">
              <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="https://twitter.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://facebook.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://t.me/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Evaluations */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Evaluations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/evaluation?type=1-step" className="text-white/70 hover:text-[#D4AF37] transition-colors">1-Step Challenge</Link></li>
              <li><Link href="/evaluation?type=2-step" className="text-white/70 hover:text-[#D4AF37] transition-colors">2-Step Challenge</Link></li>
              <li><Link href="/instant" className="text-white/70 hover:text-[#D4AF37] transition-colors">Instant Funding</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-white/70 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-[#D4AF37] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Important */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Important</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/risk-disclosure" className="text-white/70 hover:text-[#D4AF37] transition-colors">Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className="text-white/70 hover:text-[#D4AF37] transition-colors">Cookies</Link></li>
              <li><Link href="/terms-conditions" className="text-white/70 hover:text-[#D4AF37] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/return-policy" className="text-white/70 hover:text-[#D4AF37] transition-colors">Returns Policy</Link></li>
              <li><a href="https://uk.trustpilot.com/review/ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#D4AF37] transition-colors">Reviews</a></li>
              <li><Link href="/affiliates" className="text-white/70 hover:text-[#D4AF37] transition-colors">Affiliates</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="py-6 border-t border-white/10 mb-8">
          <p className="text-sm text-white/60 mb-3 font-medium">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/70">
            <span>Stripe</span>
            <span>PayPal</span>
            <span>Visa / Mastercard</span>
            <span>Crypto (USDT)</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            
            <div>
              <p className="font-semibold mb-2">CK CAPITAL GROUP LTD</p>
              <p className="text-white/60">All Rights Reserved</p>
              <p className="mt-2 text-white/60">Mon-Fri: 8am-8pm (GMT)</p>
              <p className="text-white/60">6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Support</p>
              <p className="text-white/60">24/7 Support Available</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Quick Links</p>
              <div className="space-y-1 text-white/60">
                <Link href="/" className="block hover:text-[#D4AF37] transition-colors">Home</Link>
                <Link href="/about-us" className="block hover:text-[#D4AF37] transition-colors">About Us</Link>
                <Link href="/blog" className="block hover:text-[#D4AF37] transition-colors">Blog</Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 text-xs text-white/50 leading-relaxed bg-white/5 p-5 rounded-xl">
            <p className="font-semibold text-white/70 mb-2">Important Information</p>
            <p>CK Capital provides simulated trading evaluations only. All accounts operate in a demo environment with fictitious funds. No real capital is traded or allocated. Participation is for evaluation and educational purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
