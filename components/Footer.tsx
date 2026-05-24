import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo%20%281%29-JWcpaOMEVX6Hecl5M4TBpcD9OYZN3C.png"
              alt="CK Capital Logo"
              width={100}
              height={32}
              className="h-auto w-auto"
            />
          </div>

          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {currentYear} CK Capital Group Ltd. All rights reserved.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">Hours</p>
              <p>Mon – Fri: 8am – 8pm (GMT)</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Address</p>
              <p>6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Support</p>
              <p>24/7 Support Available Mon-Fri</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center leading-relaxed mt-4">
            Disclaimer: Forex, cryptocurrency, and commodities trading involve substantial risk of loss. Not all investors are suitable for such trading. Past performance is not indicative of future results. CK Capital is a proprietary trading firm providing trading capital to qualified traders. Trading with leverage carries risk of substantial loss.
          </p>
        </div>
      </div>
    </footer>
  );
}
