import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E8E8E8]">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-[#666666] hover:text-[#E8C547] transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8E8E8] py-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
                alt="CK Capital Logo"
                width={60}
                height={20}
                className="h-5 w-auto group-hover:opacity-70 transition-opacity"
              />
            </div>

            <p className="text-sm text-[#999999] text-center md:text-right">
              © {currentYear} CK Capital Group Ltd. All rights reserved.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8E8E8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-2 text-sm">Hours</p>
              <p className="text-sm text-[#666666]">Mon – Fri: 8am – 8pm (GMT)</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-2 text-sm">Address</p>
              <p className="text-sm text-[#666666]">6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>
            <div>
              <p className="font-semibold text-[#1a1a1a] mb-2 text-sm">Support</p>
              <p className="text-sm text-[#666666]">24/7 Support Available Mon-Fri</p>
            </div>
          </div>

          <p className="text-xs text-[#999999] text-center leading-relaxed">
            Disclaimer: Forex, cryptocurrency, and commodities trading involve substantial risk of loss. Not all investors are suitable for such trading. Past performance is not indicative of future results. CK Capital is a proprietary trading firm providing trading capital to qualified traders. Trading with leverage carries risk of substantial loss.
          </p>
        </div>
      </div>
    </footer>
  );
}
