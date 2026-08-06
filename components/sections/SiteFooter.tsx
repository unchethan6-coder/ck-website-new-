import { Container } from "@/components/shared/Container";
import Link from "next/link";

const FOOTER_LINKS = {
  Products: [
    { label: "1-Step Challenge", href: "/?type=one-step&size=$100K#start-challenge" },
    { label: "2-Step Challenge", href: "/?type=standard&size=$100K#start-challenge" },
    { label: "Instant Funding", href: "/?type=instant&size=$100K#start-challenge" },
    { label: "Rewards", href: "/rewards" },
  ],
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Risk Disclosure", href: "/risk-disclosure" },
    { label: "Returns Policy", href: "/return-policy" },
  ],
};

export function SiteFooter() {
  return (
    <footer
      className="bg-[color:var(--background-secondary)] border-t border-foreground/[0.06] pt-12 md:pt-16 pb-8"
      data-od-id="site-footer"
    >
      <Container>
        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 md:mb-12">
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col}>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-4">{col}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accepted Payment Methods */}
        <div className="py-8 border-t border-foreground/[0.06]">
          <p className="text-sm text-foreground mb-4 font-semibold">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
            <span>Stripe</span>
            <span>PayPal</span>
            <span>Visa / Mastercard</span>
            <span>Crypto (USDT)</span>
          </div>
        </div>

        {/* Bottom Section — Company Info, Support, Quick Links */}
        <div className="pt-8 border-t border-foreground/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div className="text-sm">
              <p className="text-foreground font-semibold mb-2">CK CAPITAL GROUP LTD</p>
              <p className="text-foreground/50">All Rights Reserved</p>
              <p className="text-foreground/50 mt-2">Mon-Fri: 8am-8pm (GMT)</p>
              <p className="text-foreground/50">6-7 Waterside Station Road, Harpenden, AL5 4US</p>
            </div>

            <div className="text-sm">
              <p className="text-foreground font-semibold mb-2">Support</p>
              <p className="text-foreground/50">24/7 Support Available</p>
            </div>

            <div className="text-sm">
              <p className="text-foreground font-semibold mb-2">Quick Links</p>
              <div className="space-y-1">
                <Link href="/" className="block text-foreground/50 hover:text-foreground transition-colors">Home</Link>
                <Link href="/about-us" className="block text-foreground/50 hover:text-foreground transition-colors">About Us</Link>
                <Link href="/blog" className="block text-foreground/50 hover:text-foreground transition-colors">Blog</Link>
              </div>
            </div>
          </div>

          {/* Important Information & Disclaimer */}
          <div className="bg-foreground/[0.03] rounded-lg p-5 mt-8 text-xs leading-relaxed text-foreground/60">
            <p className="font-bold text-foreground text-sm mb-3">Important Information &amp; Disclaimer</p>

            <p className="font-bold text-foreground/80 mt-3">Simulated Trading Environment</p>
            <p className="mt-1">All accounts and evaluation programs provided by CK Capital operate exclusively within a simulated trading environment. No trades are executed on live financial markets, and no real capital is allocated to participants. Our services are intended solely for educational, skill assessment, and trader evaluation purposes.</p>

            <p className="font-bold text-foreground/80 mt-3">No Investment Services</p>
            <p className="mt-1">The simulated trading services are provided by CK Capital. All content published or distributed by CK Capital and its affiliated entities is provided for general informational and educational purposes only.</p>

            <p className="font-bold text-foreground/80 mt-3">The Company:</p>
            <ol className="ml-4 mt-1 space-y-1 list-decimal">
              <li>Does not provide investment, financial, legal, or tax advice.</li>
              <li>Does not recommend or solicit the purchase or sale of any financial instrument, security, or investment product.</li>
              <li>Does not act as a broker, dealer, custodian, or financial intermediary.</li>
              <li>Does not offer live trading accounts or investment management services through this website.</li>
            </ol>

            <p className="mt-3">Participation in any CK Capital program is voluntary. Program fees are service fees for access to evaluation programs, technology, educational resources, and related services. Such fees are not deposits, do not constitute investments, and should not be interpreted as client funds.</p>

            <p className="mt-3">Program fees are generally non-refundable except where required by applicable law. These fees do not earn interest, returns, dividends, or profit-sharing rights and do not establish any investment relationship between participants and the Company.</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-foreground/[0.06] mt-8 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/images/ck-logo.jpg" alt="CK Capital" className="h-6 w-6 rounded object-cover" />
            <span className="text-sm font-bold tracking-tight text-foreground">CK Capital</span>
          </div>
          <p className="text-xs text-foreground/25">
            &copy; {new Date().getFullYear()} CK Capital. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
