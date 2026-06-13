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
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16" style={{ backgroundColor: '#030303', color: '#f6eeee', paddingBottom: '89px' }}>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12" style={{ color: '#e7e1e1' }}>
          {/* Brand & Social */}
          <div className="space-y-4">
            <div className="font-bold text-xl text-white">CK CAPITAL</div>
            <div className="flex gap-4">
              <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="https://twitter.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://facebook.com/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://t.me/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Evaluations */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Evaluations</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/evaluation?type=1-step" className="text-white hover:text-white transition-colors text-sm">
                  1-Step Challenge
                </Link>
              </li>
              <li>
                <Link href="/evaluation?type=2-step" className="text-white hover:text-white transition-colors text-sm">
                  2-Step Challenge
                </Link>
              </li>
              <li>
                <Link href="/instant" className="text-white hover:text-white transition-colors text-sm">
                  Instant Funding
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ & Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors text-sm">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Important</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/risk-disclosure" className="text-white hover:text-white transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-white hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-white hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/return-policy" className="text-white hover:text-white transition-colors text-sm">
                  Returns Policy
                </Link>
              </li>
              <li>
                <a href="https://uk.trustpilot.com/review/ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors text-sm">
                  Reviews
                </a>
              </li>
              <li>
                <Link href="/affiliates" className="text-white hover:text-white transition-colors text-sm">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Options */}
        <div className="py-8 mb-8">
          <p className="text-sm text-white mb-4 font-semibold">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-4 text-sm text-white" style={{ color: '#efebeb' }}>
            <span>Stripe</span>
            <span>PayPal</span>
            <span>Visa / Mastercard</span>
            <span>Crypto (USDT)</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="text-sm" style={{ color: '#f1eded' }}>
              <p className="text-white font-semibold mb-2">CK CAPITAL GROUP LTD</p>
              <p style={{ color: '#f1eded' }}>All Rights Reserved</p>
              <p className="mt-2" style={{ color: '#f1eded' }}>Mon-Fri: 8am-8pm (GMT)</p>
              <p style={{ color: '#f1eded' }}>6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>

            {/* Contact Info */}
            <div className="text-sm">
              <p className="text-white font-semibold mb-2">Support</p>
              <p style={{ color: '#f7eeee' }}>24/7 Support Available</p>
              <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">
                Discord Community
              </a>
            </div>

            {/* Quick Links */}
            <div className="text-sm" style={{ color: '#ffffff' }}>
              <p className="text-white font-semibold mb-2">Quick Links</p>
              <div className="space-y-1" style={{ color: '#ffffff' }}>
                <Link href="/" className="block text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/about-us" className="block text-foreground hover:text-primary transition-colors" style={{ color: '#f8f7f6' }}>
                  About Us
                </Link>
                <Link href="/blog" className="block text-foreground hover:text-primary transition-colors" style={{ color: '#f7f6f2' }}>
                  Blog
                </Link>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-white/5 rounded-lg p-4 mt-8">
            <p className="text-xs text-white leading-relaxed">
              <strong>Risk Disclosure:</strong> CK Capital is a proprietary trading firm providing simulated trading environments and educational evaluation programmes. CK Capital does NOT provide financial advice, investment advice, or brokerage services. All accounts are simulated/demo environments using virtual funds - no real money is traded on behalf of clients.
            </p>
            <p className="text-xs text-white leading-relaxed mt-2">
              Trading financial instruments involves significant risk of loss. Past performance is not indicative of future results. All profits, certificates, and funded account values shown represent simulated trading results only and do not guarantee future profitability in live markets. All values referenced on this website (including &apos;Up to $1.2M&apos;, &apos;100% Profit Split&apos;) relate to simulated/demo trading environments. Evaluation fees are non-refundable unless stated in our Return Policy. Income or profit figures are illustrative examples only. Individual results vary based on trading skill, market conditions, and adherence to evaluation rules. CK Capital makes no guarantee of earnings or profitability.
            </p>
            <p className="text-xs text-white leading-relaxed mt-2">
              CK Capital Group Ltd - Registered in England & Wales.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
