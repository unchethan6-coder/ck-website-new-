import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Disclaimer | CK Capital',
  description: 'CK Capital Disclaimer - Important risk and advertising compliance information.',
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none text-[#333333] space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">META & GOOGLE ADS COMPLIANCE NOTICE</h2>
            <p>CK Capital is a proprietary trading firm providing simulated trading environments and educational evaluation programmes. CK Capital does NOT provide financial advice, investment advice, or brokerage services. All accounts are simulated/demo environments using virtual funds — no real money is traded on behalf of clients.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">RISK WARNING</h2>
            <p>Trading financial instruments involves significant risk of loss. Past performance is not indicative of future results. All profits, certificates, and funded account values shown represent simulated trading results only and do not guarantee future profitability in live markets.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">SIMULATED PERFORMANCE DISCLOSURE</h2>
            <p>All values referenced on this website (including "Up to 1.2M", "100% Profit Split") relate to simulated/demo trading environments. Evaluation fees are non-refundable unless stated in our Return Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">EARNINGS DISCLAIMER</h2>
            <p>Income or profit figures are illustrative examples only. Individual results vary based on trading skill, market conditions, and adherence to evaluation rules. CK Capital makes no guarantee of earnings or profitability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">TRADING AND INVESTMENT RISKS</h2>
            <p>There is considerable exposure to risk in any over-the-counter transaction, including, but not limited to, leverage, creditworthiness, limited regulatory protection and market volatility that may substantially affect the price of the products you are trading.</p>
            <p>Moreover, the leveraged nature of over-the-counter trading means that any market movement will have an equally proportional effect on your funds. This may work against you as well as for you.</p>
            <p>There are risks associated with utilizing an Internet-based trading system including, but not limited to, the failure of hardware, software, and Internet connection. The Company is not responsible for communication failures or delays when trading via the Internet. The Company employs backup systems and contingency plans to minimize the possibility of system failure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">BEFORE DECIDING TO PARTICIPATE</h2>
            <p>Before deciding to participate in financial markets, you should carefully consider your investment objectives, level of experience and risk appetite. Most importantly, do not invest money you cannot afford to lose.</p>
            <p>You should be aware that the risk of trading and investing is high and substantial. It can work for you as well as against you. It may or may not lead to substantial losses.</p>
            <p>As such, you should carefully consider whether trading and investing is right for you depending on your investment objectives, level of experience, and risk appetite. If you are unsure, you should consult with a financial advisor and/or tax advisor.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">ACKNOWLEDGMENT</h2>
            <p>By accessing this website you acknowledge you have read this disclaimer. Review our full <a href="/terms-conditions" className="text-[#E8C547] hover:underline">Disclaimer</a>, <a href="/privacy-policy" className="text-[#E8C547] hover:underline">Privacy Policy</a>, <a href="/terms-conditions" className="text-[#E8C547] hover:underline">Terms & Conditions</a>, and Advertising Policy.</p>
            <p className="mt-4 font-semibold">CK Capital Group Ltd — Registered in England & Wales. Last updated: May 2026.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
