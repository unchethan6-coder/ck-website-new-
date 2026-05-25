export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Built For Disciplined Traders
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            CK Capital provides funded accounts to professional and aspiring traders who demonstrate discipline and consistency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Up to 100% Profit Split</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Keep more of your profits with our competitive profit sharing model</p>
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Flexible Payouts</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Withdraw your profits on your schedule, whenever you need</p>
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">News Trading Allowed</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Capitalize on major market-moving news events without restrictions</p>
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Competitive Spreads</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Trade with spreads as low as 0.0 pips on major currency pairs</p>
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">Reset & Top-Up</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Get back on track with reset or top-up options available</p>
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Expert support team available Mon-Fri to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
