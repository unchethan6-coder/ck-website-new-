import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Cookie Policy | CK Capital',
  description: 'CK Capital Cookie Policy - Information about cookies and tracking technologies.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none text-[#333333] space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Information Automatically Collected</h2>
            <p>During your visit, usage, or navigation of the Services, certain information is automatically collected by us. This information, while not revealing your specific identity (e.g. name or contact details), may include device and usage data such as IP address, browser and device specifications, operating system, language preferences, source URLs, device name, country, location, usage information of our Services, and other technical details.</p>
            <p>This information is mainly utilized for ensuring the security and functioning of our Services, as well as for internal analysis and reporting purposes. Similar to other businesses, we also gather information through the use of cookies and similar technologies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">Log and Usage Data</h3>
            <p>This refers to information related to service, diagnostics, usage, and performance, which our servers automatically gather when you access or utilize our Services. This data is stored in log files and may include details like your IP address, device information, browser type and settings, and information about your activities within the Services (such as timestamps of usage, pages/files viewed, searches performed, and other actions like feature usage), and device event information (such as system activity, error reports, and hardware configurations), depending on your interaction with us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">How Do We Process Your Information?</h2>
            <p>Your personal information is processed by us for several purposes, based on your interaction with our Services. These may include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Easing account creation and authentication and identifying fraudulent activity</li>
              <li>Seeking feedback and communicating with you regarding your usage of our Services</li>
              <li>Processing information when necessary to protect someone's vital interests, for instance, to prevent harm</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Do We Use Cookies and Other Tracking Technologies?</h2>
            <p>The use of cookies and other tracking technologies (e.g. web beacons, pixels) may allow access or storage of information. Our Cookie Notice provides detailed information on our usage of these technologies and offers options to decline certain cookies.</p>
            <p>We also utilize various tracking methods such as Google AdWords, Meta Advertising, and Google Analytics to gather and store data on user interactions with our websites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Web Browser Cookie Settings</h2>
            <p>Web browsers are typically configured to accept cookies by default. You can choose to remove or reject cookies, but this may impact certain features or services of our Services. To opt out of interest-based ads by advertisers on our Services, go to <a href="https://youradchoices.com/control" target="_blank" rel="noopener noreferrer" className="text-[#E8C547] hover:underline">https://youradchoices.com/control</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Controls For Do-Not-Track Features</h2>
            <p>Many web browsers, mobile OS and apps have a Do-Not-Track ("DNT") feature to signal your preference for not having your online browsing activities monitored and collected. However, as there is no agreed technology standard for DNT, we do not currently respond to DNT browser signals or any other mechanism that communicates your preference not to be tracked. If a future standard for online tracking is adopted, we will update this policy and inform you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Contact Us</h2>
            <p>For privacy-related questions or comments, email us at <a href="mailto:support@ckcapital.uk.co" className="text-[#E8C547] hover:underline">support@ckcapital.uk.co</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
