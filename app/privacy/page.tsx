export const metadata = {
  title: 'Privacy Policy - CK Capital | Data Protection & GDPR Compliance',
  description: 'Read CK Capital\'s privacy policy. Learn how we protect your personal data, use cookies, and comply with GDPR regulations for prop trading accounts.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:py-20">
      <div className="max-w-4xl mx-auto prose prose-sm md:prose-base">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            CK Capital Group Ltd ("we," "us," or "our") operates the CK Capital funded trading platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our website, prop trading accounts, and related services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">Personal Information:</h3>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Date of birth, nationality, residency</li>
            <li>Trading experience and financial background</li>
            <li>Bank account details for withdrawals</li>
            <li>Identity verification documents (passport/ID)</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-3 mt-4">Trading Data:</h3>
          <ul>
            <li>Trading history and account performance</li>
            <li>Orders, positions, and transaction records</li>
            <li>Profit/loss calculations</li>
            <li>Platform activity and login history</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">Technical Information:</h3>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and operating system</li>
            <li>Pages visited and time spent</li>
            <li>Cookies and tracking pixels</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <ul>
            <li>Verify your identity and comply with KYC/AML regulations</li>
            <li>Process challenge fees and manage funded trading accounts</li>
            <li>Calculate and process profit payouts</li>
            <li>Improve our platform and services</li>
            <li>Send account updates, announcements, and marketing communications</li>
            <li>Detect fraud and prevent abuse</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing & Third Parties</h2>
          <p>
            We may share your personal data with:
          </p>
          <ul>
            <li>Trading platforms (TradeLocker, MT5)</li>
            <li>Payment processors and banks</li>
            <li>Identity verification services</li>
            <li>Legal and compliance advisors</li>
            <li>Regulatory authorities when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. GDPR Rights (EU/UK Users)</h2>
          <p>
            If you're in the EU or UK, you have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion (right to be forgotten)</li>
            <li>Restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with your data protection authority</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Cookies & Tracking</h2>
          <p>
            We use cookies, web beacons, and similar technologies to:
          </p>
          <ul>
            <li>Remember your login preferences</li>
            <li>Track website analytics (Google Analytics)</li>
            <li>Serve targeted advertising (Google Ads, Meta Pixel)</li>
            <li>Improve user experience</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, though some features may not function properly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
          <p>
            We implement industry-standard security measures including:
          </p>
          <ul>
            <li>256-bit SSL encryption for all data transmission</li>
            <li>Secure password hashing and authentication</li>
            <li>Regular security audits and penetration testing</li>
            <li>Restricted access to sensitive data</li>
            <li>Secure data centers with multiple backups</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
          <p>
            We retain your personal data for as long as necessary to provide our services and comply with legal obligations. After account closure, we typically retain data for 7 years for regulatory compliance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Marketing Communications</h2>
          <p>
            We send promotional emails about new features, trading opportunities, and market updates. You can unsubscribe at any time by clicking the "Unsubscribe" link in emails.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before sharing personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of our platform constitutes acceptance of updated policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
          <p>
            For privacy concerns or data requests, contact: privacy@ckcapital.co.uk
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-12">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
