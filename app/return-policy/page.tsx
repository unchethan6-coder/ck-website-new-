import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Return & Dispute Policy | CK Capital',
  description: 'CK Capital Return and Dispute Policy - Information about refunds and chargebacks.',
};

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Return Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#333333] space-y-6">
          <p className="text-lg font-semibold">Welcome to CK Capital Group LTD (the "Company").</p>
          
          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Payment and Access</h2>
            <p>After a cleared payment on the purchase of one of our programs occurs, you will receive an email with the login details to access your trading platform. Once this information is emailed to you, no refund will be given.</p>
            <p>In some special circumstances, we will provide a refund if there were no trades placed on the account. For assistance, please contact our email <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Payment Options</h2>
            <p>We accept the following payment methods:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Stripe</li>
              <li>PayPal</li>
              <li>Cryptocurrency</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Dispute Policy</h2>
            <p className="text-lg font-semibold text-red-600">Clients who improperly dispute charges or request chargebacks with their bank will be permanently banned from the Platform.</p>
            <p>Please contact our email support at <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a> if you have any questions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Acceptance of This Policy</h2>
            <p>It is your responsibility to familiarize yourself with this refund policy. By placing an order for any of our products, you indicate that you have read this refund policy and that you agree with and fully accept the terms of this refund policy.</p>
            <p>If you do not agree with or fully accept the terms of this refund policy, we ask that you do not place an order with us. Please contact us at <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a> should you have any questions regarding our refund policy.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
