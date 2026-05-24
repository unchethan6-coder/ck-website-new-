import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5EBE0] border-t border-[#E8DED5] text-[#1a1a1a]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1a1a1a] mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#FFD700] transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8DED5] py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
                alt="CK Capital Logo"
                width={20}
                height={10}
                className="h-auto w-auto"
              />
            </div>

            <p className="text-sm text-[#666666] text-center md:text-right">
              © {currentYear} CK Capital Group Ltd. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#E8DED5]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-[#666666]">
            <div>
              <p className="font-semibold text-[#FFD700] mb-1">Hours</p>
              <p>Mon – Fri: 8am – 8pm (GMT)</p>
            </div>
            <div>
              <p className="font-semibold text-[#FFD700] mb-1">Address</p>
              <p>6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>
            <div>
              <p className="font-semibold text-[#FFD700] mb-1">Support</p>
              <p>24/7 Support Available Mon-Fri</p>
            </div>
          </div>

          <p className="text-xs text-[#999999] text-center leading-relaxed mt-4">
            Disclaimer: Forex, cryptocurrency, and commodities trading involve substantial risk of loss. Not all investors are suitable for such trading. Past performance is not indicative of future results. CK Capital is a proprietary trading firm providing trading capital to qualified traders. Trading with leverage carries risk of substantial loss.
          </p>
        </div>
      </div>
    </footer>
  );
}
