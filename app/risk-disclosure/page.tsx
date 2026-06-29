export const metadata = {
  title: 'Risk Disclosure - CK Capital | Trading Risks & Important Warnings',
  description: 'Important risk disclosure for prop trading. Understand the financial risks, leverage dangers, and market volatility warnings before trading with CK Capital funded accounts.',
  robots: { index: true, follow: true },
};

export default function RiskDisclosure() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto prose prose-sm md:prose-base">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Risk Disclosure Statement</h1>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="font-bold text-red-900">
            ⚠️ WARNING: Trading financial instruments involves substantial financial risk. You could lose more than your initial investment. Prop trading with leverage is extremely risky and not suitable for all investors.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Leverage Risk</h2>
          <p>
            Our funded trading accounts offer significant leverage (typically 1:100 or higher). While leverage can amplify profits, it equally amplifies losses:
          </p>
          <ul>
            <li>A 1% market move can result in a 100% loss of your capital</li>
            <li>Your entire account can be wiped out in seconds</li>
            <li>Liquidation of positions happens automatically when drawdown limits are hit</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Market Volatility Risk</h2>
          <p>
            Financial markets are inherently unpredictable:
          </p>
          <ul>
            <li>Forex pairs can move 1000+ pips in a single session</li>
            <li>Cryptocurrencies can swing 20-30% in minutes</li>
            <li>Black Swan events can cause massive gap moves</li>
            <li>Central bank announcements create extreme volatility</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. News Trading Risk</h2>
          <p>
            News trading carries exceptional risks:
          </p>
          <ul>
            <li>Economic releases can cause thousand-pip moves instantly</li>
            <li>Gaps often exceed stop-loss levels, creating slippage</li>
            <li>Liquidity dries up during major news events</li>
            <li>Your orders may execute at drastically different prices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Slippage & Execution Risk</h2>
          <p>
            During volatile market conditions:
          </p>
          <ul>
            <li>Stops may execute far away from intended levels</li>
            <li>Entry/exit prices may differ significantly from quotations</li>
            <li>Market orders may not fill for several seconds during gaps</li>
            <li>Connection issues could prevent closing losing positions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Liquidity Risk</h2>
          <p>
            Some trading instruments have lower liquidity:
          </p>
          <ul>
            <li>Exotic currency pairs may have wide spreads</li>
            <li>Altcoins can experience flash crashes</li>
            <li>Commodities have limited trading hours</li>
            <li>Your position size may exceed available liquidity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Technical Risk</h2>
          <p>
            Platform and infrastructure failures can occur:
          </p>
          <ul>
            <li>Server outages preventing position management</li>
            <li>Internet connection loss during critical moments</li>
            <li>Delayed data feeds affecting trading decisions</li>
            <li>System errors causing unexpected fills or rejections</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Counterparty Risk</h2>
          <p>
            Your funds depend on third parties:
          </p>
          <ul>
            <li>Liquidity providers could default</li>
            <li>Banks holding funds could fail</li>
            <li>Trading platforms could experience insolvency</li>
            <li>Regulatory changes could freeze your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Regulatory & Legal Risk</h2>
          <p>
            Prop trading operates in a complex regulatory environment:
          </p>
          <ul>
            <li>Regulatory changes could affect account terms</li>
            <li>Your account could be restricted or closed</li>
            <li>Tax obligations apply in your jurisdiction</li>
            <li>Regulatory authorities may investigate accounts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Psychological Risk</h2>
          <p>
            Trading psychology is often underestimated:
          </p>
          <ul>
            <li>Fear and greed lead to poor decision-making</li>
            <li>Revenge trading after losses wipes accounts</li>
            <li>Overconfidence after wins increases risk exposure</li>
            <li>Fatigue impairs judgment during extended trading</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Past Performance ≠ Future Results</h2>
          <p>
            <strong>IMPORTANT:</strong> Previous trading success, wins by other traders, or historical data does NOT guarantee future profits. Market conditions change constantly, and strategies that worked may fail.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. You Could Lose 100% of Your Capital</h2>
          <p>
            This is not an exaggeration. Your entire challenge fee or deposited capital can be completely wiped out through:
          </p>
          <ul>
            <li>A single large losing trade</li>
            <li>Multiple consecutive losses</li>
            <li>One major news event</li>
            <li>A platform outage during crucial moments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Only Risk What You Can Afford to Lose</h2>
          <p>
            Do not use borrowed money, savings, or funds needed for living expenses. Challenge fees and trading capital should be completely disposable income you can afford to lose entirely without affecting your financial wellbeing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">13. Seek Professional Advice</h2>
          <p>
            If you are uncertain about trading risks, financial decisions, or market conditions, consult with a qualified financial advisor before participating in prop trading.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">14. Trading Rules Must Be Followed</h2>
          <p>
            Our trading rules exist to protect you. Violating daily loss limits, max drawdown, or consistency rules can result in:
          </p>
          <ul>
            <li>Account termination</li>
            <li>Loss of remaining capital</li>
            <li>Ineligibility for future challenges</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">15. Acknowledgment</h2>
          <p>
            By using CK Capital's funded trading accounts, you acknowledge that:
          </p>
          <ul>
            <li>You understand all risks outlined in this disclosure</li>
            <li>You accept full responsibility for your trading decisions</li>
            <li>You have sufficient financial knowledge to trade</li>
            <li>You understand leverage and its dangers</li>
            <li>You accept potential complete loss of capital</li>
          </ul>
        </section>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-12">
          <p className="text-sm text-primary900">
            <strong>This Risk Disclosure is provided for informational purposes only and does not constitute financial advice. If you have questions about trading risks, please contact support before opening an account.</strong>
          </p>
        </div>

        <p className="text-sm text-muted-foreground mt-12">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
