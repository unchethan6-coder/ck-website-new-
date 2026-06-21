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
import { DiscordCommunitySection } from '@/components/DiscordCommunitySection'
import { PayoutStoriesRoadmap } from '@/components/PayoutStoriesRoadmap'

export function Footer() {
  return (
    <>
      <PayoutStoriesRoadmap />
      <DiscordCommunitySection />
      <footer className="bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16" style={{ backgroundColor: '#030303', color: '#f6eeee', paddingBottom: '89px' }}>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 mb-12" style={{ color: '#e7e1e1' }}>
          {/* Brand & Social */}
          <div className="space-y-4 col-span-2 md:col-span-1">
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
              <li><Link href="/evaluation?type=1-step" className="text-white hover:text-white transition-colors text-sm">1-Step Challenge</Link></li>
              <li><Link href="/evaluation?type=2-step" className="text-white hover:text-white transition-colors text-sm">2-Step Challenge</Link></li>
              <li><Link href="/instant" className="text-white hover:text-white transition-colors text-sm">Instant Funding</Link></li>
            </ul>
          </div>

          {/* FAQ & Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-white hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/contact" className="text-white hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors text-sm">Community</a></li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Important</h4>
            <ul className="space-y-2">
              <li><Link href="/risk-disclosure" className="text-white hover:text-white transition-colors text-sm">Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className="text-white hover:text-white transition-colors text-sm">Cookies</Link></li>
              <li><Link href="/terms-conditions" className="text-white hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-white hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/return-policy" className="text-white hover:text-white transition-colors text-sm">Returns Policy</Link></li>
              <li><a href="https://uk.trustpilot.com/review/ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors text-sm">Reviews</a></li>
              <li><Link href="/affiliates" className="text-white hover:text-white transition-colors text-sm">Affiliates</Link></li>
            </ul>
          </div>
        </div>

        {/* Payment Options */}
        <div className="py-8 mb-8">
          <p className="text-sm text-white mb-4 font-semibold">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-4 text-sm text-white" style={{ color: '#efebeb' }}>
            <span>Stripe</span><span>PayPal</span><span>Visa / Mastercard</span><span>Crypto (USDT)</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div className="text-sm" style={{ color: '#f1eded' }}>
              <p className="text-white font-semibold mb-2">CK CAPITAL GROUP LTD</p>
              <p style={{ color: '#f1eded' }}>All Rights Reserved</p>
              <p className="mt-2" style={{ color: '#f1eded' }}>Mon-Fri: 8am-8pm (GMT)</p>
              <p style={{ color: '#f1eded' }}>6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>

            <div className="text-sm">
              <p className="text-white font-semibold mb-2">Support</p>
              <p style={{ color: '#f7eeee' }}>24/7 Support Available</p>
              <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors">Discord Community</a>
            </div>

            <div className="text-sm" style={{ color: '#ffffff' }}>
              <p className="text-white font-semibold mb-2">Quick Links</p>
              <div className="space-y-1" style={{ color: '#ffffff' }}>
                <Link href="/" className="block text-foreground hover:text-primary transition-colors" style={{ color: '#ffffff' }}>Home</Link>
                <Link href="/about-us" className="block text-foreground hover:text-primary transition-colors" style={{ color: '#f8f7f6' }}>About Us</Link>
                <Link href="/blog" className="block text-foreground hover:text-primary transition-colors" style={{ color: '#f7f6f2' }}>Blog</Link>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mt-8" style={{ fontSize: '13px', color: '#cfc9c9', textAlign: 'left' }}>
            <h1 style={{ fontWeight: '700', fontSize: '15px', lineHeight: '0.6em' }}>Important Information & Disclaimer</h1>
            <h2 style={{ fontWeight: '700', fontSize: '15px', marginTop: '12px', lineHeight: '1.4' }}>Simulated Trading Environment</h2>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>All accounts and evaluation programs provided by CK Capital operate exclusively within a simulated trading environment. No trades are executed on live financial markets, and no real capital is allocated to participants. Our services are intended solely for educational, skill assessment, and trader evaluation purposes.</p>
            <h2 style={{ fontWeight: '700', fontSize: '15px', marginTop: '12px', lineHeight: '1.4' }}>No Investment Services</h2>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>The simulated trading services are provided by CK Capital. All content published or distributed by CK Capital and its affiliated entities is provided for general informational and educational purposes only.</p>
            <p style={{ fontSize: '13px', marginTop: '8px' }}><strong>The Company:</strong></p>
            <ul style={{ marginLeft: '16px', marginTop: '4px', lineHeight: '1.6' }}>
              <li style={{ fontSize: '13px', marginBottom: '4px' }}>1) Does not provide investment, financial, legal, or tax advice.</li>
              <li style={{ fontSize: '13px', marginBottom: '4px' }}>2) Does not recommend or solicit the purchase or sale of any financial instrument, security, or investment product.</li>
              <li style={{ fontSize: '13px', marginBottom: '4px' }}>3) Does not act as a broker, dealer, custodian, or financial intermediary.</li>
              <li style={{ fontSize: '13px', marginBottom: '4px' }}>4) Does not offer live trading accounts or investment management services through this website.</li>
            </ul>
            <p style={{ fontSize: '13px', marginTop: '8px', lineHeight: '1.6' }}>Participation in any CK Capital program is voluntary. Program fees are service fees for access to evaluation programs, technology, educational resources, and related services. Such fees are not deposits, do not constitute investments, and should not be interpreted as client funds.</p>
            <p style={{ fontSize: '13px', marginTop: '8px', lineHeight: '1.6' }}>Program fees are generally non-refundable except where required by applicable law. These fees do not earn interest, returns, dividends, or profit-sharing rights and do not establish any investment relationship between participants and the Company.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
