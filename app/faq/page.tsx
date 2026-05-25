export const metadata = {
  title: 'FAQ - CK Capital | Prop Trading Questions Answered',
  description: 'Frequently asked questions about CK Capital prop trading accounts, funded accounts, profit splits, trading rules, and how to get started with instant funding.',
  robots: { index: true, follow: true },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Get answers to common questions about CK Capital prop trading</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* What is CK Capital */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What is CK Capital?</h2>
            <p className="text-gray-700">
              CK Capital is a leading proprietary trading firm offering instant funded trading accounts to qualified traders worldwide. We provide challenge evaluations where traders can demonstrate their skills, then upgrade to verified CK Trader accounts with real trading capital up to $1.2M. Our traders enjoy up to 100% profit splits, flexible payouts, and access to 50+ trading instruments including Forex, Cryptocurrencies, Commodities, and Indices.
            </p>
          </div>

          {/* How do prop trading accounts work */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How do prop trading accounts work?</h2>
            <p className="text-gray-700 mb-3">
              Our funded trading accounts follow a simple three-step process:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Step 1 - Challenge:</strong> Pay a challenge fee ($13-$88) to begin evaluating your trading skills in our simulated environment.</li>
              <li><strong>Step 2 - Verification:</strong> Demonstrate consistency and meet profit targets in the second phase.</li>
              <li><strong>Step 3 - Funded Account:</strong> Pass verification and become a CK Trader with verified real capital to trade live markets.</li>
            </ol>
          </div>

          {/* Profit Splits */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What profit splits do you offer?</h2>
            <p className="text-gray-700">
              CK Capital offers up to 100% profit splits for verified traders on funded accounts. This means you keep 100% of your trading profits—no commissions, no hidden fees. Your only costs are the initial challenge fee during evaluation. This competitive profit-sharing model is among the best in the prop trading industry.
            </p>
          </div>

          {/* Starting costs */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How much does it cost to start?</h2>
            <p className="text-gray-700">
              Challenge fees range from $13 to $88 depending on your selected account size and challenge type. This is a one-time fee to begin your evaluation in our simulated trading environment. Once you become a CK Trader with a funded account, there are no additional fees—you simply keep your profits (up to 100%).
            </p>
          </div>

          {/* Account Sizes */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What account sizes are available?</h2>
            <p className="text-gray-700 mb-3">
              We offer flexible account sizes to match your trading style:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>$2,500 funded account with lower risk parameters</li>
              <li>$5,000 standard funded account</li>
              <li>$10,000 professional account</li>
              <li>$25,000 advanced account</li>
              <li>$50,000 premium account</li>
              <li>$100,000+ institutional accounts</li>
              <li>Scale up to $1.2M with consistent performance</li>
            </ul>
          </div>

          {/* Platforms supported */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What platforms do you support?</h2>
            <p className="text-gray-700">
              CK Capital supports both industry-leading trading platforms: MetaTrader 5 (MT5) and TradeLocker. Both platforms offer advanced charting, technical analysis tools, and institutional-grade trading features. You can choose your preferred platform when starting your challenge.
            </p>
          </div>

          {/* Trading instruments */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What can I trade?</h2>
            <p className="text-gray-700 mb-3">
              CK Capital traders have access to 50+ trading instruments:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Forex pairs (major, minor, and exotic pairs)</li>
              <li>Cryptocurrencies (Bitcoin, Ethereum, Litecoin, and more)</li>
              <li>Commodities (gold, oil, natural gas)</li>
              <li>Indices (US 500, UK 100, Germany 40)</li>
              <li>CFDs on various equities</li>
            </ul>
          </div>

          {/* News trading */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Can I trade the news?</h2>
            <p className="text-gray-700">
              Yes! News trading is allowed on CK Capital funded accounts. We encourage traders to capitalize on market-moving news events with proper risk management. High-impact economic releases and central bank announcements present significant trading opportunities for skilled traders.
            </p>
          </div>

          {/* Withdrawals */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How do withdrawals work?</h2>
            <p className="text-gray-700">
              Withdrawals are flexible and straightforward. Once you're a verified CK Trader, you can withdraw your profits on your schedule with no withdrawal restrictions. There are no minimum holding periods or quarterly limits. The withdrawal process typically completes within 3-5 business days.
            </p>
          </div>

          {/* Daily loss limits */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What are the daily loss limits?</h2>
            <p className="text-gray-700">
              Daily loss limits vary by account size but typically range from 5% during challenge phase to 10% for CK Trader accounts. These limits protect your capital and enforce disciplined risk management. If you hit your daily loss limit, trading stops for that day automatically.
            </p>
          </div>

          {/* Evaluation time */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How long is the evaluation process?</h2>
            <p className="text-gray-700">
              The evaluation timeline depends on your trading activity. Most traders complete the 1-step challenge within 2-4 weeks, though faster traders can finish in days. The 2-step challenge typically takes 4-8 weeks. There's no maximum time limit—you trade at your own pace while maintaining your profit targets.
            </p>
          </div>

          {/* Support availability */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Is there customer support?</h2>
            <p className="text-gray-700">
              Yes! CK Capital provides 24/7 customer support Monday through Friday. Our support team is available via email, live chat, and Discord. We also have an active trading community where traders share insights, trading setups, and market analysis.
            </p>
          </div>

          {/* Minimum experience */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What trading experience do I need?</h2>
            <p className="text-gray-700">
              While beginners can apply, we recommend at least some trading experience or education. Most successful CK Traders have 1-3 years of active trading background. If you're new to trading, we recommend starting with educational resources and paper trading before evaluating for funded accounts.
            </p>
          </div>

          {/* Geographic restrictions */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Are there geographic restrictions?</h2>
            <p className="text-gray-700">
              CK Capital accepts traders from most countries worldwide. However, certain jurisdictions may have restrictions due to regulatory requirements. During account registration, you'll be informed of any restrictions applicable to your location.
            </p>
          </div>

          {/* Account types */}
          <div className="border border-gray-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What are the different challenge types?</h2>
            <p className="text-gray-700 mb-3">
              We offer multiple challenge types to suit different trading goals:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>1-Step Challenge:</strong> Fast-track evaluation with single profit target</li>
              <li><strong>2-Step Challenge:</strong> Two-phase verification for stricter performance testing</li>
              <li><strong>Instant Funding:</strong> Quick approval for qualified traders wanting rapid account access</li>
            </ul>
          </div>

          {/* Get started */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to start your prop trading journey?</h2>
            <p className="text-gray-700 mb-4">
              Getting started with CK Capital is simple. Choose your challenge type, select your account size, and begin evaluating your trading skills. Once you demonstrate consistency and meet profit targets, you'll be upgraded to a verified CK Trader account with real capital.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors">
              Start Your Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
