export default function TradingRules() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trading Rules & Guidelines
          </h2>
          <p className="text-lg text-gray-600">
            Our transparent guidelines ensure sustainable and disciplined trading
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">For Challenge Accounts</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Profit Targets</p>
                  <p className="text-gray-600">Step 1: $500 | Step 2: $250</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Daily Loss Limit</p>
                  <p className="text-gray-600">Maximum 5% of account per day</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Maximum Loss</p>
                  <p className="text-gray-600">Maximum 10% total drawdown</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Trading Hours</p>
                  <p className="text-gray-600">Monday - Friday (subject to market hours)</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-lg border border-cyan-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">For CK Traders (Funded)</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Profit Share</p>
                  <p className="text-gray-600">Up to 100% of profits earned</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Risk Management</p>
                  <p className="text-gray-600">Daily loss limits apply; no overall drawdown limit</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Account Scaling</p>
                  <p className="text-gray-600">Scale up to $1.2M with consistent performance</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 font-bold">•</span>
                <div>
                  <p className="font-semibold text-gray-900">Reset & Top-Up</p>
                  <p className="text-gray-600">Available regardless of rule violations</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="font-bold text-gray-900 mb-3">⚠️ Important Disclaimer</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            All accounts during the challenge phase utilize simulated trading environments. Trading with real capital involves substantial risk of loss. Not suitable for all traders. Past performance is not indicative of future results. CK Capital is a proprietary trading firm providing trading capital to qualified traders only. By using our services, you acknowledge these risks and agree to our full terms and conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
