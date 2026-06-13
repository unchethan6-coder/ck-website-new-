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
          <div className="bg-white/5 rounded-lg p-4 mt-8" style={{ fontSize: '10px', color: '#b4acac', textAlign: 'justify' }}>
            <h1 style={{ fontWeight: '700', fontSize: '12px', lineHeight: '0.6em' }}>Important Information & Disclaimer</h1>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Simulated Trading Environment</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>All accounts and evaluation programs provided by CK Capital operate exclusively within a simulated trading environment. No trades are executed on live financial markets, and no real capital is allocated to participants. Our services are intended solely for educational, skill assessment, and trader evaluation purposes.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>No Investment Services</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>The simulated trading services are provided by CK Capital. All content published or distributed by CK Capital and its affiliated entities (collectively, the "Company") is provided for general informational and educational purposes only.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px' }}><strong>The Company:</strong></p>
            <ul style={{ marginLeft: '16px', marginTop: '4px', lineHeight: '0.8em' }}>
              <li style={{ fontSize: '10px', marginBottom: '4px' }}>1) Does not provide investment, financial, legal, or tax advice.</li>
              <li style={{ fontSize: '10px', marginBottom: '4px' }}>2) Does not recommend or solicit the purchase or sale of any financial instrument, security, or investment product.</li>
              <li style={{ fontSize: '10px', marginBottom: '4px' }}>3) Does not act as a broker, dealer, custodian, or financial intermediary.</li>
              <li style={{ fontSize: '10px', marginBottom: '4px' }}>4) Does not offer live trading accounts or investment management services through this website.</li>
            </ul>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Participation in any CK Capital program is entirely voluntary. Any fees paid to the Company are service fees for access to evaluation programs, technology, educational resources, and related services. Such fees are not deposits, do not constitute investments, and should not be interpreted as client funds under any circumstances.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Program fees are generally non-refundable except where required by applicable law. These fees do not earn interest, returns, dividends, or profit-sharing rights and do not establish any investment relationship between participants and the Company.</p>
            
            <p style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '0.5em' }}>Fees collected by the Company are used to support business operations, including but not limited to:</p>
            <ul style={{ marginLeft: '16px', marginTop: '4px', lineHeight: '0.8em' }}>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Technology infrastructure</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Trading platform development and maintenance</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Software licensing</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Risk management systems</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Customer support</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Administrative operations</li>
              <li style={{ fontSize: '10px', marginBottom: '3px' }}>Staffing and business expenses</li>
            </ul>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Payment of a program fee grants access only to simulated trading evaluations and associated services.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>No Offer or Solicitation</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>Nothing contained on this website, within our programs, or in any communication issued by CK Capital constitutes an offer or solicitation to buy or sell forex, CFDs, futures, options, stocks, cryptocurrencies, or any other financial instruments.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Any trading results, performance statistics, payout examples, or testimonials displayed are based on simulated trading activities and should not be interpreted as guarantees of future performance.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Past simulated performance is not necessarily indicative of future results.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>General Risk Warning</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>Trading financial markets involves significant risk and is not suitable for every individual. Even within a simulated environment, trading strategies may produce results that differ substantially from real-market conditions due to factors such as liquidity, execution, slippage, and market volatility.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>Participants should carefully consider their objectives, experience, and risk tolerance before participating in any evaluation program.</p>
            
            <p style={{ fontSize: '10px', marginTop: '8px', lineHeight: '1.2' }}>No representation is made that any participant will achieve profits or similar results.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Intellectual Property</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>All website content, branding, educational materials, software, graphics, logos, and proprietary technologies are the exclusive property of CK Capital or its licensors and are protected by applicable intellectual property laws. Unauthorized reproduction, distribution, modification, or commercial use is strictly prohibited without prior written consent.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Jurisdiction Restrictions</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>CK Capital reserves the right to restrict or deny access to its services in jurisdictions where participation would violate applicable laws or regulations. Services may not be available to residents of certain countries or regions subject to international sanctions or regulatory restrictions. Users are responsible for ensuring compliance with their local laws before accessing or using the Company's services.</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Corporate Information</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2' }}>CK Capital provides simulated trader evaluation programs and educational services only. The Company does not provide brokerage services, investment management services, or financial advisory services through this website.</p>
            
            <h3 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Registered Office Address</h3>
            <p style={{ fontSize: '10px', lineHeight: '0.9em', marginTop: '8px' }}>CK Capital Group Ltd, 1 Allied Business Centre, Coldharbour Lane, Harpenden, Hertfordshire AL5 4UT, England, United Kingdom</p>
            
            <h2 style={{ fontWeight: '700', fontSize: '12px', marginTop: '12px', lineHeight: '1em' }}>Disclaimer</h2>
            <p style={{ fontSize: '10px', lineHeight: '1.2', marginTop: '8px' }}>By accessing this website or participating in any CK Capital program, you acknowledge that you understand the simulated nature of the services provided and agree to the applicable Terms & Conditions, Privacy Policy, and all other governing legal documents.</p>
            
            <p style={{ fontSize: '10px', lineHeight: '1em', marginTop: '8px' }}>Nothing contained on this website or within any CK Capital program shall be construed as financial, investment, legal, or tax advice, or as an offer or solicitation to engage in any investment activity.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
