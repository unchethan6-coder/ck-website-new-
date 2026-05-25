import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E8E8E8]">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 md:px-8">
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-2 sm:mb-3 text-xs uppercase tracking-wide">Product</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/payment-methods" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Payment Methods</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Pricing</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Features</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-2 sm:mb-3 text-xs uppercase tracking-wide">Community</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Discord</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Blog</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Guides</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-2 sm:mb-3 text-xs uppercase tracking-wide">Company</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">About</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Support</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-2 sm:mb-3 text-xs uppercase tracking-wide">Legal & Compliance</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><a href="/privacy" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Privacy Policy</a></li>
              <li><a href="/terms" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Terms of Service</a></li>
              <li><a href="/risk-disclosure" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Risk Disclosure</a></li>
              <li><a href="#" className="text-[#666666] hover:text-[#F4D957] transition-colors text-xs sm:text-sm">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8E8E8] py-6 sm:py-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
              alt="CK Capital"
              width={60}
              height={20}
              className="h-4 w-auto"
              loading="lazy"
            />
            <p className="text-xs sm:text-sm text-[#999999] text-center">
              © {currentYear} CK Capital Group Ltd.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="pt-6 sm:pt-8 border-t border-[#E8E8E8]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-1 text-xs uppercase">Hours</p>
              <p className="text-xs text-[#666666]">Mon – Fri: 8am – 8pm GMT</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-1 text-xs uppercase">Address</p>
              <p className="text-xs text-[#666666]">6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-1 text-xs uppercase">Support</p>
              <p className="text-xs text-[#666666]">24/7 Support Mon-Fri</p>
            </div>
          </div>

          <p className="text-xs text-[#999999] leading-relaxed">
            <strong>Risk Disclaimer:</strong> All challenge and evaluation accounts operate in a simulated environment only. Performance during evaluation does not guarantee future results or earnings. Trading CFDs carries a high level of risk and may not be suitable for all individuals. CK Capital does not provide investment advice, financial services, or brokerage services. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
