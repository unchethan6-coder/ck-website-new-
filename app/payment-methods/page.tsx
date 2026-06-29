import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CreditCard, DollarSign, Bitcoin } from 'lucide-react';

export default function PaymentMethods() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <h1 className="text-5xl font-bold text-[#1a1a1a] mb-6">Payment Methods</h1>
          <p className="text-lg text-[#666666] mb-12 max-w-2xl">
            We offer multiple secure payment options to make it convenient for you to get funded with CK Capital.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Stripe */}
            <div className="bg-[#F9F9F9] border border-[#E8E8E8] rounded-lg p-8 shadow-premium hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#E8C547] to-[#D4AF37] rounded-lg mb-6">
                <CreditCard className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Stripe</h3>
              <p className="text-[#666666] mb-6">
                Secure credit and debit card payments. Stripe supports cards from major issuers worldwide with advanced fraud protection.
              </p>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li>✓ Visa, Mastercard, American Express</li>
                <li>✓ Instant processing</li>
                <li>✓ Secure encryption</li>
                <li>✓ Global support</li>
              </ul>
            </div>

            {/* PayPal */}
            <div className="bg-[#F9F9F9] border border-[#E8E8E8] rounded-lg p-8 shadow-premium hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#E8C547] to-[#D4AF37] rounded-lg mb-6">
                <DollarSign className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">PayPal</h3>
              <p className="text-[#666666] mb-6">
                Fast and secure PayPal payments. Use your PayPal balance or linked payment methods without sharing financial details.
              </p>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li>✓ PayPal balance</li>
                <li>✓ Linked cards & bank accounts</li>
                <li>✓ Buyer protection</li>
                <li>✓ Trusted globally</li>
              </ul>
            </div>

            {/* Cryptocurrency */}
            <div className="bg-[#F9F9F9] border border-[#E8E8E8] rounded-lg p-8 shadow-premium hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#E8C547] to-[#D4AF37] rounded-lg mb-6">
                <Bitcoin className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Cryptocurrency</h3>
              <p className="text-[#666666] mb-6">
                Accept major cryptocurrencies for fast, borderless transactions. Instant settlement and transparent fees.
              </p>
              <ul className="space-y-2 text-sm text-[#666666]">
                <li>✓ Bitcoin (BTC)</li>
                <li>✓ Ethereum (ETH)</li>
                <li>✓ USDT, USDC</li>
                <li>✓ Fast settlement</li>
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-[#F5F5F5] rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">Why Multiple Payment Options?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Accessibility</h3>
                <p className="text-[#666666]">
                  We understand that traders around the world use different payment methods. Multiple options ensure everyone can fund their account.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Security</h3>
                <p className="text-[#666666]">
                  All payment methods use industry-leading security standards and encryption to protect your financial information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Speed</h3>
                <p className="text-[#666666]">
                  Whether you choose cards, digital wallets, or crypto, we ensure fast processing so you can start trading quickly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">Transparency</h3>
                <p className="text-[#666666]">
                  Clear fees and straightforward processes for all payment methods. No hidden charges or surprise fees.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8">Payment FAQs</h2>
            <div className="space-y-6">
              <div className="border-b border-[#E8E8E8] pb-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Is my payment information secure?</h3>
                <p className="text-[#666666]">
                  Yes. We use industry-standard SSL encryption and all payment processors (Stripe, PayPal, and crypto providers) use advanced security protocols to protect your data.
                </p>
              </div>
              <div className="border-b border-[#E8E8E8] pb-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">How long does payment processing take?</h3>
                <p className="text-[#666666]">
                  Credit/debit cards and PayPal typically process instantly. Cryptocurrency payments settle within 1-2 confirmations, usually within 15-30 minutes.
                </p>
              </div>
              <div className="border-b border-[#E8E8E8] pb-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Can I use multiple payment methods?</h3>
                <p className="text-[#666666]">
                  Yes, you can use different payment methods for different transactions. Choose the option that works best for you each time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">What are the payment limits?</h3>
                <p className="text-[#666666]">
                  Payment limits vary by method and your account status. Contact our support team at service@ckcapital.co.uk for specific limit information.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[#E8C547] to-[#D4AF37] rounded-lg p-8 md:p-12 mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">Need Help With Payment?</h2>
            <p className="text-[#1a1a1a] mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 Monday through Friday to assist with any payment-related questions or issues.
            </p>
            <a 
              href="mailto:service@ckcapital.co.uk" 
              className="inline-block bg-white text-[#E8C547] font-semibold px-8 py-3 rounded-lg hover:bg-[#F9F9F9] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
