export const metadata = {
  title: 'Terms of Service - CK Capital | Prop Trading Agreement',
  description: 'Read the terms of service for CK Capital prop trading accounts. Understand our trading rules, compliance requirements, and user obligations.',
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto prose prose-sm md:prose-base">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using CK Capital's prop trading platform, funded trading accounts, and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
          <p>
            You must be at least 18 years old and have full legal capacity to enter into binding agreements. Our funded trading accounts are available to individuals who meet our evaluation criteria and trading verification standards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Trading Rules & Compliance</h2>
          <p>
            All prop traders must comply with our trading rules including:
          </p>
          <ul>
            <li>Daily loss limits and maximum drawdown requirements</li>
            <li>Profit targets for challenge phase completion</li>
            <li>Risk management standards and position sizing rules</li>
            <li>Trading restrictions on certain instruments or strategies</li>
            <li>Minimum trading days requirement before evaluation completion</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Risk Disclosure</h2>
          <p>
            <strong>IMPORTANT NOTICE:</strong> Trading foreign currencies, cryptocurrencies, commodities, and indices carries substantial risk of loss. Past performance is not indicative of future results. Prop trading involves significant financial risk. You acknowledge that:
          </p>
          <ul>
            <li>You could lose your entire investment/challenge fee</li>
            <li>Leverage amplifies both gains and losses</li>
            <li>Market volatility can result in rapid account depletion</li>
            <li>Technical failures could cause unexpected losses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Simulated Trading Environment</h2>
          <p>
            Challenge phase accounts operate in a simulated trading environment. While verification, real capital accounts function as actual funded trading accounts with real market exposure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Profit Splits & Payouts</h2>
          <p>
            Upon becoming a CK Trader with a verified funded trading account, you are eligible for up to 100% profit splits. Withdrawal requests are processed according to our payout schedule. No commissions or hidden fees apply.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Challenge Fee & Account Costs</h2>
          <p>
            Challenge fees ranging from $13 to $88 are non-refundable once the trading challenge begins. No additional fees apply for trading on our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Prohibited Activities</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use automated or algorithmic trading without approval</li>
            <li>Engage in market manipulation or spoofing</li>
            <li>Trade during high-impact news events (unless approved)</li>
            <li>Use multiple accounts to bypass trading rules</li>
            <li>Share account credentials with third parties</li>
            <li>Engage in money laundering or illegal activities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
          <p>
            CK Capital shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our funded trading accounts or services, including total loss of capital invested.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
          <p>
            CK Capital reserves the right to modify these Terms of Service at any time. Continued use of our platform constitutes acceptance of updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of England and Wales and subject to the jurisdiction of UK courts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact: legal@ckcapital.co.uk
          </p>
        </section>

        <p className="text-sm text-gray-600 mt-12">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
