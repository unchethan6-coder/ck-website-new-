import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand */}
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
              alt="CK Capital"
              width={120}
              height={24}
              className="h-6 w-auto mb-4 brightness-0 invert"
              loading="lazy"
            />
            <p className="text-sm text-[#B0BCC9] leading-relaxed">
              Transforming traders into winners globally with simulated evaluation programs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Evaluations</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">How It Works</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Features</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Community</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Discord</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Guides</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              <li><a href="/privacy" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Terms</a></li>
              <li><a href="/disclaimer" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-sm text-[#B0BCC9] hover:text-[#F4D957] transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1F2D42] py-8 sm:py-10 mb-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <p className="font-semibold text-[#F4D957] mb-2 text-xs uppercase tracking-wider">Address</p>
              <p className="text-sm text-[#B0BCC9]">6-7 Waterside Station Road<br />Harpenden, AL5 4US<br />United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold text-[#F4D957] mb-2 text-xs uppercase tracking-wider">Email</p>
              <p className="text-sm text-[#B0BCC9]">support@ckcapital.co.uk</p>
            </div>
            <div>
              <p className="font-semibold text-[#F4D957] mb-2 text-xs uppercase tracking-wider">Hours</p>
              <p className="text-sm text-[#B0BCC9]">Mon – Fri: 8am – 8pm GMT</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-[#1F2D42] pt-10 pb-6">
          <h3 className="text-lg font-bold text-white mb-2">Important Information & Disclaimer</h3>
          <p className="text-xs text-[#8A94A6] mb-6">Please read carefully before using CK Capital services</p>

          <div className="space-y-6 text-xs text-[#B0BCC9] leading-relaxed">
            {/* Simulated Trading Environment */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Simulated Trading Environment</h4>
              <p>All accounts provided by CK Capital are demo accounts operating exclusively within a simulated trading environment. No real trades are executed on live financial markets. The services offered by CK Capital are intended solely for educational, evaluation, and skill-assessment purposes.</p>
            </div>

            {/* No Investment Services */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">No Investment Services</h4>
              <p className="mb-3">The simulated trading services are provided by CK Capital and its related entities. All content published or distributed by the Company is provided for general informational purposes only.</p>
              <p className="mb-2">The Company does not:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Provide investment advice or financial recommendations</li>
                <li>Solicit the purchase or sale of any financial instruments</li>
                <li>Act as a broker, custodian, exchange, or financial intermediary</li>
                <li>Offer live trading accounts or investment products</li>
              </ul>
            </div>

            {/* Service Fees */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Service Fees</h4>
              <p className="mb-3">Participation in any evaluation or simulated funding program is entirely voluntary. All fees paid to the Company are service fees only. These fees:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mb-3">
                <li>Are not deposits or client funds</li>
                <li>Do not represent investments of any kind</li>
                <li>Do not generate interest, returns, or profit-sharing</li>
                <li>Are non-refundable except where required by applicable law</li>
              </ul>
              <p className="mb-2">Program fees are used to support the Company&apos;s operational and administrative expenses, including platform infrastructure, software licensing, staffing, support services, technology systems, and risk-management operations.</p>
              <p>Payment of program fees grants access solely to simulated trading evaluations and related services in a demo environment. No fiduciary, custodial, or investment relationship is created between participants and the Company.</p>
            </div>

            {/* Financial Instruments */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Financial Instruments</h4>
              <p className="mb-2">Nothing on this website, platform, or within any CK Capital program constitutes an offer to buy or sell forex, CFDs, futures, options, stocks, cryptocurrencies, or any other financial instruments.</p>
              <p>All trading results, payouts, statistics, and performance figures displayed are based on simulated trading performance. Simulated results do not guarantee future outcomes, and past performance is not indicative of future performance.</p>
            </div>

            {/* Risk Warning */}
            <div className="bg-[#1F2D42] border-l-4 border-[#F59E0B] p-4 rounded-r">
              <h4 className="text-sm font-semibold text-[#F59E0B] mb-2 flex items-center gap-2">
                <span>⚠️</span> General Risk Warning
              </h4>
              <p className="mb-2">Trading financial markets carries a high level of risk and may not be suitable for all individuals. Even in a simulated environment, leveraged trading strategies may not accurately reflect real-world market execution, slippage, liquidity conditions, or psychological pressures.</p>
              <p>Participants should carefully assess their financial objectives, trading experience, and personal risk tolerance before participating in any simulated trading evaluation.</p>
            </div>

            {/* Corporate Information */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Corporate Information</h4>
              <p>CK Capital operates as a proprietary trading evaluation company providing simulated trading programs only. The Company does not provide brokerage services or live investment accounts through this website.</p>
            </div>

            {/* Restrictions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Restrictions</h4>
              <p className="mb-2">Services may not be available in certain jurisdictions or to individuals residing in restricted or sanctioned countries or regions, including jurisdictions subject to FATF, EU, UK, UN, or OFAC restrictions.</p>
              <p>Participants are responsible for ensuring compliance with their local laws and regulations before accessing the Company&apos;s services.</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1F2D42] pt-6">
          <p className="text-xs text-[#8A94A6] text-center">
            © {currentYear} CK Capital Group Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
