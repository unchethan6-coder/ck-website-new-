'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
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
          popular: false,
          features: {
            'Phase 1 Target': '$150',
            'Phase 2 Target': '$150',
            'Max Daily Loss': '$80',
            'Max Loss': '$200',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
            'Consistency Rule': '50%',
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
          popular: false,
          features: {
            'Phase 1 Target': '$250',
            'Phases': 'No Phase 2',
            'Max Daily Loss': '$80',
            'Max Loss': '$150',
            'Trading Period': 'Unlimited',
            'Min Trading Days': '1',
            'Profit Split': 'Up to 100%',
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
          popular: false,
          features: {
            'Account Type': 'Instant Funded',
            'Evaluation': 'No Phases',
            'Max Daily Loss': '$150',
            'Max Loss': '$250',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Bi-Weekly 50%',
            'Consistency Rule': '20%',
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
          size: '$25K',
          price: '$129',
          popular: false,
          features: {
            'Account Type': 'Instant Funded',
            'Evaluation': 'No Phases',
            'Max Daily Loss': '$750',
            'Max Loss': '$1,250',
            'Trading Period': 'Unlimited',
            'Profit Split': 'Bi-Weekly 50%',
            'Consistency Rule': '20%',
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
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1628] mb-3 sm:mb-4 text-balance">
            Buckle Up, Your Journey Starts Here!
          </h2>
          <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto">
            1-Step, 2-Step, or Zero. Multiple routes to match your trading style and budget.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {[
            { key: 'standard', label: 'Standard' },
            { key: 'middleweight', label: 'Middleweight' },
            { key: 'lightweight', label: 'Lightweight' },
            { key: 'oneStep', label: '1 Step' },
            { key: 'instant', label: 'Instant Funding' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-[#F0F2F7] text-[#4B5563] hover:bg-[#E8EAEF]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Container - Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 pb-4 sm:pb-0">
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-0 min-w-min sm:min-w-full">
            {currentChallenge.accounts.map((account, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-72 sm:w-1/3 lg:flex-1 rounded-2xl overflow-hidden transition-all duration-300 ${
                  account.popular
                    ? 'bg-[#0A1628] text-white shadow-2xl ring-2 ring-[#F4D957] scale-105 sm:scale-100'
                    : 'bg-[#F8FAFC] text-[#0A1628] border border-[#E8EAEF] hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {account.popular && (
                  <div className="bg-[#F4D957] text-[#0A1628] py-1.5 px-4 text-center font-bold text-xs sm:text-sm uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  {/* Account Size & Price */}
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-widest text-[#8A94A6] mb-1">Account Size</div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-2xl sm:text-3xl font-bold">{account.size}</span>
                      <span className="text-sm text-[#8A94A6]">Price</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span></span>
                      <span className="text-xl sm:text-2xl font-bold">${account.price}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <Button
                    className={`w-full mb-6 font-bold py-2.5 sm:py-3 rounded-lg transition-all ${
                      account.popular
                        ? 'bg-[#F4D957] text-[#0A1628] hover:bg-[#F0C738]'
                        : 'bg-[#0A1628] text-white hover:bg-[#051A41]'
                    }`}
                    asChild
                  >
                    <a href="https://app.ckcapital.co.uk/buy-challenge">Buy Challenge</a>
                  </Button>

                  {/* Features List */}
                  <div className="space-y-3">
                    {Object.entries(account.features).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start text-xs sm:text-sm">
                        <span className={account.popular ? 'text-[#B0BCC9]' : 'text-[#4B5563]'}>{key}</span>
                        <span className={`font-semibold ${account.popular ? 'text-[#F4D957]' : 'text-[#0A1628]'}`}>
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
            className="mt-6 sm:mt-8 bg-[#0A1628] hover:bg-[#051A41] text-white font-bold px-8 py-2.5 rounded-lg transition-colors"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/all-products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
