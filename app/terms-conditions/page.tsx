import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | CK Capital',
  description: 'CK Capital Terms and Conditions - Please read carefully before using our services.',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none text-[#333333] space-y-6">
          <p className="text-lg font-semibold">Welcome to CK Capital Group LTD. The "Company" provides you ("You" or the "Trader") with a limited license to use the services (the "Services") offered by the Company subject to the terms and conditions contained herein (the "Agreement").</p>
          
          <p>This Agreement is a legally binding contract, and you have a duty to read this Agreement before accessing the Services offered by the Company. By using the Services, you are agreeing to the terms and conditions contained within this Agreement.</p>
          
          <p>The Company reserves the right to suspend, replace, modify, amend, or terminate this Agreement at any time and within its sole and absolute discretion. In the event The Company replaces, modifies, or amends this Agreement, your continued use of the Services after a change in the Effective Date of said changes will constitute your agreement to any replacement, modification, or amendment to this Agreement.</p>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Trader Representations</h2>
            <p>By using the Services, you represent that you are at least eighteen (18) years old and are of sound mind and that you have the capacity to agree to and uphold the terms and conditions contained within this Agreement.</p>
            <p>You represent that your use of the Services does not violate any law, regulation, ordinance, statute, or treaty that is applicable to individuals or business entities located in the jurisdiction in which you live. You further represent that you are not prohibited from entering into this Agreement by the terms of any pre-existing agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Limited License</h2>
            <p>The Company provides you with limited, non-exclusive, non-sublicensable, non-assignable, revocable, and royalty-free license to use the Services for its customary and intended purposes. You are expressly prohibited from scraping, framing, hacking, reverse engineering, crawling, or aggregating the Services, the Company Website, whether in whole or in part, without the prior written consent of the Company.</p>
            <p>You acknowledge and agree that your limited use of the Services does not entitle you to any license or intellectual property rights to any technology, intellectual property, copyrights, trademarks, or trade secrets of the Company or any third-party contractor thereof. You acknowledge and agree that your use of the Services is limited by the terms of this Agreement, and you expressly agree that you will not use the Services in any manner that is not expressly authorized under the terms of this Agreement. The Company reserves all of its rights not expressly granted through this Agreement.</p>
            <p>This license is revocable at any time, and any rights not expressly granted in this Agreement are reserved for the Company.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Prohibited Uses</h2>
            <p>You are expressly prohibited from using the Services to violate any law, statute, ordinance, regulation, or treaty, whether local, state, provincial, national, or international, or to violate the rights of a third-party, including, but not limited to intellectual property rights, privacy rights, rights of publicity, or other personal or proprietary rights.</p>
            <p>Additionally, you are expressly prohibited from scraping, crawling, framing, posting unauthorized links to, aggregating, hacking, performing denial of service (DOS) attacks on, reverse engineering, or circumventing technological protection measures of the Services or the Company website.</p>
            <p>You are also prohibited from using the Services or the Company website to transmit unsolicited commercial emails to third parties or Traders of the Company.</p>
            <p>You are also prohibited from using any trading strategy that is expressly prohibited by the Company or the Brokers it uses. Such prohibited trading shall include, but not be limited to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Exploiting errors or latency in the pricing and/or platform(s) provided by the Broker</li>
              <li>Utilizing non-public and/or insider information</li>
              <li>Front-running of trades placed elsewhere</li>
              <li>Trading in any way that jeopardizes the relationship that the Company has with a broker</li>
              <li>Trading in any way that creates regulatory issues for the Broker</li>
              <li>Utilizing any third-party strategy, off-the-shelf strategy or one marketed to pass challenge accounts</li>
              <li>Attempting to arbitrage an assessment account with another account with the Company or any third-party company</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Education</h2>
            <p>Although The Company may provide data, information, and content relating to investment approaches and opportunities to make trades, such data, information and content is provided solely for general informational and educational purposes. The Company does not invite the Trader to take any action based upon any of the information and materials provided by the Company; you should not construe any such data, information, or content as investment, financial, tax, legal, or other kind of advice.</p>
            <p>The Company further does not make any representations that any data, information, and content on the Company website is accurate or complete. You alone will bear the sole responsibility of evaluating the merits and risks associated with using any such data, information, and content.</p>
            <p>While the Company does not provide you with the opportunity to invest actual currency, the Company wants to make sure you understand the risks involved with traditional investing. You should be aware that the risk of trading and investing is high and substantial.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Account Creation</h2>
            <p>In order to register as a Trader, you may be asked to provide personal information, including, but not limited to your name, email address, mailing address, phone number, date of birth and a username and password for an account that is unique to you. The information provided is subject to the Company's privacy policy.</p>
            <p>The account will be personal to You, and You cannot share it with anybody else. You also may not purchase an account on behalf of a third party or have an account purchased for you by a third party. You will be responsible for maintaining the confidentiality of your username and password.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Restricted Countries</h2>
            <p>Individuals residing or having only citizenship in the following countries are prohibited from registering as a Trader: Afghanistan, Belarus, Burundi, Central African Republic, Chad, Democratic Republic of the Congo, Crimea, Eritrea, Iran, Iraq, Cuba, North Korea, Libya, Myanmar, Somalia, Sudan, Russia, South Sudan, Syria, Yemen, and Venezuela.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Purchases and Refunds</h2>
            <p>The Company may provide products, services, subscriptions, or access to certain portions to the Company's website at a monetary cost. Prices and availability are subject to change without notice.</p>
            <p>There are no refunds on any Services purchased from the Company. If you, as a purchaser, are deemed "high risk" by our payment processors we may require you to provide additional documentation or information in order to proceed with the assessment.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Disclaimer of Warranties and Limitation of Liability</h2>
            <p className="font-semibold">YOU ACKNOWLEDGE AND AGREE THAT THE SERVICE AND COMPANY WEBSITE ARE PROVIDED ON AN "AS-IS" BASIS AND WITHOUT WARRANTY OF ANY KIND. THE COMPANY'S LIABILITY IS LIMITED TO THE AMOUNT THAT YOU PAID TO USE THE SERVICES OR $1,000, WHICHEVER IS LESS.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mt-8 mb-4">Term and Termination</h2>
            <p>The term of this Agreement will begin when you purchase a Service offered via the Company and will continue until either the Company terminates your access to the Services or you stop using the Services. The Company reserves the right to terminate the Services or your access to the Company website in its sole and absolute discretion and without prior notice.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
