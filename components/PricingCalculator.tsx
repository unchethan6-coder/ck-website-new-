'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingCalculator() {
  const [challengeType, setChallengeType] = useState('1step');
  const [preference, setPreference] = useState('standard');
  const [platform, setPlatform] = useState('tradelocker');
  const [accountSize, setAccountSize] = useState(10000);

  const rules = {
    '1step': {
      standard: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$500',
        dailyLoss: '$200',
        maxLoss: '$400',
        minTradingDays: '1',
        consistency: 'x',
        price: '$13',
        originalPrice: '$88',
      },
      lite: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$250',
        dailyLoss: '$100',
        maxLoss: '$200',
        minTradingDays: '1',
        consistency: 'x',
        price: '$9',
        originalPrice: '$68',
      },
      middle: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$2,500',
        dailyLoss: '$1,000',
        maxLoss: '$2,000',
        minTradingDays: '1',
        consistency: 'x',
        price: '$39',
        originalPrice: '$228',
      },
    },
    '2step': {
      standard: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$250',
        dailyLoss: '$200',
        maxLoss: '$400',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
      lite: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$125',
        dailyLoss: '$100',
        maxLoss: '$200',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
      middle: {
        tradingPeriod: 'Unlimited',
        profitTarget: '$1,250',
        dailyLoss: '$1,000',
        maxLoss: '$2,000',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
    },
    instant: {
      standard: {
        tradingPeriod: 'Unlimited',
        profitTarget: 'x',
        dailyLoss: '$200',
        maxLoss: '$400',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
      lite: {
        tradingPeriod: 'Unlimited',
        profitTarget: 'x',
        dailyLoss: '$100',
        maxLoss: '$200',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
      middle: {
        tradingPeriod: 'Unlimited',
        profitTarget: 'x',
        dailyLoss: '$1,000',
        maxLoss: '$2,000',
        minTradingDays: '1',
        consistency: 'x',
        price: 'x',
        originalPrice: 'x',
      },
    },
  };

  const currentRules = rules[challengeType as keyof typeof rules][preference as keyof typeof rules['1step']];
  const step1Label = challengeType === 'instant' ? 'Instant Funding' : 'Standard Challenge';
  const step2Label = challengeType === 'instant' ? '' : 'Verification';
  const step3Label = 'CK Trader';

  const accountSizes = [2500, 5000, 10000, 25000, 50000, 100000];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-balance">
            Choose Your Path to CK Trader
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Select your preferred trading objective and configuration
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-premium p-4 sm:p-6 md:p-8 border border-gray-200">
          {/* Challenge Type Tabs */}
          <div className="flex gap-2 sm:gap-3 justify-center mb-6 sm:mb-8 flex-wrap">
            <button
              onClick={() => setChallengeType('1step')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 font-semibold transition-all text-xs sm:text-sm md:text-base ${
                challengeType === '1step'
                  ? 'border-yellow-400 bg-white text-gray-900'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              1 Step
            </button>
            <button
              onClick={() => setChallengeType('2step')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 font-semibold transition-all text-xs sm:text-sm md:text-base ${
                challengeType === '2step'
                  ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              2 Step
            </button>
            <button
              onClick={() => setChallengeType('instant')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 font-semibold transition-all text-xs sm:text-sm md:text-base ${
                challengeType === 'instant'
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              Instant Funding
            </button>
          </div>

          {/* Preferences */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <span className="font-semibold text-gray-900 text-sm sm:text-base flex-shrink-0">Select Preference:</span>
              <div className="flex gap-3 sm:gap-6 flex-wrap">
                {['standard', 'lite', 'middle'].map((pref) => (
                  <label key={pref} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                    <input
                      type="radio"
                      name="preference"
                      value={pref}
                      checked={preference === pref}
                      onChange={(e) => setPreference(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 capitalize">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <span className="font-semibold text-gray-900 text-sm sm:text-base flex-shrink-0">Select Platform:</span>
              <div className="flex gap-3 sm:gap-6 flex-wrap">
                {['tradelocker', 'mt5'].map((plat) => (
                  <label key={plat} className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm">
                    <input
                      type="radio"
                      name="platform"
                      value={plat}
                      checked={platform === plat}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700 uppercase">{plat === 'tradelocker' ? 'TradeLocker' : 'MT5'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Account Sizes */}
          <div className="mb-6 sm:mb-8">
            <p className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Challenge Size:</p>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {accountSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setAccountSize(size)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded border-2 font-semibold transition-all text-xs sm:text-sm ${
                    accountSize === size
                      ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  ${(size / 1000).toFixed(0)}K
                </button>
              ))}
            </div>
          </div>

          {/* Rules Table - Mobile optimized */}
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 text-left bg-gray-50"></td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 text-center bg-gray-50">
                    <div className="text-xs text-gray-600 mb-0.5 sm:mb-1">STEP 1</div>
                    <div className="text-xs sm:text-sm">{step1Label}</div>
                  </td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 text-center bg-gray-50">
                      <div className="text-xs text-gray-600 mb-0.5 sm:mb-1">STEP 2</div>
                      <div className="text-xs sm:text-sm">{step2Label}</div>
                    </td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 text-center bg-gray-50">
                    <div className="text-xs text-gray-600 mb-0.5 sm:mb-1">STEP {challengeType === 'instant' ? '2' : '3'}</div>
                    <div className="text-xs sm:text-sm">{step3Label}</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> <span className="hidden sm:inline">Trading Period</span><span className="inline sm:hidden">Period</span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.tradingPeriod}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.tradingPeriod}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.tradingPeriod}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> <span className="hidden sm:inline">Profit Target</span><span className="inline sm:hidden">Profit</span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.profitTarget}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.profitTarget}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">x</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> <span className="hidden sm:inline">Max. Daily Loss</span><span className="inline sm:hidden">Daily</span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.dailyLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.dailyLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.dailyLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> <span className="hidden sm:inline">Max. Loss</span><span className="inline sm:hidden">Max</span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.maxLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.maxLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100 text-xs sm:text-sm">${(parseFloat(currentRules.maxLoss.replace('$', '')) * (accountSize / 10000)).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> <span className="hidden sm:inline">Min. Trading Days</span><span className="inline sm:hidden">Min Days</span>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.minTradingDays}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.minTradingDays}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">x</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> Consistency
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.consistency}</td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">{currentRules.consistency}</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">x</td>
                </tr>
                <tr>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-medium">
                    <span className="text-cyan-500">◆</span> Price
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">
                    <span className="text-cyan-500 font-semibold text-sm sm:text-base">{currentRules.price}</span>
                    {currentRules.originalPrice !== 'x' && (
                      <span className="line-through text-gray-400 ml-1 sm:ml-2 text-xs">{currentRules.originalPrice}</span>
                    )}
                  </td>
                  {challengeType !== 'instant' && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">x</td>
                  )}
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-center bg-gray-100">x</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <Button 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-200 shadow-card hover:shadow-elevated"
              asChild
            >
              <a href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer">
                Checkout
              </a>
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-6 sm:mt-8 leading-relaxed px-2">
          All trading is conducted in a simulated environment. Please read our full risk disclaimer before trading with real capital.
        </p>
      </div>
    </section>
  );
}
