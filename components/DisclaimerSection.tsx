'use client';

export default function DisclaimerSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b-2 border-[#E8EAEF] pb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-2">
              Important Information & Disclaimer
            </h2>
            <p className="text-[#4B5563] text-lg">
              Please read carefully before using CK Capital services
            </p>
          </div>

          {/* Simulated Trading Environment */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">Simulated Trading Environment</h3>
            <p className="text-[#4B5563] leading-relaxed">
              All accounts provided by{' '}
              <a href="https://ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#0A5FFF] hover:underline font-semibold">
                CK Capital
              </a>{' '}
              are demo accounts operating exclusively within a simulated trading environment. No real trades are executed on live financial markets. The services offered by CK Capital are intended solely for educational, evaluation, and skill-assessment purposes.
            </p>
          </div>

          {/* No Investment Services */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">No Investment Services</h3>
            <p className="text-[#4B5563] leading-relaxed">
              The simulated trading services are provided by{' '}
              <a href="https://ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#0A5FFF] hover:underline font-semibold">
                CK Capital
              </a>{' '}
              and its related entities. All content published or distributed by the Company is provided for general informational purposes only.
            </p>
            <p className="text-[#4B5563] font-semibold mb-3">The Company does not:</p>
            <ul className="space-y-2 ml-6">
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Provide investment advice or financial recommendations</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Solicit the purchase or sale of any financial instruments</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Act as a broker, custodian, exchange, or financial intermediary</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Offer live trading accounts or investment products</span>
              </li>
            </ul>
          </div>

          {/* Service Fees */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">Service Fees</h3>
            <p className="text-[#4B5563] leading-relaxed">
              Participation in any evaluation or simulated funding program is entirely voluntary. All fees paid to the Company are service fees only. These fees:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Are not deposits or client funds</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Do not represent investments of any kind</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Do not generate interest, returns, or profit-sharing</span>
              </li>
              <li className="text-[#4B5563] flex items-start">
                <span className="text-[#0A1628] font-bold mr-3">•</span>
                <span>Are non-refundable except where required by applicable law</span>
              </li>
            </ul>
            <p className="text-[#4B5563] leading-relaxed mt-3">
              Program fees are used to support the Company&apos;s operational and administrative expenses, including platform infrastructure, software licensing, staffing, support services, technology systems, and risk-management operations.
            </p>
            <p className="text-[#4B5563] leading-relaxed">
              Payment of program fees grants access solely to simulated trading evaluations and related services in a demo environment. No fiduciary, custodial, or investment relationship is created between participants and the Company.
            </p>
          </div>

          {/* Financial Instruments */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">Financial Instruments</h3>
            <p className="text-[#4B5563] leading-relaxed">
              Nothing on this website, platform, or within any CK Capital program constitutes an offer to buy or sell forex, CFDs, futures, options, stocks, cryptocurrencies, or any other financial instruments.
            </p>
            <p className="text-[#4B5563] leading-relaxed">
              All trading results, payouts, statistics, and performance figures displayed are based on simulated trading performance. Simulated results do not guarantee future outcomes, and past performance is not indicative of future performance.
            </p>
          </div>

          {/* General Risk Warning */}
          <div className="space-y-3 bg-[#FFF5E6] border-l-4 border-[#F59E0B] p-4 rounded-lg">
            <h3 className="text-xl font-bold text-[#92400E]">⚠️ General Risk Warning</h3>
            <p className="text-[#92400E] leading-relaxed">
              Trading financial markets carries a high level of risk and may not be suitable for all individuals. Even in a simulated environment, leveraged trading strategies may not accurately reflect real-world market execution, slippage, liquidity conditions, or psychological pressures.
            </p>
            <p className="text-[#92400E] leading-relaxed">
              Participants should carefully assess their financial objectives, trading experience, and personal risk tolerance before participating in any simulated trading evaluation.
            </p>
          </div>

          {/* Corporate Information */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">Corporate Information</h3>
            <p className="text-[#4B5563] leading-relaxed">
              <a href="https://ckcapital.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#0A5FFF] hover:underline font-semibold">
                CK Capital
              </a>{' '}
              operates as a proprietary trading evaluation company providing simulated trading programs only. The Company does not provide brokerage services or live investment accounts through this website.
            </p>
          </div>

          {/* Restrictions */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#0A1628]">Restrictions</h3>
            <p className="text-[#4B5563] leading-relaxed">
              Services may not be available in certain jurisdictions or to individuals residing in restricted or sanctioned countries or regions, including jurisdictions subject to FATF, EU, UK, UN, or OFAC restrictions.
            </p>
            <p className="text-[#4B5563] leading-relaxed">
              Participants are responsible for ensuring compliance with their local laws and regulations before accessing the Company&apos;s services.
            </p>
          </div>

          {/* Bottom Note */}
          <div className="pt-6 border-t-2 border-[#E8EAEF]">
            <p className="text-sm text-[#8A94A6] text-center">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
