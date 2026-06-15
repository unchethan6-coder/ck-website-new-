import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Disclaimer | CK Capital – Simulated Trading Evaluation Platform',
  description: 'Important legal information and risk disclosures for CK Capital simulated trading evaluation programs.',
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-balance">
          Important Information & Legal Disclaimer
        </h1>
        
        <div className="space-y-8 text-gray-700">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulated Trading Environment</h2>
            <p className="leading-relaxed">
              All services provided by CK Capital are conducted exclusively within a simulated trading environment. No real-money investments, securities transactions, or live market executions occur through challenge or evaluation accounts unless explicitly stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational & Evaluation Services Only</h2>
            <p className="leading-relaxed">
              CK Capital provides educational tools, trader evaluations, and performance-assessment programs only. CK Capital is <strong>not</strong> a broker, financial institution, investment advisor, portfolio manager, or regulated financial services provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Investment Advice</h2>
            <p className="leading-relaxed">
              Nothing on this website, platform, social media channels, Discord communities, emails, or advertisements constitutes investment advice, financial advice, trading advice, or solicitation to buy or sell financial instruments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Disclaimer</h2>
            <p className="leading-relaxed">
              Past performance does not guarantee future results. Trading leveraged financial products involves significant risk and may not be suitable for all traders. Users are solely responsible for their trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hypothetical Performance Disclosure</h2>
            <p className="leading-relaxed">
              Any payout examples, trading statistics, testimonials, or performance metrics displayed on this website represent hypothetical or simulated performance and should not be interpreted as guarantees of future success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees & Payments</h2>
            <p className="leading-relaxed">
              All fees paid to CK Capital are payments for educational services, technology access, platform infrastructure, and participation in trader evaluation programs only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Restricted Jurisdictions</h2>
            <p className="leading-relaxed">
              CK Capital services may not be available in jurisdictions where proprietary trading evaluations or CFD-related activities are restricted by local laws or regulations. Users are responsible for ensuring compliance with their local legal requirements before purchasing any service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guaranteed Income</h2>
            <p className="leading-relaxed">
              CK Capital does not guarantee profits, earnings, payouts, or successful evaluation outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Warning</h2>
            <p className="leading-relaxed">
              Trading CFDs and leveraged products carries significant risk of loss. All accounts provided during evaluations are simulated accounts used for assessment purposes only. CK Capital does not provide investment services, brokerage services, or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trading and Investment Risks</h2>
            <p className="leading-relaxed">
              There is considerable exposure to risk in any over-the-counter transaction, including, but not limited to, leverage, creditworthiness, limited regulatory protection and market volatility that may substantially affect the price of the products you are trading.
            </p>
            <p className="leading-relaxed mt-3">
              Moreover, the leveraged nature of over-the-counter trading means that any market movement will have an equally proportional effect on your funds. This may work against you as well as for you.
            </p>
            <p className="leading-relaxed mt-3">
              There are risks associated with utilizing an Internet-based trading system including, but not limited to, the failure of hardware, software, and Internet connection. The Company is not responsible for communication failures or delays when trading via the Internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Before Deciding to Participate</h2>
            <p className="leading-relaxed">
              Before deciding to participate in financial markets, you should carefully consider your investment objectives, level of experience and risk appetite. Most importantly, do not invest money you cannot afford to lose.
            </p>
            <p className="leading-relaxed mt-3">
              You should be aware that the risk of trading and investing is high and substantial. It can work for you as well as against you. It may or may not lead to substantial losses.
            </p>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
            <p className="leading-relaxed">
              By accessing or using CK Capital services, users acknowledge and accept all associated risks and agree to the <a href="/terms" className="text-[#A87B0B] hover:underline font-medium">Terms & Conditions</a> and <a href="/privacy" className="text-[#A87B0B] hover:underline font-medium">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="leading-relaxed mb-4">
              For questions regarding this disclaimer or our services, please contact us:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 rounded border border-gray-200 space-y-2 text-sm sm:text-base">
              <p className="font-bold">CK CAPITAL GROUP LTD</p>
              <p>
                6-7 Waterside Station Road<br />
                Harpenden, AL5 4US<br />
                United Kingdom
              </p>
              <p>Email: support@ckcapital.co.uk</p>
              <p>Hours: Mon – Fri: 8am – 8pm (GMT)</p>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-xs sm:text-sm text-gray-600">
          <p>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="mt-2">CK Capital Group Ltd — All Rights Reserved</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
