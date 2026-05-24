import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | CK Capital',
  description: 'CK Capital Privacy Policy - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Privacy Policy & Disclaimer</h1>
        
        <div className="prose prose-lg max-w-none text-[#333333] space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Disclaimer - How Do We Use and Share Your Personal Information?</h2>
            <p>For additional details on our data collection and sharing procedures, please refer to our privacy notice. To get in touch with us, you can email us at <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a>, or find the contact information at the bottom of this document.</p>
            <p>If you choose to use an authorized agent to opt out, please note that we may reject the request if the authorized agent cannot provide proper proof of their authorization to act on your behalf.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Will Your Information Be Shared with Anyone Else?</h2>
            <p>We may share your personal information with our service providers in accordance with the terms outlined in our contracts with them. These service providers are for-profit entities that process information on our behalf while complying with the CCPA's rigorous privacy standards.</p>
            <p>We may use your personal information for internal business purposes, such as technological advancement and demonstration research, but this is not considered "selling" your personal information.</p>
            <p>In the past 12 months, the Company has not disclosed, sold, or shared any personal information with third parties for business or commercial purposes. We will not sell or share personal information about website visitors, users, or other consumers in the future.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Your Rights with Respect to Your Personal Data</h2>
            
            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Right to request deletion of the data — Request to delete</h3>
            <p>You have the right to request the deletion of your personal information. We will comply with your request, subject to certain exceptions under the law, such as (but not limited to) when another consumer is exercising their right to free speech, when we are obligated to comply with a legal requirement, or when processing is necessary to prevent illegal activities.</p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Right to be informed — Request to know</h3>
            <p>You have the right to know:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>If we collect and use your personal information</li>
              <li>The types of personal information we collect</li>
              <li>The reasons for collecting the personal information</li>
              <li>Whether we sell or share personal information with third parties</li>
              <li>The types of personal information that have been sold, shared, or disclosed for business purposes</li>
              <li>The third parties to whom the personal information was sold, shared, or disclosed for business purposes</li>
              <li>The purpose of collecting, selling, or sharing personal information</li>
              <li>The specific personal information we have collected about you</li>
            </ul>
            <p>By law, we are not obligated to supply or remove consumer information that has been de-identified in response to a consumer's request, or to re-identify individual data to confirm a consumer's request.</p>

            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights</h3>
            <p>We will not engage in discrimination if you exercise your privacy rights. You have the right to limit the use and disclosure of sensitive personal information, and we do not handle consumers' sensitive personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Verification Process</h2>
            <p>To confirm your identity when we receive your request, we may need to verify that you are the same person whose information we have on record. This verification process may require us to ask for additional information from you that matches what we already have.</p>
            <p>For instance, based on the type of request you submit, we may request specific information to verify, or reach out to you using a previously provided communication method, such as phone or email. Other methods of verification may also be employed depending on the situation.</p>
            <p>The personal information you provide in your request will only be utilized to verify your identity and authority to make the request. We will aim to minimize the need to request additional information from you for verification purposes.</p>
            <p>If our existing information is insufficient to verify your identity, we may ask for additional information to verify your identity, as well as for security and fraud prevention purposes. Once the verification process is completed, any additional information you provide will be promptly deleted.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Other Privacy Rights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You have the right to object to the processing of your personal information.</li>
              <li>You have the right to request correction of your personal data if it is inaccurate or outdated, or to request that processing be limited.</li>
              <li>You may appoint an authorized agent to make a request under the CCPA on your behalf, but we may reject the request if the authorized agent fails to provide proof of their authorization to act on your behalf.</li>
              <li>You may request that your personal information not be sold or shared with third parties in the future. We will respond to your opt-out request within 15 days from the date of receipt.</li>
            </ul>
            <p className="mt-4">To assert these rights, contact us via <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a>, or refer to the information at the bottom of this document. If you have a concern about our data handling, we'd like to hear from you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Do We Make Updates to This Notice?</h2>
            <p>This privacy notice may be revised periodically, with the updated version indicated by a new "Revised" date. It will become effective immediately upon release. We may notify you of significant changes by posting a prominent notice or sending you a notification. It's important to regularly review this privacy notice to stay informed of how we safeguard your information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">How Can You Contact Us About This Notice?</h2>
            <p>For questions or comments regarding this notice, you may reach us via email at <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">How Can You Review, Update, Or Delete the Data We Collect From You?</h2>
            <p>Depending on your country's laws, you may have the right to access, modify, or delete the personal information we have collected from you. To do so, please send your request via email at <a href="mailto:service@ckcapital.co.uk" className="text-[#E8C547] hover:underline">service@ckcapital.co.uk</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
