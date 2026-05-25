'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is CK Capital?',
      answer: 'CK Capital is a proprietary trading firm that provides qualified traders with funded accounts. We offer a path to becoming a CK Trader through our challenge evaluation process, where you can demonstrate your trading skills and consistency.',
    },
    {
      question: 'How do I get started?',
      answer: 'Choose your preferred challenge type (1-Step, 2-Step, or Instant Funding), select your account size, and complete the evaluation process. Once you pass, you\'ll be upgraded to a CK Trader account with real trading capital.',
    },
    {
      question: 'What platforms do you support?',
      answer: 'We support both TradeLocker and MT5 platforms. You can choose your preferred platform when setting up your account.',
    },
    {
      question: 'What instruments can I trade?',
      answer: 'As a CK Trader, you have access to 50+ trading instruments including Forex, Cryptocurrencies, Commodities, Indices, and more.',
    },
    {
      question: 'Can I trade the news?',
      answer: 'Yes! News trading is allowed on CK Capital accounts. We encourage traders to capitalize on market-moving events with proper risk management.',
    },
    {
      question: 'What are the profit splits?',
      answer: 'Once you become a CK Trader, you keep up to 100% of your profits. There are no commissions or hidden fees - what you earn is yours.',
    },
    {
      question: 'How often can I withdraw?',
      answer: 'Withdrawals are flexible. You can withdraw your profits on your schedule - there are no restrictions on withdrawal frequency.',
    },
    {
      question: 'What if I breach the trading rules?',
      answer: 'If you hit your loss limits during the challenge, you can use our reset or top-up options to get back on track. As a CK Trader, you\'ll have daily loss limits to manage, but there\'s no drawdown cap.',
    },
    {
      question: 'How long does the evaluation take?',
      answer: 'The evaluation duration depends on your trading activity and the challenge type you choose. The 1-Step challenge typically moves faster than the 2-Step verification process.',
    },
    {
      question: 'Is there customer support?',
      answer: 'Yes! We offer 24/7 support Mon-Fri. Our team is available via email and our Discord community to answer questions and assist you.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Find answers to common questions about CK Capital
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 text-balance pr-2">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 md:p-8 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Still have questions?</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6">
            Can&apos;t find what you&apos;re looking for? Contact our support team for more information.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 sm:px-8 rounded-lg transition-colors duration-150 text-sm sm:text-base">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
