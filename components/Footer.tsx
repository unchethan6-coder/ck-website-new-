import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 border-t border-blue-800 text-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo%20%281%29-JWcpaOMEVX6Hecl5M4TBpcD9OYZN3C.png"
                alt="CK Capital Logo"
                width={90}
                height={28}
                className="h-auto w-auto"
              />
            </div>

            <p className="text-sm text-gray-300 text-center md:text-right">
              © {currentYear} CK Capital Group Ltd. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-yellow-400 mb-1">Hours</p>
              <p>Mon – Fri: 8am – 8pm (GMT)</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-400 mb-1">Address</p>
              <p>6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-400 mb-1">Support</p>
              <p>24/7 Support Available Mon-Fri</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center leading-relaxed mt-4">
            Disclaimer: Forex, cryptocurrency, and commodities trading involve substantial risk of loss. Not all investors are suitable for such trading. Past performance is not indicative of future results. CK Capital is a proprietary trading firm providing trading capital to qualified traders. Trading with leverage carries risk of substantial loss.
          </p>
        </div>
      </div>
    </footer>
  );
}
