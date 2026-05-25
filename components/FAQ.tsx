'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is CK Capital?',
      answer: 'CK Capital is a proprietary trading firm that provides qualified traders with funded accounts. We offer a path to becoming a CK Trader through our challenge evaluation process, where you can demonstrate your trading skills and consistency.',
      category: 'General',
    },
    {
      question: 'How do I get started?',
      answer: 'Choose your preferred challenge type (1-Step, 2-Step, or Instant Funding), select your account size, and complete the evaluation process. Once you pass, you\'ll be upgraded to a CK Trader account with real trading capital.',
      category: 'Getting Started',
    },
    {
      question: 'What platforms do you support?',
      answer: 'We support both TradeLocker and MT5 platforms. You can choose your preferred platform when setting up your account.',
      category: 'Platform',
    },
    {
      question: 'What instruments can I trade?',
      answer: 'As a CK Trader, you have access to 50+ trading instruments including Forex, Cryptocurrencies, Commodities, Indices, and more.',
      category: 'Trading',
    },
    {
      question: 'Can I trade the news?',
      answer: 'Yes! News trading is allowed on CK Capital accounts. We encourage traders to capitalize on market-moving events with proper risk management.',
      category: 'Trading',
    },
    {
      question: 'What are the profit splits?',
      answer: 'Once you become a CK Trader, you keep up to 100% of your profits. There are no commissions or hidden fees - what you earn is yours.',
      category: 'Earnings',
    },
    {
      question: 'How often can I withdraw?',
      answer: 'Withdrawals are flexible. You can withdraw your profits on your schedule - there are no restrictions on withdrawal frequency.',
      category: 'Earnings',
    },
    {
      question: 'What if I breach the trading rules?',
      answer: 'If you hit your loss limits during the challenge, you can use our reset or top-up options to get back on track. As a CK Trader, you\'ll have daily loss limits to manage, but there\'s no drawdown cap.',
      category: 'Rules',
    },
    {
      question: 'How long does the evaluation take?',
      answer: 'The evaluation duration depends on your trading activity and the challenge type you choose. The 1-Step challenge typically moves faster than the 2-Step verification process.',
      category: 'Getting Started',
    },
    {
      question: 'Is there customer support?',
      answer: 'Yes! We offer 24/7 support Mon-Fri. Our team is available via email and our Discord community to answer questions and assist you.',
      category: 'Support',
    },
  ];

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <section className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <HelpCircle className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
              Got Questions?
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about CK Capital, getting funded, and growing your trading
          </p>
        </div>

        {/* Category-based Accordion */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 mb-10 sm:mb-14 md:mb-16">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter(faq => faq.category === category);
            return (
              <div key={category} className="space-y-2 sm:space-y-3">
                {/* Category Header */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 px-3 sm:px-4 py-2 uppercase tracking-widest text-yellow-700 text-sm">
                  {category}
                </h3>
                
                {/* FAQs for this category */}
                <div className="space-y-2 sm:space-y-3">
                  {categoryFaqs.map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    return (
                      <div 
                        key={globalIndex} 
                        className="bg-white border-2 border-gray-200 hover:border-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md group"
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                          className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-left flex items-center justify-between hover:bg-yellow-50 transition-colors duration-200 active:bg-yellow-100"
                        >
                          <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 pr-3 sm:pr-4 leading-snug text-pretty">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 sm:w-5 h-4 sm:h-5 text-yellow-500 transition-transform duration-300 flex-shrink-0 group-hover:text-yellow-600 ${
                              openIndex === globalIndex ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Animated Answer Section */}
                        {openIndex === globalIndex && (
                          <div 
                            className="animate-bounce-in px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-t-2 border-yellow-200 space-y-3"
                          >
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                              {faq.answer}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-yellow-700 font-semibold pt-1 sm:pt-2">
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                              <span>Question answered</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-2 border-yellow-200 rounded-xl p-6 sm:p-8 md:p-10 text-center hover:shadow-lg transition-shadow duration-300">
          <HelpCircle className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-500 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Still need help?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-5 sm:mb-6 leading-relaxed">
            Our support team is standing by to answer any questions you have. Reach out anytime Mon-Fri, 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base hover:shadow-md active:scale-95">
              Contact Support
            </button>
            <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900/5 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base">
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
