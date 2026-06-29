export default function TradingRules() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Trading Rules & Risk Parameters
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Evaluation accounts operate in a simulated environment with clear risk management parameters
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 md:p-8 rounded-lg border border-blue-200">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">Evaluation Accounts</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Simulated Trading Only</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">All trading in demo/simulated environment</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Profit Targets Apply</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Clear objectives to achieve</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Daily Drawdown Limits</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Maximum 5% per day</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Maximum Loss</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Maximum 10% total drawdown</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Rule Violations</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">May result in account termination</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 sm:p-6 md:p-8 rounded-lg border border-cyan-200">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">CK Trader Accounts</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Simulated Payout Model</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Performance-based reward structure</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Profit Split</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Up to 100% of simulated profits</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Scaling Opportunities</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Scale up to $1.2M based on performance</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Ongoing Risk Management</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Continued compliance required</p>
                </div>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <span className="text-primary500 font-bold flex-shrink-0">•</span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base text-foreground">Simulated Environment</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Accounts remain within simulated trading</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-5 md:p-6 rounded">
          <h3 className="font-bold text-foreground mb-2 sm:mb-3 text-base sm:text-lg">Important Notice</h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            All evaluation accounts, challenge accounts, and trader accounts provided by CK Capital operate exclusively in a simulated trading environment. CK Capital does not accept deposits for investment purposes, does not execute trades on behalf of clients, and does not provide financial advice, brokerage services, portfolio management, or investment recommendations. Fees paid are solely for participation in educational and evaluation services. Past performance is not indicative of future results. Trading leveraged products involves substantial risk.
          </p>
        </div>
      </div>
    </section>
  );
}
