'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ProductsComparison() {
  const [activeTab, setActiveTab] = useState('standard');

  const challengeData = {
    standard: {
      name: 'Standard',
      description: 'Classic 2-step evaluation',
      accounts: [
        {
          size: '$2.5K',
          price: '$9',
          originalPrice: '$68',
          popular: false,
          features: {
            'Phase 1 Target': '$250',
            'Phase 2 Target': '$125',
            'Max Daily Loss': '$80',
            'Max Loss': '$200',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$5K',
          price: '$13',
          originalPrice: '$88',
          popular: false,
          features: {
            'Phase 1 Target': '$500',
            'Phase 2 Target': '$250',
            'Max Daily Loss': '$200',
            'Max Loss': '$400',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$10K',
          price: '$19',
          originalPrice: '$128',
          popular: true,
          features: {
            'Phase 1 Target': '$1,000',
            'Phase 2 Target': '$500',
            'Max Daily Loss': '$400',
            'Max Loss': '$800',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$25K',
          price: '$68.40',
          originalPrice: '$228',
          popular: false,
          features: {
            'Phase 1 Target': '$2,500',
            'Phase 2 Target': '$1,250',
            'Max Daily Loss': '$1,000',
            'Max Loss': '$2,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$50K',
          price: '$98.40',
          originalPrice: '$328',
          popular: false,
          features: {
            'Phase 1 Target': '$5,000',
            'Phase 2 Target': '$2,500',
            'Max Daily Loss': '$2,000',
            'Max Loss': '$4,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$100K',
          price: '$176.40',
          originalPrice: '$588',
          popular: false,
          features: {
            'Phase 1 Target': '$10,000',
            'Phase 2 Target': '$5,000',
            'Max Daily Loss': '$4,000',
            'Max Loss': '$8,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
      ],
    },
    middleweight: {
      name: 'Middleweight',
      description: 'Balanced 2-step evaluation with consistency rule',
      accounts: [
        {
          size: '$2.5K',
          price: '$9',
          popular: false,
          features: {
            'Phase 1 Target': '$200',
            'Phase 2 Target': '$125',
            'Max Daily Loss': '$80',
            'Max Loss': '$300',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '30%',
          },
        },
        {
          size: '$5K',
          price: '$13',
          popular: false,
          features: {
            'Phase 1 Target': '$400',
            'Phase 2 Target': '$250',
            'Max Daily Loss': '$200',
            'Max Loss': '$600',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '30%',
          },
        },
        {
          size: '$10K',
          price: '$19',
          popular: true,
          features: {
            'Phase 1 Target': '$800',
            'Phase 2 Target': '$500',
            'Max Daily Loss': '$400',
            'Max Loss': '$1,200',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '30%',
          },
        },
      ],
    },
    lightweight: {
      name: 'Lightweight',
      description: 'Equal phases with 50% consistency rule',
      accounts: [
        {
          size: '$2.5K',
          price: '$9',
          originalPrice: '$68',
          popular: false,
          features: {
            'Phase 1 Target': '$250',
            'Phase 2 Target': '$250',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$80',
            'Max Loss': '$200',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$5K',
          price: '$13',
          originalPrice: '$88',
          popular: false,
          features: {
            'Phase 1 Target': '$500',
            'Phase 2 Target': '$500',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$200',
            'Max Loss': '$400',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$10K',
          price: '$19',
          originalPrice: '$128',
          popular: true,
          features: {
            'Phase 1 Target': '$1,000',
            'Phase 2 Target': '$1,000',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$400',
            'Max Loss': '$800',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$25K',
          price: '$68.40',
          originalPrice: '$228',
          popular: false,
          features: {
            'Phase 1 Target': '$2,500',
            'Phase 2 Target': '$2,500',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$1,000',
            'Max Loss': '$2,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$50K',
          price: '$98.40',
          originalPrice: '$328',
          popular: false,
          features: {
            'Phase 1 Target': '$5,000',
            'Phase 2 Target': '$5,000',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$2,000',
            'Max Loss': '$4,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$100K',
          price: '$158.40',
          originalPrice: '$528',
          popular: false,
          features: {
            'Phase 1 Target': '$10,000',
            'Phase 2 Target': '$10,000',
            'Consistency Rule': '50%',
            'Max Daily Loss': '$4,000',
            'Max Loss': '$8,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$5K',
          price: '$13',
          popular: true,
          features: {
            'Phase 1 Target': '$300',
            'Phase 2 Target': '$300',
            'Max Daily Loss': '$200',
            'Max Loss': '$400',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '50%',
          },
        },
        {
          size: '$10K',
          price: '$19',
          popular: false,
          features: {
            'Phase 1 Target': '$600',
            'Phase 2 Target': '$600',
            'Max Daily Loss': '$400',
            'Max Loss': '$800',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '50%',
          },
        },
      ],
    },
    oneStep: {
      name: '1-Step Standard',
      description: 'Single-phase evaluation',
      accounts: [
        {
          size: '$2.5K',
          price: '$9',
          originalPrice: '$68',
          popular: false,
          features: {
            'Phase 1 Target': '$250',
            'Phase 2 Target': '$125',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$80',
            'Max Loss': '$200',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$5K',
          price: '$13',
          originalPrice: '$88',
          popular: false,
          features: {
            'Phase 1 Target': '$500',
            'Phase 2 Target': '$250',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$200',
            'Max Loss': '$400',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$10K',
          price: '$19',
          originalPrice: '$128',
          popular: true,
          features: {
            'Phase 1 Target': '$1,000',
            'Phase 2 Target': '$500',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$400',
            'Max Loss': '$800',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$25K',
          price: '$68.40',
          originalPrice: '$228',
          popular: false,
          features: {
            'Phase 1 Target': '$2,500',
            'Phase 2 Target': '$1,250',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$1,000',
            'Max Loss': '$2,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$50K',
          price: '$98.40',
          originalPrice: '$328',
          popular: false,
          features: {
            'Phase 1 Target': '$5,000',
            'Phase 2 Target': '$2,500',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$2,000',
            'Max Loss': '$4,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$100K',
          price: '$158.40',
          originalPrice: '$528',
          popular: false,
          features: {
            'Phase 1 Target': '$10,000',
            'Phase 2 Target': '$5,000',
            'Consistency Rule': '30%',
            'Max Daily Loss': '$4,000',
            'Max Loss': '$8,000',
            'Trading Period': 'Unlimited',
          },
        },
        {
          size: '$5K',
          price: '$13',
          popular: true,
          features: {
            'Phase 1 Target': '$500',
            'Phases': 'No Phase 2',
            'Max Daily Loss': '$200',
            'Max Loss': '$300',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$10K',
          price: '$19',
          popular: false,
          features: {
            'Phase 1 Target': '$1,000',
            'Phases': 'No Phase 2',
            'Max Daily Loss': '$400',
            'Max Loss': '$600',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
      ],
    },
    instant: {
      name: 'Instant Funding',
      description: 'Get funded immediately without phases',
      accounts: [
        {
          size: '$5K',
          price: '$20',
          originalPrice: '$180',
          popular: false,
          features: {
            'Account Size': '$5,000',
            'No Evaluation': 'Start Trading Immediately',
            'Max Daily Loss': '$250',
            'Max Loss': '$500',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Up to 80%',
          },
        },
        {
          size: '$10K',
          price: '$37',
          originalPrice: '$247',
          popular: false,
          features: {
            'Account Size': '$10,000',
            'No Evaluation': 'Start Trading Immediately',
            'Max Daily Loss': '$500',
            'Max Loss': '$1,000',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Up to 80%',
          },
        },
        {
          size: '$25K',
          price: '$129',
          originalPrice: '$430',
          popular: true,
          features: {
            'Account Size': '$25,000',
            'No Evaluation': 'Start Trading Immediately',
            'Max Daily Loss': '$1,250',
            'Max Loss': '$2,500',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Up to 80%',
          },
        },
        {
          size: '$50K',
          price: '$274.50',
          originalPrice: '$915',
          popular: false,
          features: {
            'Account Size': '$50,000',
            'No Evaluation': 'Start Trading Immediately',
            'Max Daily Loss': '$2,500',
            'Max Loss': '$5,000',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Up to 80%',
          },
        },
        {
          size: '$10K',
          price: '$37',
          popular: true,
          features: {
            'Account Type': 'Instant Funded',
            'Evaluation': 'No Phases',
            'Max Daily Loss': '$300',
            'Max Loss': '$500',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Bi-Weekly 50%',
            'Consistency Rule': '20%',
          },
        },
        {
          size: '$2.5K',
          price: '$9',
          originalPrice: '$68',
          popular: false,
          features: {
            'Profit Target': '$250',
            'Max Daily Loss': '$80',
            'Max Loss': '$200',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$5K',
          price: '$13',
          originalPrice: '$88',
          popular: false,
          features: {
            'Profit Target': '$500',
            'Max Daily Loss': '$200',
            'Max Loss': '$400',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$10K',
          price: '$19',
          originalPrice: '$128',
          popular: true,
          features: {
            'Profit Target': '$1,000',
            'Max Daily Loss': '$400',
            'Max Loss': '$800',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$25K',
          price: '$68.40',
          originalPrice: '$228',
          popular: false,
          features: {
            'Profit Target': '$2,500',
            'Max Daily Loss': '$1,000',
            'Max Loss': '$2,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$50K',
          price: '$98.40',
          originalPrice: '$328',
          popular: false,
          features: {
            'Profit Target': '$5,000',
            'Max Daily Loss': '$2,000',
            'Max Loss': '$4,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$100K',
          price: '$176.40',
          originalPrice: '$588',
          popular: false,
          features: {
            'Profit Target': '$10,000',
            'Max Daily Loss': '$4,000',
            'Max Loss': '$8,000',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
          },
        },
        {
          size: '$50K',
          price: '$274.50',
          popular: false,
          features: {
            'Account Type': 'Instant Funded',
            'Evaluation': 'No Phases',
            'Max Daily Loss': '$1,500',
            'Max Loss': '$2,500',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Bi-Weekly 50%',
            'Consistency Rule': '20%',
          },
        },
      ],
    },
  };

  const currentChallenge = challengeData[activeTab as keyof typeof challengeData];

  return (
    <section
      id="challenges"
      aria-labelledby="challenges-heading"
      className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="challenges-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1628] mb-3 sm:mb-4 text-balance"
          >
            Buckle Up, Your Journey Starts Here!
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            1-Step, 2-Step, or Zero. Multiple routes to match your trading style and budget.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Challenge types"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {[
            { key: 'standard', label: 'Standard' },
            { key: 'middleweight', label: 'Middleweight' },
            { key: 'lightweight', label: 'Lightweight' },
            { key: 'oneStep', label: '1 Step' },
            { key: 'instant', label: 'Instant Funding' },
          ].map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[#0A1628] text-foreground'
                  : 'bg-[#F0F2F7] text-[#4B5563] hover:bg-[#E8EAEF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Container - Grid on Desktop, Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 pb-4 sm:pb-0">
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 px-4 sm:px-0 min-w-min sm:min-w-full">
            {currentChallenge.accounts.map((account, index) => (
              <div
                key={index}
                className={`flex-shrink-0 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
                  account.popular
                    ? 'bg-[#0A1628] text-foreground shadow-xl ring-2 ring-[#F4D957]'
                    : 'bg-[#F8FAFC] text-[#0A1628] border border-[#E8EAEF] hover:shadow-lg hover:border-[#D8DADF]'
                }`}
              >
                {/* Popular Badge */}
                {account.popular && (
                  <div className="bg-[#F4D957] text-[#0A1628] py-1 px-3 sm:py-1.5 sm:px-4 text-center font-bold text-xs uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Card Content */}
                <div className="p-3 sm:p-4 lg:p-5 flex flex-col h-full">
                  {/* Account Size & Price */}
                  <div className="mb-3 sm:mb-4">
                    <div className="text-xs uppercase tracking-widest text-[#8A94A6] mb-0.5 sm:mb-1">Account Size</div>
                    <div className="mb-1.5 sm:mb-2">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold block">{account.size}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <span className="text-xs text-[#8A94A6] line-through">{account.originalPrice}</span>
                      <span className={`text-base sm:text-lg lg:text-xl font-bold ${account.popular ? 'text-[#F4D957]' : 'text-[#0A1628]'}`}>
                        {account.price}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className={`w-full mb-5 sm:mb-6 font-bold py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg transition-all flex-shrink-0 ${
                      account.popular
              ? 'bg-[#F4D957] text-[#0A1628] hover:bg-[#F0C738]'
                        : 'bg-[#0A1628] text-foreground hover:bg-[#051A41]'
                    }`}
                    asChild
                  >
                    <a
                      href="https://app.ckcapital.co.uk/buy-challenge"
                      aria-label={`Buy ${account.size} ${currentChallenge.name} challenge for ${account.price}`}
                    >
                      Buy Challenge
                    </a>
                  </Button>

                  {/* Features List - Horizontal Layout */}
                  <div className="space-y-2 sm:space-y-2.5 flex-grow">
                    {Object.entries(account.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs gap-2">
                        <span className={`font-semibold flex-shrink-0 ${account.popular ? 'text-[#B0BCC9]' : 'text-[#4B5563]'}`}>{key}</span>
                        <span className={`font-bold text-right flex-shrink-0 ${account.popular ? 'text-[#F4D957]' : 'text-[#0A1628]'}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll - Cards visible */}
          <div className="flex sm:hidden gap-3 px-4 min-w-min">
            {currentChallenge.accounts.map((account, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-72 rounded-lg overflow-hidden transition-all duration-300 flex flex-col ${
                  account.popular
                    ? 'bg-[#0A1628] text-foreground shadow-xl ring-2 ring-[#F4D957]'
                    : 'bg-[#F8FAFC] text-[#0A1628] border border-[#E8EAEF]'
                }`}
              >
                {/* Popular Badge */}
                {account.popular && (
                  <div className="bg-[#F4D957] text-[#0A1628] py-1 px-3 text-center font-bold text-xs uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Account Size & Price */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest text-[#8A94A6] mb-1">Account Size</div>
                    <div className="mb-2">
                      <span className="text-lg font-bold block">{account.size}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs text-[#8A94A6] line-through">{account.originalPrice}</span>
                      <span className={`text-base font-bold ${account.popular ? 'text-[#F4D957]' : 'text-[#0A1628]'}`}>
                        {account.price}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className={`w-full mb-5 font-bold py-2.5 text-xs rounded-lg transition-all flex-shrink-0 ${
                      account.popular
                        ? 'bg-[#F4D957] text-[#0A1628] hover:bg-[#F0C738]'
                        : 'bg-[#0A1628] text-foreground hover:bg-[#051A41]'
                    }`}
                    asChild
                  >
                    <a
                      href="https://app.ckcapital.co.uk/buy-challenge"
                      aria-label={`Buy ${account.size} ${currentChallenge.name} challenge for ${account.price}`}
                    >
                      Buy Challenge
                    </a>
                  </Button>

                  {/* Features List - Horizontal Layout */}
                  <div className="space-y-2.5 flex-grow">
                    {Object.entries(account.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs gap-2">
                        <span className={`font-semibold flex-shrink-0 ${account.popular ? 'text-[#B0BCC9]' : 'text-[#4B5563]'}`}>{key}</span>
                        <span className={`font-bold text-right flex-shrink-0 ${account.popular ? 'text-[#F4D957]' : 'text-[#0A1628]'}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-sm sm:text-base text-[#4B5563]">
            All challenges include live market trading on real instruments during simulated evaluation periods.
          </p>
          <Button
            className="mt-6 sm:mt-8 bg-[#0A1628] hover:bg-[#051A41] text-foreground font-bold px-8 py-2.5 rounded-lg transition-colors"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/all-products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
