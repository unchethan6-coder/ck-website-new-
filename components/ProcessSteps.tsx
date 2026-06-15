'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export function ProcessSteps() {
  const steps = [
    {
      number: '01',
      title: 'Challenge Phase',
      description: 'Pass our fair evaluation challenge and prove your trading skills with clear, straightforward rules',
      testimonial: 'The platform is smooth, execution is fast, and the rules are clear and fair.',
      author: 'Trader Community',
    },
    {
      number: '02',
      title: 'Real Rewards',
      description: 'Keep up to 100% of your earnings. Get rewarded fast with flexible payout cycles',
      testimonial: 'The rewards arriving in my wallet within minutes - it\'s incredible.',
      author: 'Verified Traders',
    },
    {
      number: '03',
      title: 'Scale & Grow',
      description: 'Trade your way from challenge to $2M Prime capital with daily rewards and investor access',
      testimonial: 'From $10K to $165K in trading capital with consistent rewards.',
      author: 'Success Stories',
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4">
            How It Works
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Three simple steps to trading profits and scaling capital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="hidden md:block absolute -top-6 left-0 text-6xl font-bold text-white opacity-40">
                {step.number}
              </div>
              <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-md transition-all h-full">
                <div className="md:hidden mb-3">
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-2xl font-bold text-black mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs md:text-sm text-gray-700 italic mb-2 leading-relaxed">&quot;{step.testimonial}&quot;</p>
                  <p className="text-xs font-semibold text-gray-500">— {step.author}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F0E68C]"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
