export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            Why Traders Choose CK Capital
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Simulated evaluation programs designed to assess trading discipline, consistency, and risk management skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-primary">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1">Transparent Evaluation Rules</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Clear objectives, risk parameters, and account conditions with no hidden requirements</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-primary">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1">Simulated Trading Environment</h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Practice and demonstrate trading performance in real-time simulated market conditions</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-primary">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Scalable Evaluation Path</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Eligible traders may scale simulated accounts up to $1.2M based on consistent performance</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-yellow-400">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Flexible Trading Conditions</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">News trading, multiple strategies, and flexible payout schedules supported under program rules</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-yellow-400">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Advanced Trading Platforms</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Access institutional-style trading infrastructure through MT5 and TradeLocker</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-yellow-400">
                  <svg className="h-5 sm:h-6 w-5 sm:w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Global Trading Community</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Join thousands of traders participating in simulated evaluations worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
