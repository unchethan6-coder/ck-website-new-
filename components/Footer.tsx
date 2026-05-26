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

        {/* Bottom Section */}
        <div className="border-t border-[#1F2D42] pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-[#8A94A6]">
              © {currentYear} CK Capital Group Ltd. All rights reserved.
            </p>
            <p className="text-xs text-[#8A94A6] text-center sm:text-right leading-relaxed max-w-lg">
              <strong>Risk Disclaimer:</strong> All evaluation accounts operate in a simulated environment. Trading CFDs carries significant risk and may not be suitable for all individuals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
